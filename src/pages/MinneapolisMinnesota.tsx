import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import minneapolisBanner from "@/assets/minneapolis-minnesota-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema, LocationFAQSchema } from "@/components/StructuredData";

const MinneapolisMinnesota = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Minnesota", href: "/minnesota" },
    { name: "Minneapolis", href: "/minneapolis-minnesota" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Minneapolis Professional Interventions | Call Matt Brown Today"
        description="Searching for Minneapolis professional interventions? Matt Brown helps Twin Cities families plan a drug, alcohol, or fentanyl intervention and treatment next step. Call (541) 668-8084."
        keywords="Minneapolis professional interventions, Minneapolis professional interventionist, Minneapolis addiction intervention, Minnesota drug intervention, Twin Cities family intervention, fentanyl intervention Minneapolis, alcohol intervention Minneapolis"
        canonical="https://freedominterventions.com/minneapolis-minnesota"
      />
      <LocalBusinessSchema location="Minneapolis" state="Minnesota" />
      <OrganizationSchema />
      <LocationFAQSchema location="Minneapolis" locationType="city" />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
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
              Minneapolis Professional Interventions for Families Facing Addiction
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If your family is searching for professional interventions in Minneapolis, the next step is a confidential call with Matt Brown. He helps Twin Cities families prepare the intervention, line up treatment, and stop reacting crisis by crisis. Freedom Interventions serves Minneapolis, St. Paul, Bloomington, and surrounding communities with direct, confidential help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Matt Now
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
                  When to Call a Professional Interventionist in Minneapolis
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Call when the family is out of options, the loved one keeps refusing treatment, or fentanyl, meth, alcohol, or pills have made waiting unsafe. A professional interventionist helps the family get aligned before the conversation, so the intervention is not just another emotional attempt that gets negotiated away.
                  </p>
                  <p>
                    Freedom Interventions brings over 20 years of experience to Minnesota families in crisis. We understand Midwest culture and help families overcome the privacy, shame, and conflict that prevent them from seeking help.
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
                    The fentanyl crisis has made intervention more urgent than ever. Every day of active addiction carries potentially fatal risk. Professional intervention can help your family create a real opening for treatment.
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
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Matt Now
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


      <LocationLinks currentLocation="Minneapolis" locationType="city" />
      <Footer />
    </div>
  );
};

export default MinneapolisMinnesota;
