import { z } from "zod";
import { Scholarship, SECTIONS, STUDENT_CATEGORIES } from "../models/Scholarship.js";

export const scholarshipQuerySchema = z.object({
  section: z.enum(SECTIONS).optional(),
  category: z.enum(STUDENT_CATEGORIES).optional(),
  level: z.enum(["UG", "PG", "Doctoral"]).optional(),
  field: z.string().trim().max(80).optional(),
  q: z.string().trim().max(80).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function listScholarships(req, res, next) {
  try {
    const { section, category, level, field, q, page, limit } = req.valid;
    const filter = {};
    if (section) filter.section = section;
    // A student in a category can also use scholarships open to everyone.
    if (category) filter.categories = { $in: [category, "General"] };
    if (level === "UG") filter.level = { $in: ["UG", "UG/PG", "Any"] };
    else if (level === "PG") filter.level = { $in: ["PG", "UG/PG", "Any"] };
    else if (level === "Doctoral") filter.level = { $in: ["Doctoral", "Any"] };
    if (field) filter.categoryTags = { $in: [field, "all"] };
    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = [{ name: rx }, { description: rx }, { sourceName: rx }];
    }
    const [results, total] = await Promise.all([
      Scholarship.find(filter).sort({ sectionOrder: 1, name: 1 }).skip((page - 1) * limit).limit(limit).lean(),
      Scholarship.countDocuments(filter),
    ]);
    res.json({ total, page, limit, totalPages: Math.ceil(total / limit), results });
  } catch (e) { next(e); }
}

export async function scholarshipSummary(_req, res, next) {
  try {
    const rows = await Scholarship.aggregate([{ $group: { _id: "$section", count: { $sum: 1 } } }]);
    const bySection = Object.fromEntries(SECTIONS.map((s) => [s, 0]));
    rows.forEach((r) => { bySection[r._id] = r.count; });
    res.json({ total: Object.values(bySection).reduce((a, b) => a + b, 0), bySection });
  } catch (e) { next(e); }
}
