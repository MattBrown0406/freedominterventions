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
  "Distance can complicate treatment, but it should not become the reason the family keeps waiting while the danger grows.",
  "Meth can keep households unstable for years, and fentanyl has made the overdose risk much more immediate.",
  "Families often need a plan that accounts for travel, transport, and treatment placement beyond their immediate area.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned first",
    description:
      "Matt helps the family unify its message, define boundaries, and stop sending mixed signals that addiction can keep exploiting.",
  },
  {
    title: "Builds a treatment plan that fits Wyoming realities",
    description:
      "Local options, out-of-state placement, transport, and contingency plans are handled before the intervention takes place.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not to shame your loved one. The goal is to break through denial and create a real opening into help.",
  },
  {
    title: "Helps the family hold structure afterward",
    description:
      "Whether your loved one says yes or no, the family still needs a plan strong enough to outlast the first emotional pushback.",
  },
];

const wyomingSituations = [
  "A son or daughter cycling through meth use, fentanyl exposure, or repeated false starts at recovery",
  "A spouse or partner whose drinking or drug use is destabilizing the home and finances",
  "A family in Cheyenne, Casper, Laramie, Gillette, or a smaller community unsure whether there is a workable path forward",
  "A loved one who keeps making promises but never follows through after the immediate crisis passes",
  "A family worn down by secrecy, distance, and constant anxiety about what happens next",
  "A situation that already feels one bad night away from tragedy",
];

const Wyoming = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Wyoming | Freedom Interventions"
        description="Wyoming families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Wyoming prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/wyoming"
        keywords="Wyoming addiction intervention, Wyoming interventionist, Cheyenne drug intervention, Casper family intervention, Wyoming alcohol intervention"
        geoRegion="US-WY"
        geoPlacename="Wyoming"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Wyoming"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/wyoming"
        description="Professional addiction intervention services for families across Wyoming, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Wyoming" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Wyoming",
            url: "https://freedominterventions.com/wyoming",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Wyoming", href: "/wyoming" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Wyoming Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When a Family Feels Far From Help, It Still Needs a Real Plan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Wyoming to prepare the
              intervention, coordinate treatment, and stop the cycle of
              isolation, delay, and repeated crisis.
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
                Remote Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wyoming families often face long travel distances, fewer nearby
                options, and the false belief that they need to wait until
                things are even worse.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Meth and Fentanyl
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Meth remains a major source of family chaos, and fentanyl has
                raised the stakes on relapse, experimentation, and unknown
                substances.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the old pattern of reacting in panic gets replaced
                with structure.
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
                Wyoming Families Usually Call After Distance, Pride, and
                Exhaustion Have Already Cost Them Too Much Time
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Families in Wyoming often spend too long trying to handle
                addiction privately. The distances are real, the resources can
                feel thin, and asking for outside help can feel bigger than it
                should.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                But addiction does not slow down just because the geography is
                hard. By the time most families call, they are exhausted by the
                lies, the fear, the unpredictability, and the pressure of
                carrying the problem alone.
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
                A real intervention changes the family from a group of worried
                people reacting to chaos into a team working from a plan.
                Treatment is lined up, the message is clear, and the addiction
                is no longer being quietly accommodated.
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
                Common Reasons Families in Wyoming Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {wyomingSituations.map((item) => (
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
                  If your family keeps wondering whether now is really the time
                  to intervene, it usually means the situation has already been
                  serious long enough.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just a Treatment Yes. The Goal Is to Stop
                Letting Addiction Set the Terms.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters, but the bigger shift is that the family
                stops organizing itself around fear, bargaining, and emergency
                decision-making.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes clear, prepared,
                and no longer willing to keep addiction protected from
                consequences.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Wyoming Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, arrest, or family collapse to make the
            decision for you. Get clarity now, while there is still room to act
            deliberately.
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

      <LocationLinks currentLocation="Wyoming" locationType="state" />

      <Footer />
    </div>
  );
};

export default Wyoming;
