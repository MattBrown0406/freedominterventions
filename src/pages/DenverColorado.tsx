import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import denverBanner from "@/assets/denver-colorado-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const DenverColorado = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Colorado", href: "/colorado" },
    { name: "Denver", href: "/denver-colorado" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Denver Colorado Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Denver, Colorado. Help your loved one recover from fentanyl, methamphetamine, and alcohol addiction. Serving the Front Range and beyond."
        keywords="Denver addiction intervention, Colorado drug intervention, Denver family intervention, fentanyl crisis Denver, methamphetamine addiction Colorado"
        canonical="https://freedominterventions.com/denver-colorado"
      />
      <LocalBusinessSchema location="Denver" state="Colorado" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={denverBanner} 
          alt="Denver skyline with Rocky Mountains at sunrise" 
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
              Denver, Colorado
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Denver's Growing Addiction Crisis: Professional Intervention for Colorado Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Colorado's legalization of marijuana was supposed to reduce drug problems. Instead, Denver has seen a surge in fentanyl deaths, methamphetamine addiction, and polysubstance use. From LoDo to the suburbs, families across the Front Range are struggling. Freedom Interventions offers professional, compassionate help.
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
                  The Mile High City's Drug Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Denver County saw over 700 overdose deaths in 2023, a dramatic increase driven by fentanyl. The drug has infiltrated the cocaine and counterfeit pill supply, making any illicit drug use potentially fatal. Meanwhile, methamphetamine remains widely available, and Colorado's permissive cannabis culture often masks progression to harder substances.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">700+</div>
                <p className="text-muted-foreground">Overdose deaths in Denver County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">340%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2019</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#4</div>
                <p className="text-muted-foreground">State for methamphetamine seizures</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Denver's outdoor lifestyle and active culture can mask addiction. High-functioning professionals maintain appearances while their substance use spirals. By the time families recognize the problem, addiction has often progressed significantly.
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
                  How Addiction Impacts Denver Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Denver attracts young professionals and transplants seeking opportunity. Many arrive without family support networks, making them more vulnerable when addiction strikes. The city's booming tech and cannabis industries create high-stress environments where substance use often begins as self-medication.
                  </p>
                  <p>
                    From Cherry Creek's affluent families to Aurora's diverse communities, from Boulder's college students to the working families of Commerce City, addiction doesn't discriminate. Every neighborhood has been touched by the fentanyl crisis.
                  </p>
                  <p>
                    Colorado's progressive drug policies sometimes create confusion about when substance use has become a problem. Families may hesitate to intervene, unsure if they're overreacting. Professional guidance helps families understand when and how to act.
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
                  How Freedom Interventions Serves Denver Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Denver families in crisis. We understand Colorado's unique culture and can navigate the complexities of addiction in a state with evolving drug policies.
                  </p>
                  <p>
                    <strong className="text-foreground">Mountain West Expertise:</strong> We serve families throughout the Front Range, from Fort Collins to Colorado Springs, and understand the specific challenges facing Colorado communities.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> Colorado has excellent treatment options, but knowing which program fits your loved one requires expertise. We match individuals with programs suited to their specific needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Altitude Considerations:</strong> For some individuals, treatment at lower elevation may be medically advisable. We have relationships with programs nationwide and can help determine the best fit.
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
                  Recovery Thrives in Colorado
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Denver has a robust recovery community with meetings, sober activities, and peer support. The outdoor lifestyle that attracts many to Colorado can become a cornerstone of recovery, with hiking, skiing, and other activities providing natural dopamine and community connection.
                  </p>
                  <p>
                    The fentanyl crisis has made intervention more urgent than ever. Every day of active addiction carries potentially fatal risk. Professional intervention can be the difference between life and death.
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
              Get Help for Your Denver Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all of the Denver metro area including Aurora, Lakewood, Boulder, and surrounding communities.
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


      <LocationLinks currentLocation="Denver" locationType="city" />
      <Footer />
    </div>
  );
};

export default DenverColorado;