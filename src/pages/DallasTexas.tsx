import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import dallasBanner from "@/assets/dallas-texas-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const DallasTexas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Texas", href: "/texas" },
    { name: "Dallas", href: "/dallas-texas" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Dallas Texas Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Dallas-Fort Worth, Texas. Help your loved one recover from fentanyl, opioids, alcohol, and methamphetamine addiction. Serving the DFW Metroplex."
        keywords="Dallas addiction intervention, DFW drug intervention, Dallas family intervention, fentanyl crisis Dallas, addiction help Dallas TX"
        canonical="https://freedominterventions.com/dallas-texas"
      />
      <LocalBusinessSchema location="Dallas" state="Texas" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={dallasBanner} 
          alt="Dallas Texas modern skyline at dramatic sunrise" 
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
              Dallas, Texas
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Dallas-Fort Worth Addiction Crisis: Professional Intervention Services for DFW Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The Dallas-Fort Worth metroplex—one of America's fastest-growing regions—faces a devastating addiction crisis. Fentanyl, methamphetamine, and alcohol addiction destroy families from Highland Park to Fort Worth, from Plano to Arlington. Freedom Interventions brings hope and professional expertise to DFW families ready to help their loved ones recover.
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
                  The DFW Metroplex Overdose Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dallas County alone recorded over 1,200 overdose deaths in 2023, with fentanyl driving the surge. Tarrant County (Fort Worth) and surrounding counties added hundreds more. Texas's position as a major drug trafficking corridor means DFW is flooded with cheap, deadly synthetic opioids and methamphetamine. The crisis spans every ZIP code and demographic.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
                <p className="text-muted-foreground">Overdose deaths in Dallas County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">350%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2019</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#2</div>
                <p className="text-muted-foreground">State for total overdose deaths</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The DFW region's combination of business hub culture, suburban sprawl, and rapid population growth creates unique vulnerabilities. High-powered executives mask addiction behind success. Suburban teenagers encounter fentanyl-laced pills through social media dealers. Working-class families struggle with meth and alcohol addiction exacerbated by economic pressure.
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
                  How Addiction Impacts DFW Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Dallas-Fort Worth's business culture can mask addiction behind professional success. The same drive that builds careers can fuel addictive behavior. Executives drink to network and network to drink. Professionals prescribed opioids for injuries become dependent. The pressure to maintain appearances keeps families silent until crisis forces action.
                  </p>
                  <p>
                    The sprawling metroplex also creates isolation. Families in Frisco may have no connection to families in Oak Cliff dealing with the same crisis. Suburban parents don't realize the dangers their children face until a fentanyl-related emergency brings the crisis home.
                  </p>
                  <p>
                    From the wealthy Park Cities to struggling South Dallas neighborhoods, from Fort Worth's Stockyards to Denton's college scene, addiction doesn't respect boundaries. Every DFW family is vulnerable.
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
                  How Freedom Interventions Serves DFW Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Dallas-Fort Worth families in crisis. We travel to DFW and can be there quickly when timing is critical. Our understanding of Texas treatment options and national treatment networks ensures we find the right program for your loved one.
                  </p>
                  <p>
                    <strong className="text-foreground">Executive Interventions:</strong> DFW's business culture requires interventions that protect professional reputations while saving lives. We understand the stakes and conduct confidential, effective interventions for professionals and executives.
                  </p>
                  <p>
                    <strong className="text-foreground">Faith-Based Options:</strong> Many DFW families value faith-based treatment approaches. We can connect you with excellent Christ-centered programs that integrate faith and clinical treatment.
                  </p>
                  <p>
                    <strong className="text-foreground">Bilingual Services:</strong> We serve DFW's large Latino community in Spanish. Si necesitan, les puedo comunicar en Español.
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
                  Hope for Dallas-Fort Worth Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The DFW metroplex has growing treatment resources and a strong recovery community. Texas's "can-do" attitude extends to recovery—people get better here every day. The key is getting your loved one to accept help, and that's where professional intervention makes all the difference.
                  </p>
                  <p>
                    Fentanyl has eliminated the margin for error. If your loved one is struggling with addiction in Dallas-Fort Worth, it makes sense to get clarity before the next crisis makes the decision for you.
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
              Get Help for Your DFW Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve the entire DFW metroplex including Dallas, Fort Worth, Plano, Arlington, Irving, Frisco, McKinney, Denton, and all surrounding communities.
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


      <LocationLinks currentLocation="Dallas" locationType="city" />
      <Footer />
    </div>
  );
};

export default DallasTexas;