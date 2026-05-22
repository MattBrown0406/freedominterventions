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
  "Virginia families often call after months or years of trying to manage the crisis privately, hoping one more treatment attempt, one more promise, or one more scare will finally change things.",
  "Fentanyl has changed the urgency. Families in Northern Virginia, Richmond, Hampton Roads, and Southwest Virginia are all dealing with a much smaller margin for error than they used to.",
  "The problem is not that the family has not cared enough. The problem is that addiction keeps thriving when the family is divided, exhausted, and forced into constant reaction mode.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Matt helps the family stop sending mixed messages. Everyone gets clear on what they will say, what they will support, and what needs to change.",
  },
  {
    title: "Builds the treatment plan ahead of time",
    description:
      "Detox, residential treatment, outpatient options, transport, and fallback plans are arranged in advance so the intervention does not stall out in confusion.",
  },
  {
    title: "Facilitates a direct, compassionate intervention",
    description:
      "The goal is not spectacle. The goal is to break through denial, bring clarity into the room, and offer immediate next steps toward treatment.",
  },
  {
    title: "Helps the family maintain structure afterward",
    description:
      "Families need support after the intervention too, whether their loved one says yes right away or not. That structure protects the progress being made.",
  },
];

const virginiaSituations = [
  "A loved one cycling through fentanyl scares, alcohol problems, treatment attempts, and relapse",
  "A spouse or partner whose addiction is destabilizing the family and home",
  "Parents or relatives overwhelmed by manipulation, secrecy, and repeated emergencies",
  "A family split between rescuing, confronting, minimizing, and panicking",
  "A loved one who keeps saying they are ready for help but never follows through when it is time to act",
  "A situation that feels one more crisis away from irreversible consequences",
];

const Virginia = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Virginia Addiction Intervention Services | Freedom Interventions"
        description="Virginia families dealing with addiction need a clear plan, not more panic. Matt Brown helps families across Virginia prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/virginia"
        keywords="Virginia intervention, addiction help VA, interventionist Richmond, drug intervention Virginia Beach, Virginia family intervention"
        geoRegion="US-VA"
        geoPlacename="Virginia"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Virginia"
        url="https://freedominterventions.com/virginia"
        description="Professional addiction intervention services for families across Virginia, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Virginia" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Virginia",
            url: "https://freedominterventions.com/virginia",
          },
        ]}
      />

      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Virginia", href: "/virginia" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Virginia Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Has the Family Stuck in Fear and Reaction, It Is
              Time for a Real Plan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Matt Brown works with families across Virginia to prepare the
              intervention, line up treatment, and replace confusion with a
              clear, structured next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/#contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+15416688084">
                  <Phone className="mr-2 h-5 w-5" />
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
                Real Urgency
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Virginia, fentanyl and polysubstance use have made the old
                habit of waiting for a wake-up call far riskier than many
                families realize.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Across the Commonwealth
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From Northern Virginia to Richmond, Hampton Roads, and the Blue
                Ridge region, the family pattern is familiar even when the local
                details differ.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                has been lined up, and everybody understands how to stop
                protecting the addiction.
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
                Virginia Families Usually Reach Out After Exhaustion Has Already
                Set In
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family calls, they have usually been carrying this
                for a long time. They have had hard conversations, covered
                consequences, searched for treatment, chased missing money,
                feared overdose, and argued about whether they are helping or
                making it worse.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That confusion is common. Addiction pushes families into divided
                roles, and once that happens, the addiction often keeps leading
                while the family keeps reacting.
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
                What a Professional Intervention Actually Changes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A professional intervention is not about saying harsher things.
                It is about creating enough structure that the family can stop
                improvising and the next step into treatment is ready.
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
                Common Reasons Families in Virginia Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {virginiaSituations.map((item) => (
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
                  If your family is already wondering how bad it has to get
                  before something changes, it is usually already bad enough.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Only to Get a Yes. It Is to Change the Pattern.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters, but if the family goes back to panic,
                secrecy, and mixed boundaries, the old cycle will try to pull
                everything back into place.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes more consistent,
                honest, and grounded. Your loved one gets a real opportunity to
                accept help, and the addiction stops being buffered from the
                consequences it depends on.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Virginia Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, it makes sense to get clarity before
            the next overdose scare, arrest, or family collapse makes the
            decision for you. Get a clear assessment and a real plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+15416688084">
                <Phone className="mr-2 h-5 w-5" />
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
                Learn how our family intervention services work, and what to
                expect.
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

      <LocationLinks currentLocation="Virginia" locationType="state" />
      <Footer />
    </div>
  );
};

export default Virginia;
