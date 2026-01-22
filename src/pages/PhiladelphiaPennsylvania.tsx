import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import philadelphiaBanner from "@/assets/philadelphia-pennsylvania-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const PhiladelphiaPennsylvania = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Pennsylvania", href: "/pennsylvania" },
    { name: "Philadelphia", href: "/philadelphia-pennsylvania" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Philadelphia Pennsylvania Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Philadelphia, Pennsylvania. Help your loved one find recovery from fentanyl, opioid, and drug addiction. Free consultations available."
        keywords="Philadelphia addiction intervention, Pennsylvania drug intervention, Philly family intervention, fentanyl crisis Philadelphia, Kensington addiction help"
        canonical="https://freedominterventions.com/philadelphia-pennsylvania"
      />
      <LocalBusinessSchema location="Philadelphia" state="Pennsylvania" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={philadelphiaBanner} 
          alt="Philadelphia Pennsylvania skyline with historic architecture" 
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
              Philadelphia, Pennsylvania
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Philadelphia's Addiction Emergency: Professional Intervention Services for Families in Crisis
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Philadelphia faces one of the nation's worst drug epidemics. With more overdose deaths than any major U.S. city, families need professional help now more than ever. Freedom Interventions provides compassionate, effective intervention services to help your loved one escape addiction's grip.
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
                  Understanding Philadelphia's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Philadelphia has the highest overdose death rate of any large U.S. city. The Kensington neighborhood has become internationally known as "the largest open-air drug market on the East Coast," but addiction doesn't stop at neighborhood boundaries—it affects families throughout the entire Delaware Valley.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1,400+</div>
                <p className="text-muted-foreground">Overdose deaths in Philadelphia in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">90%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Highest overdose rate among large U.S. cities</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The combination of fentanyl's deadly potency, xylazine ("tranq") contamination, and entrenched drug markets has created an unprecedented crisis. Families from the Main Line to South Philly, from Fishtown to Chestnut Hill, are losing loved ones to this epidemic at alarming rates.
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
                  How Addiction Affects Philadelphia Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Philadelphia's diverse neighborhoods are united by the pain of addiction. Working-class families in Kensington and Port Richmond watch children disappear into the streets. Affluent families in the suburbs discover their kids are buying fentanyl from dealers on social media. The epidemic crosses every demographic line.
                  </p>
                  <p>
                    The City of Brotherly Love has always been defined by family and community. But addiction isolates families, creating shame that prevents them from seeking help. Many have tried everything—ultimatums, tough love, bailing their loved one out—only to watch the cycle continue.
                  </p>
                  <p>
                    Whether your loved one is on the streets of Kensington or hiding their addiction in a professional career in Center City, Freedom Interventions understands what Philadelphia families are facing.
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
                  How Freedom Interventions Helps Philadelphia Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience and a national reach, Freedom Interventions provides comprehensive intervention services for Philadelphia-area families. We understand the unique challenges of the current crisis and have the expertise to help even in the most desperate situations.
                  </p>
                  <p>
                    <strong className="text-foreground">Crisis Experience:</strong> We've worked with families in every stage of addiction crisis—from early intervention to helping get loved ones off the streets. We know how to navigate Philadelphia's treatment system and can place your loved one in appropriate care.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Coordination:</strong> We connect Philadelphia families with detox facilities equipped to handle fentanyl/xylazine withdrawal safely, followed by residential treatment programs that give your loved one the best chance at lasting recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Recovery:</strong> Addiction devastates the entire family. We help establish healthy boundaries, end enabling patterns, and guide family members toward their own healing.
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
                  Hope for Philadelphia Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite Philadelphia's dire statistics, recovery happens every day. We've helped families from across the Delaware Valley guide their loved ones from the depths of addiction into treatment and lasting recovery. It's never too late—and it's never too early—to intervene.
                  </p>
                  <p>
                    The margin for error with fentanyl is razor-thin. Every day without intervention is another day your loved one risks fatal overdose. If someone you love in Philadelphia is struggling with addiction, the time to act is now.
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
              Get Help for Your Philadelphia Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another overdose. Our free, confidential consultation will help you understand your options and create a plan to save your loved one's life. We serve all of Philadelphia and the surrounding region including Bucks County, Montgomery County, Delaware County, Chester County, and South Jersey.
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

      <LocationLinks currentLocation="Philadelphia" locationType="city" />
      <Footer />
    </div>
  );
};

export default PhiladelphiaPennsylvania;
