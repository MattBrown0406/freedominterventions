import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import detroitBanner from "@/assets/detroit-michigan-banner.jpg";

const DetroitMichigan = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Detroit Michigan Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Detroit, Michigan. Help your loved one recover from fentanyl, heroin, and alcohol addiction. Serving Wayne County and Metro Detroit." />
        <meta name="keywords" content="Detroit addiction intervention, Michigan drug intervention, Detroit family intervention, fentanyl crisis Detroit, opioid addiction Michigan" />
        <link rel="canonical" href="https://freedominterventions.com/detroit-michigan" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={detroitBanner} 
          alt="Detroit skyline at sunrise with the Renaissance Center" 
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
              Detroit, Michigan
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Detroit's Opioid Emergency: Professional Intervention for Michigan Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The Motor City has been hit hard by the opioid crisis. As Detroit rebuilds from decades of economic decline, addiction continues to devastate families across the metro. From downtown's renaissance to the struggling neighborhoods, from wealthy Oakland County suburbs to blue-collar Macomb, addiction doesn't discriminate. Freedom Interventions offers professional help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:503-836-2136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
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
                  The Motor City's Drug Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Michigan recorded over 3,000 drug overdose deaths in 2023, with Wayne County among the hardest hit. The economic devastation that hollowed out Detroit also created conditions where addiction thrives—poverty, unemployment, lack of opportunity, and despair. Now fentanyl has transformed an opioid problem into a mass casualty event.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3,000+</div>
                <p className="text-muted-foreground">Overdose deaths in Michigan in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">82%</div>
                <p className="text-muted-foreground">Of opioid deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2x</div>
                <p className="text-muted-foreground">Detroit's overdose rate vs national average</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Detroit's story is one of resilience, but addiction has tested that resilience to its limits. Families that survived plant closings and economic collapse now face a drug supply more deadly than ever before.
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
                  How Addiction Impacts Detroit Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Detroit families have been through decades of hardship, and addiction adds another layer of trauma. The pride that sustained families through economic collapse can become a barrier to seeking help. Asking for assistance feels like admitting defeat.
                  </p>
                  <p>
                    The auto industry's decline left behind communities with limited resources and generational trauma. Prescription opioids flooded the region during the worst of the economic crisis, and now those pills have been replaced by street fentanyl.
                  </p>
                  <p>
                    From Grosse Pointe's affluent families to Detroit's struggling neighborhoods, from Ann Arbor's college students to Downriver's working families, addiction crosses every boundary in Metro Detroit.
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
                  How Freedom Interventions Serves Detroit Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Detroit families in crisis. We understand the economic and social context that shapes addiction in Metro Detroit and can help families find a path forward.
                  </p>
                  <p>
                    <strong className="text-foreground">Working-Class Understanding:</strong> We respect the values of hard work and self-reliance that define Detroit families, while helping them see that seeking help for addiction is an act of strength, not weakness.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> Michigan has many treatment options, but quality varies. We help families identify programs that provide genuine, evidence-based treatment rather than facilities that take advantage of desperation.
                  </p>
                  <p>
                    <strong className="text-foreground">Economic Reality:</strong> We understand that cost matters and work with families to find treatment options that fit their financial situation, including programs that accept Medicaid.
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
                  Detroit Is Rebuilding—Your Family Can Too
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Just as Detroit is experiencing a renaissance, families can rebuild from addiction. The same resilience that sustained Detroiters through decades of decline can support recovery. The city has a strong 12-step community and growing recovery resources.
                  </p>
                  <p>
                    The fentanyl crisis has made intervention more urgent than ever. Every day of active addiction carries extreme risk. Professional intervention can save your loved one's life and help your family begin its own comeback story.
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
              Get Help for Your Detroit Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all of Metro Detroit including Oakland County, Macomb County, Ann Arbor, and surrounding communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:503-836-2136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DetroitMichigan;