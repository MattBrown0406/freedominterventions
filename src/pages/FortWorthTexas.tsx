import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import texasBanner from "@/assets/texas-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const FortWorthTexas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Texas", href: "/texas" },
    { name: "Fort Worth", href: "/fort-worth-texas" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Fort Worth, Texas | Freedom Interventions"
        description="Fort Worth families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Tarrant County. Free consultation. (541) 838-6009."
        keywords="Fort Worth addiction intervention, Tarrant County drug intervention, Fort Worth family intervention, opioid crisis Fort Worth TX, fentanyl Fort Worth, meth Tarrant County, DFW intervention specialist, intervention services Fort Worth"
        canonical="https://freedominterventions.com/fort-worth-texas"
      />
      <LocalBusinessSchema location="Fort Worth" state="Texas" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={texasBanner}
          alt="Fort Worth Texas skyline and stockyards"
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
              Fort Worth, Texas
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Fort Worth's Fentanyl & Opioid Crisis: Professional Intervention Services for Tarrant County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fort Worth—the western anchor of the DFW Metroplex—is facing a significant and escalating fentanyl and opioid crisis. With a population approaching one million and a strong working-class identity, Tarrant County families are often the last to ask for help and among the hardest hit. Freedom Interventions provides expert, compassionate intervention services for Fort Worth families ready to break the cycle.
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
                  Understanding Fort Worth's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tarrant County has experienced a dramatic increase in overdose deaths, fueled by fentanyl that enters through Texas's porous southern border and spreads rapidly through the DFW supply chain. Methamphetamine continues to devastate working-class neighborhoods, while opioid dependency affects families across all income levels throughout the county.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">920k+</div>
                <p className="text-muted-foreground">Fort Worth population, with overdose deaths rising steeply year over year</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">5x</div>
                <p className="text-muted-foreground">Fentanyl overdose deaths in Texas have increased fivefold over the past five years</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">Tarrant County meth seizures remain among the highest in North Texas</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Fort Worth's blue-collar pride—the city where the West begins—can be a barrier to getting help. Working-class families often see addiction as a personal failing rather than a treatable medical condition. The stigma of asking for outside help runs deep. Meanwhile, the addiction quietly destroys careers, families, and lives.
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
                  How Addiction Affects Fort Worth Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Fort Worth's working-class communities, addiction often starts with legitimate pain management—injuries on the job, athletic injuries, post-surgical prescriptions. When the prescription ends, the dependency doesn't. Families watch loved ones transition from painkillers to heroin to fentanyl with terrifying speed.
                  </p>
                  <p>
                    Methamphetamine's grip on Tarrant County shows up as job loss, domestic instability, paranoia, and family violence. Families often don't recognize the substance—they just know their loved one has changed completely. Professional intervention helps families understand what they're dealing with and what to do about it.
                  </p>
                  <p>
                    Fort Worth's growth has also brought suburban addiction—professionals in Arlington, Keller, Mansfield, and Southlake who hide high-functioning alcohol or prescription pill dependency behind successful careers and stable homes. The veneer of success delays the family's recognition of the crisis.
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
                  How Freedom Interventions Helps Fort Worth Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of professional intervention experience to Fort Worth and Tarrant County families. We work with the full spectrum of addiction presentations—from working-class families dealing with meth to suburban professionals hiding opioid dependency.
                  </p>
                  <p>
                    <strong className="text-foreground">Direct, No-Nonsense Approach:</strong> Fort Worth families appreciate honesty. We don't sugarcoat addiction's reality or what it takes to get better. We give families the truth and a concrete plan.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Network:</strong> We work with JPS Health Network, My Health My Resources of Tarrant County (MHMR Tarrant), and the full spectrum of North Texas recovery resources—plus national residential programs when a higher level of care is needed.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Transformation:</strong> We help families stop enabling, establish meaningful consequences, and begin healing alongside their loved one's recovery process.
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
                  Hope for Fort Worth Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible. We've helped families throughout Tarrant County—from the Near Southside to Aledo, from Haltom City to Burleson—guide their loved ones into treatment and watched real, lasting change happen.
                  </p>
                  <p>
                    Fort Worth's toughness is an asset in recovery—when channeled right. Don't wait for the crisis to force your hand. Call today for a free, confidential consultation and take the first step toward getting your family back.
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
              Get Help for Your Fort Worth Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Tarrant County including Fort Worth, Arlington, Mansfield, Keller, Euless, and surrounding communities.
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

      <LocationLinks currentLocation="Fort Worth" locationType="city" />
      <Footer />
    </div>
  );
};

export default FortWorthTexas;
