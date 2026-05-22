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
import BreadcrumbNav from "@/components/BreadcrumbNav";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  ServiceAreaSchema,
  LocationFAQSchema,
} from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";

const pressurePoints = [
  "Hawaii families are often dealing with meth, alcohol, and rising fentanyl risk in a setting where geographic isolation makes every treatment decision feel heavier.",
  "The island reality changes the logistics. Families may be deciding between limited local options, inter-island coordination, or treatment on the mainland.",
  "In tight-knit communities, shame and privacy can keep families waiting too long, even when everyone already knows the situation is getting worse.",
];

const whatMattDoes = [
  {
    title: "Gets the family aligned before the intervention",
    description:
      "Families usually call after months or years of trying to manage the problem quietly. Matt helps the family get unified, clear, and ready to stop sending mixed messages.",
  },
  {
    title: "Builds the treatment path around Hawaii's real logistics",
    description:
      "That may mean local care, inter-island coordination, mainland placement, or transport planning. The point is to solve the practical problem before the pressure moment arrives.",
  },
  {
    title: "Leads a direct, respectful intervention",
    description:
      "The goal is not to overpower your loved one. The goal is to tell the truth clearly, offer treatment immediately, and make it obvious the family is acting together.",
  },
  {
    title: "Helps the family stay consistent afterward",
    description:
      "Whether your loved one accepts help or refuses it, the family still needs structure. That is how the cycle of rescue and relapse starts to break.",
  },
];

const hawaiiSituations = [
  "A loved one whose meth use, alcohol use, or polysubstance pattern has become impossible to manage quietly",
  "A family trying to decide whether treatment should happen on-island, on another island, or on the mainland",
  "A spouse or partner whose addiction is destabilizing the home while everyone tries to protect the family from embarrassment",
  "A son or daughter cycling through relapse, disappearances, paranoia, or repeated treatment promises",
  "A military or veteran family dealing with addiction alongside trauma, depression, or other mental health stress",
  "A family that knows distance is complicating the plan, but cannot afford to let distance become the excuse for waiting",
];

const islandCards = [
  {
    name: "Oahu",
    description:
      "Urban pressure, military-family dynamics, and a mix of meth, alcohol, and fentanyl concerns make clarity especially important.",
    href: "/oahu-hawaii",
    population: "~1M",
  },
  {
    name: "Maui",
    description:
      "Tourism, alcohol normalization, and community trauma can make serious addiction easier to hide until the family is already in crisis.",
    href: "/maui-hawaii",
    population: "~165K",
  },
  {
    name: "Big Island",
    description:
      "Long distances and fewer local options can make treatment planning feel overwhelming, especially in rural communities.",
    href: "/big-island-hawaii",
    population: "~200K",
  },
  {
    name: "Kauai",
    description:
      "Tight-knit communities and limited treatment infrastructure can keep families isolated longer than is safe.",
    href: "/kauai-hawaii",
    population: "~73K",
  },
];

const Hawaii = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Hawaii", href: "/hawaii" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Hawaii | Freedom Interventions"
        description="Hawaii families dealing with addiction need a clear plan, not more delay. Matt Brown helps families across Hawaii prepare, intervene, and coordinate treatment on-island or beyond."
        canonical="https://freedominterventions.com/hawaii"
        keywords="Hawaii addiction intervention, Hawaii interventionist, Oahu intervention, Maui addiction help, Big Island intervention, family intervention Hawaii"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Hawaii"
        url="https://freedominterventions.com/hawaii"
        description="Professional addiction intervention services for families across Hawaii, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Hawaii" locationType="state" />
      <BreadcrumbSchema
        items={breadcrumbItems.map((item) => ({
          name: item.name,
          url: `https://freedominterventions.com${item.href}`,
        }))}
      />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-20 md:pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-primary uppercase tracking-[0.2em] text-sm md:text-base mb-4">
            Hawaii Intervention Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            When Island Logistics and Addiction Collide, Families Need a Real
            Plan
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Matt Brown works with families across Hawaii to prepare the
            intervention, coordinate treatment, and solve the distance, travel,
            and placement issues that keep families stuck.
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

      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-destructive mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                ~400
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Approximate overdose deaths per year in Hawaii, with fentanyl
                raising the danger in a state that has long struggled with meth.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Island Logistics
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Families may need to solve inter-island travel, mainland
                placement, or limited local availability before help can happen
                fast.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">
                Prepared Families
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, treatment
                is ready, and geography is treated as a planning problem, not a
                reason to keep waiting.
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
                Hawaii Families Usually Call After They Have Spent Too Long
                Trying to Handle It Privately
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out, they have often spent months
                or years trying to contain the situation inside the family. They
                have protected the person using, protected the family image, and
                protected everyone from one more painful conversation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                But addiction does not care about privacy, distance, or good
                intentions. In Hawaii, the extra layer is geography. Every
                treatment question can feel bigger because travel, separation,
                and access are real issues. That makes planning more important,
                not less.
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
                A good intervention does more than create one difficult
                conversation. It gets the family aligned, gets treatment ready,
                and creates a path that can actually work in the real world.
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
                Common Reasons Families in Hawaii Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {hawaiiSituations.map((item) => (
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
                  If the family already knows distance is complicating the plan,
                  that is a reason to get organized sooner, not a reason to wait
                  until the crisis gets worse.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center">
                Intervention Services Across the Hawaiian Islands
              </h2>
              <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                Different islands have different treatment realities, but the
                family pattern is the same. The sooner the family gets clear,
                the more options there usually are.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {islandCards.map((island) => (
                  <Link
                    key={island.name}
                    to={island.href}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {island.name}
                        </h3>
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {island.population}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {island.description}
                    </p>
                    <span className="text-primary text-sm font-medium group-hover:underline">
                      Learn about {island.name} →
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Family
                System Strong Enough to Hold the Change.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A treatment yes matters. But if the family goes back to panic,
                secrecy, and mixed messages, the addiction will try to reclaim
                the same space.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: the family becomes honest,
                consistent, and organized enough to stop living under the next
                crisis. That is what gives treatment a real chance to stick.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Hawaii Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not let travel, island logistics,
            or uncertainty keep your family stuck. Get clarity now, while there
            is still room to make a deliberate plan.
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

      <LocationLinks currentLocation="Hawaii" locationType="state" />

      <Footer />
    </div>
  );
};

export default Hawaii;
