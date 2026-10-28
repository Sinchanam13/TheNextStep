import { env } from "../config/env.js";

// The only file that talks to Hipolabs.
function safeHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:" ? u.href : null;
  } catch {
    return null;
  }
}

export async function fetchUniversitiesByCountry(country) {
  const url = `${env.HIPOLABS_BASE_URL}/search?country=${encodeURIComponent(country)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Hipolabs responded with ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Unexpected Hipolabs response shape");

  const seen = new Set();
  const out = [];
  for (const u of data) {
    if (!u?.name) continue;
    const key = u.name.trim().toLowerCase();
    if (seen.has(key)) continue; // avoid duplicates
    seen.add(key);
    out.push({
      name: u.name.trim(),
      website: safeHttpUrl(u.web_pages?.[0]), // null if missing or invalid
      domains: Array.isArray(u.domains) ? u.domains : [],
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}
