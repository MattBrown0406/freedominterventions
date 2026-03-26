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

const FortCollinsColorado = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Colorado", href: "/colorado" },
    { name: "Fort Collins", href: "/fort-collins-colorado" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Fort Collins, Colorado | Freedom Interventions"
        description="Fort Collins families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Larimer County. Free consultation. (541) 838-6009."
        keywords="Fort Collins addiction intervention, Larimer County drug intervention, Fort Collins family intervention, CSU college addiction, opioid crisis Fort Collins, alcohol addiction Fort Collins, intervention specialist Northern Colorado"
        canonical="https://freedominterventions.com/fort-collins-colorado"
      />
      <LocalBusinessSchema location="Fort Collins" state="Colorado" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={coloradoBanner}
          alt="Fort Collins Colorado with Rocky Mountains backdrop"
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
              Fort Collins, Colorado
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Fort Collins' College-Age Addiction Crisis: Professional Intervention Services for Larimer County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Home to Colorado State University and a thriving craft beer culture, Fort Collins carries a significant hidden addiction burden—particularly among young adults. Freedom Interventions provides professional intervention services for Larimer County families navigating opioid, alcohol, and cannabis addiction in Northern Colorado's largest city.
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
                  Understanding Fort Collins' Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Larimer County has seen steady increases in overdose deaths and substance abuse admissions. The presence of Colorado State University creates a large young-adult population particularly vulnerable to alcohol normalization, opioid experimentation, and escalating cannabis use. Fort Collins' vibrant craft brewery scene can mask serious alcohol dependency in plain sight.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">33k+</div>
                <p className="text-muted-foreground">CSU students, many of whom are at elevated risk for substance use disorders</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rising</div>
                <p className="text-muted-foreground">Fentanyl-laced pills now entering the college-age population through counterfeit pharmaceuticals</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Alcohol remains the most common substance of abuse among young adults in Northern Colorado</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Fort Collins' outdoorsy, health-conscious identity creates a powerful stigma around addiction. Parents may minimize signs of addiction in a college student because the culture normalizes heavy drinking. Young adults who develop dependencies on alcohol, opioids, or cannabis often don't get help until a crisis forces the family's hand.
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
                  How Addiction Affects Fort Collins Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Parents of CSU students often sense something is wrong—declining grades, isolation, requests for money—but don't know how to confront it. The fear of damaging the relationship, or being labeled an overprotective parent, can delay intervention for months or years.
                  </p>
                  <p>
                    Young adults in Fort Collins often have access to unlimited alcohol through the city's bar and brewery scene. What begins as social drinking can escalate into physical dependency without the person—or their family—fully recognizing the shift.
                  </p>
                  <p>
                    Prescription opioid misuse remains a serious concern, particularly among athletes injured in recreational sports and young adults who begin with legally prescribed medication and progress to illicit use. Fentanyl contamination of the street drug supply makes any opioid use potentially fatal.
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
                  How Freedom Interventions Helps Fort Collins Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown has over 20 years of experience helping families intervene effectively—including with young adults who are resistant, in denial, or outright hostile to the idea of getting help. We know how to reach people who believe they don't have a problem.
                  </p>
                  <p>
                    <strong className="text-foreground">Young Adult Expertise:</strong> College-age intervention requires a different approach than working with older adults. We tailor each intervention to the person's age, developmental stage, and the specific substances involved.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Network:</strong> We connect Fort Collins families with UCHealth Poudre Valley, SummitStone Health Partners, and Larimer County Behavioral Health—as well as residential programs across Colorado and the nation.
                  </p>
                  <p>
                    <strong className="text-foreground">Parent Support:</strong> We help parents understand the difference between support and enabling, how to set boundaries that actually hold, and how to take care of themselves during this crisis.
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
                  Hope for Fort Collins Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even for young adults who are convinced they have no problem. We've helped families throughout Northern Colorado—from Fort Collins to Loveland, Greeley to Longmont—guide their loved ones into treatment and watched lives transform.
                  </p>
                  <p>
                    The window for intervention matters. The earlier families act, the better the outcomes. Don't wait for a DUI, an overdose, or a dropout notice. Call for a free consultation today.
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
              Get Help for Your Fort Collins Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Larimer County including Fort Collins, Loveland, Berthoud, and Estes Park.
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

      <LocationLinks currentLocation="Fort Collins" locationType="city" />
      <Footer />
    </div>
  );
};

export default FortCollinsColorado;
