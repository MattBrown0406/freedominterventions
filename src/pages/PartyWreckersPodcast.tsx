import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import partyWreckersLogo from "@/assets/party-wreckers-logo.png";

const PartyWreckersPodcast = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>The Party Wreckers Podcast | Freedom Interventions</title>
        <meta name="description" content="Listen to The Party Wreckers Podcast - candid conversations about addiction, recovery, and intervention from the team at Freedom Interventions." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <img 
              src={partyWreckersLogo} 
              alt="The Party Wreckers Podcast" 
              className="w-64 md:w-80 mx-auto mb-8"
            />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Party Wreckers Podcast
            </h1>
            <p className="text-lg text-muted-foreground">
              Candid conversations about addiction, recovery, and the intervention process. Real stories, real hope, real change.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                About the Podcast
              </h2>
              <p className="mb-6">
                The Party Wreckers Podcast is a weekly show for families, loved ones, and professionals who are tired of watching addiction destroy lives and relationships. Hosted by an experienced interventionist with more than two decades in the field, the podcast breaks down complex topics like enabling, boundaries, relapse, treatment programs, and recovery planning into clear, practical conversations. Each episode blends real-world intervention experience, storytelling, and education to help listeners understand addiction as a medical disease with a spiritual solution—while also showing them what to do next, not just what to think or feel about it.
              </p>
              <p className="mb-6">
                Party Wreckers is designed as a reliable guide for anyone who feels stuck between loving someone with a substance use disorder and not knowing how to help. Through solo episodes, interviews with treatment and recovery experts, and case-based insights from hundreds of interventions, the show gives families language, tools, and step-by-step strategies they can use immediately. Listeners come away with a deeper understanding of support versus enabling, how to set and hold healthy boundaries, and how to build a long-term recovery plan that includes the whole family—not just the addicted person.
              </p>
              
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 mt-12">
                What We Cover
              </h2>
              <ul className="space-y-3 mb-8">
                <li>Real intervention stories and outcomes</li>
                <li>Family dynamics and enabling behaviors</li>
                <li>Treatment options and recovery pathways</li>
                <li>Guest interviews with recovery professionals</li>
                <li>Tips for supporting loved ones in recovery</li>
              </ul>
              
              <div className="bg-card p-8 rounded-2xl border border-border mt-12 text-center">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                  Episodes Coming Soon
                </h3>
                <p className="text-muted-foreground mb-6">
                  Stay tuned for upcoming episodes. In the meantime, if you need help with a loved one struggling with addiction, we're here for you.
                </p>
                <a href="tel:+15038362136">
                  <Button variant="hero" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartyWreckersPodcast;
