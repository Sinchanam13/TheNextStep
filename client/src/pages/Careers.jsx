import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { qs } from "../api.js";
import { useFetch, useDebounced, usePageTitle } from "../hooks/useFetch.js";
import { Badge, Chip, Empty, ErrorBox, Loading, PageHead, Pagination, SaveButton } from "../components/ui.jsx";
import { STREAMS, domainIcon, streamLabel } from "../constants.js";

export default function Careers() {
  usePageTitle("Degree Explorer");
  const [sp, setSp] = useSearchParams();
  const stream = sp.get("stream") || "";
  const category = sp.get("category") || "";
  const page = Number(sp.get("page") || 1);
  const [text, setText] = useState(sp.get("q") || "");
  const q = useDebounced(text);

  const update = (patch) => {
    const next = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setSp(next, { replace: true });
  };
  useEffect(() => { if (q !== (sp.get("q") || "")) update({ q, page: "" }); /* eslint-disable-next-line */ }, [q]);

  const cats = useFetch("/categories");
  const list = useFetch(`/degrees${qs({ stream, category, q: sp.get("q") || "", page })}`);

  return (
    <>
      <PageHead title="Bachelor's degree explorer" sub="Choose your Class 12 stream to see the degrees open to you. Every card links to an official source.">
        <div className="chips" role="group" aria-label="Your Class 12 stream">
          {STREAMS.map((s) => (
            <Chip key={s.key} active={stream === s.key} onClick={() => update({ stream: s.key, page: "" })}>{s.icon && <span>{s.icon}</span>} {s.label}</Chip>
          ))}
        </div>
      </PageHead>

      <div className="searchbar">
        <input type="search" aria-label="Search degrees" value={text} placeholder="Search a degree, exam or career, e.g. NEET, design, pilot" onChange={(e) => setText(e.target.value)} />
      </div>

      <div className="chips scroll" role="group" aria-label="Field of study">
        <Chip active={!category} onClick={() => update({ category: "", page: "" })}>All fields</Chip>
        {cats.data?.results.map((c) => (
          <Chip key={c.slug} active={category === c.slug} onClick={() => update({ category: c.slug, page: "" })}>
            <span>{domainIcon(c.slug)}</span> {c.name} <small>{c.count}</small>
          </Chip>
        ))}
      </div>

      {list.loading && <Loading />}
      {list.error && <ErrorBox message={list.error} onRetry={list.retry} />}
      {list.data && (
        <>
          <p className="muted" aria-live="polite">{list.data.total} degrees found</p>
          {list.data.results.length === 0 && <Empty>No degrees match these filters. Try clearing one.</Empty>}
          <div className="cards">
            {list.data.results.map((d, i) => (
              <article className="card lift" key={d.slug} style={{ "--i": i }}>
                <div className="cardtop">
                  <span className="dicon">{domainIcon(d.categorySlug)}</span>
                  <div>
                    <h3><Link to={`/careers/${d.slug}`}>{d.name}</Link></h3>
                    <span className="muted small">{d.categoryName}</span>
                  </div>
                </div>
                <div className="tags">
                  {d.stream.map((s) => <Badge key={s} tone="stream">{streamLabel(s)}</Badge>)}
                  <Badge>⏱ {d.minDuration}</Badge>
                  <Badge tone={d.status === "verified" ? "ok" : "warn"}>{d.status === "verified" ? "Verified" : "Unverified"}</Badge>
                </div>
                <p className="muted small">Entrance: {d.entranceExams.join(", ")}</p>
                <div className="row">
                  <Link className="btn" to={`/careers/${d.slug}`}>View details</Link>
                  <SaveButton item={{ type: "Degree", id: d.slug, name: d.name, path: `/careers/${d.slug}` }} />
                </div>
              </article>
            ))}
          </div>
          <Pagination page={list.data.page} totalPages={list.data.totalPages} onPage={(p) => update({ page: p > 1 ? String(p) : "" })} />
        </>
      )}
    </>
  );
}
