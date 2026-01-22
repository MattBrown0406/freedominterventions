import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import saltLakeCityBanner from "@/assets/salt-lake-city-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const SaltLakeCityUtah = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Salt Lake City Utah Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Salt Lake City, Utah. Help your loved one recover from opioid, prescription drug, and alcohol addiction. Serving Salt Lake County and the Wasatch Front."
        canonical="https://freedominterventions.com/salt-lake-city-utah"
        keywords="Salt Lake City addiction intervention, Utah drug intervention, SLC family intervention, opioid crisis Utah, addiction help Salt Lake City"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Salt Lake City" state="UT" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Utah", url: "https://freedominterventions.com/utah" },
          { name: "Salt Lake City", url: "https://freedominterventions.com/salt-lake-city-utah" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Utah", href: "/utah" },
        { name: "Salt Lake City", href: "/salt-lake-city-utah" },
      ]} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={saltLakeCityBanner} 
          alt="Wasatch Mountains with snow-capped peaks at sunrise near Salt Lake City" 
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
              Salt Lake City, Utah
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Salt Lake City's Addiction Crisis: Professional Intervention Services for Utah Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Utah faces a silent addiction crisis at odds with its wholesome image. Prescription opioid addiction, alcohol dependency, and the surge of fentanyl devastate families throughout Salt Lake County and the Wasatch Front. Freedom Interventions provides professional, compassionate intervention services that respect your family's values while saving lives.
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
                  Utah's Unexpected Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Utah recorded over 700 overdose deaths in 2023, with Salt Lake County bearing the largest burden. Despite—or perhaps because of—cultural expectations of sobriety, Utah has historically had high rates of prescription opioid abuse. Now fentanyl has entered the equation, making the state's addiction crisis more lethal than ever. The stigma surrounding addiction in Utah's conservative culture often prevents families from seeking help.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">700+</div>
                <p className="text-muted-foreground">Overdose deaths in Utah in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 10</div>
                <p className="text-muted-foreground">State for prescription opioid abuse</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">200%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2019</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Utah's unique cultural landscape creates particular challenges. Many families fear community judgment if addiction becomes known. The Church of Jesus Christ of Latter-day Saints' emphasis on abstinence can make it difficult for members struggling with addiction to seek help. Yet addiction doesn't respect religious boundaries—and neither should recovery efforts.
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
                  How Addiction Impacts Salt Lake City Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Utah families face unique pressures when addiction strikes. The emphasis on strong families means addiction can feel like a failure of both the individual and the family system. The tight-knit nature of Utah communities means families fear everyone will know their business. These fears can delay intervention until crisis becomes catastrophe.
                  </p>
                  <p>
                    Prescription drug addiction is particularly prevalent in Utah. Pain medications prescribed after surgery or for chronic conditions have hooked countless Utahns who never expected to become addicts. When prescriptions run out, some turn to street opioids—now commonly laced with fentanyl.
                  </p>
                  <p>
                    From the Avenues to Sandy, from Park City to West Valley City, addiction affects families across the entire Wasatch Front. The beautiful mountain backdrop can't hide the crisis unfolding in homes throughout the region.
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
                  How Freedom Interventions Serves Salt Lake City Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Utah families in crisis. We understand Utah's unique culture and respect your family's values while providing professional, effective intervention services.
                  </p>
                  <p>
                    <strong className="text-foreground">Cultural Sensitivity:</strong> We understand the role that faith and community play in Utah families' lives. We work within your family's value system while addressing addiction as the medical condition it is.
                  </p>
                  <p>
                    <strong className="text-foreground">Discretion:</strong> We understand the importance of privacy in close-knit Utah communities. Our interventions can be conducted with complete confidentiality.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Connections:</strong> We know Utah's treatment landscape and have relationships with programs throughout the country. Whether your loved one needs to stay close to family or would benefit from treatment elsewhere, we'll find the right fit.
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
                  Hope for Utah Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery thrives in Utah. The same community bonds that can make families hide addiction can also support recovery. Utah's focus on family means relatives often stay engaged through the recovery process. The beautiful outdoors provide healthy alternatives to substance use. Strong recovery communities exist alongside faith-based support.
                  </p>
                  <p>
                    But first, your loved one needs to accept help. Professional intervention breaks through denial and opens the door to treatment. Don't let fear of judgment prevent you from saving your loved one's life.
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
              Get Help for Your Utah Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all Wasatch Front communities including Salt Lake City, Provo, Ogden, Sandy, West Valley City, and surrounding areas.
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

      <LocationLinks currentLocation="Salt Lake City" locationType="city" parentState="Utah" />

      <Footer />
    </div>
  );
};

export default SaltLakeCityUtah;