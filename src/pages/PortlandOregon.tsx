import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import portlandBanner from "@/assets/portland-oregon-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const PortlandOregon = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Portland Oregon Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Portland, Oregon. Help your loved one find recovery from fentanyl, methamphetamine, and alcohol addiction. Free consultations available."
        canonical="https://freedominterventions.com/portland-oregon"
        keywords="Portland addiction intervention, Oregon drug intervention, Portland family intervention, fentanyl crisis Portland, addiction help Portland OR"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Portland" state="OR" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Oregon", url: "https://freedominterventions.com/oregon" },
          { name: "Portland", url: "https://freedominterventions.com/portland-oregon" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Oregon", href: "/oregon" },
        { name: "Portland", href: "/portland-oregon" },
      ]} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={portlandBanner} 
          alt="Portland Oregon skyline with bridge over Willamette River at sunrise" 
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
              Portland, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Portland's Addiction Crisis: Professional Intervention Services for Families in Need
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Portland faces an unprecedented addiction emergency. With overdose deaths reaching record highs and open-air drug markets affecting neighborhoods citywide, families need professional guidance now more than ever. Freedom Interventions provides compassionate, effective intervention services to help your loved one find the path to recovery.
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
                  Understanding Portland's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Multnomah County, home to Portland, recorded over 700 overdose deaths in 2023—a staggering increase driven primarily by fentanyl and methamphetamine. The Rose City has become ground zero for Oregon's addiction crisis, with visible drug use in downtown areas, along the waterfront, and in once-quiet neighborhoods throughout the city.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">700+</div>
                <p className="text-muted-foreground">Overdose deaths in Multnomah County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <p className="text-muted-foreground">Increase in meth-related emergencies since 2020</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The combination of Measure 110's decriminalization policies, an overwhelmed treatment system, and the flood of synthetic opioids has created a perfect storm. Families across Portland—from the Pearl District to Gresham, from St. Johns to Lake Oswego—are watching loved ones struggle with addiction and feeling powerless to help.
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
                  How Addiction Affects Portland Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Portland's progressive, tight-knit communities have been hit hard by the addiction epidemic. Parents in neighborhoods like Alberta, Sellwood, and Hawthorne are discovering their adult children addicted to fentanyl. Professionals in the tech and creative industries are hiding alcohol and stimulant dependencies. Families are losing members to overdoses at an alarming rate.
                  </p>
                  <p>
                    The shame and stigma surrounding addiction in Portland's educated, health-conscious culture often prevents families from seeking help. Many believe their loved one will simply "choose" to get better, not understanding that addiction fundamentally changes brain chemistry and requires professional intervention.
                  </p>
                  <p>
                    Whether your loved one is struggling on the streets of Old Town or hiding their addiction behind a successful career in the West Hills, Freedom Interventions understands the unique challenges Portland families face.
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
                  How Freedom Interventions Helps Portland Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Based in Oregon and with over 20 years of experience, Freedom Interventions specializes in helping Portland-area families navigate the intervention process. Our approach combines professional expertise with genuine compassion—we understand Portland's culture and the specific treatment resources available in the Pacific Northwest.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Knowledge:</strong> We know which Portland-area detox facilities can handle fentanyl withdrawal safely, which treatment centers align with your family's values, and how to navigate Oregon's unique treatment landscape.
                  </p>
                  <p>
                    <strong className="text-foreground">Crisis Response:</strong> When your loved one is ready—or when circumstances create an opening—we can be there within hours. Timing is critical in intervention work, and our local presence means faster response times for Portland families.
                  </p>
                  <p>
                    <strong className="text-foreground">Family-Centered Approach:</strong> Addiction affects the entire family system. We help families establish healthy boundaries, end enabling patterns, and begin their own healing while supporting their loved one's recovery journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hope for Portland Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the dire statistics, recovery is possible. Every week, we help Portland families guide their loved ones into treatment. We've worked with families from every corner of the metro area—from Forest Grove to Troutdale, from Vancouver to Oregon City—and seen remarkable transformations.
                  </p>
                  <p>
                    The key is taking action before it's too late. Fentanyl has made the margin for error nearly nonexistent. What might have been a close call five years ago is now often fatal. If your loved one is struggling with addiction in Portland, the time to act is now.
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
              Get Help for Your Portland Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all Portland metro areas including Beaverton, Tigard, Lake Oswego, Clackamas, Gresham, and surrounding communities.
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

      <LocationLinks currentLocation="Portland" locationType="city" parentState="Oregon" />

      <Footer />
    </div>
  );
};

export default PortlandOregon;