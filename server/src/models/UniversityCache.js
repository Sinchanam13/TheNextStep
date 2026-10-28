import mongoose from "mongoose";

// One document per country. Deliberately NO Mongo TTL index: expired documents
// must stay available so we can serve stale data when the external API is down.
const schema = new mongoose.Schema({
  country: { type: String, required: true, unique: true },
  universities: [
    { _id: false, name: String, website: String, domains: [String] },
  ],
  fetchedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

export const UniversityCache = mongoose.model("UniversityCache", schema);
