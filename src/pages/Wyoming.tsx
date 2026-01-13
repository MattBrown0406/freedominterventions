import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const Wyoming = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Wyoming Addiction Intervention Services"
        description="Professional intervention services for Wyoming families. Expert interventionists help loved ones find treatment across the Equality State."
        canonical="https://freedominterventions.com/wyoming"
        keywords="Wyoming intervention, addiction help WY, interventionist Cheyenne, drug intervention Casper, Laramie addiction help"
        geoRegion="US-WY"
        geoPlacename="Wyoming"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Wyoming" state="WY" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "Wyoming", url: "https://freedominterventions.com/wyoming" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Wyoming", href: "/wyoming" }
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">Wyoming Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Wyoming's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">Wyoming families face addiction challenges. Professional interventionists help find treatment solutions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
              <Button asChild variant="outline" size="lg"><a href="tel:503-836-2136"><Phone className="mr-2 h-5 w-5" />Call (503) 836-2136</a></Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for Wyoming Families</h2>
          <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
        </div>
      </section>
      
      <LocationLinks currentLocation="Wyoming" locationType="state" />
      <Footer />
    </div>
  );
};

export default Wyoming;