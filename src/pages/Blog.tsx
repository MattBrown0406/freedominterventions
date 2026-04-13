import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, BlogSchema } from "@/components/StructuredData";
import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";

const featuredSlugs = [
  "what-is-an-intervention",
  "signs-loved-one-needs-intervention",
  "firing-the-banker-and-the-janitor",
];

const fallbackDescriptions: Record<string, string> = {
  "what-is-an-intervention": "Start here if your family is still trying to understand what an intervention actually is and what a professionally guided process looks like.",
  "signs-loved-one-needs-intervention": "If you keep asking whether things are really serious enough yet, this article helps you stop minimizing what is already happening.",
  "firing-the-banker-and-the-janitor": "One of Matt's core ideas. This explains why families get stuck doing jobs addiction should no longer be allowed to outsource to them.",
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

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

  const getPostCategory = (post: Record<string, any>) => post.category || "Intervention";

  const categories = useMemo(() => {
    if (!blogPosts || blogPosts.length === 0) return ["All"];
    return ["All", ...Array.from(new Set(blogPosts.map((post) => getPostCategory(post)).filter(Boolean)))];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    if (!blogPosts) return [];
    if (activeCategory === "All") return blogPosts;
    return blogPosts.filter((post) => getPostCategory(post) === activeCategory);
  }, [activeCategory, blogPosts]);

  const featuredPosts = useMemo(() => {
    if (!blogPosts?.length) return [];
    const found = featuredSlugs.map((slug) => blogPosts.find((post) => post.slug === slug)).filter(Boolean);
    if (found.length >= 2) return found as typeof blogPosts;
    return blogPosts.slice(0, 3);
  }, [blogPosts]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Blog"
        description="Read articles about addiction intervention, family support, recovery resources, and guidance for helping loved ones struggling with substance use."
        canonical="https://freedominterventions.com/blog"
        keywords="addiction intervention blog, family addiction resources, recovery articles, substance abuse help, intervention guides"
      />
      <OrganizationSchema />
      <BlogSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Blog", url: "https://freedominterventions.com/blog" },
        ]}
      />

      <Navbar />

      <section className="relative pt-32 pb-6 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">Blog</h1>
            <p className="text-lg text-muted-foreground">Resources, insights, and guidance for families navigating addiction and recovery.</p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
              <>
                <section className="mb-10 rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                  <div className="max-w-3xl mb-6">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">New Here? Start With These</h2>
                    <p className="text-muted-foreground leading-relaxed">If your family is in crisis or just now realizing this problem is bigger than a few bad incidents, start with these articles first.</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                    {featuredPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="rounded-2xl border border-primary/15 bg-background p-6 hover:border-primary/40 transition-colors group">
                        <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">Start Here</div>
                        <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{fallbackDescriptions[post.slug] || post.excerpt}</p>
                        <span className="text-primary text-sm font-medium inline-flex items-center gap-1">Read this first <ArrowRight className="w-4 h-4" /></span>
                      </Link>
                    ))}
                  </div>
                </section>

                <div className="flex flex-wrap gap-3 mb-8">
                  {categories.map((category) => {
                    const isActive = category === activeCategory;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {filteredPosts.map((post) => (
                    <Link to={`/blog/${post.slug}`} key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors group block">
                      {post.image_url && (
                        <div className="aspect-video overflow-hidden">
                          <OptimizedImage src={post.image_url} alt={post.title} className="w-full h-full group-hover:scale-105 transition-transform duration-300" width={1344} height={768} />
                        </div>
                      )}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">{getPostCategory(post)}</span>
                        <h2 className="font-serif text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h2>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
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
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No articles published yet. Check back soon for new content.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Need help planning a family intervention?</p>
              <p className="text-sm text-muted-foreground">Learn how Matt's family intervention process works and what to expect.</p>
            </div>
            <Link to="/family-intervention" className="shrink-0">
              <Button variant="outline" className="gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                Family Intervention Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
