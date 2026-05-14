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
  "North Carolina families often call after months of trying to manage the problem quietly, hoping one more promise, one more payout, or one more second chance will calm things down.",
  "Fentanyl has made that gamble much more dangerous. Families in Charlotte, Raleigh, Wilmington, Asheville, and smaller towns alike are dealing with a much smaller margin for error.",
  "The family usually is not failing because they do not care. They are failing because addiction is stronger than scattered effort, mixed messages, and crisis-by-crisis decision making.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned first",
    description:
      "Before the intervention, Matt helps the family stop working at cross purposes. Everyone gets clear on the message, the boundaries, and what they are willing to support going forward.",
  },
  {
    title: "Builds the treatment plan before the conversation",
    description:
      "Detox, residential care, outpatient options, transport, and backup plans are addressed in advance so the intervention leads somewhere real.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not a dramatic confrontation. The goal is to break through denial, present reality clearly, and offer an immediate path into help.",
  },
  {
    title: "Helps the family hold the line afterward",
    description:
      "If your loved one accepts treatment, the family needs structure. If they refuse, the family still needs structure. That is how real change starts.",
  },
];

const northCarolinaSituations = [
  "A son or daughter cycling through relapse, treatment attempts, and overdose scares",
  "A spouse or partner whose drinking or drug use is destabilizing the home",
  "A family exhausted by lies, financial rescue, disappearing acts, and emotional whiplash",
  "A loved one who keeps agreeing to help, then backing out as soon as the pressure lifts",
  "A family divided between consequences, fear, denial, and enabling",
  "A situation that already feels too close to the next ER visit, arrest, or funeral",
];

const NorthCarolina = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Professional Interventionist in North Carolina | Drug & Alcohol Help"
        description="Need a professional interventionist in North Carolina? Matt Brown helps families plan drug, alcohol, and fentanyl interventions. Call (541) 838-6009."
        canonical="https://freedominterventions.com/north-carolina"
        keywords="professional interventionist North Carolina, North Carolina interventionist, North Carolina addiction intervention, Charlotte intervention services, Raleigh drug intervention, North Carolina family intervention, NC fentanyl crisis"
        geoRegion="US-NC"
        geoPlacename="North Carolina"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="North Carolina"
        url="https://freedominterventions.com/north-carolina"
        description="Professional addiction intervention services for families across North Carolina, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="North Carolina" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          {
            name: "North Carolina",
            url: "https://freedominterventions.com/north-carolina",
          },
        ]}
      />
      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "North Carolina", href: "/north-carolina" },
        ]}
      />

      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              North Carolina Intervention Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Professional Interventionist in North Carolina for Drug and Alcohol Addiction
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Matt Brown helps families across North Carolina prepare the
              intervention, line up treatment, and stop the cycle of panic,
              rescuing, and relapse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <a href="tel:+15418386009">
                  <Phone className="mr-2 h-5 w-5" />
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
                Rising Risk
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                North Carolina families are dealing with fentanyl, alcohol,
                meth, and prescription drug misuse in a landscape where waiting
                can go very badly very fast.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Statewide Need
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From Charlotte and the Triangle to coastal and mountain
                communities, families face the same pattern: addiction isolates
                the family until someone changes the structure.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and everyone understands the difference between love
                and enabling.
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
                When to Call a Professional Interventionist in North Carolina
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time most families search for a professional
                interventionist in North Carolina, they have already spent a
                long time reacting. They have covered bills, softened
                consequences, cleaned up messes, searched phones, worried at
                night, and argued with each other about what to do next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That does not mean the family has not done enough. It means the
                family has been trying to beat addiction without a unified
                structure. That rarely works for long.
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
                A real intervention is not about putting on pressure for one
                emotional meeting. It is about getting the family clear, getting
                treatment lined up, and replacing chaos with a workable plan.
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
                Common Reasons Families in North Carolina Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {northCarolinaSituations.map((item) => (
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
                  something serious, it usually is.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just to Get a Yes. The Goal Is to Change the
                Family Pattern.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment entry matters, but it is not enough by itself. If the
                family goes back to fear, mixed messages, and emergency-driven
                decisions, the addiction will try to reclaim the same space.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is a family that becomes clear, consistent,
                and honest. Your loved one gets a real opportunity to accept
                help. If they refuse, the family stops protecting the addiction
                from consequences.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a North Carolina Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose
            scare, arrest, disappearance, or family collapse to force the next
            move. Get a clear assessment and a real plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/book-intervention-consultation#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Book Confidential Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <a href="tel:+15418386009">
                <Phone className="mr-2 h-5 w-5" />
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

      <LocationLinks currentLocation="North Carolina" locationType="state" />
      <Footer />
    </div>
  );
};

export default NorthCarolina;
