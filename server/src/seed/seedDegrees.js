import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Degree } from "../models/Degree.js";
import { buildDegrees } from "../data/degreeCatalog.js";

// Builds the bachelor's catalog from the family rules and upserts it. Safe to re-run.
// - Degrees a person marked "verified" are never overwritten.
// - Older unverified entries that are not in the new catalog are removed.
const docs = buildDegrees();
await mongoose.connect(env.MONGODB_URI);

const verified = new Set((await Degree.find({ status: "verified" }).select("slug").lean()).map((d) => d.slug));
const removed = await Degree.deleteMany({ status: { $ne: "verified" }, slug: { $nin: docs.map((d) => d.slug) } });

let n = 0;
for (const d of docs) {
  if (verified.has(d.slug)) continue;
  await Degree.updateOne({ slug: d.slug }, { $set: d }, { upsert: true });
  n++;
}
console.log(`Upserted ${n} bachelor's degrees (removed ${removed.deletedCount} old entries)`);
await mongoose.disconnect();
