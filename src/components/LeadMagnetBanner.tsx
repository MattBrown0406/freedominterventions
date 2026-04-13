import { ClipboardList, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const LeadMagnetBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-accent/20 via-accent/10 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />

      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">

              {/* Left — Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">
                    Family Assessment
                  </span>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Not sure where to start?
                </h2>

                <p className="text-muted-foreground mb-6">
                  Answer 6 questions and get a personalized recommendation for your family's next step — free, no commitment, no sales pitch.
                </p>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Identify enabling patterns keeping things stuck</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Understand how serious the situation really is</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Get a clear next step — intervention, support, or resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Takes about 2 minutes</span>
                  </li>
                </ul>
              </div>

              {/* Right — CTA */}
              <div className="bg-muted/30 p-8 md:p-10 flex flex-col justify-center items-center text-center">
                <ClipboardList className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  Free Family Situation Assessment
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Personalized guidance based on your specific situation. No account needed.
                </p>

                <a
                  href="https://soberhelpline.com/family-situation-assessment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button size="lg" className="w-full gap-2">
                    Schedule Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>

                <p className="text-xs text-muted-foreground mt-4">
                  Free · 2 minutes · No account required
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetBanner;
