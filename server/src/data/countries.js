// Stable list of country names used by the selector. Hipolabs searches by country name,
// so names here must match what it expects. Extend as needed.
export const COUNTRIES = [
  "Australia","Austria","Belgium","Brazil","Canada","China","Czech Republic","Denmark","Egypt",
  "Finland","France","Germany","Greece","Hong Kong","Hungary","Iceland","India","Indonesia",
  "Ireland","Israel","Italy","Japan","Malaysia","Mexico","Netherlands","New Zealand","Norway",
  "Poland","Portugal","Qatar","Russian Federation","Saudi Arabia","Singapore","South Africa",
  "South Korea","Spain","Sweden","Switzerland","Taiwan","Thailand","Turkey",
  "United Arab Emirates","United Kingdom","United States",
];

export function normalizeCountry(input) {
  const q = String(input || "").trim().toLowerCase();
  return COUNTRIES.find((c) => c.toLowerCase() === q) || null;
}
