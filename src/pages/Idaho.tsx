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
import idahoBanner from "@/assets/idaho-crisis-banner.jpg";
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
  "Idaho families are dealing with fentanyl, meth, alcohol, and DUI-related fallout in a state where both denial and distance can delay action too long.",
  "Rural families often face long drives and fewer treatment options, while metro families still face the same deeper problem: addiction has trained everyone to react instead of lead.",
  "The numbers are getting worse, but families do not need more statistics nearly as much as they need a structure strong enough to interrupt the pattern at home.",
];

const whatMattDoes = [
  {
    title: "Gets the family out of chaos and onto the same page",
    description:
      "Before the intervention, Matt helps the family stop arguing, stop improvising, and stop sending the mixed messages addiction knows how to use.",
  },
  {
    title: "Builds a realistic treatment plan before the conversation",
    description:
      "That may mean detox, residential care, outpatient treatment, sober living, transport, or out-of-area placement. The plan gets built before the pressure moment arrives.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The goal is not to overwhelm your loved one. The goal is to tell the truth clearly, present treatment, and show that the family is no longer willing to keep addiction comfortable.",
  },
  {
    title: "Helps the family hold the structure afterward",
    description:
      "If your loved one accepts help, the family needs consistency. If your loved one refuses help, the family still needs consistency. That is where change starts to become real.",
  },
];

const idahoSituations = [
  "A son or daughter moving between fentanyl, meth, marijuana, alcohol, and repeated legal trouble",
  "A spouse or partner whose drinking or drug use is destabilizing the home while still being minimized by the family",
  "A family worn down by DUIs, bailouts, missing money, disappearing acts, and broken promises",
  "A rural family trying to help but overwhelmed by treatment access, distance, or transportation issues",
  "A loved one who says they want help but never follows through once the immediate pressure passes",
  "A situation that feels one more overdose scare, crash, or arrest away from disaster",
];

const Idaho = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Idaho | Freedom Interventions"
        description="Idaho families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Idaho prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/idaho"
        keywords="Idaho addiction intervention, Idaho interventionist, Boise drug intervention, Idaho family intervention, Coeur d'Alene intervention services"
        geoRegion="US-ID"
        geoPlacename="Idaho"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Idaho"
        url="https://freedominterventions.com/idaho"
        description="Professional addiction intervention services for families across Idaho, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Idaho" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Idaho", url: "https://freedominterventions.com/idaho" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Idaho", href: "/idaho" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${idahoBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            Idaho Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When Addiction Has the Family Living in Reaction Mode, Structure
            Matters More Than Another Promise
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across Idaho to prepare the
            intervention, coordinate treatment, and stop the cycle of fear,
            enabling, and repeated crisis.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground"
              asChild
            >
              <a href="tel:+15416688084">
                <Phone className="w-5 h-5 mr-2" />
                Call (541) 668-8084
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-destructive mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">386</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Idaho overdose deaths in 2023, including a steep rise tied to
                fentanyl's spread across the state.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Rural Barriers
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Families may be juggling long distances, limited local care, and
                transportation problems while the addiction keeps escalating.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the boundaries are strong enough to survive the
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
                Idaho Families Usually Call After the Pattern Has Already Become
                Expensive and Dangerous
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not call at the first warning sign. They call
                after the DUIs, disappearances, overdose scares, money problems,
                bailouts, and broken promises have already stacked up.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Idaho, the practical obstacles can be real. Travel, fewer
                nearby options, and the instinct to handle things privately can
                all keep families stuck. But the deeper problem is usually the
                same: the family has been pulled into reaction mode, and the
                addiction is still setting the terms.
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
                A real intervention is not a dramatic talk for its own sake. It
                is a process that gets the family aligned, gets treatment lined
                up, and gives your loved one a direct path into help.
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
                Common Reasons Families in Idaho Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {idahoSituations.map((item) => (
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
                  something serious, it usually is. Families rarely call too
                  early. They much more often call after the price of waiting is
                  already obvious.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just a Treatment Yes. The Goal Is a Different
                Family Structure.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family goes back to the same
                fear-based decisions, rescue patterns, and inconsistent
                boundaries, the addiction will keep trying to take the same
                ground again.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family system that tells the truth,
                holds the line, and no longer makes addiction easier to
                continue. That is where leverage and real change start.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With an Idaho Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, crash, arrest, or collapse at home to force the decision. Get
            clarity now, while the family still has room to act deliberately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="tel:+15416688084">
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

      <LocationLinks currentLocation="Idaho" locationType="state" />

      <Footer />
    </div>
  );
};

export default Idaho;
