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
import arizonaBanner from "@/assets/arizona-crisis-banner.jpg";
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
  "Arizona families are often dealing with fentanyl, meth, alcohol, and prescription misuse at the same time, which means the crisis rarely stays simple for long.",
  "Phoenix-area families may have treatment options nearby, but they still need help choosing the right level of care. Families in smaller or more remote communities often feel isolated and overwhelmed much faster.",
  "Because the problem can look manageable right up until it becomes dangerous, many families call only after the situation has already become more volatile than they wanted to admit.",
];

const whatMattDoes = [
  {
    title: "Gets the family organized before the intervention",
    description:
      "Most failed interventions are not failures of love. They are failures of preparation. Matt helps the family unify its message, define roles, and stop feeding the addiction through confusion or inconsistency.",
  },
  {
    title: "Builds the treatment path before the confrontation",
    description:
      "Detox, residential care, outpatient options, transport, and contingency plans are handled in advance so the conversation has somewhere real to go.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The work is not about theatrics. It is about breaking through denial, telling the truth clearly, and giving your loved one a genuine opening into treatment.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "If the loved one accepts treatment, the family needs structure. If the loved one refuses treatment, the family still needs structure. Either way, the family has to stop living at the mercy of the next crisis.",
  },
];

const arizonaSituations = [
  "A son or daughter drifting between fentanyl use, meth use, and repeated treatment promises that never last",
  "A spouse or partner whose drinking or drug use is destabilizing the home, work, and finances",
  "A family that keeps trying to rescue, reason with, or financially protect someone who keeps spiraling",
  "A loved one whose behavior has become more unpredictable, paranoid, or dangerous",
  "A family in Phoenix, Tucson, Scottsdale, Mesa, or a smaller Arizona community that cannot agree on the next right move",
  "A situation where the family knows it cannot keep doing this another six months",
];

const Arizona = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Arizona | Freedom Interventions"
        description="Arizona families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Arizona prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/arizona"
        keywords="Arizona addiction intervention, Arizona interventionist, Phoenix drug intervention, family intervention Arizona, Tucson intervention services"
        geoRegion="US-AZ"
        geoPlacename="Arizona"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Arizona"
        url="https://freedominterventions.com/arizona"
        description="Professional addiction intervention services for families across Arizona, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Arizona" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Arizona", url: "https://freedominterventions.com/arizona" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Arizona", href: "/arizona" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${arizonaBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            Arizona Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When Addiction Keeps Escalating, the Family Needs a Clear Plan
            Before the Next Crisis Hits
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across Arizona to prepare the
            intervention, coordinate treatment, and stop the cycle of fear,
            rescuing, and repeated relapse.
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
              <a href="tel:+15416688084">
                <Phone className="w-5 h-5 mr-2" />
                Call (541) 668-8084
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
                Fast Escalation
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Arizona families are increasingly dealing with fentanyl and meth
                in combinations that make relapse and crisis far more dangerous
                than they used to be.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Urban and Remote
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Some families feel buried under too many options. Others feel
                stranded by distance and access. Both need the same thing, a
                clear, workable treatment path.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is united, the
                treatment plan is ready, and the old enabling patterns are
                finally getting replaced with structure.
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
                Arizona Families Usually Call After the Situation Has Already
                Been Bad for a While
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Families almost never call at the first warning sign. They call
                after the relapse, the ER visit, the DUI, the disappearing act,
                the financial bleeding, the paranoia, the broken promises, or
                the family split over what should happen next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The deeper problem is not just the substance use. It is that the
                family has usually been forced into reaction mode. Everybody
                cares, but everybody is tired, divided, and trying something
                different. That is exactly the kind of chaos addiction knows how
                to survive.
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
                The family gets clear. Treatment gets lined up. Boundaries stop
                being vague threats and start becoming real decisions.
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
                Common Reasons Families in Arizona Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {arizonaSituations.map((item) => (
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
                  Families rarely regret acting too soon. They often regret
                  waiting for one more disaster to make the decision for them.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment. The Goal Is to End the
                Family&apos;s Chaos Pattern.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters. But if the family keeps operating in fear,
                confusion, and mixed messages, addiction will keep trying to
                re-enter through the same openings it used before.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one is given a real
                path into help, and the family stops protecting the addiction
                from the consequences that might finally force change.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With an Arizona Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, legal crisis, disappearance, or family collapse to decide for
            you. Get clarity now, while the family still has room to act
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

      <LocationLinks currentLocation="Arizona" locationType="state" />

      <Footer />
    </div>
  );
};

export default Arizona;
