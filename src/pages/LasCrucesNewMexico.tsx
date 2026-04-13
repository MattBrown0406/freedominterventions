import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import newMexicoBanner from "@/assets/new-mexico-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const LasCrucesNewMexico = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "New Mexico", href: "/new-mexico" },
    { name: "Las Cruces", href: "/las-cruces-new-mexico" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Las Cruces, New Mexico | Freedom Interventions"
        description="Las Cruces families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Doña Ana County. Free consultation. (541) 838-6009."
        keywords="Las Cruces addiction intervention, Doña Ana County drug intervention, Las Cruces family intervention, fentanyl border New Mexico, NMSU college addiction, border drug trafficking Las Cruces, intervention specialist Las Cruces NM"
        canonical="https://freedominterventions.com/las-cruces-new-mexico"
      />
      <LocalBusinessSchema location="Las Cruces" state="New Mexico" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={newMexicoBanner}
          alt="Las Cruces New Mexico Organ Mountains landscape"
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
              Las Cruces, New Mexico
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Las Cruces' Border Addiction Crisis: Professional Intervention Services for Doña Ana County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Las Cruces sits at one of the most active fentanyl trafficking corridors in the United States—just 45 miles from El Paso and the US-Mexico border. The combination of border proximity, a large university population at NMSU, and limited treatment resources creates a uniquely challenging environment for Doña Ana County families. Freedom Interventions provides expert, compassionate intervention services to help your family navigate this crisis.
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
                  Understanding Las Cruces' Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Doña Ana County's location along the I-10 and I-25 drug trafficking corridors means Las Cruces has unusually easy access to fentanyl, heroin, and methamphetamine. The city's combination of border proximity, college-age population, and economic challenges creates compounding risk factors that make professional intervention more urgent than in many other communities.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">45 mi</div>
                <p className="text-muted-foreground">Distance from El Paso—one of the primary US fentanyl entry points from Mexico</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">14k+</div>
                <p className="text-muted-foreground">NMSU students at elevated risk for substance use disorders in a high-access environment</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">New Mexico's overall overdose death rate is among the highest in the nation</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Las Cruces' bilingual, binational community includes families whose lives span both sides of the border. Cultural ties, family loyalty, and community privacy norms can create powerful barriers to seeking outside help. But without professional intervention, addiction that enters through one family member quickly spreads its damage across the entire family system.
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
                  How Addiction Affects Las Cruces Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    NMSU's student population represents a significant addiction risk—young adults away from home for the first time, in a community where drugs are easily accessible and cheap. Parents often don't see the warning signs until something serious forces the issue.
                  </p>
                  <p>
                    For long-established Las Cruces families, addiction often carries profound shame. The cultural value of keeping family matters private—"lo que pasa en casa, se queda en casa"—can delay intervention for years while the person's addiction deepens and family relationships deteriorate.
                  </p>
                  <p>
                    The city's limited treatment infrastructure compared to larger metro areas means that families need professional help not just to stage an intervention, but to identify the right treatment options—often in Albuquerque, El Paso, or beyond.
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
                  How Freedom Interventions Helps Las Cruces Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of professional intervention experience to Las Cruces families. We understand the border region's unique dynamics and work with families to break through cultural barriers while honoring family values.
                  </p>
                  <p>
                    <strong className="text-foreground">Border Region Expertise:</strong> We understand the unique dynamics of the Doña Ana County border region—including how drug availability, binational family systems, and limited local resources affect the intervention process.
                  </p>
                  <p>
                    <strong className="text-foreground">Local & Regional Resources:</strong> We work with Memorial Medical Center, Mesilla Valley Hospital, La Clinica de Familia, and Doña Ana County Behavioral Health—and connect families with quality residential treatment options throughout New Mexico and beyond when local care isn't sufficient.
                  </p>
                  <p>
                    <strong className="text-foreground">Family-Centered Approach:</strong> We respect the importance of family in Las Cruces culture and channel that loyalty into a powerful force for recovery rather than enabling.
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
                  Hope for Las Cruces Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery happens in Las Cruces. Despite the challenges of border proximity and limited treatment infrastructure, families who act decisively with professional guidance get results. We've helped families throughout southern New Mexico and the region guide their loved ones toward healing.
                  </p>
                  <p>
                    The border may bring drugs closer, but it also brings communities with extraordinary resilience, faith, and family bonds. Those strengths, channeled correctly, are powerful drivers of recovery.
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
              Get Help for Your Las Cruces Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Doña Ana County including Las Cruces, Mesilla, Anthony, and surrounding communities.
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


      <LocationLinks currentLocation="Las Cruces" locationType="city" />
      <Footer />
    </div>
  );
};

export default LasCrucesNewMexico;
