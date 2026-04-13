import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ShareButtons from "@/components/ShareButtons";
import { Calendar, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ArticleSchema, BreadcrumbSchema } from "@/components/StructuredData";
import OptimizedImage from "@/components/OptimizedImage";

const slugRedirects: Record<string, string> = {
  "preparing-for-an-intervention": "how-to-prepare-for-an-intervention",
  "waiting-for-right-time-addiction-risk": "waiting-for-the-right-time-addiction-risk",
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const canonicalSlug = slug ? slugRedirects[slug] || slug : "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog-post", canonicalSlug],
    enabled: !!canonicalSlug,
    queryFn: async () => {
      const { data: post, error: postError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", canonicalSlug)
        .eq("published", true)
        .maybeSingle();

      if (postError) throw postError;
      if (!post) return { post: null, relatedPosts: [] };

      let relatedQuery = supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, image_url, category, published_at")
        .eq("published", true)
        .neq("slug", post.slug)
        .eq("category", post.category)
        .order("published_at", { ascending: false })
        .limit(3);

      let { data: relatedPosts, error: relatedError } = await relatedQuery;
      if (relatedError) throw relatedError;

      if (!relatedPosts || relatedPosts.length < 3) {
        const { data: fallbackPosts, error: fallbackError } = await supabase
          .from("blog_posts")
          .select("id, slug, title, excerpt, image_url, category, published_at")
          .eq("published", true)
          .neq("slug", post.slug)
          .order("published_at", { ascending: false })
          .limit(3);

        if (fallbackError) throw fallbackError;
        relatedPosts = fallbackPosts || [];
      }

      return { post, relatedPosts: relatedPosts || [] };
    },
  });

  const post = data?.post;
  const relatedPosts = data?.relatedPosts || [];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (slug && slugRedirects[slug]) {
    return <Navigate to={`/blog/${slugRedirects[slug]}`} replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/404" replace />;
  }

  const imageUrl = post.image_url
    ? (post.image_url.startsWith("http") ? post.image_url : `https://freedominterventions.com${post.image_url}`)
    : "https://freedominterventions.com/favicon.jpeg";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`https://freedominterventions.com/blog/${post.slug}`}
        type="article"
        image={imageUrl}
        imageAlt={`${post.title} - Freedom Interventions blog`}
        keywords={`${post.category}, addiction intervention, family support, recovery`}
        publishedTime={post.published_at || post.created_at}
        modifiedTime={post.updated_at}
        section={post.category}
      />
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.published_at || post.created_at}
        dateModified={post.updated_at}
        image={imageUrl}
        url={`https://freedominterventions.com/blog/${post.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Blog", url: "https://freedominterventions.com/blog" },
          { name: post.title, url: `https://freedominterventions.com/blog/${post.slug}` },
        ]}
      />

      <Navbar />

      <section className="relative pt-32 pb-16 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">{post.category}</span>
            </div>
            <ShareButtons url={window.location.href} title={post.title} description={post.excerpt} slug={post.slug} />
          </div>
        </div>
      </section>

      {post.image_url && (
        <section className="py-8">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto">
              <OptimizedImage src={post.image_url} alt={post.title} className="w-full h-auto rounded-2xl shadow-lg aspect-video" width={1344} height={768} priority={true} />
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="container px-6">
          <article className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert">
            <div
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  post.content
                    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl md:text-3xl font-bold text-foreground mt-10 mb-1">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-xl md:text-2xl font-semibold text-foreground mt-8 mb-1">$1</h3>')
                    .replace(/\n/g, "<br />")
                ),
              }}
            />
          </article>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="py-8 md:py-12 border-t border-border/60">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-2xl mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">You Might Also Find This Helpful</h2>
                <p className="text-muted-foreground">More guidance for families trying to understand what is happening and what to do next.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link key={related.id} to={`/blog/${related.slug}`} className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors group block">
                    {related.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <OptimizedImage src={related.image_url} alt={related.title} className="w-full h-full group-hover:scale-105 transition-transform duration-300" width={1344} height={768} />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">{related.category}</span>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{related.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{related.excerpt}</p>
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1">Read more <ArrowLeft className="w-4 h-4 rotate-180" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">Need Help for Your Family?</h2>
            <p className="text-muted-foreground mb-8">If you're struggling with a loved one's addiction, Matt can help you understand the situation and map out the next step.</p>
            <Link to="/#booking" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
