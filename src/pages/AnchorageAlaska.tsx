import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import anchorageBanner from "@/assets/anchorage-alaska-banner.jpg";

const AnchorageAlaska = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Addiction Intervention Services in Anchorage, Alaska | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Anchorage, AK. Help your loved one find lasting recovery with compassionate, experienced intervention support." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${anchorageBanner})` }}
          >
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background mb-6">
              Addiction Intervention Services in Anchorage, Alaska
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8">
              Bringing hope to Alaska families facing addiction
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Addiction in Alaska's Largest City
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Anchorage and Alaska face unique addiction challenges. The state consistently ranks among the highest in the nation for alcohol abuse, while opioid and methamphetamine addiction have grown significantly. Alaska's isolation, long winters, and limited treatment resources make the addiction crisis particularly challenging.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Families in Anchorage often feel especially isolated when dealing with a loved one's addiction. Geographic barriers and limited local options can make it feel impossible to find help. But there is hope.
            </p>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Professional Intervention Across Distance
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We travel to Anchorage and throughout Alaska to help families intervene on their loved ones. Our comprehensive intervention services include:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground mb-6 space-y-2">
              <li>Virtual and in-person family preparation</li>
              <li>Education about addiction and Alaska-specific resources</li>
              <li>Establishing boundaries that support recovery</li>
              <li>Treatment placement throughout the Lower 48</li>
              <li>Travel coordination and escort to treatment</li>
              <li>Ongoing family support during and after treatment</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              National Reach, Personal Care
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              With over 20 years of experience and a commitment to helping families wherever they are, we bring professional intervention services to Alaska's frontier. We connect Anchorage families with appropriate treatment options across the country.
            </p>

            <div className="bg-accent/10 p-8 rounded-lg mt-12">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Distance Doesn't Have to Be a Barrier
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                If someone you love in Anchorage or anywhere in Alaska is struggling with addiction, help is available. Contact us today for a free consultation about intervention options.
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

export default AnchorageAlaska;
