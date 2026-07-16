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
  "Quebec families usually call after they have spent too long trying to manage the problem privately and hoping concern, pleading, or one more rescue will somehow break through denial.",
  "Treatment planning can get complicated fast. Families may be weighing public and private options, local and out-of-province care, and whether language fit will affect engagement and follow-through.",
  "The core family pattern is familiar: secrecy, conflict, emotional fatigue, money problems, and the feeling that everyone is adapting to the addiction instead of changing it.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Matt helps the family unify its message, define roles, and replace scattered reactions with a structured plan.",
  },
  {
    title: "Builds the treatment path in advance",
    description:
      "Detox, residential care, outpatient options, transport, and bilingual or culturally fitting considerations are addressed before the conversation happens.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is to tell the truth clearly, present treatment as a real option, and stop letting the addiction control the room.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "Whether your loved one accepts treatment or refuses it, the family needs structure strong enough to hold after the first pushback.",
  },
];

const commonSituations = [
  "A son or daughter cycling through opioids, alcohol, or stimulant use while the family keeps trying to patch things together",
  "A spouse or partner whose substance use is destabilizing the home and wearing down trust",
  "A family in Montreal, Quebec City, Laval, Gatineau, or a smaller Quebec community that cannot agree on the next move",
  "A family trying to sort through public versus private care, local versus travel, and whether bilingual support matters for success",
  "A loved one who sounds ready for help in the moment but retreats once the pressure eases",
  "A situation where the family knows waiting is becoming its own dangerous decision",
];

const Quebec = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Quebec | Freedom Interventions"
        description="Quebec families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Quebec prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/quebec"
        keywords="Quebec addiction intervention, Quebec interventionist, Montreal drug intervention, Quebec City family intervention, bilingual intervention Quebec"
        geoRegion="CA-QC"
        geoPlacename="Quebec"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Quebec"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/quebec"
        description="Professional addiction intervention services for families across Quebec, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
        country="CA"
      />
      <LocationFAQSchema location="Quebec" locationType="province" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Quebec", url: "https://freedominterventions.com/quebec" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Quebec", href: "/quebec" },
        ]}
      />

      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Quebec Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Has Divided the Family, You Need Clarity Strong
              Enough to Cut Through the Noise
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Matt Brown works with families across Quebec to prepare the
              intervention, coordinate treatment, and stop the cycle of
              confusion, fear, and repeated crisis.
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
                Rising Complexity
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quebec families are dealing with opioids, alcohol, cocaine,
                meth, and prescription misuse in situations that rarely stay
                simple for long.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Language and Logistics
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Families often need help navigating both treatment fit and
                communication needs, especially when bilingual support matters
                to the family system.
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
                Quebec Families Usually Call After They Have Tried Everything
                Except Structure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already
                spent months, sometimes years, trying to manage the situation
                privately. They have covered bills, cleaned up messes, absorbed
                lies, believed promises, feared the worst, and argued about what
                to do next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Quebec, treatment planning often includes another layer,
                making sure the setting, the logistics, and the language fit all
                support real follow-through.
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
                Common Reasons Families in Quebec Reach Out
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
                  If your family is already asking whether the current pattern
                  can keep going, the honest answer is usually no.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Family That
                Stops Adapting to Addiction.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family goes back to fear,
                mixed messages, and rescue mode afterward, the addiction will
                try to reoccupy the same space.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family structure built on honesty,
                consistency, and real boundaries, with treatment planning that
                actually fits the people involved.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Quebec Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, or family collapse to make the decision for
            you. Get a clear assessment and a real plan.
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

      <LocationLinks currentLocation="Quebec" locationType="province" />

      <Footer />
    </div>
  );
};

export default Quebec;
