import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import baltimoreBanner from "@/assets/baltimore-maryland-banner.jpg";

const BaltimoreMaryland = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Addiction Intervention Services in Baltimore, Maryland | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Baltimore, MD. Help your loved one find lasting recovery with compassionate, experienced intervention support." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${baltimoreBanner})` }}
          >
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background mb-6">
              Addiction Intervention Services in Baltimore, Maryland
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8">
              Guiding Baltimore families from crisis to recovery
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Baltimore's Struggle with Addiction
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Baltimore has long battled one of the highest addiction rates in America. The heroin and opioid epidemic has claimed thousands of lives, while cocaine, fentanyl, and alcohol continue to devastate families across all neighborhoods and demographics.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Families throughout Baltimore and the greater Maryland area know the heartbreak of watching addiction consume someone they love. Many have tried everything they can think of, yet their loved one continues spiraling deeper into substance abuse.
            </p>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Breaking Through with Professional Intervention
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A professional intervention creates a powerful moment of clarity. Working with Baltimore families, we provide:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground mb-6 space-y-2">
              <li>Thorough family preparation and role assignments</li>
              <li>Education about addiction and recovery</li>
              <li>Establishing and maintaining healthy boundaries</li>
              <li>Treatment facility research and arrangements</li>
              <li>Compassionate intervention facilitation</li>
              <li>Aftercare planning for patient and family</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Experience That Makes the Difference
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              With over two decades of intervention experience and personal recovery, we bring understanding and expertise to every family we serve. We connect Baltimore families with treatment options throughout Maryland and across the country.
            </p>

            <div className="bg-accent/10 p-8 rounded-lg mt-12">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Take Action Before It's Too Late
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                If someone you love in Baltimore is struggling with addiction, waiting is dangerous. Professional intervention can be the lifeline your family needs. Contact us for a free, confidential consultation.
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

export default BaltimoreMaryland;
