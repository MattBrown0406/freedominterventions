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
  "Pennsylvania families are often dealing with fentanyl, heroin, alcohol, cocaine, and prescription drugs in communities that have already been carrying addiction pain for years.",
  "From Philadelphia and Pittsburgh to smaller towns and rural areas, the pattern is familiar: the family keeps absorbing the fallout while the addiction keeps demanding more.",
  "By the time most families call, they have already tried love, anger, financial help, treatment suggestions, second chances, and private ultimatums that never held.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "A family that is split between rescuing, threatening, minimizing, and panicking is easy for addiction to outmaneuver. Matt helps everyone get clear first.",
  },
  {
    title: "Builds the treatment plan before the conversation",
    description:
      "Detox, residential care, outpatient options, transport, and next steps are worked through ahead of time so there is a real path the moment your loved one says yes.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The point is not to overwhelm your loved one. The point is to present reality clearly, break through denial, and make treatment the obvious next move.",
  },
  {
    title: "Helps the family hold the line afterward",
    description:
      "Whether your loved one accepts help or refuses it, the family needs a structure strong enough to survive the next wave of pressure.",
  },
];

const pennsylvaniaSituations = [
  "A son or daughter caught in relapse, overdose scares, or repeated treatment attempts that do not stick",
  "A spouse or partner whose drinking or drug use is destabilizing the whole household",
  "Parents exhausted by lies, financial rescue, and the feeling that every week brings a new emergency",
  "A family divided over whether to get tougher, keep waiting, or protect the person using",
  "A loved one who promises treatment when cornered, then pulls away once the pressure fades",
  "A situation that feels too dangerous to keep handling informally",
];

const Pennsylvania = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Pennsylvania | Freedom Interventions"
        description="Pennsylvania families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Pennsylvania prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/pennsylvania"
        keywords="Pennsylvania addiction intervention, Pennsylvania interventionist, Philadelphia drug intervention, Pittsburgh intervention services, family intervention Pennsylvania"
        geoRegion="US-PA"
        geoPlacename="Pennsylvania"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Pennsylvania"
        url="https://freedominterventions.com/pennsylvania"
        description="Professional addiction intervention services for families across Pennsylvania, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Pennsylvania" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Pennsylvania",
            url: "https://freedominterventions.com/pennsylvania",
          },
        ]}
      />

      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Pennsylvania", href: "/pennsylvania" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Pennsylvania Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Family Has Been Carrying the Addiction for Too Long, It
              Is Time to Change the Structure
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Pennsylvania to prepare the
              intervention, coordinate treatment, and stop the cycle of fear,
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
                Serious Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Pennsylvania, fentanyl has made relapse, experimentation, and
                polysubstance use much more dangerous. Waiting for the next
                wake-up call can be a terrible strategy.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Urban and Rural Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Some families feel buried under too many treatment options.
                Others feel stranded by distance or limited access. Both still
                need the same thing, a clear and workable plan.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and boundaries are strong enough to survive pushback.
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
                Pennsylvania Families Usually Call After the Situation Has
                Already Gone Further Than They Wanted to Believe
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not reach out at the first sign of trouble.
                They call after the overdoses, the treatment failures, the
                disappearances, the police involvement, the money problems, or
                the emotional exhaustion have already piled up.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The deeper issue is that addiction has often trained the whole
                family to adapt to chaos. Everyone is trying to help, but not in
                the same direction. Without structure, that usually means the
                addiction keeps winning.
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
                A good intervention does not depend on one perfect moment. It
                depends on preparation, treatment readiness, and the family
                finally acting together instead of reacting separately.
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
                Common Reasons Families in Pennsylvania Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {pennsylvaniaSituations.map((item) => (
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
                  If your family keeps asking how bad it has to get before you
                  act, that question usually answers itself. It is already bad
                  enough.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Different
                Family System.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Getting someone to accept treatment matters. But if the family
                goes right back to fear, mixed messages, and emergency-based
                decision making, the addiction will try to reclaim the same
                ground.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: the family becomes clear, honest,
                and consistent. Your loved one is given a real opening into
                help, and the addiction stops being protected from consequences.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Pennsylvania Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or family collapse to make the
            decision for you. Get clarity now, while the family still has room
            to act deliberately.
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

      <LocationLinks currentLocation="Pennsylvania" locationType="state" />
      <Footer />
    </div>
  );
};

export default Pennsylvania;
