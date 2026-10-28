import { Link } from "react-router-dom";
import { useShortlist } from "../context/Shortlist.jsx";
import { usePageTitle } from "../hooks/useFetch.js";
import { Badge, Empty, ExternalLink, PageHead } from "../components/ui.jsx";

export default function Shortlist() {
  usePageTitle("Shortlist");
  const { items, toggle } = useShortlist();
  return (
    <>
      <PageHead title="Your shortlist" sub="Saved in this browser only. Nothing is sent to a server." />
      {items.length === 0 && <Empty>Nothing saved yet. Use Save on a degree, university or scholarship.</Empty>}
      <div className="cards">
        {items.map((i) => (
          <article className="card lift" key={`${i.type}:${i.id}`}>
            <Badge>{i.type}</Badge>
            <h3>{i.name}</h3>
            <div className="row">
              {i.path ? <Link className="btn" to={i.path}>View details</Link> : <ExternalLink className="btn" href={i.url}>Open official page ↗</ExternalLink>}
              <button className="ghost" onClick={() => toggle(i)}>Remove</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
