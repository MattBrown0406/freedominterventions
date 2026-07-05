import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import indianapolisBanner from "@/assets/indianapolis-indiana-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const IndianapolisIndiana = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Indiana", href: "/indiana" },
    { name: "Indianapolis", href: "/indianapolis-indiana" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Indianapolis Indiana Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Indianapolis, Indiana. Help your loved one recover from fentanyl, methamphetamine, and alcohol addiction. Serving Marion County and Central Indiana."
        keywords="Indianapolis addiction intervention, Indiana drug intervention, Indianapolis family intervention, fentanyl crisis Indianapolis, methamphetamine addiction Indiana"
        canonical="https://freedominterventions.com/indianapolis-indiana"
      />
      <LocalBusinessSchema location="Indianapolis" state="Indiana" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={indianapolisBanner} 
          alt="Indianapolis skyline at sunset with Monument Circle" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              <MapPin className="h-4 w-4" />
              Indianapolis, Indiana
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Indianapolis Addiction Crisis: Professional Intervention for Indiana Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The Crossroads of America has become a crossroads for drug trafficking. Indianapolis sits at the intersection of major highways, making it a distribution hub for fentanyl and methamphetamine. From Carmel's affluent neighborhoods to the near east side's struggling communities, families across Central Indiana are devastated. Freedom Interventions offers professional, compassionate help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
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

      {/* Crisis Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  The Hoosier State's Drug Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Indiana recorded over 3,000 drug overdose deaths in 2023, with Marion County among the hardest hit. The state's position as a transportation hub means drugs flow through constantly, and some stay. Fentanyl has transformed Indiana's heroin problem into a mass casualty event, while methamphetamine remains deeply entrenched.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3,000+</div>
                <p className="text-muted-foreground">Overdose deaths in Indiana in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <p className="text-muted-foreground">Of opioid deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#5</div>
                <p className="text-muted-foreground">State for methamphetamine seizures</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Indianapolis's affordable cost of living attracts families, but it also means cheap, abundant drugs. The same highways that connect Indy to the rest of America bring deadly narcotics through the city daily.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Addiction Impacts Indianapolis Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Indianapolis families embody Midwest values—hard work, self-reliance, and keeping family matters private. These same values can delay intervention as families try to handle addiction on their own, waiting until crisis forces action.
                  </p>
                  <p>
                    The manufacturing decline that hit Indiana decades ago left behind communities vulnerable to addiction. Prescription opioids filled the gap left by good jobs, and now fentanyl has replaced the pills.
                  </p>
                  <p>
                    From Fishers' new subdivisions to Fountain Square's urban pioneers, from Speedway's racing community to Greenwood's families, addiction doesn't discriminate. Every neighborhood in the Indy metro has been touched by this crisis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Serves Indianapolis Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Indianapolis families in crisis. We understand Hoosier culture and help families overcome the pride and privacy that can delay getting help.
                  </p>
                  <p>
                    <strong className="text-foreground">Midwest Values:</strong> We respect the independence and self-reliance that define Indiana families, while helping them see that seeking help for addiction is an act of strength and love.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> Indiana has both excellent and questionable treatment options. We help families identify programs that provide genuine, evidence-based care rather than facilities that profit from chronic relapse.
                  </p>
                  <p>
                    <strong className="text-foreground">Family-Centered Approach:</strong> We work with the whole family system, helping everyone understand their role in both the intervention and ongoing recovery support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hope Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Recovery Is Possible in Indianapolis
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Indianapolis has a growing recovery community with meetings throughout the metro, faith-based programs, and peer support networks. The same community bonds that define Hoosier life can become powerful supports for recovery.
                  </p>
                  <p>
                    The fentanyl crisis has made intervention more urgent than ever. Every day of active addiction carries potentially fatal risk. Professional intervention can help your loved one move toward treatment and help your family begin healing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Get Help for Your Indianapolis Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all of Central Indiana including Carmel, Fishers, Greenwood, and surrounding communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
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


      <LocationLinks currentLocation="Indianapolis" locationType="city" />
      <Footer />
    </div>
  );
};

export default IndianapolisIndiana;