import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import eugeneBanner from "@/assets/eugene-oregon-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const EugeneOregon = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oregon", href: "/oregon" },
    { name: "Eugene", href: "/eugene-oregon" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Eugene Oregon Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Eugene, Oregon. Help your loved one recover from methamphetamine, fentanyl, and alcohol addiction. Serving Lane County and the Willamette Valley."
        keywords="Eugene addiction intervention, Lane County drug intervention, Eugene family intervention, meth crisis Eugene, addiction help Eugene OR"
        canonical="https://freedominterventions.com/eugene-oregon"
      />
      <LocalBusinessSchema location="Eugene" state="Oregon" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={eugeneBanner} 
          alt="Willamette River winding through forests with mountains in Eugene Oregon" 
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
              Eugene, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Eugene's Addiction Crisis: Professional Intervention Help for Lane County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Eugene's college-town character and outdoor lifestyle mask a serious addiction crisis. Methamphetamine and fentanyl have devastated families throughout Lane County, from the university area to Springfield and beyond. Freedom Interventions offers hope and professional guidance for families ready to help their loved ones recover.
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
                  Understanding Eugene's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Lane County has seen overdose deaths triple in recent years. Eugene, Oregon's second-largest city, struggles with both methamphetamine—which has long plagued the region—and the newer fentanyl crisis that has made every use potentially fatal. The city's visible homeless population and drug activity downtown reflect the broader addiction crisis affecting families across all demographics.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <p className="text-muted-foreground">Overdose deaths in Lane County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <p className="text-muted-foreground">Increase in overdose deaths since 2019</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#2</div>
                <p className="text-muted-foreground">Highest meth use rate in Oregon</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Eugene's counterculture history and tolerance for alternative lifestyles can make it difficult for families to distinguish between experimentation and addiction. Combined with limited treatment resources compared to larger cities, Lane County families often feel isolated in their struggle to help loved ones.
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
                  How Addiction Affects Eugene Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Eugene families face unique challenges. The University of Oregon brings thousands of young people to the area, and substance experimentation that begins at college parties can rapidly progress to addiction—especially with fentanyl-laced drugs circulating widely.
                  </p>
                  <p>
                    Working-class families in Springfield and east Lane County have been hit particularly hard by methamphetamine, which has devastated communities for decades. Now, with fentanyl mixing into the drug supply, the stakes are higher than ever.
                  </p>
                  <p>
                    Whether your loved one is a student at UO, a professional in the Willamette Valley, or struggling with long-term meth addiction, the pattern is the same: families try everything they know to help, and nothing works. That's where professional intervention becomes essential.
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
                  How Freedom Interventions Helps Eugene Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Based in Oregon, Freedom Interventions has deep roots in the Willamette Valley. We understand Eugene's community, its values, and its treatment resources. With over 20 years of experience, we've helped countless Lane County families guide their loved ones toward recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Oregon-Based Expertise:</strong> We know which local treatment options work best for different situations, from Eugene-area detox facilities to residential programs throughout Oregon and beyond.
                  </p>
                  <p>
                    <strong className="text-foreground">Meth-Specific Experience:</strong> Eugene's long history with methamphetamine means many families are dealing with loved ones who have used for years or decades. We understand the unique challenges of meth addiction and recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Rapid Response:</strong> Our Oregon location means we can be in Eugene quickly when timing is critical. When a window for intervention opens, we're ready.
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
                  Hope for Eugene Area Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery happens in Eugene every day. The same qualities that make this community special—its emphasis on wellness, its tight-knit neighborhoods, its connection to nature—can support lasting recovery once your loved one takes the first step.
                  </p>
                  <p>
                    But that first step often requires professional help. Addiction lies to its victims, telling them they don't have a problem or can quit anytime. A skilled intervention breaks through these defenses and opens the door to treatment.
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
              Get Help for Your Lane County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve Eugene, Springfield, Cottage Grove, Florence, and all Lane County communities.
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


      <LocationLinks currentLocation="Eugene" locationType="city" />
      <Footer />
    </div>
  );
};

export default EugeneOregon;