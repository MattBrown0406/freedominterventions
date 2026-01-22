import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, Star, User, Briefcase, MapPin, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Testimonial {
  id: string;
  first_name: string;
  last_initial: string;
  last_name: string | null;
  city: string;
  state: string | null;
  rating: number;
  review_text: string;
  reviewer_type: string;
  profession: string | null;
  company: string | null;
  approved: boolean | null;
  created_at: string;
}

const TestimonialManager = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("family_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load testimonials.",
        variant: "destructive",
      });
      setTestimonials([]);
    } else {
      setTestimonials(data || []);
    }
    setIsLoading(false);
  };

  const updateApproval = async (id: string, approved: boolean | null) => {
    const { error } = await supabase
      .from("family_reviews")
      .update({ approved })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Updated",
        description: approved === true ? "Testimonial approved." : approved === false ? "Testimonial rejected." : "Status reset to pending.",
      });
      fetchTestimonials();
    }
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase
      .from("family_reviews")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Testimonial has been removed.",
      });
      fetchTestimonials();
    }
  };

  const getStatusBadge = (approved: boolean | null) => {
    if (approved === true) {
      return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
    } else if (approved === false) {
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
    }
    return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    );
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === "pending") return t.approved === null;
    if (filter === "approved") return t.approved === true;
    if (filter === "rejected") return t.approved === false;
    return true;
  });

  const pendingCount = testimonials.filter((t) => t.approved === null).length;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All ({testimonials.length})
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pending")}
        >
          Pending ({pendingCount})
          {pendingCount > 0 && <span className="ml-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />}
        </Button>
        <Button
          variant={filter === "approved" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("approved")}
        >
          Approved ({testimonials.filter((t) => t.approved === true).length})
        </Button>
        <Button
          variant={filter === "rejected" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("rejected")}
        >
          Rejected ({testimonials.filter((t) => t.approved === false).length})
        </Button>
      </div>

      {/* Testimonials List */}
      {filteredTestimonials.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No testimonials found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {testimonial.reviewer_type === "professional" ? (
                        <Briefcase className="w-4 h-4 text-primary" />
                      ) : (
                        <User className="w-4 h-4 text-primary" />
                      )}
                      <CardTitle className="text-lg">
                        {testimonial.first_name} {testimonial.last_initial}.
                        {testimonial.reviewer_type === "professional" && testimonial.last_name && (
                          <span className="text-muted-foreground font-normal"> ({testimonial.last_name})</span>
                        )}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {testimonial.city}{testimonial.state && `, ${testimonial.state}`}
                    </div>
                    {testimonial.reviewer_type === "professional" && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.profession}{testimonial.company && ` at ${testimonial.company}`}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(testimonial.approved)}
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-4 whitespace-pre-wrap">
                  "{testimonial.review_text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Submitted {format(new Date(testimonial.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {testimonial.approved !== true && (
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateApproval(testimonial.id, true)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </Button>
                    )}
                    {testimonial.approved !== false && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateApproval(testimonial.id, false)}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    )}
                    {testimonial.approved !== null && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateApproval(testimonial.id, null)}
                      >
                        <Clock className="w-4 h-4 mr-1" /> Reset
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the testimonial from {testimonial.first_name} {testimonial.last_initial}. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => deleteTestimonial(testimonial.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialManager;
