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
  "Newfoundland and Labrador families often wait because the logistics feel overwhelming, not because the problem feels small.",
  "Geography matters here. What would be a quick treatment transition somewhere else can require much more planning when distance, travel, or availability become part of the equation.",
  "By the time most families call, they are already exhausted by broken promises, emotional whiplash, and the feeling that every new crisis lands on the same small circle of people.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Matt helps the family move out of scattered reactions and into one shared structure with clear roles and boundaries.",
  },
  {
    title: "Builds the treatment plan before the conversation",
    description:
      "Detox, residential options, transport, local versus out-of-province choices, and backup plans are worked through ahead of time.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The intervention is not about pressure for pressure’s sake. It is about truth, unity, and a real opportunity for treatment.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "If your loved one accepts help or refuses it, the family still needs a plan that can hold under stress.",
  },
];

const commonSituations = [
  "A son or daughter caught in cycles of opioid use, drinking, or repeated treatment promises that never stick",
  "A spouse or partner whose substance use is destabilizing the home, the finances, and the family’s sense of safety",
  "A family in St. John’s or a smaller Newfoundland or Labrador community that cannot agree on whether to push for treatment now",
  "A loved one whose behavior has become more unpredictable, deceptive, or concerning",
  "A family trying to plan around distance, weather, transport, or limited treatment availability",
  "A situation where everybody knows they cannot keep doing this another year",
];

const NewfoundlandLabrador = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Newfoundland and Labrador | Freedom Interventions"
        description="Newfoundland and Labrador families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Newfoundland and Labrador prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/newfoundland-labrador"
        keywords="Newfoundland addiction intervention, Labrador interventionist, St Johns drug intervention, Newfoundland family intervention, Newfoundland alcohol intervention"
        geoRegion="CA-NL"
        geoPlacename="Newfoundland and Labrador"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Newfoundland & Labrador"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/newfoundland-labrador"
        description="Professional addiction intervention services for families across Newfoundland and Labrador, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
        country="CA"
      />
      <LocationFAQSchema
        location="Newfoundland and Labrador"
        locationType="province"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Newfoundland and Labrador",
            url: "https://freedominterventions.com/newfoundland-labrador",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Newfoundland and Labrador", href: "/newfoundland-labrador" },
        ]}
      />

      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Newfoundland and Labrador Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Family Feels Isolated and the Addiction Keeps Escalating,
              You Still Need a Real Plan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Matt Brown works with families across Newfoundland and Labrador to
              prepare the intervention, coordinate treatment, and stop the cycle
              of fear, rescue, and repeated crisis.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg" asChild>
                <Link to="/#contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="tel:+15418386009">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (541) 838-6009
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
                Isolation Adds Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Newfoundland and Labrador, travel, weather, and limited local
                options can make a dangerous addiction problem feel even harder
                to interrupt.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Local or Away
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Many families have to think carefully about whether care should
                happen close to home or whether travel offers a stronger
                treatment fit.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the boundaries are strong enough to hold after the
                first pushback.
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
                Newfoundland and Labrador Families Usually Call After They Have
                Tried Everything Except Structure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already
                spent months, sometimes years, trying to manage the situation
                privately. They have covered bills, cleaned up messes, absorbed
                lies, believed promises, feared the worst, and argued about what
                to do next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Newfoundland and Labrador, isolation, transport, weather, and
                limited availability can all make treatment planning feel
                heavier, even when the need to act is already clear.
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
                sake. It is a structured process that gets the family clear,
                gets treatment options ready, and creates a real path out of the
                cycle you are already stuck in.
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
                Common Reasons Families in Newfoundland and Labrador Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {commonSituations.map((item) => (
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
                  If your family is waiting for the logistics to become easy
                  before acting, that day may never come. The plan still needs
                  to happen.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Family That
                Is No Longer Trapped by Crisis.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family returns to fear,
                enabling, and mixed messages, the addiction will keep trying to
                retake the same ground.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family structure that has changed, one
                that can stay honest, stay aligned, and stop carrying the
                addiction for the person using.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Newfoundland and Labrador Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, or family collapse to force the decision. Get
            a clear assessment and a real plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="tel:+15418386009">
                <Phone className="w-5 h-5 mr-2" />
                Call (541) 838-6009
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

      <LocationLinks
        currentLocation="Newfoundland and Labrador"
        locationType="province"
      />

      <Footer />
    </div>
  );
};

export default NewfoundlandLabrador;
