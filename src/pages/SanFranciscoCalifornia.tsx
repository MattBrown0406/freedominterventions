import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SanFranciscoCalifornia = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>San Francisco California Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in San Francisco, California. Help your loved one recover from fentanyl, opioid, and alcohol addiction. Serving the Bay Area and Silicon Valley." />
        <meta name="keywords" content="San Francisco addiction intervention, Bay Area drug intervention, SF family intervention, fentanyl crisis San Francisco, addiction help SF CA" />
        <link rel="canonical" href="https://freedominterventions.com/san-francisco-california" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              <MapPin className="h-4 w-4" />
              San Francisco, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              San Francisco's Addiction Crisis: Expert Intervention Services for Bay Area Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              San Francisco's fentanyl crisis has reached emergency proportions. The Tenderloin, SOMA, and neighborhoods throughout the city struggle with open drug use, while families across the Bay Area watch loved ones spiral into addiction. Freedom Interventions provides professional, compassionate intervention services to help your family find hope.
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
                  San Francisco's Unprecedented Drug Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  San Francisco recorded over 800 overdose deaths in 2023—more than double the number of COVID deaths in the same year. Fentanyl accounts for the vast majority, with the synthetic opioid flooding into the city through open-air drug markets. The crisis has become a national symbol of urban drug emergencies, but behind the headlines are real families desperately seeking help.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">800+</div>
                <p className="text-muted-foreground">Overdose deaths in San Francisco in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2x</div>
                <p className="text-muted-foreground">More drug deaths than COVID deaths</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The Bay Area's tech wealth creates a stark contrast with its drug crisis. Families in Pacific Heights, Noe Valley, and the Peninsula watch their children or siblings fall into addiction while feeling unable to help. The city's permissive culture and overwhelmed treatment system leave families feeling hopeless—but professional intervention can break through.
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
                  How Addiction Devastates Bay Area Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    San Francisco's addiction crisis cuts across every demographic. Tech executives hiding opioid dependencies. Young professionals whose recreational drug use became deadly when fentanyl entered the supply. LGBTQ+ community members struggling with meth. Adult children of wealthy families living on the streets of the Tenderloin.
                  </p>
                  <p>
                    The Bay Area's culture of innovation and disruption can make it difficult to recognize addiction as a medical condition requiring treatment. Families believe their brilliant, successful loved one can simply "choose" to stop—not understanding that addiction hijacks the brain's decision-making systems.
                  </p>
                  <p>
                    From Marin County to San Jose, from Oakland to Palo Alto, Bay Area families need professional help to navigate the complex path to recovery.
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
                  How Freedom Interventions Serves Bay Area Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Bay Area families in crisis. We've helped families throughout California navigate the intervention process and find appropriate treatment—whether that means programs in the Bay Area or residential treatment elsewhere.
                  </p>
                  <p>
                    <strong className="text-foreground">Executive & Professional Interventions:</strong> We understand the unique pressures and privacy concerns of Bay Area professionals. Our interventions can be conducted discreetly, protecting careers while saving lives.
                  </p>
                  <p>
                    <strong className="text-foreground">National Treatment Network:</strong> Sometimes the best treatment option is far from home. We have relationships with premier treatment facilities nationwide and can help identify the right program for your loved one's specific situation.
                  </p>
                  <p>
                    <strong className="text-foreground">Family System Healing:</strong> Addiction affects the entire family. We help Bay Area families establish healthy boundaries, end enabling patterns, and begin their own healing journey alongside their loved one's recovery.
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
                  Hope Exists for San Francisco Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite what the headlines suggest, recovery happens in San Francisco every day. The same resources, determination, and innovation that define the Bay Area can be channeled toward recovery. With professional intervention, families break through denial and open the door to treatment.
                  </p>
                  <p>
                    But time is critical. Fentanyl has made every use potentially fatal. The margin for error is gone. If your loved one is struggling with addiction in the Bay Area, the time to act is now—before you become another statistic.
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
              Get Help for Your Bay Area Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all Bay Area communities including San Francisco, Oakland, San Jose, Palo Alto, Berkeley, Marin County, and the entire Peninsula.
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

export default SanFranciscoCalifornia;