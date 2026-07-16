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
  "Fentanyl has made the risk more immediate, especially for families dealing with counterfeit pills or mixed drug use.",
  "Meth and alcohol can create long periods of chaos that feel normal only because the family has been living inside them so long.",
  "Missouri families often need help separating real treatment options from rushed or poorly matched placements.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the conversation",
    description:
      "Matt helps the family stop sending mixed messages and start functioning like a team.",
  },
  {
    title: "Builds the treatment plan in advance",
    description:
      "Detox, residential care, transport, and contingency options are handled before the intervention takes place.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The goal is to break through denial, present treatment clearly, and show that the family is no longer going to keep the addiction comfortable.",
  },
  {
    title: "Helps the family hold structure afterward",
    description:
      "The work is not over when the intervention ends. The family still needs clarity and consistency.",
  },
];

const missouriSituations = [
  "A son or daughter cycling through fentanyl scares, meth use, or repeated disappearances",
  "A spouse or partner whose drinking, pills, or cocaine use is destabilizing the home",
  "A family exhausted by paying bills, smoothing over crises, and hoping this time is different",
  "A loved one who sounds sincere about getting help but never follows through when pressure fades",
  "A family divided over whether to set consequences or keep rescuing",
  "A situation that feels one arrest, overdose, or psychiatric crisis away from disaster",
];

const Missouri = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Missouri | Freedom Interventions"
        description="Missouri families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Missouri prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/missouri"
        keywords="Missouri addiction intervention, Missouri interventionist, St. Louis drug intervention, Kansas City family intervention, Missouri alcohol intervention"
        geoRegion="US-MO"
        geoPlacename="Missouri"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Missouri"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/missouri"
        description="Professional addiction intervention services for families across Missouri, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Missouri" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Missouri",
            url: "https://freedominterventions.com/missouri",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Missouri", href: "/missouri" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Missouri Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Family Keeps Adapting to Chaos, the Addiction Keeps
              Winning
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Missouri to prepare the
              intervention, coordinate treatment, and stop the cycle of crisis,
              rescuing, and repeated relapse.
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
                Escalating Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Missouri families are dealing with fentanyl, meth, alcohol, and
                polysubstance use in both major metros and smaller communities.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Corridor Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From St. Louis and Kansas City to rural Missouri, families often
                feel trapped between danger, confusion, and inconsistent
                treatment access.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and boundaries are strong enough to last after the
                first hard conversation.
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
                Missouri Families Usually Call After the Lies, Crises, and
                Failed Attempts Have Started to Blur Together
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have often already been
                through treatment attempts that did not hold, emergency calls,
                financial strain, and long stretches of hoping the person using
                will finally decide to change.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Meanwhile, the family keeps reorganizing itself around the
                addiction. One person pays, another threatens, another
                minimizes, and another burns out quietly. Without structure, the
                addiction keeps staying one step ahead of everyone.
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
                A professional intervention gives the family a way to stop
                reacting and start leading. Treatment gets lined up, the message
                gets unified, and the loved one is confronted with reality
                instead of more emotional drift.
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
                Common Reasons Families in Missouri Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {missouriSituations.map((item) => (
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
                  If your family is waiting for a sign that this has become
                  serious enough, the pattern itself is usually the sign.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get Help Started. The Goal Is to Change
                What the Addiction Has Been Allowed to Control.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family falls right back into
                fear, bargaining, and inconsistency, the addiction will try to
                reclaim the same leverage.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes clear, honest, and
                no longer willing to carry the addiction for the person using.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Missouri Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or family collapse to make the
            decision for you. Get clarity now, while your family still has room
            to act deliberately.
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

      <LocationLinks currentLocation="Missouri" locationType="state" />

      <Footer />
    </div>
  );
};

export default Missouri;
