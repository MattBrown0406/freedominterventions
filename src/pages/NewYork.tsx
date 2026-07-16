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
  "New York families call from Manhattan, Long Island, Buffalo, Westchester, and small upstate towns, but the family pattern is the same: the addiction keeps escalating while everyone around it keeps reacting.",
  "In a state this large, treatment options can be both abundant and overwhelming. Families do not just need a list of programs. They need a plan that matches the real level of risk and resistance.",
  "Fentanyl, alcohol, cocaine, pills, and meth may show up differently, but the family cost is familiar: fear, secrecy, manipulation, financial drain, and constant uncertainty about what happens next.",
];

const whatMattDoes = [
  {
    title: "Gets the family unified before anyone confronts your loved one",
    description:
      "When one person is rescuing, one is angry, and one is minimizing, the conversation is already in trouble. Matt helps the family get aligned first.",
  },
  {
    title: "Builds the treatment plan before the intervention",
    description:
      "Detox, residential care, outpatient options, transport, and backup plans are handled in advance so the intervention leads somewhere real instead of falling apart in the moment.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not to shame your loved one. The goal is to break through denial, present the truth clearly, and offer a real path into treatment.",
  },
  {
    title: "Helps the family hold the structure afterward",
    description:
      "Whether your loved one accepts help or refuses it, the family needs a plan it can actually maintain. That is where real change starts to stick.",
  },
];

const newYorkSituations = [
  "A young adult bouncing between fentanyl scares, treatment starts, and repeated relapse",
  "A spouse or partner whose drinking, cocaine use, or pills are quietly destabilizing the family",
  "A family worn down by money requests, lies, disappearances, and emotional whiplash",
  "A loved one who looks functional to the outside world but is unraveling in private",
  "A family trying to decide between local treatment, travel, or a more structured placement elsewhere",
  "A situation that feels too volatile to keep handling without help",
];

const NewYork = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in New York | Freedom Interventions"
        description="New York families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across New York prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/new-york"
        keywords="New York addiction intervention, New York interventionist, NYC drug intervention, Long Island intervention services, family intervention New York"
        geoRegion="US-NY"
        geoPlacename="New York"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="New York"
        url="https://freedominterventions.com/new-york"
        description="Professional addiction intervention services for families across New York, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="New York" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "New York",
            url: "https://freedominterventions.com/new-york",
          },
        ]}
      />
      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "New York", href: "/new-york" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              New York Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Is Controlling the Family, You Need More Than One
              More Emotional Conversation
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across New York to prepare the
              intervention, coordinate treatment, and stop the cycle of chaos,
              rescue, and relapse.
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
                High Stakes
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In New York, fentanyl and polysubstance use have made the cost
                of delay much higher. Families who wait for certainty often end
                up waiting through another crisis.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Big State, Same Pattern
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Urban, suburban, or rural, the problem is not just access to
                treatment. It is getting the family clear enough to act in a way
                addiction cannot keep manipulating.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and everyone understands what happens if the answer is
                yes and what happens if the answer is no.
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
                New York Families Usually Call After They Have Tried Everything
                Except Real Structure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already done
                a lot. They have paid bills, cleaned up messes, absorbed lies,
                tried ultimatums, softened ultimatums, and argued over what the
                next right move should be.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The problem is not that the family does not care enough. The
                problem is that addiction is stronger than scattered effort.
                Without structure, the family keeps reacting while addiction
                keeps controlling the pace.
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
                A real intervention is not a dramatic event for its own sake. It
                is a process that gets the family unified, gets treatment lined
                up, and creates a clear path out of the cycle you are already
                trapped in.
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
                Common Reasons Families in New York Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {newYorkSituations.map((item) => (
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
                  If your family keeps wondering whether it is finally time to
                  intervene, it usually is. Families rarely regret acting too
                  soon. They often regret giving addiction one more month to set
                  the terms.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get a Yes. The Goal Is a Different
                Family System.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family goes back to fear,
                confusion, and mixed messages, addiction will try to reoccupy
                the same space it held before.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one gets a real chance
                to accept help, and the family stops protecting the addiction
                from its consequences. That is how momentum shifts.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a New York Intervention?
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

      <LocationLinks currentLocation="New York" locationType="state" />
      <Footer />
    </div>
  );
};

export default NewYork;
