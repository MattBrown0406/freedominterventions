import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Calendar, ClipboardCheck, Phone, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";

type RevenuePathTriageProps = {
  source: string;
  className?: string;
  compact?: boolean;
};

const paths = [
  {
    icon: Phone,
    label: "Urgent risk",
    price: "Immediate",
    title: "Call Matt now",
    description: "Use this when there is overdose risk, disappearance, violence, psychosis, a treatment window closing, or the family cannot safely wait.",
    bestFor: "Safety, timing, and fast treatment-window decisions.",
    cta: "Call (541) 668-8084",
    type: "phone",
    event: "triage_call",
  },
  {
    icon: Calendar,
    label: "Need a read",
    price: "Free",
    title: "Book a free consultation",
    description: "Use this when you need Matt to sort whether this is coaching, treatment planning, readiness work, or a full intervention.",
    bestFor: "A first recommendation before spending money.",
    cta: "Book free consult",
    href: "/?type=consultation#booking",
    event: "triage_consult",
  },
  {
    icon: Users,
    label: "Family is divided",
    price: "$150",
    title: "Crisis coaching",
    description: "Use this when the immediate problem is mixed messages, enabling, money, housing, boundaries, or what to say next.",
    bestFor: "A working plan for the next hard conversation.",
    cta: "Book crisis coaching",
    href: "/?type=crisis-coaching#booking",
    event: "triage_coaching",
  },
  {
    icon: ShieldCheck,
    label: "Pre-intervention plan",
    price: "$2,500",
    title: "Family Readiness Intensive",
    description: "Use this when refusal, relapse, risk, and family alignment require a professional plan before deciding on full intervention.",
    bestFor: "Pre-intervention strategy and family alignment.",
    cta: "Book readiness intensive",
    href: "/?type=readiness-intensive#booking",
    event: "triage_readiness",
  },
  {
    icon: ClipboardCheck,
    label: "Ready to begin",
    price: "Full engagement",
    title: "Full intervention agreement",
    description: "Use this when the family is aligned enough to begin the formal intervention process and treatment coordination.",
    bestFor: "Families ready for formal intervention work.",
    cta: "Start agreement",
    href: "/start-contract",
    event: "triage_contract",
  },
];

export default function RevenuePathTriage({ source, className = "", compact = false }: RevenuePathTriageProps) {
  const trackChoice = (event: string) => {
    trackEvent("revenue_path_triage_click", {
      choice: event,
      source,
    });
  };

  return (
    <section className={`py-14 md:py-20 ${className}`}>
      <div className="container px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <AlertTriangle className="h-4 w-4" />
              Choose by urgency, not by guesswork
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              What kind of help does your family need today?
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              You should not have to figure out the right level of help while you are scared. Start with the lowest level that can safely answer the question, and Matt will redirect you if a different level of help fits.
            </p>
          </div>

          <div className={`grid gap-4 ${compact ? "md:grid-cols-2 xl:grid-cols-5" : "md:grid-cols-2 xl:grid-cols-5"}`}>
            {paths.map((path) => {
              const Icon = path.icon;
              const content = (
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {path.price}
                    </span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{path.label}</p>
                  <h3 className="mt-1 font-serif text-xl font-bold text-foreground">{path.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{path.description}</p>
                  <p className="mt-3 rounded-lg bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Best for:</span> {path.bestFor}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {path.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              );

              if (path.type === "phone") {
                return (
                  <TrackedPhoneLink key={path.title} phoneNumber="+14582988000" metadata={{ location: `${source}_${path.event}` }} className="block h-full" onClick={() => trackChoice(path.event)}>
                    {content}
                  </TrackedPhoneLink>
                );
              }

              return (
                <Link key={path.title} to={path.href || "/"} className="block h-full" onClick={() => trackChoice(path.event)}>
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5 md:flex md:items-center md:justify-between md:gap-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              The ladder is intentionally simple: free consultation, paid crisis coaching, Family Readiness Intensive, then full intervention engagement when the family is ready to retain.
            </p>
            <Button asChild className="mt-4 md:mt-0" onClick={() => trackChoice("assessment")}>
              <Link to="/assessment">
                Complete assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
