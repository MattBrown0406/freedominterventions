import { useState } from "react";
import { Facebook, Linkedin, Mail, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Custom X (Twitter) icon since lucide-react doesn't have the new X logo
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  slug?: string;
}

const ShareButtons = ({ url, title, description, slug }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  // For social sharing, use the og-html edge function to serve proper OG meta tags
  // Social media crawlers don't execute JavaScript, so they need pre-rendered HTML
  const ogHtmlUrl = slug 
    ? `https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/og-html?slug=${encodeURIComponent(slug)}`
    : url;

  const encodedOgUrl = encodeURIComponent(ogHtmlUrl);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedOgUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedOgUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedOgUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => openShareWindow(shareLinks.facebook)}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => openShareWindow(shareLinks.x)}
        aria-label="Share on X"
      >
        <XIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => openShareWindow(shareLinks.linkedin)}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => window.location.href = shareLinks.email}
        aria-label="Share via Email"
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={handleCopyLink}
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default ShareButtons;
