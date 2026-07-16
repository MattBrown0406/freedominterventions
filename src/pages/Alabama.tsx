import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Alabama = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Alabama Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Alabama's Addiction Crisis: How Professional Interventionists Help Families Find Hope
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Alabama faces significant challenges with substance use disorders, with opioid and methamphetamine abuse affecting communities across the state. Professional intervention services offer families a proven path toward recovery and healing.
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

      {/* Key Statistics */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,100+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200K+</div>
              <div className="text-sm text-muted-foreground">Residents Affected</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Understanding Alabama's Addiction Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Alabama has been significantly impacted by the opioid epidemic, with prescription drug misuse leading to increased heroin and fentanyl use. Rural communities face particular challenges with limited access to treatment resources and stigma surrounding addiction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Methamphetamine use has also surged across the state, creating complex polysubstance abuse patterns that require specialized intervention approaches. Families often feel helpless as they watch loved ones struggle with these powerful substances.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why Alabama Families Choose Professional Intervention
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional interventionists understand Alabama's unique cultural and geographic challenges. They work with families to create customized intervention plans that respect local values while implementing evidence-based approaches proven to motivate treatment acceptance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Unlike confrontational approaches that often backfire, professional interventions use compassionate methods like ARISE and CRAFT that achieve significantly higher outcomes in getting loved ones into treatment.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Comprehensive Support for Alabama Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists provide end-to-end support, from initial family consultation through treatment placement and aftercare planning. They have established relationships with quality treatment centers throughout Alabama and neighboring states.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Services include family education, intervention planning and execution, treatment center selection, transportation coordination, and ongoing recovery support to ensure lasting sobriety.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Taking the First Step
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Every day without intervention is another day of risk. Professional interventionists help families break through denial and resistance, creating a clear way forward. The process begins with a confidential consultation to assess your unique situation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Help Is Available for Alabama Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Professional intervention services help Alabama families build a practical path forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/?type=consultation#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:458-298-8000">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 668-8084
              </a>
            </Button>
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


      <Footer />
    </div>
  );
};

export default Alabama;