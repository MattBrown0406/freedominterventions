import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import texasBanner from "@/assets/texas-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const PlanoTexas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Texas", href: "/texas" },
    { name: "Plano", href: "/plano-texas" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Plano, Texas | Freedom Interventions"
        description="Plano families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Collin County. Free consultation. (541) 668-8084."
        keywords="Plano addiction intervention, Collin County drug intervention, Plano family intervention, affluent addiction Texas, prescription opioid Plano, teen drug crisis Plano TX, high-functioning addiction DFW, intervention specialist Plano"
        canonical="https://freedominterventions.com/plano-texas"
      />
      <LocalBusinessSchema location="Plano" state="Texas" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={texasBanner}
          alt="Plano Texas affluent suburb skyline"
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
              Plano, Texas
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Plano's Affluent Addiction Crisis: Professional Intervention Services for Collin County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Plano gained national attention in the 1990s for a teen heroin crisis that shocked the country—and the problem never fully went away. Today, prescription opioid misuse, high-functioning addiction, and a new generation of fentanyl exposure are devastating families behind Collin County's well-maintained facades. Freedom Interventions provides expert intervention services designed for the unique dynamics of affluent suburban addiction.
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
                  Understanding Plano's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Plano's affluence is both its greatest asset and its greatest blind spot when it comes to addiction. Wealth provides access to treatment resources, but it also enables high-functioning addiction to persist far longer than in less-resourced communities. Parents cover for children. Spouses make excuses. The family system reorganizes around the addiction while maintaining a perfect appearance to the outside world.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">285k+</div>
                <p className="text-muted-foreground">Plano residents in one of Texas's most affluent communities—where addiction hides in plain sight</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">National</div>
                <p className="text-muted-foreground">Plano's 1990s teen heroin crisis put suburban opioid addiction on the national map—a problem that never fully resolved</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Hidden</div>
                <p className="text-muted-foreground">High-functioning addiction in professional communities is among the hardest to identify and the most resistant to intervention</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Today's Plano families face a new version of an old problem. Prescription opioids obtained legally—or through friends with prescriptions—create dependencies that families don't recognize until crisis strikes. Fentanyl contamination of the recreational drug supply means any experimentation carries lethal risk. And alcohol, in Plano's culture of corporate entertaining and suburban socializing, quietly devastates families who never see it coming.
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
                  How Addiction Affects Plano Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Plano, the appearance of success is everything. A corporate executive with a pill problem, a teenager supplementing sports injuries with opioids, a stay-at-home parent whose wine consumption has crossed into dependency—these stories play out behind closed doors in some of Collin County's most impressive zip codes.
                  </p>
                  <p>
                    Wealth enables families to manage the consequences of addiction longer. Legal fees get paid. Rehab stints get funded—sometimes multiple times without real change. The family keeps bailing out the addicted person, not realizing that removing consequences removes the motivation to get better.
                  </p>
                  <p>
                    Teen addiction in Plano carries particular urgency. Adolescent brains are more susceptible to addiction, and peer pressure in a high-achievement environment—combined with access to money and prescription drugs—creates conditions where addiction can take hold quickly and severely.
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
                  How Freedom Interventions Helps Plano Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown has over 20 years of experience helping families in affluent communities confront the reality of addiction and stop enabling the behavior that allows it to continue. We understand the unique dynamics of high-functioning addiction and how to cut through the denial that wealth makes possible.
                  </p>
                  <p>
                    <strong className="text-foreground">High-Functioning Addiction Expertise:</strong> We specialize in the intervention dynamics unique to affluent families—addressing enabling behaviors, financial codependency, and the deep denial that resources make possible.
                  </p>
                  <p>
                    <strong className="text-foreground">Premium Treatment Network:</strong> We connect Plano families with Texas Health Presbyterian Plano, Baylor Scott & White, The Meadows (nearby in Wickenburg, AZ), and Nexus Recovery Center—plus an extensive national network of high-quality residential programs.
                  </p>
                  <p>
                    <strong className="text-foreground">Consequences That Matter:</strong> Money and resources can insulate addicts from consequences indefinitely. We help families understand how to make those consequences real—while doing so in a way that's loving and strategic, not punitive.
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
                  Hope for Plano Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible even for the most entrenched high-functioning addict. We've helped Plano families stop the cycle of rescue-and-relapse and find a path to genuine, lasting recovery.
                  </p>
                  <p>
                    Plano families have resources. The question is whether they're being used to enable the addiction or to end it. Professional intervention helps you make that shift. Call today for a free, confidential consultation.
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
              Get Help for Your Plano Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Collin County including Plano, Frisco, McKinney, Allen, Richardson, and surrounding communities.
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


      <LocationLinks currentLocation="Plano" locationType="city" />
      <Footer />
    </div>
  );
};

export default PlanoTexas;
