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
  "Ontario families often call after they have already tried private conversations, financial rescue, treatment attempts, ultimatums, softened ultimatums, and months of trying to hold everything together.",
  "The size of Ontario creates a second challenge. Some families are overwhelmed by the number of options. Others are outside the main corridors and feel like the right help is too far away.",
  "The substances may differ from one home to another, but the family pattern is familiar: fear, arguments, secrecy, money problems, and the sense that everyone is reacting while the addiction sets the pace.",
];

const whatMattDoes = [
  {
    title: "Gets the family unified before anyone confronts your loved one",
    description:
      "Matt helps the family stop acting like separate worried individuals and start acting like a team with one clear plan.",
  },
  {
    title: "Builds the treatment plan before the intervention",
    description:
      "Detox, residential care, outpatient options, transport, and backup plans are handled in advance so the intervention has somewhere real to go.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not shame or spectacle. The goal is clarity, honesty, and a real opening into treatment.",
  },
  {
    title: "Helps the family hold the structure afterward",
    description:
      "If your loved one says yes, the family needs consistency. If your loved one says no, the family still needs consistency. That is where leverage comes from.",
  },
];

const commonSituations = [
  "A young adult bouncing between fentanyl scares, treatment starts, and disappearances",
  "A spouse or partner whose drinking or drug use is destabilizing the home while trying to look functional on the outside",
  "A family in Toronto, Ottawa, Hamilton, London, or a smaller Ontario community that cannot agree on what to do next",
  "A family exhausted by paying bills, cleaning up fallout, and trying to separate truth from manipulation",
  "A loved one who talks about wanting help but never acts once the moment passes",
  "A situation that feels more dangerous and more exhausting every month",
];

const Ontario = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Ontario | Freedom Interventions"
        description="Ontario families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Ontario prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/ontario"
        keywords="Ontario addiction intervention, Ontario interventionist, Toronto drug intervention, Ottawa family intervention, Ontario alcohol intervention"
        geoRegion="CA-ON"
        geoPlacename="Ontario"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Ontario"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/ontario"
        description="Professional addiction intervention services for families across Ontario, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
        country="CA"
      />
      <LocationFAQSchema location="Ontario" locationType="province" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Ontario", url: "https://freedominterventions.com/ontario" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Ontario", href: "/ontario" },
        ]}
      />

      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Ontario Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Has the Whole Family Living From Crisis to Crisis,
              Hope Alone Is Not Enough
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Matt Brown works with families across Ontario to prepare the
              intervention, coordinate treatment, and stop the cycle of panic,
              rescue, and repeated relapse.
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
                High Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ontario families are dealing with fentanyl, alcohol, cocaine,
                meth, and prescription misuse in a province where the stakes can
                escalate quickly.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Too Many Choices
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ontario has a large treatment landscape, but volume is not
                clarity. Families still need help choosing the right level of
                care and next move.
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
                Ontario Families Usually Call After They Have Tried Everything
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
                In Ontario, families are often caught between too many treatment
                choices in larger centers and much less access once they are
                outside the main corridors.
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
                Common Reasons Families in Ontario Reach Out
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
                  If your family is asking whether it is finally time to do
                  something serious, it usually is.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Different
                Family Structure.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A treatment yes matters. But if the family returns to fear,
                rescuing, and mixed messages, the addiction will keep trying to
                re-enter through the same openings.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family system that has changed, one
                that tells the truth, holds boundaries, and stops making the
                addiction easier to continue.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With an Ontario Intervention?
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

      <LocationLinks currentLocation="Ontario" locationType="province" />

      <Footer />
    </div>
  );
};

export default Ontario;
