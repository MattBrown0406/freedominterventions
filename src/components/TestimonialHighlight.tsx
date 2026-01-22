import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  first_name: string;
  last_initial: string;
  city: string;
  state: string | null;
  review_text: string;
  rating: number;
}

const TestimonialHighlight = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("family_reviews")
        .select("id, first_name, last_initial, city, state, review_text, rating")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setTestimonials(data);
      }
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);

  const goToNext = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext, testimonials.length]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];
  const authorName = `${currentTestimonial.first_name} ${currentTestimonial.last_initial}.`;
  const location = currentTestimonial.state 
    ? `${currentTestimonial.city}, ${currentTestimonial.state}` 
    : currentTestimonial.city;

  return (
    <section 
      className="py-16 md:py-20 bg-muted/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Real Families, Real Recovery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every family's journey is unique, but hope is universal. Here's what families like yours have experienced.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 z-10 p-2 rounded-full bg-background border border-border shadow-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 z-10 p-2 rounded-full bg-background border border-border shadow-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </>
          )}

          {/* Testimonial Card */}
          <div 
            className="bg-background rounded-xl shadow-lg p-8 md:p-12 mx-8 md:mx-0 transition-opacity duration-500"
            role="region"
            aria-roledescription="testimonial"
            aria-label={`Testimonial from ${authorName}`}
          >
            <Quote className="h-10 w-10 text-primary/30 mb-4" />
            
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-serif italic">
              "{currentTestimonial.review_text}"
            </blockquote>
            
            <footer className="flex items-center justify-between">
              <div>
                <cite className="not-italic font-semibold text-foreground">
                  {authorName}
                </cite>
                <p className="text-sm text-muted-foreground">
                  {location}
                </p>
              </div>
              {renderStars(currentTestimonial.rating)}
            </footer>
          </div>

          {/* Dot Indicators */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    index === currentIndex 
                      ? "bg-primary w-6" 
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Link */}
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="group">
            <Link to="/testimonials">
              Read More Stories
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialHighlight;
