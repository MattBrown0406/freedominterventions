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
import {
  OrganizationSchema,
  BreadcrumbSchema,
  ServiceAreaSchema,
  LocationFAQSchema,
} from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const pressurePoints = [
  "Ohio families often call after living through multiple treatment attempts, relapses, overdose scares, and years of trying to hold the whole situation together on their own.",
  "Fentanyl has made the risk in Ohio brutally high. Families who once thought they had more time often realize the margin for error is much smaller than they believed.",
  "The addiction may be centered in Cleveland, Columbus, Cincinnati, Dayton, or a smaller Appalachian community, but the family pattern is usually the same: fear, rescuing, conflict, and exhaustion.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Matt helps families stop pulling in opposite directions. Everyone gets clear on the message, the roles, and the boundaries they can actually hold.",
  },
  {
    title: "Builds the treatment plan in advance",
    description:
      "Detox, residential treatment, outpatient care, transport, and backup options are handled before the conversation so the intervention leads somewhere real.",
  },
  {
    title: "Facilitates a direct, compassionate intervention",
    description:
      "The goal is not to corner or shame your loved one. The goal is to present reality clearly and offer immediate help while the family is unified.",
  },
  {
    title: "Helps the family hold structure after the meeting",
    description:
      "If your loved one accepts help, consistency matters. If your loved one refuses help, consistency still matters. That is where the family begins to change too.",
  },
];

const ohioSituations = [
  "A loved one bouncing between fentanyl scares, treatment, and relapse",
  "A spouse or partner whose addiction is destabilizing the household",
  "Parents or relatives exhausted by money, lies, crises, and late-night calls",
  "A family divided between pressure, fear, denial, and enabling",
  "A person who keeps saying they want help but never follows through once the immediate crisis fades",
  "A situation that feels one bad night away from irreversible loss",
];

const Ohio = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Ohio Addiction Intervention Services | Freedom Interventions"
        description="Ohio families dealing with addiction need a clear plan, not more panic. Matt Brown helps families across Ohio prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/ohio"
        keywords="Ohio addiction intervention, Columbus intervention services, Cleveland drug intervention, Cincinnati family intervention, Ohio fentanyl crisis"
        geoRegion="US-OH"
        geoPlacename="Ohio"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Ohio"
        url="https://freedominterventions.com/ohio"
        description="Professional addiction intervention services for families across Ohio, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Ohio" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Ohio", url: "https://freedominterventions.com/ohio" },
        ]}
      />
      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Ohio", href: "/ohio" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Ohio Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Keeps Winning in the Family, You Need More Than
              Another Promise
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Matt Brown works with families across Ohio to prepare the
              intervention, coordinate treatment, and stop the cycle of panic,
              rescue, and relapse.
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
                High Stakes
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Ohio, fentanyl has made delay more dangerous. Families often
                reach out because they know the next scare may not be one their
                loved one survives.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Across Ohio
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Big cities and smaller communities may look different on the
                outside, but the family burden is familiar: fear, divided
                responses, and repeated crisis management.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Structured Help
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the treatment plan is ready, the
                family is unified, and boundaries are clear enough to hold after
                the meeting ends.
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
                Ohio Families Usually Reach Out After They Have Been Living in
                Reaction Mode
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family calls, they have usually already tried to
                love the problem into submission. They have paid bills,
                threatened consequences, softened consequences, searched for
                treatment, believed promises, feared the worst, and argued over
                what to do next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The issue is not that the family has not tried. The issue is
                that addiction keeps gaining ground when the family is scattered
                and responding one crisis at a time.
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
                A real intervention is not a theatrical confrontation. It is a
                structured process that gets the family clear, gets treatment
                lined up, and gives your loved one a real choice.
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
                Common Reasons Families in Ohio Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {ohioSituations.map((item) => (
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
                  If your family is asking whether it is finally time to act,
                  you are probably already past the point where waiting is a
                  safe strategy.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get Them Into Treatment for a Day
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters, but if the family returns to fear,
                mixed messages, and rescue mode, the addiction will try to take
                back the same ground.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family system that becomes more
                honest, more consistent, and less vulnerable to manipulation.
                That is where real change starts taking hold.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With an Ohio Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, or family breakdown to make the decision for you. Get
            a clear assessment and a real plan.
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

      <LocationLinks currentLocation="Ohio" locationType="state" />
      <Footer />
    </div>
  );
};

export default Ohio;
