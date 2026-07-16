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
import nevadaBanner from "@/assets/nevada-crisis-banner.jpg";
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
  "Nevada families are often dealing with fentanyl, meth, alcohol, cocaine, and gambling-adjacent lifestyle instability in ways that can make addiction harder to confront early.",
  "Las Vegas and Reno can make serious substance problems look normal from the outside for far too long, especially when nightlife, service work, and fast money blur the warning signs.",
  "Tourism, transience, and geographic spread add complexity, but the family pattern is familiar: repeated crises, financial rescue, divided messages, and growing exhaustion.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Most families call when everyone is scared but nobody agrees on the next move. Matt helps the family stop reacting separately and start acting together.",
  },
  {
    title: "Builds the treatment plan before the pressure moment",
    description:
      "Detox, residential treatment, outpatient options, transport, sober living, and backup plans are worked through in advance so the intervention leads somewhere concrete.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The point is not drama. The point is clarity, treatment entry, and making it obvious the family is no longer going to keep addiction protected from consequences.",
  },
  {
    title: "Helps the family hold the line afterward",
    description:
      "Whether your loved one accepts help or refuses it, the family still needs a structure it can maintain. That is where change starts to stick.",
  },
];

const nevadaSituations = [
  "A loved one whose fentanyl, meth, alcohol, cocaine, or polysubstance use is escalating fast",
  "A spouse or partner whose addiction is destabilizing the home while still being hidden behind work, nightlife, or a functional image",
  "A family exhausted by overdoses, hospital visits, money leaks, lies, and repeated emergencies",
  "A loved one who keeps saying they will get help, then disappears or backs out once the pressure eases",
  "A family in Las Vegas, Henderson, Reno, or a smaller Nevada community that cannot agree on the next right move",
  "A situation where one more overdose, arrest, crash, or psychiatric crisis feels like it could end badly",
];

const Nevada = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Nevada | Freedom Interventions"
        description="Nevada families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Nevada prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/nevada"
        keywords="Nevada addiction intervention, Nevada interventionist, Las Vegas drug intervention, Reno intervention services, family intervention Nevada"
        geoRegion="US-NV"
        geoPlacename="Nevada"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Nevada"
        url="https://freedominterventions.com/nevada"
        description="Professional addiction intervention services for families across Nevada, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Nevada" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          {
            name: "Service Areas",
            url: "https://freedominterventions.com/service-areas",
          },
          { name: "Nevada", url: "https://freedominterventions.com/nevada" },
        ]}
      />

      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Nevada", href: "/nevada" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${nevadaBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            Nevada Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When Addiction Thrives in Secrecy and Chaos, Families Need Structure
            Fast
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across Nevada to prepare the
            intervention, coordinate treatment, and stop the cycle of crisis,
            rescue, and repeated relapse.
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
              <a href="tel:+14582988000">
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
                1,352
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nevada overdose deaths in 2023, with fentanyl and stimulants
                continuing to keep the stakes high.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                High-Risk Environments
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nightlife, tourism, and fast-moving city culture can hide how
                bad the problem has become until the family is already in
                crisis.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and boundaries are strong enough to survive the first
                round of pushback.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto space-y-14">
            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Nevada Families Usually Call After the Cost of Waiting Has
                Already Become Obvious
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most families do not call at the beginning. They call after the
                overdoses, financial chaos, hospital visits, disappearances,
                broken trust, and emotional exhaustion have already stacked up.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Nevada, addiction can hide behind nightlife, hospitality,
                appearance, and a culture that normalizes excess. But the family
                experience is painfully familiar: fear, rescue, arguments, mixed
                messages, and the growing sense that nothing is changing.
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
                A real intervention is not a dramatic confrontation for its own
                sake. It is a process that gets the family unified, gets
                treatment ready, and stops the addiction from controlling the
                whole situation.
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
                Common Reasons Families in Nevada Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {nevadaSituations.map((item) => (
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
                  dangerous to keep managing quietly, it probably has. The more
                  chaotic the pattern feels, the less wise it is to keep waiting
                  for the person using to solve it alone.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Family
                System That Stops Protecting the Addiction.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Treatment matters. But if the family goes back to the same fear,
                financial rescue, and inconsistent boundaries, the addiction
                will keep trying to re-enter through the same openings.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: your loved one gets a real chance
                at help, and the family stops organizing itself around the next
                crisis. That is how real leverage begins.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Nevada Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose,
            arrest, disappearance, or family collapse to decide for you. Get a
            clear assessment and a real plan now.
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

      <LocationLinks currentLocation="Nevada" locationType="state" />

      <Footer />
    </div>
  );
};

export default Nevada;
