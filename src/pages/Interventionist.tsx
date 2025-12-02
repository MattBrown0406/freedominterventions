import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Phone } from "lucide-react";
import mattHeadshot from "@/assets/matt-headshot.jpg";

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
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Photo Column */}
              <div className="flex flex-col items-center md:sticky md:top-28">
                <img
                  src={mattHeadshot}
                  alt="Matt - Professional Interventionist"
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
                  <a 
                    href="/#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/#booking';
                      setTimeout(() => {
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                  >
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
                    I've been a professional interventionist since 2004, and over these years, I've had the privilege of guiding hundreds of families through interventions. While they follow a proven structure, each one is tailored to the unique circumstances of the individual and family.
                  </p>

                  <p>
                    In 2001, at age 28, my own family stepped up with an intervention for me. My mother's words that day stay with me: "I will never be a prisoner in my own home ever again." It highlighted how my addiction had strained us all emotionally. We were all uncertain—me fearful of change, and them unaware of professional guidance available. They gave it their all, but it took me two more years to seek treatment. That delay worsened my addiction and extended our hardship. On <strong className="text-foreground">April 6, 2003</strong>, I entered recovery, and I've been sober ever since.
                  </p>

                  <p>
                    For the past {yearsSober} years, I've helped families support their loved ones toward sobriety. I firmly believe recovery is possible with the right approach. If you're ready to help your loved one find lasting freedom, reach out for a consultation. We'll review your situation and map out practical next steps together.
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
