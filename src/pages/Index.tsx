import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ResourceBanner from "@/components/ResourceBanner";
import FAQBanner from "@/components/FAQBanner";
import ToolkitBanner from "@/components/ToolkitBanner";
import About from "@/components/About";
import { BookingCalendar } from "@/components/BookingCalendar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ResourceBanner />
        <FAQBanner />
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
