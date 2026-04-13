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
import newMexicoBanner from "@/assets/new-mexico-crisis-banner.jpg";
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
  "New Mexico families are often dealing with fentanyl, heroin, meth, and alcohol in communities where treatment access can be limited and the stakes are already high.",
  "Rural distance, under-resourced systems, and long-standing family trauma can make the crisis feel bigger than one conversation, which is exactly why structure matters.",
  "Cultural loyalty and tight family systems can be a strength, but they can also keep families protecting the addiction longer than they should.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Most families call after months of fear, confusion, and disagreement. Matt helps the family get clear enough to stop letting addiction divide everyone around it.",
  },
  {
    title: "Builds a treatment plan that fits the real geography",
    description:
      "That may mean local care, transport planning, or placement outside New Mexico when the right level of care is not close by. The plan gets built before the intervention, not after it.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The point is not theatrics. The point is to tell the truth, present treatment, and create a real opening for your loved one to accept help.",
  },
  {
    title: "Helps the family hold steady afterward",
    description:
      "If your loved one says yes, the family needs structure. If your loved one says no, the family still needs structure. That is how the addiction stops running the whole system.",
  },
];

const newMexicoSituations = [
  "A son or daughter caught in fentanyl, heroin, meth, or alcohol use that keeps escalating",
  "A family in Albuquerque, Santa Fe, Las Cruces, Farmington, or a smaller community that cannot agree on the next right move",
  "A loved one with addiction and mental health concerns in a system that already feels overloaded",
  "A family dealing with repeated overdoses, disappearances, legal trouble, or deep emotional exhaustion",
  "A situation where local treatment access is limited and the family may need to consider regional or out-of-state options",
  "A family that knows waiting for the next crisis is no longer responsible or safe",
];

const NewMexico = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in New Mexico | Freedom Interventions"
        description="New Mexico families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across New Mexico prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/new-mexico"
        keywords="New Mexico addiction intervention, New Mexico interventionist, Albuquerque drug intervention, Santa Fe intervention services, family intervention New Mexico"
        geoRegion="US-NM"
        geoPlacename="New Mexico"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="New Mexico"
        url="https://freedominterventions.com/new-mexico"
        description="Professional addiction intervention services for families across New Mexico, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="New Mexico" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "New Mexico",
            url: "https://freedominterventions.com/new-mexico",
          },
        ]}
      />

      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "New Mexico", href: "/new-mexico" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${newMexicoBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            New Mexico Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When Addiction Has the Family Cornered, You Need a Plan Stronger
            Than Panic
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across New Mexico to prepare the
            intervention, coordinate treatment, and stop the cycle of fear,
            isolation, and repeated crisis.
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
              <a href="tel:+15418386009">
                <Phone className="w-5 h-5 mr-2" />
                Call (541) 838-6009
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
              <div className="text-3xl font-bold text-foreground mb-2">
                900+
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Overdose deaths in New Mexico in 2023, with fentanyl remaining a
                major driver of danger statewide.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Distance and Access
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Families may be balancing limited local options, long travel,
                and the need for regional placement when the right care is not
                nearby.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the old cycle of rescuing and waiting starts to
                end.
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
                New Mexico Families Usually Reach Out After the Situation Has
                Already Been Bad for a Long Time
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already
                absorbed a great deal of fear and damage. They have lived
                through overdoses, lies, emotional exhaustion, money problems,
                and the daily tension of not knowing what happens next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In New Mexico, those pressures are often magnified by distance,
                limited access, and deep family loyalty. Families care deeply,
                but care without structure can still leave everyone trapped in
                the same addiction cycle.
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
                A real intervention is not a hopeful speech and a crossed
                fingers plan. It is a structured process that gets the family
                clear, gets treatment lined up, and changes the leverage around
                the addiction.
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
                Common Reasons Families in New Mexico Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {newMexicoSituations.map((item) => (
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
                  If your family keeps asking how much worse this needs to get
                  before someone steps in, that question usually answers itself.
                  It is already serious enough.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Family
                System That Stops Protecting the Addiction.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family returns to the same
                confusion, fear, and mixed boundaries afterward, the addiction
                will keep trying to reclaim the same ground.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one gets a real chance
                at help, and the family becomes honest and consistent enough to
                stop making the addiction easier to continue.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a New Mexico Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose,
            disappearance, or family collapse to decide for you. Get a clear
            assessment and a real plan while the family still has room to act.
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

      <LocationLinks currentLocation="New Mexico" locationType="state" />
      <Footer />
    </div>
  );
};

export default NewMexico;
