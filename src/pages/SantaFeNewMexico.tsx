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

const SantaFeNewMexico = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "New Mexico", href: "/new-mexico" },
    { name: "Santa Fe", href: "/santa-fe-new-mexico" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Santa Fe, New Mexico | Freedom Interventions"
        description="Santa Fe families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Santa Fe County. Free consultation. (541) 668-8084."
        keywords="Santa Fe addiction intervention, Santa Fe County drug intervention, Santa Fe family intervention, alcohol addiction Santa Fe NM, opioid crisis Santa Fe, Native American addiction New Mexico, intervention specialist Santa Fe"
        canonical="https://freedominterventions.com/santa-fe-new-mexico"
      />
      <LocalBusinessSchema location="Santa Fe" state="New Mexico" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={newMexicoBanner}
          alt="Santa Fe New Mexico adobe architecture and landscape"
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
              Santa Fe, New Mexico
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Santa Fe's Hidden Addiction Crisis: Professional Intervention Services for Santa Fe County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Behind Santa Fe's world-renowned art galleries and cultural richness lies a serious and underaddressed addiction crisis. Alcohol and opioid dependency affect families at every income level in the state capital, while Native American communities face disproportionate devastation. Freedom Interventions provides expert intervention services for Santa Fe County families ready to take action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
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
                  Understanding Santa Fe's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Santa Fe County experiences overdose rates far above the national average. The city's art and tourism economy creates a high-functioning environment where alcohol dependency and opioid misuse can go undetected for years. Meanwhile, Indigenous communities in and around Santa Fe face an addiction crisis rooted in historical trauma that demands both urgency and cultural sensitivity.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-muted-foreground">New Mexico ranks among the top 5 states for drug overdose death rates nationally</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">85k+</div>
                <p className="text-muted-foreground">Santa Fe County residents, where the polished facade can mask deep addiction struggles</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <p className="text-muted-foreground">Native Americans in New Mexico face overdose death rates approximately three times higher than white residents</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Santa Fe's unique population—wealthy retirees, working artists, government employees, and Indigenous community members—creates a complex tapestry of addiction experiences. High-functioning professionals hide alcohol dependency behind successful careers. Tourism workers normalize heavy drinking. Indigenous families carry generational trauma that fuels substance use disorder without accessible, culturally appropriate care.
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
                  How Addiction Affects Santa Fe Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Santa Fe's art and hospitality community, alcohol consumption is deeply normalized. Gallery openings, dinner parties, and tourism-industry social culture create an environment where heavy drinking is celebrated rather than questioned. Families often don't recognize dependency until significant harm has occurred.
                  </p>
                  <p>
                    The city's affluence means many high-functioning addicts maintain the outward appearance of a successful life—until a medical crisis, a DUI, or a relationship collapse forces the issue. By then, the addiction is deeply entrenched and professional intervention is critical.
                  </p>
                  <p>
                    For Indigenous families, accessing addiction help carries layers of historical distrust of healthcare systems. Community stigma and the absence of culturally appropriate care often leave family members unsure how to help a loved one without causing further harm to community relationships.
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
                  How Freedom Interventions Helps Santa Fe Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown has over 20 years of experience helping families across diverse communities intervene effectively. We understand that Santa Fe's unique culture requires a nuanced, respectful approach—whether we're working with an art-community professional or a family with Indigenous heritage.
                  </p>
                  <p>
                    <strong className="text-foreground">High-Functioning Addiction:</strong> We specialize in identifying and confronting high-functioning addiction—helping families cut through the denial that comes with outward success and social respectability.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resources:</strong> We connect Santa Fe families with Christus St. Vincent Regional Medical Center, La Familia Medical Center, the Behavioral Health Services Division, and Santa Fe County Adult Behavioral Health—as well as residential programs statewide and nationally.
                  </p>
                  <p>
                    <strong className="text-foreground">Respectful, Effective Intervention:</strong> Every family has a different story. We listen first, build the right intervention team, and guide the process with proven, evidence-based methods.
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
                  Hope for Santa Fe Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible for every family in Santa Fe. The city that celebrates resilience, creativity, and cultural richness has the same capacity for personal transformation. We've seen families completely change when given the right professional guidance.
                  </p>
                  <p>
                    Whether the crisis is behind closed doors in a Canyon Road home or in a family struggling with generational addiction, Freedom Interventions is here to help. Call today for a free, confidential consultation.
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
              Get Help for Your Santa Fe Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Santa Fe County including Santa Fe, Pojoaque, Tesuque, and surrounding communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
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


      <LocationLinks currentLocation="Santa Fe" locationType="city" />
      <Footer />
    </div>
  );
};

export default SantaFeNewMexico;
