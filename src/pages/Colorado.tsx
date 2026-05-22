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
  "Colorado families are often dealing with fentanyl, meth, alcohol, cocaine, and prescription misuse in combinations that make relapse and crisis more dangerous than they used to be.",
  "The state has strong treatment visibility in places like Denver and Boulder, but visibility is not the same as clarity. Families still need help finding the right level of care and moving fast.",
  "Mountain communities, resort economies, and front-range cities can look very different, but the family pattern is the same: secrecy, panic, rescuing, and exhaustion.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Most families call when everyone is scared but nobody agrees on the next move. Matt helps the family stop improvising and start acting together.",
  },
  {
    title: "Builds the treatment plan before the conversation",
    description:
      "Detox, residential care, outpatient options, sober living, transport, and backup plans are worked out in advance so the intervention does not collapse into indecision.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not shame or theatrics. The goal is to break through denial, present treatment, and make it obvious the family is no longer willing to keep the addiction comfortable.",
  },
  {
    title: "Helps the family hold the structure after the intervention",
    description:
      "Whether your loved one says yes or no, the family still needs a plan it can actually maintain. That is what gives the intervention real weight.",
  },
];

const coloradoSituations = [
  "A son or daughter moving between fentanyl, pills, meth, cocaine, or heavy drinking with repeated close calls",
  "A spouse or partner whose addiction is destabilizing the home while still looking functional from the outside",
  "A family in Denver, Colorado Springs, Boulder, Fort Collins, the mountains, or the Western Slope that cannot agree on what happens next",
  "A loved one who keeps promising treatment but backs out once the immediate pressure fades",
  "A family exhausted by financial rescue, lying, relapse, and emotional whiplash",
  "A situation where one more overdose scare, accident, arrest, or psychiatric break feels like too much risk",
];

const Colorado = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Colorado | Freedom Interventions"
        description="Colorado families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Colorado prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/colorado"
        keywords="Colorado addiction intervention, Colorado interventionist, Denver drug intervention, Colorado Springs intervention services, family intervention Colorado"
        geoRegion="US-CO"
        geoPlacename="Colorado"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Colorado"
        url="https://freedominterventions.com/colorado"
        description="Professional addiction intervention services for families across Colorado, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Colorado" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Colorado",
            url: "https://freedominterventions.com/colorado",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Colorado", href: "/colorado" },
        ]}
      />

      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Colorado Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Keeps the Family Off Balance, Structure Has to Take
              Over
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Matt Brown works with families across Colorado to prepare the
              intervention, coordinate treatment, and stop the cycle of secrecy,
              rescuing, and repeated crisis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/#contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
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
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-destructive mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                2,000+
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Annual overdose deaths in Colorado, reflecting the growing
                danger of fentanyl and mixed-substance use.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Many Settings
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From front-range cities to mountain towns, the logistics may
                change, but families still need a clear and workable treatment
                path.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the old enabling pattern is being replaced with
                clear boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-14">
            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Colorado Families Usually Call After the Problem Has Already
                Outgrown Private Management
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already
                tried reason, patience, money, ultimatums, softened ultimatums,
                and one more round of hoping this time will be different.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The problem is not that the family has not cared enough. The
                problem is that addiction is stronger than scattered effort.
                Without structure, the family keeps reacting and the addiction
                keeps adapting.
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
                A real intervention is not a dramatic family meeting. It is a
                process that gets the family organized, gets treatment lined up,
                and changes the leverage around the addiction.
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
                Common Reasons Families in Colorado Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {coloradoSituations.map((item) => (
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
                  If your family is already asking whether this has become too
                  dangerous to keep managing alone, that question usually
                  answers itself. It is time to get a real plan in place.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Family That
                Stops Making Addiction Easier.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A yes to treatment matters. But if the family goes back to the
                same mixed messages and fear-based decisions, the addiction will
                try to take the same ground back.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family system that tells the truth,
                holds the line, and no longer organizes itself around the next
                crisis.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Colorado Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose,
            accident, arrest, or family collapse to make the decision for you.
            Get clarity now, while the family still has room to act
            deliberately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
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

      <LocationLinks currentLocation="Colorado" locationType="state" />

      <Footer />
    </div>
  );
};

export default Colorado;
