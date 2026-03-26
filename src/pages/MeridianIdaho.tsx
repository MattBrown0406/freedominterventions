import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import idahoBanner from "@/assets/idaho-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const MeridianIdaho = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Idaho", href: "/idaho" },
    { name: "Meridian", href: "/meridian-idaho" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Meridian, Idaho | Freedom Interventions"
        description="Meridian families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Ada County. Free consultation. (541) 838-6009."
        keywords="Meridian addiction intervention, Ada County drug intervention, Meridian family intervention, prescription opioid addiction Meridian, addiction help Meridian ID"
        canonical="https://freedominterventions.com/meridian-idaho"
      />
      <LocalBusinessSchema location="Meridian" state="Idaho" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={idahoBanner}
          alt="Idaho landscape representing Meridian and Ada County"
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
              Meridian, Idaho
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Meridian's Hidden Addiction Crisis: Professional Intervention for Ada County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Meridian is Idaho's fastest-growing city, but rapid suburban expansion brings its own addiction challenges. Behind the new subdivisions and shopping centers, prescription opioid and alcohol addiction are quietly devastating Ada County families. Freedom Interventions provides expert guidance to help Meridian families navigate this crisis.
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
                  Understanding Ada County's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  With over 125,000 residents and rapid population growth, Meridian faces mounting addiction challenges that often go unnoticed in the affluent suburban landscape. Prescription opioid misuse and alcohol dependency are prevalent among working professionals and parents, while the city's youth face increasing exposure to fentanyl-laced substances.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">125k+</div>
                <p className="text-muted-foreground">Residents making Meridian Idaho's second-largest city</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rising</div>
                <p className="text-muted-foreground">Prescription opioid misuse rates in Ada County suburbs</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Hidden</div>
                <p className="text-muted-foreground">High-functioning addiction among suburban professionals</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Meridian's suburban success story can mask the reality of addiction. High-functioning individuals maintain careers and family appearances while quietly battling dependency. By the time families recognize the severity of the problem, crisis is often imminent.
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
                  How Addiction Affects Meridian Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Meridian's family-focused suburban culture, addiction often hides behind a mask of normalcy. A parent managing chronic pain becomes dependent on prescription opioids. A professional using alcohol to decompress develops a serious dependency. The suburban setting creates unique barriers to recognizing and addressing addiction.
                  </p>
                  <p>
                    Many Meridian families delay intervention because the addict continues to function—holding a job, maintaining a home, attending kids' events. This "functional addiction" can be deceptive and dangerous, as the underlying disease continues to progress.
                  </p>
                  <p>
                    Without professional guidance, families often enable their loved one's addiction through well-meaning but counterproductive behavior, prolonging the crisis and delaying necessary treatment.
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
                  How Freedom Interventions Helps Meridian Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown specializes in helping families with high-functioning addiction—one of the most common and most challenging situations in suburban communities like Meridian.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We connect families with St. Luke's Meridian, Optum Idaho behavioral health services, Safe Harbor treatment programs, and residential care options throughout the Treasure Valley.
                  </p>
                  <p>
                    <strong className="text-foreground">Discreet Service:</strong> We understand that privacy matters in Meridian's close-knit suburban neighborhoods. Our confidential approach protects your family while getting your loved one the help they need.
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
                  Hope for Meridian and Ada County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even for high-functioning addicts who believe they don't have a problem. We've helped Ada County families break through denial and guide their loved ones into treatment.
                  </p>
                  <p>
                    Key local resources include St. Luke's Meridian (medical), Optum Idaho (behavioral health), and Safe Harbor (residential treatment). When specialized care is needed, we connect families with top treatment centers throughout the region.
                  </p>
                  <p>
                    Don't let the illusion of functionality delay critical action. Professional intervention can be the turning point your Meridian family needs.
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
              Get Help for Your Ada County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Ada County including Meridian, Eagle, Star, Kuna, and surrounding communities.
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

      <LocationLinks currentLocation="Meridian" locationType="city" />
      <Footer />
    </div>
  );
};

export default MeridianIdaho;
