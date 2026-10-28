import { usePageTitle } from "../hooks/useFetch.js";
import { PageHead } from "../components/ui.jsx";

export default function About() {
  usePageTitle("About and data sources");
  return (
    <>
      <PageHead title="About this project" sub="How the information is collected, and what to double-check." />
      <div className="prose">
        <h2>Where the data comes from</h2>
        <ul>
          <li><b>Degrees:</b> the catalog is built from a list of bachelor's degrees plus rules for each degree family (stream, duration, eligibility, entrance route). Every degree links to an official source. Entries marked "Unverified" follow the usual rules and have not been checked individually yet.</li>
          <li><b>Scholarships:</b> Karnataka government schemes (for studying in India and abroad) come first, then national and international options. Each entry links to the official page. Amounts and deadlines show "check the official page" until they are confirmed.</li>
          <li><b>Universities:</b> a public dataset (Hipolabs Universities API). It does not include every university, and some website links may be outdated.</li>
        </ul>
        <h2>Please note</h2>
        <p>This site is a discovery tool, not an admissions or financial advisor. Dates, eligibility and fees change often, so always confirm them on the official website before you apply.</p>
        <p>Found something wrong? Use the "Report outdated or wrong info" link on a degree or scholarship.</p>
      </div>
    </>
  );
}
