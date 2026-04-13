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
import texasBanner from "@/assets/texas-crisis-banner.jpg";
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
  "Texas families often wait too long because the culture rewards privacy, toughness, and figuring it out yourself. By the time they call, the situation has usually already become dangerous.",
  "The state is huge, which means treatment access can get messy fast. Urban families can feel overwhelmed by too many options, while rural families may feel like there are no workable options at all.",
  "Fentanyl, meth, alcohol, and prescription misuse all show up differently, but the family pattern is the same: fear, mixed messages, financial chaos, and a growing sense that nothing is changing.",
];

const whatMattDoes = [
  {
    title: "Gets the family out of reaction mode",
    description:
      "Before the intervention itself, Matt helps the family stop arguing, stop improvising, and stop sending mixed messages that addiction can keep exploiting.",
  },
  {
    title: "Builds a treatment plan that fits the real situation",
    description:
      "That may mean local care, out-of-state placement, transport coordination, or a more structured setting than the family first assumed. The plan gets built before the pressure moment arrives.",
  },
  {
    title: "Leads the intervention with clarity and backbone",
    description:
      "The point is not to overwhelm your loved one. The point is to tell the truth clearly, present treatment, and make it obvious the family is no longer going to keep the addiction comfortable.",
  },
  {
    title: "Helps the family hold the structure after the intervention",
    description:
      "Whether your loved one accepts help or refuses it, the family needs a plan it can actually maintain. That is where real change starts to stick.",
  },
];

const texasSituations = [
  "A son or daughter moving between pills, fentanyl, meth, and disappearing for stretches of time",
  "A spouse or partner whose drinking or cocaine use is destroying the home while still looking functional to the outside world",
  "A family in Houston, Dallas, Austin, San Antonio, or a smaller town that cannot agree on whether to get tougher, stay patient, or do nothing",
  "A rural family dealing with long distances, limited treatment access, and a loved one who refuses to leave familiar surroundings",
  "A family that keeps paying, rescuing, smoothing things over, and then wondering why every crisis keeps repeating",
  "A situation where one more overdose scare, arrest, or psychiatric break feels like it could end very badly",
];

const Texas = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Texas | Freedom Interventions"
        description="Texas families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Texas prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/texas"
        keywords="Texas addiction intervention, Texas interventionist, Dallas drug intervention, Houston intervention services, family intervention Texas"
        geoRegion="US-TX"
        geoPlacename="Texas"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Texas"
        url="https://freedominterventions.com/texas"
        description="Professional addiction intervention services for families across Texas, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Texas" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Texas", url: "https://freedominterventions.com/texas" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Texas", href: "/texas" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${texasBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            Texas Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When the Family Has Been Carrying the Addiction for Too Long, It Is
            Time to Change the Structure
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across Texas to prepare the
            intervention, coordinate treatment, and stop the cycle of chaos,
            secrecy, and repeated crisis.
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
                High Stakes
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In Texas, families are dealing with fentanyl, meth, alcohol, and
                polysubstance use in a state where distance, access, and timing
                can all make a hard situation harder.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Big Geography
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Families may be choosing between local treatment, long travel,
                out-of-state placement, or immediate transport from a crisis
                situation. That needs planning, not guesswork.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the boundaries are strong enough to survive the
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
                Texas Families Usually Reach Out After the Situation Has Already
                Gone Too Far
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not call at the first sign of trouble. They
                call after the overdoses, the disappearances, the rehab
                failures, the financial bleeding, the lies, the police
                involvement, or the emotional exhaustion have already stacked
                up.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Texas, the instinct to stay private and handle it internally
                often keeps families stuck longer than they should be. By the
                time they finally ask for help, the addiction has usually
                trained everyone around it to adapt to chaos.
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
                A good intervention does not depend on emotion, luck, or a
                single perfect speech. It depends on structure, preparation, and
                the family finally acting like a team instead of a collection of
                worried individuals pulling in different directions.
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
                Common Reasons Families in Texas Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {texasSituations.map((item) => (
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
                  enough, it probably is. The more chaotic the pattern feels,
                  the less wise it is to keep waiting for the person using to
                  create the solution on their own.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get a Yes. The Goal Is to Stop Feeding
                the Problem.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A treatment yes matters. But if the family goes back to the same
                rescuing, fear-driven decisions, and inconsistent boundaries
                afterward, the addiction gets invited right back into the
                system.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a different family structure, one that
                tells the truth, holds the line, and no longer makes addiction
                easier to continue. That is where real leverage comes from.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Texas Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or collapse at home to force the
            decision. Get clarity now, while the family still has room to act
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

      <LocationLinks currentLocation="Texas" locationType="state" />

      <Footer />
    </div>
  );
};

export default Texas;
