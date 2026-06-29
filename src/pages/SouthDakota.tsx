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
  "Meth can create prolonged chaos, unpredictability, and fear inside a family long before anyone finally asks for help.",
  "Fentanyl has made every relapse, every unknown pill, and every mixed-drug situation more dangerous.",
  "Families often need both emotional leadership and practical treatment planning, especially when specialized care may require travel.",
];

const whatMattDoes = [
  {
    title: "Gets the family unified before the intervention",
    description:
      "Matt helps everyone get clear on roles, message, and consequences so the intervention is not undermined by confusion.",
  },
  {
    title: "Builds the treatment plan in advance",
    description:
      "Detox, residential care, transport, and fallback options are worked out before the conversation begins.",
  },
  {
    title: "Leads a calm, direct intervention",
    description:
      "The point is not to overwhelm your loved one. The point is to tell the truth clearly and present real help.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "Whether your loved one accepts help or refuses it, the family still needs structure strong enough to hold.",
  },
];

const southDakotaSituations = [
  "A son or daughter trapped in meth use, fentanyl exposure, or repeated relapse",
  "A spouse or partner whose substance use is destabilizing the home and frightening everyone else",
  "A family exhausted by lies, volatility, and crisis after crisis",
  "A loved one whose behavior has become more erratic, paranoid, or dangerous",
  "A family in Sioux Falls, Rapid City, Aberdeen, or a smaller community that cannot agree on the next step",
  "A situation where one more overdose scare or legal crisis feels likely",
];

const SouthDakota = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Interventionist South Dakota | Drug & Alcohol Intervention Help"
        description="Looking for an interventionist in South Dakota? Matt Brown helps families in Sioux Falls, Rapid City, and statewide plan drug, alcohol, meth, and fentanyl interventions. Call (541) 668-8084."
        canonical="https://freedominterventions.com/south-dakota"
        keywords="professional interventionist South Dakota, South Dakota interventionist, South Dakota addiction intervention, Sioux Falls drug intervention, Rapid City family intervention, South Dakota alcohol intervention, meth intervention South Dakota"
        geoRegion="US-SD"
        geoPlacename="South Dakota"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="South Dakota"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/south-dakota"
        description="Professional addiction intervention services for families across South Dakota, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="South Dakota" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "South Dakota",
            url: "https://freedominterventions.com/south-dakota",
          },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "South Dakota", href: "/south-dakota" },
        ]}
      />

      <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              South Dakota Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Interventionist in South Dakota for Drug and Alcohol Addiction
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Matt Brown works with families across South Dakota to prepare the
              intervention, coordinate treatment, and stop the cycle of fear,
              rescuing, and repeated crisis.
            </p>
            <div className="mt-6 rounded-2xl border border-primary/20 bg-background/80 p-5 text-left shadow-sm max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-2">
                What to do next
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If a South Dakota loved one is refusing treatment, cycling
                through meth, alcohol, fentanyl, or repeated relapse, start with
                a confidential intervention consultation. The first step is a
                clear assessment of risk, family alignment, treatment options,
                and whether intervention is the right move now.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg" asChild>
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="tel:541-668-8084">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Matt Now
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
                Meth Pressure
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                South Dakota families are often dealing with severe meth-driven
                chaos, with fentanyl making the overall risk even more
                dangerous.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Distance and Stigma
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In smaller communities, families often feel isolated by limited
                resources, privacy concerns, and the belief that they should
                handle it alone.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and the addiction is no longer being cushioned by
                mixed messages.
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
                When to Call a Professional Interventionist in South Dakota
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not call at the first sign of trouble. They
                search for a professional interventionist in South Dakota after
                the paranoia, the disappearances, the money loss, the legal
                trouble, the treatment refusals, or the simple exhaustion of
                living with constant crisis.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In South Dakota, the isolation can be emotional as much as
                geographic. Families may feel ashamed, exposed, or unsure who to
                trust. That often keeps the problem going longer than anyone
                intended.
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
                A professional intervention helps the family stop living from
                one crisis to the next. It creates alignment, builds the
                treatment path ahead of time, and changes the structure that has
                been protecting the addiction.
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
                Common Reasons Families in South Dakota Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {southDakotaSituations.map((item) => (
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
                  If your family is still wondering whether intervention is too
                  big a step, the reality is that the situation itself is
                  already telling you something important.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get a Loved One Into Treatment. The Goal
                Is to Stop the Family From Living at Addiction’s Pace.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters, but lasting change also means the family
                stops reorganizing itself around fear, guilt, and
                emergency-based decisions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes clear, consistent,
                and no longer willing to keep addiction buffered from
                consequences.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a South Dakota Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, disappearance, arrest, or collapse at home to decide for you.
            Get a clear assessment and a real plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/book-intervention-consultation#booking">
                <Calendar className="w-5 h-5 mr-2" />
                Book Confidential Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="tel:541-668-8084">
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

      <LocationLinks currentLocation="South Dakota" locationType="state" />

      <Footer />
    </div>
  );
};

export default SouthDakota;
