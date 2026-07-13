import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import {
  BreadcrumbSchema,
  LocationFAQSchema,
  OrganizationSchema,
  ServiceAreaSchema,
} from "@/components/StructuredData";

const Alaska = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Interventionist Alaska | Family Addiction Help | Freedom Interventions"
        description="Need an interventionist in Alaska? Matt Brown helps families plan drug, alcohol, meth, and fentanyl interventions and treatment travel. Call (541) 668-8084."
        canonical="https://freedominterventions.com/alaska"
        keywords="interventionist Alaska, professional interventionist Alaska, Alaska drug intervention, Alaska alcohol intervention, Alaska family intervention, meth intervention Alaska, fentanyl intervention Alaska"
        geoRegion="US-AK"
        geoPlacename="Alaska"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Alaska"
        areaType="AdministrativeArea"
        url="https://freedominterventions.com/alaska"
        description="Professional addiction intervention services for Alaska families, including family preparation, treatment planning, intervention facilitation, and aftercare guidance."
      />
      <LocationFAQSchema location="Alaska" locationType="state" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Alaska", url: "https://freedominterventions.com/alaska" },
        ]}
      />
      <Navbar />
      <BreadcrumbNav
        items={[
          { name: "Service Areas", href: "/service-areas" },
          { name: "Alaska", href: "/alaska" },
        ]}
      />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Alaska Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Professional Interventionist in Alaska for Families Facing Addiction
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If your loved one is refusing treatment, start with a confidential call. Matt Brown helps Alaska families get aligned, prepare a drug or alcohol intervention, identify appropriate treatment, and plan the travel and timing before the family conversation happens.
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
                  Call (541) 668-8084
                </a>
              </Button>
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
                  Understanding Alaska's Unique Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Alaska's vast geography and remote communities create significant barriers to addiction treatment. Many residents must travel long distances to access care, and the state's isolation contributes to higher rates of substance abuse.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alcohol abuse remains particularly prevalent, alongside growing opioid and methamphetamine problems. The long, dark winters and isolation can exacerbate mental health issues that often co-occur with addiction.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  How Interventionists Help Alaska Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Matt works with Alaska families to coordinate the practical pieces before an intervention: who needs to participate, what the family will say, which boundaries can be held, where appropriate treatment is available, and how the loved one can get there if help is accepted.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Comprehensive Intervention Services
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Freedom Interventions supports the family from the first consultation through treatment planning, the intervention itself, and the transition into care. When local options are limited, the plan can include appropriate programs in the Lower 48 rather than leaving the family to solve placement and travel during a crisis.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Taking Action Today
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Do not begin with an unplanned confrontation. First, call to assess the risk, identify the family members who need to be aligned, and determine whether treatment and transportation should be ready now. If there is an overdose, immediate danger, or a medical emergency, call 911.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Get a Clear Intervention Plan for Your Alaska Family
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Tell Matt what is happening, what your loved one is using, and what the family has already tried. The next step is a confidential assessment of whether a professional intervention is appropriate now.
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
                Call (541) 668-8084
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

      <LocationLinks currentLocation="Alaska" locationType="state" />
      <Footer />
    </div>
  );
};

export default Alaska;