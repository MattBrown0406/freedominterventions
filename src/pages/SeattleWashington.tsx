import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import seattleBanner from "@/assets/seattle-washington-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";

const SeattleWashington = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Seattle Washington Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Seattle, Washington. Help your loved one recover from fentanyl, opioid, and alcohol addiction. Serving King County and Puget Sound region."
        canonical="https://freedominterventions.com/seattle-washington"
        keywords="Seattle addiction intervention, Washington drug intervention, Seattle family intervention, fentanyl crisis Seattle, addiction help Seattle WA"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Seattle" state="WA" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Washington", url: "https://freedominterventions.com/washington" },
          { name: "Seattle", url: "https://freedominterventions.com/seattle-washington" },
        ]}
      />
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={seattleBanner} 
          alt="Seattle skyline with Space Needle and Puget Sound at sunrise" 
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
              Seattle, Washington
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Seattle's Addiction Crisis: Compassionate Intervention Services for Puget Sound Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Seattle's thriving tech economy masks a devastating addiction epidemic. Behind the prosperity, thousands of families struggle with loved ones lost to fentanyl, methamphetamine, and alcohol addiction. Freedom Interventions brings hope and professional guidance to families throughout the Puget Sound region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:503-836-2136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
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
                  The Scope of Seattle's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  King County experienced over 1,000 fatal overdoses in 2023, with fentanyl involved in more than 75% of these deaths. The crisis extends from downtown Seattle's Third Avenue to suburban communities in Bellevue, Redmond, and Kirkland. No neighborhood has been spared.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1,000+</div>
                <p className="text-muted-foreground">Fatal overdoses in King County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">75%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">300%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2019</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Seattle's high-stress tech culture, combined with easy access to synthetic opioids and methamphetamine, has created an addiction crisis affecting professionals, students, and families across all income levels. The Emerald City's homeless crisis is largely driven by untreated addiction, but the problem extends far beyond those living on the streets.
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
                  How Addiction Impacts Seattle Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Seattle's achievement-oriented culture, addiction often hides behind success. Tech workers numbing stress with opioids. Executives managing anxiety with alcohol. Young professionals experimenting with party drugs that turn out to be laced with fentanyl. By the time families recognize the problem, addiction has often taken deep root.
                  </p>
                  <p>
                    The stigma in Seattle's educated, health-conscious communities can be particularly isolating. Families feel they should be able to "figure this out" on their own. They try reasoning, pleading, and ultimatums—none of which work against the neurological changes addiction causes.
                  </p>
                  <p>
                    From Capitol Hill to Mercer Island, from the University District to Federal Way, Seattle families need professional help to navigate addiction intervention successfully.
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
                  How Freedom Interventions Serves Seattle Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions has helped families throughout the Pacific Northwest, including countless Seattle-area families, guide their loved ones into recovery. With over 20 years of experience, we understand the unique challenges Puget Sound families face.
                  </p>
                  <p>
                    <strong className="text-foreground">Regional Expertise:</strong> We know the treatment landscape in Washington State—from Seattle's downtown treatment centers to residential programs throughout the region. We'll help you find the right fit for your loved one's specific needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Executive & Professional Interventions:</strong> Seattle's professional class requires a delicate approach. We specialize in confidential interventions that protect careers while prioritizing recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> Your loved one isn't the only one who needs help. We guide families in establishing healthy boundaries and beginning their own recovery from the trauma of loving someone with addiction.
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
                  Recovery Is Possible in Seattle
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the grim statistics, we see recovery happen every day. Seattle has excellent treatment resources, strong recovery communities, and families who are willing to do the hard work of supporting their loved ones. With professional intervention guidance, the path to recovery becomes clear.
                  </p>
                  <p>
                    The fentanyl crisis has made speed essential. Every day of active addiction carries life-threatening risks. If your loved one is struggling, the time to act is now—before another dose becomes their last.
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
              Get Help for Your Seattle Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all Seattle metro areas including Bellevue, Tacoma, Everett, Kirkland, Redmond, Renton, and surrounding communities throughout Puget Sound.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:503-836-2136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Seattle" locationType="city" parentState="Washington" />

      <Footer />
    </div>
  );
};

export default SeattleWashington;