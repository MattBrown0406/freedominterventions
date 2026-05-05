import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";

import mattPortrait from "@/assets/matt-hero-portrait.jpg";
import TrackedPhoneLink from "./TrackedPhoneLink";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-36">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 organic-blob animate-float opacity-60" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 organic-blob-2 animate-float-delayed opacity-50" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-secondary/40 organic-blob animate-float opacity-40" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">

          {/* Matt's portrait */}
          <div
            className="flex justify-center animate-fade-up"
            style={{ animationDelay: "0.08s" }}
          >
            <img
              src={mattPortrait}
              alt="Matt Brown, Certified Intervention Professional"
              className="h-44 w-44 md:h-52 md:w-52 rounded-full object-cover object-top border-4 border-primary/20 shadow-lg"
              loading="eager"
              width={208}
              height={208}
            />
          </div>

          {/* Headline */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            When Addiction Has Your Family in Crisis,
            <span className="block text-primary mt-2">Waiting Makes It Worse</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            If your loved one is spiraling and your family is scared, exhausted, or divided, you do not need more guesswork. You need experienced professional guidance now. We help families take the right next step before the situation gets worse.
          </p>

          {/* CTAs */}
          <div
            className="space-y-3 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex justify-center">
              <TrackedPhoneLink
                phoneNumber="+15418386009"
                metadata={{ location: 'hero_primary_cta' }}
              >
                <Button variant="hero" size="xl">
                  <Phone className="w-5 h-5" />
                  Get Help Now
                </Button>
              </TrackedPhoneLink>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a href="/?type=crisis-coaching#booking">
                <Button variant="hero-outline" size="xl">
                  <Calendar className="w-5 h-5" />
                  Book a Crisis Coaching Session
                </Button>
              </a>
              <a href="/family-readiness-intensive">
                <Button variant="hero-outline" size="xl">
                  <Calendar className="w-5 h-5" />
                  Book a Family Readiness Intensive
                </Button>
              </a>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto pt-2">
              Confidential help for families in crisis. Professional intervention and coaching options available.
            </p>
          </div>

          {/* Trust badges */}
          <div 
            className="flex flex-wrap items-center gap-3 justify-center pt-6 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { icon: "✓", label: "CIP Certified" },
              { icon: "✓", label: "20+ Years Experience" },
              { icon: "✓", label: "Direct Family Guidance Into Treatment" },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-foreground"
              >
                <span className="text-primary font-bold">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
