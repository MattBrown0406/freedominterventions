import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import testimonialsBanner from "@/assets/testimonials-banner.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Our family was terrified and exhausted after years of crisis when we reached out to Matt at Freedom Interventions, and he educated us on addiction and boundaries while crafting a compassionate plan. The intervention day was emotional but guided calmly by Matt, leading our daughter to agree to treatment. Matt supported us afterward, helping us navigate recovery as a family. Today, our daughter is sober and rebuilding, and our family is stronger than ever—thanks to him.",
      author: "Cheryl",
      location: "Oregon",
    },
    {
      quote: "I thought my marriage was over after years of watching my wife's addiction destroy our life together—constant lies, fights, and her isolation left me hopeless. Matt gave my children and I the tools to lead a loving but firm intervention, educating us on how to speak her language of pain without blame. We know there is still a lot of work ahead of us, be we wouldn't be here if we hadn't done the intervention.",
      author: "John",
      location: "SLC, UT",
    },
    {
      quote: "Matt helped our family when we had nowhere else to turn. His compassion and expertise guided us through the most difficult time of our lives. Our son is now 3 years sober.",
      author: "The Johnson Family",
      location: "Portland, OR",
    },
    {
      quote: "We were at our wit's end. Matt showed us that intervention isn't about confrontation—it's about love with boundaries. That shift in perspective changed everything for our daughter.",
      author: "Maria S.",
      location: "Seattle, WA",
    },
    {
      quote: "After years of enabling my brother's addiction, Matt helped our entire family understand our roles and how to truly support his recovery. He's been sober for 5 years now.",
      author: "David R.",
      location: "San Francisco, CA",
    },
    {
      quote: "Matt's personal experience with recovery made all the difference. He understood what my husband was going through in a way no one else could. We're forever grateful.",
      author: "Sarah & Tom K.",
      location: "Denver, CO",
    },
    {
      quote: "The intervention was the hardest thing we ever did as a family, but Matt made it bearable. His guidance through treatment planning ensured our mom got the right care.",
      author: "The Martinez Family",
      location: "Phoenix, AZ",
    },
    {
      quote: "Matt flew out within 24 hours when we called in crisis. His calm presence and clear direction helped us navigate a terrifying situation. Our son agreed to treatment that same day.",
      author: "Jennifer L.",
      location: "Austin, TX",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 md:pt-24">
        {/* Hero Banner */}
        <section className="relative h-[30vh] md:h-[35vh] overflow-hidden">
          <img
            src={testimonialsBanner}
            alt="Hope and healing - testimonials from families"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3">
                Stories of Hope
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Real families share their journey from crisis to recovery
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Family's Story Can Change Too
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Every journey to recovery begins with a single step. Let us help your family find hope and healing.
            </p>
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
              <Button variant="hero" size="lg">
                Schedule a Free Consultation
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
