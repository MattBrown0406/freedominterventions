import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmpathySection from "@/components/EmpathySection";
import VideoSection from "@/components/VideoSection";
import Services from "@/components/Services";
import SignsSection from "@/components/SignsSection";
import TestimonialHighlight from "@/components/TestimonialHighlight";
import ProcessOverview from "@/components/ProcessOverview";
import UrgencyStats from "@/components/UrgencyStats";
import SocialProof from "@/components/SocialProof";
import ResourceBanner from "@/components/ResourceBanner";
import ToolkitBanner from "@/components/ToolkitBanner";
import About from "@/components/About";
import WorkWithMatt from "@/components/WorkWithMatt";
import { BookingCalendar } from "@/components/BookingCalendar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ClosePathProof from "@/components/ClosePathProof";
import RevenuePathTriage from "@/components/RevenuePathTriage";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, AggregateRatingSchema } from "@/components/StructuredData";
import LeadMagnetPopup from "@/components/LeadMagnetPopup";
import LeadMagnetBanner from "@/components/LeadMagnetBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Award, Globe, HeartHandshake, ShieldCheck, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const trustItems = [
    {
      icon: Award,
      title: "20+ Years Experience",
      description: "Over two decades helping families navigate addiction intervention.",
    },
    {
      icon: ShieldCheck,
      title: "Certified Intervention Professional",
      description: "CIP-certified with training in ARISE, CRAFT, and evidence-based intervention methods.",
    },
    {
      icon: HeartHandshake,
      title: "Personal Recovery",
      description: "22+ years of sobriety. Matt brings lived experience, not just credentials.",
    },
    {
      icon: Globe,
      title: "Nationwide & International",
      description: "Matt works with families across the US and internationally.",
    },
  ];

  const faqItems = [
    {
      question: "What is a professional intervention?",
      answer:
        "A professional intervention is a structured, planned conversation between a person struggling with addiction and their loved ones, guided by a trained interventionist. It is not a surprise ambush or a confrontation. It is a carefully prepared process designed to present a clear, unified message and a specific treatment plan, with the goal of getting your loved one to accept help.",
    },
    {
      question: "How do I know if it is time for an intervention?",
      answer:
        "If your family has already tried talking, setting limits, making threats you haven't followed through on, or waiting for things to get bad enough, and nothing has changed, it may be time to bring in outside guidance. The right time is not when things hit rock bottom. The right time is when the family is ready to stop enabling and commit to a different approach.",
    },
    {
      question: "What if my loved one refuses treatment?",
      answer:
        "It happens. A refusal does not mean the process failed. A well-run intervention changes the family system whether or not the person says yes that day. When families follow through on what they committed to, the situation often shifts, sometimes quickly. Matt will walk you through what to do if your loved one says no.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Professional Addiction Interventionist | Freedom Interventions"
        description="Matt Brown has 20+ years experience helping families through professional addiction interventions. Free consultation: (541) 838-6009. Nationwide service."
        canonical="https://freedominterventions.com"
        keywords="addiction intervention, family intervention, drug intervention, alcohol intervention, professional interventionist, intervention services, addiction help, recovery support"
      />
      <OrganizationSchema />
      <AggregateRatingSchema 
        ratingValue="4.9" 
        reviewCount={47} 
        bestRating="5"
        worstRating="1"
      />
      <Navbar />
      <main>
        <Hero />
        <section className="py-12 md:py-16 bg-card border-y border-border/50">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Matt's Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Addiction is a medical illness with a spiritual solution. It requires clinical treatment and meaningful change in purpose, connection, and how a person lives. Families do best when they stop waiting for the perfect moment and start dealing with the truth in front of them.
              </p>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-muted/30 border-y border-border/50">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto space-y-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Why Families Trust Matt
                </h2>
                <p className="text-lg text-muted-foreground">
                  Families call when the situation is serious and they need a real plan, not vague reassurance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {trustItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    quote:
                      "Matt brought structure to a situation that had been running our family for years. For the first time, we knew exactly what to do.",
                    author: "Family member, Portland",
                  },
                  {
                    quote:
                      "He was direct, calm, and honest. That made it easier for our whole family to get on the same page and move forward.",
                    author: "Family member, Phoenix",
                  },
                ].map((item) => (
                  <blockquote key={item.author} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <Quote className="w-8 h-8 text-primary/40 mb-4" />
                    <p className="text-foreground leading-relaxed mb-4">“{item.quote}”</p>
                    <footer className="text-sm text-muted-foreground">{item.author}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>
        <EmpathySection />
        <VideoSection />
        <Services />
        <SignsSection />
        <SocialProof />
        <LeadMagnetBanner />
        <ProcessOverview />
        <UrgencyStats />
        <ResourceBanner />
        <ToolkitBanner />
        <About />
        <WorkWithMatt />
        <RevenuePathTriage source="homepage" className="bg-muted/20 border-y border-border" />
        <ClosePathProof source="homepage" />
        <BookingCalendar />
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What Families Ask First
                </h2>
                <p className="text-lg text-muted-foreground">
                  Clear answers before you decide what to do next.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`home-faq-${index}`}>
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed space-y-3">
                        <p>{item.answer}</p>
                        {index === 0 && (
                          <p>
                            <Link to="/how-intervention-works" className="text-primary underline underline-offset-4">
                              Read the full walkthrough of how intervention works.
                            </Link>
                          </p>
                        )}
                        {index === 1 && (
                          <p>
                            <Link to="/when-is-it-time-for-an-intervention" className="text-primary underline underline-offset-4">
                              See the honest signs it's time to stop waiting.
                            </Link>
                          </p>
                        )}
                        {index === 2 && (
                          <p>
                            <Link to="/what-if-they-refuse-treatment" className="text-primary underline underline-offset-4">
                              Learn what families should do if a loved one says no.
                            </Link>
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "How Intervention Works",
                    description: "A plain-English walkthrough of the process before, during, and after intervention day.",
                    href: "/how-intervention-works",
                  },
                  {
                    title: "When Is It Time?",
                    description: "The honest signs a family is already past the point where waiting makes sense.",
                    href: "/when-is-it-time-for-an-intervention",
                  },
                  {
                    title: "Before You Call",
                    description: "What to do in the next 24 hours if your family is in crisis and you need clarity fast.",
                    href: "/before-you-call",
                  },
                ].map((item) => (
                  <Link key={item.href} to={item.href} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors">
                    <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
      <LeadMagnetPopup />
    </div>
  );
};

export default Index;
