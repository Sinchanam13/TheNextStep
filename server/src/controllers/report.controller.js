import { z } from "zod";
import { Report, ITEM_TYPES } from "../models/Report.js";

export const reportBodySchema = z.object({
  itemType: z.enum(ITEM_TYPES),
  itemId: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Please describe the problem (at least 10 characters)").max(1000),
});

export async function createReport(req, res, next) {
  try {
    const parsed = reportBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid report", details: parsed.error.flatten().fieldErrors });
    }
    await Report.create(parsed.data);
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
}
