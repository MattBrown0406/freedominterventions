import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import TestimonialStrip from "@/components/TestimonialStrip";
import { BookingCalendar } from "@/components/BookingCalendar";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Phone, ShieldCheck, Video } from "lucide-react";

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Book a Call", href: "/book" },
];

const options = [
  {
    name: "Free Consultation",
    length: "15 minutes",
    price: "Free",
    body: "A short Zoom call to hear what is happening and tell you honestly what level of help fits. Not every family needs an intervention.",
    best: "Start here if you are not sure what to do next.",
    anchor: "consultation",
  },
  {
    name: "Crisis Coaching Session",
    length: "60 minutes",
    price: "$150",
    body: "A working session with you and any concerned loved ones. You leave with an actionable plan, clear boundaries, and language that holds.",
    best: "Best when the family needs a plan this week.",
    anchor: "crisis-coaching",
  },
  {
    name: "Family Readiness Intensive",
    length: "90 minutes + 7 days of support",
    price: "$2,500",
    body: "A full intensive covering the family system, the message, the team, treatment options, and next steps, plus a week of follow-up by Zoom, phone, text, or email.",
    best: "Best when an intervention or treatment move is close.",
    anchor: "readiness-intensive",
  },
];

const BookACall = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Book a Call with Freedom Interventions"
        description="Schedule a free 15-minute consultation, a 60-minute crisis coaching session, or a Family Readiness Intensive with interventionist Matt Brown."
        canonical="https://freedominterventions.com/book"
        keywords="book intervention call, free addiction consultation, crisis coaching session, family readiness intensive"
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      <main className="pt-20 md:pt-24">
        <section className="border-b border-border/50 bg-primary/5 py-14 md:py-20">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-5 bg-primary text-primary-foreground hover:bg-primary">
                Scheduling page
              </Badge>
              <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
                Book a call with Freedom Interventions
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Pick the option that fits your family, choose a time, and you are booked. Every call is
                confidential and happens by Zoom or phone.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="xl" variant="hero">
                  <a href="#booking">Choose a time</a>
                </Button>
                <TrackedPhoneLink
                  phoneNumber="+14582988000"
                  metadata={{ location: "book_a_call_hero" }}
                >
                  <Button size="xl" variant="hero-outline" className="w-full sm:w-auto">
                    <Phone className="h-5 w-5" />
                    Call 458-298-8000
                  </Button>
                </TrackedPhoneLink>
                <WhatsAppChatButton variant="solid" size="xl" label="WhatsApp" className="w-full sm:w-auto" />
              </div>
              <div className="mx-auto mt-7 grid max-w-3xl gap-3 text-sm sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "Confidential" },
                  { icon: Video, label: "Zoom or phone" },
                  { icon: Clock, label: "7 Days a Week" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-background/80 px-3 py-2 text-foreground"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container px-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-center font-serif text-3xl font-bold text-foreground md:text-4xl">
                Three ways to work with Matt
              </h2>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {options.map((option) => (
                  <div
                    key={option.name}
                    className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                      {option.price}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">{option.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{option.length}</p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {option.body}
                    </p>
                    <div className="mt-4 flex gap-2 rounded-lg border border-border bg-background p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-sm text-muted-foreground">{option.best}</p>
                    </div>
                    <Button asChild variant="outline" className="mt-5">
                      <a href="#booking">Select this option</a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BookingCalendar />
      </main>
      <TestimonialStrip className="bg-muted/20 border-t border-border/50" />
      <Footer />
    </div>
  );
};

export default BookACall;
