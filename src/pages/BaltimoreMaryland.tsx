import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import baltimoreBanner from "@/assets/baltimore-maryland-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const BaltimoreMaryland = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Maryland", href: "/maryland" },
    { name: "Baltimore", href: "/baltimore-maryland" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Baltimore Maryland Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Baltimore, Maryland. Help your loved one find recovery from heroin, fentanyl, and opioid addiction. Free consultations available."
        keywords="Baltimore addiction intervention, Maryland drug intervention, Baltimore family intervention, heroin crisis Baltimore, opioid addiction help Baltimore MD"
        canonical="https://freedominterventions.com/baltimore-maryland"
      />
      <LocalBusinessSchema location="Baltimore" state="Maryland" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={baltimoreBanner} 
          alt="Baltimore Maryland Inner Harbor waterfront at sunset" 
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
              Baltimore, Maryland
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Baltimore's Long Battle with Addiction: Professional Intervention Services for Maryland Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Baltimore has been on the front lines of America's addiction crisis for decades. From heroin to fentanyl, the epidemic continues to devastate families across the city and surrounding counties. Freedom Interventions provides experienced, compassionate intervention services to help your loved one find lasting recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
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
                  Understanding Baltimore's Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Baltimore has one of the highest addiction and overdose rates in America. The city's heroin epidemic, which began decades ago, has evolved into an even deadlier fentanyl crisis. Addiction affects every neighborhood—from struggling communities to affluent suburbs throughout the Baltimore metro area.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">900+</div>
                <p className="text-muted-foreground">Overdose deaths in Baltimore City in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                <p className="text-muted-foreground">Overdose deaths statewide in Maryland</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">88%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Baltimore's addiction crisis spans generations and neighborhoods. From West Baltimore to Dundalk, from Towson to Columbia, families are losing loved ones to overdoses. The combination of entrenched drug markets, economic challenges, and fentanyl's lethality has created an ongoing emergency.
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
                  How Addiction Affects Baltimore Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Baltimore families have been fighting addiction for generations. Parents who lost siblings to heroin now watch their children struggle with fentanyl. The cycle of addiction tears through families, destroying relationships and claiming lives across all demographics.
                  </p>
                  <p>
                    The working-class pride of Baltimore often prevents families from seeking help. Many have "tried everything"—tough love, enabling, begging, threatening—without success. They don't realize that professional intervention offers a different approach with much higher outcomes.
                  </p>
                  <p>
                    Whether your loved one is caught in Baltimore's street drug scene or hiding a prescription pill addiction in the suburbs of Anne Arundel or Howard County, Freedom Interventions has the experience to help.
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
                  How Freedom Interventions Helps Baltimore Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience helping families nationwide, Freedom Interventions provides comprehensive intervention services for Baltimore-area families. We understand the complexities of Baltimore's addiction landscape and have the expertise to help in even the most challenging situations.
                  </p>
                  <p>
                    <strong className="text-foreground">Experienced Guidance:</strong> We've worked with families at every stage of addiction—from early warning signs to crisis situations. Our interventions are tailored to your specific circumstances and your loved one's unique needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Placement:</strong> We connect Baltimore families with appropriate detox and treatment facilities throughout Maryland and nationwide. We know which programs can handle fentanyl withdrawal safely and which offer the best outcomes.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the whole family recover—ending enabling patterns, establishing healthy boundaries, and supporting everyone's journey toward healing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hope for Baltimore Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite decades of struggle, recovery is possible for Baltimore families. Every day, people escape addiction and rebuild their lives. We've helped families throughout the Baltimore metro area guide their loved ones into treatment and witnessed remarkable transformations.
                  </p>
                  <p>
                    With fentanyl in virtually every street drug, clarity matters. Every day without intervention carries real risk. If someone you love in Baltimore is struggling, it makes sense to get clarity before the next crisis makes the decision for you.
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
              Get Help for Your Baltimore Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Baltimore City and surrounding counties including Baltimore County, Anne Arundel, Howard, Harford, and Carroll County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
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


      <LocationLinks currentLocation="Baltimore" locationType="city" />
      <Footer />
    </div>
  );
};

export default BaltimoreMaryland;
