import { createContext, useContext, useEffect, useState } from "react";

const KEY = "tns_shortlist";
const Ctx = createContext(null);

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function ShortlistProvider({ children }) {
  const [items, setItems] = useState(load);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage unavailable: keep in memory */ }
  }, [items]);

  const keyOf = (i) => `${i.type}:${i.id}`;
  const has = (i) => items.some((x) => keyOf(x) === keyOf(i));
  const toggle = (i) => setItems((prev) => (prev.some((x) => keyOf(x) === keyOf(i)) ? prev.filter((x) => keyOf(x) !== keyOf(i)) : [...prev, i]));

  return <Ctx.Provider value={{ items, has, toggle }}>{children}</Ctx.Provider>;
}

export const useShortlist = () => useContext(Ctx);
