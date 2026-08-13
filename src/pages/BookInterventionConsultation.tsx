import Navbar from "@/components/Navbar";
import TestimonialStrip from "@/components/TestimonialStrip";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ClosePathProof from "@/components/ClosePathProof";
import { BookingCalendar } from "@/components/BookingCalendar";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Calendar, CheckCircle2, Clock, Phone, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Book Intervention Consultation", href: "/book-intervention-consultation" },
];

const outcomes = [
  "Whether this is a coaching issue, readiness issue, safety issue, or intervention-level case.",
  "What the family should stop doing before the next conversation.",
  "Who needs to be aligned before a loved one is confronted.",
  "Whether a paid next step is appropriate, and which one fits the risk.",
];

const urgencySignals = [
  "There has been an overdose, medical scare, dangerous withdrawal, or escalating disappearance pattern.",
  "A treatment bed, detox option, or family window is available but the loved one is refusing or delaying.",
  "Children, housing, money, legal problems, or family safety are now part of the addiction pattern.",
];

const callFlow = [
  {
    title: "First 5 minutes",
    body: "Matt listens for safety risk, treatment refusal, family division, and whether the situation needs immediate structure.",
  },
  {
    title: "Middle of the call",
    body: "You sort the facts from the panic: who is involved, what has already been tried, and what keeps collapsing.",
  },
  {
    title: "Before you hang up",
    body: "You leave with the next best move: coaching, readiness work, treatment planning, intervention discussion, or no paid step yet.",
  },
];

const BookInterventionConsultation = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Book an Intervention Consultation | Freedom Interventions"
        description="Book a confidential consultation with Matt Brown to decide whether your family needs coaching, readiness work, treatment planning, or a professional intervention."
        canonical="https://freedominterventions.com/book-intervention-consultation"
        keywords="book intervention consultation, addiction intervention consultation, talk to interventionist, family intervention help"
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      <main className="pt-20 md:pt-24">
        <section className="border-b border-border/50 bg-primary/5 py-16 md:py-24">
          <div className="container px-6">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <Badge className="mb-5 bg-primary text-primary-foreground hover:bg-primary">Confidential first step</Badge>
                <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
                  Book the call when your family needs a clear next move.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  If the situation cannot keep drifting, start here. Matt will help sort whether the right move is a free consult, crisis coaching, readiness work, treatment planning, or a full intervention.
                </p>
                <div className="mt-6 grid max-w-2xl gap-3 text-sm sm:grid-cols-3">
                  {[
                    "Private and direct",
                    "No pressure to hire",
                    "Clear next step before the call ends",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-lg border border-primary/20 bg-background/80 px-3 py-2 text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="xl" variant="hero">
                    <a href="/book-intervention-consultation?type=consultation#booking">
                      <Calendar className="h-5 w-5" />
                      Book Free Consult
                    </a>
                  </Button>
                  <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location: "book_intervention_consultation_hero" }}>
                    <Button size="xl" variant="hero-outline" className="w-full sm:w-auto">
                      <Phone className="h-5 w-5" />
                      Call Matt Now
                    </Button>
                  </TrackedPhoneLink>
                  <WhatsAppChatButton variant="solid" size="xl" label="WhatsApp" className="w-full sm:w-auto" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Not sure which level of help fits? <Link to="/which-help-do-we-need" className="font-medium text-primary underline underline-offset-4">Use the decision path first.</Link>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">What this call is for</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">Leave with a decision, not a sales script.</h2>
                <ul className="mt-5 space-y-3">
                  {outcomes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container px-6">
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
              {callFlow.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/20 py-16 md:py-20">
          <div className="container px-6">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Skip the form if the situation is already urgent.</h2>
                <p className="mt-4 text-muted-foreground">
                  Booking is the right move when you can wait for a scheduled conversation. Call now if the family cannot wait for the next available consult slot.
                </p>
              </div>
              <div className="space-y-4">
                {urgencySignals.map((item) => (
                  <div key={item} className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </div>
                ))}
                <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location: "book_intervention_consultation_urgency" }}>
                  <Button size="lg" variant="hero" className="w-full sm:w-auto">
                    <Phone className="h-5 w-5" />
                    Call (458) 298-8000
                  </Button>
                </TrackedPhoneLink>
              </div>
            </div>
          </div>
        </section>

        <TestimonialStrip />
        <div className="container px-6 py-8">
          <div className="mx-auto flex max-w-3xl justify-center">
            <Button asChild size="lg" variant="outline">
              <a href="#booking">
                <ArrowDown className="h-4 w-4" />
                Jump to booking
              </a>
            </Button>
          </div>
        </div>
        <BookingCalendar />
        <ClosePathProof source="book_intervention_consultation" />
      </main>
      <Footer />
    </div>
  );
};

export default BookInterventionConsultation;
