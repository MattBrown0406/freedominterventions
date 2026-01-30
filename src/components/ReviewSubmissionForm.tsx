import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, CheckCircle, Copy, ExternalLink, Star } from "lucide-react";

const YELP_REVIEW_URL = "https://www.yelp.com/writeareview/biz/freedom-interventions-bend";
const GOOGLE_REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Freedom+Interventions+Bend+OR";

type ReviewerType = "family" | "professional";

const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none transition-transform hover:scale-110"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(star)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              star <= (hoverRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export const ReviewSubmissionForm = () => {
  const [reviewerType, setReviewerType] = useState<ReviewerType>("family");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profession, setProfession] = useState("");
  const [company, setCompany] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReview, setSubmittedReview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !reviewText.trim() || rating < 1) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (reviewerType === "family") {
      if (!lastInitial.trim() || !city.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (lastInitial.length > 1) {
        toast.error("Please enter only the first letter of your last name");
        return;
      }
    } else {
      if (!lastName.trim() || !profession.trim() || !company.trim() || !city.trim() || !state.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const insertData: {
        first_name: string;
        last_initial: string;
        city: string;
        review_text: string;
        reviewer_type: ReviewerType;
        rating: number;
        last_name?: string;
        profession?: string;
        company?: string;
        state?: string;
      } = {
        first_name: firstName.trim(),
        last_initial: reviewerType === "family" ? lastInitial.trim().toUpperCase() : lastName.trim().charAt(0).toUpperCase(),
        city: city.trim(),
        review_text: reviewText.trim(),
        reviewer_type: reviewerType,
        rating: rating,
      };

      if (reviewerType === "professional") {
        insertData.last_name = lastName.trim();
        insertData.profession = profession.trim();
        insertData.company = company.trim();
        insertData.state = state.trim();
      }

      // Use edge function for rate limiting and notifications
      const { data, error } = await supabase.functions.invoke('submit-testimonial', {
        body: insertData
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reviewer Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="reviewerType">I am a...</Label>
            <Select value={reviewerType} onValueChange={(value: ReviewerType) => setReviewerType(value)}>
              <SelectTrigger id="reviewerType" className="bg-background">
                <SelectValue placeholder="Select reviewer type" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                <SelectItem value="family">Family Member</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Your Rating</Label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          {/* Family Member Fields */}
          {reviewerType === "family" && (
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
                <Label htmlFor="city">City, State</Label>
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
          )}

          {/* Professional Fields */}
          {reviewerType === "professional" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={50}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession/Position</Label>
                  <Input
                    id="profession"
                    placeholder="Clinical Director"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Treatment Center/Company</Label>
                  <Input
                    id="company"
                    placeholder="Recovery Center of Oregon"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Portland"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Oregon"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    maxLength={50}
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Review Text */}
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
