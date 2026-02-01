import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const leadMagnetSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
});

type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>;

const LeadMagnetPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadMagnetFormData>({
    resolver: zodResolver(leadMagnetSchema),
    defaultValues: { name: "", email: "" },
  });

  useEffect(() => {
    // Check if user has already seen/dismissed the popup
    const hasSeenPopup = localStorage.getItem("leadMagnetDismissed");
    const hasSubmitted = localStorage.getItem("leadMagnetSubmitted");
    
    if (hasSeenPopup || hasSubmitted) return;

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Also show after 30 seconds if they haven't left
    const timer = setTimeout(() => {
      if (!localStorage.getItem("leadMagnetDismissed") && !localStorage.getItem("leadMagnetSubmitted")) {
        setIsVisible(true);
      }
    }, 30000);

    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("leadMagnetDismissed", "true");
  };

  const onSubmit = async (data: LeadMagnetFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead-magnet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send checklist");
      }

      setIsSubmitted(true);
      localStorage.setItem("leadMagnetSubmitted", "true");
      
      toast({
        title: "Check Your Email!",
        description: "Your Intervention Planning Checklist is on its way.",
      });

      // Auto-close after success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending lead magnet:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header with accent */}
        <div className="bg-primary px-6 py-8 text-center">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-2">
            Free Intervention Planning Checklist
          </h2>
          <p className="text-primary-foreground/80 text-sm">
            The same tool we use with families to prepare for successful interventions
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {isSubmitted ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="font-semibold text-foreground">Check your inbox!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your checklist is on its way.
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Step-by-step preparation guide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>What to say (and what to avoid)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>How to choose the right treatment option</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Warning signs to watch for</span>
                </li>
              </ul>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="email" placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Me the Checklist"}
                  </Button>
                </form>
              </Form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadMagnetPopup;
