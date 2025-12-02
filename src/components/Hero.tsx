import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 organic-blob animate-float opacity-60" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 organic-blob-2 animate-float-delayed opacity-50" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-secondary/40 organic-blob animate-float opacity-40" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Logo */}
          <div 
            className="flex justify-center animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            <img 
              src={logo} 
              alt="Freedom Interventions" 
              className="h-[7rem] md:h-[9rem] w-auto mix-blend-multiply border-2 border-foreground rounded-lg" 
            />
          </div>


          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold text-foreground leading-tight text-balance animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Guiding Families to
            <span className="block text-primary">Hope & Recovery</span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            When addiction takes hold, intervention offers a lifeline. Our compassionate team helps families navigate the path to recovery with dignity and care.
          </p>
          
          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a href="#booking">
              <Button variant="hero" size="xl">
                <Calendar className="w-5 h-5" />
                Free Consultation
              </Button>
            </a>
            <a href="#services">
              <Button variant="hero-outline" size="xl">
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div 
            className="flex flex-wrap items-center gap-6 md:gap-10 justify-center pt-8 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif font-semibold text-foreground">1000+</p>
              <p className="text-sm text-muted-foreground">Families Helped</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif font-semibold text-foreground">20+</p>
              <p className="text-sm text-muted-foreground">Years of Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
