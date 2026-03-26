import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import coloradoBanner from "@/assets/denver-colorado-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const ColoradoSpringsColorado = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Colorado", href: "/colorado" },
    { name: "Colorado Springs", href: "/colorado-springs-colorado" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Colorado Springs, Colorado | Freedom Interventions"
        description="Colorado Springs families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving El Paso County. Free consultation. (541) 838-6009."
        keywords="Colorado Springs addiction intervention, El Paso County drug intervention, Colorado Springs family intervention, veteran addiction Colorado Springs, PTSD alcohol addiction, opioid crisis Colorado Springs, intervention specialist Colorado Springs"
        canonical="https://freedominterventions.com/colorado-springs-colorado"
      />
      <LocalBusinessSchema location="Colorado Springs" state="Colorado" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={coloradoBanner}
          alt="Colorado Springs landscape with Pikes Peak"
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
              Colorado Springs, Colorado
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Colorado Springs' Military & Addiction Crisis: Professional Intervention Services for El Paso County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Home to Fort Carson, the United States Air Force Academy, and Schriever Space Force Base, Colorado Springs carries a unique addiction burden tied to military service, PTSD, and the pressures of combat-connected communities. Freedom Interventions provides compassionate, expert intervention services for El Paso County families navigating alcohol, opioid, and substance use crises.
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
                  Understanding Colorado Springs' Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  El Paso County has experienced dramatic increases in overdose deaths, particularly driven by fentanyl and methamphetamine. The military community—active duty, veterans, and their families—faces disproportionate rates of substance use disorder linked to PTSD, traumatic brain injury, and the challenges of reintegration after deployment.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2x</div>
                <p className="text-muted-foreground">Veterans face substance use disorder at twice the rate of civilians</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">480k+</div>
                <p className="text-muted-foreground">Population in El Paso County facing rising addiction rates</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-muted-foreground">Colorado Springs ranks among Colorado's highest-need areas for addiction services</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The combination of military culture—where asking for help can be seen as weakness—and easy access to alcohol, prescription painkillers, and increasingly fentanyl creates a perfect storm of unaddressed addiction. From the neighborhoods near Fort Carson to the USAFA corridor, families are suffering in silence.
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
                  How Addiction Affects Colorado Springs Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Military families face unique barriers to intervention. The culture of stoicism, fear of career consequences, and frequent relocations all work against getting help. Spouses and children of active-duty personnel often bear the weight of a loved one's substance use disorder with no roadmap for how to help.
                  </p>
                  <p>
                    Veterans transitioning out of service face the added burden of losing structure, purpose, and community—factors that drive many toward self-medication with alcohol, opioids, or other substances. PTSD and untreated mental health conditions amplify the risk dramatically.
                  </p>
                  <p>
                    Whether your loved one is a veteran struggling with opioids, an active-duty service member hiding alcohol dependency, or a young adult caught up in the fentanyl crisis spreading through El Paso County, Freedom Interventions understands the unique landscape of Colorado Springs addiction.
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
                  How Freedom Interventions Helps Colorado Springs Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides professional intervention services tailored to the realities of Colorado Springs and El Paso County. We work with families to break through denial, establish healthy boundaries, and guide their loved ones toward treatment.
                  </p>
                  <p>
                    <strong className="text-foreground">Military-Aware Approach:</strong> We understand military culture and tailor interventions accordingly—respecting service while addressing the addiction head-on. We are familiar with VA resources, TRICARE coverage, and veteran-specific treatment programs.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resources:</strong> We connect families with Colorado Springs treatment options including UCHealth Memorial, Peak View Behavioral Health, AspenPointe, and Pikes Peak Mental Health—plus residential and specialty programs statewide and nationally.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> Addiction devastates the whole family. We help spouses, children, and parents understand enabling behaviors, set meaningful consequences, and begin their own healing alongside their loved one.
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
                  Hope for Colorado Springs Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible. We've helped families throughout El Paso County—from Briargate to Fountain, from Manitou Springs to Pueblo—guide their loved ones into treatment and witnessed remarkable transformations.
                  </p>
                  <p>
                    The strength that drives service members through combat can be channeled into recovery. But the family has to act first. Don't wait for another crisis. Professional intervention can be the turning point your family needs.
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
              Get Help for Your Colorado Springs Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of El Paso County including Colorado Springs, Fountain, Manitou Springs, Monument, and Pueblo.
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

      <LocationLinks currentLocation="Colorado Springs" locationType="city" />
      <Footer />
    </div>
  );
};

export default ColoradoSpringsColorado;
