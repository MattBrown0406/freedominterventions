import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Phone, Users } from "lucide-react";
import mattHeadshot from "@/assets/matt-headshot-new.jpg";
import SEOHead from "@/components/SEOHead";
import { PersonSchema, BreadcrumbSchema } from "@/components/StructuredData";
import OptimizedImage from "@/components/OptimizedImage";
import { Link } from "react-router-dom";

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
        title="Interventionist Oregon | Call Matt Brown for Family Help"
        description={`Looking for an interventionist in Oregon? Matt Brown is an Oregon-based professional interventionist with 20+ years experience and ${yearsSober} years sober. Call (541) 668-8084 for a confidential next step.`}
        canonical="https://freedominterventions.com/interventionist"
        keywords="professional interventionist Oregon, interventionist Oregon, certified interventionist, family intervention specialist, professional interventionist, Matt Brown interventionist, hire an interventionist, addiction intervention specialist"
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
                <OptimizedImage
                  src={mattHeadshot}
                  alt="Matt Brown - Professional Interventionist with over 20 years of experience"
                  className="w-full max-w-md rounded-2xl shadow-2xl"
                  objectFit="contain"
                  priority={true}
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
                  <a href="tel:541-668-8084">
                    <Button variant="hero" size="lg" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Matt Now
                    </Button>
                  </a>
                  <Link to="/book-intervention-consultation#booking">
                    <Button variant="outline" size="lg" className="w-full">
                      Book a Confidential Consultation
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Bio Column */}
              <div className="space-y-6">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                  Meet Matt Brown, Interventionist in Oregon for Families in Crisis
                </h1>
                <p className="text-2xl md:text-3xl font-serif text-primary">Matt Brown</p>
                
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Certified Family Intervention Specialist Since 2004
                </div>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    I have been a certified family intervention specialist since 2004, and over the past two decades I've had the privilege of walking alongside hundreds of families during some of the most difficult moments of their lives. As a certified interventionist, I work with each family to build a plan that is ethical, structured, and tailored to the specific dynamics at play. No two families are the same — and no two interventions should be either.
                  </p>

                  <p>
                    I am based in Oregon and work with families throughout the Pacific Northwest and across the country. If you are specifically looking for an <Link to="/oregon" className="text-primary underline underline-offset-4">Oregon interventionist</Link>, the work still starts the same way: get the family aligned, get treatment options ready, and stop letting addiction set the pace.
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
                    That lived experience shapes everything I do today. For more than {yearsSober} years as a family intervention specialist, I've helped families learn how to stop carrying the burden alone, how to engage their loved one without enabling, and how to create the conditions where real change becomes possible. I believe deeply that recovery is not only possible—but sustainable—when families are supported, educated, and guided with clarity and compassion.
                  </p>

                  <p>
                    If you're feeling overwhelmed, uncertain, or unsure of what to do next, you don't have to figure it out on your own. The next step is a confidential consultation: we look honestly at the risk, whether treatment needs to be ready now, who in the family must be aligned, and whether a professional intervention is the right move.
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

      {/* Family Intervention CTA */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Learn about our Family Intervention Services →</p>
              <p className="text-sm text-muted-foreground">Understand what to expect when working with a certified family intervention specialist.</p>
            </div>
            <Link to="/family-intervention" className="shrink-0">
              <Button variant="outline" className="gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                Family Intervention Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Interventionist;
