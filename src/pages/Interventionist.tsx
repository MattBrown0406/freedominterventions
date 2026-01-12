import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Phone } from "lucide-react";
import mattHeadshot from "@/assets/matt-headshot.jpg";
import SEOHead from "@/components/SEOHead";
import { PersonSchema, BreadcrumbSchema } from "@/components/StructuredData";

const Interventionist = () => {
  const calculateYearsSober = () => {
    const sobrietyDate = new Date(2003, 3, 6); // April 6, 2003
    const today = new Date();
    let years = today.getFullYear() - sobrietyDate.getFullYear();
    
    // Check if we haven't reached April 6th yet this year
    const thisYearAnniversary = new Date(today.getFullYear(), 3, 6);
    if (today < thisYearAnniversary) {
      years--;
    }
    return years;
  };

  const yearsSober = calculateYearsSober();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Meet Matt Brown - Professional Interventionist | Freedom Interventions"
        description={`Matt Brown is a professional interventionist since 2004 with over ${yearsSober} years of sobriety. Based in Oregon, serving families nationwide and internationally with compassionate addiction intervention services.`}
        canonical="https://freedominterventions.com/interventionist"
        keywords="Matt Brown interventionist, professional interventionist, addiction interventionist Oregon, certified interventionist, family intervention specialist"
      />
      <PersonSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Meet Your Interventionist", url: "https://freedominterventions.com/interventionist" },
        ]}
      />
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Photo Column */}
              <div className="flex flex-col items-center md:sticky md:top-28">
                <img
                  src={mattHeadshot}
                  alt="Matt Brown - Professional Interventionist with over 20 years of experience"
                  className="w-full max-w-md rounded-2xl shadow-2xl"
                />
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Oregon, USA</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4 text-primary" />
                    <span>National & International</span>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 w-full max-w-xs">
                  <a href="/#booking">
                    <Button variant="hero" size="lg" className="w-full">
                      Schedule a Consultation
                    </Button>
                  </a>
                  <a href="tel:+15038362136">
                    <Button variant="outline" size="lg" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>

              {/* Bio Column */}
              <div className="space-y-6">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                  Meet Your Interventionist
                </h1>
                <p className="text-2xl md:text-3xl font-serif text-primary">Matt Brown</p>
                
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Professional Interventionist Since 2004
                </div>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    I have been a professional interventionist since 2004, and over the past two decades I've had the privilege of walking alongside hundreds of families during some of the most difficult moments of their lives. While every intervention follows a proven, ethical structure, no two families are the same. Each approach is carefully tailored to the individual, the family system, and the realities they are facing.
                  </p>

                  <p>
                    My work is deeply personal. In 2001, at the age of 28, my own family held an intervention for me. One moment from that day has never left me. My mother said, "I will never be a prisoner in my own home ever again." In that sentence was the pain, fear, and exhaustion my addiction had created for the people who loved me most.
                  </p>

                  <p>
                    At the time, we were all navigating unfamiliar territory. I was terrified of change, and my family didn't yet know that professional guidance and support existed. They did the best they could with what they had—but I wasn't ready. It took two more years before I finally entered treatment. During that time, my addiction progressed, and the emotional toll on my family only deepened.
                  </p>

                  <p>
                    On <strong className="text-foreground">April 6, 2003</strong>, I entered recovery, and I have remained sober ever since.
                  </p>

                  <p>
                    That lived experience shapes everything I do today. For more than {yearsSober} years, I've helped families learn how to stop carrying the burden alone, how to engage their loved one without enabling, and how to create the conditions where real change becomes possible. I believe deeply that recovery is not only possible—but sustainable—when families are supported, educated, and guided with clarity and compassion.
                  </p>

                  <p>
                    If you're feeling overwhelmed, uncertain, or unsure of what to do next, you don't have to figure it out on your own. I invite you to reach out for a consultation. Together, we'll take an honest look at your situation and outline practical, thoughtful next steps toward lasting freedom—for your loved one and for your family.
                  </p>

                  <div className="bg-accent/50 border border-border rounded-xl p-6 mt-8">
                    <p className="italic text-foreground">
                      Si necesitan, les puedo comunicar en Español.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Interventionist;
