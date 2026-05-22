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
import californiaBanner from "@/assets/california-crisis-banner.jpg";
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
  "In California, families call from every kind of environment, affluent neighborhoods, college towns, rural communities, and major cities, but the pattern is the same: the addiction keeps escalating while the family keeps trying to contain it.",
  "Fentanyl has made the margin for error much smaller. Families who once thought they had time now realize one relapse, one counterfeit pill, or one weekend gone sideways can change everything.",
  "The size of California creates another problem: there are plenty of treatment options, but not all of them are good fits. Families need clarity, not a random list of rehabs.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before anyone confronts your loved one",
    description:
      "When a family is split between rescuing, threatening, minimizing, and panicking, the conversation is usually doomed before it starts. Matt helps the family get on the same page first.",
  },
  {
    title: "Builds the treatment plan before the intervention",
    description:
      "Detox, residential care, outpatient options, transport, and fallback plans are addressed in advance so the intervention leads somewhere real instead of collapsing into arguments and indecision.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not drama. The goal is clarity. Your loved one hears the truth, sees that the family is united, and is presented with a real path into treatment.",
  },
  {
    title: "Helps the family hold the line afterward",
    description:
      "If your loved one accepts help, the family needs structure. If your loved one refuses help, the family still needs structure. That is where change becomes real instead of temporary.",
  },
];

const californiaSituations = [
  "A young adult bouncing between fentanyl scares, treatment attempts, and disappearances",
  "A spouse or partner whose drinking, pills, or cocaine use is destabilizing the home",
  "A family exhausted by bailouts, money leaks, lies, and emotional whiplash",
  "A loved one who keeps promising treatment but backs out the minute pressure eases",
  "A family trying to choose between local California treatment, travel, or a higher-structure placement elsewhere",
  "A situation that looks functional from the outside but is quietly collapsing inside the family",
];

const California = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in California | Freedom Interventions"
        description="California families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across California prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/california"
        keywords="California addiction intervention, California interventionist, Los Angeles drug intervention, Orange County intervention, family intervention California"
        geoRegion="US-CA"
        geoPlacename="California"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="California"
        url="https://freedominterventions.com/california"
        description="Professional addiction intervention services for families across California, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="California" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "California",
            url: "https://freedominterventions.com/california",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "California", href: "/california" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${californiaBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            California Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When Addiction Is Running the Family, You Need Structure, Not
            Another Round of Hope and Panic
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across California to prepare the
            intervention, coordinate treatment, and stop the cycle of chaos,
            rescuing, and relapse.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground"
              asChild
            >
              <a href="tel:+15416688084">
                <Phone className="w-5 h-5 mr-2" />
                Call (541) 668-8084
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-destructive mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Statewide Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                California families are dealing with fentanyl, meth, alcohol,
                prescription misuse, and the constant uncertainty of not knowing
                what happens next.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Too Many Options
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                California has a huge treatment market, but volume is not the
                same as clarity. Families still need help choosing the right
                level of care and the right next move.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, boundaries
                are clear, and treatment logistics are handled before the
                conversation begins.
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
                California Families Usually Call After They Have Tried
                Everything Except Structure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already
                spent months trying to manage the situation privately. They have
                covered rent, paid for treatment that did not stick, absorbed
                lies, feared overdose, tried ultimatums, softened ultimatums,
                and argued about what to do next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The problem is not that the family does not care enough. The
                problem is that addiction is stronger than scattered effort.
                Without structure, the family keeps reacting while the addiction
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
                What a Professional Intervention Changes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A real intervention is not a dramatic confrontation for its own
                sake. It is a process that gets the family unified, gets
                treatment lined up, and creates a clear path out of the cycle
                you are already trapped in.
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
                Common Reasons Families in California Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {californiaSituations.map((item) => (
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
                  If your family is asking whether it is finally time to do
                  something serious, it usually is. Families rarely call too
                  early. Much more often, they call after the cost of waiting
                  has already become obvious.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Different
                Family System.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family goes right back to
                fear, confusion, and mixed messages, the addiction will try to
                reoccupy the same space it held before. Lasting change requires
                a different structure inside the family, not just a different
                promise from the person using.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one gets a real chance
                to accept help, and the family stops protecting the addiction
                from its consequences. That is how momentum shifts.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a California Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or family collapse to make the
            decision for you. Get a clear assessment and a real plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="tel:+15416688084">
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

      <LocationLinks currentLocation="California" locationType="state" />

      <Footer />
    </div>
  );
};

export default California;
