import { describe, it, expect } from "vitest";
import request from "supertest";
import fs from "node:fs";
import app from "../src/app.js";
import { Degree } from "../src/models/Degree.js";
import { Scholarship, SECTION_ORDER } from "../src/models/Scholarship.js";
import { buildDegrees } from "../src/data/degreeCatalog.js";

describe("API validation (no database needed)", () => {
  it("health", async () => expect((await request(app).get("/api/health")).body.status).toBe("ok"));
  it("countries include Japan", async () => expect((await request(app).get("/api/countries")).body.results).toContain("Japan"));
  it("universities need a country", async () => expect((await request(app).get("/api/universities")).status).toBe(400));
  it("unknown country rejected", async () => expect((await request(app).get("/api/universities?country=Atlantis")).status).toBe(400));
  it("invalid stream rejected", async () => expect((await request(app).get("/api/degrees?stream=Magic")).status).toBe(400));
  it("invalid scholarship section rejected", async () => expect((await request(app).get("/api/scholarships?section=moon")).status).toBe(400));
  it("invalid scholarship category rejected", async () => expect((await request(app).get("/api/scholarships?category=x")).status).toBe(400));
  it("short report rejected", async () => expect((await request(app).post("/api/reports").send({ itemType: "degree", message: "bad" })).status).toBe(400));
  it("unknown route 404", async () => expect((await request(app).get("/api/nope")).status).toBe(404));
});

describe("Degree catalog", () => {
  const degrees = buildDegrees();
  it("has a broad catalog", () => expect(degrees.length).toBeGreaterThan(130));
  it("slugs are unique", () => expect(new Set(degrees.map((d) => d.slug)).size).toBe(degrees.length));
  it("every degree has the five student fields", () => {
    for (const d of degrees) {
      expect(d.stream.length, d.name).toBeGreaterThan(0);
      expect(d.minDuration, d.name).toBeTruthy();
      expect(d.eligibility, d.name).toBeTruthy();
      expect(d.entranceExams.length, d.name).toBeGreaterThan(0);
      expect(d.pathways.length, d.name).toBeGreaterThan(0);
      expect(d.sourceUrl, d.name).toMatch(/^https?:\/\//);
    }
  });
  it("every degree passes the model validation", () => {
    for (const d of degrees) expect(new Degree(d).validateSync(), d.name).toBeUndefined();
  });
  it("covers the required domains", () => {
    const slugs = new Set(degrees.map((d) => d.categorySlug));
    for (const s of ["media-and-communication", "sports-and-physical-education", "hospitality-and-tourism", "aviation-and-maritime", "design", "computer-and-it"]) expect(slugs.has(s), s).toBe(true);
  });
});

describe("Scholarship data", () => {
  const items = JSON.parse(fs.readFileSync(new URL("../src/seed/data/scholarships.json", import.meta.url), "utf8"));
  it("has 19 scholarships", () => expect(items.length).toBe(19));
  it("all pass model validation", () => {
    for (const s of items) expect(new Scholarship({ ...s, sectionOrder: SECTION_ORDER[s.section] }).validateSync(), s.name).toBeUndefined();
  });
  it("has 4 Karnataka-abroad entries", () => expect(items.filter((s) => s.section === "karnataka-abroad").length).toBe(4));
});
