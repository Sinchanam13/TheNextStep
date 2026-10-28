import { Link, useParams } from "react-router-dom";
import { useFetch, usePageTitle } from "../hooks/useFetch.js";
import { Badge, ErrorBox, ExternalLink, Loading, ReportButton, SaveButton, deadlineInfo } from "../components/ui.jsx";
import { domainIcon, sectionLabel, streamLabel } from "../constants.js";

export default function DegreeDetail() {
  const { slug } = useParams();
  const { data: d, loading, error, retry } = useFetch(`/degrees/${slug}`);
  const rel = useFetch(d ? `/scholarships?field=${d.categorySlug}&limit=6` : null);
  usePageTitle(d?.name);

  return (
    <>
      <p><Link to="/careers">← Back to all degrees</Link></p>
      {loading && <Loading rows={2} />}
      {error && <ErrorBox message={error} onRetry={retry} />}
      {d && (
        <>
          <section className="pagehead detailhead">
            <span className="bigicon">{domainIcon(d.categorySlug)}</span>
            <div>
              <h1>{d.name}</h1>
              <div className="tags">
                <Badge>{d.categoryName}</Badge>
                <Badge tone={d.status === "verified" ? "ok" : "warn"}>{d.status === "verified" ? "Verified" : "Unverified"}</Badge>
              </div>
            </div>
          </section>
          {d.status !== "verified" && <div className="msg info">These details follow the usual rules for this type of degree and have not been verified yet. Please confirm them on the official source.</div>}

          <div className="facts5">
            <div className="fact"><span>Stream</span><div className="tags">{d.stream.map((s) => <Badge key={s} tone="stream">{streamLabel(s)}</Badge>)}</div></div>
            <div className="fact"><span>Duration</span><b>{d.minDuration || "Not available"}</b></div>
            <div className="fact wide"><span>Eligibility</span><b>{d.eligibility || "Not available"}</b></div>
            <div className="fact wide"><span>Entrance exam or admission route</span><b>{d.entranceExams?.length ? d.entranceExams.join(" • ") : "Not available"}</b></div>
            <div className="fact full"><span>Career paths</span><div className="tags">{d.pathways?.length ? d.pathways.map((p) => <Badge key={p}>{p}</Badge>) : "Not available"}</div></div>
          </div>

          <div className="row">
            <ExternalLink className="btn" href={d.sourceUrl}>Official source ↗</ExternalLink>
            <SaveButton item={{ type: "Degree", id: d.slug, name: d.name, path: `/careers/${d.slug}` }} />
          </div>
          <p className="muted small">Last verified: {d.lastVerified ? new Date(d.lastVerified).toLocaleDateString("en-IN") : "not verified yet"}</p>
          <ReportButton itemType="degree" itemId={d.slug} />

          <h2>Related scholarships</h2>
          {rel.loading && <Loading rows={2} />}
          {rel.data?.results.length === 0 && <p className="muted">No related scholarships listed yet.</p>}
          <div className="cards">
            {rel.data?.results.map((s) => (
              <article className="card lift" key={s.slug}>
                <h3>{s.name}</h3>
                <div className="tags"><Badge tone={s.section.startsWith("karnataka") ? "star" : ""}>{sectionLabel(s.section)}</Badge><Badge tone={deadlineInfo(s.deadline).tone}>{deadlineInfo(s.deadline).label}</Badge></div>
                <ExternalLink className="btn" href={s.officialUrl}>Open official page ↗</ExternalLink>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}
