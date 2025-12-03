import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import spokaneBanner from "@/assets/spokane-washington-banner.jpg";

const SpokaneWashington = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Addiction Intervention Services in Spokane, Washington | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Spokane, WA. Help your loved one find lasting recovery with compassionate, experienced intervention support." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${spokaneBanner})` }}
          >
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background mb-6">
              Addiction Intervention Services in Spokane, Washington
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8">
              Guiding Spokane families through crisis to lasting recovery
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              The Addiction Crisis in Spokane
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Spokane and the Inland Northwest face significant challenges with substance abuse. The opioid epidemic has hit Eastern Washington communities particularly hard, with overdose deaths continuing to rise. Methamphetamine and alcohol addiction also remain major concerns throughout the Spokane region.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Many Spokane families struggle in silence, unsure how to help a loved one caught in the cycle of addiction. The isolation of watching someone you care about destroy their life while feeling powerless to intervene is devastating.
            </p>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              How Professional Intervention Helps
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A professional interventionist brings structure, experience, and emotional support to what can otherwise be a chaotic and unsuccessful attempt to help. We work with Spokane families to:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground mb-6 space-y-2">
              <li>Prepare family members for a productive, loving conversation</li>
              <li>Establish healthy boundaries that support recovery</li>
              <li>End enabling behaviors that perpetuate addiction</li>
              <li>Research and arrange appropriate treatment options</li>
              <li>Guide the intervention process from start to finish</li>
              <li>Provide aftercare support for the entire family</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Serving the Spokane Community
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              With over 20 years of experience helping families navigate addiction crises, we understand the unique challenges facing Spokane and Eastern Washington communities. We work closely with local treatment facilities and resources to ensure your loved one receives the best possible care.
            </p>

            <div className="bg-accent/10 p-8 rounded-lg mt-12">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Take the First Step Today
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                If someone you love in Spokane is struggling with addiction, don't wait for rock bottom. Professional intervention can save their life. Contact us for a free, confidential consultation.
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

export default SpokaneWashington;
