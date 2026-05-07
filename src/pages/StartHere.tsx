import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ClipboardCheck, Phone, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebPageSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import ClosePathProof from "@/components/ClosePathProof";
import RevenuePathTriage from "@/components/RevenuePathTriage";
import { trackEvent } from "@/lib/analytics";

const options = [
  {
    icon: Phone,
    label: "Immediate",
    title: "We need help now",
    body: "Call Matt directly if safety, treatment entry, or family conflict is moving fast.",
    action: "Call Now",
    href: "tel:+15418386009",
    event: "start_here_call_now",
  },
  {
    icon: Calendar,
    label: "Free",
    title: "We need a first conversation",
    body: "Schedule a free consultation to explain what is happening and get a clear next step.",
    action: "Book Free Consult",
    href: "/?type=consultation#booking",
    event: "start_here_free_consult",
  },
  {
    icon: ClipboardCheck,
    label: "$150",
    title: "We need a family plan",
    body: "Use the paid crisis coaching path when the family needs structured guidance before deciding on an intervention.",
    action: "Crisis Coaching",
    href: "/?type=crisis-coaching#booking",
    event: "start_here_crisis_coaching",
  },
  {
    icon: Users,
    label: "$2,500",
    title: "We may need an intervention",
    body: "Start the readiness path when treatment planning, family alignment, and intervention preparation are likely needed.",
    action: "Book Readiness Intensive",
    href: "/?type=readiness-intensive#booking",
    event: "start_here_readiness",
  },
  {
    icon: ShieldCheck,
    label: "Full engagement",
    title: "We are ready to retain Matt",
    body: "Use the agreement path when the family is aligned enough to begin the formal intervention process.",
    action: "Start Agreement",
    href: "/start-contract",
    event: "start_here_contract",
  },
];

const sourceDoors = [
  {
    title: "Coming from No More Enabling",
    body: "You already see the enabling pattern. Move from education into a professional family plan.",
    href: "/from-no-more-enabling",
    event: "start_here_nme_bridge",
  },
  {
    title: "Coming from Sober Helpline",
    body: "Free support helped you get grounded. Use this when the family needs more than the Monday meeting.",
    href: "/from-sober-helpline",
    event: "start_here_sober_helpline_bridge",
  },
  {
    title: "Coming from Party Wreckers",
    body: "If the podcast sounded familiar, choose the next step before the next crisis chooses it for you.",
    href: "/party-wreckers-podcast",
    event: "start_here_party_wreckers_bridge",
  },
];

const StartHere = () => {
  const trackChoice = (event: string) => {
    trackEvent("start_here_choice", {
      choice: event,
      page_path: "/start-here",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Start Here | Addiction Intervention Help for Families"
        description="Not sure what your family needs next? Start here for a clear path to a call, free consultation, crisis coaching, or intervention readiness support."
        canonical="https://freedominterventions.com/start-here"
        keywords="addiction help start here, family intervention consultation, crisis coaching addiction, intervention readiness"
      />
      <OrganizationSchema />
      <WebPageSchema
        name="Start Here"
        description="A simple triage page that helps families choose the right next step with Freedom Interventions."
        url="https://freedominterventions.com/start-here"
      />
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-border">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <ShieldCheck className="h-4 w-4" />
                Confidential guidance for families
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground">
                Not Sure What to Do Next?
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Choose the path that fits what is happening today. You do not need to diagnose the whole situation before you ask for help, and you do not need to know whether this is coaching, readiness work, or intervention yet.
              </p>
              <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "start_here_hero" }}>
                <Button size="xl" variant="hero">
                  <Phone className="h-5 w-5" />
                  Call Matt Now
                </Button>
              </TrackedPhoneLink>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 border-b border-border bg-muted/20">
          <div className="container px-6">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Coming from one of Matt's other sites?
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                These routes keep the handoff clean so the next step matches what brought you here.
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
              {sourceDoors.map((door) => (
                <Link
                  key={door.title}
                  to={door.href}
                  onClick={() => trackChoice(door.event)}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
                >
                  <p className="mb-3 w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Source bridge
                  </p>
                  <h3 className="font-serif text-xl font-bold text-foreground">{door.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{door.body}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Open the right next step
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Choose the lowest safe next step
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                This is the practical ladder from first conversation to full intervention engagement.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5 max-w-6xl mx-auto">
              {options.map((option) => {
                const Icon = option.icon;
                const content = (
                  <>
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {option.label}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-3">{option.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{option.body}</p>
                    <span className="inline-flex items-center gap-2 font-semibold text-primary">
                      {option.action}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </>
                );

                if (option.href.startsWith("tel:")) {
                  return (
                    <TrackedPhoneLink key={option.title} phoneNumber="+15418386009" metadata={{ location: option.event }}>
                      <div className="h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40">
                        {content}
                      </div>
                    </TrackedPhoneLink>
                  );
                }

                return (
                  <Link
                    key={option.title}
                    to={option.href}
                    onClick={() => trackChoice(option.event)}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <RevenuePathTriage source="start_here" className="bg-muted/20 border-y border-border" compact />
        <ClosePathProof source="start_here" />
      </main>
      <Footer />
    </div>
  );
};

export default StartHere;
