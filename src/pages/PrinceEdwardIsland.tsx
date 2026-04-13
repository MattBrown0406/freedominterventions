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
  "Prince Edward Island families often delay because everyone knows everyone and the situation can feel deeply personal, exposed, and hard to navigate quietly.",
  "The smaller local treatment landscape can make families feel boxed in, especially when they are trying to decide whether local care is enough or whether travel is the better option.",
  "By the time most families call, they are already tired of broken promises, money stress, conflict at home, and the feeling that the addiction is setting the terms for everyone else.",
];

const whatMattDoes = [
  {
    title: "Gets the family on the same page first",
    description:
      "Matt helps the family stop reacting individually and start moving with one clear message and one workable structure.",
  },
  {
    title: "Builds treatment options before the intervention",
    description:
      "Detox, residential care, outpatient follow-up, travel planning, and contingency steps are addressed ahead of time.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The intervention is meant to create clarity, not spectacle. Your loved one hears the truth and is offered a real path into help.",
  },
  {
    title: "Helps the family stay steady afterward",
    description:
      "If treatment is accepted or refused, the family still needs boundaries and consistency strong enough to last beyond the conversation.",
  },
];

const commonSituations = [
  "A son or daughter caught in a cycle of opioid use, alcohol abuse, or repeated promises to change",
  "A spouse or partner whose substance use is destabilizing the home while the family tries to keep things private",
  "A family in Charlottetown, Summerside, or elsewhere on PEI that cannot agree on what should happen next",
  "A family struggling with the tension between local treatment, travel, and limited options",
  "A loved one who asks for one more chance every time the pressure rises",
  "A situation where the family knows it cannot keep living like this",
];

const PrinceEdwardIsland = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Prince Edward Island | Freedom Interventions"
        description="Prince Edward Island families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Prince Edward Island prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/prince-edward-island"
        keywords="Prince Edward Island addiction intervention, PEI interventionist, Charlottetown drug intervention, Prince Edward Island family intervention, PEI alcohol intervention"
        geoRegion="CA-PE"
        geoPlacename="Prince Edward Island"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Prince Edward Island"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/prince-edward-island"
        description="Professional addiction intervention services for families across Prince Edward Island, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
        country="CA"
      />
      <LocationFAQSchema
        location="Prince Edward Island"
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
            name: "Prince Edward Island",
            url: "https://freedominterventions.com/prince-edward-island",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Prince Edward Island", href: "/prince-edward-island" },
        ]}
      />

      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Prince Edward Island Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When a Small-Province Crisis Has Taken Over the Whole Family, You
              Need a Plan That Can Actually Hold
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Matt Brown works with families across Prince Edward Island to
              prepare the intervention, coordinate treatment, and stop the cycle
              of fear, secrecy, and repeated crisis.
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
                Small Province, Real Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prince Edward Island families may be in smaller communities, but
                the addiction pressure is no smaller when opioids, alcohol, or
                other drugs take over a home.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Visibility and Privacy
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                On PEI, close-knit communities can make families hesitate longer
                because privacy matters, even when the need for action is
                already obvious.
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
                Prince Edward Island Families Usually Call After They Have Tried
                Everything Except Structure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already
                spent months, sometimes years, trying to manage the situation
                privately. They have covered bills, cleaned up messes, absorbed
                lies, believed promises, feared the worst, and argued about what
                to do next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                On Prince Edward Island, the small-province reality can make
                privacy feel fragile and treatment planning more complicated
                when families are deciding between local care and travel.
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
                Common Reasons Families in Prince Edward Island Reach Out
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
                  If the family is already walking on eggshells, managing lies,
                  and bracing for the next crisis, the problem is already large
                  enough to act on.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Help One Person. The Goal Is to Help the
                Whole Family Stop Revolving Around the Addiction.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters. But if the family keeps operating in fear,
                secrecy, and mixed messages, the addiction will keep finding
                room to stay.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family structure that can stay honest,
                stay aligned, and stop cushioning the addiction from the
                consequences that might force change.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Prince Edward Island Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, or family fracture to decide for you. Get a
            clear assessment and a real plan.
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
        currentLocation="Prince Edward Island"
        locationType="province"
      />

      <Footer />
    </div>
  );
};

export default PrinceEdwardIsland;
