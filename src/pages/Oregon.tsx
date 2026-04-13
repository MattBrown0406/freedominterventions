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
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  LocationFAQSchema,
  SpeakableSchema,
  ServiceAreaSchema,
} from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const pressurePoints = [
  "Oregon families are often dealing with fentanyl, meth, alcohol, and polysubstance use in a system that still feels patchy, confusing, and inconsistent from one community to the next.",
  "Policy shifts and public debate do not change what families live with at home: chaos, fear, money problems, and the exhausting feeling that everyone is reacting while the addiction keeps advancing.",
  "In both Portland and smaller communities across the state, the pattern is familiar. Families wait, hope, rescue, argue, and then call when they realize the structure at home has to change.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Most families are divided by the time they reach out. One person is rescuing, another is angry, another is frozen, and the addiction is using all of it. Matt helps the family get clear and unified first.",
  },
  {
    title: "Builds the treatment plan before the pressure moment",
    description:
      "Detox, residential care, outpatient options, sober living, transport, and backup plans are handled ahead of time so the intervention leads somewhere real.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not to create drama. The goal is to tell the truth, present treatment clearly, and make it obvious the family is no longer going to keep addiction comfortable.",
  },
  {
    title: "Helps the family stay consistent after the intervention",
    description:
      "If your loved one accepts help, the family needs structure. If your loved one refuses help, the family still needs structure. That is where the old cycle starts to break.",
  },
];

const oregonSituations = [
  "A loved one cycling through fentanyl, meth, alcohol, or mixed-substance use with no lasting follow-through",
  "A family exhausted by overdose scares, jail calls, money drains, and constant emotional whiplash",
  "A spouse or partner whose drinking or drug use is destabilizing the home while everyone keeps trying to manage around it",
  "A family in Portland, Eugene, Bend, Medford, Salem, or a rural Oregon community that cannot agree on what should happen next",
  "A loved one who keeps promising treatment, then backing out once the pressure eases",
  "A situation where the family knows another six months of this could end badly",
];

const Oregon = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Oregon | Freedom Interventions"
        description="Oregon families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Oregon prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/oregon"
        keywords="Oregon addiction intervention, Oregon interventionist, Portland drug intervention, Oregon family intervention, alcohol intervention Oregon"
        geoRegion="US-OR"
        geoPlacename="Oregon"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Oregon"
        url="https://freedominterventions.com/oregon"
        description="Professional addiction intervention services for families across Oregon, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Oregon" locationType="state" />
      <SpeakableSchema
        name="Oregon Addiction Intervention Services"
        description="Professional addiction intervention services in Oregon helping families navigate treatment options."
        url="https://freedominterventions.com/oregon"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Oregon", url: "https://freedominterventions.com/oregon" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Oregon", href: "/oregon" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${oregonBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            Oregon Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When Addiction Keeps Pulling the Family Into Chaos, Structure Has to
            Lead
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across Oregon to prepare the
            intervention, coordinate treatment, and stop the cycle of panic,
            rescuing, and repeated crisis.
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
                1,833
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Oregon overdose deaths in 2023, a reminder that even when public
                trends shift, families are still living with very real danger.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Uneven Systems
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Oregon families often face waitlists, mixed program quality, and
                a treatment system that still takes work to navigate well.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the boundaries are strong enough to outlast the
                first wave of resistance.
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
                Oregon Families Usually Call After They Have Tried Everything
                Except a Real Structure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have often already tried
                private talks, money help, emotional appeals, treatment offers,
                threats, softened threats, and one more promise to wait and see.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The problem is not a lack of love. The problem is that addiction
                is stronger than scattered effort. Without structure, the family
                keeps reacting while the addiction keeps controlling the pace.
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
                The family gets clear, treatment gets lined up, and vague
                boundaries turn into decisions the family can actually hold.
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
                Common Reasons Families in Oregon Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {oregonSituations.map((item) => (
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
                  If your family keeps asking whether it is time to do something
                  serious, it usually is. Families rarely regret acting too
                  soon. They often regret waiting for one more disaster to make
                  the decision for them.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Different
                Family System.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family returns to the same
                fear, confusion, and emergency-based decision making, the
                addiction will try to retake the same space.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one is given a real
                opportunity to accept help, and the family stops protecting the
                addiction from its consequences. That is where real momentum
                starts.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With an Oregon Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose,
            disappearance, arrest, or family collapse to force the decision. Get
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

      <LocationLinks currentLocation="Oregon" locationType="state" />

      <Footer />
    </div>
  );
};

export default Oregon;
