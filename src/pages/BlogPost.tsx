import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import { Calendar, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

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
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl font-bold text-foreground mb-6">
                Article Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Freedom Interventions Blog</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={window.location.href} />
        {post.image_url && <meta property="og:image" content={post.image_url.startsWith('http') ? post.image_url : `${window.location.origin}${post.image_url}`} />}
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.image_url && <meta name="twitter:image" content={post.image_url.startsWith('http') ? post.image_url : `${window.location.origin}${post.image_url}`} />}
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {post.category}
              </span>
            </div>
            <ShareButtons 
              url={window.location.href} 
              title={post.title} 
              description={post.excerpt} 
            />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && (
        <section className="py-8">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <article className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert">
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl md:text-3xl font-bold text-foreground mt-10 mb-1">$1</h2>')
                  .replace(/^### (.+)$/gm, '<h3 class="font-serif text-xl md:text-2xl font-semibold text-foreground mt-8 mb-1">$1</h3>')
                  .replace(/\n/g, '<br />') 
              }}
            />
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Help for Your Family?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you're struggling with a loved one's addiction, we're here to help. Schedule a free consultation today.
            </p>
            <Link
              to="/#booking"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
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
