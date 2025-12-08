import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import omahaBanner from "@/assets/omaha-nebraska-banner.jpg";

const OmahaNebraska = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Omaha Nebraska Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Omaha, Nebraska. Help your loved one find recovery from methamphetamine, fentanyl, and alcohol addiction. Free consultations available." />
        <meta name="keywords" content="Omaha addiction intervention, Nebraska drug intervention, Omaha family intervention, meth crisis Nebraska, addiction help Omaha NE" />
        <link rel="canonical" href="https://freedominterventions.com/omaha-nebraska" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={omahaBanner} 
          alt="Omaha Nebraska cityscape along the Missouri River" 
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
              Omaha, Nebraska
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Omaha's Growing Addiction Crisis: Professional Intervention Services for Nebraska Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Omaha and the greater Nebraska region have seen alarming increases in methamphetamine and fentanyl addiction. From downtown Omaha to suburban communities in Council Bluffs, addiction is devastating families across the metro area. Freedom Interventions provides compassionate, professional intervention services to help your loved one find recovery.
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
                  Understanding Nebraska's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nebraska has experienced a dramatic surge in drug overdose deaths, with fentanyl and methamphetamine driving the crisis. The I-80 corridor has become a major drug trafficking route, flooding Omaha and surrounding communities with deadly substances.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">300+</div>
                <p className="text-muted-foreground">Overdose deaths in Nebraska in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">150%</div>
                <p className="text-muted-foreground">Increase in fentanyl deaths since 2019</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Meth remains the most seized drug</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The combination of methamphetamine from Mexican cartels and counterfeit pills laced with fentanyl has created a deadly crisis. Families throughout Douglas County, Sarpy County, and the greater Omaha metro are losing loved ones at unprecedented rates.
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
                  How Addiction Affects Omaha Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Nebraska's hardworking, family-oriented culture makes watching a loved one struggle with addiction especially painful. Parents in neighborhoods from West Omaha to Bellevue watch their children transform from promising students to unrecognizable addicts. Working families lose wage earners to overdoses, leaving children without parents.
                  </p>
                  <p>
                    The stigma of addiction in close-knit Midwestern communities often prevents families from seeking help. Many believe their loved one simply lacks willpower, not understanding that addiction is a brain disease requiring medical intervention.
                  </p>
                  <p>
                    Whether your loved one started with prescription pills after a work injury or discovered meth through acquaintances, Freedom Interventions understands the unique challenges facing Nebraska families.
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
                  How Freedom Interventions Helps Omaha Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience helping families nationwide, Freedom Interventions provides comprehensive intervention services for Omaha-area families. We approach each family with compassion and respect for your values while providing the professional expertise needed to break through addiction.
                  </p>
                  <p>
                    <strong className="text-foreground">Experienced Guidance:</strong> We've helped families in every stage of addiction crisis, from early intervention to emergency situations. Our approach is tailored to your family's specific circumstances and your loved one's unique needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Placement:</strong> We connect Omaha families with appropriate treatment facilities throughout Nebraska and nationwide—programs equipped to handle fentanyl and meth addiction with high success rates.
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
                  Hope for Nebraska Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the devastating statistics, recovery happens every day in Nebraska. We've helped families throughout the Omaha metro guide their loved ones from the depths of addiction into treatment and lasting recovery. Your family's story can change too.
                  </p>
                  <p>
                    Fentanyl has made every day without intervention a gamble with your loved one's life. Don't wait for rock bottom—it may be too late. If someone you love in Omaha is struggling with addiction, the time to act is now.
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
              Get Help for Your Omaha Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Omaha and Nebraska including Council Bluffs, Bellevue, Papillion, La Vista, Lincoln, and surrounding communities.
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

      <Footer />
    </div>
  );
};

export default OmahaNebraska;