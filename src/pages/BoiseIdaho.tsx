import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import boiseBanner from "@/assets/boise-idaho-banner.jpg";

const BoiseIdaho = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Boise Idaho Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Boise, Idaho. Help your loved one recover from methamphetamine, opioid, and alcohol addiction. Serving Ada County and the Treasure Valley." />
        <meta name="keywords" content="Boise addiction intervention, Idaho drug intervention, Boise family intervention, meth crisis Idaho, addiction help Boise ID" />
        <link rel="canonical" href="https://freedominterventions.com/boise-idaho" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={boiseBanner} 
          alt="Boise Idaho with foothills and Boise River at golden sunrise" 
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
              Boise, Idaho
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Boise's Growing Addiction Crisis: Professional Intervention Services for Treasure Valley Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Boise's rapid growth has brought opportunity—and a surge in addiction. Methamphetamine has long plagued Idaho, and now fentanyl is claiming lives at unprecedented rates. Families throughout the Treasure Valley watch loved ones struggle while feeling powerless to help. Freedom Interventions offers professional guidance to help your family find hope and recovery.
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
                  Idaho's Escalating Drug Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Idaho overdose deaths have more than doubled in recent years, with Ada County (Boise) seeing the steepest increases. Methamphetamine remains the state's most prevalent drug problem, but fentanyl is rapidly gaining ground. The combination of meth and fentanyl—increasingly common—is particularly lethal. Idaho's limited treatment resources make professional intervention guidance essential.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">400+</div>
                <p className="text-muted-foreground">Overdose deaths in Idaho in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-muted-foreground">State for methamphetamine use</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">150%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2020</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Boise's transformation from quiet city to booming metro has brought challenges alongside opportunity. The influx of new residents—many from states with larger drug problems—combined with Idaho's position along trafficking routes has intensified the addiction crisis. Meanwhile, Idaho's treatment infrastructure hasn't kept pace with growth.
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
                  How Addiction Affects Treasure Valley Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Boise's family-oriented culture makes addiction particularly devastating. The tight-knit communities that make the Treasure Valley attractive can also create shame and isolation when addiction strikes. Families worry about what neighbors and church members will think. They suffer in silence while their loved one spirals.
                  </p>
                  <p>
                    Methamphetamine addiction has plagued Idaho for decades, destroying families across the state. The drug's stimulant effects appeal to workers in Idaho's agricultural and construction industries. Now, with fentanyl entering the supply chain, even long-term meth users face deadly new risks.
                  </p>
                  <p>
                    From downtown Boise to Meridian's subdivisions, from Nampa to Eagle, addiction affects families throughout the Treasure Valley. No community is immune.
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
                  How Freedom Interventions Serves Boise Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Idaho families in crisis. As a Pacific Northwest-based organization, we understand the region and can be in Boise quickly when timing is critical. Our national treatment network compensates for Idaho's limited local resources.
                  </p>
                  <p>
                    <strong className="text-foreground">Regional Knowledge:</strong> We understand the Treasure Valley's culture and have helped many Idaho families navigate the intervention process. We know which local resources exist and when out-of-state treatment makes more sense.
                  </p>
                  <p>
                    <strong className="text-foreground">Meth Expertise:</strong> Idaho's methamphetamine crisis requires specific knowledge. We understand the unique challenges of meth addiction and the treatment approaches that work best.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Placement:</strong> Idaho's limited treatment options mean families often need to look elsewhere. We have relationships with excellent programs throughout the country and can find the right fit for your loved one.
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
                  Hope for Treasure Valley Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the challenges, recovery happens in Idaho every day. The same strong family values that make addiction feel shameful can also power recovery. Idaho's outdoor lifestyle provides healthy alternatives to substance use. Growing recovery communities offer peer support for those in recovery.
                  </p>
                  <p>
                    But first, your loved one needs to accept help. Professional intervention breaks through the denial and manipulation that keep addiction alive. Don't wait for tragedy to force your hand—act now while there's still time.
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
              Get Help for Your Boise Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all Treasure Valley communities including Boise, Meridian, Nampa, Caldwell, Eagle, and surrounding areas.
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

export default BoiseIdaho;