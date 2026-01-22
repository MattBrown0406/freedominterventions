import { Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmpathySection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <Heart className="h-7 w-7 text-primary" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            If You're Reading This...
          </h2>

          {/* Validating Content */}
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
            <p>
              You've probably tried everything — reasoning, pleading, setting ultimatums, 
              waiting for them to "hit bottom." You've made excuses to family, covered for 
              missed events, and Googled for answers at 2am.
            </p>
            <p>
              You're exhausted. You're scared. And you might even feel guilty for considering 
              intervention — wondering if it's "too much" or if you're somehow betraying them.
            </p>
            <p className="text-foreground font-medium">
              But you're still here, still searching. That tells us something important: 
              <span className="text-primary"> you haven't given up on them.</span>
            </p>
          </div>

          {/* Reassurance */}
          <p className="text-lg text-foreground mb-8">
            You don't have to have all the answers. You just need to take the next step.
          </p>

          {/* CTA */}
          <Button asChild size="lg" className="font-semibold">
            <a href="tel:+15418386009">
              <Phone className="h-4 w-4" />
              Let's Talk — Free & Confidential
            </a>
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            No pressure. No judgment. Just a conversation about your options.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmpathySection;
