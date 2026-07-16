import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import knoxvilleBanner from "@/assets/knoxville-tennessee-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const KnoxvilleTennessee = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Tennessee", href: "/tennessee" },
    { name: "Knoxville", href: "/knoxville-tennessee" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Knoxville Tennessee Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Knoxville, Tennessee. Help your loved one find recovery from opioid, fentanyl, and methamphetamine addiction. Free consultations available."
        keywords="Knoxville addiction intervention, Tennessee drug intervention, Knoxville family intervention, opioid crisis East Tennessee, addiction help Knoxville TN"
        canonical="https://freedominterventions.com/knoxville-tennessee"
      />
      <LocalBusinessSchema location="Knoxville" state="Tennessee" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={knoxvilleBanner} 
          alt="Knoxville Tennessee cityscape with Great Smoky Mountains backdrop" 
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
              Knoxville, Tennessee
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Knoxville's Opioid Crisis: Professional Intervention Services for East Tennessee Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Knoxville and East Tennessee have been devastated by the opioid epidemic. From prescription pills to fentanyl, addiction has torn through families in communities from the Smoky Mountains to the Cumberland Plateau. Freedom Interventions provides compassionate, professional intervention services to help your loved one find recovery.
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
                  Understanding East Tennessee's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  East Tennessee was ground zero for the prescription opioid epidemic, and the region continues to suffer some of the highest addiction and overdose rates in the nation. Knox County and surrounding areas have seen overdose deaths surge as fentanyl has replaced prescription pills and heroin.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3,500+</div>
                <p className="text-muted-foreground">Overdose deaths in Tennessee in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 10</div>
                <p className="text-muted-foreground">Highest overdose death rate in the U.S.</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The combination of legacy prescription opioid addiction, methamphetamine manufacturing, and the influx of fentanyl has created a multi-front crisis. Families throughout Knox County, Sevier County, Blount County, and the greater Knoxville metro are losing loved ones at alarming rates.
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
                  How Addiction Affects Knoxville Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    East Tennessee's strong faith and family traditions make watching a loved one struggle with addiction particularly painful. Parents in neighborhoods from Sequoyah Hills to Halls watch their children transform from promising students to unrecognizable addicts. Working families lose wage earners to overdoses, leaving children without parents.
                  </p>
                  <p>
                    The stigma of addiction in religious communities often prevents families from seeking help. Many believe their loved one simply lacks faith or willpower, not understanding that addiction is a medical illness with a spiritual dimension that requires clinical treatment and real change in how a person lives.
                  </p>
                  <p>
                    Whether your loved one started with prescription pills after an injury or discovered meth in the rural counties surrounding Knoxville, Freedom Interventions understands the unique challenges facing East Tennessee families.
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
                  How Freedom Interventions Helps Knoxville Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience helping families nationwide, Freedom Interventions provides comprehensive intervention services for Knoxville-area families. We approach each family with compassion and respect for your values while providing the professional expertise needed to break through addiction.
                  </p>
                  <p>
                    <strong className="text-foreground">Experienced Guidance:</strong> We've helped families in every stage of addiction crisis, from early intervention to emergency situations. Our approach is tailored to your family's specific circumstances and your loved one's unique needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Placement:</strong> We connect Knoxville families with appropriate treatment facilities throughout Tennessee and nationwide—programs equipped to handle fentanyl and meth addiction with high outcomes.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the whole family recover, ending enabling patterns, establishing healthy boundaries, and supporting everyone through the recovery journey.
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
                  Hope for East Tennessee Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the devastating statistics, recovery happens every day in East Tennessee. We've helped families throughout the Knoxville metro guide their loved ones from the depths of addiction into treatment and lasting recovery. Your family's story can change too.
                  </p>
                  <p>
                    Fentanyl has made every day without intervention a gamble with your loved one's life. The sooner families have a clear plan, the more options they have. If someone you love in Knoxville is struggling with addiction, If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
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
              Get Help for Your Knoxville Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Knoxville and East Tennessee including Oak Ridge, Maryville, Sevierville, Morristown, and surrounding communities.
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


      <LocationLinks currentLocation="Knoxville" locationType="city" />
      <Footer />
    </div>
  );
};

export default KnoxvilleTennessee;
