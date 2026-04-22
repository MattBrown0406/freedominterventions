import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { Calendar, Clock, Phone, CheckCircle2, MessageCircle, Mail, Video, ShieldCheck } from "lucide-react";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

const FamilyReadinessIntensive = () => {
  const breadcrumbItems = [
    { name: "Home", url: "/", href: "/" },
    { name: "Family Readiness Intensive", url: "/family-readiness-intensive", href: "/family-readiness-intensive" },
  ];

  const includes = [
    "90-minute private Zoom session with Matt Brown, CIP",
    "Customized family action plan tailored to your loved one",
    "Bottom lines, boundaries, and leverage worksheet",
    "Treatment options matched to your situation and budget",
    "Communication scripts for the family team",
    "7 days of follow-up support by Zoom, phone, text, or email",
  ];

  const supportChannels = [
    { icon: Video, label: "Zoom" },
    { icon: Phone, label: "Phone" },
    { icon: MessageCircle, label: "Text" },
    { icon: Mail, label: "Email" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Family Readiness Intensive | 90-Min Plan + 7 Days Support"
        description="A 90-minute Zoom intensive with Matt Brown, CIP. Walk away with a clear family action plan plus 7 days of follow-up support by Zoom, phone, text, or email. $2,500."
        canonical="https://www.freedominterventions.com/family-readiness-intensive"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems as any} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            Premium Offering
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            Family Readiness Intensive
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            A 90-minute Zoom intensive plus a full week of direct support from Matt.
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            For families who need more than a single session — you need a plan, alignment, and someone in your corner while you put it into action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/#booking">
              <Button variant="hero" size="xl">
                <Calendar className="w-5 h-5" />
                Book the Intensive — $2,500
              </Button>
            </a>
            <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: 'readiness_intensive_hero' }}>
              <Button variant="hero-outline" size="xl">
                <Phone className="w-5 h-5" />
                Call (541) 838-6009
              </Button>
            </TrackedPhoneLink>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-10 text-center">
            What's Included
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-4">
              {includes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7 Days Support */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              7 Days of Follow-Up Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The week after your intensive, Matt is available to you directly. Reach out any way that works for your family.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {supportChannels.map((channel) => (
              <div key={channel.label} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/40 transition-colors">
                <channel.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="font-semibold text-foreground">{channel.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-center">
            Who This Is For
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>You've tried talking, asking, pleading. Nothing has worked. You need a real plan and someone to walk it through with you.</p>
            <p>Your family is divided on what to do — some want to push, others want to wait — and you need to get aligned before anything will change.</p>
            <p>You're considering an intervention but don't yet know whether it's the right move, what treatment to recommend, or how to handle the inevitable pushback.</p>
            <p>You want unlimited access to Matt for a full week as you take the next step, not just a one-time meeting and a wave goodbye.</p>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            $2,500 — Complete Family Readiness Intensive
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            <Clock className="inline w-5 h-5 mr-1" /> 90-minute Zoom session + 7 days of direct follow-up support by Zoom, phone, text, or email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#booking">
              <Button variant="hero" size="xl">
                <Calendar className="w-5 h-5" />
                Book Now
              </Button>
            </a>
            <Link to="/family-intervention">
              <Button variant="hero-outline" size="xl">
                Learn About Interventions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FamilyReadinessIntensive;
