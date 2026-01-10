import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  published_at: string | null;
}

const FeaturedArticleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["featured-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, image_url, category, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  // Auto-rotate every hour
  useEffect(() => {
    if (!posts || posts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 3600000); // 1 hour in milliseconds

    return () => clearInterval(interval);
  }, [posts]);

  const goToPrevious = () => {
    if (!posts) return;
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToNext = () => {
    if (!posts) return;
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  if (isLoading) {
    return (
      <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 flex items-center justify-center">
        <div className="animate-pulse w-full h-full bg-muted" />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 flex items-center justify-center">
        <img
          src="/about-organic.jpg"
          alt="Supportive intervention session"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const currentPost = posts[currentIndex];

  return (
    <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 group">
      {/* Background Image */}
      {currentPost.image_url && (
        <img
          src={currentPost.image_url}
          alt={currentPost.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80 bg-primary/80 px-2 py-1 rounded w-fit mb-3">
          Featured Article
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-secondary mb-2">
          {currentPost.category}
        </span>
        <h3 className="text-xl md:text-2xl font-serif font-semibold text-background leading-tight mb-3">
          {currentPost.title}
        </h3>
        <p className="text-background/80 text-sm line-clamp-2 mb-4">
          {currentPost.excerpt}
        </p>
        <Link to={`/blog/${currentPost.slug}`}>
          <Button variant="secondary" size="sm" className="w-fit">
            Read Article
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Navigation Arrows - always visible on mobile, hover on desktop */}
      {posts.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/30 hover:bg-background/50 backdrop-blur-sm text-background p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity touch-target"
            aria-label="Previous article"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/30 hover:bg-background/50 backdrop-blur-sm text-background p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity touch-target"
            aria-label="Next article"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all touch-target ${
                index === currentIndex
                  ? "bg-secondary w-6"
                  : "bg-background/50 hover:bg-background/70 w-2"
              }`}
              aria-label={`Go to article ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedArticleCarousel;
