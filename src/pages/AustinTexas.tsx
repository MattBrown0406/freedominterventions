import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import austinBanner from "@/assets/austin-texas-banner.jpg";

const AustinTexas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Austin Texas Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Austin, Texas. Help your loved one recover from fentanyl, opioids, alcohol, and stimulant addiction. Serving Travis County and Central Texas." />
        <meta name="keywords" content="Austin addiction intervention, Texas drug intervention, Austin family intervention, fentanyl crisis Austin, addiction help Austin TX" />
        <link rel="canonical" href="https://freedominterventions.com/austin-texas" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={austinBanner} 
          alt="Austin Texas Capitol building with Colorado River at golden hour" 
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
              Austin, Texas
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Austin's Growing Addiction Crisis: Professional Intervention Services for Central Texas Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Austin's explosive growth has brought prosperity—and a devastating addiction crisis. Behind the tech boom and vibrant music scene, families throughout Central Texas struggle with loved ones lost to fentanyl, stimulants, and alcohol. Freedom Interventions provides professional, compassionate intervention services to help your family find hope.
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
                  Travis County's Accelerating Overdose Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Travis County overdose deaths have more than tripled since 2019, with fentanyl now present in nearly 70% of fatal overdoses. Austin's young, ambitious population is particularly vulnerable—fake prescription pills laced with fentanyl have killed dozens of college students and young professionals. The city's party scene and high-stress tech culture create fertile ground for addiction.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Overdose deaths in Travis County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">300%</div>
                <p className="text-muted-foreground">Increase in overdose deaths since 2019</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">70%</div>
                <p className="text-muted-foreground">Of overdoses involve fentanyl</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Austin's "Keep Austin Weird" culture can mask warning signs of addiction. What looks like festival lifestyle or tech-bro excess may actually be addiction spiraling out of control. The city's rapid growth also means many residents lack the support networks that might catch addiction early.
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
                  How Addiction Impacts Austin Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Austin's unique culture creates specific addiction patterns. Tech workers numbing burnout with Adderall and alcohol. Musicians self-medicating with opioids. Young transplants whose recreational drug use turned deadly when fentanyl entered the supply. UT students experimenting with pills that turn out to be counterfeit.
                  </p>
                  <p>
                    Many Austin families are far from their original support networks, having moved for opportunity. When addiction strikes, they lack the family and community connections that might have caught the problem earlier. By the time parents in other states realize something is wrong with their adult child in Austin, addiction may have taken deep root.
                  </p>
                  <p>
                    From the Domain to South Austin, from Round Rock to Bastrop, Central Texas families need professional help to navigate the complex path to recovery.
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
                  How Freedom Interventions Serves Austin Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Texas families in crisis. We work with families throughout Central Texas and can travel quickly when timing is critical. Our national treatment network ensures we can find the right program for your loved one, whether in Texas or elsewhere.
                  </p>
                  <p>
                    <strong className="text-foreground">Tech Industry Experience:</strong> We understand the pressures and privacy concerns of Austin's tech workers and professionals. Our interventions can be conducted discreetly, protecting careers while saving lives.
                  </p>
                  <p>
                    <strong className="text-foreground">Young Adult Specialists:</strong> Austin's young population requires approaches tailored to their unique challenges. We help parents navigate the difficult task of intervening with adult children.
                  </p>
                  <p>
                    <strong className="text-foreground">National Treatment Network:</strong> Texas has excellent treatment options, and we know which programs deliver results. We also connect families with facilities throughout the country when a fresh start in a new location makes sense.
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
                  Hope for Austin Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Austin has a thriving recovery community and growing treatment resources. The same innovation and determination that fuel the city's success can be channeled toward recovery. With professional intervention guidance, families break through denial and open the door to a new life.
                  </p>
                  <p>
                    But the fentanyl crisis has made urgency essential. Every day of active addiction carries life-threatening risks. If your loved one is struggling in Austin, the time to act is now—before hope becomes heartbreak.
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
              Get Help for Your Austin Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all Central Texas communities including Austin, Round Rock, Cedar Park, Georgetown, San Marcos, and surrounding areas.
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

export default AustinTexas;