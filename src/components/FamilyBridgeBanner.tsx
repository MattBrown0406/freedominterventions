import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/app/id6744403069";

const FamilyBridgeBanner = () => {
  return (
    <section className="py-14 md:py-20 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Icon */}
          <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
            <Smartphone className="w-10 h-10 text-primary" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wide mb-1">
              New from Matt Brown
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              FamilyBridge — AI Support for Families Dealing with Addiction
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
              Not ready to call yet? FamilyBridge gives families real-time
              AI support — how to communicate, how to stop enabling,
              and how to take the right next step. Built by Matt Brown from
              20+ years in the field.
            </p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="xl" className="whitespace-nowrap gap-2">
                <Smartphone className="w-5 h-5" />
                Download on iOS — AI Support App
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyBridgeBanner;
