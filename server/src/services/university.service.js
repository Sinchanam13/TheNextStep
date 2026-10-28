import { env } from "../config/env.js";
import { UniversityCache } from "../models/UniversityCache.js";
import { fetchUniversitiesByCountry } from "./hipolabs.service.js";

// Returns { universities, source: "cache" | "live" | "stale", fetchedAt }.
// Throws only when there is neither fresh data nor any cached data.
export async function getUniversities(country) {
  const cached = await UniversityCache.findOne({ country }).lean();
  const now = new Date();

  if (cached && cached.expiresAt > now) {
    return { universities: cached.universities, source: "cache", fetchedAt: cached.fetchedAt };
  }

  try {
    const universities = await fetchUniversitiesByCountry(country);
    const fetchedAt = new Date();
    const expiresAt = new Date(fetchedAt.getTime() + env.CACHE_TTL_HOURS * 3600 * 1000);
    await UniversityCache.findOneAndUpdate(
      { country },
      { country, universities, fetchedAt, expiresAt },
      { upsert: true, new: true }
    );
    return { universities, source: "live", fetchedAt };
  } catch (err) {
    console.error(`University refresh failed for ${country}:`, err.message);
    if (cached) {
      return { universities: cached.universities, source: "stale", fetchedAt: cached.fetchedAt };
    }
    const e = new Error("University data is temporarily unavailable. Please try again later.");
    e.status = 503;
    throw e;
  }
}
