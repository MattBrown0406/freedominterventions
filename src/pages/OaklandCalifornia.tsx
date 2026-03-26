import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import californiaBanner from "@/assets/california-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const OaklandCalifornia = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "California", href: "/california" },
    { name: "Oakland", href: "/oakland-california" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Oakland, California | Freedom Interventions"
        description="Oakland families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Alameda County. Free consultation. (541) 838-6009."
        keywords="Oakland addiction intervention, Oakland drug intervention, Oakland family intervention, intervention specialist Oakland CA, Alameda County interventionist, fentanyl intervention Oakland, Bay Area drug intervention"
        canonical="https://freedominterventions.com/oakland-california"
      />
      <LocalBusinessSchema location="Oakland" state="California" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={californiaBanner}
          alt="Oakland California and Bay Area addiction intervention services"
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
              Oakland, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Oakland's Overdose Emergency: Expert Intervention Services for Bay Area Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Oakland carries the Bay Area's highest overdose death rate—a devastating reality for families across Alameda County. With fentanyl and methamphetamine claiming lives in every neighborhood, from the hills to the flatlands, Oakland families need professional intervention support. Freedom Interventions brings compassionate, structured intervention services to help families break the cycle of addiction.
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
                  Understanding Oakland's Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Alameda County consistently records the highest overdose death rates in the Bay Area. The proliferation of fentanyl-laced drugs has turned even occasional drug use into a life-threatening gamble. Oakland's significant unhoused population—many fleeing addiction—compounds the crisis, while the city's socioeconomic disparities leave many families without access to treatment resources.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">700+</div>
                <p className="text-muted-foreground">Overdose deaths in Alameda County annually</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Highest</div>
                <p className="text-muted-foreground">Overdose rate in the Bay Area—Oakland leads all Bay Area counties</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                <p className="text-muted-foreground">Unhoused individuals in Oakland, many struggling with addiction</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From Fruitvale to Temescal, from Rockridge to East Oakland, the addiction crisis touches every Oakland neighborhood. Families in the hills and flatlands alike are watching loved ones disappear into addiction—and many don't know that a professional intervention could change the outcome.
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
                  How Addiction Affects Oakland Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Oakland's addiction crisis spans every community. Young adults experimenting with what they believe is a recreational substance encounter fentanyl-laced pills. Working families in East Oakland watch a family member spiral into meth addiction. Professionals in the hills hide alcoholism behind high-functioning careers.
                  </p>
                  <p>
                    The stigma surrounding addiction in Oakland's diverse communities—and the fear of involving law enforcement—keeps many families from seeking help until the situation becomes dire. By the time many families reach out, their loved one has lost a job, a home, or nearly their life.
                  </p>
                  <p>
                    Professional intervention changes the equation. Rather than waiting for rock bottom, an intervention creates a structured opportunity for your loved one to choose treatment—before the next overdose, arrest, or tragedy.
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
                  How Freedom Interventions Helps Oakland Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides specialized intervention services for Bay Area families. We understand Oakland's unique culture and the specific treatment resources available in Alameda County.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Connections:</strong> Oakland's treatment landscape includes Highland Hospital's addiction medicine services, UCSF Brickway Clinic, and Alameda County Behavioral Health Services. We connect families with the right level of care and navigate the complexities of accessing treatment quickly.
                  </p>
                  <p>
                    <strong className="text-foreground">Culturally Aware:</strong> Oakland's diverse communities require sensitivity and cultural awareness. Our approach respects the unique dynamics of each family while maintaining a firm, compassionate focus on recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help families understand enabling behaviors, establish healthy boundaries, and begin their own healing alongside their loved one's treatment journey.
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
                  Hope for Oakland Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in the face of Oakland's addiction crisis. We've helped families across the Bay Area—from Oakland to Berkeley, Fremont to Hayward—guide their loved ones into treatment and witnessed remarkable transformations.
                  </p>
                  <p>
                    You don't have to watch helplessly. A professional intervention gives your family the tools, structure, and support to create a turning point. Don't wait for the next crisis—reach out today.
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
              Get Help for Your Oakland Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Alameda County including Oakland, Berkeley, Fremont, Hayward, San Leandro, and surrounding communities.
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

      <LocationLinks currentLocation="Oakland" locationType="city" parentState="California" />
      <Footer />
    </div>
  );
};

export default OaklandCalifornia;
