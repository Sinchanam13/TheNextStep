import mongoose from "mongoose";

export const LEVELS = ["Diploma", "UG", "PG", "Doctoral", "Professional", "Vocational"];
export const STATUSES = ["unverified", "verified"];
export const STREAMS = ["PCM", "PCB", "Commerce", "Arts", "Any", "Graduate"];

const degreeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    level: { type: String, enum: LEVELS, required: true },
    categorySlug: { type: String, required: true, index: true }, // the domain
    categoryName: { type: String, required: true },
    stream: { type: [{ type: String, enum: STREAMS }], default: ["Any"], index: true },
    minDuration: { type: String, default: null },
    eligibility: { type: String, default: null },
    entranceExams: { type: [String], default: [] },
    pathways: { type: [String], default: [] },
    regulator: { type: String, default: null },
    sourceUrl: { type: String, default: null },
    lastVerified: { type: Date, default: null },
    // "unverified" = imported from the rules table; "verified" = a person checked it against sourceUrl.
    status: { type: String, enum: STATUSES, default: "unverified", index: true },
  },
  { timestamps: true }
);

export const Degree = mongoose.model("Degree", degreeSchema);
