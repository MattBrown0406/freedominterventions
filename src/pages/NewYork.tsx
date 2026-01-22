import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, TrendingUp, Heart } from "lucide-react";
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
        description="New York faces severe opioid and fentanyl challenges with thousands of annual overdose deaths. Professional interventionists help Empire State families navigate addiction and find recovery."
        canonical="https://freedominterventions.com/new-york"
        keywords="New York addiction intervention, NYC intervention services, New York opioid crisis, Long Island drug intervention, Buffalo addiction help, Albany intervention"
        geoRegion="US-NY"
        geoPlacename="New York"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="New York City" state="NY" />
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
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">New York Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">New York's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">New York State has one of the highest overdose death tolls in the nation. Professional interventionists help families across the Empire State find pathways to treatment and recovery.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
              <Button asChild variant="outline" size="lg"><a href="tel:541-838-6009"><Phone className="mr-2 h-5 w-5" />Call (541) 838-6009</a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">5,800+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">29.8</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K Residents</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <Users className="h-8 w-8 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">1.5M+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">80%+</div>
              <div className="text-sm text-muted-foreground">Opioid-Related Deaths</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Understanding New York's Addiction Epidemic</h2>
              <p className="text-muted-foreground mb-4">
                New York State faces one of the nation's most severe addiction crises. While New York City captures headlines, the epidemic impacts every region—from Long Island to Buffalo, from the Hudson Valley to the Adirondacks.
              </p>
              <p className="text-muted-foreground">
                Fentanyl has transformed the crisis, with the synthetic opioid now present in the majority of overdose deaths. The state's diverse population and geography create unique challenges for treatment access and intervention.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Treatment Landscape</h2>
              <p className="text-muted-foreground mb-4">
                New York has extensive treatment resources, but navigating the system is overwhelming for most families. Wait times, insurance barriers, and quality variations make finding appropriate care difficult.
              </p>
              <p className="text-muted-foreground">
                Professional interventionists help families cut through the complexity and find treatment that matches their loved one's specific needs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How Addiction Affects New York Families</h2>
              <p className="text-muted-foreground mb-4">
                The impact of addiction reverberates through families across the state:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>High cost of living compounded by addiction-related financial losses</li>
                <li>Family relationships strained or destroyed</li>
                <li>Children growing up with addicted parents</li>
                <li>Loss of promising careers and opportunities</li>
                <li>Communities grappling with overdose deaths</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Role of a Professional Interventionist</h2>
              <p className="text-muted-foreground mb-4">
                Professional intervention provides structure and expertise for families in crisis:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Pre-intervention family education and preparation</li>
                <li>Strategic planning tailored to your situation</li>
                <li>Facilitated intervention conversation</li>
                <li>Treatment matching and placement coordination</li>
                <li>Ongoing family support throughout recovery</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why New York Families Choose Professional Help</h2>
              <p className="text-muted-foreground mb-4">
                Families across New York seek intervention assistance when:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Previous attempts to help have failed</li>
                <li>The family can't agree on an approach</li>
                <li>Overdose risk is escalating</li>
                <li>They need help navigating treatment options</li>
                <li>Their loved one refuses to acknowledge the problem</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">A Path Forward for Empire State Families</h2>
              <p className="text-muted-foreground mb-4">
                Recovery is possible for New York families. Whether you're in Manhattan or a small upstate town, professional intervention can help your family take the first steps toward healing.
              </p>
              <p className="text-muted-foreground">
                A free consultation helps you understand your options and develop a plan that works for your unique circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for New York Families</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Don't let another day pass without taking action. Professional intervention can be the turning point your family needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="tel:541-838-6009"><Phone className="mr-2 h-5 w-5" />Call Now</a></Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="New York" locationType="state" />
      <Footer />
    </div>
  );
};

export default NewYork;
