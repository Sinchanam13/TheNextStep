import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useShortlist } from "./context/Shortlist.jsx";
import Home from "./pages/Home.jsx";
import Careers from "./pages/Careers.jsx";
import DegreeDetail from "./pages/DegreeDetail.jsx";
import Abroad from "./pages/Abroad.jsx";
import Scholarships from "./pages/Scholarships.jsx";
import Shortlist from "./pages/Shortlist.jsx";
import About from "./pages/About.jsx";

export default function App() {
  const { items } = useShortlist();
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`top ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap bar">
          <NavLink to="/" className="brand"><span className="logo">N</span>TheNextStep<span className="ai">AI</span></NavLink>
          <nav aria-label="Main">
            <NavLink to="/careers">Degrees</NavLink>
            <NavLink to="/scholarships">Scholarships</NavLink>
            <NavLink to="/abroad">Study Abroad</NavLink>
            <NavLink to="/shortlist">Shortlist{items.length ? <b className="count">{items.length}</b> : null}</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>
      </header>
      <main id="main" key={loc.pathname} className="page">
        <Routes location={loc}>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<div className="wrap"><Careers /></div>} />
          <Route path="/careers/:slug" element={<div className="wrap"><DegreeDetail /></div>} />
          <Route path="/abroad" element={<div className="wrap"><Abroad /></div>} />
          <Route path="/scholarships" element={<div className="wrap"><Scholarships /></div>} />
          <Route path="/shortlist" element={<div className="wrap"><Shortlist /></div>} />
          <Route path="/about" element={<div className="wrap"><About /></div>} />
          <Route path="*" element={<div className="wrap"><p>Page not found.</p></div>} />
        </Routes>
      </main>
      <footer className="foot">
        <div className="wrap">Information is a starting point. Always confirm eligibility, dates and fees on the official site before applying.</div>
      </footer>
    </>
  );
}