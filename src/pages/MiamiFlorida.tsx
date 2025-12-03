import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import miamiBanner from "@/assets/miami-florida-banner.jpg";

const MiamiFlorida = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Miami Florida Addiction Intervention Services | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Miami, Florida. Help your loved one recover from cocaine, fentanyl, and alcohol addiction. Serving Miami-Dade County and South Florida." />
        <meta name="keywords" content="Miami addiction intervention, Florida drug intervention, Miami family intervention, cocaine addiction Miami, fentanyl crisis South Florida" />
        <link rel="canonical" href="https://freedominterventions.com/miami-florida" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={miamiBanner} 
          alt="Miami Beach skyline at sunrise with Art Deco architecture" 
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
              Miami, Florida
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Miami's Addiction Crisis: Professional Intervention for South Florida Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Miami's party culture and position as a drug entry point create a perfect storm for addiction. From South Beach clubs to Coral Gables mansions, from Little Havana to Brickell's high-rises, families across Miami-Dade struggle with loved ones lost to cocaine, fentanyl, and alcohol. Freedom Interventions offers professional, compassionate help.
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
                  The Magic City's Dark Side
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Miami-Dade County recorded over 1,500 overdose deaths in 2023, making it one of Florida's deadliest counties for drug fatalities. Miami's role as an international gateway means high-purity cocaine and fentanyl flow through the region. The party lifestyle that attracts tourists creates an environment where addiction flourishes among residents.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1,500+</div>
                <p className="text-muted-foreground">Overdose deaths in Miami-Dade in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">60%</div>
                <p className="text-muted-foreground">Of cocaine now contains fentanyl</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Entry point for South American cocaine</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Miami's glamorous image hides a deadly reality. The cocaine that fueled the city's 1980s excess never left—it just got more dangerous. Today's supply is frequently laced with fentanyl, making stimulant use potentially fatal.
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
                  How Addiction Impacts Miami Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Miami's diverse communities face addiction differently. Cuban and Latin American families may struggle with stigma and machismo that prevents men from admitting they need help. The pressure to maintain appearances in Miami's image-conscious culture keeps addiction hidden until crisis.
                  </p>
                  <p>
                    The hospitality and nightlife industries that drive Miami's economy create environments saturated with drugs and alcohol. Workers in these industries face constant temptation, and what starts as partying with clients becomes personal addiction.
                  </p>
                  <p>
                    From Star Island's billionaires to Hialeah's working families, from Miami Beach's service workers to Kendall's suburban parents, addiction touches every neighborhood. The city's transient nature can make it harder for people to find stable recovery communities.
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
                  How Freedom Interventions Serves Miami Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Miami families in crisis. We understand the cultural dynamics of South Florida's diverse communities and navigate family systems with sensitivity.
                  </p>
                  <p>
                    <strong className="text-foreground">Bilingual Services:</strong> Si necesitan, les puedo comunicar en Español. We conduct interventions and family meetings in Spanish for families who prefer it.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Away from Triggers:</strong> Miami's party environment can undermine recovery. We help families determine whether local treatment or a program elsewhere is most appropriate.
                  </p>
                  <p>
                    <strong className="text-foreground">Quality Over Convenience:</strong> South Florida is saturated with treatment centers, but quality varies enormously. We help families avoid predatory programs and find facilities that provide genuine, evidence-based care.
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
                  Recovery Is Possible—Even in Miami
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    People get and stay sober in Miami. The city has a strong recovery community with meetings in English and Spanish throughout the metro. Many find that the same energy and ambition that drove their addiction becomes fuel for building a fulfilling sober life.
                  </p>
                  <p>
                    The fentanyl contamination of Miami's cocaine supply has made intervention more urgent than ever. Stimulant users who never touched opioids are dying from fentanyl-laced cocaine. Professional intervention can save your loved one's life.
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
              Get Help for Your Miami Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve all of South Florida including Fort Lauderdale, West Palm Beach, and surrounding communities.
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

export default MiamiFlorida;