import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import californiaBanner from "@/assets/california-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";

const California = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="California Addiction Intervention Services | Freedom Interventions"
        description="California faces the nation's most severe addiction crisis with over 9,000 overdose deaths annually. Professional interventionists provide families with structured, compassionate strategies."
        canonical="https://freedominterventions.com/california"
        keywords="California addiction intervention, Los Angeles intervention services, San Francisco drug intervention, California fentanyl crisis"
        geoRegion="US-CA"
        geoPlacename="California"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Los Angeles" state="CA" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "California", url: "https://freedominterventions.com/california" },
        ]}
      />
      <Navbar />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={californiaBanner} 
            alt="California coastal landscape symbolizing hope and recovery" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            California's Addiction Crisis: How Professional Interventionists Help Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            California faces the nation's most severe addiction crisis with over 9,000 overdose deaths annually—more than any other state. Professional interventionists provide families with structured, compassionate strategies to guide loved ones toward recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <a href="tel:+15038362136">
                <Phone className="mr-2 h-5 w-5" />
                Call (503) 836-2136
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">9,000+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">9,050%</div>
              <div className="text-sm text-muted-foreground">Fentanyl Death Rate Increase</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">53,000+</div>
              <div className="text-sm text-muted-foreground">Nonfatal ER Overdoses</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">19,335</div>
              <div className="text-sm text-muted-foreground">Annual Alcohol Deaths</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Scope of Crisis */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                The Scope of California's Addiction Crisis
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  California is currently grappling with a severe and complex addiction crisis, accounting for over 12% of all U.S. overdose fatalities. In 2023 alone, 7,560 Californians died from opioid-related overdoses, with the fentanyl death rate increasing dramatically from 0.2 per 100,000 population in 2013 to 18.3 in 2023.
                </p>
                <p>
                  Methamphetamine and psychostimulant-related deaths have also surged, reflecting an evolving and multifaceted substance use landscape. Emergency departments recorded over 53,000 drug-related nonfatal overdoses, highlighting the ongoing pressure on healthcare resources.
                </p>
                <p>
                  Alcohol-related harms remain significant as well. An estimated 19,335 annual alcohol-attributable deaths occurred between 2020 and 2021, with males representing the majority of these fatalities. These statistics illustrate the profound health and social impacts of substance use disorder across California, affecting individuals, families, and communities alike.
                </p>
              </div>
            </div>

            {/* Family Impact */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Addiction Impacts California Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  In the face of this public health crisis, families frequently confront the devastating effects of addiction within their homes. Substance use disorders often precipitate or coincide with legal problems, including DUI arrests and related fatalities, which have far-reaching emotional and financial consequences.
                </p>
                <p>
                  Families may find themselves caught between wanting to help their loved ones and facing the seemingly insurmountable challenge of motivating them toward treatment. Without professional guidance, well-intentioned family efforts often fail against entrenched denial and resistance.
                </p>
              </div>
            </div>

            {/* Role of Interventionists */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                The Critical Role of Professional Interventionists
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Professional interventionists play a critical role in bridging this gap. They bring expertise in addiction and behavioral health, offering families structured, compassionate strategies to engage their loved ones in recovery. By assessing the individual's specific circumstances and tailoring approaches accordingly, interventionists significantly increase the likelihood of treatment entry and sustained engagement.
                </p>
                <p>
                  California's diverse geography and population necessitate interventions customized to local resource availability and cultural factors. Interventionists coordinate with various treatment providers ranging from detoxification centers and inpatient rehabs to outpatient programs and sober living facilities, ensuring a continuum of care suited to each case.
                </p>
              </div>
            </div>

            {/* Comprehensive Support */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Comprehensive Support Through Complex Systems
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists facilitate seamless transitions by helping families and clients navigate complex healthcare and legal systems. They collaborate closely with treatment teams to plan aftercare, including therapy and support groups such as Alcoholics Anonymous or Narcotics Anonymous, which are critical components for long-term recovery.
                </p>
                <p>
                  Given California's expansive opioid epidemic and the rise of synthetic drug use, timely intervention is pivotal. Interventionists can also assist families with navigating legal avenues related to addiction when resistance to treatment is present, including leveraging civil commitment laws that vary by county.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in California
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Assessment</h3>
                    <p className="text-muted-foreground">Comprehensive evaluation of your loved one's specific circumstances using proven clinical criteria.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tailored Strategies</h3>
                    <p className="text-muted-foreground">Customized approaches that account for California's diverse geography, resources, and cultural factors.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Coordination</h3>
                    <p className="text-muted-foreground">Connections to detox centers, inpatient rehabs, outpatient programs, and sober living facilities statewide.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Legal Navigation</h3>
                    <p className="text-muted-foreground">Guidance through complex healthcare and legal systems, including county-specific civil commitment options.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Collaboration with treatment teams for ongoing therapy, AA/NA participation, and long-term recovery support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Path Forward */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                A Path Toward Hope and Recovery
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  For families confronting the challenges of addiction, seeking the guidance of a professional interventionist offers a path toward hope and recovery. Through expertise, empathy, and strategic planning, these specialists empower families to help their loved ones break free from substance use disorders, improving outcomes not just for individuals but for communities statewide.
                </p>
                <p>
                  If your family is facing the difficulties posed by addiction, consider consulting with a professional interventionist who can provide personalized support and guidance tailored to California's unique challenges and resources. Recovery starts with a single, informed step.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Take the First Step for Your California Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Professional intervention significantly increases the likelihood of treatment entry. Reach out today for a confidential consultation tailored to California's resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:+15038362136">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="California" locationType="state" />

      <Footer />
    </div>
  );
};

export default California;
