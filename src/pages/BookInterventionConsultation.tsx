import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ClosePathProof from "@/components/ClosePathProof";
import { BookingCalendar } from "@/components/BookingCalendar";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Calendar, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
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
                  If you already know the situation cannot keep drifting, start here. Matt will help sort whether the right move is a free consult, crisis coaching, readiness work, treatment planning, or a full intervention.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="xl" variant="hero">
                    <a href="#booking">
                      <Calendar className="h-5 w-5" />
                      Book Free Consult
                    </a>
                  </Button>
                  <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "book_intervention_consultation_hero" }}>
                    <Button size="xl" variant="hero-outline" className="w-full sm:w-auto">
                      <Phone className="h-5 w-5" />
                      Call Matt Now
                    </Button>
                  </TrackedPhoneLink>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Not sure which level of help fits? <Link to="/which-help-do-we-need" className="font-medium text-primary underline underline-offset-4">Use the decision path first.</Link>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground">What this call is for</h2>
                <div className="mt-5 space-y-3">
                  {outcomes.map((item) => (
                    <div key={item} className="flex gap-3 rounded-lg border border-border bg-background p-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-6">
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
              {[
                { title: "If it feels urgent", body: "Call directly. Timing, safety, and family alignment matter more than browsing another page." },
                { title: "If you need a starting point", body: "Book the free consultation and use it to decide the right level of help." },
                { title: "If the family is divided", body: "Expect the first call to clarify who must be aligned before pressure increases." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a href="#booking" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Go to scheduling
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <ClosePathProof source="book_intervention_consultation" className="bg-muted/20 border-y border-border" />
        <BookingCalendar />
      </main>
      <Footer />
    </div>
  );
};

export default BookInterventionConsultation;
