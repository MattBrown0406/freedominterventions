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
  "Meth has been entrenched in many Kansas communities for years, and fentanyl has made the overdose risk far more severe.",
  "Families in rural areas often feel like they have to choose between bad options, long travel, or continuing to wait.",
  "Even in better-resourced areas, the real problem is rarely just access. It is that the family has lost structure.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned first",
    description:
      "Before anyone confronts your loved one, Matt helps the family get unified around one message, one plan, and boundaries everyone understands.",
  },
  {
    title: "Builds the treatment plan before the intervention",
    description:
      "Detox, residential care, transport, and fallback options are sorted out in advance so the conversation leads somewhere real.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The goal is not shame. The goal is to tell the truth clearly, break through denial, and offer a real path into treatment.",
  },
  {
    title: "Helps the family hold the line afterward",
    description:
      "If your loved one says yes, the family needs structure. If your loved one says no, the family still needs structure.",
  },
];

const kansasSituations = [
  "A son or daughter cycling through meth use, fentanyl exposure, disappearances, or legal trouble",
  "A spouse whose drinking or drug use is destabilizing the home and exhausting everyone around them",
  "Parents who keep rescuing and then wondering why every crisis comes back bigger",
  "A family split between fear, denial, guilt, and anger",
  "A loved one who agrees to treatment in the moment but backs out as soon as pressure lifts",
  "A situation that already feels one bad night away from tragedy",
];

const Kansas = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Kansas | Freedom Interventions"
        description="Kansas families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Kansas prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/kansas"
        keywords="Kansas addiction intervention, Kansas interventionist, Wichita drug intervention, Overland Park family intervention, Kansas alcohol intervention"
        geoRegion="US-KS"
        geoPlacename="Kansas"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Kansas"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/kansas"
        description="Professional addiction intervention services for families across Kansas, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Kansas" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Kansas",
            url: "https://freedominterventions.com/kansas",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Kansas", href: "/kansas" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Kansas Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Family Keeps Absorbing the Damage, the Addiction Keeps
              Getting Stronger
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Kansas to prepare the
              intervention, coordinate treatment, and stop the cycle of panic,
              rescuing, and repeated crisis.
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
                Rising Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kansas families are dealing with meth, fentanyl, alcohol, and
                prescription drug misuse in both larger cities and rural
                communities.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Urban and Rural
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From Wichita and Johnson County to smaller farming towns,
                families often feel trapped between limited options and waiting
                too long.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the old enabling patterns are interrupted.
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
                Kansas Families Usually Call After Too Many Promises, Too Many
                Scares, and Too Little Change
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a Kansas family reaches out, they have usually
                already tried to manage the situation privately. They have paid
                bills, cleaned up fallout, softened consequences, believed
                apologies, and hoped the last crisis would finally be the
                turning point.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Instead, the pattern keeps repeating. One person wants to get
                tougher, another wants to stay patient, and another is terrified
                that pushing too hard will make things worse. That is exactly
                the kind of confusion addiction knows how to survive.
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
                A professional intervention is not about delivering a dramatic
                speech. It is about changing the system around the addiction so
                your loved one is confronted with clarity instead of more mixed
                messages.
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
                Common Reasons Families in Kansas Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {kansasSituations.map((item) => (
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
                  If your family is asking whether it is finally time to act, it
                  usually is. Families rarely call too early. Much more often,
                  they wait until the cost of waiting is already obvious.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Different
                Family Structure.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Getting your loved one to accept treatment matters. But if the
                family goes back to fear, bargaining, and mixed messages
                afterward, the addiction will try to reclaim the same ground it
                held before.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: the family becomes clear,
                consistent, and no longer willing to keep addiction comfortable.
                That is where real leverage starts.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Kansas Intervention?
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

      <LocationLinks currentLocation="Kansas" locationType="state" />

      <Footer />
    </div>
  );
};

export default Kansas;
