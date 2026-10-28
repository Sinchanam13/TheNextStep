import fs from "node:fs";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Scholarship, SECTION_ORDER } from "../models/Scholarship.js";

// Upserts by slug; safe to re-run. Entries a person marked "verified" are never overwritten.
// Entries that are no longer in the file and not verified are removed.
const file = new URL("./data/scholarships.json", import.meta.url);
const items = JSON.parse(fs.readFileSync(file, "utf8")).map((s) => ({ ...s, sectionOrder: SECTION_ORDER[s.section] }));

await mongoose.connect(env.MONGODB_URI);
const verified = new Set((await Scholarship.find({ status: "verified" }).select("slug").lean()).map((d) => d.slug));
const removed = await Scholarship.deleteMany({ status: { $ne: "verified" }, slug: { $nin: items.map((s) => s.slug) } });
let n = 0;
for (const s of items) {
  if (verified.has(s.slug)) continue;
  await Scholarship.updateOne({ slug: s.slug }, { $set: s, $unset: { region: "" } }, { upsert: true });
  n++;
}
console.log(`Upserted ${n} scholarships (removed ${removed.deletedCount} old entries)`);
await mongoose.disconnect();
