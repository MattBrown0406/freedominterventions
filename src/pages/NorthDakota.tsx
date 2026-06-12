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
  "Small communities can make families more worried about judgment, which often leads to more secrecy and slower action.",
  "North Dakota’s geography means treatment planning may need to include travel, transport, or out-of-state options from the start.",
  "The family often needs just as much help getting organized as the loved one needs getting confronted.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned first",
    description:
      "Matt helps family members stop operating as separate worried individuals and start acting with one clear message.",
  },
  {
    title: "Builds a treatment plan that fits the geography",
    description:
      "Local options, travel realities, transport, and backup plans are handled before the intervention takes place.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is to break through denial, present treatment clearly, and show that the family is no longer going to keep protecting the addiction.",
  },
  {
    title: "Helps the family hold structure afterward",
    description:
      "Whether your loved one accepts treatment or not, the family still needs a stable, consistent plan.",
  },
];

const northDakotaSituations = [
  "A son or daughter spiraling through meth use, fentanyl exposure, or repeated treatment attempts",
  "A spouse whose drinking or drug use is destabilizing the home and isolating the family",
  "A family in Fargo, Bismarck, Grand Forks, Minot, or a smaller community unsure whether local options are enough",
  "A loved one who keeps making promises that vanish once the crisis fades",
  "A family exhausted by fear, secrecy, and the stress of trying to manage everything quietly",
  "A situation that already feels too risky to leave to chance",
];

const NorthDakota = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Professional Interventionist in North Dakota | Drug & Alcohol Help"
        description="Need a professional interventionist in North Dakota? Matt Brown helps families in Fargo, Bismarck, and statewide plan drug, alcohol, meth, and fentanyl interventions. Call (541) 668-8084."
        canonical="https://freedominterventions.com/north-dakota"
        keywords="professional interventionist North Dakota, North Dakota interventionist, North Dakota addiction intervention, Fargo drug intervention, Bismarck family intervention, North Dakota alcohol intervention"
        geoRegion="US-ND"
        geoPlacename="North Dakota"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="North Dakota"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/north-dakota"
        description="Professional addiction intervention services for families across North Dakota, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="North Dakota" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "North Dakota",
            url: "https://freedominterventions.com/north-dakota",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "North Dakota", href: "/north-dakota" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              North Dakota Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Professional Interventionist in North Dakota for Drug and Alcohol Addiction
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across North Dakota to prepare the
              intervention, coordinate treatment, and stop the cycle of delay,
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
                <a href="tel:+15416688084">
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
                Rural Reality
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                North Dakota families often face long distances, fewer local
                treatment options, and the feeling that help is farther away
                than it should be.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Meth and Fentanyl
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Meth remains a major driver of chaos in many communities, and
                fentanyl has increased the danger of relapse and unknown
                substances.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, the
                treatment path is ready, and boundaries are strong enough to
                survive guilt and pushback.
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
                North Dakota Families Usually Call After They Have Been Trying
                to Handle It Quietly for Too Long
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have often already spent
                months or years trying to keep the problem contained. They have
                covered fallout, softened consequences, worried about privacy,
                and hoped the next crisis would be the one that finally changes
                the person using.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Instead, the addiction keeps taking more ground. In close-knit
                communities, that pressure can be even worse because everyone
                feels the stigma and nobody wants to be the first one to say the
                situation is out of control.
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
                A professional intervention brings order to a situation that has
                been ruled by fear and delay. It gets the family clear, gets
                treatment ready, and replaces wishful thinking with a real plan.
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
                Common Reasons Families in North Dakota Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {northDakotaSituations.map((item) => (
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
                  If your family is asking whether this has gotten serious
                  enough, it usually has. Families rarely regret acting too
                  soon.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is to End the
                Family’s Cycle of Delay.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters, but the deeper shift is that the family stops
                waiting for addiction to become more obvious before taking it
                seriously.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family system built on honesty,
                preparation, and boundaries that do not disappear at the first
                sign of resistance.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a North Dakota Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or family collapse to force the
            decision. Get clarity now, while there is still room to act
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

      <LocationLinks currentLocation="North Dakota" locationType="state" />

      <Footer />
    </div>
  );
};

export default NorthDakota;
