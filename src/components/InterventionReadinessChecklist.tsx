import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardCheck, Mail, Phone, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFunnelAttribution } from "@/lib/funnelAttribution";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

type InterventionReadinessChecklistProps = {
  source: string;
  className?: string;
};

const checklistItems = [
  "A quick family-risk inventory before the next hard conversation",
  "What to gather before a consultation or readiness session",
  "How to spot when the situation has moved past ordinary advice",
  "The next-step ladder: call, consult, coaching, readiness, or full intervention",
];

export default function InterventionReadinessChecklist({ source, className = "" }: InterventionReadinessChecklistProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [urgency, setUrgency] = useState("not_sure");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const sourceAttribution = getFunnelAttribution() ?? {};
    const pagePath = typeof window !== "undefined" ? window.location.pathname : "";

    trackEvent("lead_magnet_submit", {
      source,
      lead_magnet: "intervention_readiness_checklist",
      urgency,
      page_path: pagePath,
    });

    const { error } = await supabase.functions.invoke("send-lead-magnet", {
      body: {
        name,
        email,
        phone: phone || undefined,
        urgency,
        leadMagnet: "intervention_readiness_checklist",
        source,
        pagePath,
        sourceAttribution,
      },
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Checklist could not be sent",
        description: "Please try again or call Matt directly if the situation is urgent.",
        variant: "destructive",
      });
      return;
    }

    setName("");
    setEmail("");
    setPhone("");
    setUrgency("not_sure");
    toast({
      title: "Checklist sent",
      description: "Check your email. Matt has also been notified that you requested it.",
    });
  };

  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container px-6">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-primary/20 bg-card p-6 shadow-sm md:grid-cols-[1fr_0.9fr] md:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <ClipboardCheck className="h-4 w-4" />
              Free intervention readiness checklist
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Before the family makes another move, get the checklist.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              This is built for families who are not sure whether they need coaching, a readiness session, or a formal intervention. It also gives Matt a clearer signal when someone needs follow-up.
            </p>
            <div className="mt-6 grid gap-3">
              {checklistItems.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-background p-5">
            <div className="grid gap-4">
              <div>
                <Label htmlFor={`${source}-checklist-name`} className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Name
                </Label>
                <Input
                  id={`${source}-checklist-name`}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`${source}-checklist-email`} className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id={`${source}-checklist-email`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  maxLength={255}
                  type="email"
                  autoComplete="email"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`${source}-checklist-phone`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id={`${source}-checklist-phone`}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  maxLength={40}
                  type="tel"
                  autoComplete="tel"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`${source}-checklist-urgency`}>What best describes the situation?</Label>
                <select
                  id={`${source}-checklist-urgency`}
                  value={urgency}
                  onChange={(event) => setUrgency(event.target.value)}
                  className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="not_sure">Not sure what level of help fits</option>
                  <option value="safety_or_overdose">Safety, overdose, or disappearance risk</option>
                  <option value="refusing_treatment">Refusing or delaying treatment</option>
                  <option value="family_divided">Family is divided or enabling keeps repeating</option>
                  <option value="ready_for_intervention">Family may be ready for intervention planning</option>
                </select>
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send the checklist"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Confidential. No spam. If this is urgent, call instead of waiting for email.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
