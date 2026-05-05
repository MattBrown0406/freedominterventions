import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ClipboardCheck, Phone, ShieldAlert, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebPageSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";

const nextSteps = [
  {
    icon: ClipboardCheck,
    title: "You need Matt to see the whole picture",
    description: "Complete the assessment when you need a structured read on urgency, risk, family leverage, and whether intervention planning makes sense.",
    cta: "Complete Assessment",
    href: "/assessment",
    event: "nme_bridge_assessment",
  },
  {
    icon: Calendar,
    title: "You need a first conversation",
    description: "Book a free consultation when you know the family cannot keep doing the same thing and you need a clear recommendation.",
    cta: "Book Free Consultation",
    href: "/?type=consultation#booking",
    event: "nme_bridge_consultation",
  },
  {
    icon: Users,
    title: "The family needs coaching now",
    description: "Book crisis coaching if the family is divided, enabling has escalated, or you need a plan before the next hard conversation.",
    cta: "Book Crisis Coaching",
    href: "/?type=crisis-coaching#booking",
    event: "nme_bridge_coaching",
  },
  {
    icon: ShieldCheck,
    title: "Intervention may be next",
    description: "Use the intervention readiness path when treatment refusal, serious risk, and family exhaustion are all present.",
    cta: "Check Intervention Readiness",
    href: "/intervention-readiness",
    event: "nme_bridge_intervention_readiness",
  },
];

const FromNoMoreEnabling = () => {
  const trackChoice = (choice: string) => {
    trackEvent("nme_bridge_choice", {
      choice,
      source: "no_more_enabling",
      page_path: "/from-no-more-enabling",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Coming From No More Enabling? | Freedom Interventions"
        description="If No More Enabling helped you realize education is not enough anymore, start here for family addiction consultation, coaching, and professional intervention planning."
        canonical="https://freedominterventions.com/from-no-more-enabling"
        keywords="No More Enabling next step, family addiction intervention, stop enabling professional help, addiction intervention readiness"
      />
      <OrganizationSchema />
      <WebPageSchema
        name="Coming From No More Enabling"
        description="A dedicated next-step page for No More Enabling readers who may need professional intervention, crisis coaching, or family consultation."
        url="https://freedominterventions.com/from-no-more-enabling"
      />
      <Navbar />

      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
          <div className="container px-6">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <ShieldAlert className="h-4 w-4" />
                  Next step after No More Enabling
                </div>
                <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-foreground">
                  If you are done enabling but do not know what to do next, start here.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  No More Enabling helps families name the pattern. Freedom Interventions helps families build the next move when love, fear, money, threats, and rescue have all become tangled together.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "nme_bridge_hero" }}>
                    <Button size="xl" variant="hero">
                      <Phone className="h-5 w-5" />
                      Call Matt Now
                    </Button>
                  </TrackedPhoneLink>
                  <Button asChild size="xl" variant="hero-outline" onClick={() => trackChoice("intervention_readiness")}>
                    <Link to="/intervention-readiness">
                      <ShieldCheck className="h-5 w-5" />
                      Check Intervention Readiness
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 shadow-lg">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  This is for families who recognize:
                </h2>
                <div className="space-y-3">
                  {[
                    "The family keeps rescuing, paying, explaining, or absorbing consequences.",
                    "Your loved one can promise change but cannot sustain it.",
                    "Everyone is exhausted, but no one agrees on what boundary comes next.",
                    "Waiting for rock bottom now feels more dangerous than taking action.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Move from insight to a plan
              </h2>
              <p className="text-lg text-muted-foreground">
                Pick the closest fit. The goal is not to know the answer before you reach out; the goal is to stop guessing alone.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 max-w-6xl mx-auto">
              {nextSteps.map((path) => {
                const Icon = path.icon;
                return (
                  <Link key={path.title} to={path.href} onClick={() => trackChoice(path.event)} className="block h-full">
                    <div className="h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{path.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{path.description}</p>
                      <span className="inline-flex items-center gap-2 font-semibold text-primary">
                        {path.cta}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FromNoMoreEnabling;
