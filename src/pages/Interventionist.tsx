import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Phone } from "lucide-react";
import mattHeadshot from "@/assets/matt-headshot.jpg";

const Interventionist = () => {
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
                
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Professional Interventionist Since 2004
                </div>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    I have been a professional interventionist since 2004. In the years since, I have facilitated many hundreds of interventions. One of the things I've learned during that time is that while most interventions have a general blueprint or structure to them, they are all different. Each individual and family needs special attention to the specific details of their addicted loved one.
                  </p>

                  <p>
                    My family did their own intervention on me in 2001 at the age of 28. One of the things I remember from that day was something my mother said to me: "I will never be a prisoner in my own home ever again." I realize now that I was holding my family hostage, emotionally speaking. None of us knew what to do. I didn't want the life I was living, but I was terrified of stepping into a life that was completely foreign to me.
                  </p>

                  <p>
                    They had no idea at the time that there were professionals that could've helped them. They certainly did their best they could in the moment, but it took me two more years to finally get the help I needed. During that time, my addiction got worse and we all suffered longer than we needed to. <strong className="text-foreground">April 6, 2003</strong> was the day I finally got help, and I have been sober ever since.
                  </p>

                  <p>
                    For the last 22 years, I've empowered families to get help for their addicted and alcoholic loved ones. I truly believe that change is possible and that families and loved ones, with the right direction, can make that change possible. It would be my pleasure to consult with you about what can be done in your family to help your loved one find lasting sobriety and freedom.
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
