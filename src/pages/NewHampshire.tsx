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
  "New Hampshire families are often dealing with fentanyl, alcohol, cocaine, and prescription drug misuse in a state small enough that people try to hide the crisis until it has already become dangerous.",
  "Manchester, Nashua, the Seacoast, and rural communities all face the same family problem: everyone is exhausted, nobody agrees on the next move, and addiction keeps using that confusion to stay in control.",
  "By the time most families call, they have already tried pleading, rescuing, paying for treatment, making threats, and then backing off when fear or guilt takes over.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the conversation",
    description:
      "A divided family gives addiction room to keep winning. Matt helps everyone get clear on the message, the boundaries, and the role each person will actually hold.",
  },
  {
    title: "Builds the treatment plan before the pressure moment",
    description:
      "Detox, residential treatment, outpatient care, transport, and fallback plans are worked through in advance so the intervention leads somewhere real.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The point is not drama. It is clarity. Your loved one hears the truth, sees the family is unified, and is offered a real path into help.",
  },
  {
    title: "Helps the family hold the line afterward",
    description:
      "If your loved one accepts treatment, the family needs structure. If your loved one refuses, the family still needs structure. That part matters just as much.",
  },
];

const newHampshireSituations = [
  "A son or daughter caught in fentanyl scares, disappearances, or repeated relapses",
  "A spouse or partner whose drinking or drug use is destabilizing the home",
  "Parents who keep getting pulled into financial rescue, crisis management, and broken promises",
  "A family that cannot agree on whether to be tougher, more patient, or more protective",
  "A loved one who says they want help, but never follows through once the pressure fades",
  "A situation that feels one bad weekend away from tragedy",
];

const NewHampshire = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in New Hampshire | Freedom Interventions"
        description="New Hampshire families dealing with addiction need a clear plan, not more fear and guesswork. Matt Brown helps families across New Hampshire prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/new-hampshire"
        keywords="New Hampshire addiction intervention, New Hampshire interventionist, Manchester drug intervention, Nashua intervention services, family intervention New Hampshire"
        geoRegion="US-NH"
        geoPlacename="New Hampshire"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="New Hampshire"
        url="https://freedominterventions.com/new-hampshire"
        description="Professional addiction intervention services for families across New Hampshire, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="New Hampshire" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "New Hampshire",
            url: "https://freedominterventions.com/new-hampshire",
          },
        ]}
      />

      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "New Hampshire", href: "/new-hampshire" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              New Hampshire Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Has the Whole Family Living in Fear, It Is Time for
              Structure
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across New Hampshire to prepare the
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
                High Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In New Hampshire, fentanyl has made the cost of waiting much
                higher. Families who once thought there was still time often
                realize too late how fast things can turn.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Small State, Same Chaos
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From the Seacoast to smaller rural towns, the pattern is the
                same: the family keeps adapting to crisis while addiction keeps
                setting the pace.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, the
                treatment plan is ready, and the old enabling patterns are no
                longer driving decisions.
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
                New Hampshire Families Usually Call After They Have Been
                Carrying This Alone for Too Long
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not call at the first sign of addiction. They
                call after the lies, the financial help, the treatment promises,
                the relapse scares, the disappearances, or the emergency room
                visits have already worn everyone down.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The deeper problem is not just substance use. It is that the
                family has usually been forced into reaction mode. One person is
                pleading, one is threatening, one is covering bills, and one is
                trying not to make things worse. That confusion is exactly where
                addiction keeps surviving.
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
                A real intervention is not a dramatic confrontation. It is a
                structured process that helps the family stop improvising,
                presents treatment clearly, and changes the system around the
                addiction.
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
                Common Reasons Families in New Hampshire Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {newHampshireSituations.map((item) => (
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
                  If your family keeps asking whether it is finally time to do
                  something serious, it usually is. Families rarely call too
                  early. Much more often, they call after waiting has already
                  made the situation worse.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just a Treatment Yes. The Goal Is a Different
                Family Structure.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters. But if the family goes right back to
                fear, mixed messages, and rescue mode, addiction will try to
                reclaim the same ground it had before.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one gets a real chance
                to accept help, and the family stops protecting the addiction
                from its consequences. That is where leverage starts to shift.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a New Hampshire Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or family collapse to force the
            decision. Get a clear assessment and a real plan.
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

      <LocationLinks currentLocation="New Hampshire" locationType="state" />

      <Footer />
    </div>
  );
};

export default NewHampshire;
