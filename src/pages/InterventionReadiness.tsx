import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Calendar, CheckCircle2, ClipboardCheck, Phone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebPageSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import ClosePathProof from "@/components/ClosePathProof";
import RevenuePathTriage from "@/components/RevenuePathTriage";
import InterventionReadinessChecklist from "@/components/InterventionReadinessChecklist";
import MoneyPathCTA from "@/components/MoneyPathCTA";
import { trackEvent } from "@/lib/analytics";

const readinessSignals = [
  "Your loved one refuses treatment, quits quickly, or keeps making promises that do not hold.",
  "The family is split between rescuing, threatening, minimizing, and cutting them off.",
  "There is real risk: overdose scares, violence, severe mental health symptoms, legal trouble, homelessness, or disappearance.",
  "Money, housing, transportation, or emotional rescue are keeping the cycle alive.",
  "The family needs a treatment destination and a unified message before the conversation happens.",
];

const InterventionReadiness = () => {
  const trackChoice = (choice: string) => {
    trackEvent("intervention_readiness_choice", {
      choice,
      page_path: "/intervention-readiness",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Is It Time to Hire an Interventionist? | Freedom Interventions"
        description="A high-intent intervention readiness path for families deciding whether coaching, a Family Readiness Intensive, or professional intervention is the right next step."
        canonical="https://freedominterventions.com/intervention-readiness"
        keywords="hire an interventionist, intervention readiness, addiction intervention help, professional intervention planning"
      />
      <OrganizationSchema />
      <WebPageSchema
        name="Intervention Readiness"
        description="A decision page for families considering professional intervention planning."
        url="https://freedominterventions.com/intervention-readiness"
      />
      <Navbar />

      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container px-6">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  Intervention readiness
                </div>
                <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
                  If your family keeps circling the same crisis, it may be time to bring in help.
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                  A professional intervention is not a threat or a last-ditch ambush. It is a prepared family process with a clear treatment plan, a unified message, and real follow-through.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <TrackedPhoneLink phoneNumber="+15416688084" metadata={{ location: "intervention_readiness_hero" }}>
                    <Button size="xl" variant="secondary">
                      <Phone className="h-5 w-5" />
                      Call Matt Now
                    </Button>
                  </TrackedPhoneLink>
                  <Button asChild size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => trackChoice("assessment")}>
                    <Link to="/assessment">
                      <ClipboardCheck className="h-5 w-5" />
                      Complete Assessment
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 shadow-lg">
                <h2 className="font-serif text-2xl font-bold mb-4">Fastest path to clarity</h2>
                <div className="space-y-3">
                  {[
                    "Call if safety, overdose risk, or disappearance is active.",
                    "Book a consultation if you need Matt to triage the case.",
                    "Complete the assessment if you want the strongest read before a call.",
                    "Use the Family Readiness Intensive if the family needs a plan now.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 p-3">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                      <p className="text-sm leading-relaxed text-primary-foreground/85">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <AlertTriangle className="mx-auto h-10 w-10 text-primary mb-4" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Signs the family may be intervention-ready
                </h2>
                <p className="text-lg text-muted-foreground">
                  One sign alone does not decide the case. Patterns do.
                </p>
              </div>
              <div className="grid gap-4">
                {readinessSignals.map((signal) => (
                  <div key={signal} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-muted-foreground leading-relaxed">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30 border-y border-border">
          <div className="container px-6">
            <div className="max-w-5xl mx-auto grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Free Consultation",
                  description: "A quick triage call to decide whether coaching, readiness work, or intervention planning is the right fit.",
                  href: "/?type=consultation#booking",
                  cta: "Book Consult",
                },
                {
                  title: "Family Readiness Intensive",
                  description: "A 90-minute planning session plus 7 days of direct support when the family needs a real plan now.",
                  href: "/?type=readiness-intensive#booking",
                  cta: "Book Intensive",
                },
                {
                  title: "Intervention Agreement",
                  description: "For families ready to retain Matt for a full professional intervention process and treatment coordination.",
                  href: "/start-contract",
                  cta: "Start Agreement",
                },
              ].map((item) => (
                <Link key={item.title} to={item.href} onClick={() => trackChoice(item.title)} className="block h-full">
                  <div className="h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                    <span className="inline-flex items-center gap-2 font-semibold text-primary">
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <RevenuePathTriage source="intervention_readiness" compact />
        <InterventionReadinessChecklist source="intervention_readiness" className="bg-muted/20 border-y border-border" />
        <MoneyPathCTA
          source="intervention_readiness"
          title="If this feels intervention-level, do not let the next move be improvised."
          description="Get the checklist, choose the decision path, or talk to Matt before the family confronts, threatens, rescues, or waits again."
        />
        <ClosePathProof source="intervention_readiness" className="bg-muted/20 border-y border-border" />

        <section className="py-16 md:py-24">
          <div className="container px-6 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              The goal is not pressure. The goal is clarity.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              If intervention is not the right next step, Matt should tell you. If it is, the family needs to know what has to happen before the conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" onClick={() => trackChoice("free_consult_footer")}>
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <TrackedPhoneLink phoneNumber="+15416688084" metadata={{ location: "intervention_readiness_footer" }}>
                <Button variant="outline" size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </TrackedPhoneLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InterventionReadiness;
