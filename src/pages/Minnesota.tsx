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
  "Fentanyl has made the margin for error much smaller for Minnesota families who once assumed they had more time.",
  "Meth and alcohol can keep a household unstable for years, especially when the person using still looks partly functional from the outside.",
  "Families often need help not just finding treatment, but deciding what level of treatment actually fits the danger in front of them.",
];

const whatMattDoes = [
  {
    title: "Gets the family on the same page",
    description:
      "Matt helps the family unify its message so addiction is no longer being fed by confusion, disagreement, or last-minute emotional decisions.",
  },
  {
    title: "Builds the treatment path before the conversation",
    description:
      "Detox, residential care, outpatient options, travel, and contingency plans are addressed before the intervention begins.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "Your loved one hears the truth clearly, sees that the family is united, and is offered a real next step into help.",
  },
  {
    title: "Supports the family after the intervention",
    description:
      "Whether your loved one accepts treatment or refuses it, the family needs structure it can actually maintain.",
  },
];

const minnesotaSituations = [
  "A son or daughter cycling through fentanyl, meth, or alcohol relapses",
  "A spouse or partner whose substance use is destabilizing the home, finances, or sense of safety",
  "A family exhausted by promises, manipulation, and repeated attempts to keep the peace",
  "A loved one who says they want help but never follows through once the crisis settles",
  "A family divided over whether to set consequences, keep waiting, or rescue again",
  "A situation that feels manageable in public but is collapsing in private",
];

const Minnesota = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Minnesota Alcohol Intervention & Drug Intervention Help"
        description="Need a Minnesota alcohol intervention or drug intervention? Matt Brown helps families align, plan treatment, and act before the next crisis. Call (541) 668-8084."
        canonical="https://freedominterventions.com/minnesota"
        keywords="Minnesota addiction intervention, Minnesota interventionist, Minneapolis drug intervention, St. Paul family intervention, Minnesota alcohol intervention"
        geoRegion="US-MN"
        geoPlacename="Minnesota"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Minnesota"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/minnesota"
        description="Professional addiction intervention services for families across Minnesota, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Minnesota" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Minnesota",
            url: "https://freedominterventions.com/minnesota",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Minnesota", href: "/minnesota" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Minnesota Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Minnesota Alcohol Intervention and Drug Intervention Help for Families
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Minnesota, including
              Minneapolis and St. Paul, to prepare an alcohol or drug
              intervention, coordinate treatment, and stop the cycle of crisis,
              rescuing, and relapse.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg" asChild>
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="tel:541-668-8084">
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
                Statewide Strain
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Minnesota families are dealing with fentanyl, meth, alcohol, and
                prescription drug misuse in both the Twin Cities and rural
                communities.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Too Much Confusion
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Some families feel overwhelmed by options. Others feel isolated
                by distance. Both still need a clear plan that fits the real
                situation.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and boundaries are strong enough to survive the first
                pushback.
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
                When to Call for a Minnesota Alcohol or Drug Intervention
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not reach out at the first warning sign. They
                search for a Minnesota alcohol intervention, drug intervention,
                or Minneapolis interventionist after the relapses, the lies, the
                money leaks, the treatment attempts that did not stick, or the
                creeping fear that one overdose could change everything.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The problem is not a lack of love. The problem is that addiction
                is stronger than scattered effort. When every family member is
                responding differently, the addiction keeps controlling the
                pace.
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
                A professional intervention helps the family stop improvising.
                It replaces panic and mixed signals with preparation, clarity,
                and a real path into treatment.
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
                Common Reasons Families in Minnesota Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {minnesotaSituations.map((item) => (
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
                  If your family keeps asking whether this is serious enough to
                  intervene, the safer assumption is that it is. Waiting rarely
                  makes the pattern simpler.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get a Yes. The Goal Is to Stop Feeding
                the Problem.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters, but lasting change requires the family
                to stop operating around addiction in the same old way.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family system that tells the truth,
                holds the line, and no longer keeps addiction protected from
                consequences.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Minnesota Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, arrest, or family breakdown to force the
            decision. Get clarity while your family still has room to act
            deliberately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/book-intervention-consultation#booking">
                <Calendar className="w-5 h-5 mr-2" />
                Book Confidential Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="tel:541-668-8084">
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

      <LocationLinks currentLocation="Minnesota" locationType="state" />

      <Footer />
    </div>
  );
};

export default Minnesota;
