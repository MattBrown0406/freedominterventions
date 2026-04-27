import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ClipboardCheck, Phone, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebPageSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";

const options = [
  {
    icon: Phone,
    title: "We need help now",
    body: "Call Matt directly if safety, treatment entry, or family conflict is moving fast.",
    action: "Call Now",
    href: "tel:+15418386009",
    event: "start_here_call_now",
  },
  {
    icon: Calendar,
    title: "We need a first conversation",
    body: "Schedule a free consultation to explain what is happening and get a clear next step.",
    action: "Book Free Consult",
    href: "/?type=consultation#booking",
    event: "start_here_free_consult",
  },
  {
    icon: ClipboardCheck,
    title: "We need a family plan",
    body: "Use the paid crisis coaching path when the family needs structured guidance before deciding on an intervention.",
    action: "Crisis Coaching",
    href: "/?type=crisis-coaching#booking",
    event: "start_here_crisis_coaching",
  },
  {
    icon: Users,
    title: "We may need an intervention",
    body: "Start the readiness path when treatment planning, family alignment, and intervention preparation are likely needed.",
    action: "Readiness Intensive",
    href: "/family-readiness-intensive",
    event: "start_here_readiness",
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
                Choose the path that fits what is happening today. You do not need to diagnose the whole situation before you ask for help.
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

        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="grid gap-5 md:grid-cols-2 max-w-6xl mx-auto">
              {options.map((option) => {
                const Icon = option.icon;
                const content = (
                  <>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
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
                      <div className="h-full rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40">
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
                    className="rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
                  >
                    {content}
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

export default StartHere;
