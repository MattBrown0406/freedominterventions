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
  "Vermont families are often dealing with fentanyl, alcohol, cocaine, and prescription misuse in smaller communities where privacy matters and people wait too long to ask for outside help.",
  "The rural realities of Vermont can make treatment planning more complicated, but the deeper problem is usually the same one families face everywhere: everyone is reacting, nobody is aligned, and addiction keeps using that split to survive.",
  "By the time most families reach out, they have already tried to reason, rescue, threaten, and support their way through the problem, only to watch it keep returning in a different form.",
];

const whatMattDoes = [
  {
    title: "Gets the family organized before the intervention",
    description:
      "Matt helps the family stop improvising, define roles, and replace mixed messages with a clear plan everyone understands.",
  },
  {
    title: "Builds the treatment path before the confrontation",
    description:
      "Detox, residential treatment, outpatient care, transport, and contingency planning are handled ahead of time so there is somewhere real for the intervention to lead.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The work is not about pressure for its own sake. It is about telling the truth clearly, breaking through denial, and opening the door to treatment.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "If your loved one says yes, the family needs structure. If your loved one says no, the family still needs structure. That is where real change begins.",
  },
];

const vermontSituations = [
  "A son or daughter drifting through fentanyl use, relapse, or repeated treatment promises",
  "A spouse or partner whose drinking or drug use is destabilizing the home",
  "Parents exhausted by secrecy, enabling, money problems, and emotional whiplash",
  "A family split between fear, guilt, tough love, and denial",
  "A loved one who says they want help, but will not take action once the crisis cools off",
  "A situation that feels too risky to keep handling without a plan",
];

const Vermont = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Vermont | Freedom Interventions"
        description="Vermont families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Vermont prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/vermont"
        keywords="Vermont addiction intervention, Vermont interventionist, Burlington drug intervention, family intervention Vermont, Vermont intervention services"
        geoRegion="US-VT"
        geoPlacename="Vermont"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Vermont"
        url="https://freedominterventions.com/vermont"
        description="Professional addiction intervention services for families across Vermont, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Vermont" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Vermont", url: "https://freedominterventions.com/vermont" },
        ]}
      />

      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Vermont", href: "/vermont" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Vermont Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Keeps the Family in Reaction Mode, You Need
              Structure, Not More Guesswork
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Vermont to prepare the
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
                Rising Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Vermont, fentanyl has changed the stakes. Families who once
                thought there was time to wait are realizing the margin for
                error is much smaller now.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Rural Reality
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Distance, smaller communities, and limited local options can
                complicate treatment planning, which is why structure matters so
                much.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the next move is not being decided in the middle
                of a crisis.
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
                Vermont Families Usually Call After They Have Tried to Manage
                the Crisis Quietly
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not reach out at the first sign of addiction.
                They call after the lies, the financial support, the treatment
                conversations, the relapses, the close calls, or the family
                arguments have already taken a real toll.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The issue is not that the family has not cared enough. The issue
                is that addiction thrives when everyone is scared, divided, and
                trying something different. Without structure, the family keeps
                reacting while the addiction keeps setting the terms.
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
                A real intervention is not about creating a dramatic scene. It
                is about changing the structure around the addiction so the
                family can finally stop improvising.
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
                Common Reasons Families in Vermont Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {vermontSituations.map((item) => (
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
                  If your family keeps asking whether it is finally time to do
                  something more serious, it usually is. Waiting rarely makes
                  the family stronger. It usually just gives the addiction more
                  time.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Different
                Family Pattern.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters. But if the family goes back to fear,
                rescuing, and mixed messages, the addiction will keep trying to
                come back through the same doors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one is given a real
                chance to accept help, and the family stops protecting the
                addiction from its consequences. That is where things start to
                change.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Vermont Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, legal problem, or family collapse to force the
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

      <LocationLinks currentLocation="Vermont" locationType="state" />
      <Footer />
    </div>
  );
};

export default Vermont;
