import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmpathySection from "@/components/EmpathySection";
import VideoSection from "@/components/VideoSection";
import Services from "@/components/Services";
import SignsSection from "@/components/SignsSection";
import TestimonialHighlight from "@/components/TestimonialHighlight";
import ProcessOverview from "@/components/ProcessOverview";
import UrgencyStats from "@/components/UrgencyStats";
import ResourceBanner from "@/components/ResourceBanner";
import ToolkitBanner from "@/components/ToolkitBanner";
import About from "@/components/About";
import WorkWithMatt from "@/components/WorkWithMatt";
import { BookingCalendar } from "@/components/BookingCalendar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/StructuredData";
import LeadMagnetPopup from "@/components/LeadMagnetPopup";
import LeadMagnetBanner from "@/components/LeadMagnetBanner";

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
        <VideoSection />
        <Services />
        <SignsSection />
        <TestimonialHighlight />
        <LeadMagnetBanner />
        <ProcessOverview />
        <UrgencyStats />
        <ResourceBanner />
        <ToolkitBanner />
        <About />
        <WorkWithMatt />
        <BookingCalendar />
        <CTA />
      </main>
      <Footer />
      <LeadMagnetPopup />
    </div>
  );
};

export default Index;
