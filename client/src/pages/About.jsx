
import { usePageTitle } from "../hooks/useFetch.js";
import { PageHead } from "../components/ui.jsx";

export default function About() {
  usePageTitle("About TheNextStep");

  return (
    <>
      <PageHead
        title="About TheNextStep"
        sub="Explore your options. Discover your future. Take your next step with confidence."
      />

      <div className="prose">
        <h2>What is TheNextStep?</h2>
        <p>
          TheNextStep is a career guidance and educational discovery
          platform designed to help students explore opportunities
          and make informed decisions about their future. It brings
          important educational information together in one place,
          helping students discover study options, scholarships, and
          international education opportunities.
        </p>

        <h2>What can you explore?</h2>

        <h3>1. Career and Degree Exploration</h3>
        <p>
          Explore different bachelor's degree options based on your
          educational background and interests. Understand course
          duration, eligibility requirements, and possible entrance
          routes to help you make informed decisions about your studies.
        </p>

        <h3>2. Scholarships</h3>
        <p>
          Discover scholarship opportunities, including Karnataka
          government schemes and selected national and international
          scholarships. Explore available information and visit official
          websites to verify eligibility, benefits, and application deadlines.
        </p>

        <h3>3. Study Abroad</h3>
        <p>
          Explore universities across different countries and discover
          international education opportunities. Use the available
          university information as a starting point to research
          institutions and plan your future studies.
        </p>

        <h2>Who is TheNextStep for?</h2>
        <ul>
          <li>
            Students who have completed Class 12 and want to explore
            degree options.
          </li>
          <li>
            Students who want to understand course eligibility and
            educational pathways.
          </li>
          <li>
            Students looking for scholarship opportunities to support
            their education.
          </li>
          <li>
            Students interested in pursuing higher education abroad.
          </li>
        </ul>

        <h2>Our Goal</h2>
        <p>
          Our goal is to make educational information easier to discover
          and understand, helping students identify opportunities,
          compare their options, and take their next step with confidence.
        </p>

        <h2>A Note for Users</h2>
        <p>
          TheNextStep is an educational discovery platform. Eligibility
          requirements, scholarship details, deadlines, fees, and
          admissions policies may change. Always verify the latest
          information on the relevant official website before applying.
        </p>
      </div>
    </>
  );
}
