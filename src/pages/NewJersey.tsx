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
  "New Jersey families are dealing with fentanyl, cocaine, alcohol, pills, and polysubstance use in a densely populated state where the crisis can stay hidden until it suddenly turns lethal.",
  "From Newark and Jersey City to the suburbs and the shore, families run into the same pattern: too much fear, too many opinions, and no shared plan strong enough to interrupt the addiction.",
  "Many families have already spent months cycling between rescue, anger, guilt, and false hope before they realize they need professional structure, not another emotional conversation.",
];

const whatMattDoes = [
  {
    title: "Gets the family out of chaos and onto the same page",
    description:
      "Before anyone confronts your loved one, Matt helps the family stop sending mixed messages and start acting with clarity, consistency, and real backbone.",
  },
  {
    title: "Builds the treatment path before the intervention",
    description:
      "Detox, residential care, outpatient options, insurance realities, transport, and contingency plans are addressed ahead of time so the intervention does not collapse into confusion.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The goal is not to overpower your loved one. The goal is to tell the truth clearly, present treatment, and make it obvious the family is no longer going to keep addiction comfortable.",
  },
  {
    title: "Helps the family stay steady afterward",
    description:
      "If your loved one accepts help, structure matters. If your loved one refuses help, structure still matters. The family has to stop living at the mercy of the next crisis.",
  },
];

const newJerseySituations = [
  "A son or daughter cycling through fentanyl use, treatment attempts, and relapse",
  "A spouse or partner whose drinking, cocaine use, or pills are destabilizing the household",
  "A family exhausted by secrecy, money leaks, emotional whiplash, and repeated rescue",
  "A loved one who promises treatment whenever things get bad, then disappears once the pressure lifts",
  "A family split between tough love, fear, denial, and panic",
  "A situation where the overdose risk feels too high to keep waiting",
];

const NewJersey = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in New Jersey | Freedom Interventions"
        description="New Jersey families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across New Jersey prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/new-jersey"
        keywords="New Jersey addiction intervention, New Jersey interventionist, Newark drug intervention, Jersey City intervention services, family intervention New Jersey"
        geoRegion="US-NJ"
        geoPlacename="New Jersey"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="New Jersey"
        url="https://freedominterventions.com/new-jersey"
        description="Professional addiction intervention services for families across New Jersey, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="New Jersey" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "New Jersey",
            url: "https://freedominterventions.com/new-jersey",
          },
        ]}
      />

      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "New Jersey", href: "/new-jersey" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              New Jersey Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Keeps Pulling the Family Into Crisis, You Need a
              Plan With Real Structure
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across New Jersey to prepare the
              intervention, coordinate treatment, and stop the cycle of chaos,
              secrecy, and repeated emergency.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg" asChild>
                <Link to="/#contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="tel:+14582988000">
                  <Phone className="w-5 h-5 mr-2" />
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
                Fast Escalation
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In New Jersey, fentanyl has erased much of the margin for error.
                Families who think they still have time are often taking a much
                bigger gamble than they realize.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Dense, Complicated, Urgent
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                New Jersey families often have treatment options nearby, but too
                many options without clear guidance can still leave everyone
                stuck.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                logistics are ready, and the first round of pushback does not
                send everyone back into chaos.
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
                New Jersey Families Usually Reach Out After the Situation Has
                Been Bad for Longer Than Anyone Wants to Admit
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Families rarely call at the beginning. They call after the lies,
                the overdose scares, the failed treatment attempts, the money
                problems, the disappearing acts, and the family arguments have
                already stacked up.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What keeps the problem going is not a lack of love. It is a lack
                of unified structure. One person wants consequences, another
                wants patience, and another is too scared to upset the person
                using. Addiction knows how to survive that kind of split.
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
                What a Professional Intervention Changes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A good intervention does not rely on emotion, guilt, or a
                perfect speech. It relies on preparation, treatment readiness,
                and the family finally acting like a team.
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
                Common Reasons Families in New Jersey Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {newJerseySituations.map((item) => (
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
                  If your family is asking whether this has become serious
                  enough, it probably has. The more the pattern repeats, the
                  less wise it is to keep waiting for the person using to solve
                  it alone.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is to Stop
                Feeding the Addiction.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A treatment yes matters. But if the family returns to fear,
                rescuing, and inconsistent boundaries, addiction gets welcomed
                right back into the same system.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a different family structure, one that
                tells the truth, holds the line, and no longer protects the
                addiction from consequences.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a New Jersey Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or collapse at home to force the
            decision. Get clarity now, while the family still has room to act.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="tel:+14582988000">
                <Phone className="w-5 h-5 mr-2" />
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
                Learn how the process works, what to expect, and how families
                prepare.
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

      <LocationLinks currentLocation="New Jersey" locationType="state" />

      <Footer />
    </div>
  );
};

export default NewJersey;
