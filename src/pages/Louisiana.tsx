import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema, LocationFAQSchema } from "@/components/StructuredData";

const Louisiana = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Drug Intervention in Louisiana | Family Intervention Help"
        description="Need a drug intervention in Louisiana? Matt Brown helps families plan treatment entry, boundaries, and next steps. Call (541) 668-8084."
        canonical="https://freedominterventions.com/louisiana"
        keywords="drug intervention Louisiana, Louisiana professional interventionist, Louisiana addiction intervention, Louisiana family intervention, fentanyl intervention Louisiana, alcohol intervention Louisiana"
        geoRegion="US-LA"
        geoPlacename="Louisiana"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Louisiana"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/louisiana"
        description="Professional drug and alcohol intervention services for families across Louisiana, including intervention preparation, treatment planning, and family guidance."
      />
      <LocationFAQSchema location="Louisiana" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Louisiana", url: "https://freedominterventions.com/louisiana" },
        ]}
      />
      <Navbar />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Louisiana Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Drug Intervention in Louisiana for Families Who Need Help Now
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If your family needs a drug intervention in Louisiana, Matt Brown helps you prepare the conversation, coordinate treatment entry, and stop the cycle of fear, rescuing, and relapse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,800+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">250K+</div>
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
                  Louisiana's Drug Crisis
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Louisiana has seen dramatic increases in overdose deaths, with fentanyl and cocaine driving the crisis. New Orleans and Baton Rouge have been particularly affected.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  When to Call a Professional Interventionist in Louisiana
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Call when fentanyl, opioids, cocaine, alcohol, or repeated relapse have the family reacting from crisis to crisis. A professional interventionist helps Louisiana families create a treatment-ready plan and a unified message.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Culturally Sensitive Care
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Intervention services respect Louisiana's unique cultural traditions while providing evidence-based approaches to help families guide loved ones toward recovery.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Begin Recovery Today
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional intervention provides Louisiana families with the structure and expertise needed to help loved ones break free from addiction.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hope for Louisiana Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention services have helped countless Louisiana families find a way forward. Take the first step today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/book-intervention-consultation#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Book Confidential Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:458-298-8000">
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

export default Louisiana;
