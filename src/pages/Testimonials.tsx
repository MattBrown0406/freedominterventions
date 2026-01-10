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
      quote: "We hired Matt Brown for an intervention for our family member. It was the best decision we made. Matt is extremely knowledgeable and experienced. He took the time to understand our situation and prepared us thoroughly for the intervention. He explained the entire process clearly, including payment and refund policies, which made everything transparent and stress-free. The intervention itself was handled with compassion and professionalism. Matt continued to support us even after our loved one entered treatment, checking in and guiding us through next steps after discharge. I highly recommend Matt Brown and Freedom Interventions to anyone dealing with addiction or mental health challenges in their family.",
      author: "Punam B.",
      location: "San Diego, CA",
    },
    {
      quote: "Matt Brown is an incredible asset when it comes to interventions. His training, communication, and professionalism set him apart. He is responsive, clear, and supportive throughout the entire process. I recommend him highly to families seeking help during an extremely difficult time.",
      author: "L B.",
      location: "Santa Cruz, CA",
    },
    {
      quote: "Matt Brown has saved many lives. He is professional, knowledgeable, and truly cares about the people and families he works with. Matt stands firm in his recovery and uses his experience to help others find hope and healing. I would recommend Matt Brown to any family seeking an interventionist.",
      author: "Kalei McDonald",
      location: "Substance Abuse Coordinator",
    },
    {
      quote: "Matt flew out within 24 hours when we called in crisis. His calm presence and clear direction helped us navigate a terrifying situation. Our son agreed to treatment that same day.",
      author: "Jennifer L.",
      location: "Austin, TX",
    },
    {
      quote: "Our son's drinking had taken over our home. The intervention was terrifying to plan, but it gave us a script, a boundary, and a lifeline out of chaos. He agreed to treatment that same day, and he has been sober for 11 months now. We finally have family dinners without walking on eggshells, and I sleep through the night for the first time in years.",
      author: "Elizabeth",
      location: "Bend, OR",
    },
    {
      quote: "For years we confused love with rescuing our daughter from every consequence. The intervention helped us see how our fear was feeding her addiction, not protecting her. Setting firm, loving limits felt unbearable at first, but it is what pushed her to accept help and enter treatment. Today she is in a sober living program, rebuilding her life, and our relationship is more honest than it has ever been.",
      author: "Angie",
      location: "Seattle, WA",
    },
    {
      quote: "I was sure my husband would explode in anger if we confronted him, but the structured intervention kept the focus on love, not blame. Hearing our family calmly share how his drinking affected them broke through his denial in a way my begging never did. He agreed to rehab, has been sober for over a year, and our home finally feels safe and hopeful again.",
      author: "Charlene",
      location: "Colorado Springs, CO",
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
