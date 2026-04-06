import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Quote, Star } from "lucide-react";
import testimonialsBanner from "@/assets/testimonials-banner.jpg";
import { ReviewSubmissionForm } from "@/components/ReviewSubmissionForm";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/StructuredData";
import { Helmet } from "react-helmet";
import OptimizedImage from "@/components/OptimizedImage";
import { testimonials } from "@/data/testimonials";
import ProofLibrarySection from "@/components/ProofLibrarySection";

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 mb-4">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 ${
          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

const Testimonials = () => {

  // Review Schema for testimonials
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Freedom Interventions",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.slice(0, 5).map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.author,
      },
      reviewBody: t.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Testimonials & Family Success Stories | Freedom Interventions"
        description="Read real stories from families who found hope through professional addiction intervention. See how Freedom Interventions has helped over 1000 families achieve lasting recovery."
        canonical="https://freedominterventions.com/testimonials"
        keywords="intervention testimonials, addiction recovery stories, family intervention reviews, Matt Brown reviews, intervention success stories"
      />
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Testimonials", url: "https://freedominterventions.com/testimonials" },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <Navbar />
      <main className="pt-20 md:pt-24">
        {/* Hero Banner */}
        <section className="relative h-[30vh] md:h-[35vh] overflow-hidden">
          <OptimizedImage
            src={testimonialsBanner}
            alt="Families sharing their hope and healing testimonials"
            className="w-full h-full"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3">
                Stories of Hope
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Real families share their journey from crisis to recovery
              </p>
            </div>
          </div>
        </section>

        <ProofLibrarySection />

        {/* Testimonials Grid */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Quote className="h-8 w-8 text-primary/40 mb-4" aria-hidden="true" />
                  <StarDisplay rating={testimonial.rating} />
                  <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="border-t border-border pt-4">
                    <cite className="not-italic">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </cite>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Review Submission Form */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6 max-w-2xl">
            <ReviewSubmissionForm />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Family's Story Can Change Too
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Every journey to recovery begins with a single step. Let us help your family find hope and healing.
            </p>
            <a
              href="/#booking"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#booking';
                setTimeout(() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              <Button variant="hero" size="lg">
                Schedule a Free Consultation
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
