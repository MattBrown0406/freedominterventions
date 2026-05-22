import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Phone,
  Calendar,
  AlertTriangle,
  Users,
  Shield,
  MapPin,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  ServiceAreaSchema,
  LocationFAQSchema,
} from "@/components/StructuredData";

const pressurePoints = [
  "Tennessee families often call after repeated cycles of treatment attempts, relapses, legal trouble, and promises that sounded sincere at the time but did not hold.",
  "Fentanyl, meth, alcohol, and pills can all create the same family pattern: panic, rescue, divided responses, and exhaustion that keeps getting mistaken for progress.",
  "By the time most families reach out, they are not asking for information. They are asking for a plan strong enough to interrupt what has already been happening for a long time.",
];

const whatMattDoes = [
  {
    title: "Gets the family on the same page",
    description:
      "Before the intervention, Matt helps the family move out of blame, fear, and contradiction. Everyone gets clear on the message and the boundaries.",
  },
  {
    title: "Builds treatment logistics in advance",
    description:
      "Detox, residential care, outpatient options, travel, and backup planning happen before the intervention so the family is not scrambling in the moment.",
  },
  {
    title: "Leads a clear, compassionate intervention",
    description:
      "The point is not to overwhelm your loved one. The point is to make the reality impossible to keep dodging and to offer immediate help.",
  },
  {
    title: "Keeps the family grounded afterward",
    description:
      "The work does not end with the conversation. Families need support staying consistent whether their loved one accepts help right away or resists it.",
  },
];

const tennesseeSituations = [
  "A loved one caught in a cycle of fentanyl, meth, alcohol, or prescription drug misuse",
  "A spouse or partner whose addiction is putting the family into constant crisis mode",
  "Parents or relatives repeatedly paying bills, solving emergencies, and getting manipulated by the next promise",
  "A family split between tough love, fear, secrecy, and enabling",
  "A person who agrees to treatment in principle but never follows through in real life",
  "A situation that already feels too unstable to leave to chance",
];

const Tennessee = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Tennessee Addiction Intervention Services | Freedom Interventions"
        description="Tennessee families dealing with addiction need a clear plan, not more panic. Matt Brown helps families across Tennessee prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/tennessee"
        keywords="Tennessee intervention, addiction help TN, interventionist Nashville, drug intervention Memphis, Knoxville family intervention"
        geoRegion="US-TN"
        geoPlacename="Tennessee"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Tennessee"
        url="https://freedominterventions.com/tennessee"
        description="Professional addiction intervention services for families across Tennessee, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Tennessee" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Tennessee",
            url: "https://freedominterventions.com/tennessee",
          },
        ]}
      />

      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Tennessee", href: "/tennessee" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Tennessee Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Keeps Pulling Your Family Into Crisis, It Is Time
              for a Better Plan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Matt Brown works with families across Tennessee to prepare the
              intervention, coordinate treatment, and stop the cycle of chaos,
              rescuing, and relapse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/#contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <a href="tel:+15416688084">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 668-8084
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-destructive mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Real Danger
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Tennessee, waiting for one more wake-up call can mean waiting
                for another overdose scare, arrest, disappearance, or collapse
                at home.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Statewide Need
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From Nashville and Memphis to Knoxville, Chattanooga, and rural
                communities, families face the same exhausting pattern of
                reacting instead of leading.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Response
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when treatment is ready, the family is
                aligned, and everyone understands how to stop feeding the same
                cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-14">
            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Tennessee Families Usually Call When They Realize Love Alone Is
                Not Changing the Pattern
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Families usually get here after doing everything they know to
                do. They have had heartfelt talks, set ultimatums they could not
                hold, paid for treatment, answered late-night calls, covered
                consequences, and hoped this latest scare would finally be the
                turning point.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                But addiction is very good at surviving scattered effort. When
                the family is divided or reacting in the moment, the addiction
                keeps controlling the pace.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {pressurePoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border/50 bg-card p-6"
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                What a Professional Intervention Actually Changes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A professional intervention is not just a hard conversation. It
                is a structured process that helps the family stop improvising
                and start acting from a clear plan.
              </p>
              <div className="grid gap-6">
                {whatMattDoes.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border/60 bg-card p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Common Reasons Families in Tennessee Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tennesseeSituations.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-border/50 bg-background p-5"
                  >
                    <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-6 md:p-8">
                <p className="text-foreground text-lg leading-relaxed font-medium">
                  If your family is already asking how much worse this has to
                  get before something changes, that question usually means it
                  is time to act.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Bigger Than Treatment Entry
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Getting your loved one to accept help matters. But the deeper
                work is changing the family pattern that addiction has been
                living inside.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes more honest,
                consistent, and unified. Your loved one gets a real path to
                treatment. If they refuse, the family stops making addiction
                easier to continue.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Tennessee Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare or family collapse to make the decision for you. Get a clear
            assessment and a plan that can actually hold.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <a href="tel:+15416688084">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 668-8084
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">
                Need help planning a family intervention?
              </p>
              <p className="text-sm text-muted-foreground">
                Learn how our family intervention services work, and what to
                expect.
              </p>
            </div>
            <Link to="/family-intervention" className="shrink-0">
              <Button variant="outline" className="gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                Family Intervention Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Tennessee" locationType="state" />
      <Footer />
    </div>
  );
};

export default Tennessee;
