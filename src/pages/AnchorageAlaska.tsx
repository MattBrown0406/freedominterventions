import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import anchorageBanner from "@/assets/anchorage-alaska-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const AnchorageAlaska = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Anchorage Alaska Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Anchorage, Alaska. Help your loved one find recovery from alcohol, opioid, and methamphetamine addiction. Free consultations available."
        canonical="https://freedominterventions.com/anchorage-alaska"
        keywords="Anchorage addiction intervention, Alaska drug intervention, Anchorage family intervention, alcohol addiction Alaska, addiction help Anchorage AK"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Anchorage" state="AK" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Alaska", url: "https://freedominterventions.com/alaska" },
          { name: "Anchorage", url: "https://freedominterventions.com/anchorage-alaska" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Alaska", href: "/alaska" },
        { name: "Anchorage", href: "/anchorage-alaska" },
      ]} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={anchorageBanner} 
          alt="Anchorage Alaska landscape with Chugach Mountains and aurora borealis" 
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
              Anchorage, Alaska
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Anchorage's Addiction Crisis: Professional Intervention Services for Alaska Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Alaska faces unique addiction challenges—from the highest alcohol abuse rate in the nation to growing opioid and meth problems. Geographic isolation makes getting help even harder. Freedom Interventions travels to Anchorage and throughout Alaska to provide professional intervention services for families in crisis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
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
                  Understanding Alaska's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Alaska consistently ranks among the worst states for substance abuse. The combination of long, dark winters, geographic isolation, high rates of trauma, and limited treatment resources creates a perfect storm for addiction. Anchorage, as the state's largest city, sees the concentrated effects of this crisis.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Highest rate of alcohol-related deaths in the U.S.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">280+</div>
                <p className="text-muted-foreground">Overdose deaths statewide in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2.5x</div>
                <p className="text-muted-foreground">Higher drug death rate than national average</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Fentanyl has reached Alaska, dramatically increasing overdose fatalities. Meanwhile, alcohol and methamphetamine continue their decades-long devastation of families and communities. From Anchorage to the Mat-Su Valley, from Fairbanks to Juneau, addiction is destroying Alaska families.
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
                  How Addiction Affects Alaska Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Alaska's rugged individualism and frontier mentality can make seeking help for addiction feel like weakness. Families suffer in silence, watching loved ones destroy themselves while feeling powerless and isolated. The long, dark winters exacerbate depression and addiction, while geographic barriers make accessing treatment incredibly difficult.
                  </p>
                  <p>
                    Many Alaska families have tried everything they know to help—begging, threatening, enabling, cutting off contact—but nothing works. They don't realize that professional intervention offers a structured approach with much higher outcomes than going it alone.
                  </p>
                  <p>
                    Whether your loved one is struggling in Anchorage's Midtown, in Eagle River, or in remote communities throughout Alaska, Freedom Interventions can help your family find a path to recovery.
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
                  How Freedom Interventions Helps Alaska Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience and a commitment to serving families wherever they are, Freedom Interventions provides professional intervention services throughout Alaska. We understand the unique challenges of addiction in America's Last Frontier.
                  </p>
                  <p>
                    <strong className="text-foreground">We Travel to You:</strong> Geographic isolation shouldn't prevent your family from getting help. We travel to Anchorage and throughout Alaska to conduct interventions and can coordinate with families virtually when needed.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Coordination:</strong> We connect Alaska families with appropriate treatment facilities in the Lower 48 when local options are limited. We handle all logistics, including travel arrangements and escort services to treatment.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Support:</strong> We help the entire family heal—ending enabling patterns, establishing healthy boundaries, and providing ongoing support throughout the recovery journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hope for Alaska Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in Alaska's challenging environment. We've helped families across the state guide their loved ones into treatment and witnessed life-changing transformations. Distance and isolation don't have to be barriers to getting help.
                  </p>
                  <p>
                    Don't let Alaska's frontier mentality prevent you from taking action. Addiction is a disease that requires professional intervention—not willpower alone. If someone you love is struggling, the time to reach out is now.
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
              Get Help for Your Alaska Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one—no matter where in Alaska you're located. We serve Anchorage, the Mat-Su Valley, Fairbanks, Juneau, and communities throughout the state.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
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


      <LocationLinks currentLocation="Anchorage" locationType="city" parentState="Alaska" />

      <Footer />
    </div>
  );
};

export default AnchorageAlaska;