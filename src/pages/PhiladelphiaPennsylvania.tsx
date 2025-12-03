import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import philadelphiaBanner from "@/assets/philadelphia-pennsylvania-banner.jpg";

const PhiladelphiaPennsylvania = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Addiction Intervention Services in Philadelphia, Pennsylvania | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Philadelphia, PA. Help your loved one find lasting recovery with compassionate, experienced intervention support." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${philadelphiaBanner})` }}
          >
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background mb-6">
              Addiction Intervention Services in Philadelphia, Pennsylvania
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8">
              Bringing hope to Philadelphia families in crisis
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Philadelphia's Addiction Emergency
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Philadelphia faces one of the worst drug epidemics in the nation. The city has been devastated by opioid and fentanyl overdoses, with thousands dying each year. Kensington and other neighborhoods have become synonymous with open-air drug markets and visible addiction.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Behind every statistic is a family in crisis—parents, siblings, and children watching helplessly as addiction destroys someone they love. The City of Brotherly Love needs more families taking action through intervention.
            </p>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              How Professional Intervention Works
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Professional intervention provides a structured, compassionate approach to breaking through denial and resistance. For Philadelphia families, we offer:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground mb-6 space-y-2">
              <li>Pre-intervention family coaching and preparation</li>
              <li>Education about addiction as a disease</li>
              <li>Boundary setting and eliminating enabling</li>
              <li>Treatment research and placement assistance</li>
              <li>Professional facilitation of the intervention</li>
              <li>Post-intervention family support</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Experienced, Compassionate Help
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              With over 20 years of intervention experience and personal recovery, we understand addiction from every angle. We work with treatment facilities throughout Pennsylvania and nationally to find the right program for your loved one.
            </p>

            <div className="bg-accent/10 p-8 rounded-lg mt-12">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Your Family Doesn't Have to Face This Alone
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                If someone you love in Philadelphia is battling addiction, don't wait for another overdose. Professional intervention can save their life. Call today for a free consultation.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="tel:5038362136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PhiladelphiaPennsylvania;
