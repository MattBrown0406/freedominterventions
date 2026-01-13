import { Link } from "react-router-dom";
import { 
  RefreshCcw, 
  UserX, 
  BatteryLow, 
  Scale, 
  Footprints, 
  HeartPulse 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const signs = [
  {
    icon: RefreshCcw,
    text: "Promises to change that never last",
  },
  {
    icon: UserX,
    text: "You've stopped inviting them to family events",
  },
  {
    icon: BatteryLow,
    text: "You're exhausted from constant crisis management",
  },
  {
    icon: Scale,
    text: "Financial or legal problems are mounting",
  },
  {
    icon: Footprints,
    text: "You're walking on eggshells in your own home",
  },
  {
    icon: HeartPulse,
    text: "You've noticed health decline or overdose scares",
  },
];

const SignsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Signs It May Be Time
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Families often wonder if they're overreacting — or if they've waited too long. 
            Here are signs that professional help may be needed.
          </p>
        </div>

        {/* Signs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {signs.map((sign, index) => {
            const IconComponent = sign.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-background rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <p className="text-foreground font-medium leading-snug">
                  {sign.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If any of these resonate, you're not overreacting — and you're not alone. 
            Taking the next step doesn't mean giving up on them; it means fighting for them.
          </p>
          <Button asChild variant="default" size="lg">
            <Link to="/self-assessment">
              Take Our Free Assessment
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SignsSection;
