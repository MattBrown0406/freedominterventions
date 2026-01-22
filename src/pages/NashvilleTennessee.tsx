import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import nashvilleBanner from "@/assets/nashville-tennessee-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const NashvilleTennessee = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Tennessee", href: "/tennessee" },
    { name: "Nashville", href: "/nashville-tennessee" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Nashville Tennessee Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Nashville, Tennessee. Help your loved one recover from opioid, alcohol, and methamphetamine addiction. Serving Davidson County and Middle Tennessee."
        keywords="Nashville addiction intervention, Tennessee drug intervention, Nashville family intervention, opioid crisis Nashville, fentanyl addiction Tennessee"
        canonical="https://freedominterventions.com/nashville-tennessee"
      />
      <LocalBusinessSchema location="Nashville" state="Tennessee" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={nashvilleBanner} 
          alt="Nashville skyline at sunrise with the Cumberland River" 
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
              Nashville, Tennessee
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Nashville's Addiction Crisis: Professional Intervention for Tennessee Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Music City's honky-tonk culture celebrates drinking, but Nashville's addiction problem extends far beyond alcohol. Tennessee has been devastated by the opioid crisis, and fentanyl is now the leading cause of death for adults under 50. From Broadway to Brentwood, families across Middle Tennessee are struggling. Freedom Interventions offers professional, compassionate help.
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
                  The Heart of Tennessee's Opioid Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tennessee recorded over 3,800 drug overdose deaths in 2023, with fentanyl driving the surge. Nashville and Middle Tennessee have been ground zero for the prescription opioid epidemic that evolved into today's fentanyl crisis. The same doctors who over-prescribed pills now watch patients die from street drugs.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3,800+</div>
                <p className="text-muted-foreground">Overdose deaths in Tennessee in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Cause of death for adults 18-49</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">90%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2019</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Nashville's explosive growth has brought new residents unfamiliar with the region's opioid history. Meanwhile, longtime residents carry the scars of a crisis that's killed multiple generations. The entertainment industry's hard-partying reputation normalizes dangerous behavior.
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
                  How Addiction Impacts Nashville Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Nashville families often struggle with the contradiction between religious values and addiction reality. The Bible Belt's moral framework can create shame that prevents seeking help. Families hide addiction to protect reputations, allowing the disease to progress.
                  </p>
                  <p>
                    The music industry and its associated nightlife create environments where substance use is expected. Artists, crew members, and industry workers face constant exposure to drugs and alcohol as part of their professional lives.
                  </p>
                  <p>
                    From Belle Meade's wealthy families to East Nashville's hipsters, from Antioch's working families to Franklin's affluent suburbs, addiction crosses every boundary. Nashville's rapid growth means many families lack established support networks when crisis hits.
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
                  How Freedom Interventions Serves Nashville Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Nashville families in crisis. We understand Southern culture and the particular challenges of addressing addiction in communities where faith and family reputation are paramount.
                  </p>
                  <p>
                    <strong className="text-foreground">Faith-Sensitive Approach:</strong> We can work with families whose faith is important to their identity, helping them see intervention as consistent with their values rather than contradicting them.
                  </p>
                  <p>
                    <strong className="text-foreground">Entertainment Industry Experience:</strong> We understand the unique pressures facing those in Nashville's music and entertainment industries and can help families navigate intervention for creative professionals.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> We help families find quality treatment, whether that means staying close to home or traveling to a program that removes the individual from Nashville's trigger-rich environment.
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
                  Recovery Is Possible in Nashville
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Nashville has a growing recovery community that includes faith-based programs, 12-step meetings, and alternative approaches. Many musicians and industry professionals have gotten sober and now mentor others. Recovery in Nashville is possible, and many find it transforms their creativity.
                  </p>
                  <p>
                    The fentanyl crisis has made intervention more urgent than ever. Tennessee's overdose death rate continues to climb. Professional intervention can save your loved one's life.
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
              Get Help for Your Nashville Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all of Middle Tennessee including Franklin, Murfreesboro, Clarksville, and surrounding communities.
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

      <LocationLinks currentLocation="Nashville" locationType="city" />
      <Footer />
    </div>
  );
};

export default NashvilleTennessee;