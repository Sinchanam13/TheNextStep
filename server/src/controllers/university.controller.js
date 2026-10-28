import { z } from "zod";
import { COUNTRIES, normalizeCountry } from "../data/countries.js";
import { getUniversities } from "../services/university.service.js";

export const universityQuerySchema = z.object({
  country: z.string().trim().min(1).max(60),
  q: z.string().trim().max(80).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(30),
});

export const listCountries = (_req, res) => res.json({ results: COUNTRIES });

export async function listUniversities(req, res, next) {
  try {
    const { country: rawCountry, q, page, limit } = req.valid;
    const country = normalizeCountry(rawCountry);
    if (!country) {
      return res.status(400).json({ error: "Unknown country. Use a name from /api/countries." });
    }
    const { universities, source, fetchedAt } = await getUniversities(country);
    const needle = q?.toLowerCase();
    const filtered = needle ? universities.filter((u) => u.name.toLowerCase().includes(needle)) : universities;
    const start = (page - 1) * limit;
    res.json({
      country, source, fetchedAt,
      total: filtered.length, page, limit,
      results: filtered.slice(start, start + limit),
      note: "Listings come from a public dataset and are not a complete list of universities.",
    });
  } catch (e) { next(e); }
}
