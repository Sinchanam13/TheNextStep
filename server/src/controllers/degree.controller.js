import { z } from "zod";
import { Degree, LEVELS, STATUSES } from "../models/Degree.js";

export const degreeQuerySchema = z.object({
  category: z.string().trim().max(80).optional(),
  stream: z.enum(["PCM", "PCB", "Commerce", "Arts", "Graduate"]).optional(),
  level: z.enum(LEVELS).optional(),
  status: z.enum(STATUSES).optional(),
  q: z.string().trim().max(80).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function listDegrees(req, res, next) {
  try {
    const { category, stream, level, status, q, page, limit } = req.valid;
    const filter = {};
    if (category) filter.categorySlug = category;
    // A stream filter also returns degrees that are open to every stream.
    if (stream === "Graduate") filter.stream = "Graduate";
    else if (stream) filter.stream = { $in: [stream, "Any"] };
    if (level) filter.level = level;
    if (status) filter.status = status;
    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = [{ name: rx }, { entranceExams: rx }, { pathways: rx }, { categoryName: rx }];
    }
    const [results, total] = await Promise.all([
      Degree.find(filter).sort({ status: -1, categoryName: 1, name: 1 }).skip((page - 1) * limit).limit(limit).lean(),
      Degree.countDocuments(filter),
    ]);
    res.json({ total, page, limit, totalPages: Math.ceil(total / limit), results });
  } catch (e) { next(e); }
}

export async function getDegree(req, res, next) {
  try {
    const degree = await Degree.findOne({ slug: String(req.params.slug).toLowerCase() }).lean();
    if (!degree) return res.status(404).json({ error: "Degree not found" });
    res.json(degree);
  } catch (e) { next(e); }
}

export async function listCategories(_req, res, next) {
  try {
    const rows = await Degree.aggregate([
      { $group: { _id: { slug: "$categorySlug", name: "$categoryName" }, count: { $sum: 1 } } },
      { $project: { _id: 0, slug: "$_id.slug", name: "$_id.name", count: 1 } },
      { $sort: { name: 1 } },
    ]);
    res.json({ results: rows });
  } catch (e) { next(e); }
}
