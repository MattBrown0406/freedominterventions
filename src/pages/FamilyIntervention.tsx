import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import familyBanner from "@/assets/family-intervention-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, FAQSchema } from "@/components/StructuredData";

const FamilyIntervention = () => {
  const faqs = [
    {
      question: "What is a family intervention?",
      answer: "A family intervention is a carefully planned conversation where family members and others outline the impact of substance use and present a concrete treatment option to a loved one struggling with addiction.",
    },
    {
      question: "Why is family unity important in an intervention?",
      answer: "Unity reduces the chances of manipulation and ensures the person struggling receives one clear, consistent message rather than conflicting ones. It also protects relatives' emotional health.",
    },
    {
      question: "What are healthy boundaries in addiction intervention?",
      answer: "Healthy boundaries are clear limits that protect relatives' safety and emotional health while encouraging responsibility. They include decisions about what behaviors are acceptable and what support the family will provide.",
    },
    {
      question: "What is enabling and how do I stop it?",
      answer: "Enabling includes rescuing a loved one from consequences, covering for them, giving money, or tolerating unsafe behavior. Stopping enabling means agreeing as a family to only support recovery, not the addiction.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Family Intervention Services - The Importance of Family Unity | Freedom Interventions"
        description="Learn how family unity, healthy boundaries, and ending enabling behaviors are essential for successful addiction intervention. Professional guidance for families nationwide."
        canonical="https://freedominterventions.com/family-intervention"
        keywords="family intervention, addiction intervention, family unity, enabling behaviors, intervention process, family boundaries, addiction support"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Family Intervention", url: "https://freedominterventions.com/family-intervention" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Navbar />
      
      {/* Banner Image */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={familyBanner} 
          alt="Family holding hands in unity during addiction intervention support" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>
      
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Users className="h-4 w-4" aria-hidden="true" />
                Family Intervention Services
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The Importance of Family Unity in Addiction Intervention
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                Family unity is one of the most powerful forces in addiction intervention, especially when it is grounded in clear boundaries, an end to enabling, and a shared commitment to recovery.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto prose prose-lg">
              
              {/* Why Family Unity Matters */}
              <article className="mb-12">
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                  Why Family Unity Matters
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Addiction is often called a "family disease" because it reshapes roles, trust, and communication for everyone under the same roof, not just the person using substances. When family members present a united front in an intervention, they replace chaos and mixed messages with clarity, consistency, and emotional safety for everyone involved.
                  </p>
                  <p>
                    Unity also reduces the chances that one relative will be manipulated, guilt-tripped, or pressured into secret deals that undermine the plan. When each member agrees on the same boundaries, consequences, and expectations, the person struggling with addiction receives one clear message instead of several conflicting ones.
                  </p>
                </div>
              </article>

              {/* Intervention, Not Confrontation */}
              <article className="mb-12">
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                  Intervention, Not Confrontation
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    An effective addiction intervention is less about "ambushing" a loved one and more about offering a structured, loving invitation to change. Health organizations describe interventions as carefully planned conversations where family and others outline the impact of substance use and present a concrete treatment option. Doing this as a unified family lowers defensiveness, because the focus stays on concern, safety, and solutions rather than blame or shaming.
                  </p>
                  <p>
                    Planning together beforehand—with a professional interventionist—helps each person decide what they want to say, what they are willing to change, and what support they can realistically offer. That preparation turns raw emotion into a coherent message that is easier for a loved one to hear, even if they initially resist.
                  </p>
                </div>
              </article>

              {/* Boundaries as an Act of Love */}
              <article className="mb-12">
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                  Boundaries as an Act of Love
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Healthy boundaries are the backbone of a united family intervention. Treatment and family-support resources consistently stress that clear limits protect relatives' safety and emotional health while encouraging responsibility in the person with addiction. Boundaries answer questions like: What will we no longer pay for? What behavior will we no longer allow in the home? What needs to change for us to stay involved?
                  </p>
                  <aside className="bg-accent/50 border border-border rounded-xl p-6 my-8">
                    <p className="text-foreground italic">
                      One helpful way to picture this is to imagine your family as a castle. The castle walls and moat are your boundaries: they protect what is precious inside, while the drawbridge represents the choices you make about who is allowed in, under what conditions, and for how long. Without boundaries, the drawbridge is always down, and addiction can march in and out at all hours, draining your energy, finances, and peace; with healthy boundaries, the family still welcomes connection, but no longer allows destructive behavior to storm the castle.
                    </p>
                  </aside>
                  <p>
                    Far from being cruel or cold, boundaries are a form of "love with limits." Clinical guidance on addiction recovery shows that when families consistently follow through on reasonable limits, they reduce chaos, lower resentment, and make ongoing substance use less comfortable and less sustainable. Just like a well-kept castle, the goal is not to shut everyone out, but to protect the people inside so real healing and recovery can take place.
                  </p>
                </div>
              </article>

              {/* Ending Enabling and Codependency */}
              <article className="mb-12">
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                  Ending Enabling and Codependency
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Unity also matters because many families are caught in patterns of enabling without realizing it. Enabling includes rescuing a loved one from consequences, covering for them at work, repeatedly giving money, or tolerating unsafe behavior at home in the hope that things will eventually improve. These actions are often driven by fear and love, but they unintentionally shield addiction from reality.
                  </p>
                  <p>
                    Family programs point out that when relatives agree to stop enabling together, the person with addiction can no longer "split" the family—turning to the softest member for money, housing, or excuses. Replacing enabling with consistent, recovery-focused support sends a unified message: <strong className="text-foreground">"We love you deeply, but we will no longer support the addiction. We will only support recovery."</strong>
                  </p>
                </div>
              </article>

              {/* Supporting Long-Term Recovery */}
              <article className="mb-12">
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                  Supporting Long-Term Recovery
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Family unity should not end when the intervention is over; it needs to continue into treatment and beyond. Studies and treatment providers repeatedly note that when families stay involved—through family therapy, education groups, and ongoing communication—clients are more likely to complete treatment and maintain sobriety. In these settings, relatives learn about addiction as a chronic medical condition, develop healthier communication skills, and heal their own trauma and resentment.
                  </p>
                  <p>
                    Unified families also create safer home environments after treatment by maintaining the same boundaries and expectations they agreed on during the intervention. This can look like removing substances from the home, aligning on consequences for relapse, encouraging meeting attendance, and checking in regularly without micromanaging. Over time, these shared practices turn the family from a crisis-driven system into a recovery-oriented one.
                  </p>
                </div>
              </article>

              {/* Practical Steps */}
              <article className="mb-12">
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                  Practical Steps for Families
                </h2>
                <p className="text-muted-foreground mb-6">
                  To build unity around an intervention and beyond, families can:
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border border-border/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">1</span>
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Meet privately</strong> (with a professional) to clarify shared goals, boundaries, and treatment options before speaking with their loved one.
                    </p>
                  </div>
                  <div className="flex gap-4 p-4 bg-card rounded-lg border border-border/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">2</span>
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Learn the difference</strong> between support and enabling through family education programs, Al-Anon or Nar-Anon, and family workshops offered by treatment centers.
                    </p>
                  </div>
                  <div className="flex gap-4 p-4 bg-card rounded-lg border border-border/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">3</span>
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Commit to consistent follow-through</strong> on agreed boundaries, even when emotions run high or guilt appears.
                    </p>
                  </div>
                  <div className="flex gap-4 p-4 bg-card rounded-lg border border-border/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">4</span>
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Participate in ongoing family therapy</strong> and support groups to repair relationships and reinforce recovery-focused patterns at home.
                    </p>
                  </div>
                </div>
              </article>

              {/* Closing */}
              <aside className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                <p className="text-foreground text-lg leading-relaxed">
                  When families stand together around clear boundaries, a refusal to enable, and a shared vision of recovery, an intervention becomes more than a single event. It becomes the starting point for a new, healthier way of relating—one where <strong>unity, not addiction, defines the family</strong>.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Ready to Take the First Step?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our team is here to guide your family through the intervention process with compassion and expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#booking">
                  <Button variant="hero" size="lg">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <a href="tel:+15038362136">
                  <Button variant="outline" size="lg">
                    Call (503) 836-2136
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FamilyIntervention;
