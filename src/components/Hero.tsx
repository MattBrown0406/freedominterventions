import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import mattPortrait from "@/assets/matt-hero-portrait.jpg";
import TrackedPhoneLink from "./TrackedPhoneLink";
import "./Hero.css";

const journeySteps = [
  {
    title: "Tell me what’s happening.",
    description: "We listen",
  },
  {
    title: "Build the plan",
    description: "Together we determine the team and the message for the intervention.",
  },
  {
    title: "Take action",
    description: "We sit down with your loved one and present the plan with love and with boundaries that will hold.",
  },
  {
    title: "Get your loved one help",
    description:
      "Placement at the appropriate level of care based on clinical needs and financial appropriateness.",
  },
  {
    title: "Support the family",
    description:
      "Build a post-treatment plan, with continued work through successful treatment completion and commitment to an aftercare plan.*",
  },
];

const Hero = () => {
  return (
    <section className="fi-hero" aria-labelledby="home-hero-title">
      <div className="fi-hero-noise" aria-hidden="true" />
      <div className="fi-hero-aurora" aria-hidden="true" />
      <svg
        className="fi-hero-topography"
        viewBox="0 0 1500 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M-80 620 C180 430 390 790 650 540 S1060 240 1580 470" />
        <path d="M-100 690 C170 500 390 850 690 600 S1110 300 1600 525" />
        <path d="M-40 550 C220 370 390 690 620 480 S1040 160 1540 390" />
      </svg>

      <div className="fi-hero-inner">
        <div className="fi-hero-copy">
          <div className="fi-hero-eyebrow">Professional addiction intervention</div>

          <h1 id="home-hero-title" className="fi-hero-title">
            Your family is in crisis.
            <span>You don’t have to guess what comes next.</span>
          </h1>

          <p className="fi-hero-lead">
            Get a clear, confidential plan from Matt Brown—an intervention professional with 20+ years of experience guiding families from fear and division toward treatment and recovery.
          </p>

          <div className="fi-hero-actions">
            <TrackedPhoneLink
              phoneNumber="+14582988000"
              metadata={{ location: "hero_primary_cta" }}
              className="fi-hero-button fi-hero-button-primary"
            >
              <Phone aria-hidden="true" />
              Talk to Matt now
            </TrackedPhoneLink>

            <Link
              to="/book-intervention-consultation#booking"
              className="fi-hero-button fi-hero-button-secondary"
            >
              Book a confidential consultation
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="fi-hero-microcopy">
            <ShieldCheck aria-hidden="true" />
            <span>Private, judgment-free guidance · Nationwide and international support</span>
          </div>
        </div>

        <div className="fi-hero-visual" aria-label="Matt Brown, intervention professional">
          <div className="fi-hero-portrait-wrap">
            <div className="fi-hero-orbit fi-hero-orbit-one" aria-hidden="true" />
            <div className="fi-hero-orbit fi-hero-orbit-two" aria-hidden="true" />

            <div className="fi-hero-portrait-shape">
              <img
                className="fi-hero-portrait"
                src={mattPortrait}
                alt="Matt Brown, Certified Intervention Professional"
                loading="eager"
                width={415}
                height={619}
              />
            </div>

            <div className="fi-hero-credential">
              <div className="fi-hero-credential-label">
                <span aria-hidden="true">✓</span>
                Trusted guidance
              </div>
              <strong>20+ years</strong>
              <p>Helping families move from chaos to a clear plan.</p>
            </div>

            <div className="fi-hero-availability">
              <div>
                <span className="fi-hero-live-dot" aria-hidden="true" />
                <strong>Speak directly with Matt</strong>
              </div>
              <p>No call center. No pressure. Just an honest conversation about what your family needs.</p>
            </div>
          </div>
        </div>

        <div className="fi-hero-journey" aria-label="The path forward">
          <div className="fi-hero-journey-label">The path forward starts with one conversation</div>
          <div className="fi-hero-journey-track">
            {journeySteps.map((step, index) => (
              <div className="fi-hero-step" key={step.title}>
                <i className="fi-hero-step-dot" aria-hidden="true" />
                <strong>{step.title}</strong>
                <span>{step.description}</span>
                <span className="sr-only">Step {index + 1} of {journeySteps.length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="fi-hero-disclaimer">
        <strong>*No outcome is guaranteed.</strong> Continued engagement and support are contingent upon the family’s ongoing participation and compliance with the interventionist’s recommendations and instructions.
      </footer>
    </section>
  );
};

export default Hero;
