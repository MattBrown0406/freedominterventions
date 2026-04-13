import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import losAngelesBanner from "@/assets/los-angeles-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const LongBeachCalifornia = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "California", href: "/california" },
    { name: "Long Beach", href: "/long-beach-california" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Long Beach, California | Freedom Interventions"
        description="Long Beach families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Los Angeles County. Free consultation. (541) 838-6009."
        keywords="Long Beach addiction intervention, Long Beach drug intervention, Long Beach family intervention, intervention specialist Long Beach CA, Los Angeles County interventionist, fentanyl intervention Long Beach, port city drug crisis"
        canonical="https://freedominterventions.com/long-beach-california"
      />
      <LocalBusinessSchema location="Long Beach" state="California" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={losAngelesBanner}
          alt="Long Beach California port city addiction intervention services"
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
              Long Beach, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Long Beach's Drug Crisis: Expert Intervention Services for Families in LA County's Port City
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Long Beach sits at the intersection of one of the world's busiest ports and a severe addiction crisis. Fentanyl and methamphetamine flow through communities from Bixby Knolls to North Long Beach, devastating families across Los Angeles County's second-largest city. Freedom Interventions provides compassionate, professional intervention services to help Long Beach families take action before tragedy strikes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-838-6009">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 838-6009
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
                  Understanding Long Beach's Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Long Beach's position as a major port city creates unique drug trafficking vulnerabilities. The port brings in enormous quantities of fentanyl and methamphetamine that flood into communities across the city. High unemployment in some neighborhoods, the presence of gangs involved in drug distribution, and a significant unhoused population create compounding factors that make Long Beach's addiction crisis particularly severe.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~460K</div>
                <p className="text-muted-foreground">Long Beach population—LA County's 2nd largest city</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">↑200%</div>
                <p className="text-muted-foreground">Increase in fentanyl overdose deaths in Long Beach since 2019</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Port</div>
                <p className="text-muted-foreground">LA/Long Beach: World's busiest port and major drug entry point</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From the historic downtown to Cambodian Town, from Signal Hill to West Long Beach, the addiction epidemic affects every corner of the city. Working-class families, college students at Cal State Long Beach, and multi-generational households are all touched by this crisis.
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
                  How Addiction Affects Long Beach Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Long Beach's working-class and immigrant families face unique barriers to seeking addiction help. Cultural stigma, fear of legal consequences, language barriers, and lack of insurance or resources all prevent families from taking action—even when a loved one is clearly in crisis.
                  </p>
                  <p>
                    Young people in Long Beach face particularly high risks. The availability of fentanyl-laced counterfeit pills, combined with the social pressures of gang activity in some neighborhoods, creates deadly temptations. A single exposure to fentanyl can be fatal.
                  </p>
                  <p>
                    Freedom Interventions helps families navigate these barriers. We bridge cultural divides, work with families regardless of insurance status, and create intervention plans that account for the unique circumstances each family faces.
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
                  How Freedom Interventions Helps Long Beach Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides specialized intervention services for Long Beach and greater Los Angeles County. We connect families with Long Beach's treatment resources and navigate the often complex process of accessing care quickly.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Resources:</strong> Long Beach has quality treatment options including Long Beach Memorial Medical Center, St. Mary Medical Center, and Pacific Clinics. We also connect families with treatment centers throughout Southern California for more intensive care needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Crisis Response:</strong> When addiction reaches crisis level, we're ready to move quickly. Our intervention process can be initiated within days, not weeks, when the situation demands urgency.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Recovery:</strong> We help the entire family system heal—not just the person with addiction. Our approach addresses enabling behaviors, establishes boundaries, and creates a foundation for sustainable recovery.
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
                  Hope for Long Beach Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is real, even in Long Beach's challenging environment. Families across the city have used professional intervention to get their loved ones into treatment—and watched them rebuild their lives.
                  </p>
                  <p>
                    You don't have to face this alone. A free consultation costs nothing and could save everything. Call us today—we're here to help Long Beach families find a way forward.
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
              Get Help for Your Long Beach Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve Long Beach and all of Los Angeles County including Compton, Lakewood, Carson, Torrance, and surrounding communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-838-6009">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 838-6009
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


      <LocationLinks currentLocation="Long Beach" locationType="city" parentState="California" />
      <Footer />
    </div>
  );
};

export default LongBeachCalifornia;
