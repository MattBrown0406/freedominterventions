import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import columbusBanner from "@/assets/columbus-ohio-banner.jpg";

const ColumbusOhio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Addiction Intervention Services in Columbus, Ohio | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Columbus, OH. Help your loved one find lasting recovery with compassionate, experienced intervention support." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${columbusBanner})` }}
          >
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background mb-6">
              Addiction Intervention Services in Columbus, Ohio
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8">
              Guiding Columbus families toward hope and healing
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Ohio's Ongoing Addiction Crisis
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Ohio has been ground zero for the opioid epidemic, and Columbus has not been spared. The state consistently ranks among the highest for overdose deaths, with fentanyl now driving the majority of fatalities. Methamphetamine, cocaine, and alcohol addiction also continue to devastate families across central Ohio.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Families throughout the Columbus metro area know the heartbreak of watching addiction destroy someone they love. Despite trying everything they can think of—pleading, threatening, helping—nothing seems to work. Professional intervention offers a proven path forward.
            </p>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              The Power of Professional Intervention
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A well-planned intervention creates a moment of clarity that can break through denial and resistance. Our comprehensive services for Columbus families include:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground mb-6 space-y-2">
              <li>In-depth family preparation and coaching</li>
              <li>Understanding addiction as a medical condition</li>
              <li>Setting and maintaining healthy boundaries</li>
              <li>Treatment research and placement services</li>
              <li>Professional intervention facilitation</li>
              <li>Ongoing family support and aftercare planning</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Decades of Experience, Compassionate Care
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              With over 20 years of intervention experience and personal recovery, we bring both professional expertise and genuine understanding to every family we serve. We connect Columbus families with top treatment facilities throughout Ohio and across the nation.
            </p>

            <div className="bg-accent/10 p-8 rounded-lg mt-12">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Your Family Deserves Help
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                If someone you love in Columbus is struggling with addiction, don't wait for tragedy. Professional intervention can save their life. Call today for a free, confidential consultation.
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

export default ColumbusOhio;
