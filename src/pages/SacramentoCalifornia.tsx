import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import californiaBanner from "@/assets/california-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const SacramentoCalifornia = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "California", href: "/california" },
    { name: "Sacramento", href: "/sacramento-california" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Sacramento, California | Freedom Interventions"
        description="Sacramento families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Sacramento County. Free consultation. (541) 668-8084."
        keywords="Sacramento addiction intervention, Sacramento drug intervention, Sacramento family intervention, intervention specialist Sacramento CA, Sacramento County interventionist, fentanyl intervention Sacramento, meth intervention Sacramento"
        canonical="https://freedominterventions.com/sacramento-california"
      />
      <LocalBusinessSchema location="Sacramento" state="California" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={californiaBanner}
          alt="Sacramento California skyline and addiction intervention services"
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
              Sacramento, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Sacramento's Addiction Crisis: Expert Intervention Services for California's Capital Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Behind Sacramento's role as the seat of state government lies one of California's most severe addiction crises. With skyrocketing fentanyl and meth overdose deaths and a large unhoused population battling substance abuse, Sacramento families need professional guidance. Freedom Interventions provides compassionate, effective intervention services throughout Sacramento County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
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
                  Understanding Sacramento's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sacramento County ranks among California's hardest-hit counties for overdose deaths. Fentanyl has devastated communities across the region, from Oak Park to North Sacramento, while methamphetamine addiction continues to fuel the city's homelessness crisis. The intersection of poverty, mental health struggles, and drug availability creates a perfect storm for addiction in the state capital.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Overdose deaths in Sacramento County annually</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Fentanyl as leading cause of overdose deaths in Sacramento</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">9,200+</div>
                <p className="text-muted-foreground">Unhoused individuals in Sacramento County, many battling addiction</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From affluent suburbs like Elk Grove and Folsom to inner-city neighborhoods, no community in Sacramento County is immune. Government workers, farmworkers, college students, and families across every demographic are affected by the addiction epidemic that has gripped California's capital.
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
                  How Addiction Affects Sacramento Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Sacramento's addiction crisis cuts across all demographics. State government employees hide substance abuse behind professional careers. University students at Sacramento State and UC Davis succumb to prescription opioids and party drugs. Working-class families in South Sacramento and Del Paso Heights face meth and fentanyl destroying their households.
                  </p>
                  <p>
                    The shame and stigma around addiction prevents families from seeking help until crisis strikes. Many Sacramento families watch helplessly as a loved one cycles through addiction, homelessness, and legal trouble—not knowing that a professional intervention could break the cycle.
                  </p>
                  <p>
                    Whether your loved one is a young adult caught up in fentanyl use, a professional struggling with alcohol, or someone battling meth addiction, Freedom Interventions understands Sacramento's unique addiction landscape.
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
                  How Freedom Interventions Helps Sacramento Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides specialized intervention services for Sacramento families. We know the region's treatment resources and connect families with the right care for their loved one's specific situation.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Knowledge:</strong> Sacramento has quality treatment resources including UC Davis Health, Sutter Health, and WellSpace Health, as well as Sacramento County Behavioral Health Services. We connect families with the right level of care—from detox to residential treatment to intensive outpatient programs.
                  </p>
                  <p>
                    <strong className="text-foreground">Confidential & Compassionate:</strong> We handle every intervention with discretion, protecting your family's privacy while creating a structured, evidence-based process that motivates your loved one to accept help.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help families establish healthy boundaries, break enabling patterns, and begin their own recovery process alongside their loved one.
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
                  Hope for Sacramento Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in the midst of Sacramento's addiction crisis. We've helped families throughout the region—from Roseville to Davis, Citrus Heights to Elk Grove—guide their loved ones into treatment and witnessed life-changing transformations.
                  </p>
                  <p>
                    If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. A professional intervention can be the turning point that saves your loved one's life and restores your family. If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
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
              Get Help for Your Sacramento Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Sacramento County including Sacramento, Elk Grove, Roseville, Folsom, Citrus Heights, Rancho Cordova, and Davis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
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


      <LocationLinks currentLocation="Sacramento" locationType="city" parentState="California" />
      <Footer />
    </div>
  );
};

export default SacramentoCalifornia;
