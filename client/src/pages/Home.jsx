import { Link } from "react-router-dom";
import { useFetch, usePageTitle } from "../hooks/useFetch.js";
import { CountUp, Reveal } from "../components/ui.jsx";
import { STREAMS } from "../constants.js";

export default function Home() {
  usePageTitle("");
  const deg = useFetch("/degrees?limit=1");
  const sch = useFetch("/scholarships/summary");
  const cat = useFetch("/categories");
  const cty = useFetch("/countries");
  const stats = [
    { n: deg.data?.total, label: "Bachelor's degrees" },
    { n: cat.data?.results.length, label: "Fields of study" },
    { n: sch.data?.total, label: "Scholarships" },
    { n: cty.data?.results.length, label: "Countries to explore" },
  ];
  return (
    <>
      <section className="hero">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="wrap hero-in">
          <span className="pill">For students after Class 12</span>
          <h1>Find your <span className="grad">next step</span>, with sources you can trust</h1>
          <p>Explore bachelor's degrees by stream, find scholarships made for Karnataka students, and discover universities abroad. No login needed.</p>
          <div className="row">
            <Link className="btn big" to="/careers">Explore degrees</Link>
            <Link className="ghost big" to="/scholarships">Find scholarships</Link>
          </div>
          <div className="streampick">
            <b>I studied:</b>
            {STREAMS.filter((s) => s.key).map((s) => (
              <Link key={s.key} to={`/careers?stream=${s.key}`} className="chip"><span>{s.icon}</span> {s.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <Reveal className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.n != null ? <CountUp to={s.n} /> : "…"}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>

        <div className="grid3">
          {[
            { to: "/careers", icon: "🎓", t: "Degree Explorer", d: "Bachelor's degrees across 20 fields, with stream, duration, eligibility, entrance exam and career paths." },
            { to: "/scholarships", icon: "🏅", t: "Scholarships", d: "Schemes for Karnataka students in India and abroad, plus national and international options." },
            { to: "/abroad", icon: "🌍", t: "Study Abroad", d: "Pick a country and see universities with links to their official websites." },
          ].map((c, i) => (
            <Reveal key={c.to} delay={i * 100}>
              <Link className="feature" to={c.to}>
                <span className="ficon">{c.icon}</span>
                <h2>{c.t}</h2>
                <p>{c.d}</p>
                <span className="more">Open →</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section className="banner">
            <div>
              <h2>Scholarships made for Karnataka students</h2>
              <p>Browse schemes for studying in India and for studying abroad, filtered by SC/ST, OBC, Minority or General category.</p>
            </div>
            <Link className="btn big" to="/scholarships?section=karnataka-abroad">See Karnataka scholarships</Link>
          </section>
        </Reveal>

        <Reveal>
          <h2 className="center">How it works</h2>
          <div className="steps">
            {[["1", "Pick your stream", "Choose what you studied in Class 12."], ["2", "Explore options", "See degrees, exams and scholarships that fit."], ["3", "Verify and apply", "Open the official source and confirm the details."]].map(([n, t, d]) => (
              <div className="step" key={n}><span className="num">{n}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
