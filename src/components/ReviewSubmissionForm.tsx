import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, CheckCircle, Copy, ExternalLink } from "lucide-react";

const YELP_REVIEW_URL = "https://www.yelp.com/writeareview/biz/freedom-interventions-bend";
const GOOGLE_REVIEW_URL = "https://g.page/r/freedom-interventions/review";

export const ReviewSubmissionForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const [city, setCity] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReview, setSubmittedReview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastInitial.trim() || !city.trim() || !reviewText.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (lastInitial.length > 1) {
      toast.error("Please enter only the first letter of your last name");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("family_reviews")
        .insert({
          first_name: firstName.trim(),
          last_initial: lastInitial.trim().toUpperCase(),
          city: city.trim(),
          review_text: reviewText.trim(),
        });

      if (error) throw error;

      setSubmittedReview(reviewText.trim());
      setIsSubmitted(true);
      toast.success("Thank you! Your review has been submitted for approval.");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(submittedReview);
      toast.success("Review copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy. Please select and copy manually.");
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              Your review has been submitted and will be published after approval.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Help others find us by sharing your review on these platforms:
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground italic mb-3">"{submittedReview}"</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyToClipboard}
                className="w-full sm:w-auto"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Review Text
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Leave a Google Review
                </Button>
              </a>
              <a
                href={YELP_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Leave a Yelp Review
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Share Your Experience</CardTitle>
        <CardDescription>
          Your story can help other families find hope. Reviews are published after approval.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastInitial">Last Initial</Label>
              <Input
                id="lastInitial"
                placeholder="D"
                value={lastInitial}
                onChange={(e) => setLastInitial(e.target.value.slice(0, 1))}
                maxLength={1}
                className="uppercase"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Denver, CO"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={100}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reviewText">Your Review</Label>
            <Textarea
              id="reviewText"
              placeholder="Share your experience working with Matt Brown..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={5}
              maxLength={2000}
              required
            />
            <p className="text-xs text-muted-foreground text-right">
              {reviewText.length}/2000 characters
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};