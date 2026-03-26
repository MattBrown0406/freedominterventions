import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import cityBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const MedfordOregon = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oregon", href: "/oregon" },
    { name: "Medford", href: "/medford-oregon" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Medford, Oregon | Freedom Interventions"
        description="Medford families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Jackson County. Free consultation. (541) 838-6009."
        keywords="Medford Oregon addiction intervention, drug intervention Medford OR, alcohol intervention Medford, family intervention Medford Oregon, Jackson County interventionist, Southern Oregon drug intervention, Rogue Valley addiction help, professional intervention Medford"
        canonical="https://freedominterventions.com/medford-oregon"
      />
      <LocalBusinessSchema location="Medford" state="Oregon" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Southern Oregon Rogue Valley landscape near Medford"
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
              Medford, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Medford Addiction Intervention Specialist: Southern Oregon Families Get Help Now
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Medford and the Rogue Valley carry some of Oregon's highest per-capita drug use rates. Jackson County families dealing with addiction face a landscape where isolation, limited treatment options, and the opioid-to-fentanyl pipeline have created a devastating public health emergency. Freedom Interventions brings certified, compassionate help directly to Southern Oregon.
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
                  The Rogue Valley's Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Medford, a city of approximately 85,000 in Jackson County, has long struggled with substance use disorders at rates that outpace Oregon's already-elevated statewide averages. The Rogue Valley's economic challenges, rural isolation, and proximity to major drug trafficking corridors have combined to create a crisis that requires professional intervention.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 3</div>
                <p className="text-muted-foreground">Jackson County ranks among Oregon's highest per-capita drug use counties</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">400%</div>
                <p className="text-muted-foreground">Increase in fentanyl-related overdose deaths in Southern Oregon since 2020</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">60%</div>
                <p className="text-muted-foreground">Of Jackson County residents needing SUD treatment who don't receive it</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The Rogue Valley's rural character means that while Medford serves as the regional hub, families in Ashland, Jacksonville, Central Point, White City, and Grants Pass also struggle to access adequate treatment. Geographic isolation amplifies the need for professional intervention that can navigate regional resources effectively.
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
                  How Addiction Affects Medford Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Jackson County's economic instability—with agriculture, timber, and tourism as primary industries—creates vulnerability to substance abuse. High unemployment, housing insecurity, and wildfire-related trauma have intensified addiction rates in recent years.
                  </p>
                  <p>
                    The transition from prescription opioids to heroin and then to fentanyl has devastated communities across the Rogue Valley. What began as pain management for workers injured in physically demanding jobs has spiraled into fatal dependency for thousands of families.
                  </p>
                  <p>
                    Methamphetamine remains heavily prevalent throughout Jackson County, with production and distribution networks well-established in rural areas surrounding Medford. Families often wait years before seeking help, enabling the disease to progress to dangerous levels.
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
                  How Freedom Interventions Helps Medford Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown, a certified intervention specialist with over 20 years of experience, provides comprehensive intervention services for Medford and Southern Oregon families. We understand the Rogue Valley's treatment landscape and how to navigate it effectively.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Connections:</strong> We work with Southern Oregon treatment providers including <strong className="text-foreground">OnTrack Rogue Valley</strong>, a leading Jackson County substance use disorder treatment program offering residential and outpatient services, and <strong className="text-foreground">AllCare Health</strong>, a Coordinated Care Organization serving Jackson County with integrated behavioral health and SUD treatment services.
                  </p>
                  <p>
                    <strong className="text-foreground">Southern Oregon Expertise:</strong> We understand the specific barriers Rogue Valley families face—geographic isolation, limited detox beds, and the need to sometimes access treatment outside the region for appropriate level of care.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Recovery:</strong> Beyond getting your loved one into treatment, we help your entire family understand the dynamics of addiction and begin healing together.
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
                  Hope for Southern Oregon Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the severity of Medford's addiction crisis, recovery is absolutely possible. We've guided families throughout Southern Oregon—from Medford to Ashland, Central Point to Grants Pass—through intervention and into sustainable recovery.
                  </p>
                  <p>
                    The first step is a confidential conversation. You don't have to have all the answers, and your loved one doesn't have to be "ready." Our job is to create the conditions for readiness—and we're very good at it.
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
              Get Help for Your Southern Oregon Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for the next overdose or arrest. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Jackson County including Medford, Ashland, Jacksonville, Central Point, White City, Eagle Point, and surrounding communities.
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


      <LocationLinks currentLocation="Medford" locationType="city" parentState="Oregon" />
      <Footer />
    </div>
  );
};

export default MedfordOregon;
