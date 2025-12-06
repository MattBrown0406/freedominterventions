import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Image, Loader2, RefreshCw, Check } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  image_url: string | null;
  published: boolean | null;
}

const BlogImageManager = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, category, image_url, published")
      .order("published_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load blog posts.",
        variant: "destructive",
      });
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  const generateImage = async (post: BlogPost) => {
    setGeneratingId(post.id);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            postId: post.id,
            title: post.title,
            category: post.category,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const result = await response.json();
      
      toast({
        title: "Image Generated",
        description: "Cover image has been created and saved.",
      });
      
      // Refresh posts to show new image
      fetchPosts();
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setGeneratingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading blog posts...</p>
      </div>
    );
  }

  const postsWithoutImages = posts.filter(p => !p.image_url);
  const postsWithImages = posts.filter(p => p.image_url);

  return (
    <div className="space-y-6">
      {postsWithoutImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Image className="w-5 h-5" />
            Posts Missing Cover Images ({postsWithoutImages.length})
          </h3>
          <div className="grid gap-4">
            {postsWithoutImages.map((post) => (
              <Card key={post.id} className="border-destructive/30 bg-destructive/5">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.category} • {post.published ? "Published" : "Draft"}
                      </p>
                    </div>
                    <Button
                      onClick={() => generateImage(post)}
                      disabled={generatingId !== null}
                      size="sm"
                    >
                      {generatingId === post.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Image className="w-4 h-4 mr-2" />
                          Generate Cover
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          Posts with Cover Images ({postsWithImages.length})
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {postsWithImages.map((post) => (
            <Card key={post.id}>
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={post.image_url!}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <p className="font-medium text-sm line-clamp-2">{post.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => generateImage(post)}
                    disabled={generatingId !== null}
                    title="Regenerate image"
                  >
                    {generatingId === post.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogImageManager;
