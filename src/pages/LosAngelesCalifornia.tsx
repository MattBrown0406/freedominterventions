import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import losAngelesBanner from "@/assets/los-angeles-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const LosAngelesCalifornia = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Los Angeles California Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Los Angeles, California. Help your loved one recover from fentanyl, opioids, alcohol, and prescription drug addiction. Serving LA County and Southern California."
        canonical="https://freedominterventions.com/los-angeles-california"
        keywords="Los Angeles addiction intervention, LA drug intervention, Hollywood addiction help, fentanyl crisis Los Angeles, addiction intervention LA CA"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Los Angeles" state="CA" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "California", url: "https://freedominterventions.com/california" },
          { name: "Los Angeles", url: "https://freedominterventions.com/los-angeles-california" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "California", href: "/california" },
        { name: "Los Angeles", href: "/los-angeles-california" },
      ]} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={losAngelesBanner} 
          alt="Los Angeles skyline with palm trees silhouetted against golden sunset" 
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
              Los Angeles, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Los Angeles Addiction Crisis: Professional Intervention Services for Southern California Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Los Angeles County leads California in overdose deaths, with fentanyl devastating communities from Hollywood to the Valley, from the Westside to East LA. Behind the glamour, thousands of families struggle to help loved ones trapped in addiction. Freedom Interventions provides expert guidance to help your family find hope and recovery.
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
                  LA County's Devastating Overdose Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Los Angeles County recorded over 3,000 overdose deaths in 2023—more than any other county in California. Fentanyl has become the leading cause of death for adults ages 18-45 in LA, surpassing car accidents, homicide, and suicide combined. The crisis affects every community, from wealthy enclaves to working-class neighborhoods.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3,000+</div>
                <p className="text-muted-foreground">Overdose deaths in LA County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Cause of death for ages 18-45</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">80%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              LA's entertainment industry, high-pressure careers, and party culture create an environment where addiction can flourish. Prescription opioids from pain management, cocaine and party drugs laced with fentanyl, and the stresses of the entertainment industry have made addiction a crisis across all income levels and neighborhoods.
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
                  How Addiction Impacts Los Angeles Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Los Angeles families face unique pressures when addiction strikes. The entertainment industry's culture of secrecy means many struggle in silence. Successful professionals fear career damage if their addiction—or their family member's addiction—becomes known. Immigrant families navigate cultural stigma alongside practical barriers to treatment.
                  </p>
                  <p>
                    From Bel Air to Boyle Heights, from Santa Monica to Pasadena, addiction doesn't discriminate. What varies is access to resources and the specific pressures families face. A Hollywood producer's family and a construction worker's family both need professional help—just tailored to their different circumstances.
                  </p>
                  <p>
                    The sprawling nature of LA can also make families feel isolated. It's easy to believe your situation is unique when your neighbor's struggles remain hidden. But addiction is epidemic throughout Southern California, and help is available.
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
                  How Freedom Interventions Serves Los Angeles Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Southern California families in crisis. We understand LA's unique culture and have helped families throughout the region guide their loved ones into recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Entertainment Industry Experience:</strong> We've worked with families in the entertainment industry and understand the unique pressures and privacy requirements involved. Discretion is paramount, and we know how to conduct interventions that protect careers while saving lives.
                  </p>
                  <p>
                    <strong className="text-foreground">Extensive Treatment Network:</strong> LA has treatment facilities, and we know which programs work best for different situations. We also maintain relationships with excellent programs throughout the country for those who benefit from treatment away from home.
                  </p>
                  <p>
                    <strong className="text-foreground">Bilingual Services:</strong> We can communicate in Spanish—critical for serving LA's large Latino community. Si necesitan, les puedo comunicar en Español.
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
                  Recovery Is Possible in Los Angeles
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Los Angeles has a strong recovery community and excellent treatment resources. From Malibu's luxury rehabs to community-based programs throughout the county, options exist for every situation. The key is getting your loved one to accept help—and that's where professional intervention makes the difference.
                  </p>
                  <p>
                    The fentanyl crisis has made time more precious than ever. Each use carries serious risk. If your loved one is struggling with addiction in Los Angeles, the sooner families have a clear plan, the more options they have.
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
              Get Help for Your LA Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all of Los Angeles County including Hollywood, Beverly Hills, Santa Monica, Pasadena, Long Beach, the Valley, and surrounding communities.
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


      <LocationLinks currentLocation="Los Angeles" locationType="city" parentState="California" />

      <Footer />
    </div>
  );
};

export default LosAngelesCalifornia;