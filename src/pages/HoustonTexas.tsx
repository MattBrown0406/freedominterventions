import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import houstonBanner from "@/assets/houston-texas-banner.jpg";

const HoustonTexas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Houston Texas Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Houston, Texas. Help your loved one recover from fentanyl, cocaine, and alcohol addiction. Serving Harris County and the Greater Houston area." />
        <meta name="keywords" content="Houston addiction intervention, Texas drug intervention, Houston family intervention, fentanyl crisis Houston, cocaine addiction Texas" />
        <link rel="canonical" href="https://freedominterventions.com/houston-texas" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={houstonBanner} 
          alt="Houston skyline at dusk with dramatic Texas sky" 
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
              Houston, Texas
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Houston's Addiction Emergency: Professional Intervention for Texas Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              America's fourth-largest city faces an addiction crisis as vast as its sprawl. Houston's position near the Mexican border makes it a major entry point for fentanyl and cocaine. From the Energy Corridor to the East End, families across Harris County are struggling. Freedom Interventions offers professional, compassionate help.
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
                  The Bayou City's Drug Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Harris County recorded over 1,200 overdose deaths in 2023, making it one of the deadliest counties in America for drug fatalities. Houston's massive size—larger than some states—means addiction touches every community, from wealthy suburbs to working-class neighborhoods. Fentanyl has transformed the cocaine supply, making stimulant use potentially fatal.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
                <p className="text-muted-foreground">Overdose deaths in Harris County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">75%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2020</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Texas county for drug overdose deaths</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Houston's energy industry created boom-and-bust cycles that fuel addiction. High-paying jobs fund expensive habits during good times, and economic downturns trigger relapses. The city's car-dependent sprawl isolates people, making it harder to maintain recovery connections.
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
                  How Addiction Impacts Houston Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Houston's remarkable diversity means addiction affects families from every background. Hispanic families may struggle with machismo culture that discourages seeking help. Vietnamese and Chinese communities face stigma that keeps addiction hidden. African American families often distrust treatment systems with histories of discrimination.
                  </p>
                  <p>
                    The oil and gas industry's work culture—long hours, high stress, and boom-bust cycles—creates perfect conditions for addiction. Many professionals maintain functional addiction for years until the industry downturns that inevitably come.
                  </p>
                  <p>
                    From the Galleria's high-end professionals to Pasadena's industrial workers, from the Third Ward to The Woodlands, addiction doesn't discriminate. Houston's size means families often feel isolated, unaware that help exists.
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
                  How Freedom Interventions Serves Houston Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Houston families in crisis. We understand the cultural complexity of America's most diverse city and navigate family dynamics with sensitivity.
                  </p>
                  <p>
                    <strong className="text-foreground">Cultural Competence:</strong> We work effectively with Houston's diverse communities, understanding that family structures, stigma levels, and recovery paths vary by culture.
                  </p>
                  <p>
                    <strong className="text-foreground">Spanish Language Support:</strong> Si necesitan, les puedo comunicar en Español. We can conduct interventions and family meetings in Spanish.
                  </p>
                  <p>
                    <strong className="text-foreground">Industry Understanding:</strong> We understand the unique pressures of the energy industry and can help families navigate interventions for high-earning professionals whose careers may be at stake.
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
                  Recovery Is Possible in Houston
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Houston has a strong recovery community with meetings in English, Spanish, and other languages throughout the metro. The city's diversity means people in recovery can find community with others who share their background and understand their challenges.
                  </p>
                  <p>
                    The fentanyl crisis has made intervention more urgent than ever. In Houston, cocaine and counterfeit pills increasingly contain fentanyl, making any illicit drug use potentially fatal. Professional intervention can save your loved one's life.
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
              Get Help for Your Houston Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve the entire Greater Houston area including Katy, Sugar Land, The Woodlands, and surrounding communities.
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

export default HoustonTexas;