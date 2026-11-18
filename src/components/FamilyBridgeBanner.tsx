import "./FamilyBridgeBanner.css";

// FamilyBridge app promo. Swap FAMILYBRIDGE_APP_STORE_URL for the real App
// Store link once Matt provides it.
const FAMILYBRIDGE_APP_STORE_URL =
  "https://www.apple.com/app-store/";

const FamilyBridgeBanner = () => (
  <section className="fi-familybridge" aria-labelledby="familybridge-title">
    <svg
      className="fi-familybridge-rays"
      viewBox="0 0 420 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="10" strokeLinecap="round">
        <path d="M210 330 210 40" />
        <path d="M210 330 60 90" />
        <path d="M210 330 360 90" />
        <path d="M210 330 -10 220" />
        <path d="M210 330 430 220" />
      </g>
    </svg>
    <div className="fi-familybridge-inner">
      <div className="fi-familybridge-icon" aria-hidden="true">
        <svg viewBox="0 0 72 72" fill="none" focusable="false">
          <g stroke="#e8913d" strokeWidth="3.5" strokeLinecap="round">
            <path d="M36 30 36 12" />
            <path d="M36 30 20 16" />
            <path d="M36 30 52 16" />
            <path d="M36 30 10 26" />
            <path d="M36 30 62 26" />
          </g>
          <path
            d="M14 44c0-12 10-22 22-22s22 10 22 22"
            stroke="#f4f7f5"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="29" cy="38" r="4" fill="#e8913d" />
          <circle cx="43" cy="38" r="4" fill="#e8913d" />
          <path
            d="M24 44c0-4 3-7 7-7M41 44c0-4 3-7 7-7"
            stroke="#e8913d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <g stroke="#7fb8b2" strokeWidth="3" strokeLinecap="round">
            <path d="M14 54c6-4 12 4 18 0s12 4 18 0" />
            <path d="M20 62c5-3 10 3 15 0s10 3 15 0" />
          </g>
        </svg>
      </div>
      <div className="fi-familybridge-copy">
        <p className="fi-familybridge-eyebrow">FamilyBridge</p>
        <h2 id="familybridge-title">One plan. One voice.</h2>
        <p className="fi-familybridge-description">
          The free app that helps your family face addiction together.
        </p>
        <p className="fi-familybridge-credit">Built by a certified interventionist</p>
      </div>
      <div className="fi-familybridge-cta-wrap">
        <a
          className="fi-familybridge-cta"
          href={FAMILYBRIDGE_APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the free app
        </a>
        <span className="fi-familybridge-store">On the App Store</span>
      </div>
    </div>
  </section>
);

export default FamilyBridgeBanner;
