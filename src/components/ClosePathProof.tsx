import { Award, CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

type ClosePathProofProps = {
  source: string;
  className?: string;
};

const proof = [
  "20+ years helping families move from chaos into a plan",
  "Certified Intervention Professional with lived recovery experience",
  "Clear first-call triage: coaching, readiness intensive, or full intervention",
  "No promise that someone will say yes; a process that changes what the family does next",
];

const ladder = [
  { step: "Free consult", outcome: "Know whether paid help is actually needed." },
  { step: "Crisis coaching", outcome: "Get a concrete script, boundary, and next move." },
  { step: "Readiness intensive", outcome: "Align the family before intervention decisions." },
  { step: "Full intervention", outcome: "Retain Matt for planning, treatment coordination, and intervention." },
];

const firstCallDecisions = [
  "Is this emergency, coaching, readiness work, or intervention-level?",
  "Who in the family must be aligned before the next conversation?",
  "What treatment or safety option needs to be ready before anyone confronts?",
  "What is the next paid step only if the family actually needs it?",
];

export default function ClosePathProof({ source, className = "" }: ClosePathProofProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container px-6">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground">Why families call before they are fully ready</h2>
            <p className="mt-3 text-muted-foreground">
              A good first call does not force a sale. It tells the family what level of help fits the actual risk and what to do next.
            </p>
            <div className="mt-5 space-y-2">
              {ladder.map((item) => (
                <div key={item.step} className="rounded-lg border border-border bg-background p-3">
                  <p className="text-sm font-semibold text-foreground">{item.step}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.outcome}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm font-semibold text-foreground">What gets decided on the first call</p>
              <div className="mt-3 space-y-2">
                {firstCallDecisions.map((item) => (
                  <div key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: `${source}_proof_block` }}>
              <Button className="mt-5">
                <PhoneCall className="h-4 w-4" />
                Call Matt directly
              </Button>
            </TrackedPhoneLink>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {proof.map((item, index) => (
              <div key={item} className="rounded-xl border border-border bg-background p-4">
                <div className="flex gap-3">
                  {index === 3 ? (
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  )}
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
