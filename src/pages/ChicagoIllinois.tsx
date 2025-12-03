import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import chicagoBanner from "@/assets/chicago-illinois-banner.jpg";

const ChicagoIllinois = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Chicago Illinois Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Chicago, Illinois. Help your loved one recover from heroin, fentanyl, and alcohol addiction. Serving Cook County and Chicagoland." />
        <meta name="keywords" content="Chicago addiction intervention, Illinois drug intervention, Chicago family intervention, heroin crisis Chicago, fentanyl addiction Illinois" />
        <link rel="canonical" href="https://freedominterventions.com/chicago-illinois" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={chicagoBanner} 
          alt="Chicago skyline at dawn with Lake Michigan" 
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
              Chicago, Illinois
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Chicago's Opioid Emergency: Professional Intervention for Illinois Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Chicago has long battled heroin addiction, but fentanyl has transformed the crisis into an emergency. From the South Side to the North Shore suburbs, families across Chicagoland are losing loved ones at unprecedented rates. Freedom Interventions offers professional, compassionate intervention services to help families find hope.
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
                  The Windy City's Deadly Drug Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cook County recorded over 2,000 opioid overdose deaths in 2023, with fentanyl responsible for the vast majority. Chicago's position as a major drug trafficking hub means exceptionally potent and dangerous supplies reach users. The city that once battled heroin now faces a far deadlier synthetic opioid crisis.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2,000+</div>
                <p className="text-muted-foreground">Opioid deaths in Cook County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">88%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <p className="text-muted-foreground">Increase in overdose deaths since 2015</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Chicago's neighborhoods tell different addiction stories—heroin on the West Side, pills in the suburbs, cocaine mixed with fentanyl downtown—but the outcome is increasingly the same. Families across every community are devastated by loss.
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
                  How Addiction Impacts Chicago Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Chicago's strong family traditions make addiction especially painful. Close-knit Italian, Polish, Irish, and Latino families watch helplessly as loved ones disappear into addiction. The shame and stigma in traditional communities often delays intervention until crisis hits.
                  </p>
                  <p>
                    From executives in the Loop to factory workers in the suburbs, from college students at Northwestern to retirees on the South Side, addiction crosses every demographic. The opioid crisis started with prescription pills and evolved into street fentanyl, trapping people from all walks of life.
                  </p>
                  <p>
                    Chicago winters compound the problem. The brutal cold drives people indoors, isolation increases, and depression deepens. Substance use that might have been manageable in better weather becomes desperate during long, dark months.
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
                  How Freedom Interventions Serves Chicago Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Chicago families in crisis. We understand the cultural dynamics of Chicagoland's diverse communities and navigate family systems with sensitivity and expertise.
                  </p>
                  <p>
                    <strong className="text-foreground">Midwest Family Dynamics:</strong> Chicago families are often large, multigenerational, and complex. We know how to unite diverse family members around a common goal and manage the dynamics that can derail interventions.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> Chicago has many treatment options, but quality varies dramatically. We help families identify programs that provide real, evidence-based treatment rather than predatory facilities.
                  </p>
                  <p>
                    <strong className="text-foreground">Geographic Flexibility:</strong> Sometimes leaving Chicago is essential for recovery. We have relationships with excellent programs nationwide and can help determine whether local or distant treatment is most appropriate.
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
                  Recovery Is Possible in Chicago
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Chicago has a strong recovery community with meetings in every neighborhood. The city's neighborhood-focused culture creates natural support systems for people in recovery. Many find that the same family bonds that complicated their addiction become sources of strength in sobriety.
                  </p>
                  <p>
                    The fentanyl crisis means every day of active addiction carries extreme risk. Professional intervention can save your loved one's life. Don't wait for another overdose or arrest—act now.
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
              Get Help for Your Chicago Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all of Chicagoland including the North Shore, western suburbs, and Northwest Indiana.
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

export default ChicagoIllinois;