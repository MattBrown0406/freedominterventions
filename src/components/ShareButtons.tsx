import { useState } from "react";
import { Mail, Link2, Check, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  slug?: string;
}

// X (Twitter) icon component
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

const ShareButtons = ({ url, title, description, slug }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  // Use the backend OG HTML endpoint for social sharing to ensure OG tags work
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const ogShareUrlBase = slug
    ? `${supabaseUrl}/functions/v1/og-html?slug=${encodeURIComponent(slug)}`
    : url;

  // Add a cache-buster so platforms re-scrape when you share again
  const ogShareUrl = `${ogShareUrlBase}${ogShareUrlBase.includes("?") ? "&" : "?"}t=${Date.now()}`;

  const encodedOgUrl = encodeURIComponent(ogShareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  // Social media share URLs using the OG-enabled backend URL
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedOgUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedOgUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedOgUrl}`;
  const emailLink = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodeURIComponent(url)}`;

  const handleCopyLink = async () => {
    try {
      // Copy the OG-enabled URL for proper social sharing
      await navigator.clipboard.writeText(ogShareUrl);
      setCopied(true);
      toast.success("Share link copied! This link will display properly on social media.");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const openShareWindow = (shareUrl: string, platform: string) => {
    window.open(
      shareUrl,
      `share-${platform}`,
      "width=600,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
    );
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">Share:</span>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
              onClick={() => openShareWindow(facebookShareUrl, "facebook")}
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on Facebook</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors"
              onClick={() => openShareWindow(twitterShareUrl, "twitter")}
              aria-label="Share on X (Twitter)"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on X (Twitter)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
              onClick={() => openShareWindow(linkedinShareUrl, "linkedin")}
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on LinkedIn</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => window.location.href = emailLink}
              aria-label="Share via Email"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share via Email</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={handleCopyLink}
              aria-label="Copy share link"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {copied ? "Copied!" : "Copy share link"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ShareButtons;
