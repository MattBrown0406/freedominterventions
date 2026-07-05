import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import phoenixBanner from "@/assets/phoenix-arizona-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const PhoenixArizona = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Phoenix Arizona Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Phoenix, Arizona. Help your loved one recover from fentanyl, methamphetamine, and opioid addiction. Serving Maricopa County and the Valley of the Sun."
        canonical="https://freedominterventions.com/phoenix-arizona"
        keywords="Phoenix addiction intervention, Arizona drug intervention, Phoenix family intervention, fentanyl crisis Phoenix, addiction help Phoenix AZ"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Phoenix" state="AZ" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Arizona", url: "https://freedominterventions.com/arizona" },
          { name: "Phoenix", url: "https://freedominterventions.com/phoenix-arizona" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Arizona", href: "/arizona" },
        { name: "Phoenix", href: "/phoenix-arizona" },
      ]} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={phoenixBanner} 
          alt="Arizona desert sunrise with saguaro cacti and mountains near Phoenix" 
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
              Phoenix, Arizona
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Phoenix Addiction Crisis: Professional Intervention Services for Valley Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Phoenix and the surrounding Valley of the Sun face a devastating addiction crisis, with fentanyl and methamphetamine destroying families across Maricopa County. Arizona's proximity to the border makes it a primary corridor for drug trafficking, putting families at heightened risk. Freedom Interventions offers professional, compassionate help for families ready to fight back.
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
                  Maricopa County's Deadly Drug Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Maricopa County—home to Phoenix, Scottsdale, Mesa, and surrounding communities—recorded over 2,000 overdose deaths in 2023. Arizona has become a major fentanyl trafficking corridor, with pills flooding the market at prices that make addiction accessible to anyone. The combination of meth and fentanyl has made the Valley's drug crisis particularly lethal.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2,000+</div>
                <p className="text-muted-foreground">Overdose deaths in Maricopa County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">400%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2019</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#3</div>
                <p className="text-muted-foreground">State for meth trafficking volume</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Phoenix's rapid growth has brought opportunity but also vulnerability. New residents disconnected from support networks, retirees with chronic pain conditions, young people seeking opportunity—all can fall prey to addiction in a region awash with cheap, potent drugs.
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
                  How Addiction Affects Phoenix Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Phoenix families face distinct challenges. The Valley's sprawl can isolate families dealing with addiction—it's easy to feel alone when your neighbors are strangers. Arizona's historically limited social services mean fewer safety nets when crisis hits. And the heat itself creates additional danger for those struggling with addiction on the streets.
                  </p>
                  <p>
                    From Paradise Valley executives to South Phoenix working families, from ASU students to Sun City retirees, addiction strikes across the demographic spectrum. Prescription opioids prescribed for chronic pain become full-blown addiction. Party drugs turn out to be fentanyl. Meth use that seemed manageable becomes all-consuming.
                  </p>
                  <p>
                    Many Phoenix families have roots in states where addiction services were more developed. The adjustment to Arizona's different treatment landscape adds another barrier to getting help.
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
                  How Freedom Interventions Serves Phoenix Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Arizona families in crisis. We work with families throughout the Valley and can travel to Phoenix quickly when timing is critical. Our national network of treatment resources ensures we can find the right program for your loved one's specific needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Arizona Treatment Knowledge:</strong> We know which Phoenix-area detox facilities and treatment centers deliver results, and we maintain relationships with programs throughout the Southwest and nationwide.
                  </p>
                  <p>
                    <strong className="text-foreground">Crisis Response:</strong> When opportunity knocks—when your loved one shows a moment of willingness—we can mobilize quickly. Intervention timing is critical, and we understand the urgency.
                  </p>
                  <p>
                    <strong className="text-foreground">Bilingual Services:</strong> Phoenix's large Latino community can access our services in Spanish. Si necesitan, les puedo comunicar en Español.
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
                  Hope for Phoenix Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the grim statistics, recovery flourishes in Phoenix. The Valley has a growing recovery community, excellent treatment facilities, and the sunshine that supports physical and mental wellness. Many people come to Arizona specifically for recovery—the climate, the outdoor opportunities, and the fresh-start mentality all support healing.
                  </p>
                  <p>
                    But your loved one needs to get there first. Professional intervention breaks through the denial and manipulation that keep people trapped in addiction. If your family is struggling, the sooner families have a clear plan, the more options they have.
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
              Get Help for Your Phoenix Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all Valley communities including Phoenix, Scottsdale, Mesa, Tempe, Chandler, Gilbert, Glendale, and surrounding areas.
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


      <LocationLinks currentLocation="Phoenix" locationType="city" parentState="Arizona" />

      <Footer />
    </div>
  );
};

export default PhoenixArizona;