import familyBridgeLogo from "@/assets/familybridge-logo.png.asset.json";
import "./FamilyBridgeBanner.css";

const FAMILYBRIDGE_APP_STORE_URL =
  "https://apps.apple.com/us/app/family-bridge-recovery/id6757375159";

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
      <img
        className="fi-familybridge-icon"
        src={familyBridgeLogo.url}
        alt="FamilyBridge app icon"
        width={96}
        height={96}
        loading="lazy"
      />
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
