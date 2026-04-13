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
  Scale,
} from "lucide-react";
import floridaBanner from "@/assets/florida-crisis-banner.jpg";
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
  "Florida families are often dealing with addiction and mental health instability at the same time, which means the crisis can move quickly from chaos to genuine danger.",
  "The state has a huge treatment marketplace, but volume does not equal clarity. Families still need help choosing what is real, what is appropriate, and what can happen fast.",
  "When the situation keeps escalating, families start asking whether the Marchman Act or Baker Act applies. Those can matter, but they work best inside a larger treatment and intervention plan.",
];

const whatMattDoes = [
  {
    title: "Gets the family organized before anyone confronts your loved one",
    description:
      "Most families reach out after months of fear, rescuing, and argument. Matt helps everyone get aligned so the addiction is no longer controlling the family through division.",
  },
  {
    title: "Builds the treatment plan before the intervention",
    description:
      "Detox, residential care, outpatient options, transport, and backup plans are worked out ahead of time so the conversation leads somewhere real.",
  },
  {
    title: "Helps families understand where legal tools may fit",
    description:
      "If the family is considering the Marchman Act or Baker Act, Matt helps them understand when those options may be relevant and when local legal or court guidance should be part of the next step.",
  },
  {
    title:
      "Leads a direct, compassionate intervention and helps the family hold the line",
    description:
      "The goal is not drama. It is clarity, treatment entry, and a family system that stops protecting the addiction from consequences afterward.",
  },
];

const floridaSituations = [
  "A son or daughter caught in fentanyl, cocaine, meth, alcohol, or prescription drug chaos",
  "A spouse or partner whose drinking or drug use is destabilizing the home, finances, and safety",
  "A family split between enabling, tough love, fear, and confusion about what to do next",
  "A loved one cycling through ER visits, arrests, psychiatric crises, or repeated treatment promises",
  "A situation where the family is asking whether the Marchman Act or Baker Act should be considered",
  "A family that knows waiting for one more crisis is no longer a serious plan",
];

const Florida = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Florida | Freedom Interventions"
        description="Florida families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Florida prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/florida"
        keywords="Florida addiction intervention, Florida interventionist, Marchman Act, Baker Act, Miami drug intervention, Florida family intervention"
        geoRegion="US-FL"
        geoPlacename="Florida"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Florida"
        url="https://freedominterventions.com/florida"
        description="Professional addiction intervention services for families across Florida, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Florida" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Florida", url: "https://freedominterventions.com/florida" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Florida", href: "/florida" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${floridaBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            Florida Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When Addiction and Crisis Keep Taking Over, the Family Needs More
            Than Hope
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across Florida to prepare the
            intervention, coordinate treatment, and decide whether tools like
            the Marchman Act or Baker Act belong in the plan.
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
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-destructive mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                7,220
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Florida overdose deaths in 2023, a reminder that waiting for the
                next wake-up call is a dangerous gamble.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Scale className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Legal Tools
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Marchman Act and Baker Act can matter in the right cases,
                but families still need a bigger intervention and treatment
                strategy around them.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Too Many Options
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Florida has plenty of programs, but families still need help
                finding the right level of care instead of getting sold
                something that does not fit.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the old rescue pattern is being replaced with
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
                Florida Families Usually Reach Out After the Situation Has
                Already Become Dangerous
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family calls, they have usually already spent
                months managing fallout. They have covered bills, softened
                consequences, tried to calm the chaos, feared overdose, dealt
                with psychiatric volatility, and argued about whether the next
                move should be patience, pressure, or legal action.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Florida, the exact substance pattern may differ from family
                to family, but the deeper pattern is the same. Everyone is
                scared. Nobody agrees. The addiction keeps setting the pace.
                That is why the family needs structure before the next crisis
                chooses for them.
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
                A real intervention is not a dramatic confrontation. It is a
                process that gets the family aligned, gets treatment lined up,
                and creates leverage strong enough to interrupt the addiction
                pattern.
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
                Common Reasons Families in Florida Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {floridaSituations.map((item) => (
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
                  If your family is already asking whether this has become a
                  Marchman Act question, a Baker Act question, or an immediate
                  intervention question, the safer assumption is that the
                  situation already deserves serious action.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Family That
                Stops Feeding the Crisis.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A yes to treatment matters. But if the family keeps operating in
                panic, denial, and mixed messages, the addiction will keep
                trying to reclaim the same territory.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: the loved one is given a real path
                into help, and the family stops organizing itself around the
                addiction. That is where lasting change begins.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Florida Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose,
            arrest, psychiatric emergency, or family collapse to force the
            decision. Get a clear assessment and a real plan now.
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

      <LocationLinks currentLocation="Florida" locationType="state" />

      <Footer />
    </div>
  );
};

export default Florida;
