import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const NorthDakota = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="North Dakota Addiction Intervention Services | Freedom Interventions"
        description="North Dakota faces unique addiction challenges with methamphetamine and opioids devastating rural communities. Professional interventionists help families find treatment solutions."
        canonical="https://freedominterventions.com/north-dakota"
        keywords="North Dakota addiction intervention, Fargo intervention services, Bismarck drug intervention, North Dakota opioid crisis, meth addiction North Dakota"
        geoRegion="US-ND"
        geoPlacename="North Dakota"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Fargo" state="ND" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "North Dakota", url: "https://freedominterventions.com/north-dakota" },
        ]}
      />
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "North Dakota", href: "/north-dakota" },
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">North Dakota Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">North Dakota's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">North Dakota's rural landscape presents unique challenges for families dealing with addiction. Professional interventionists provide the guidance and treatment connections families need.</p>
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
              <div className="text-3xl font-bold text-foreground mb-1">150+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">19.4</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K Residents</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <Users className="h-8 w-8 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">55K+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">65%</div>
              <div className="text-sm text-muted-foreground">Meth-Related Deaths</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">North Dakota's Unique Addiction Challenges</h2>
              <p className="text-muted-foreground mb-4">
                While North Dakota has lower overall overdose rates than many states, the crisis here is no less devastating for affected families. Methamphetamine has become the primary drug of concern, with fentanyl increasingly found in the drug supply.
              </p>
              <p className="text-muted-foreground">
                The state's oil industry has brought economic opportunity but also increased drug trafficking and substance use in communities like Williston and Dickinson.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Rural Treatment Challenges</h2>
              <p className="text-muted-foreground mb-4">
                North Dakota's vast rural landscape creates significant barriers to treatment. Many communities are hours from the nearest treatment facility, and harsh winters can make travel dangerous.
              </p>
              <p className="text-muted-foreground">
                Professional interventionists help families identify treatment options that account for these geographic realities, including out-of-state placements when necessary.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How Addiction Affects North Dakota Families</h2>
              <p className="text-muted-foreground mb-4">
                In North Dakota's close-knit communities, addiction impacts everyone:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Agricultural families losing members to addiction</li>
                <li>Oil field workers struggling with substance use</li>
                <li>Native American communities facing disproportionate impact</li>
                <li>Small towns losing young people</li>
                <li>Stigma preventing families from seeking help</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Role of a Professional Interventionist</h2>
              <p className="text-muted-foreground mb-4">
                For North Dakota families, professional intervention provides:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Expert guidance through the intervention process</li>
                <li>Help navigating limited local treatment options</li>
                <li>Connections to quality treatment facilities nationwide</li>
                <li>Support for families dealing with rural isolation</li>
                <li>Post-intervention family coaching and support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why North Dakota Families Need Outside Help</h2>
              <p className="text-muted-foreground mb-4">
                In small communities where everyone knows everyone, getting help can feel impossible. Families worry about:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Privacy and confidentiality</li>
                <li>Community judgment</li>
                <li>Limited local resources</li>
                <li>Distance from treatment centers</li>
                <li>Not knowing where to turn</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">A Path Forward for Your Family</h2>
              <p className="text-muted-foreground mb-4">
                Despite the challenges, recovery is possible for North Dakota families. Professional intervention connects families with resources and treatment options that may not be visible from within the state.
              </p>
              <p className="text-muted-foreground">
                A free consultation can help you understand your options and develop a plan that works for your unique situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for North Dakota Families</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Distance shouldn't prevent your family from getting help. Take the first step today.
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


      <LocationLinks currentLocation="North Dakota" locationType="state" />
      <Footer />
    </div>
  );
};

export default NorthDakota;
