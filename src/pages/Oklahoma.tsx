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
  "Meth can keep households in a constant state of volatility, paranoia, and emotional exhaustion.",
  "Fentanyl has made experimentation, relapse, and counterfeit pills far more dangerous than many families realize.",
  "Oklahoma families often need help turning fear and shame into a concrete intervention and treatment plan.",
];

const whatMattDoes = [
  {
    title: "Gets the family clear before the intervention",
    description:
      "Matt helps the family define roles, unify the message, and stop sending mixed signals addiction can keep exploiting.",
  },
  {
    title: "Builds the treatment path in advance",
    description:
      "Detox, residential care, transport, and backup options are handled before the pressure moment arrives.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The work is not about drama. It is about telling the truth clearly and offering a real path into treatment.",
  },
  {
    title: "Helps the family hold the line afterward",
    description:
      "If your loved one says yes or no, the family still needs structure. That is where real change starts to stick.",
  },
];

const oklahomaSituations = [
  "A son or daughter drifting between meth, fentanyl, pills, or repeated treatment promises",
  "A spouse or partner whose substance use is destabilizing the home while everyone else tries to keep it together",
  "A family exhausted by manipulation, financial fallout, and emotional whiplash",
  "A loved one whose behavior is becoming more erratic, risky, or frightening",
  "A family divided between faith, fear, guilt, and anger about what to do next",
  "A situation that feels one more crisis away from real tragedy",
];

const Oklahoma = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Oklahoma | Freedom Interventions"
        description="Oklahoma families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Oklahoma prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/oklahoma"
        keywords="Oklahoma addiction intervention, Oklahoma interventionist, Oklahoma City drug intervention, Tulsa family intervention, Oklahoma alcohol intervention"
        geoRegion="US-OK"
        geoPlacename="Oklahoma"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Oklahoma"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/oklahoma"
        description="Professional addiction intervention services for families across Oklahoma, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Oklahoma" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "Oklahoma",
            url: "https://freedominterventions.com/oklahoma",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Oklahoma", href: "/oklahoma" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Oklahoma Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              When the Family Has Been Carrying the Fear Alone, It Is Time to
              Change the Structure
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across Oklahoma to prepare the
              intervention, coordinate treatment, and stop the cycle of secrecy,
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
                Dual Threat
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Oklahoma families are often dealing with both meth and fentanyl,
                along with alcohol and prescription drug misuse.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Culture of Delay
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Strong family loyalty and shame around addiction often keep
                Oklahoma families waiting longer than they should.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and boundaries are built to hold after the
                conversation ends.
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
                Oklahoma Families Usually Call After the Situation Has Been
                Dangerous for Longer Than Anyone Wants to Admit
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Families rarely reach out at the first warning sign. They call
                after the relapse, the overdose scare, the money disappearing,
                the psychiatric break, the arrest, or the moment they realize
                the whole household is reorganizing itself around one person’s
                addiction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Oklahoma, a strong culture of privacy and loyalty can make it
                even harder to bring in outside help. Families keep trying to
                love the person into changing, while the addiction keeps using
                that love to buy more time.
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
                The family stops improvising, treatment gets lined up, and the
                loved one is confronted with a clear choice between help and
                continued consequences.
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
                Common Reasons Families in Oklahoma Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {oklahomaSituations.map((item) => (
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
                  enough, it probably is. Much more often than not, families
                  wait too long.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get Through the Intervention Day. The
                Goal Is to Stop Letting Addiction Run the Family.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters, but lasting change also requires the
                family to stop functioning around addiction’s rules.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that tells the truth, holds its
                boundaries, and no longer makes the addiction easier to
                continue.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With an Oklahoma Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or family collapse to make the
            decision for you. Get a clear assessment and a real plan.
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

      <LocationLinks currentLocation="Oklahoma" locationType="state" />

      <Footer />
    </div>
  );
};

export default Oklahoma;
