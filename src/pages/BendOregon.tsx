import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import bendBanner from "@/assets/bend-oregon-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const BendOregon = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oregon", href: "/oregon" },
    { name: "Bend", href: "/bend-oregon" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Bend Oregon Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Bend, Oregon. Help your loved one find recovery from opioid, alcohol, and methamphetamine addiction. Free consultations available."
        keywords="Bend addiction intervention, Central Oregon drug intervention, Bend family intervention, opioid crisis Bend, addiction help Bend OR"
        canonical="https://freedominterventions.com/bend-oregon"
      />
      <LocalBusinessSchema location="Bend" state="Oregon" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={bendBanner} 
          alt="Bend Oregon landscape with Cascade Mountains and Deschutes River" 
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
              Bend, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Bend's Hidden Addiction Crisis: Professional Intervention Services for Central Oregon Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Behind Bend's outdoor paradise reputation lies a growing addiction crisis. With overdose rates rising and substance abuse affecting families across all demographics, Central Oregon families need professional guidance. Freedom Interventions provides compassionate, effective intervention services throughout Deschutes County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:503-836-2136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
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
                  Understanding Central Oregon's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Deschutes County has seen a significant increase in overdose deaths and substance abuse. The region's resort town atmosphere can mask the severity of addiction problems, while limited local treatment options create additional barriers to recovery for affected families.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">65+</div>
                <p className="text-muted-foreground">Overdose deaths in Deschutes County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">180%</div>
                <p className="text-muted-foreground">Increase in fentanyl-related deaths since 2019</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#2</div>
                <p className="text-muted-foreground">Highest alcohol consumption rate in Oregon</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Bend's culture of outdoor recreation and craft breweries contributes to normalized alcohol consumption, while the influx of synthetic opioids has created a deadly new threat. From the Old Mill District to the Westside, from Sunriver to Redmond, addiction is affecting families across Central Oregon.
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
                  How Addiction Affects Bend Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Bend's affluent, health-conscious community often struggles to acknowledge addiction. Professional families hide substance abuse behind successful careers. Young adults who came for the outdoor lifestyle develop dependencies on alcohol or opioids. The resort town's transient population can enable addiction to flourish unnoticed.
                  </p>
                  <p>
                    The shame of addiction in a community that celebrates wellness and outdoor activity prevents many families from seeking help. The belief that their loved one will simply "choose" to get better delays critical intervention until crisis strikes.
                  </p>
                  <p>
                    Whether your loved one is a ski instructor struggling with opioids or a tech professional hiding alcoholism, Freedom Interventions understands the unique dynamics of addiction in Bend's community.
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
                  How Freedom Interventions Helps Bend Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Based in Oregon with over 20 years of experience, Freedom Interventions provides specialized intervention services for Central Oregon families. We understand Bend's unique culture and the specific treatment resources available in the region.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Expertise:</strong> We know Central Oregon's treatment landscape, from local detox options to residential programs throughout the Pacific Northwest. When local resources are limited, we connect families with appropriate care statewide and nationally.
                  </p>
                  <p>
                    <strong className="text-foreground">Discreet Service:</strong> We understand that privacy matters in tight-knit communities like Bend. Our confidential approach protects your family's reputation while getting your loved one the help they need.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the entire family establish healthy boundaries, end enabling behaviors, and begin their own recovery journey alongside their loved one.
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
                  Hope for Central Oregon Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in the midst of crisis. We've helped families throughout Central Oregon—from Bend to Redmond, Sisters to Sunriver—guide their loved ones into treatment and witnessed life-changing transformations.
                  </p>
                  <p>
                    Don't let the outdoor paradise illusion prevent you from seeing the reality of your loved one's addiction. The time to act is before the next overdose, accident, or crisis. Professional intervention can be the turning point your family needs.
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
              Get Help for Your Central Oregon Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Central Oregon including Bend, Redmond, Sisters, Sunriver, La Pine, Prineville, and Madras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:503-836-2136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Bend" locationType="city" />
      <Footer />
    </div>
  );
};

export default BendOregon;
