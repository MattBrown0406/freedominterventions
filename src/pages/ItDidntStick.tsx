import { Link } from "react-router-dom";
import { Calendar, Phone, ArrowRight, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebPageSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";

const BOOKING_HREF = "/book-intervention-consultation?type=consultation#booking";

const timeline = [
  {
    label: "Week 1",
    body: "They look better. Everyone is tired. Privileges come back because it feels mean to keep them off.",
  },
  {
    label: "Week 2–3",
    body: "\"I'm fine.\" Meetings drop. The phone comes back. Money and the car follow.",
  },
  {
    label: "The slip",
    body: "One night, one text, one \"I can handle it.\" The family either pretends it didn't happen or starts another home dry-out.",
  },
  {
    label: "What was missing",
    body: "The family system did not change. Treatment ended. The house went back to the old rules.",
  },
];

const donts = [
  "Do not book another 30-day stay from a Google ad just to get them out of the house.",
  "Do not start another home detox or \"we'll watch them.\"",
  "Do not hand back the car, the debit card, or the spare key because they promised.",
  "Do not have one more late-night argument about whether it \"counts\" as a relapse.",
  "Do not wait for them to ask for help again. That is not how this disease works.",
];

const CtaRow = ({ location }: { location: string }) => (
  <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
    <Button asChild size="lg" className="gap-2">
      <Link to={BOOKING_HREF}>
        <Calendar className="h-5 w-5" />
        Book a confidential consultation
      </Link>
    </Button>
    <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location }}>
      <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
        <Phone className="h-5 w-5" />
        Call (458) 298-8000
      </Button>
    </TrackedPhoneLink>
    <WhatsAppChatButton variant="solid" size="lg" />
  </div>
);

const ItDidntStick = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="It Didn't Stick | Freedom Interventions"
        description="Your loved one already went to treatment and it didn't hold. Talk with Matt Brown about what to do next. Free confidential consultation."
        canonical="https://freedominterventions.com/it-didnt-stick"
        keywords="relapse after treatment, left treatment early, relapse after rehab family help, intervention after relapse"
      />
      <OrganizationSchema />
      <WebPageSchema
        name="It Didn't Stick | Freedom Interventions"
        description="Your loved one already went to treatment and it didn't hold. Talk with Matt Brown about what to do next. Free confidential consultation."
        url="https://freedominterventions.com/it-didnt-stick"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "It Didn't Stick", url: "https://freedominterventions.com/it-didnt-stick" },
        ]}
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-14 md:pb-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                After treatment
              </span>
              <h1 className="mt-4 font-serif text-3xl md:text-5xl font-semibold text-foreground leading-tight">
                They already went. It didn't stick.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                If they used again after treatment, left early, or came home and the old rules came back,
                this is a different conversation than the first time. You do not need another lecture. You
                need a plan that does not repeat the last discharge.
              </p>
              <div className="mt-8">
                <CtaRow location="it_didnt_stick_hero" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Private. No pressure. No guarantee anyone says yes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-4xl font-semibold text-foreground leading-tight">
                The first 90 days home is where most families lose the ground they paid for
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {timeline.map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <p className="mb-2 w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {item.label}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="py-14 md:py-20 bg-muted/20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-4xl font-semibold text-foreground leading-tight">
                Do not do these five things tonight
              </h2>
              <ul className="mt-8 space-y-4">
                {donts.map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl border border-border bg-card p-5">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
                If someone is in immediate danger, call 911. If they are in suicidal crisis, call or text 988.
                This page is not emergency medical care.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-4xl font-semibold text-foreground leading-tight">
                Same work. Different first sentence.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                This is still Freedom Interventions. Matt still works with the family, not as a placement
                service. The first question is not "which rehab." It is what failed after the last discharge,
                who in the family is still rescuing, and whether the next move is coaching, readiness work, or
                a full intervention.
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                If you need free family support first, Sober Helpline is separate and free:{" "}
                <a
                  href="https://soberhelpline.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  soberhelpline.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Talk to Matt before you spend the next dollar
              </h2>
              <div className="mt-8">
                <CtaRow location="it_didnt_stick_footer" />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Already working through what comes after discharge?{" "}
                <Link to="/aftercare-guidance" className="text-primary underline underline-offset-4">
                  Aftercare guidance
                  <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ItDidntStick;
