import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import knoxvilleBanner from "@/assets/knoxville-tennessee-banner.jpg";

const KnoxvilleTennessee = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Addiction Intervention Services in Knoxville, Tennessee | Freedom Interventions</title>
        <meta name="description" content="Professional addiction intervention services in Knoxville, TN. Help your loved one find lasting recovery with compassionate, experienced intervention support." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${knoxvilleBanner})` }}
          >
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background mb-6">
              Addiction Intervention Services in Knoxville, Tennessee
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8">
              Helping East Tennessee families find freedom from addiction
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              The Addiction Crisis in Knoxville
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Knoxville and East Tennessee have been hit hard by the opioid epidemic. The region's proximity to major drug trafficking routes has fueled addiction rates, with prescription pills, heroin, and fentanyl devastating communities. Methamphetamine and alcohol addiction also remain significant problems throughout the area.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Families in Knoxville watch in anguish as addiction transforms their loved ones. Many have tried confronting the problem on their own, only to be met with denial, anger, or broken promises. Professional help can make the difference.
            </p>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Effective, Compassionate Intervention
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Professional intervention provides a structured pathway to treatment. For Knoxville families, we offer:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground mb-6 space-y-2">
              <li>Complete family preparation and coaching</li>
              <li>Education about addiction as a brain disease</li>
              <li>Boundary setting and ending enabling patterns</li>
              <li>Treatment facility selection and coordination</li>
              <li>Skilled facilitation of the intervention</li>
              <li>Aftercare support for lasting recovery</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 mt-12">
              Experience You Can Trust
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              With over 20 years helping families nationwide and personal experience in recovery, we understand what's at stake. We work with excellent treatment programs throughout Tennessee and across the country to find the right fit for your loved one.
            </p>

            <div className="bg-accent/10 p-8 rounded-lg mt-12">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Hope is One Phone Call Away
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                If someone you love in Knoxville is struggling with addiction, professional intervention can open the door to recovery. Contact us today for a free, confidential consultation.
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

export default KnoxvilleTennessee;
