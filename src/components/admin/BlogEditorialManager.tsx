import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertTriangle, PencilLine, Loader2 } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image_url: string | null;
  published_at: string | null;
  published: boolean | null;
};

type ValidationErrors = Record<string, string>;

const validateBlogPost = (post: {
  title: string;
  excerpt: string;
  category: string;
  featured_image: string;
  published_at: string;
  currentId?: string;
  existingPosts: Array<Pick<BlogPost, "id" | "title">>;
}) => {
  const errors: ValidationErrors = {};
  const normalizedTitle = post.title.trim().toLowerCase();

  if (!post.title.trim()) {
    errors.title = "Title is required.";
  } else if (
    post.existingPosts.some(
      (existing) =>
        existing.id !== post.currentId && existing.title.trim().toLowerCase() === normalizedTitle,
    )
  ) {
    errors.title = "A post with this title already exists. Titles must be unique.";
  }

  const excerptLength = post.excerpt.trim().length;
  if (!post.excerpt.trim()) {
    errors.excerpt = "Excerpt (meta description) is required.";
  } else if (excerptLength < 150) {
    errors.excerpt = `Excerpt is too short (${excerptLength} chars). Minimum 150 characters for good SEO.`;
  } else if (excerptLength > 160) {
    errors.excerpt = `Excerpt is too long (${excerptLength} chars). Maximum 160 characters to avoid SERP truncation.`;
  }

  if (!post.category.trim()) {
    errors.category = "Category is required. Choose one before publishing.";
  }

  if (!post.featured_image.trim()) {
    errors.featured_image = "Featured image is required before publishing.";
  }

  if (!post.published_at) {
    errors.published_at = "Published date is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const BlogEditorialManager = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    image_url: "",
    published_at: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    void fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, category, image_url, published_at, published")
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load blog posts.",
        variant: "destructive",
      });
      setPosts([]);
    } else {
      const nextPosts = data ?? [];
      setPosts(nextPosts);
      if (!selectedId && nextPosts[0]) {
        selectPost(nextPosts[0]);
      } else if (selectedId) {
        const current = nextPosts.find((post) => post.id === selectedId);
        if (current) selectPost(current);
      }
    }

    setIsLoading(false);
  };

  const selectPost = (post: BlogPost) => {
    setSelectedId(post.id);
    setForm({
      title: post.title ?? "",
      excerpt: post.excerpt ?? "",
      category: post.category ?? "",
      image_url: post.image_url ?? "",
      published_at: post.published_at ? post.published_at.slice(0, 10) : "",
    });
    setErrors({});
  };

  const validation = useMemo(
    () =>
      validateBlogPost({
        title: form.title,
        excerpt: form.excerpt,
        category: form.category,
        featured_image: form.image_url,
        published_at: form.published_at,
        currentId: selectedId ?? undefined,
        existingPosts: posts.map(({ id, title }) => ({ id, title })),
      }),
    [form, posts, selectedId],
  );

  const excerptLength = form.excerpt.trim().length;
  const selectedPost = posts.find((post) => post.id === selectedId) ?? null;
  const titleExists = !!form.title.trim() && !!validation.errors.title?.includes("already exists");

  const readinessChecks = [
    { label: "Title", done: !!form.title.trim(), warning: false },
    { label: "Unique title", done: !titleExists && !!form.title.trim(), warning: titleExists },
    {
      label: "Excerpt 150-160 chars",
      done: excerptLength >= 150 && excerptLength <= 160,
      warning: excerptLength > 0 && (excerptLength < 150 || excerptLength > 160),
    },
    { label: "Category selected", done: !!form.category.trim(), warning: false },
    { label: "Featured image", done: !!form.image_url.trim(), warning: false },
    { label: "Published date", done: !!form.published_at, warning: false },
  ];

  const handleSave = async () => {
    if (!selectedId) return;

    const nextValidation = validateBlogPost({
      title: form.title,
      excerpt: form.excerpt,
      category: form.category,
      featured_image: form.image_url,
      published_at: form.published_at,
      currentId: selectedId,
      existingPosts: posts.map(({ id, title }) => ({ id, title })),
    });

    setErrors(nextValidation.errors);
    if (!nextValidation.isValid) {
      toast({
        title: "Post not ready",
        description: "Fix the editorial requirements before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        category: form.category.trim(),
        image_url: form.image_url.trim(),
        published_at: new Date(`${form.published_at}T12:00:00`).toISOString(),
      })
      .eq("id", selectedId);

    setIsSaving(false);

    if (error) {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Blog post updated",
      description: "Editorial constraints passed and the post was saved.",
    });

    await fetchPosts();
  };

  if (isLoading) {
    return <p className="text-muted-foreground">Loading blog editorial manager...</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[70vh] overflow-auto">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => selectPost(post)}
              className={`w-full rounded-lg border p-3 text-left transition ${
                post.id === selectedId ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium leading-tight">{post.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">/{post.slug}</p>
                </div>
                <Badge variant={post.published ? "default" : "secondary"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PencilLine className="w-5 h-5" />
              Editorial Constraints
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPost ? (
              <div className="grid gap-6 xl:grid-cols-[1fr,280px]">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={form.excerpt}
                      onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
                      className="min-h-[140px]"
                    />
                    <div className="text-sm mt-1">
                      <span
                        className={
                          excerptLength < 150
                            ? "text-orange-500"
                            : excerptLength > 160
                              ? "text-red-500"
                              : "text-green-600"
                        }
                      >
                        {excerptLength}/160 characters
                        {excerptLength < 150 && ` (${150 - excerptLength} more needed)`}
                        {excerptLength > 160 && ` (${excerptLength - 160} too many)`}
                        {excerptLength >= 150 && excerptLength <= 160 && " ✓ Good length"}
                      </span>
                    </div>
                    {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt}</p>}
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={form.category}
                        onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                      />
                      {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="published_at">Published date</Label>
                      <Input
                        id="published_at"
                        type="date"
                        value={form.published_at}
                        onChange={(event) => setForm((current) => ({ ...current, published_at: event.target.value }))}
                      />
                      {errors.published_at && <p className="text-sm text-destructive">{errors.published_at}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">Featured image URL</Label>
                    <Input
                      id="image_url"
                      value={form.image_url}
                      onChange={(event) => setForm((current) => ({ ...current, image_url: event.target.value }))}
                    />
                    {errors.featured_image && (
                      <p className="text-sm text-destructive">{errors.featured_image}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => void handleSave()} disabled={isSaving || !validation.isValid}>
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                        </>
                      ) : (
                        "Save Editorial Changes"
                      )}
                    </Button>
                    {!validation.isValid && (
                      <p className="text-sm text-muted-foreground self-center">
                        Publish is blocked until every editorial requirement is complete.
                      </p>
                    )}
                  </div>
                </div>

                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="text-base">Publish Readiness</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {readinessChecks.map((check) => (
                      <div key={check.label} className="flex items-start gap-2 text-sm">
                        {check.done ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                        ) : (
                          <AlertTriangle
                            className={`w-4 h-4 mt-0.5 ${check.warning ? "text-orange-500" : "text-muted-foreground"}`}
                          />
                        )}
                        <span>{check.label}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <p className="text-muted-foreground">Select a blog post to review editorial readiness.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogEditorialManager;
