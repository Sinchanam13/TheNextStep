import mongoose from "mongoose";

export const ITEM_TYPES = ["degree", "scholarship", "university", "other"];

const schema = new mongoose.Schema(
  {
    itemType: { type: String, enum: ITEM_TYPES, required: true },
    itemId: { type: String, default: null },
    message: { type: String, required: true, minlength: 10, maxlength: 1000 },
    status: { type: String, enum: ["new", "reviewed", "fixed"], default: "new" },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", schema);
