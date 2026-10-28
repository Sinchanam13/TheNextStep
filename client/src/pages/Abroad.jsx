import { useEffect, useState } from "react";
import { qs } from "../api.js";
import { useFetch, useDebounced, usePageTitle } from "../hooks/useFetch.js";
import { Badge, Chip, Empty, ErrorBox, ExternalLink, Loading, PageHead, Pagination, SaveButton } from "../components/ui.jsx";

const POPULAR = ["Japan", "Germany", "Canada", "United Kingdom", "United States", "Australia", "Singapore", "Netherlands"];

export default function Abroad() {
  usePageTitle("Study Abroad");
  const [country, setCountry] = useState("");
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const q = useDebounced(text);
  useEffect(() => { setPage(1); }, [country, q]);

  const countries = useFetch("/countries");
  const list = useFetch(country ? `/universities${qs({ country, q, page })}` : null);

  return (
    <>
      <PageHead title="Study abroad explorer" sub="Pick a country to see available university listings and open their official websites.">
        <div className="chips" role="group" aria-label="Popular countries">
          {POPULAR.map((c) => <Chip key={c} active={country === c} onClick={() => setCountry(c)}>{c}</Chip>)}
        </div>
      </PageHead>
      <div className="filters">
        <label>Country
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select a country</option>
            {countries.data?.results.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Filter by name
          <input type="search" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. Technical" disabled={!country} />
        </label>
      </div>
      {countries.error && <ErrorBox message={countries.error} onRetry={countries.retry} />}
      {!country && <Empty>Select a country to see available university listings.</Empty>}
      {list.loading && <Loading />}
      {list.error && <ErrorBox message={list.error} onRetry={list.retry} />}
      {list.data && (
        <>
          <p className="muted" aria-live="polite">{list.data.total} listings for {list.data.country}. {list.data.note}</p>
          {list.data.source === "stale" && <div className="msg info">Live data is unavailable right now, so you are seeing saved results from {new Date(list.data.fetchedAt).toLocaleDateString("en-IN")}.</div>}
          {list.data.results.length === 0 && <Empty>No university listings found. The data source may not include every university.</Empty>}
          <div className="cards">
            {list.data.results.map((u, i) => (
              <article className="card lift" key={u.name} style={{ "--i": i }}>
                <h3>{u.name}</h3>
                <div className="row">
                  {u.website ? <ExternalLink className="btn" href={u.website}>Visit website ↗</ExternalLink> : <Badge tone="warn">Website not available</Badge>}
                  <SaveButton item={{ type: "University", id: `${list.data.country}:${u.name}`, name: `${u.name} (${list.data.country})`, url: u.website }} />
                </div>
              </article>
            ))}
          </div>
          <Pagination page={list.data.page} totalPages={Math.ceil(list.data.total / list.data.limit)} onPage={setPage} />
        </>
      )}
    </>
  );
}
