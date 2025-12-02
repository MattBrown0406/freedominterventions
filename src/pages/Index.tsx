import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import { CoachingBooking } from "@/components/CoachingBooking";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <CoachingBooking />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
