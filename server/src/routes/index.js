import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validateQuery } from "../middleware/validate.js";
import { degreeQuerySchema, listDegrees, getDegree, listCategories } from "../controllers/degree.controller.js";
import { universityQuerySchema, listCountries, listUniversities } from "../controllers/university.controller.js";
import { scholarshipQuerySchema, listScholarships, scholarshipSummary } from "../controllers/scholarship.controller.js";
import { createReport } from "../controllers/report.controller.js";

const r = Router();

r.get("/health", (_req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

r.get("/categories", listCategories);
r.get("/degrees", validateQuery(degreeQuerySchema), listDegrees);
r.get("/degrees/:slug", getDegree);

r.get("/countries", listCountries);
r.get("/universities", validateQuery(universityQuerySchema), listUniversities);

r.get("/scholarships/summary", scholarshipSummary);
r.get("/scholarships", validateQuery(scholarshipQuerySchema), listScholarships);

const reportLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
r.post("/reports", reportLimiter, createReport);

export default r;
