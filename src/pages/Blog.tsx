import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";

// Static blog posts - can be replaced with database-driven content later
const blogPosts = [
  {
    id: "understanding-enabling-vs-support",
    title: "Understanding the Difference Between Enabling and Supporting",
    excerpt: "One of the most difficult challenges families face is distinguishing between helping their loved one and enabling destructive behavior. Learn the key differences and how to set healthy boundaries.",
    date: "2025-12-01",
    category: "Family Support",
  },
  {
    id: "intervention-myths",
    title: "5 Common Myths About Professional Interventions",
    excerpt: "Interventions are often misunderstood due to dramatic TV portrayals. We debunk the most common myths and explain what a professional intervention really looks like.",
    date: "2025-11-25",
    category: "Intervention",
  },
  {
    id: "holiday-boundaries",
    title: "Navigating the Holidays When a Loved One Struggles with Addiction",
    excerpt: "The holiday season can be especially challenging for families dealing with addiction. Here are practical strategies for maintaining boundaries while preserving relationships.",
    date: "2025-11-20",
    category: "Family Support",
  },
];

const Blog = () => {
  const formatDate = (dateString: string) => {
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
      <section className="relative py-24 bg-card">
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
                        {formatDate(post.date)}
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

            {/* Coming Soon Notice */}
            <div className="mt-16 text-center">
              <p className="text-muted-foreground">
                More articles coming soon. Check back regularly for new content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
