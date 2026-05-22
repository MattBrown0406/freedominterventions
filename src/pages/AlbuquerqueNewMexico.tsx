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

const AlbuquerqueNewMexico = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "New Mexico", href: "/new-mexico" },
    { name: "Albuquerque", href: "/albuquerque-new-mexico" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Albuquerque, New Mexico | Freedom Interventions"
        description="Albuquerque families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Bernalillo County. Free consultation. (541) 668-8084."
        keywords="Albuquerque addiction intervention, Bernalillo County drug intervention, Albuquerque family intervention, fentanyl Albuquerque, heroin crisis Albuquerque, New Mexico overdose, intervention specialist Albuquerque NM"
        canonical="https://freedominterventions.com/albuquerque-new-mexico"
      />
      <LocalBusinessSchema location="Albuquerque" state="New Mexico" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={newMexicoBanner}
          alt="Albuquerque New Mexico landscape with Sandia Mountains"
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
              Albuquerque, New Mexico
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Albuquerque's Overdose Emergency: Professional Intervention Services for Bernalillo County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Albuquerque has earned the tragic distinction of having one of the highest per-capita overdose death rates of any major American city. With fentanyl, methamphetamine, and heroin devastating Bernalillo County families—particularly within Native American and Latino communities—professional intervention is more urgently needed than ever. Freedom Interventions provides expert, compassionate help for Albuquerque families ready to act.
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
                  Understanding Albuquerque's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Albuquerque's overdose crisis is not a statistic—it's a daily reality for thousands of families. New Mexico consistently ranks as one of the worst states for drug overdose deaths, and Bernalillo County sits at the heart of the crisis. Fentanyl has overtaken heroin as the primary driver of overdose deaths, while methamphetamine continues to destroy families across the city.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Albuquerque ranks among the highest overdose death rates per capita of any major US city</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">565k+</div>
                <p className="text-muted-foreground">Bernalillo County residents facing one of the nation's most severe addiction crises</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <p className="text-muted-foreground">Native American New Mexicans die from overdose at three times the rate of white New Mexicans</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The crisis in Albuquerque is deeply rooted in historical trauma, poverty, and systemic underinvestment in behavioral health resources. Neighborhoods like the International District, the South Valley, and the Route 66 corridor have been particularly devastated. But addiction does not respect neighborhood boundaries—it affects families in the Northeast Heights, Rio Rancho, and everywhere in between.
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
                  How Addiction Affects Albuquerque Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Albuquerque, addiction often runs across generations. Families who have watched parents and grandparents struggle with substance use may believe it's inevitable—a fatalism that delays intervention and enables the cycle to continue. This is one of the most important myths we help families confront.
                  </p>
                  <p>
                    Cultural values around family loyalty and privacy, particularly within Latino and Native American communities, can make it extremely difficult to involve outside professionals. Families carry enormous shame and often wait far too long before reaching out. We approach every family with deep respect for these dynamics.
                  </p>
                  <p>
                    The visibility of homelessness and open drug use in parts of Albuquerque can normalize addiction to the point where families struggle to recognize when their loved one has crossed a line that requires immediate intervention.
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
                  How Freedom Interventions Helps Albuquerque Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of professional intervention experience to Albuquerque families. In a city where the addiction crisis is severe and treatment resources can be overwhelmed, having an experienced interventionist in your corner makes a critical difference.
                  </p>
                  <p>
                    <strong className="text-foreground">Cultural Competence:</strong> We approach Albuquerque's diverse communities with respect and cultural awareness. Family-centered values, when channeled correctly, can be powerful drivers of change.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resources:</strong> We work with Albuquerque's treatment community including Presbyterian Behavioral Health, UNM Hospital's behavioral health services, First Step Homes, and the Albuquerque Opportunity Center—plus a full national network for specialized residential care.
                  </p>
                  <p>
                    <strong className="text-foreground">Breaking the Cycle:</strong> Generational addiction is not destiny. Professional intervention, combined with strong family boundaries and quality treatment, can interrupt a cycle that has run for decades.
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
                  Hope for Albuquerque Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery happens in Albuquerque every day. Despite the severity of the crisis, families who take decisive, professionally guided action see real results. We've helped families across Bernalillo County and throughout New Mexico guide their loved ones into recovery.
                  </p>
                  <p>
                    The statistics are dire. The situation is urgent. But hope is real. Don't let another day pass without taking action. A free, confidential consultation can be the first step toward your family's healing.
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
              Get Help for Your Albuquerque Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Bernalillo County including Albuquerque, Rio Rancho, Corrales, and surrounding communities.
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


      <LocationLinks currentLocation="Albuquerque" locationType="city" />
      <Footer />
    </div>
  );
};

export default AlbuquerqueNewMexico;
