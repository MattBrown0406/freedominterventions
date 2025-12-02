import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const features = [
  "Certified Intervention Professionals (CIP)",
  "Compassionate, judgment-free approach",
  "Customized intervention strategies",
  "Coordination with treatment facilities",
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image placeholder with gradient */}
              <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 flex items-center justify-center">
                <img
                  src="/about-organic.jpg"
                  alt="Supportive intervention session"
                  className="w-full h-full object-cover"
                />
              </div>
              
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
              Breaking the Chains of
              <span className="block text-primary">Addiction Together</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                At Freedom Interventions, we understand that watching a loved one struggle with addiction is one of life's greatest challenges. Our mission is to guide families through this difficult time with expertise, compassion, and unwavering support.
              </p>
              <p>
                We have helped over 1000 families in the course of over 20 years take the first steps towards recovery and healing.
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

            <Button variant="outline" size="lg">
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
