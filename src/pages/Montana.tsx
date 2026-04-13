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
  "Rural isolation can make families feel like help is farther away than it really is, especially when treatment may need to happen out of town or out of state.",
  "Meth can keep a household unstable for years, and fentanyl has made the danger of mixed or unknown substances much higher.",
  "Families often need as much help with planning and transport as they do with the intervention conversation itself.",
];

const whatMattDoes = [
  {
    title: "Gets the family organized before the intervention",
    description:
      "Matt helps the family get clear on roles, message, and boundaries so the addiction is no longer controlling the room.",
  },
  {
    title: "Builds a treatment plan that accounts for real travel needs",
    description:
      "Local options, out-of-state placement, transportation, and contingencies are addressed ahead of time.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is clarity, not theatrics. Your loved one is told the truth and offered a real way into treatment.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "Whether the loved one accepts help or not, the family still needs a structure that does not collapse under guilt or fear.",
  },
];

const montanaSituations = [
  "A son or daughter caught in meth use, fentanyl exposure, or repeated treatment failures",
  "A spouse whose drinking or drug use is destabilizing the home and isolating the family",
  "A family in Billings, Missoula, Bozeman, Helena, or a small community trying to figure out whether local care is enough",
  "A loved one who keeps promising change but will not follow through once the immediate pressure lifts",
  "A family worn down by crisis after crisis and unsure whether they are helping or making it easier to continue",
  "A situation that already feels too dangerous to leave to chance",
];

const Montana = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Montana | Freedom Interventions"
        description="Montana families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Montana prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/montana"
        keywords="Montana addiction intervention, Montana interventionist, Billings drug intervention, Missoula family intervention, Montana alcohol intervention"
        geoRegion="US-MT"
        geoPlacename="Montana"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Montana"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/montana"
        description="Professional addiction intervention services for families across Montana, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Montana" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Montana",
            url: "https://freedominterventions.com/montana",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Montana", href: "/montana" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Montana Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Distance, Isolation, and Addiction Collide, Families Need
              More Than Hope
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Montana to prepare the
              intervention, coordinate treatment, and stop the cycle of chaos,
              delay, and repeated crisis.
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
                Geographic Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Montana families often have to make decisions across long
                distances, limited local treatment access, and fast-moving
                addiction patterns.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Meth and Fentanyl
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Meth remains a major force in many communities, while fentanyl
                has made every relapse and every unknown pill more dangerous.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the old crisis-management pattern is interrupted.
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
                Montana Families Usually Call After They Realize Distance Has
                Become an Excuse for Waiting
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Families in Montana often spend too long trying to manage the
                situation on their own, partly because everything feels harder.
                Treatment may be far away. The person using may refuse to
                travel. The family may feel like there is no clean way to move
                forward.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                But addiction keeps escalating whether the logistics are easy or
                not. By the time most families call, they are exhausted,
                divided, and frightened by how normal the chaos has started to
                feel.
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
                A professional intervention turns a vague hope into a plan. It
                gives the family structure, gets treatment options lined up, and
                removes the illusion that the next crisis should be the thing
                that finally decides it.
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
                Common Reasons Families in Montana Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {montanaSituations.map((item) => (
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
                  If your family keeps thinking you need a little more proof
                  before you act, it is usually because the situation has
                  already been serious for a while.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is to End the
                Family’s Helplessness Pattern.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters, but the deeper change is that the family
                stops organizing itself around addiction and starts organizing
                itself around truth, boundaries, and follow-through.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That is what creates leverage, protects the family, and gives
                your loved one a real opportunity to accept help.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Montana Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, arrest, or family breakdown to force the
            decision. Get a clear assessment and a real plan.
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

      <LocationLinks currentLocation="Montana" locationType="state" />

      <Footer />
    </div>
  );
};

export default Montana;
