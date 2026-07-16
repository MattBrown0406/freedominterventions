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
  "Rhode Island may be small, but families here are dealing with the same high-stakes reality as anywhere else: fentanyl, alcohol, cocaine, and pills can push a situation from manageable to dangerous very quickly.",
  "In a close-knit state, many families spend too long trying to keep the problem private. By the time they call, everyone is worn down and the addiction has already shaped the whole household.",
  "Even when treatment is geographically close, families still need help getting aligned, choosing the right level of care, and holding boundaries once pressure starts.",
];

const whatMattDoes = [
  {
    title: "Gets the family unified before the intervention",
    description:
      "Most failed interventions are not failures of love. They are failures of preparation. Matt helps the family get clear, consistent, and ready before the conversation begins.",
  },
  {
    title: "Builds the treatment plan in advance",
    description:
      "Detox, residential care, outpatient options, transport, and fallback plans are lined up ahead of time so the intervention does not stall out in uncertainty.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The work is not about theatrics. It is about telling the truth, breaking through denial, and giving your loved one a genuine opening into treatment.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "If your loved one accepts treatment, the family needs structure. If your loved one refuses treatment, the family still needs structure. That is how change becomes real.",
  },
];

const rhodeIslandSituations = [
  "A son or daughter cycling through relapse, overdose scares, and treatment promises that do not last",
  "A spouse or partner whose drinking or drug use is destabilizing the home",
  "A family trapped in secrecy, enabling, and repeated crisis management",
  "A loved one whose behavior has become more volatile, manipulative, or unsafe",
  "A family that cannot agree on whether to get tougher, stay patient, or stop rescuing",
  "A situation that feels one bad night away from tragedy",
];

const RhodeIsland = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Rhode Island | Freedom Interventions"
        description="Rhode Island families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Rhode Island prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/rhode-island"
        keywords="Rhode Island addiction intervention, Rhode Island interventionist, Providence drug intervention, family intervention Rhode Island, Rhode Island intervention services"
        geoRegion="US-RI"
        geoPlacename="Rhode Island"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Rhode Island"
        url="https://freedominterventions.com/rhode-island"
        description="Professional addiction intervention services for families across Rhode Island, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Rhode Island" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Rhode Island",
            url: "https://freedominterventions.com/rhode-island",
          },
        ]}
      />

      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Rhode Island", href: "/rhode-island" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Rhode Island Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Has the Family Stuck in Fear and Rescue Mode, It Is
              Time for a Clear Plan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Rhode Island to prepare the
              intervention, coordinate treatment, and stop the cycle of chaos,
              secrecy, and repeated crisis.
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
                No Room for Complacency
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Rhode Island, fentanyl has made the consequences of waiting
                much more severe. Families rarely regret acting too early.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Close-Knit, Still Complicated
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Even in a small state, addiction isolates families. Privacy,
                shame, and mixed messages can keep everyone stuck longer than
                they should be.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the old crisis-response pattern is replaced with
                structure.
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
                Rhode Island Families Usually Call After They Have Tried to Hold
                This Together on Their Own
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Families almost never call at the first warning sign. They call
                after the overdoses, the broken promises, the financial rescue,
                the disappearances, the emotional blowups, or the treatment talk
                that never turns into follow-through.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The problem is not just the substance use. It is that the family
                has usually been pushed into reaction mode. Everyone cares, but
                not everyone is doing the same thing. That confusion is exactly
                where addiction keeps surviving.
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
                A real intervention changes the structure around the addiction.
                The family gets clear. Treatment gets lined up. Boundaries stop
                being vague threats and start becoming real decisions.
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
                Common Reasons Families in Rhode Island Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {rhodeIslandSituations.map((item) => (
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
                  If your family is waiting for one final sign that it is time
                  to act, be careful. In addiction, the next sign is often a lot
                  more painful than the last one.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment. The Goal Is to End the
                Family&apos;s Chaos Pattern.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters. But if the family keeps operating in fear,
                confusion, and mixed messages, addiction will keep trying to
                re-enter through the same openings it used before.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one is given a real
                path into help, and the family stops protecting the addiction
                from the consequences that might finally force change.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Rhode Island Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, legal crisis, disappearance, or family collapse to decide for
            you. Get clarity now, while the family still has room to act.
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

      <LocationLinks currentLocation="Rhode Island" locationType="state" />
      <Footer />
    </div>
  );
};

export default RhodeIsland;
