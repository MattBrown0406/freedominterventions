import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from "@/components/StructuredData";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";

const NewfoundlandLabrador = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Newfoundland & Labrador", href: "/newfoundland-labrador" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Newfoundland & Labrador", url: "https://freedominterventions.com/newfoundland-labrador" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Newfoundland & Labrador Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Newfoundland and Labrador, Canada. Help your loved one find recovery from opioid and drug addiction. Serving St. John's and all NL communities."
        canonical="https://freedominterventions.com/newfoundland-labrador"
        keywords="Newfoundland addiction intervention, St Johns drug intervention, Labrador family intervention, opioid crisis Newfoundland, addiction help NL Canada"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Newfoundland and Labrador" state="Canada" />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Newfoundland & Labrador Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Newfoundland & Labrador's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Newfoundland and Labrador faces unique challenges combating addiction in remote communities. The opioid crisis has reached this easternmost province, affecting families from St. John's to Labrador.
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

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for Newfoundland & Labrador Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention offers a structured, compassionate path to treatment. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Newfoundland and Labrador" locationType="province" />
      <Footer />
    </div>
  );
};

export default NewfoundlandLabrador;