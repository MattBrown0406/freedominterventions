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
  "West Virginia families often reach out after years of watching addiction tear through not just one person, but the entire family system around them.",
  "In a state with some of the highest overdose risk in the country, waiting for the next wake-up call is especially dangerous. Many families already know the next crisis could be the worst one yet.",
  "The addiction may be rooted in opioids, fentanyl, meth, alcohol, or a combination, but the family pattern is familiar: fear, enabling, grief, divided responses, and exhaustion.",
];

const whatMattDoes = [
  {
    title: "Gets the family organized before the intervention",
    description:
      "Matt helps family members stop reacting separately and start working from one plan, with clear roles, clear boundaries, and a shared message.",
  },
  {
    title: "Prepares treatment options before the meeting",
    description:
      "Detox, residential care, travel, transport, and backup placements are lined up in advance so the intervention has somewhere real to go.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not to overpower your loved one. The goal is to break through denial, make the situation clear, and offer immediate help.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "Whether your loved one accepts treatment or resists it, the family needs support maintaining structure so the old cycle does not simply restart.",
  },
];

const westVirginiaSituations = [
  "A loved one trapped in repeated opioid, fentanyl, meth, or alcohol crises",
  "A family exhausted by overdoses, ER visits, legal problems, and repeated rescue attempts",
  "Parents, grandparents, or siblings carrying more of the consequences than the person using",
  "A household divided between fear, anger, denial, and enabling",
  "A person who says they want help but keeps slipping away from every plan",
  "A situation where the stakes already feel too high to wait on another promise",
];

const WestVirginia = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="West Virginia Addiction Intervention Services | Freedom Interventions"
        description="West Virginia families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across West Virginia prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/west-virginia"
        keywords="West Virginia intervention, addiction help WV, interventionist Charleston, drug intervention West Virginia, family intervention WV"
        geoRegion="US-WV"
        geoPlacename="West Virginia"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="West Virginia"
        url="https://freedominterventions.com/west-virginia"
        description="Professional addiction intervention services for families across West Virginia, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="West Virginia" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "West Virginia",
            url: "https://freedominterventions.com/west-virginia",
          },
        ]}
      />

      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "West Virginia", href: "/west-virginia" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              West Virginia Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When Addiction Has Worn the Family Down, You Need a Plan That Can
              Hold Under Pressure
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Matt Brown works with families across West Virginia to prepare the
              intervention, line up treatment, and interrupt the cycle of fear,
              rescue, and relapse.
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
                Extreme Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In West Virginia, waiting is especially dangerous. Families are
                often calling because they know the next crisis could be the one
                they do not get back from.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Rural and Urban Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From Charleston and Huntington to smaller mountain communities,
                the logistics may differ, but the family burden looks painfully
                familiar.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Stronger Structure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is prearranged, and the conversation is backed by real follow-
                through.
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
                West Virginia Families Usually Call After Carrying Too Much for
                Too Long
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have usually already done
                everything they know how to do. They have covered bills,
                softened consequences, responded to emergency calls, searched
                for treatment, and tried to keep the whole family from breaking
                apart.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That effort is real, but addiction is relentless when the family
                is forced into survival mode. Without structure, everyone keeps
                reacting and the addiction keeps setting the terms.
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
                A real intervention is not a dramatic speech. It is a structured
                process that helps the family stop improvising and puts a real
                treatment path on the table.
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
                Common Reasons Families in West Virginia Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {westVirginiaSituations.map((item) => (
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
                  If your family feels like it cannot keep living like this,
                  that is not an overreaction. It is important information.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Immediate Compliance. It Is a Different
                Family System.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters, but lasting change also requires the
                family to stop participating in the same pattern the addiction
                depends on.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes steadier, more
                honest, and more consistent. Your loved one gets a real chance
                at help, and the addiction loses some of the protection it has
                been getting from the people around it.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a West Virginia Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, or family collapse to decide for you. Get a
            clear assessment and a plan that can hold.
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

      <LocationLinks currentLocation="West Virginia" locationType="state" />
      <Footer />
    </div>
  );
};

export default WestVirginia;
