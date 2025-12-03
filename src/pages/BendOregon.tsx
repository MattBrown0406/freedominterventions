import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import bendBanner from "@/assets/bend-oregon-banner.jpg";

const BendOregon = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Addiction Intervention Services in Bend, Oregon | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Bend, OR. Help your loved one find lasting recovery with compassionate, experienced intervention support." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bendBanner})` }}
          >
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background mb-6">
              Addiction Intervention Services in Bend, Oregon
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8">
              Helping Central Oregon families find hope and healing
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Substance Abuse in Bend and Central Oregon
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Despite its reputation as an outdoor paradise, Bend and Central Oregon face serious substance abuse challenges. The region has seen increasing rates of opioid addiction, alcohol abuse, and methamphetamine use. The resort town atmosphere can sometimes mask the severity of addiction problems affecting local families.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Many families in Bend struggle with a loved one's addiction while maintaining appearances in a tight-knit community. The shame and isolation can prevent families from seeking the help they desperately need.
            </p>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Professional Intervention Services
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A professional intervention creates a structured opportunity for change. Working with Bend families, we provide:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground mb-6 space-y-2">
              <li>Comprehensive family preparation and education</li>
              <li>Boundary setting and ending enabling behaviors</li>
              <li>Treatment placement and coordination</li>
              <li>Facilitation of the intervention conversation</li>
              <li>Transportation to treatment when needed</li>
              <li>Ongoing family support throughout recovery</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Local Expertise, National Reach
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Based in Oregon with over 20 years of experience, we understand Central Oregon communities intimately. We work with treatment centers throughout the region and nation to find the right fit for your loved one's unique needs.
            </p>

            <div className="bg-accent/10 p-8 rounded-lg mt-12">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Don't Wait for Crisis
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                If someone you love in Bend is struggling with addiction, professional intervention can be the turning point. Contact us today for a free, confidential consultation.
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

export default BendOregon;
