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
  "British Columbia families are often dealing with a situation that has already become more dangerous than it looks from the outside because the drug supply is so unpredictable.",
  "The province offers more treatment pathways than some regions, but that does not make decisions easier. Families still need clarity about level of care, timing, and whether travel is the better option.",
  "By the time most families call, they are not just tired. They are scared, divided, and increasingly aware that waiting may not be survivable.",
];

const whatMattDoes = [
  {
    title: "Gets the family organized before the intervention",
    description:
      "Matt helps the family move out of chaos and into a shared plan with clear roles, boundaries, and a unified message.",
  },
  {
    title: "Builds the treatment path before the confrontation",
    description:
      "Detox, residential care, outpatient options, transport, and contingencies are handled before the family sits down with their loved one.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The point is not to overwhelm your loved one. The point is to tell the truth clearly and make the path into treatment real.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "If the loved one accepts help, the family needs structure. If the loved one refuses, the family still needs structure. That consistency matters.",
  },
];

const commonSituations = [
  "A son or daughter disappearing into fentanyl use, overdose scares, or repeated treatment starts that do not hold",
  "A spouse or partner whose drinking or drug use is destabilizing the home while everybody tries to manage it quietly",
  "A family in Vancouver, Victoria, Kelowna, Surrey, or a smaller BC community that cannot agree on the next right move",
  "A loved one whose behavior has become more volatile, deceptive, or dangerous",
  "A family trying to choose between public options, private care, local treatment, or travel out of province",
  "A situation where the fear of waiting is starting to outweigh the fear of acting",
];

const BritishColumbia = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in British Columbia | Freedom Interventions"
        description="British Columbia families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across British Columbia prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/british-columbia"
        keywords="British Columbia addiction intervention, BC interventionist, Vancouver drug intervention, Victoria family intervention, British Columbia alcohol intervention"
        geoRegion="CA-BC"
        geoPlacename="British Columbia"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="British Columbia"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/british-columbia"
        description="Professional addiction intervention services for families across British Columbia, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
        country="CA"
      />
      <LocationFAQSchema location="British Columbia" locationType="province" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "British Columbia",
            url: "https://freedominterventions.com/british-columbia",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "British Columbia", href: "/british-columbia" },
        ]}
      />

      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              British Columbia Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Toxic Drug Crisis Has the Whole Family on Edge, You Need
              More Than Another Promise
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Matt Brown works with families across British Columbia to prepare
              the intervention, coordinate treatment, and stop the cycle of
              panic, rescuing, and repeated crisis.
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
                Toxic Supply
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In British Columbia, fentanyl and other contaminants have made
                the margin for error brutally small for families waiting on a
                wake-up call.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Province-Wide Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From Metro Vancouver and Vancouver Island to the Interior and
                northern communities, families are trying to act before the next
                crisis turns fatal.
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
                British Columbia Families Usually Call After They Have Tried
                Everything Except Structure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already
                spent months, sometimes years, trying to manage the situation
                privately. They have covered bills, cleaned up messes, absorbed
                lies, believed promises, feared the worst, and argued about what
                to do next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Across British Columbia, families are often balancing the danger
                of the toxic drug supply with hard decisions about local care,
                private options, and when travel makes more sense.
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
                Common Reasons Families in British Columbia Reach Out
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
                  If your family keeps asking how bad it needs to get before you
                  intervene, British Columbia is not a good place to keep
                  testing that question.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is to Stop
                Protecting the Addiction.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A treatment yes matters. But if the family goes back to
                confusion, mixed messages, and panic-based decisions, the
                addiction will keep trying to return through the same openings.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family system that has changed, one
                that tells the truth, holds the line, and no longer keeps the
                addiction comfortable.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a British Columbia Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, or psychiatric crash to decide for you. Get
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

      <LocationLinks
        currentLocation="British Columbia"
        locationType="province"
      />

      <Footer />
    </div>
  );
};

export default BritishColumbia;
