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
  "New Brunswick families often wait too long because they are trying to manage the problem privately and protect everyone from shame, conflict, or public fallout.",
  "The province can make treatment planning feel complicated. Some families want local care, others need to consider travel, and many do not know which option actually fits the situation.",
  "By the time most families call, they are worn down by lying, money problems, broken trust, and the feeling that every conversation turns into another argument or another rescue.",
];

const whatMattDoes = [
  {
    title: "Gets the family on the same page first",
    description:
      "Matt helps the family move from mixed messages and emotion-driven reactions into one shared plan and one clear message.",
  },
  {
    title: "Builds treatment options before the intervention",
    description:
      "Detox, residential care, outpatient options, transport, and fallback steps are lined up before the conversation happens.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The point is not to shame your loved one. The point is to bring clarity, truth, and a real decision point into the room.",
  },
  {
    title: "Helps the family maintain structure afterward",
    description:
      "Whether your loved one says yes or no, the family needs boundaries and consistency that can hold after the first confrontation ends.",
  },
];

const commonSituations = [
  "A son or daughter caught in a cycle of opioid use, relapse, and repeated promises to get help later",
  "A spouse or partner whose drinking or drug use is destabilizing the home and exhausting everyone around them",
  "A family in Saint John, Moncton, Fredericton, or a smaller New Brunswick community that cannot agree on what to do next",
  "A family trapped between protecting privacy and facing the reality that the situation is getting worse",
  "A loved one who sounds sincere about treatment in the moment but backs out as soon as the pressure drops",
  "A situation where the family knows waiting is no longer a neutral decision",
];

const NewBrunswick = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in New Brunswick | Freedom Interventions"
        description="New Brunswick families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across New Brunswick prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/new-brunswick"
        keywords="New Brunswick addiction intervention, New Brunswick interventionist, Moncton drug intervention, Saint John family intervention, New Brunswick alcohol intervention"
        geoRegion="CA-NB"
        geoPlacename="New Brunswick"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="New Brunswick"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/new-brunswick"
        description="Professional addiction intervention services for families across New Brunswick, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
        country="CA"
      />
      <LocationFAQSchema location="New Brunswick" locationType="province" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "New Brunswick",
            url: "https://freedominterventions.com/new-brunswick",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "New Brunswick", href: "/new-brunswick" },
        ]}
      />

      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              New Brunswick Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Family Has Been Carrying the Addiction Alone, It Is Time
              for a Stronger Structure
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Matt Brown works with families across New Brunswick to prepare the
              intervention, coordinate treatment, and stop the cycle of secrecy,
              fear, and repeated crisis.
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
                Growing Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                New Brunswick families are dealing with opioids, alcohol, meth,
                and prescription misuse in situations that often escalate
                quietly before they become obvious.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Tight Networks
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In smaller communities, privacy concerns and limited local
                options can keep families stuck longer than they should be.
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
                New Brunswick Families Usually Call After They Have Tried
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
                In New Brunswick, privacy concerns, smaller-community dynamics,
                and the question of whether treatment should be local or involve
                travel can all slow families down at the worst moment.
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
                Common Reasons Families in New Brunswick Reach Out
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
                  If the whole family is already organizing life around the next
                  crisis, the addiction has more control than anyone wants to
                  admit.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just a Better Conversation. The Goal Is a
                Different Family System.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A single intervention does not fix everything by itself. If the
                family returns to fear, rescuing, and mixed messages, addiction
                will try to settle right back into the same space.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes clear, honest, and
                consistent, and a loved one who is given a real chance to accept
                help.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a New Brunswick Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, legal problem, or family collapse to make the decision for
            you. Get a clear assessment and a real plan.
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

      <LocationLinks currentLocation="New Brunswick" locationType="province" />

      <Footer />
    </div>
  );
};

export default NewBrunswick;
