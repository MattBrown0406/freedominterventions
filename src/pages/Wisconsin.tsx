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
  "Wisconsin families are often dealing with both alcohol and drug addiction at the same time, which can make the crisis harder to name and easier to normalize for too long.",
  "From Milwaukee and Madison to Green Bay and smaller communities, the pattern is the same: the family keeps adapting to chaos while the addiction keeps asking for more.",
  "By the time most families call, they have already tried talking, threatening, rescuing, covering bills, or waiting for a wake-up call that never seems to hold for long.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "When one person is minimizing the drinking, one is panicking about the drugs, and one is trying to keep peace at all costs, addiction has too much room to keep operating. Matt helps the family unify first.",
  },
  {
    title: "Builds the treatment plan before the pressure moment",
    description:
      "Detox, residential care, alcohol treatment, outpatient options, transport, and fallback plans are worked through in advance so the intervention leads somewhere real.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not to shame your loved one. The goal is to tell the truth clearly, break through denial, and present treatment in a way the family can stand behind.",
  },
  {
    title: "Helps the family hold structure afterward",
    description:
      "If your loved one accepts help, the family needs structure. If your loved one refuses help, the family still needs structure. That is how the old pattern finally starts to break.",
  },
];

const wisconsinSituations = [
  "A son or daughter bouncing between alcohol misuse, pills, fentanyl, or meth and repeated crisis",
  "A spouse or partner whose drinking or drug use is destabilizing the whole household",
  "A family that keeps normalizing serious alcohol abuse until the danger becomes impossible to ignore",
  "Parents exhausted by financial help, lies, emotional volatility, and repeated rescue",
  "A loved one who agrees they need help in theory, but never follows through in practice",
  "A situation where the family knows it cannot keep doing this another six months",
];

const Wisconsin = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Wisconsin | Freedom Interventions"
        description="Wisconsin families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Wisconsin prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/wisconsin"
        keywords="Wisconsin addiction intervention, Wisconsin interventionist, Milwaukee drug intervention, Madison intervention services, family intervention Wisconsin"
        geoRegion="US-WI"
        geoPlacename="Wisconsin"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Wisconsin"
        url="https://freedominterventions.com/wisconsin"
        description="Professional addiction intervention services for families across Wisconsin, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Wisconsin" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Wisconsin",
            url: "https://freedominterventions.com/wisconsin",
          },
        ]}
      />

      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Wisconsin", href: "/wisconsin" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Wisconsin Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction and Alcohol Abuse Have Become the Family&apos;s
              Normal, It Is Time to Interrupt the Pattern
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Wisconsin to prepare the
              intervention, coordinate treatment, and stop the cycle of chaos,
              enabling, and repeated crisis.
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
                Alcohol and Drug Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Wisconsin, alcohol problems are often minimized until they
                have already done serious damage. Add fentanyl or pills to the
                picture and the stakes rise even faster.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Statewide Pattern
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Urban or rural, the pattern is familiar: the family keeps making
                room for the addiction while hoping the next promise will be the
                one that changes things.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and everyone understands how to stop reinforcing the
                problem.
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
                Wisconsin Families Usually Call After They Have Tried to Keep
                the Situation Manageable for Too Long
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not call at the beginning. They call after the
                drinking has escalated, the drug use has become impossible to
                ignore, the money problems have piled up, or the family has been
                through one too many emergencies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Wisconsin, alcohol misuse can stay hidden behind cultural
                normalization longer than families expect. That often means they
                call later than they should, after the addiction has already
                reorganized the whole family around itself.
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
                A real intervention is not just about getting someone to agree
                that there is a problem. It is about changing the structure that
                has allowed the problem to keep going.
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
                Common Reasons Families in Wisconsin Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {wisconsinSituations.map((item) => (
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
                  If your family keeps saying, “We can&apos;t keep doing this,”
                  that is usually the moment to stop waiting and start planning.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Sobriety Talk. The Goal Is a Different
                Family System.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A treatment yes matters. But if the family goes back to
                minimizing, rescuing, and mixed messages, addiction gets another
                easy path back into the system.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one gets a real chance
                to accept help, and the family stops reinforcing the problem in
                the name of keeping the peace.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Wisconsin Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, DUI, disappearance, or family collapse to force the decision.
            Get clarity now, while the family still has room to act.
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

      <LocationLinks currentLocation="Wisconsin" locationType="state" />
      <Footer />
    </div>
  );
};

export default Wisconsin;
