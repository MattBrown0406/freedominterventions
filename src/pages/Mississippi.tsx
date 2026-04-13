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
  "Fentanyl has made denial much more dangerous, especially when people are using pills or street drugs without knowing exactly what is in them.",
  "Meth and alcohol can keep families trapped in long, grinding patterns that look survivable until they suddenly are not.",
  "Mississippi families often need help navigating both the emotional side of intervention and the logistics of treatment placement beyond their immediate area.",
];

const whatMattDoes = [
  {
    title: "Gets the family organized first",
    description:
      "Matt helps everyone get clear on roles, boundaries, and the message your loved one needs to hear.",
  },
  {
    title: "Builds the treatment plan before the intervention",
    description:
      "Local options, out-of-state placement, transport, and backup plans are handled ahead of time.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not to create drama. The goal is to create clarity and a real opening into treatment.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "If your loved one accepts help or refuses it, the family still needs a structure that does not collapse under pressure.",
  },
];

const mississippiSituations = [
  "A son or daughter moving between meth, pills, fentanyl, or repeated treatment promises",
  "A spouse whose drinking or drug use is destabilizing the entire home",
  "Parents or siblings exhausted by lies, bailouts, and emotional whiplash",
  "A loved one whose behavior is becoming more erratic, risky, or frightening",
  "A family that cannot agree on whether to get tougher, stay patient, or do nothing",
  "A situation where one more overdose scare or medical crisis feels very possible",
];

const Mississippi = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Mississippi | Freedom Interventions"
        description="Mississippi families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Mississippi prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/mississippi"
        keywords="Mississippi addiction intervention, Mississippi interventionist, Jackson drug intervention, Gulfport family intervention, Mississippi alcohol intervention"
        geoRegion="US-MS"
        geoPlacename="Mississippi"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Mississippi"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/mississippi"
        description="Professional addiction intervention services for families across Mississippi, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Mississippi" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Mississippi",
            url: "https://freedominterventions.com/mississippi",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Mississippi", href: "/mississippi" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Mississippi Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Family Is Tired, Scared, and Out of Good Options,
              Structure Matters
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Mississippi to prepare the
              intervention, coordinate treatment, and stop the cycle of fear,
              secrecy, and repeated crisis.
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
                High Stakes
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mississippi families are dealing with fentanyl, meth, alcohol,
                and prescription drug misuse in a setting where treatment access
                can get limited fast.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Rural Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Distance, stigma, and fewer local resources often keep families
                stuck longer than they should be.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the enabling has stopped protecting the problem.
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
                Mississippi Families Often Reach Out After the Cost of Waiting
                Has Already Become Clear
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time many Mississippi families call, they have already
                been through the broken promises, the emotional chaos, the money
                strain, and the constant fear of what the next night might
                bring.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In many homes, the family has been trying to keep the peace for
                so long that nobody is saying the full truth anymore. One person
                minimizes, one rescues, one explodes, and one silently carries
                the panic. That is not a moral failure. It is what happens when
                addiction has taken over the family system.
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
                A strong intervention changes the structure around the
                addiction. It gives the family a plan, gets treatment ready, and
                replaces vague threats with real decisions.
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
                Common Reasons Families in Mississippi Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {mississippiSituations.map((item) => (
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
                  get, that is usually the answer. It is already bad enough to
                  act.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just a Treatment Admission. The Goal Is a
                Different Family Pattern.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters, but if the family returns to fear-based
                decisions and mixed messages, addiction will keep trying to take
                the same space back.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes honest,
                consistent, and unwilling to keep absorbing damage to protect
                the addiction.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Mississippi Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose,
            legal crisis, disappearance, or collapse at home to decide for you.
            Get a clear assessment and a real plan.
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

      <LocationLinks currentLocation="Mississippi" locationType="state" />

      <Footer />
    </div>
  );
};

export default Mississippi;
