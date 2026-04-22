import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, FAQSchema, OrganizationSchema, ServiceSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Users, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const FamilyReadinessIntensive = () => {
  const faqs = [
    {
      question: "Who is the Family Readiness Intensive for?",
      answer: "It is for families who are scared, divided, exhausted, or unsure what to do next. If you need clarity before deciding on a full intervention, this is the right starting point.",
    },
    {
      question: "Does this mean we are not ready for an intervention?",
      answer: "Not necessarily. Sometimes the right next step is a full intervention. Sometimes the family first needs alignment, boundaries, and a clear plan. This intensive helps determine that honestly.",
    },
    {
      question: "What do we get at the end?",
      answer: "You leave with a clearer understanding of the situation, a professional recommendation, and a specific next-step plan instead of more confusion and second-guessing.",
    },
    {
      question: "Can the fee apply toward a full intervention?",
      answer: "Yes. If your family moves forward with a full intervention within 30 days, part of the intensive fee can be credited toward the intervention cost.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Family Readiness Intensive | Freedom Interventions"
        description="A focused 90-minute strategy session for families who need expert clarity before deciding on a full intervention. Stop guessing. Get a real plan."
        canonical="https://freedominterventions.com/family-readiness-intensive"
        keywords="family readiness intensive, addiction intervention planning, family addiction help, intervention consultation, addiction strategy session"
      />
      <OrganizationSchema />
      <ServiceSchema
        name="Family Readiness Intensive"
        description="A paid strategy session for families who need expert clarity, alignment, and a plan before deciding on a full intervention."
        url="https://freedominterventions.com/family-readiness-intensive"
        serviceType="Family Readiness Intensive"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Family Readiness Intensive", url: "https://freedominterventions.com/family-readiness-intensive" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Navbar />

      <main>
        <section className="relative pt-32 pb-24 bg-card">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Paid strategy session for families who need clarity now
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Your Family Cannot Afford to Wait in Confusion
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                If your loved one is spiraling and your family is scared, divided, or exhausted, the Family Readiness Intensive gives you professional guidance, a clear recommendation, and a real next-step plan before the situation gets worse.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#booking">
                  <Button variant="hero" size="xl">
                    Reserve the Intensive
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:+15418386009">
                  <Button variant="hero-outline" size="xl">
                    <PhoneCall className="mr-2 h-5 w-5" />
                    Call (541) 838-6009
                  </Button>
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                $2,500 includes a confidential 90-minute Zoom session and 7 days of follow-up support by Zoom, phone, text, or email, with a partial credit available toward a full intervention.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto space-y-12">
              <div>
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">When this is the right move</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Not every family is ready to commit to a full intervention today. But many families wait far too long because they are trapped in fear, disagreement, and second-guessing. That delay costs leverage, clarity, and sometimes lives.
                  </p>
                  <p>
                    The Family Readiness Intensive is for the moment before the full yes. It gives your family a structured way to stop spinning, understand what is actually happening, and decide what the right next move should be.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-3">This is for families who are:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• scared but not aligned</li>
                    <li>• exhausted and overwhelmed</li>
                    <li>• unsure whether an intervention is the right next step</li>
                    <li>• stuck in enabling, avoidance, or mixed messages</li>
                    <li>• desperate for expert clarity before making a major decision</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-3">What you get:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• a 90-minute deep-dive strategy session</li>
                    <li>• family/system assessment</li>
                    <li>• intervention readiness analysis</li>
                    <li>• boundary and communication guidance</li>
                    <li>• a clear recommendation and written action plan</li>
                    <li>• 7 days of follow-up support by Zoom, phone, text, or email</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">What changes after this session</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You stop guessing. You stop arguing in circles. You stop hoping the situation will somehow fix itself.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Instead, your family leaves with a professional read on the situation, a more unified direction, and a next-step plan you can actually act on.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">Investment</h2>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <p className="text-4xl font-bold text-foreground mb-3">$2,500</p>
                  <p className="text-muted-foreground mb-4">
                    This includes the initial 90-minute Zoom consultation plus 7 days of follow-up support by Zoom, phone, text, or email. If your family moves forward with a full intervention within 30 days, part of that fee can be credited toward the intervention cost.
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    Include any concerned loved ones who need to be part of the decision.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                If You Keep Waiting, The Situation Usually Gets Worse
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get expert clarity now, while your family still has options, leverage, and a chance to move from chaos to a plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#booking">
                  <Button variant="hero" size="lg">
                    Reserve the Family Readiness Intensive
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Ask a Question First
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FamilyReadinessIntensive;
