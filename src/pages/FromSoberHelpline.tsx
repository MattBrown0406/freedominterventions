import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ClipboardCheck, Phone, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebPageSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";

const paths = [
  {
    icon: Phone,
    title: "The situation is moving fast",
    description: "Call Matt directly when safety, treatment entry, relapse, disappearance, or family conflict is escalating.",
    cta: "Call Matt Now",
    type: "phone",
    event: "sober_helpline_bridge_call",
  },
  {
    icon: Calendar,
    title: "You need a first conversation",
    description: "Use the free consultation if you need a quick read on whether this is coaching, treatment planning, or intervention work.",
    cta: "Book Free Consultation",
    href: "/?type=consultation#booking",
    event: "sober_helpline_bridge_free_consult",
  },
  {
    icon: Users,
    title: "The family needs a plan",
    description: "Book crisis coaching when the family is divided, enabling is intensifying, or you need a script before the next conversation.",
    cta: "Book Crisis Coaching",
    href: "/?type=crisis-coaching#booking",
    event: "sober_helpline_bridge_crisis_coaching",
  },
  {
    icon: ShieldCheck,
    title: "Intervention may be the next step",
    description: "Start the Family Readiness Intensive when treatment refusal, risk, and family alignment need deeper preparation.",
    cta: "Review Readiness Intensive",
    href: "/family-readiness-intensive",
    event: "sober_helpline_bridge_readiness",
  },
];

const FromSoberHelpline = () => {
  const trackBridgeChoice = (choice: string) => {
    trackEvent("sober_helpline_bridge_choice", {
      choice,
      source: "sober_helpline",
      page_path: "/from-sober-helpline",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Coming From Sober Helpline? | Freedom Interventions"
        description="If Family Squares or Sober Helpline helped you see that your family may need a higher level of help, start here for intervention, crisis coaching, and family readiness options."
        canonical="https://freedominterventions.com/from-sober-helpline"
        keywords="Sober Helpline intervention help, family squares next step, family addiction intervention, intervention readiness, crisis coaching"
      />
      <OrganizationSchema />
      <WebPageSchema
        name="Coming From Sober Helpline"
        description="A dedicated next-step page for families moving from Sober Helpline support into Freedom Interventions services."
        url="https://freedominterventions.com/from-sober-helpline"
      />
      <Navbar />

      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
          <div className="container px-6">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Next step after Sober Helpline
                </div>
                <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-foreground">
                  If free support showed you this is bigger than a Monday meeting, start here.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Sober Helpline is a place to get grounded. Freedom Interventions is where families move into a professional plan when risk is rising, treatment refusal is continuing, or the family cannot keep guessing.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "sober_helpline_bridge_hero" }}>
                    <Button size="xl" variant="hero">
                      <Phone className="h-5 w-5" />
                      Call Matt Now
                    </Button>
                  </TrackedPhoneLink>
                  <Button asChild size="xl" variant="hero-outline" onClick={() => trackBridgeChoice("assessment")}>
                    <Link to="/assessment">
                      <ClipboardCheck className="h-5 w-5" />
                      Complete Assessment
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 shadow-lg">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Use this page when:
                </h2>
                <div className="space-y-3">
                  {[
                    "Family Squares helped, but the situation still feels urgent.",
                    "Your loved one refuses treatment or keeps making promises that do not hold.",
                    "The family is split between waiting, rescuing, threatening, and confronting.",
                    "You need to know whether coaching is enough or intervention planning is needed.",
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
                Choose the right level of help
              </h2>
              <p className="text-lg text-muted-foreground">
                You do not need to know the answer before you reach out. Pick the closest fit for what is happening today.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 max-w-6xl mx-auto">
              {paths.map((path) => {
                const Icon = path.icon;
                const card = (
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
                );

                if (path.type === "phone") {
                  return (
                    <TrackedPhoneLink key={path.title} phoneNumber="+15418386009" metadata={{ location: path.event }} className="block h-full">
                      {card}
                    </TrackedPhoneLink>
                  );
                }

                return (
                  <Link key={path.title} to={path.href || "/"} onClick={() => trackBridgeChoice(path.event)}>
                    {card}
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

export default FromSoberHelpline;
