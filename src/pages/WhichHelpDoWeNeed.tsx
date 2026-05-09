import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import RevenuePathTriage from "@/components/RevenuePathTriage";
import ClosePathProof from "@/components/ClosePathProof";
import InterventionReadinessChecklist from "@/components/InterventionReadinessChecklist";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrganizationSchema, WebPageSchema } from "@/components/StructuredData";
import { trackEvent } from "@/lib/analytics";

const decisions = [
  {
    icon: AlertTriangle,
    label: "Safety or timing is active",
    title: "Call Matt now",
    description:
      "Choose this if there is overdose risk, disappearance, violence, severe withdrawal, psychosis, a treatment bed available right now, or the family cannot safely wait.",
    nextStep: "Immediate phone triage",
    href: "tel:+15418386009",
    event: "which_help_call_now",
  },
  {
    icon: Calendar,
    label: "Need a professional read",
    title: "Book a free consultation",
    description:
      "Choose this if you need Matt to sort whether this is coaching, treatment planning, readiness work, or a full intervention process.",
    nextStep: "Free consultation",
    href: "/?type=consultation#booking",
    event: "which_help_consultation",
  },
  {
    icon: Users,
    label: "The family is divided",
    title: "Use crisis coaching",
    description:
      "Choose this when the immediate problem is what the family says, stops funding, stops rescuing, or does next.",
    nextStep: "$150 coaching session",
    href: "/?type=crisis-coaching#booking",
    event: "which_help_coaching",
  },
  {
    icon: ShieldCheck,
    label: "This may be intervention-level",
    title: "Check intervention readiness",
    description:
      "Choose this when refusal, relapse, risk, family division, and treatment logistics need a structured plan before the next confrontation.",
    nextStep: "Readiness path",
    href: "/intervention-readiness",
    event: "which_help_readiness",
  },
  {
    icon: FileText,
    label: "The family is ready to retain",
    title: "Start the intervention agreement",
    description:
      "Choose this when decision makers are aligned enough to begin formal intervention planning, treatment coordination, and preparation.",
    nextStep: "Full engagement",
    href: "/start-contract",
    event: "which_help_contract",
  },
];

const quickFilters = [
  "If there is immediate danger, call emergency services first.",
  "If the family is unsure, start with the free consultation.",
  "If the family keeps arguing about boundaries, start with coaching.",
  "If treatment has been refused repeatedly, check readiness.",
  "If the family is already aligned, start the formal agreement.",
];

export default function WhichHelpDoWeNeed() {
  const trackChoice = (choice: string, targetHref: string) => {
    trackEvent("decision_path_choice", {
      choice,
      target_href: targetHref,
      page_path: "/which-help-do-we-need",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Which Addiction Help Does My Family Need? | Freedom Interventions"
        description="A simple decision path for families choosing between a call, free consultation, crisis coaching, intervention readiness, or full professional intervention planning."
        canonical="https://freedominterventions.com/which-help-do-we-need"
        keywords="which addiction help does my family need, addiction intervention consultation, crisis coaching addiction, intervention readiness"
        aiDescription="Freedom Interventions helps families choose the right next step: emergency support, direct call, free consultation, crisis coaching, Family Readiness Intensive, or full intervention planning."
      />
      <OrganizationSchema />
      <WebPageSchema
        name="Which Help Do We Need?"
        description="A decision page that routes families to the safest next step in the Freedom Interventions funnel."
        url="https://freedominterventions.com/which-help-do-we-need"
      />
      <Navbar />

      <main>
        <section className="border-b border-border bg-card pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container px-6">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  <ClipboardCheck className="h-4 w-4" />
                  Decision path for families
                </div>
                <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
                  Which kind of help does your family need right now?
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  You do not have to know whether this is coaching, readiness work, or a formal intervention before you reach out. Use the safest lowest step that can answer the real question today.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "which_help_hero" }}>
                    <Button size="xl" variant="hero">
                      <Phone className="h-5 w-5" />
                      Call Matt Now
                    </Button>
                  </TrackedPhoneLink>
                  <Button asChild size="xl" variant="outline" onClick={() => trackChoice("consultation_hero", "/?type=consultation#booking")}>
                    <Link to="/?type=consultation#booking">
                      <Calendar className="h-5 w-5" />
                      Book Free Consultation
                    </Link>
                  </Button>
                </div>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Quick filter</h2>
                  <div className="mt-5 space-y-3">
                    {quickFilters.map((filter) => (
                      <div key={filter} className="flex gap-3 rounded-xl border border-border bg-background p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm leading-relaxed text-muted-foreground">{filter}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="mx-auto mb-9 max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Choose the path that matches the pressure point
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Every route below is intentionally tied to a revenue path or a high-signal lead action.
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-5">
              {decisions.map((decision) => {
                const Icon = decision.icon;
                const content = (
                  <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{decision.label}</p>
                    <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-foreground">{decision.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{decision.description}</p>
                    <p className="mt-4 rounded-lg bg-muted/40 p-3 text-xs font-semibold text-foreground">{decision.nextStep}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Choose this path
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                );

                if (decision.href.startsWith("tel:")) {
                  return (
                    <TrackedPhoneLink
                      key={decision.title}
                      phoneNumber="+15418386009"
                      metadata={{ location: decision.event }}
                      className="block h-full"
                      onClick={() => trackChoice(decision.event, decision.href)}
                    >
                      {content}
                    </TrackedPhoneLink>
                  );
                }

                return (
                  <Link
                    key={decision.title}
                    to={decision.href}
                    className="block h-full"
                    onClick={() => trackChoice(decision.event, decision.href)}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <InterventionReadinessChecklist source="which_help_decision_page" className="bg-muted/20 border-y border-border" />
        <RevenuePathTriage source="which_help_decision_page" compact />
        <ClosePathProof source="which_help_decision_page" className="bg-muted/20 border-y border-border" />
      </main>

      <Footer />
    </div>
  );
}
