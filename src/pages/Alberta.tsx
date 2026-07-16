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
  "Many Alberta families call only after the situation has already gone through relapse, overdose scares, emergency visits, or a long stretch of broken promises.",
  "In Alberta, the pressure often comes from both directions. Cities can feel overwhelming with options, while rural areas can feel stuck with too few realistic choices.",
  "Whether the substance is fentanyl, meth, alcohol, or multiple drugs at once, the family pattern is usually the same: fear, division, financial strain, and exhaustion.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the pressure moment",
    description:
      "Matt helps the family stop arguing, stop improvising, and stop sending mixed messages that addiction can keep using to stay in control.",
  },
  {
    title: "Builds treatment options before the intervention",
    description:
      "Detox, residential care, outpatient options, transport, and fallback plans get sorted out ahead of time so the conversation leads somewhere real.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not drama. The goal is clarity, a unified family message, and a real opening into treatment.",
  },
  {
    title: "Helps the family hold the structure afterward",
    description:
      "If your loved one says yes, the family needs a plan. If your loved one says no, the family still needs a plan. That is where real change starts.",
  },
];

const commonSituations = [
  "A son or daughter cycling between fentanyl scares, treatment attempts, and disappearing for stretches of time",
  "A spouse or partner whose drinking or drug use is destabilizing the home, finances, and trust",
  "A family in Calgary, Edmonton, Red Deer, or a smaller Alberta community that cannot agree on what should happen next",
  "A family worn down by money leaks, lies, manipulation, and crisis after crisis",
  "A loved one who keeps talking about getting help but never follows through once the pressure fades",
  "A situation that feels one bad weekend away from tragedy",
];

const Alberta = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Alberta | Freedom Interventions"
        description="Alberta families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Alberta prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/alberta"
        keywords="Alberta addiction intervention, Alberta interventionist, Calgary drug intervention, Edmonton family intervention, Alberta alcohol intervention"
        geoRegion="CA-AB"
        geoPlacename="Alberta"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Alberta"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/alberta"
        description="Professional addiction intervention services for families across Alberta, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
        country="CA"
      />
      <LocationFAQSchema location="Alberta" locationType="province" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Alberta", url: "https://freedominterventions.com/alberta" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Alberta", href: "/alberta" },
        ]}
      />

      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Alberta Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Has the Family Living in Crisis Mode, It Is Time
              for a Clearer Plan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Matt Brown works with families across Alberta to prepare the
              intervention, coordinate treatment, and stop the cycle of chaos,
              fear, and repeated rescue.
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
                Rising Stakes
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Alberta families are dealing with fentanyl, meth, alcohol, and
                prescription misuse in a province where the risk can escalate
                fast.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Urban and Rural
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From Calgary and Edmonton to smaller and remote communities, the
                challenge is often the same: families need a workable treatment
                path, not more guessing.
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
                Alberta Families Usually Call After They Have Tried Everything
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
                In Alberta, families are often trying to balance urgency with
                practical questions about access, travel, and which treatment
                option is actually the right fit.
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
                Common Reasons Families in Alberta Reach Out
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
                  If your family is already wondering whether things have become
                  serious enough to intervene, they usually have.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get a Yes. The Goal Is to Change the
                Family Pattern.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family goes back to
                rescuing, mixed messages, and fear-based decision making,
                addiction will try to take the same ground again.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a different structure, one where the
                family is aligned, the truth is clear, and the addiction is no
                longer being protected from consequences.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With an Alberta Intervention?
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

      <LocationLinks currentLocation="Alberta" locationType="province" />

      <Footer />
    </div>
  );
};

export default Alberta;
