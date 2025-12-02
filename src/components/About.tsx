import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 rounded-2xl overflow-hidden">
                <img
                  src="/about-organic.jpg"
                  alt="Artisan carefully crafting organic products in a bright workshop"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/50 organic-blob -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 organic-blob-2 -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
              Rooted in Nature, 
              <span className="block">Grown with Purpose</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                What started as a small passion project in our kitchen has blossomed into a movement for conscious living. We believe that what you put on your body should be as pure as what you put in it.
              </p>
              <p>
                Every product we create tells a story—of farmers who nurture their land, artisans who pour their hearts into their craft, and a community that values authenticity over artifice.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 py-6">
              <div>
                <p className="text-3xl md:text-4xl font-serif font-semibold text-primary">8+</p>
                <p className="text-muted-foreground mt-1">Years of Excellence</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif font-semibold text-primary">50+</p>
                <p className="text-muted-foreground mt-1">Unique Products</p>
              </div>
            </div>

            <Button variant="outline" size="lg">
              Discover Our Journey
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
