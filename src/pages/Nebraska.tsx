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
  "Meth can keep families trapped in a grinding long-term crisis, while fentanyl has made relapse and experimentation far more dangerous.",
  "Alcohol problems often stay normalized until the damage to the marriage, family, or finances is impossible to ignore.",
  "Nebraska families often need help turning vague concern into a concrete treatment plan they can act on immediately.",
];

const whatMattDoes = [
  {
    title: "Gets the family on the same page",
    description:
      "Matt helps family members stop working against each other and start functioning with one clear message.",
  },
  {
    title: "Builds the treatment plan before the intervention",
    description:
      "Detox, residential care, transport, and contingency options are addressed before the conversation begins.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The purpose is clarity, not drama. Your loved one is confronted with reality and offered a real path into help.",
  },
  {
    title: "Helps the family hold the structure afterward",
    description:
      "Whether your loved one accepts treatment or resists it, the family needs a plan that does not collapse after the first hard moment.",
  },
];

const nebraskaSituations = [
  "A son or daughter cycling through pills, fentanyl, meth, or alcohol-driven chaos",
  "A spouse whose substance use is quietly destabilizing the home",
  "Parents exhausted by covering for a loved one and not knowing where the line should be",
  "A family in Omaha, Lincoln, Grand Island, or a smaller community trying to decide whether local treatment is enough",
  "A loved one who keeps promising treatment but never follows through",
  "A situation where the family already knows it cannot keep living like this",
];

const Nebraska = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Nebraska | Freedom Interventions"
        description="Nebraska families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Nebraska prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/nebraska"
        keywords="Nebraska addiction intervention, Nebraska interventionist, Omaha drug intervention, Lincoln family intervention, Nebraska alcohol intervention"
        geoRegion="US-NE"
        geoPlacename="Nebraska"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Nebraska"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/nebraska"
        description="Professional addiction intervention services for families across Nebraska, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Nebraska" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Nebraska",
            url: "https://freedominterventions.com/nebraska",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Nebraska", href: "/nebraska" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Nebraska Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Family Has Been Hoping It Will Settle Down on Its Own, It
              Usually Won’t
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Nebraska to prepare the
              intervention, coordinate treatment, and stop the cycle of denial,
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
                <a href="tel:+15418386009">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (541) 838-6009
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
                Statewide Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nebraska families are dealing with meth, fentanyl, alcohol, and
                prescription drug misuse in both metro areas and smaller
                communities.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Limited Margin
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Some families have access to local resources, but many still
                need help choosing the right level of care before the next
                crisis raises the stakes.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, the
                treatment plan is ready, and the addiction is no longer being
                buffered by confusion.
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
                Nebraska Families Usually Reach Out After They Have Already
                Tried to Keep the Situation Quiet and Contained
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time most families call, they have already spent a long
                time trying to manage the fallout privately. They have covered
                rent, replaced lost money, believed apologies, and hoped the
                latest scare would finally change the pattern.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Instead, the family becomes exhausted and divided. One person
                wants consequences. Another keeps softening them. Another is too
                afraid to challenge the person using. That is where addiction
                keeps finding room to operate.
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
                A good intervention is not about saying the perfect thing. It is
                about getting the family unified, building the treatment path in
                advance, and confronting addiction with something stronger than
                emotion.
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
                Common Reasons Families in Nebraska Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {nebraskaSituations.map((item) => (
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
                  If your family is debating whether now is the right time, it
                  often means you already know waiting is not helping.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get a Loved One Into Treatment. The Goal
                Is to End the Pattern That Keeps the Addiction Protected.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters, but long-term change also requires the
                family to stop cushioning the addiction from consequences.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family system that becomes honest,
                consistent, and no longer ruled by the next crisis.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Nebraska Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or collapse at home to force the
            issue. Get clarity now, while your family still has room to act
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

      <LocationLinks currentLocation="Nebraska" locationType="state" />

      <Footer />
    </div>
  );
};

export default Nebraska;
