import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Calendar, AlertTriangle, Users, Shield, MapPin } from "lucide-react";
import utahBanner from "@/assets/utah-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { ServiceAreaSchema, OrganizationSchema, BreadcrumbSchema, LocationFAQSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const pressurePoints = [
  "Fentanyl, meth, alcohol, and prescription drug misuse can all drive the same family chaos: fear, lies, financial damage, and repeated emergencies.",
  "Utah families often spend months trying to manage the situation privately before realizing the problem is bigger than one more promise or one more rescue.",
  "By the time most families call, they are exhausted, divided, and unsure whether they are helping or making the addiction easier to continue.",
];

const whatMattDoes = [
  {
    title: "Stabilizes the family first",
    description:
      "Before anyone confronts your loved one, Matt gets the family aligned. That means clear roles, a shared message, and boundaries everyone understands and can actually hold.",
  },
  {
    title: "Builds the treatment plan before the conversation",
    description:
      "The intervention is not the plan. It is the doorway into the plan. Detox, residential care, outpatient options, transport, and next steps are worked through in advance so you are not improvising in the moment.",
  },
  {
    title: "Leads a direct, compassionate intervention",
    description:
      "The goal is not to shame or corner someone. The goal is to break through denial, present reality clearly, and create a real path into help.",
  },
  {
    title: "Helps the family hold the line afterward",
    description:
      "If your loved one accepts help, the family needs structure. If your loved one refuses, the family still needs structure. Either way, the work is not over when the conversation ends.",
  },
];

const utahSituations = [
  "A son or daughter cycling through relapse, rehab, jail, or ER visits",
  "A spouse whose drinking or drug use is destabilizing the entire home",
  "Parents getting manipulated by crisis after crisis and not knowing what is real anymore",
  "A family split between tough love, denial, fear, and rescue mode",
  "A loved one who says they want help, but never follows through once the pressure fades",
  "A situation that feels one bad night away from tragedy",
];

const Utah = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Utah | Freedom Interventions"
        description="Utah families dealing with addiction need a clear plan, not more chaos. Matt Brown helps families across Utah prepare, intervene, and move loved ones toward treatment."
        canonical="https://freedominterventions.com/utah"
        keywords="Utah addiction intervention, Utah interventionist, Salt Lake City drug intervention, Utah family intervention, Utah alcohol intervention"
        geoRegion="US-UT"
        geoPlacename="Utah"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Utah"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/utah"
        description="Professional addiction intervention services for families across Utah, including crisis stabilization, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Utah" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Utah", url: "https://freedominterventions.com/utah" },
        ]}
      />
      <Navbar />

      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Utah", href: "/utah" },
        ]}
      />

      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${utahBanner})` }}>
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4">Utah Intervention Services</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            When Addiction Has Taken Over the Family, You Need a Plan Stronger Than Hope Alone
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Matt Brown works with families across Utah to prepare the intervention, coordinate treatment, and stop the cycle of panic, rescue, and relapse.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground" asChild>
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
              <div className="text-3xl font-bold text-foreground mb-2">606</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utah drug overdose deaths in 2023, a reminder that waiting for the next wake-up call is a dangerous strategy.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">Statewide</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From Salt Lake City and Provo to rural communities, the pattern is the same: addiction isolates the family until someone changes the structure.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">Prepared Families</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interventions work better when the family is aligned, the treatment plan is ready, and the enabling stops feeding the problem.
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
                Utah Families Usually Call After They Have Tried Everything Except Structure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By the time a family reaches out for professional help, they have usually already spent months, sometimes years, living in reaction mode. They have covered bills, cleaned up messes, absorbed lies, believed promises, feared the worst, and argued about what to do next.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Utah, the substances may vary, fentanyl, meth, alcohol, prescription medications, but the family pattern is painfully familiar. Everyone is anxious. Nobody agrees on the right move. One person wants consequences, another wants patience, and another is too scared to upset the person using. That is where addiction keeps winning.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {pressurePoints.map((item) => (
                  <div key={item} className="rounded-2xl border border-border/50 bg-card p-6">
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                What a Professional Intervention Actually Changes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A real intervention is not a dramatic ambush. It is a structured process that gets the family clear, gets treatment options ready, and gives your loved one a direct choice between help and continued consequences.
              </p>
              <div className="grid gap-6">
                {whatMattDoes.map((item, index) => (
                  <div key={item.title} className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Common Reasons Families in Utah Reach Out
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {utahSituations.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-border/50 bg-background p-5">
                    <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-6 md:p-8">
                <p className="text-foreground text-lg leading-relaxed font-medium">
                  If your family is already asking, “How bad does this need to get before we act?” that question usually answers itself. It is already bad enough.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Goal Is Not Just Treatment Entry. The Goal Is a Different Family System.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Getting someone to say yes to treatment matters. But if the family goes right back to fear, mixed messages, and emergency-based decision making, the addiction will try to reclaim the same ground.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The stronger outcome is this: the family becomes clear, honest, and consistent. The loved one is given a real opportunity to accept help. If they refuse, the family stops protecting the addiction from its consequences. That is how things begin to change.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help With a Utah Intervention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            If the situation is escalating, do not wait for the next overdose scare, arrest, disappearance, or family collapse to make the decision for you. Get a clear assessment and a real plan.
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
              <p className="font-semibold text-foreground">Need help planning a family intervention?</p>
              <p className="text-sm text-muted-foreground">Learn how the process works, what to expect, and how families prepare.</p>
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

      <LocationLinks currentLocation="Utah" locationType="state" />

      <Footer />
    </div>
  );
};

export default Utah;
