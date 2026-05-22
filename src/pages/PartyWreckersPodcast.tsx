import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Phone, Play, Clock, Calendar, Users } from "lucide-react";
import partyWreckersLogo from "@/assets/party-wreckers-logo.jpg";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import RevenuePathTriage from "@/components/RevenuePathTriage";
import ClosePathProof from "@/components/ClosePathProof";

import { Link } from "react-router-dom";
interface Episode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration: string;
  episodeNumber: string;
}

const PartyWreckersPodcast = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-podcast-episodes`,
          {
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          }
        );
        const data = await response.json();
        if (data.episodes) {
          setEpisodes(data.episodes);
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Party Wreckers Podcast"
        description="Listen to The Party Wreckers Podcast - candid conversations about addiction, recovery, and intervention from the team at Freedom Interventions."
        canonical="https://freedominterventions.com/party-wreckers-podcast"
        keywords="addiction podcast, recovery podcast, intervention podcast, Party Wreckers, substance abuse podcast"
      />
      <OrganizationSchema />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <img 
              src={partyWreckersLogo} 
              alt="The Party Wreckers Podcast" 
              className="w-64 md:w-80 mx-auto mb-8"
              width={320}
              height={320}
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
                The Party Wreckers Podcast is a weekly show for families, loved ones, and professionals who are tired of watching addiction destroy lives and relationships. Hosted by an experienced interventionist with more than two decades in the field, the podcast breaks down complex topics like enabling, boundaries, relapse, treatment programs, and recovery planning into clear, practical conversations. Each episode blends real-world intervention experience, storytelling, and education to help listeners understand addiction as a medical illness with a spiritual solution—while also showing them what to do next, not just what to think or feel about it.
              </p>
              <p className="mb-6">
                Party Wreckers is designed as a reliable guide for anyone who feels stuck between loving someone with a substance use disorder and not knowing how to help. Through solo episodes, interviews with treatment and recovery experts, and case-based insights from hundreds of interventions, the show gives families language, tools, and step-by-step strategies they can use immediately. Listeners come away with a deeper understanding of support versus enabling, how to set and hold healthy boundaries, and how to build a long-term recovery plan that includes the whole family—not just the addicted person.
              </p>
              
              {/* Latest Episodes Section */}
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 mt-12">
                Latest Episodes
              </h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-card p-6 rounded-xl border border-border animate-pulse">
                      <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : episodes.length > 0 ? (
                <div className="space-y-4">
                  {episodes.map((episode, index) => (
                    <div key={index} className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <a 
                          href={episode.audioUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Play className="w-5 h-5 text-primary-foreground ml-1" />
                        </a>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-2">
                            {episode.episodeNumber && <span className="text-primary">Ep. {episode.episodeNumber}: </span>}
                            {episode.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {episode.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(episode.pubDate)}
                            </span>
                            {episode.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {episode.duration}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No episodes available at this time.</p>
              )}
              
              <div className="bg-card p-8 rounded-2xl border border-border mt-12 text-center">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                  Heard something that sounded like your family?
                </h3>
                <p className="text-muted-foreground mb-6">
                  The podcast can give you language. The next step is choosing the right level of help before the next crisis or treatment window passes.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <TrackedPhoneLink phoneNumber="+15416688084" metadata={{ location: "party_wreckers_podcast_help_card" }}>
                    <Button variant="hero" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Matt Now
                    </Button>
                  </TrackedPhoneLink>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/?type=consultation#booking">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Free Consultation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/intervention-readiness">
                      <Users className="w-4 h-4 mr-2" />
                      Check Intervention Readiness
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RevenuePathTriage source="party_wreckers_podcast" className="bg-muted/20 border-y border-border" compact />
      <ClosePathProof source="party_wreckers_podcast" />

      {/* Family Intervention Link */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Need help planning a family intervention?</p>
              <p className="text-sm text-muted-foreground">Learn how our family intervention services work and what to expect.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              <TrackedPhoneLink phoneNumber="+15416688084" metadata={{ location: "party_wreckers_family_intervention_strip" }}>
                <Button variant="hero" className="gap-2 whitespace-nowrap">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </TrackedPhoneLink>
              <Link to="/family-intervention" className="shrink-0">
                <Button variant="outline" className="gap-2 whitespace-nowrap">
                  <Users className="h-4 w-4" />
                  Family Intervention Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default PartyWreckersPodcast;
