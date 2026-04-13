import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedArticleCarousel from "./FeaturedArticleCarousel";

const features = [
  "Certified Intervention Professional (CIP)",
  "Direct, judgment-free guidance from Matt",
  "Customized intervention strategies",
  "Coordination with treatment facilities",
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Featured Articles Carousel */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <FeaturedArticleCarousel />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/50 organic-blob -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 organic-blob-2 -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              About Freedom Interventions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
              A Clear Plan When
              <span className="block text-primary">Nothing Else Has Worked</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Watching a loved one disappear into addiction is brutal. Matt works directly with families to bring structure, clarity, and consistent, honest guidance to a situation that usually feels chaotic and exhausting.
              </p>
              <p>
                Over more than 20 years, Matt has helped more than 1,000 families stop managing the chaos and start moving toward treatment. He believes addiction is a medical illness with a spiritual solution, which means treatment has to address both the clinical reality and how a person is living.
              </p>
            </div>
            
            {/* Features */}
            <ul className="space-y-3 py-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link to="/interventionist">
              <Button variant="outline" size="lg">
                Learn More About Matt
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
