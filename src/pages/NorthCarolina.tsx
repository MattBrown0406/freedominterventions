import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const NorthCarolina = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="North Carolina Addiction Intervention Services | Freedom Interventions"
        description="North Carolina faces rising overdose deaths with fentanyl driving the crisis. Professional interventionists help families find treatment pathways throughout the Tar Heel State."
        canonical="https://freedominterventions.com/north-carolina"
        keywords="North Carolina addiction intervention, Charlotte intervention services, Raleigh drug intervention, North Carolina opioid crisis, NC fentanyl deaths"
        geoRegion="US-NC"
        geoPlacename="North Carolina"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="North Carolina"
        url="https://freedominterventions.com/north-carolina"
        description="North Carolina faces rising overdose deaths with fentanyl driving the crisis. Professional interventionists help families find treatment pathways throughout the Tar Heel State."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "North Carolina", url: "https://freedominterventions.com/north-carolina" },
        ]}
      />
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "North Carolina", href: "/north-carolina" },
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">North Carolina Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">North Carolina's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">North Carolina has seen a dramatic rise in overdose deaths, with fentanyl now present in over 80% of fatal overdoses. Professional interventionists help families navigate this crisis.</p>
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
              <div className="text-3xl font-bold text-foreground mb-1">4,400+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">41.5</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K Residents</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <Users className="h-8 w-8 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">750K+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">83%</div>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Understanding North Carolina's Growing Crisis</h2>
              <p className="text-muted-foreground mb-4">
                North Carolina has experienced one of the steepest increases in overdose deaths in the Southeast. The state's position along Interstate 95 and I-85 corridors makes it vulnerable to drug trafficking, while rural communities face limited treatment access.
              </p>
              <p className="text-muted-foreground">
                From the mountains of Asheville to the coast of Wilmington, and from Charlotte to Raleigh, addiction affects every corner of the Tar Heel State.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Treatment Gap Across North Carolina</h2>
              <p className="text-muted-foreground mb-4">
                While North Carolina has expanded treatment options, significant gaps remain. Rural counties often lack any treatment facilities, and even urban areas face capacity issues and long wait times.
              </p>
              <p className="text-muted-foreground">
                Professional interventionists help families navigate these barriers and find appropriate treatment options quickly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How Addiction Impacts North Carolina Families</h2>
              <p className="text-muted-foreground mb-4">
                The addiction crisis ripples through families and communities:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Grandparents raising grandchildren due to parental addiction</li>
                <li>Agricultural and manufacturing communities losing workers</li>
                <li>Strained emergency services and hospitals</li>
                <li>Generational cycles of substance use</li>
                <li>Economic devastation for working families</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Role of a Professional Interventionist</h2>
              <p className="text-muted-foreground mb-4">
                Professional intervention provides structure and guidance when families feel lost. Services include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Family education about addiction as a disease</li>
                <li>Strategic intervention planning</li>
                <li>Facilitated conversations with the struggling individual</li>
                <li>Treatment matching and placement</li>
                <li>Ongoing family support and coaching</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why Families Choose Professional Intervention</h2>
              <p className="text-muted-foreground mb-4">
                North Carolina families seek professional help when:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Previous attempts to help have failed</li>
                <li>The family is divided on how to proceed</li>
                <li>There's fear of saying the wrong thing</li>
                <li>Overdose risk is escalating</li>
                <li>They don't know what treatment options exist</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">A Path Forward for Your Family</h2>
              <p className="text-muted-foreground mb-4">
                Recovery is possible. Across North Carolina, families are finding hope through professional intervention. Whether you're in Charlotte, Raleigh-Durham, Greensboro, or a small mountain town, help is available.
              </p>
              <p className="text-muted-foreground">
                The first step is reaching out. A free consultation can help you understand your options and develop a plan forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for North Carolina Families</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. A clear plan can help your loved one move toward recovery.
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


      <LocationLinks currentLocation="North Carolina" locationType="state" />
      <Footer />
    </div>
  );
};

export default NorthCarolina;
