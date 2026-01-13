import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote: "Matt helped our family when we had nowhere else to turn. We were terrified, exhausted, and out of options. His calm guidance and experience made all the difference. Our son is now 3 years sober and we have our family back.",
    author: "The Johnson Family",
    location: "Portland, OR",
  },
  {
    id: 2,
    quote: "He agreed to treatment that same day, and he has been sober for 11 months now. Matt was extremely professional and incredibly compassionate. He gave us hope when we had none.",
    author: "Elizabeth",
    location: "Bend, OR",
  },
  {
    id: 3,
    quote: "Matt showed us that intervention isn't about confrontation—it's about love with boundaries. His approach helped our family heal together, not just our loved one.",
    author: "Maria S.",
    location: "Seattle, WA",
  },
  {
    id: 4,
    quote: "Today, our daughter is sober and rebuilding her life, and our family is stronger than ever. We couldn't have done it without Matt's expertise and heart.",
    author: "Cheryl",
    location: "Oregon",
  },
  {
    id: 5,
    quote: "We know there is still a lot of work ahead of us, but we wouldn't be here if we hadn't done the intervention. Matt gave us the tools and confidence to take that first step.",
    author: "John",
    location: "Salt Lake City, UT",
  },
];

const TestimonialHighlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const currentTestimonial = testimonials[currentIndex];

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

          {/* Testimonial Card */}
          <div 
            className="bg-background rounded-xl shadow-lg p-8 md:p-12 mx-8 md:mx-0 transition-opacity duration-500"
            role="region"
            aria-roledescription="testimonial"
            aria-label={`Testimonial from ${currentTestimonial.author}`}
          >
            <Quote className="h-10 w-10 text-primary/30 mb-4" />
            
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-serif italic">
              "{currentTestimonial.quote}"
            </blockquote>
            
            <footer className="flex items-center justify-between">
              <div>
                <cite className="not-italic font-semibold text-foreground">
                  {currentTestimonial.author}
                </cite>
                <p className="text-sm text-muted-foreground">
                  {currentTestimonial.location}
                </p>
              </div>
            </footer>
          </div>

          {/* Dot Indicators */}
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
