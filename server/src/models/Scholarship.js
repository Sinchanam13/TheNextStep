import mongoose from "mongoose";

export const SCH_LEVELS = ["UG", "PG", "Doctoral", "UG/PG", "Any"];
export const SECTIONS = ["karnataka-abroad", "karnataka-india", "all-india", "international"];
export const SECTION_ORDER = { "karnataka-abroad": 1, "karnataka-india": 2, "all-india": 3, international: 4 };
export const STUDENT_CATEGORIES = ["SC/ST", "OBC", "Minority", "General"];
export const SCH_STATUSES = ["unverified", "verified"];

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    sourceName: { type: String, required: true }, // department or provider
    description: { type: String, default: null },
    eligibility: { type: String, default: null }, // who can apply
    benefits: { type: String, default: null },
    deadline: { type: Date, default: null }, // null = unknown; the UI says "check official site"
    level: { type: String, enum: SCH_LEVELS, required: true },
    section: { type: String, enum: SECTIONS, required: true, index: true },
    sectionOrder: { type: Number, required: true },
    categories: { type: [{ type: String, enum: STUDENT_CATEGORIES }], default: ["General"] },
    categoryTags: { type: [String], default: ["all"] }, // degree domain slugs, or "all"
    officialUrl: { type: String, required: true },
    lastVerified: { type: Date, default: null },
    status: { type: String, enum: SCH_STATUSES, default: "unverified" },
  },
  { timestamps: true }
);

export const Scholarship = mongoose.model("Scholarship", schema);
