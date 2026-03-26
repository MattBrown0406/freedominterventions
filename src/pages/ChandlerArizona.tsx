import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import arizonaBanner from "@/assets/arizona-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const ChandlerArizona = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Arizona", href: "/arizona" },
    { name: "Chandler", href: "/chandler-arizona" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Chandler, Arizona | Freedom Interventions"
        description="Chandler families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Maricopa County. Free consultation. (541) 838-6009."
        keywords="Chandler addiction intervention, Maricopa County drug intervention, Chandler family intervention, tech corridor suburban addiction Chandler AZ, intervention services Chandler Arizona"
        canonical="https://freedominterventions.com/chandler-arizona"
      />
      <LocalBusinessSchema location="Chandler" state="Arizona" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={arizonaBanner}
          alt="Arizona landscape representing Chandler and Maricopa County"
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
              Chandler, Arizona
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Chandler's Tech Corridor Addiction Crisis: Expert Intervention for Maricopa County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Chandler's reputation as Arizona's tech corridor hides a growing addiction problem in its 275,000-resident suburban community. Behind the Intel campuses and Intel fabs, suburban addiction—from prescription opioids and alcohol to stimulant dependency among high-achieving professionals—quietly devastates Chandler families. Freedom Interventions provides the professional expertise to help Chandler families navigate this hidden crisis.
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
                  Understanding Suburban Addiction in Chandler
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chandler's affluent, tech-oriented community faces the same addiction dynamics as other prosperous suburbs—but with the added pressure of high-performance professional culture. Prescription stimulant misuse, alcohol dependency, and prescription opioid addiction are prevalent among Chandler's professional workforce. Meanwhile, Maricopa County's broader fentanyl and meth crisis doesn't stop at Chandler's city limits.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Hidden</div>
                <p className="text-muted-foreground">High-functioning addiction among Chandler's professional workforce</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Growing</div>
                <p className="text-muted-foreground">Suburban fentanyl and meth exposure among Chandler youth</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Delayed</div>
                <p className="text-muted-foreground">Treatment-seeking due to career concerns and social stigma</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Chandler's professional culture creates barriers to addiction recognition. Employees fear job loss if addiction becomes known. Executives use substances to manage stress and maintain performance. Families protect a loved one's career while the addiction deepens. Without professional intervention, these dynamics sustain addiction for years longer than necessary.
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
                  How Addiction Affects Chandler Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Chandler's achievement-oriented community, addiction often begins with performance pressure—a professional starts using stimulants to keep up with demanding work schedules, or turns to alcohol to decompress from high-stress jobs. Over time, what starts as functional use becomes dependency.
                  </p>
                  <p>
                    Spouses cover for their partner's addiction to protect the family's financial stability. Children grow up in households where substances are used to manage emotions. The suburban setting provides both the resources to sustain addiction and the privacy to hide it.
                  </p>
                  <p>
                    Professional intervention is often the only way to break through the denial and enabling patterns that Chandler families unconsciously maintain in the name of protecting career and family reputation.
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
                  How Freedom Interventions Helps Chandler Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown specializes in suburban and professional addiction intervention—the type most common in communities like Chandler. With over 20 years of experience, we know how to navigate the complex dynamics of career protection, family enabling, and high-functioning denial.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We connect Chandler families with Chandler Regional Medical Center, Dignity Health, Copa Health (comprehensive behavioral health), and treatment programs throughout the east valley and greater Maricopa County.
                  </p>
                  <p>
                    <strong className="text-foreground">Professional Sensitivity:</strong> We understand careers and reputations matter. Our approach protects your loved one's professional standing while creating the path to recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help Chandler families stop enabling, set effective boundaries, and build the conditions for lasting recovery without sacrificing everything your family has built.
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
                  Hope for Chandler and Maricopa County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, and careers can survive—and even be strengthened by—addressing addiction honestly and professionally. We've helped Chandler families guide their loved ones into recovery while navigating the professional and social complexities of suburban Arizona.
                  </p>
                  <p>
                    Key local resources include Chandler Regional Medical Center (medical), Dignity Health behavioral services, and Copa Health (comprehensive mental health and addiction services). We also connect families with specialized residential programs throughout Arizona.
                  </p>
                  <p>
                    Don't let career concerns delay critical action. The longer addiction continues, the more career and family damage accumulates. Act now.
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
              Get Help for Your Chandler Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Chandler and surrounding Maricopa County communities including Gilbert, Queen Creek, Sun Lakes, and the southeast valley.
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

      <LocationLinks currentLocation="Chandler" locationType="city" />
      <Footer />
    </div>
  );
};

export default ChandlerArizona;
