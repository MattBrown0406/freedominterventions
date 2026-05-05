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
              A good first call does not force a sale. It tells the family what level of help fits the actual risk.
            </p>
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
