import { Link } from "react-router-dom";
import { Calendar, Phone, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebPageSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";

const BOOKING_HREF = "/book-intervention-consultation?type=consultation#booking";

const threeLines = [
  {
    label: "Money",
    body: "One parent pays the phone. The other says \"not my problem.\" The bill still gets paid. The disease learned which kitchen writes the check.",
  },
  {
    label: "Housing",
    body: "One says no car, no spare key, no couch. The other hands over the spare. They will live in the house that still opens the door.",
  },
  {
    label: "Contact",
    body: "One says no overnight. The other says \"just this weekend so the kids aren't upset.\" That is not kindness. That is the gap.",
  },
];

const notThis = [
  {
    title: "Not a custody fight",
    body: "This is not about who looks better in court or who gets the next weekend. The addiction does not care who has the parenting plan.",
  },
  {
    title: "Not proving who enabled more",
    body: "Scorekeeping is a stall. Both houses can be right about the past and still be running two different plans tonight.",
  },
  {
    title: "Not waiting for the other parent to \"get it\"",
    body: "Matt works the family system that actually exists, including the parent who will not get on the call. You do not wait for agreement that is not coming.",
  },
];

const donts = [
  "Do not send the kids with a message.",
  "Do not match the other house's rescue so you \"don't look mean.\"",
  "Do not wire rent because the other parent already said no and now they are on your porch.",
  "Do not start a late-night argument about who caused this.",
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

const TwoHouseholds = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Two Households. One Disease. | Freedom Interventions"
        description="If one parent pays rent and the other hands over the keys, the addiction is using the gap. Talk with Matt Brown about a two-household case. Free confidential consultation."
        canonical="https://freedominterventions.com/two-households"
        keywords="divorced parents addiction, split household intervention, two household enabling, separated parents addiction help"
      />
      <OrganizationSchema />
      <WebPageSchema
        name="Two Households. One Disease. | Freedom Interventions"
        description="If one parent pays rent and the other hands over the keys, the addiction is using the gap. Talk with Matt Brown about a two-household case. Free confidential consultation."
        url="https://freedominterventions.com/two-households"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Two Households", url: "https://freedominterventions.com/two-households" },
        ]}
      />
      <Navbar />

      <main>
        <section className="pt-32 md:pt-40 pb-14 md:pb-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Two-household families
              </span>
              <h1 className="mt-4 font-serif text-3xl md:text-5xl font-semibold text-foreground leading-tight">
                Two houses. One disease.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                If you and the other parent are running two different plans — rent in one kitchen, keys in the other — the addiction is using the gap. This is a case type, not a family-court problem.
              </p>
              <div className="mt-8">
                <CtaRow location="two_households_hero" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Private. No pressure. No guarantee anyone says yes.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-4xl font-semibold text-foreground leading-tight">
                The three lines that have to match
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Money. Housing. Contact. If those three are not the same in both homes, the loved one will live in the softer house. If one parent pays rent and the other hands over the keys, nothing holds. Divorced, separated, or never-married — this is a real case type, not a footnote. One house cannot secretly undo the other. This is not about who is the "good" parent. The disease uses the gap. Kids are not messengers and not the reason to cave.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {threeLines.map((item) => (
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

        <section className="py-14 md:py-20 bg-muted/20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-4xl font-semibold text-foreground leading-tight">
                What this is not
              </h2>
              <div className="mt-8 grid gap-4">
                {notThis.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-4xl font-semibold text-foreground leading-tight">
                What not to do tonight
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
                If someone is in danger, call 911. If they are in suicidal crisis, call or text 988. This page is not emergency medical care.
              </p>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                Free family education lives at{" "}
                <a
                  href="https://nomoreenabling.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  nomoreenabling.com
                </a>
                . Free live support at{" "}
                <a
                  href="https://soberhelpline.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  soberhelpline.com
                </a>
                . Both are separate.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Talk to Matt about a two-household case
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Same consult. Tell him both houses are in play.
              </p>
              <div className="mt-8">
                <CtaRow location="two_households_footer" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TwoHouseholds;
