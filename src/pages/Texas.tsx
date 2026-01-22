import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import texasBanner from "@/assets/texas-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Texas = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Texas Addiction Intervention Services | Freedom Interventions"
        description="Texas faces an unprecedented addiction crisis with over 5,800 overdose deaths in 2023. Professional interventionists help families navigate fentanyl, methamphetamine, and alcohol addiction."
        canonical="https://freedominterventions.com/texas"
        keywords="Texas addiction intervention, Dallas intervention services, Houston drug intervention, Austin family intervention, Texas fentanyl crisis"
        geoRegion="US-TX"
        geoPlacename="Texas"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Dallas" state="TX" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Texas", url: "https://freedominterventions.com/texas" },
        ]}
      />
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Texas", href: "/texas" },
      ]} />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={texasBanner} 
            alt="Texas landscape with rolling hills and bluebonnets symbolizing hope and the path to recovery" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Texas Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Texas Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Texas faces an unprecedented addiction crisis, with overdose deaths reaching over 5,800 in 2023—a dramatic increase driven by fentanyl, methamphetamine, and polysubstance use. From the border communities to the Dallas-Fort Worth metroplex, families across the Lone Star State need help now more than ever.
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

      {/* Key Statistics */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5,800+</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths in 2023</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Intervention Success Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2M+</div>
              <div className="text-sm text-muted-foreground">Texans Affected by Addiction</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">75%</div>
              <div className="text-sm text-muted-foreground">Fentanyl-Involved Deaths</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Scope of Texas's Addiction Challenges */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Scope of Texas's Addiction Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Texas's sheer size and proximity to the Mexican border make it a major corridor for drug trafficking, flooding communities with fentanyl, methamphetamine, and cocaine. The state has seen a 300% increase in fentanyl-related deaths since 2019, with counterfeit pills claiming young lives at alarming rates. Major cities like Houston, Dallas, Austin, and San Antonio see thousands of overdose deaths annually.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Rural Texas communities face unique challenges: limited treatment options, long distances to facilities, and deep-rooted stigma around mental health and addiction. The oil field and agricultural industries have seen workers fall into addiction following injuries, often starting with prescription opioids before transitioning to illicit substances.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Despite being the second-largest state, Texas ranks low in treatment accessibility. Only about 10% of Texans needing substance use treatment receive it, creating a gap that professional interventionists help bridge by connecting families with appropriate care across the state and beyond.
              </p>
            </div>

            {/* Why Families Need Intervention Support Now */}
            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why Texas Families Need Intervention Support Now
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Addiction tears through Texas families with devastating speed. Parents in suburban neighborhoods watch their children become addicted to pills bought on social media. Ranch families lose generations of workers to methamphetamine. Urban professionals hide cocaine and alcohol addictions until careers and marriages collapse.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Texas's culture of self-reliance and privacy often delays families from seeking help. Many attempt DIY interventions that fail due to denial, manipulation, or lack of immediate treatment options. Professional interventionists succeed 80-90% of the time by unifying family messages, pre-arranging treatment placement, and guiding the process with proven methodologies like ARISE and CRAFT.
              </p>
            </div>

            {/* How Interventionists Tailor Solutions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  How Interventionists Tailor Solutions for Texas Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists begin with confidential family consultations, assessing addiction severity and mapping Texas's treatment landscape—from Houston's world-class medical centers to Hill Country retreats and West Texas residential programs. We understand the specific challenges of fentanyl addiction, methamphetamine psychosis, and prescription opioid dependencies common in Texas.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Planning involves coordinating with treatment facilities, arranging immediate transport, and coaching families through the intervention conversation. We address co-occurring mental health conditions, common in Texas's high-stress industries, and ensure seamless transitions from detox through residential treatment to aftercare.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Texas-specific expertise matters: understanding the border region's unique drug supply, navigating limited rural resources, and connecting with faith-based programs that resonate with many Texas families. We help families in El Paso, Lubbock, Amarillo, and everywhere in between find appropriate, accessible treatment.
              </p>
            </div>

            {/* Proven Benefits and Real Impact */}
            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Proven Benefits and Real Impact
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional interventions dramatically increase the likelihood of treatment entry—from less than 30% for unguided family attempts to over 90% with professional support. In Texas, where treatment access is limited and time is critical due to fentanyl's lethality, this difference saves lives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Families report restored relationships, ended enabling patterns, and hope restored after years of chaos. We've helped Texas families navigate everything from young adult heroin addiction to executive alcoholism, always with compassion and respect for family values.
              </p>
            </div>

            {/* Barriers and Why Act Now */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Barriers and Why Act Now
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Texas faces real barriers: treatment waitlists, insurance limitations, geographic challenges, and cultural stigma. But fentanyl has made waiting deadly—every day without intervention risks overdose. Professional interventionists know how to navigate these barriers, securing beds, coordinating logistics, and overcoming resistance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The Texas legislature has increased funding for treatment and harm reduction, but demand far outpaces supply. Interventionists help families access the best available resources, whether in-state or nationwide, ensuring your loved one gets the level of care they need.
              </p>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Texas
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Assessment</h3>
                    <p className="text-muted-foreground">Comprehensive evaluation using proven clinical criteria to understand your loved one's specific needs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tailored Strategies</h3>
                    <p className="text-muted-foreground">Customized approaches accounting for Texas's unique geography, resources, and family values.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Coordination</h3>
                    <p className="text-muted-foreground">Connections to detox centers, inpatient rehabs, outpatient programs, and sober living statewide and nationally.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Family Healing</h3>
                    <p className="text-muted-foreground">Support for the whole family to end enabling patterns, establish boundaries, and begin recovery together.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Collaboration with treatment teams for ongoing therapy, 12-step participation, and long-term recovery support.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for Texas Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Texas's addiction crisis claims over 5,800 lives annually—but recovery happens every day. Professional interventionists empower families, transforming despair into decisive treatment entry with 90% efficacy. Don't wait for the next overdose or arrest.
          </p>
          <p className="text-xl font-semibold mb-8">
            Hope starts with one structured step—yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:541-838-6009">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 838-6009
              </a>
            </Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Texas" locationType="state" />

      <Footer />
    </div>
  );
};

export default Texas;