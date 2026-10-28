import { useEffect, useRef, useState } from "react";
import { useShortlist } from "../context/Shortlist.jsx";
import { api } from "../api.js";

export function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

export function Reveal({ children, className = "", delay = 0 }) {
  const [ref, shown] = useReveal();
  return <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function CountUp({ to = 0, duration = 1200 }) {
  const [n, setN] = useState(0);
  const [ref, shown] = useReveal();
  useEffect(() => {
    if (!shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf, start;
    const step = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);
  return <span ref={ref}>{n}</span>;
}

export function Loading({ rows = 4 }) {
  return (
    <div className="cards" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => <div className="skel" key={i} />)}
    </div>
  );
}

export function ErrorBox({ message, onRetry }) {
  return (
    <div className="msg bad" role="alert">
      <p>{message}</p>
      {onRetry && <button className="btn" onClick={onRetry}>Try again</button>}
    </div>
  );
}

export const Empty = ({ children }) => <div className="msg info">{children}</div>;

export function Pagination({ page, totalPages, onPage }) {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <div className="pager">
      <button className="ghost" disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</button>
      <span>Page {page} of {totalPages}</span>
      <button className="ghost" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  );
}

export const Badge = ({ tone = "", children }) => <span className={`tag ${tone}`}>{children}</span>;

export function Chip({ active, onClick, children }) {
  return <button type="button" className={`chip ${active ? "on" : ""}`} aria-pressed={!!active} onClick={onClick}>{children}</button>;
}

export function SaveButton({ item }) {
  const { has, toggle } = useShortlist();
  const saved = has(item);
  return (
    <button className={`ghost save ${saved ? "saved" : ""}`} aria-pressed={saved} onClick={() => toggle(item)}>
      {saved ? "♥ Saved" : "♡ Save"}
    </button>
  );
}

export function ExternalLink({ href, children, className = "" }) {
  if (!href) return <span className="muted">Link unavailable</span>;
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export function PageHead({ title, sub, children }) {
  return (
    <section className="pagehead">
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
      {children}
    </section>
  );
}

export function ReportButton({ itemType, itemId }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [state, setState] = useState({ busy: false, done: false, error: "" });
  async function submit(e) {
    e.preventDefault();
    setState({ busy: true, done: false, error: "" });
    try {
      await api("/reports", { method: "POST", body: JSON.stringify({ itemType, itemId, message: msg }) });
      setState({ busy: false, done: true, error: "" });
      setMsg("");
    } catch (err) { setState({ busy: false, done: false, error: err.message }); }
  }
  if (!open) return <button className="link" onClick={() => setOpen(true)}>Report outdated or wrong info</button>;
  return (
    <form className="report" onSubmit={submit}>
      <label>What is wrong?
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} minLength={10} maxLength={1000} required rows={3} />
      </label>
      <div className="row">
        <button className="btn" disabled={state.busy}>{state.busy ? "Sending..." : "Send report"}</button>
        <button type="button" className="ghost" onClick={() => setOpen(false)}>Close</button>
      </div>
      <p aria-live="polite" className={state.error ? "err" : "muted"}>{state.done ? "Thank you. We will review it." : state.error}</p>
    </form>
  );
}

export function deadlineInfo(d) {
  if (!d) return { label: "Deadline: check official site", tone: "warn" };
  const date = new Date(d);
  const days = Math.ceil((date - new Date()) / 86400000);
  const text = date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  if (days < 0) return { label: `Expired (${text})`, tone: "bad" };
  if (days <= 30) return { label: `Closing soon (${text})`, tone: "warn" };
  return { label: `Deadline: ${text}`, tone: "ok" };
}
