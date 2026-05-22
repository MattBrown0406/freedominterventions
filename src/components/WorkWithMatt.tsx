import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, CheckCircle2, Shield, Users } from "lucide-react";
import mattHeadshot from "@/assets/matt-headshot.jpg";
import { trackEvent } from "@/lib/analytics";

const proofPoints = [
  "Certified Intervention Professional (CIP)",
  "20+ years sober, 1,000+ families served",
  "Trained in invitational & structured surprise models",
];

const approachPillars = [
  {
    title: "Stabilize the Family",
    description: "You get immediate direction, scripts, and boundary plans tailored to your dynamics—no vague theory.",
  },
  {
    title: "Align the Narrative",
    description: "We remove mixed messages so your loved one faces one clear, loving, unshakeable message.",
  },
  {
    title: "Secure Ethical Care",
    description: "Placement recommendations are treatment-agnostic and based on what the case requires—not referral fees.",
  },
];

const WorkWithMatt = () => {
  return (
    <section id="work-with-matt" className="py-20 bg-card/40">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="text-sm uppercase tracking-wide">
              Work Directly With Matt Brown
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
              When you bring me in, you get a strategist, facilitator, and advocate—not another vendor.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Families hire me when they can’t afford another false start. I stay hands-on from the first triage call
              through treatment placement, early recovery, and family reintegration so you are never guessing what comes next.
            </p>

            <div className="space-y-3">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-base text-foreground font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {approachPillars.map((pillar) => (
                <div key={pillar.title} className="p-4 rounded-2xl border border-border bg-background/80">
                  <h3 className="text-base font-semibold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="gap-2"
                asChild
                onClick={() => trackEvent("cta_book_call", { location: "work_with_matt" })}
              >
                <a href="/?type=consultation#booking">
                  <Calendar className="w-5 h-5" />
                  Schedule a Strategy Call
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                asChild
                onClick={() => trackEvent("cta_call", { location: "work_with_matt" })}
              >
                <a href="tel:541-668-8084">
                  <Phone className="w-5 h-5" />
                  Call (541) 668-8084
                </a>
              </Button>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>No retainers. Fee paid in full, engagement lasts until the client completes treatment successfully.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
              <img
                src={mattHeadshot}
                alt="Matt Brown - Freedom Interventions"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background border border-border rounded-2xl shadow-lg p-5 w-[90%]">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">Average engagement: 45 days of guided change</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Families leave with a written plan, treatment placement, and a united strategy to keep progress intact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithMatt;
