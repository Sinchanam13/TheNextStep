import { useEffect, useState } from "react";
import { api } from "../api.js";

export function useFetch(path) {
  const [state, setState] = useState({ data: null, loading: !!path, error: null });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!path) { setState({ data: null, loading: false, error: null }); return; }
    const ctl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    api(path, { signal: ctl.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e) => { if (e.name !== "AbortError") setState({ data: null, loading: false, error: e.message }); });
    return () => ctl.abort();
  }, [path, tick]);

  return { ...state, retry: () => setTick((t) => t + 1) };
}

export function useDebounced(value, ms = 350) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);
  return v;
}

export function usePageTitle(title) {
  useEffect(() => { document.title = title ? `${title} | TheNextStep AI` : "TheNextStep AI"; }, [title]);
}
