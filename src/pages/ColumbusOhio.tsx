import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import columbusBanner from "@/assets/columbus-ohio-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const ColumbusOhio = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Columbus Ohio Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Columbus, Ohio. Help your loved one find recovery from fentanyl, opioid, and methamphetamine addiction. Free consultations available."
        canonical="https://freedominterventions.com/columbus-ohio"
        keywords="Columbus addiction intervention, Ohio drug intervention, Columbus family intervention, opioid crisis Ohio, fentanyl addiction help Columbus OH"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Columbus" state="OH" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Ohio", url: "https://freedominterventions.com/ohio" },
          { name: "Columbus", url: "https://freedominterventions.com/columbus-ohio" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Ohio", href: "/ohio" },
        { name: "Columbus", href: "/columbus-ohio" },
      ]} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={columbusBanner} 
          alt="Columbus Ohio skyline with Scioto River" 
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
              Columbus, Ohio
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Columbus and Ohio's Addiction Crisis: Professional Intervention Services for Central Ohio Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ohio has been ground zero for America's opioid epidemic, and Columbus families continue to suffer devastating losses. With fentanyl now driving record overdose deaths, professional intervention can mean the difference between life and death. Freedom Interventions provides compassionate, effective services to help your loved one find recovery.
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
                  Understanding Ohio's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ohio consistently ranks among the states with the highest overdose death rates in America. Franklin County, home to Columbus, has seen devastating losses as fentanyl has replaced heroin and prescription opioids as the primary killer. The state's position along major drug trafficking routes has made it particularly vulnerable.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                <p className="text-muted-foreground">Overdose deaths in Ohio in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">90%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-muted-foreground">Highest overdose death rate in the nation</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From German Village to Dublin, from Clintonville to Grove City, addiction crosses every boundary in the Columbus metro. The combination of affordable fentanyl, widespread methamphetamine use, and limited treatment capacity has created an ongoing emergency for Ohio families.
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
                  How Addiction Affects Columbus Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Columbus families across all demographics are being devastated by addiction. Young professionals in the Short North are hiding stimulant and opioid dependencies. Suburban parents in Westerville and Upper Arlington are discovering their kids addicted to fentanyl. Working families are losing loved ones to overdoses at funeral after funeral.
                  </p>
                  <p>
                    Ohio's Midwestern values of self-reliance and privacy often prevent families from seeking help. Many believe they can handle the problem within the family, or that their loved one will eventually "hit bottom" and choose to get better. They don't realize that with fentanyl, bottom is often death.
                  </p>
                  <p>
                    Whether your loved one is struggling in downtown Columbus or hiding their addiction in Delaware County's suburbs, Freedom Interventions has the experience to help your family.
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
                  How Freedom Interventions Helps Columbus Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience helping families nationwide, Freedom Interventions provides comprehensive intervention services for Columbus-area families. We understand the severity of Ohio's crisis and have the expertise to help even in the most desperate situations.
                  </p>
                  <p>
                    <strong className="text-foreground">Crisis Experience:</strong> We've worked with families at every stage of addiction—from concerned parents noticing early warning signs to families who've already lost members to overdose. Our interventions are tailored to your specific circumstances.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Placement:</strong> We connect Columbus families with appropriate detox and treatment facilities throughout Ohio and nationwide—programs equipped to handle fentanyl withdrawal safely and provide lasting recovery support.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the whole family begin recovery, ending enabling patterns, establishing healthy boundaries, and providing support throughout the journey.
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
                  Hope for Central Ohio Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite Ohio's grim statistics, recovery is possible. Every day, people escape addiction and rebuild their lives. We've helped families throughout the Columbus metro guide their loved ones into treatment and witnessed remarkable transformations.
                  </p>
                  <p>
                    Waiting is the most dangerous choice. With fentanyl present in virtually every street drug, every day without intervention is another day your loved one risks fatal overdose. If someone you love in Columbus is struggling, If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
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
              Get Help for Your Columbus Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Columbus and Central Ohio including Dublin, Westerville, Grove City, Reynoldsburg, Delaware, and surrounding communities.
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


      <LocationLinks currentLocation="Columbus" locationType="city" parentState="Ohio" />

      <Footer />
    </div>
  );
};

export default ColumbusOhio;