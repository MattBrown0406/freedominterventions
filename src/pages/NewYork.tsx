import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const NewYork = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="New York Addiction Intervention Services | Freedom Interventions"
        description="New York faces severe opioid and fentanyl challenges. Professional interventionists help families navigate addiction and find recovery."
        canonical="https://freedominterventions.com/new-york"
        keywords="New York addiction intervention, NYC intervention services, New York opioid crisis, Long Island drug intervention"
        geoRegion="US-NY"
        geoPlacename="New York"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="New York" state="NY" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "New York", url: "https://freedominterventions.com/new-york" },
        ]}
      />
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "New York", href: "/new-york" },
      ]} />
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">New York Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">New York's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">New York faces severe opioid and fentanyl challenges. Professional interventionists help families find recovery.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
              <Button asChild variant="outline" size="lg"><a href="tel:503-836-2136"><Phone className="mr-2 h-5 w-5" />Call (503) 836-2136</a></Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for New York Families</h2>
          <p className="text-lg opacity-90 mb-8">Professional intervention services offer families a proven path to recovery.</p>
          <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
        </div>
      </section>
      <LocationLinks currentLocation="New York" locationType="state" />
      <Footer />
    </div>
  );
};
export default NewYork;