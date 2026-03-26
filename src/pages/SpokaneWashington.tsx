import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import spokaneBanner from "@/assets/spokane-washington-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const SpokaneWashington = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Washington", href: "/washington" },
    { name: "Spokane", href: "/spokane-washington" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Spokane Washington Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Spokane, Washington. Help your loved one find recovery from opioid, methamphetamine, and alcohol addiction. Free consultations available."
        keywords="Spokane addiction intervention, Washington drug intervention, Spokane family intervention, opioid crisis Spokane, addiction help Spokane WA"
        canonical="https://freedominterventions.com/spokane-washington"
      />
      <LocalBusinessSchema location="Spokane" state="Washington" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={spokaneBanner} 
          alt="Spokane Washington cityscape with Spokane Falls and clock tower" 
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
              Spokane, Washington
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Spokane's Addiction Crisis: Professional Intervention Services for Inland Northwest Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Spokane and the Inland Northwest face escalating addiction challenges. With fentanyl flooding the region and overdose deaths climbing, families need professional guidance to help their loved ones find recovery. Freedom Interventions provides compassionate, effective intervention services throughout Eastern Washington.
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
                  Understanding Spokane's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Spokane County has experienced a dramatic surge in overdose deaths, driven by the influx of fentanyl and continued methamphetamine abuse. The region's position along major drug trafficking routes has made it particularly vulnerable to the synthetic opioid crisis devastating communities across America.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <p className="text-muted-foreground">Overdose deaths in Spokane County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">78%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">45%</div>
                <p className="text-muted-foreground">Increase in meth seizures since 2020</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The combination of geographic isolation, limited treatment resources, and the deadly potency of street drugs has created a crisis for Spokane families. From the South Hill to the Valley, from downtown to the surrounding rural communities, addiction is tearing families apart.
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
                  How Addiction Affects Spokane Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Spokane's strong sense of community and family values makes watching a loved one struggle with addiction particularly painful. Parents in neighborhoods like Manito, Five Mile, and the South Perry District are discovering their children addicted to fentanyl. Working families are losing members to overdoses at unprecedented rates.
                  </p>
                  <p>
                    The tight-knit nature of Spokane's communities can create additional shame and stigma, preventing families from seeking the help they desperately need. Many believe they can handle the problem privately, not understanding that addiction requires professional intervention.
                  </p>
                  <p>
                    Whether your loved one is struggling on the streets of downtown Spokane or hiding their addiction in suburban Spokane Valley, Freedom Interventions understands the unique challenges Inland Northwest families face.
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
                  How Freedom Interventions Helps Spokane Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience helping families throughout the Pacific Northwest, Freedom Interventions provides comprehensive intervention services tailored to Spokane-area families. We understand Eastern Washington's culture and the treatment resources available in the region.
                  </p>
                  <p>
                    <strong className="text-foreground">Regional Expertise:</strong> We know which treatment facilities serve the Spokane area effectively, understand the unique challenges of rural and suburban Eastern Washington, and can coordinate care across state lines when needed.
                  </p>
                  <p>
                    <strong className="text-foreground">Responsive Service:</strong> When your family is ready to act, we can mobilize quickly. Our experience in the Pacific Northwest means we understand the urgency and can be on-site when it matters most.
                  </p>
                  <p>
                    <strong className="text-foreground">Family-Centered Approach:</strong> We help the entire family heal—establishing healthy boundaries, ending enabling patterns, and supporting everyone's recovery journey.
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
                  Hope for Spokane Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the challenging statistics, recovery is happening every day in Spokane. We've helped families throughout the Inland Northwest guide their loved ones into treatment and watched remarkable transformations unfold.
                  </p>
                  <p>
                    The key is taking action before tragedy strikes. With fentanyl present in nearly every street drug, the risk of fatal overdose has never been higher. If someone you love in Spokane is struggling with addiction, don't wait for rock bottom—it may be too late.
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
              Get Help for Your Spokane Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Spokane County including Spokane Valley, Liberty Lake, Cheney, Medical Lake, and surrounding communities.
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


      <LocationLinks currentLocation="Spokane" locationType="city" />
      <Footer />
    </div>
  );
};

export default SpokaneWashington;
