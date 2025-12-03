import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import minneapolisBanner from "@/assets/minneapolis-minnesota-banner.jpg";

const MinneapolisMinnesota = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Minneapolis Minnesota Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Minneapolis, Minnesota. Help your loved one recover from fentanyl, methamphetamine, and alcohol addiction. Serving the Twin Cities metro." />
        <meta name="keywords" content="Minneapolis addiction intervention, Minnesota drug intervention, Twin Cities family intervention, fentanyl crisis Minneapolis, opioid addiction Minnesota" />
        <link rel="canonical" href="https://freedominterventions.com/minneapolis-minnesota" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={minneapolisBanner} 
          alt="Minneapolis skyline reflected in one of Minnesota's lakes at sunrise" 
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
              Minneapolis, Minnesota
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Twin Cities Addiction Crisis: Professional Intervention for Minnesota Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Minnesota's reputation for healthy living masks a growing addiction crisis. The Twin Cities have seen dramatic increases in fentanyl deaths, and methamphetamine has spread from rural areas into Minneapolis and St. Paul neighborhoods. Freedom Interventions offers professional, compassionate help for families in crisis.
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
                  Minnesota's Hidden Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Minnesota recorded over 1,400 drug overdose deaths in 2023, with fentanyl driving the surge. The state that pioneered the "Minnesota Model" of addiction treatment now faces a crisis that overwhelms traditional approaches. Synthetic opioids kill faster than help can arrive, and methamphetamine addiction has exploded across all demographics.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1,400+</div>
                <p className="text-muted-foreground">Drug overdose deaths in Minnesota in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">500%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2017</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Cause of accidental death in the state</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Minnesota's stoic culture often prevents families from discussing addiction openly. The "Minnesota Nice" tendency to avoid confrontation allows addiction to progress until crisis forces action. Many families suffer in silence, unaware that help is available.
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
                  How Addiction Impacts Twin Cities Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Minneapolis and St. Paul families face unique challenges. The region's Scandinavian and German heritage emphasizes self-reliance and privacy, making it difficult to seek help. Families often wait too long, hoping the problem will resolve itself.
                  </p>
                  <p>
                    Minnesota's long, dark winters contribute to depression and substance use. Seasonal affective disorder combines with addiction to create devastating cycles. What starts as self-medication for winter blues can become year-round addiction.
                  </p>
                  <p>
                    From Edina's affluent neighborhoods to North Minneapolis's struggling communities, from Hmong families in St. Paul to college students at the University of Minnesota, addiction touches every corner of the metro. No community is immune.
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
                  How Freedom Interventions Serves Twin Cities Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Minnesota families in crisis. We understand Midwest culture and help families overcome the barriers that prevent them from seeking help.
                  </p>
                  <p>
                    <strong className="text-foreground">Cultural Sensitivity:</strong> We work effectively with Minnesota's diverse communities, including immigrant families who may face additional barriers to treatment access.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Expertise:</strong> Minnesota has a proud tradition of addiction treatment, but quality varies. We help families navigate options and find programs that provide genuine, evidence-based care.
                  </p>
                  <p>
                    <strong className="text-foreground">Seasonal Considerations:</strong> For some individuals, treatment in a warmer climate may support recovery. We have relationships with excellent programs nationwide and can help determine the best fit.
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
                  Recovery Thrives in Minnesota
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The birthplace of modern addiction treatment maintains a strong recovery community. The Twin Cities have excellent 12-step meetings, sober living options, and peer support networks. Minnesota's emphasis on community can become a powerful asset in recovery.
                  </p>
                  <p>
                    The fentanyl crisis has made intervention more urgent than ever. Every day of active addiction carries potentially fatal risk. Professional intervention can save your loved one's life.
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
              Get Help for Your Minnesota Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve the entire Twin Cities metro including Minneapolis, St. Paul, Bloomington, and surrounding communities.
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

export default MinneapolisMinnesota;