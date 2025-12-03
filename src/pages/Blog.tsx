import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Freedom Interventions</title>
        <meta name="description" content="Read articles about addiction intervention, family support, recovery resources, and guidance for helping loved ones struggling with substance use." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Resources, insights, and guidance for families navigating addiction and recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-6 animate-pulse">
                    <div className="h-6 bg-muted rounded w-20 mb-4"></div>
                    <div className="h-6 bg-muted rounded w-full mb-3"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : blogPosts && blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors group"
                  >
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                        {post.category}
                      </span>
                      <h2 className="font-serif text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.published_at)}
                        </span>
                        <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No articles published yet. Check back soon for new content.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
