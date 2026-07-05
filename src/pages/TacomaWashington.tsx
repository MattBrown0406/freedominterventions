import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import cityBanner from "@/assets/washington-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const TacomaWashington = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Washington", href: "/washington" },
    { name: "Tacoma", href: "/tacoma-washington" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Tacoma, Washington | Freedom Interventions"
        description="Tacoma families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Pierce County. Free consultation. (541) 668-8084."
        keywords="Tacoma addiction intervention, Pierce County drug intervention, Tacoma family intervention, fentanyl crisis Tacoma, meth intervention Tacoma, addiction help Tacoma WA"
        canonical="https://freedominterventions.com/tacoma-washington"
      />
      <LocalBusinessSchema location="Tacoma" state="Washington" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Washington State landscape representing hope for Tacoma families facing addiction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              <MapPin className="h-4 w-4" />
              Tacoma, Washington
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Tacoma's Addiction Crisis: Professional Intervention Services for Pierce County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tacoma is facing one of Washington's most severe addiction crises. As a port city with significant drug trafficking, Pierce County families are dealing with an escalating fentanyl and methamphetamine epidemic that demands professional intervention. Freedom Interventions provides compassionate, effective services throughout the Tacoma metro area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-668-8084">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 668-8084
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Understanding Tacoma's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pierce County consistently ranks among Washington's hardest-hit counties for overdose deaths. Tacoma's position as a major port city has made it a transit hub for fentanyl and methamphetamine moving through the region. High overdose rates, entrenched drug trafficking networks, and insufficient treatment capacity create a perfect storm for families already in crisis.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-muted-foreground">Pierce County ranked among WA's highest overdose death counties</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~220K</div>
                <p className="text-muted-foreground">Tacoma residents affected by the region's growing addiction crisis</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">58%</div>
                <p className="text-muted-foreground">Of Washington overdose deaths now involve fentanyl</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From the Hilltop neighborhood to South Tacoma, from Puyallup to University Place, addiction is touching families across Pierce County. The methamphetamine crisis has been compounded by an influx of counterfeit pills laced with fentanyl, making every use potentially fatal.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Addiction Affects Tacoma Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Tacoma's working-class communities often face addiction with fewer resources and more stigma. Families watch their loved ones cycle through the criminal justice system, emergency rooms, and short-term treatment programs without lasting results. The port city's drug supply is cheaper and more potent than ever, making addiction harder to escape.
                  </p>
                  <p>
                    The combination of economic pressure, trauma histories, and easy access to substances creates compounding challenges. Without professional intervention, families often exhaust their resources—emotional, financial, and relational—before their loved one gets lasting help.
                  </p>
                  <p>
                    Whether your family member is struggling with fentanyl, methamphetamine, alcohol, or prescription opioids, the pattern is familiar: promises broken, crises escalating, and the family left wondering what to do next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Helps Tacoma Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown brings a calm, structured approach to one of the most chaotic situations a family can face. We work with the entire family system to prepare a professional intervention that maximizes the chance your loved one accepts help.
                  </p>
                  <p>
                    <strong className="text-foreground">Pierce County Resources:</strong> We connect families with Tacoma's leading treatment resources including MultiCare Health System, CHI Franciscan, Pierce County Alliance, and Sound Mental Health. When local capacity is limited, we access statewide and national options.
                  </p>
                  <p>
                    <strong className="text-foreground">Structured Boundaries:</strong> We help families stop enabling and establish firm, loving boundaries that create real consequences—the leverage needed for lasting change.
                  </p>
                  <p>
                    <strong className="text-foreground">Immediate Coordination:</strong> We understand that addiction crises can escalate quickly. We work quickly to coordinate care and get your loved one into treatment when they're ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hope Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hope for Pierce County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even when addiction seems completely in control. We've helped families throughout the South Sound region—from Tacoma to Puyallup, Lakewood to Gig Harbor—guide their loved ones into treatment and witnessed real, lasting transformations.
                  </p>
                  <p>
                    If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Every day of active addiction carries risk. Professional intervention is the most effective way to break the cycle and get your family member the help they need—before the next overdose or crisis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Get Help for Your Tacoma Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan. We serve all of Pierce County including Tacoma, Puyallup, Lakewood, University Place, Gig Harbor, Bonney Lake, and Sumner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-668-8084">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 668-8084
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Family Intervention Link */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Need help planning a family intervention?</p>
              <p className="text-sm text-muted-foreground">Learn how our family intervention services work — and what to expect.</p>
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


      <LocationLinks currentLocation="Tacoma" locationType="city" parentState="Washington" />
      <Footer />
    </div>
  );
};

export default TacomaWashington;
