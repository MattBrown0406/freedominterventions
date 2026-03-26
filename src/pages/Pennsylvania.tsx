import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const Pennsylvania = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pennsylvania Addiction Intervention Services | Freedom Interventions"
        description="Pennsylvania has one of the highest overdose death rates in the nation. Professional interventionists help families navigate treatment options throughout the Keystone State."
        canonical="https://freedominterventions.com/pennsylvania"
        keywords="Pennsylvania intervention, addiction help Pennsylvania, interventionist PA, drug intervention Pittsburgh, Philadelphia addiction help, opioid crisis Pennsylvania"
        geoRegion="US-PA"
        geoPlacename="Pennsylvania"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Philadelphia" state="PA" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "Pennsylvania", url: "https://freedominterventions.com/pennsylvania" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Pennsylvania", href: "/pennsylvania" }
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">Pennsylvania Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Pennsylvania's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">Pennsylvania consistently ranks among the top states for overdose deaths. Professional interventionists help families find treatment and recovery pathways.</p>
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
              <div className="text-3xl font-bold text-foreground mb-1">5,100+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">39.3</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K Residents</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <Users className="h-8 w-8 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">1M+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">85%+</div>
              <div className="text-sm text-muted-foreground">Fentanyl-Related Deaths</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Understanding Pennsylvania's Addiction Epidemic</h2>
              <p className="text-muted-foreground mb-4">
                Pennsylvania faces one of the most severe addiction crises in the nation. The state consistently ranks in the top five for overdose deaths, with Philadelphia and southwestern Pennsylvania experiencing particularly devastating impacts from fentanyl and heroin.
              </p>
              <p className="text-muted-foreground">
                The opioid epidemic has hit Pennsylvania especially hard due to its position along major drug trafficking routes, aging industrial communities, and high rates of prescription opioid use that often transition to illicit substances.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Treatment Gap in the Keystone State</h2>
              <p className="text-muted-foreground mb-4">
                Despite having numerous treatment facilities, Pennsylvania struggles with accessibility. Rural areas face limited options, while urban centers often have long wait times. Many families don't know how to access the care their loved ones need.
              </p>
              <p className="text-muted-foreground">
                Professional interventionists bridge this gap by helping families navigate the complex treatment landscape and find appropriate care quickly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How Addiction Affects Pennsylvania Families</h2>
              <p className="text-muted-foreground mb-4">
                The impact extends far beyond the individual struggling with addiction. Families across Pennsylvania experience:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Financial devastation from enabling behaviors and lost income</li>
                <li>Breakdown of family relationships and trust</li>
                <li>Children growing up in unstable environments</li>
                <li>Parents outliving children to overdose</li>
                <li>Communities losing their young adults to addiction</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Role of a Professional Interventionist</h2>
              <p className="text-muted-foreground mb-4">
                A professional interventionist serves as a guide and facilitator for families in crisis. Services include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Pre-intervention family education and preparation</li>
                <li>Development of a comprehensive intervention strategy</li>
                <li>Facilitation of the intervention conversation</li>
                <li>Treatment placement coordination</li>
                <li>Post-intervention family support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why Pennsylvania Families Seek Intervention Help</h2>
              <p className="text-muted-foreground mb-4">
                Families turn to professional intervention when they've exhausted their own efforts. Common situations include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Multiple failed treatment attempts</li>
                <li>Loved one denying they have a problem</li>
                <li>Fear of overdose death</li>
                <li>Family conflicts preventing unified action</li>
                <li>Uncertainty about treatment options</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">A Path Forward for Pennsylvania Families</h2>
              <p className="text-muted-foreground mb-4">
                Professional intervention offers a proven path to treatment. With experience across Pennsylvania—from Philadelphia to Pittsburgh, from Erie to the Poconos—interventionists understand the unique challenges facing families in the Keystone State.
              </p>
              <p className="text-muted-foreground">
                You don't have to navigate this crisis alone. Professional guidance can make the difference between continued suffering and the beginning of recovery.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for Pennsylvania Families</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Every day you wait is another day lost to addiction. Take the first step toward recovery today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="tel:541-838-6009"><Phone className="mr-2 h-5 w-5" />Call Now</a></Button>
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

      
      <LocationLinks currentLocation="Pennsylvania" locationType="state" />
      <Footer />
    </div>
  );
};

export default Pennsylvania;
