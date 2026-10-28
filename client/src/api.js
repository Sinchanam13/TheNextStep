const BASE = import.meta.env.VITE_API_URL || "/api";

export const qs = (obj) => {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => { if (v !== "" && v != null) p.set(k, v); });
  const s = p.toString();
  return s ? `?${s}` : "";
};

export async function api(path, opts = {}) {
  let res;
  try {
    res = await fetch(BASE + path, {
      ...opts,
      headers: { Accept: "application/json", ...(opts.body ? { "Content-Type": "application/json" } : {}) },
    });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new Error("Cannot reach the server. Check your connection and try again.");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  return data;
}
