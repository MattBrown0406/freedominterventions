import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import arizonaBanner from "@/assets/arizona-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const MesaArizona = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Arizona", href: "/arizona" },
    { name: "Mesa", href: "/mesa-arizona" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Mesa, Arizona | Freedom Interventions"
        description="Mesa families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Maricopa County. Free consultation. (541) 838-6009."
        keywords="Mesa addiction intervention, Maricopa County drug intervention, Mesa family intervention, fentanyl meth addiction Mesa AZ, intervention services Mesa Arizona"
        canonical="https://freedominterventions.com/mesa-arizona"
      />
      <LocalBusinessSchema location="Mesa" state="Arizona" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={arizonaBanner}
          alt="Arizona landscape representing Mesa and Maricopa County"
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
              Mesa, Arizona
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Mesa's Fentanyl and Meth Crisis: Professional Intervention for Arizona's Largest Suburb
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Mesa is Arizona's third-largest city and the country's largest suburb—and it's facing a devastating fentanyl and methamphetamine crisis. With 500,000 residents across Maricopa County's most expansive suburban landscape, Mesa families are dealing with addiction at a scale that demands professional intervention. Freedom Interventions provides expert, compassionate services to help Mesa families fight back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-838-6009">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 838-6009
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
                  Understanding Mesa's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mesa's diverse suburban population—including families, retirees, college students, and working-class residents—faces Arizona's fentanyl crisis head-on. Maricopa County has seen dramatic increases in overdose deaths driven by fentanyl-laced counterfeit pills and street drugs. Methamphetamine remains widespread, fueled by I-10 and US-60 trafficking corridors running directly through Mesa.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">500k+</div>
                <p className="text-muted-foreground">Residents making Mesa one of the country's largest cities</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Severe</div>
                <p className="text-muted-foreground">Fentanyl and meth crisis across all Mesa demographics</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rising</div>
                <p className="text-muted-foreground">Overdose deaths year-over-year in Maricopa County</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Mesa's size means addiction is everywhere—from the retirement communities in the east valley to the working-class neighborhoods near downtown. Fentanyl has dramatically lowered the age of overdose victims, while meth continues to destroy working families. Mesa families need professional intervention to navigate this crisis.
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
                  How Addiction Affects Mesa Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Mesa's sprawling suburban landscape, addiction can go unnoticed for months or years. Young people experiment with what they believe are prescription pills—only to encounter fentanyl. Working adults manage chronic pain or stress with alcohol or meth, gradually crossing into dependency. Families watch a loved one change and don't know how to respond.
                  </p>
                  <p>
                    Mesa's diverse community means families bring different cultural approaches to addiction—some confrontational, some protective, some silent. Without professional guidance, these approaches usually make things worse or delay necessary treatment.
                  </p>
                  <p>
                    Many Mesa families have already attempted to address their loved one's addiction through ultimatums, confrontations, or by covering up consequences. Professional intervention brings a structured, evidence-based approach that actually works.
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
                  How Freedom Interventions Helps Mesa Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of specialized experience helping families navigate the full spectrum of addiction—from fentanyl and meth to alcohol and prescription drugs. We understand Mesa's diverse communities and the treatment resources available throughout Maricopa County.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We connect Mesa families with Banner Desert Medical Center, Mercy Gilbert Medical Center, TERROS Health, and treatment programs throughout the east valley and greater Phoenix metro area.
                  </p>
                  <p>
                    <strong className="text-foreground">Fentanyl Crisis Response:</strong> We understand the urgency of fentanyl addiction and help families act quickly and effectively before the next exposure becomes fatal.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help Mesa families understand addiction as a disease, establish healthy boundaries, and build a foundation for their loved one's recovery.
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
                  Hope for Mesa and Maricopa County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in the midst of Arizona's fentanyl and meth crisis. We've helped Mesa families guide their loved ones from crisis into lasting recovery.
                  </p>
                  <p>
                    Key local resources include Banner Desert Medical Center (medical detox), Mercy Gilbert Medical Center, and TERROS Health (comprehensive behavioral health). We also connect Mesa families with residential and specialty treatment programs throughout Arizona and nationally.
                  </p>
                  <p>
                    With fentanyl, clarity matters. Every use carries overdose risk. When your family is ready to stop waiting and start moving, Matt is ready to help.
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
              Get Help for Your Mesa Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Mesa and surrounding Maricopa County communities including Gilbert, Chandler, Tempe, and the east valley.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-838-6009">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 838-6009
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


      <LocationLinks currentLocation="Mesa" locationType="city" />
      <Footer />
    </div>
  );
};

export default MesaArizona;
