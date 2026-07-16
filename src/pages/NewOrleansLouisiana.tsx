import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import newOrleansBanner from "@/assets/new-orleans-louisiana-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const NewOrleansLouisiana = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Louisiana", href: "/louisiana" },
    { name: "New Orleans", href: "/new-orleans-louisiana" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="New Orleans Louisiana Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in New Orleans, Louisiana. Help your loved one recover from heroin, fentanyl, and alcohol addiction. Serving Orleans Parish and surrounding areas."
        keywords="New Orleans addiction intervention, Louisiana drug intervention, NOLA family intervention, fentanyl crisis New Orleans, heroin addiction Louisiana"
        canonical="https://freedominterventions.com/new-orleans-louisiana"
      />
      <LocalBusinessSchema location="New Orleans" state="Louisiana" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={newOrleansBanner} 
          alt="New Orleans French Quarter at dawn with historic architecture" 
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
              New Orleans, Louisiana
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              New Orleans Addiction Crisis: Professional Intervention for Louisiana Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The Big Easy's celebration culture masks a serious addiction crisis. New Orleans has always had a complicated relationship with alcohol, and now fentanyl and heroin have devastated the city. From the Garden District to the Ninth Ward, families across Orleans Parish are struggling. Freedom Interventions offers professional, compassionate help.
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
                  The Crescent City's Hidden Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Louisiana recorded over 2,500 drug overdose deaths in 2023, with the New Orleans metro heavily impacted. The city's party culture normalizes heavy drinking and drug use, making it difficult to recognize when someone has crossed the line into addiction. Fentanyl has infiltrated the heroin and cocaine supply, making any illicit drug use potentially fatal.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                <p className="text-muted-foreground">Overdose deaths in Louisiana in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <p className="text-muted-foreground">Of opioid deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Alcohol availability normalizes addiction</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              New Orleans never stops partying, which means addiction triggers are everywhere. The line between celebration and dependency blurs in a city where drinking at 8 AM is culturally acceptable. Many people don't realize they have a problem until it's severe.
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
                  How Addiction Impacts New Orleans Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    New Orleans families are tight-knit and multigenerational, which can both help and hinder intervention. Strong family bonds mean there's support for recovery, but they can also enable addiction. The "laissez-faire" attitude that makes the city charming can prevent families from confronting substance abuse.
                  </p>
                  <p>
                    The hospitality and service industries that drive the economy create environments where substance use is normalized. Bartenders, musicians, and restaurant workers often work in contexts where heavy drinking and drug use are part of the culture.
                  </p>
                  <p>
                    Hurricane Katrina's trauma still echoes through many families, with addiction often rooted in unprocessed grief and loss. From Uptown's historic mansions to New Orleans East's working families, addiction has touched every community.
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
                  How Freedom Interventions Serves New Orleans Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to New Orleans families in crisis. We understand the unique cultural dynamics of the city and can navigate complex family systems with sensitivity.
                  </p>
                  <p>
                    <strong className="text-foreground">Cultural Understanding:</strong> We appreciate that New Orleans culture is unique and that recovery must work within that context. We help families find paths to sobriety that honor their heritage while breaking destructive patterns.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Away from Triggers:</strong> For many New Orleans residents, recovery requires leaving the city, at least initially. We have relationships with excellent programs nationwide and can help determine the right fit.
                  </p>
                  <p>
                    <strong className="text-foreground">Trauma-Informed Approach:</strong> Many New Orleans addictions are rooted in trauma, whether from Katrina, crime, or poverty. We understand these connections and help families find treatment that addresses underlying issues.
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
                  Recovery Is Possible—Even in New Orleans
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    People get and stay sober in New Orleans. The city has 12-step meetings throughout the metro and a recovery community that understands the unique challenges of staying sober in a party city. Many find that the same community bonds that enabled their drinking become supports for sobriety.
                  </p>
                  <p>
                    The fentanyl crisis has made intervention more urgent than ever. The drugs available on New Orleans streets today are far more dangerous than a generation ago. Professional intervention can help your family create a real opening for treatment.
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
              Get Help for Your New Orleans Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve the entire New Orleans metro including Metairie, Kenner, the North Shore, and surrounding communities.
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


      <LocationLinks currentLocation="New Orleans" locationType="city" />
      <Footer />
    </div>
  );
};

export default NewOrleansLouisiana;