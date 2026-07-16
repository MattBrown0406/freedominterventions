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
import washingtonBanner from "@/assets/washington-crisis-banner.jpg";
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
  "Washington families are often dealing with fentanyl, meth, alcohol, and polysubstance use in both urban overdose zones and rural areas with fewer supports.",
  "Seattle, Tacoma, Spokane, and smaller communities may look different on the surface, but the family pattern is the same: fear, enabling, divided messages, and growing exhaustion.",
  "When the crisis keeps repeating, the family usually does not need more information nearly as much as it needs a structure strong enough to stop reacting and start leading.",
];

const whatMattDoes = [
  {
    title: "Gets the family unified before the intervention",
    description:
      "Most families reach out when everyone is pulling in a different direction. Matt helps the family get aligned so addiction is no longer using division as cover.",
  },
  {
    title: "Builds the treatment plan before the conversation",
    description:
      "Detox, residential care, outpatient options, sober living, transport, and backup plans are handled in advance so the intervention has somewhere concrete to go.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The goal is not a dramatic scene. The goal is to tell the truth clearly, present treatment immediately, and make it obvious the family is serious now.",
  },
  {
    title: "Helps the family hold the line after the intervention",
    description:
      "If your loved one accepts help, the family needs structure. If your loved one refuses help, the family still needs structure. That is how the leverage becomes real.",
  },
];

const washingtonSituations = [
  "A son or daughter moving between fentanyl, meth, pills, alcohol, and repeated crises",
  "A spouse or partner whose addiction is destabilizing the home while still appearing functional to outsiders",
  "A family exhausted by overdose scares, legal trouble, paranoia, and emotional whiplash",
  "A loved one who keeps promising treatment but backs out as soon as the pressure eases",
  "A family in Seattle, Tacoma, Spokane, Vancouver, or a smaller community that cannot agree on the next move",
  "A situation that already feels one bad night away from tragedy",
];

const Washington = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Drug Interventionist in Washington | Family Intervention Help"
        description="Need a drug interventionist in Washington? Matt Brown helps families plan intervention, treatment entry, and boundaries. Call (541) 668-8084."
        canonical="https://freedominterventions.com/washington"
        keywords="drug interventionist Washington, Washington interventionist, Washington addiction intervention, Seattle drug intervention, Spokane intervention services, family intervention Washington, fentanyl intervention Washington"
        geoRegion="US-WA"
        geoPlacename="Washington"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Washington"
        url="https://freedominterventions.com/washington"
        description="Professional addiction intervention services for families across Washington, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Washington" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Washington",
            url: "https://freedominterventions.com/washington",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Washington", href: "/washington" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${washingtonBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            Washington Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Drug Interventionist in Washington for Families Who Need Structure
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown helps Washington families prepare drug, alcohol, and
            fentanyl interventions, coordinate treatment, and stop the cycle of
            chaos, rescuing, and repeated crisis.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/book-intervention-consultation#booking">
                <Calendar className="w-5 h-5 mr-2" />
                Book Confidential Consultation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground"
              asChild
            >
              <a href="tel:+14582988000">
                <Phone className="w-5 h-5 mr-2" />
                Call Matt Now
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
                3,600
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recent overdose deaths in Washington, reflecting a crisis that
                remains severe even when national trends move the other way.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Statewide Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From dense urban corridors to rural counties, families are
                dealing with the same deeper problem: addiction has taken over
                the structure of the home.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the enabling pattern is being replaced with clear
                boundaries.
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
                When to Call a Drug Interventionist in Washington
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not call at the beginning. They search for a
                drug interventionist in Washington after overdoses,
                disappearances, treatment failures, money problems, and
                emotional exhaustion have already piled up.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The family may look different from the outside depending on
                where they live, but the inside pattern is familiar. Everyone
                cares. Nobody is steady. The addiction keeps driving the tempo.
                That is why the family needs structure before the next crisis
                decides things for them.
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
                A good intervention does not depend on one emotional moment. It
                depends on preparation, treatment planning, and the family
                finally acting like a team instead of a collection of worried
                individuals.
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
                Common Reasons Families in Washington Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {washingtonSituations.map((item) => (
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
                  If your family keeps asking whether this is finally serious
                  enough to intervene, the safer assumption is that it is.
                  Families usually wait longer than they should, not shorter.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get a Yes. The Goal Is to Stop Feeding
                the Addiction.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A treatment yes matters. But if the family goes back to
                rescuing, mixed messages, and fear-based decisions, the
                addiction gets invited right back into the same system.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a different family structure, one that
                tells the truth, holds the line, and no longer keeps addiction
                protected from consequences.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Washington Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose,
            arrest, disappearance, or family collapse to make the decision for
            you. Get a clear assessment and a real plan now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/book-intervention-consultation#booking">
                <Calendar className="w-5 h-5 mr-2" />
                Book Confidential Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="tel:+14582988000">
                <Phone className="w-5 h-5 mr-2" />
                Call Matt Now
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

      <LocationLinks currentLocation="Washington" locationType="state" />

      <Footer />
    </div>
  );
};

export default Washington;
