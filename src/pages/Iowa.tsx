import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema, LocationFAQSchema } from "@/components/StructuredData";

const Iowa = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Drug Intervention in Iowa | Professional Interventionist for Families"
        description="Need a drug intervention in Iowa? Matt Brown helps families plan treatment entry, boundaries, and intervention next steps. Call (541) 668-8084."
        canonical="https://freedominterventions.com/iowa"
        keywords="drug intervention Iowa, Iowa professional interventionist, Iowa addiction intervention, Iowa family intervention, alcohol intervention Iowa, meth intervention Iowa, fentanyl intervention Iowa"
        geoRegion="US-IA"
        geoPlacename="Iowa"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Iowa"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/iowa"
        description="Professional drug and alcohol intervention services for families across Iowa, including intervention preparation, treatment planning, and family guidance."
      />
      <LocationFAQSchema location="Iowa" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Iowa", url: "https://freedominterventions.com/iowa" },
        ]}
      />
      <Navbar />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Iowa Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Drug Intervention in Iowa for Families Who Need a Real Plan
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If your family needs a drug intervention in Iowa, Matt Brown helps you prepare the conversation, line up treatment, and set boundaries before another crisis narrows your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-668-8084">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Matt Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">150K+</div>
              <div className="text-sm text-muted-foreground">Residents Affected</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Iowa's Drug Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Iowa has seen significant increases in methamphetamine and fentanyl-related deaths. Rural communities face particular challenges accessing treatment resources.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  When to Call a Professional Interventionist in Iowa
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Call when meth, fentanyl, alcohol, pills, or repeated relapse have put the family into crisis management mode. A professional interventionist helps Iowa families get aligned, treatment-ready, and clear about what changes if help is refused.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Family-Centered Care
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Intervention services include family education, treatment coordination, and ongoing support to help Iowa families heal together.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Start the Recovery Process
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional intervention gives Iowa families the tools and guidance needed to help loved ones find lasting recovery.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hope for Iowa Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention services offer Iowa families a proven path to help loved ones find recovery. Contact us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/book-intervention-consultation#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Book Confidential Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:541-668-8084">
                <Phone className="mr-2 h-5 w-5" />
                Call Matt Now
              </a>
            </Button>
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


      <Footer />
    </div>
  );
};

export default Iowa;
