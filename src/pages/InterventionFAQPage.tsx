import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InterventionFAQ from "@/components/InterventionFAQ";
import SEOHead from "@/components/SEOHead";
import { FAQSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

const InterventionFAQPage = () => {
  const faqItems = [
    {
      question: "What is an addiction intervention?",
      answer: "An intervention is a professionally guided process where family and friends express concern about a loved one's addiction and encourage them to accept treatment."
    },
    {
      question: "When should we consider an intervention?",
      answer: "Consider an intervention when addiction is causing harm, previous attempts to help have failed, and your loved one refuses to seek treatment on their own."
    },
    {
      question: "How successful are interventions?",
      answer: "Professional interventions have a success rate of 80-90% in getting the person to accept treatment when conducted properly."
    },
    {
      question: "How long does an intervention take?",
      answer: "The intervention meeting itself typically lasts 1-3 hours, but preparation with family members may take several days to a week."
    },
    {
      question: "What happens if my loved one refuses treatment?",
      answer: "Even if a loved one initially refuses, the intervention plants seeds for change. Families also learn healthy boundaries that can motivate future acceptance."
    },
    {
      question: "Do I need a professional interventionist?",
      answer: "While not required, professional interventionists significantly increase success rates by managing emotions, preventing manipulation, and ensuring treatment is arranged."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Family Intervention FAQ: Your Questions Answered | Freedom Interventions"
        description="Everything families ask about addiction intervention. How it works, what it costs, what to say, and what happens if they refuse. Free consultation: (541) 838-6009."
        canonical="https://freedominterventions.com/intervention-faq"
        keywords="family intervention FAQ, intervention questions, how does an intervention work, intervention cost, what to say in an intervention, if they refuse treatment, family intervention process"
      />
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Family Intervention FAQ", url: "https://freedominterventions.com/intervention-faq" },
        ]}
      />
      <FAQSchema faqs={faqItems} />
      <Navbar />
      
      <main>
        {/* Family Intervention Internal Link Card */}
        <section className="py-8 bg-primary/5 border-b border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">Ready to plan a family intervention?</p>
                <p className="text-sm text-muted-foreground">Learn about our family intervention services — what to expect, how it works, and how we can help.</p>
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

        <InterventionFAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default InterventionFAQPage;
