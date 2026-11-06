import { Link } from "react-router-dom";
import "./HolidayCoachingBanner.css";

// November–December 2026 campaign: remove this homepage placement in January 2027.
// Deliberately not clock-gated: prerendered and hydrated content stay consistent.
const HolidayCoachingBanner = () => (
  <section className="fi-holiday" aria-labelledby="holiday-coaching-title">
    <svg className="fi-holiday-lights" viewBox="0 0 240 42" fill="none" aria-hidden="true" focusable="false">
      <path d="M1 2C65 38 174 38 239 2" stroke="currentColor" strokeWidth="1" />
      <g fill="#fff4d6">
        <ellipse cx="32" cy="19" rx="2" ry="3" />
        <ellipse cx="75" cy="29" rx="2" ry="3" />
        <ellipse cx="120" cy="33" rx="2" ry="3" />
        <ellipse cx="165" cy="29" rx="2" ry="3" />
        <ellipse cx="208" cy="19" rx="2" ry="3" />
      </g>
    </svg>
    <div className="fi-holiday-inner">
      <div className="fi-holiday-copy">
        <p className="fi-holiday-eyebrow">
          <svg viewBox="0 0 40 24" fill="none" aria-hidden="true" focusable="false">
            <path d="M3 21 36 3M9 18 8 8M9 18 21 19M17 13 17 3M17 13 29 14M25 9 26 2M25 9 36 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Holiday family planning
        </p>
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
