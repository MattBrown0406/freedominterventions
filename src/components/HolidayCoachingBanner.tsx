import { Link } from "react-router-dom";
import "./HolidayCoachingBanner.css";

// November–December 2026 campaign: remove this homepage placement in January 2027.
// Deliberately not clock-gated: prerendered and hydrated content stay consistent.
const HolidayCoachingBanner = () => (
  <section className="fi-holiday" aria-labelledby="holiday-coaching-title">
    <div className="fi-holiday-inner">
      <div className="fi-holiday-copy">
        <p className="fi-holiday-eyebrow">Holiday family planning</p>
        <h2 id="holiday-coaching-title">Make a plan before the holiday gathering.</h2>
        <p className="fi-holiday-description">
          Focused coaching with Matt to talk through invitations, boundaries, money,
          and communication—and work toward a shared family plan.
        </p>
      </div>
      <Link
        className="fi-holiday-cta"
        to="/book-intervention-consultation?type=crisis-coaching#booking"
      >
        Plan your holiday coaching session
      </Link>
    </div>
  </section>
);

export default HolidayCoachingBanner;
