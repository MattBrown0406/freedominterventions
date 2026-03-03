import { Link } from "react-router-dom";
import { Phone, Users, Heart, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    icon: Phone,
    title: "Free Consultation",
    description: "A confidential conversation to understand your unique situation and explore options.",
  },
  {
    number: 2,
    icon: Users,
    title: "Family Preparation",
    description: "We educate and align your family around a unified, loving approach.",
  },
  {
    number: 3,
    icon: Heart,
    title: "The Intervention",
    description: "A structured, compassionate conversation guided by a professional interventionist.",
  },
  {
    number: 4,
    icon: HeartHandshake,
    title: "Treatment & Aftercare",
    description: "Coordination with treatment facilities and ongoing family support.",
  },
];

const ProcessOverview = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            What to Expect
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The intervention process can feel overwhelming, but you won't navigate it alone. 
            Here's how we guide families from crisis to recovery.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 relative">
            {/* Connecting Line */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
            
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  {/* Step Number & Icon */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  
                  {/* Content */}
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile: Vertical Layout */}
          <div className="md:hidden space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="relative flex gap-4">
                  {/* Vertical Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-border" />
                  )}
                  
                  {/* Step Icon */}
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <IconComponent className="h-6 w-6 text-primary-foreground" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to take the first step?
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Book Your Free Consultation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;
