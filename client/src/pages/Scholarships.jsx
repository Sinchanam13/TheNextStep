import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { qs } from "../api.js";
import { useFetch, useDebounced, usePageTitle } from "../hooks/useFetch.js";
import { Badge, Chip, Empty, ErrorBox, ExternalLink, Loading, PageHead, Pagination, ReportButton, SaveButton, deadlineInfo } from "../components/ui.jsx";
import { CATEGORIES, SECTIONS, sectionLabel } from "../constants.js";

export default function Scholarships() {
  usePageTitle("Scholarships");
  const [sp, setSp] = useSearchParams();
  const section = sp.get("section") || "";
  const category = sp.get("category") || "";
  const level = sp.get("level") || "";
  const field = sp.get("field") || "";
  const page = Number(sp.get("page") || 1);
  const [text, setText] = useState(sp.get("q") || "");
  const q = useDebounced(text);

  const update = (patch) => {
    const next = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setSp(next, { replace: true });
  };
  useEffect(() => { if (q !== (sp.get("q") || "")) update({ q, page: "" }); /* eslint-disable-next-line */ }, [q]);

  const summary = useFetch("/scholarships/summary");
  const cats = useFetch("/categories");
  const list = useFetch(`/scholarships${qs({ section, category, level, field, q: sp.get("q") || "", page })}`);

  return (
    <>
      <PageHead title="Scholarship explorer" sub="Schemes for Karnataka students in India and abroad come first. Every card links to the official page.">
        <div className="chips" role="tablist" aria-label="Scholarship type">
          {SECTIONS.map((s) => (
            <Chip key={s.key} active={section === s.key} onClick={() => update({ section: s.key, page: "" })}>
              {s.star && <span>★</span>} {s.label}
              {summary.data && <small>{s.key ? summary.data.bySection[s.key] : summary.data.total}</small>}
            </Chip>
          ))}
        </div>
      </PageHead>

      <div className="filters">
        <label>Search<input type="search" value={text} onChange={(e) => setText(e.target.value)} placeholder="Scholarship or department" /></label>
        <label>Level
          <select value={level} onChange={(e) => update({ level: e.target.value, page: "" })}><option value="">All levels</option><option value="UG">Bachelor's (UG)</option><option value="PG">Master's (PG)</option><option value="Doctoral">Doctoral</option></select>
        </label>
        <label>Field
          <select value={field} onChange={(e) => update({ field: e.target.value, page: "" })}>
            <option value="">All fields</option>
            {cats.data?.results.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </label>
      </div>
      <div className="chips" role="group" aria-label="Your category">
        <Chip active={!category} onClick={() => update({ category: "", page: "" })}>Any category</Chip>
        {CATEGORIES.map((c) => <Chip key={c} active={category === c} onClick={() => update({ category: c, page: "" })}>{c}</Chip>)}
      </div>

      {list.loading && <Loading />}
      {list.error && <ErrorBox message={list.error} onRetry={list.retry} />}
      {list.data && (
        <>
          <p className="muted" aria-live="polite">{list.data.total} scholarships found</p>
          {list.data.results.length === 0 && <Empty>No scholarships match these filters. Try clearing one.</Empty>}
          <div className="cards">
            {list.data.results.map((s, i) => {
              const dl = deadlineInfo(s.deadline);
              const star = s.section.startsWith("karnataka");
              return (
                <article className={`card lift ${star ? "karn" : ""}`} key={s.slug} style={{ "--i": i }}>
                  <div className="tags">
                    <Badge tone={star ? "star" : ""}>{star && "★ "}{sectionLabel(s.section)}</Badge>
                    {s.categories.map((c) => <Badge key={c}>{c}</Badge>)}
                  </div>
                  <h3>{s.name}</h3>
                  <p className="muted small">{s.sourceName}</p>
                  {s.description && <p>{s.description}</p>}
                  <dl className="facts">
                    <dt>Who can apply</dt><dd>{s.eligibility || "Check the official page"}</dd>
                    <dt>Benefit</dt><dd>{s.benefits || "Check the official page"}</dd>
                    <dt>Level</dt><dd>{s.level === "Any" ? "All levels" : s.level}</dd>
                  </dl>
                  <div className="tags">
                    <Badge tone={dl.tone}>{dl.label}</Badge>
                    <Badge tone={s.status === "verified" ? "ok" : "warn"}>{s.status === "verified" ? "Verified" : "Unverified"}</Badge>
                  </div>
                  <div className="row">
                    <ExternalLink className="btn" href={s.officialUrl}>Open official page ↗</ExternalLink>
                    <SaveButton item={{ type: "Scholarship", id: s.slug, name: s.name, url: s.officialUrl }} />
                  </div>
                  <ReportButton itemType="scholarship" itemId={s.slug} />
                </article>
              );
            })}
          </div>
          <Pagination page={list.data.page} totalPages={list.data.totalPages} onPage={(p) => update({ page: p > 1 ? String(p) : "" })} />
        </>
      )}
    </>
  );
}
