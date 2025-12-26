import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InterventionFAQ from "@/components/InterventionFAQ";
import { Helmet } from "react-helmet";

const InterventionFAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Intervention FAQ & Myth-Busting | Freedom Interventions</title>
        <meta 
          name="description" 
          content="Clear answers to the questions families are afraid to ask about addiction intervention. Dispelling myths and providing clinical guidance for families." 
        />
      </Helmet>
      <Navbar />
      
      <main>
        <InterventionFAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default InterventionFAQPage;
