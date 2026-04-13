import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import logo from "@/assets/logo.jpeg";
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
          {/* Logo - priority load for LCP */}
          <div 
            className="flex justify-center animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            <img 
              src={logo} 
              alt="Freedom Interventions" 
              className="h-[7rem] md:h-[9rem] w-auto mix-blend-multiply border-2 border-foreground rounded-lg object-contain" 
              loading="eager"
              fetchPriority="high"
              width={266}
              height={295}
            />
          </div>


          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold text-foreground leading-tight text-balance animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Matt Brown, 
            <span className="block text-primary">Certified Intervention Professional</span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Helping families get loved ones into treatment for over 20 years. Matt works directly with families to build a clear plan, align everyone involved, and move their loved one toward treatment.
          </p>
          
          {/* Emergency Phone Number - Prominent for crisis situations */}
          <div 
            className="animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <TrackedPhoneLink 
              phoneNumber="+15418386009" 
              metadata={{ location: 'hero_emergency' }}
              className="group"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-xl border-2 border-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-foreground/20 rounded-full group-hover:bg-primary-foreground/30 transition-colors">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium opacity-90">Crisis Support Available 7 Days a Week</div>
                  <div className="text-xl font-bold">(541) 838-6009</div>
                </div>
              </div>
            </TrackedPhoneLink>
          </div>
          
          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a href="#booking">
              <Button variant="hero" size="xl">
                <Calendar className="w-5 h-5" />
                Schedule Free Consultation
              </Button>
            </a>
            <a href="#services">
              <Button variant="hero-outline" size="xl">
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Trust badges */}
          <div 
            className="flex flex-wrap items-center gap-3 justify-center pt-6 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { icon: "✓", label: "Certified Intervention Professional (CIP)" },
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
