import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import lasVegasBanner from "@/assets/las-vegas-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const LasVegasNevada = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Las Vegas Nevada Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Las Vegas, Nevada. Help your loved one recover from gambling addiction, fentanyl, alcohol, and methamphetamine addiction. Serving Clark County."
        canonical="https://freedominterventions.com/las-vegas-nevada"
        keywords="Las Vegas addiction intervention, Nevada drug intervention, Las Vegas family intervention, gambling addiction Las Vegas, fentanyl crisis Las Vegas"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Las Vegas" state="NV" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Nevada", url: "https://freedominterventions.com/nevada" },
          { name: "Las Vegas", url: "https://freedominterventions.com/las-vegas-nevada" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Nevada", href: "/nevada" },
        { name: "Las Vegas", href: "/las-vegas-nevada" },
      ]} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={lasVegasBanner} 
          alt="Nevada desert sunrise with Red Rock Canyon mountains near Las Vegas" 
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
              Las Vegas, Nevada
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Las Vegas Addiction Crisis: Professional Intervention Help for Clark County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Las Vegas's party culture and 24/7 lifestyle create a perfect storm for addiction. Beyond the Strip, families throughout Clark County struggle with loved ones lost to gambling, alcohol, fentanyl, and methamphetamine. Freedom Interventions offers professional, compassionate intervention services to help Las Vegas families find hope.
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
                  Las Vegas's Hidden Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Clark County recorded over 900 overdose deaths in 2023, with fentanyl driving the surge. But drug addiction is just part of the story. Las Vegas has some of the highest gambling addiction rates in the nation, and the intersection of gambling, alcohol, and drug addiction creates complex patterns that devastate families. The city's entertainment industry and hospitality workforce face unique pressures that fuel addiction.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">900+</div>
                <p className="text-muted-foreground">Overdose deaths in Clark County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">State for problem gambling rates</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Access to alcohol, gambling, and drugs</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Las Vegas normalizes behaviors that would be red flags elsewhere. Staying up all night gambling and drinking is "entertainment." The transition from recreational excess to addiction happens gradually—until it becomes impossible to ignore.
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
                  How Addiction Impacts Las Vegas Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Las Vegas families face unique challenges. The city's entire economy is built on activities that become addictive for vulnerable people. A casino worker surrounded by gambling opportunities. A bartender with unlimited access to alcohol. A club promoter immersed in party drug culture. For many Las Vegas residents, addiction triggers are inescapable parts of daily life.
                  </p>
                  <p>
                    Many Las Vegas families are transplants who moved for opportunity. When addiction strikes, they lack the multi-generational support networks that might have helped. They struggle alone in a city designed to enable excess.
                  </p>
                  <p>
                    From Henderson's master-planned communities to North Las Vegas's working-class neighborhoods, from the Strip's service workers to Summerlin's professionals, addiction touches every corner of the valley.
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
                  How Freedom Interventions Serves Las Vegas Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Las Vegas families in crisis. We understand the unique challenges of addiction in a city built on vice, and we have the expertise to help families navigate toward recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Multiple Addiction Expertise:</strong> Las Vegas addictions often intertwine—gambling, alcohol, and drugs together. We understand these complex patterns and address the full scope of addiction, not just one substance.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Away from Triggers:</strong> Sometimes the best way forward requires leaving Las Vegas. We have relationships with excellent treatment programs throughout the country and can help identify the right fit for sustained recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">24/7 Availability:</strong> Las Vegas never sleeps, and neither does addiction. We're available when crisis strikes, regardless of the hour.
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
                  Recovery Is Possible—Even in Las Vegas
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    People get sober in Las Vegas every day. The city has strong 12-step communities and growing treatment resources. For some, recovery means learning to live in Vegas without engaging in addictive behavior. For others, it means building a new life elsewhere. Professional intervention opens the door to both possibilities.
                  </p>
                  <p>
                    The fentanyl crisis has raised the stakes. The margin for error is gone. If your loved one is struggling with addiction in Las Vegas, the sooner families have a clear plan, the more options they have.
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
              Get Help for Your Las Vegas Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all of Clark County including Las Vegas, Henderson, North Las Vegas, Summerlin, and surrounding communities.
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


      <LocationLinks currentLocation="Las Vegas" locationType="city" parentState="Nevada" />

      <Footer />
    </div>
  );
};

export default LasVegasNevada;