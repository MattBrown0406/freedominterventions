import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/40 organic-blob animate-float opacity-60" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 organic-blob-2 animate-float-delayed opacity-50" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-accent/10 organic-blob animate-float opacity-40" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium text-accent animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <Leaf className="w-4 h-4" />
              <span>Naturally Crafted with Care</span>
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold text-foreground leading-tight text-balance animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Nurture Your Life
              <span className="block text-primary">Naturally</span>
            </h1>
            
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Discover handcrafted organic products made with love. We believe in sustainable living that nurtures both you and the planet.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button variant="hero" size="xl">
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="hero-outline" size="xl">
                Learn Our Story
              </Button>
            </div>

            {/* Trust indicators */}
            <div 
              className="flex items-center gap-6 justify-center lg:justify-start pt-4 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-serif font-semibold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-serif font-semibold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Organic</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-serif font-semibold text-foreground">5★</p>
                <p className="text-sm text-muted-foreground">Rated</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div 
            className="relative animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-secondary/60 organic-blob" />
              <img
                src="/hero-organic.jpg"
                alt="Organic natural products arrangement with plants and handcrafted items"
                className="relative z-10 w-full h-full object-cover organic-blob-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
