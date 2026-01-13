import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InterventionFAQ from "@/components/InterventionFAQ";
import SEOHead from "@/components/SEOHead";
import { FAQSchema, OrganizationSchema } from "@/components/StructuredData";

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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Intervention FAQ & Myth-Busting"
        description="Clear answers to questions families ask about addiction intervention. Dispelling myths and providing clinical guidance for families considering an intervention."
        canonical="https://freedominterventions.com/intervention-faq"
        keywords="intervention FAQ, addiction intervention questions, intervention myths, family intervention guide"
      />
      <OrganizationSchema />
      <FAQSchema faqs={faqItems} />
      <Navbar />
      
      <main>
        <InterventionFAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default InterventionFAQPage;
