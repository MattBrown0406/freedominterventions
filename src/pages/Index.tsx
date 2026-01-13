import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmpathySection from "@/components/EmpathySection";
import Services from "@/components/Services";
import SignsSection from "@/components/SignsSection";
import TestimonialHighlight from "@/components/TestimonialHighlight";
import ProcessOverview from "@/components/ProcessOverview";
import UrgencyStats from "@/components/UrgencyStats";
import AssessmentBanner from "@/components/AssessmentBanner";
import ResourceBanner from "@/components/ResourceBanner";
import FAQBanner from "@/components/FAQBanner";
import ToolkitBanner from "@/components/ToolkitBanner";
import About from "@/components/About";
import { BookingCalendar } from "@/components/BookingCalendar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Professional Addiction Intervention Services | Freedom Interventions"
        description="Guiding families toward hope and recovery with compassionate, professional intervention services. Over 20 years experience, 1000+ families helped. Free consultation available."
        canonical="https://freedominterventions.com/"
        keywords="addiction intervention, family intervention, drug intervention, alcohol intervention, professional interventionist, intervention services, addiction help, recovery support"
      />
      <OrganizationSchema />
      <Navbar />
      <main>
        <Hero />
        <EmpathySection />
        <Services />
        <SignsSection />
        <TestimonialHighlight />
        <ProcessOverview />
        <UrgencyStats />
        <AssessmentBanner />
        <ResourceBanner />
        <ToolkitBanner />
        <About />
        <BookingCalendar />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
