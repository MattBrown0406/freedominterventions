import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { trackEvent } from "@/lib/analytics";
import { getFunnelAttribution } from "@/lib/funnelAttribution";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const FloatingContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            message: data.message,
            pagePath: window.location.pathname,
            sourceAttribution: getFunnelAttribution(),
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to send message");
      trackEvent("contact_message_sent", {
        source: "floating_contact_form",
        page_path: window.location.pathname,
      });
      toast({ title: "Message Sent", description: "We'll get back to you soon." });
      form.reset();
      setIsOpen(false);
    } catch {
      toast({ title: "Error", description: "Please try again or call us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center hover:scale-105"
        aria-label={isOpen ? "Close contact form" : "Open contact form"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Form Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[70vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl animate-fade-up">
          <div className="p-5">
            <h3 className="font-serif text-lg font-bold text-foreground mb-1">Get in Touch</h3>
            <p className="text-sm text-muted-foreground mb-4">All communications are confidential.</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" className="h-9 text-sm" {...field} />
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
                      <FormLabel className="text-xs">Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" className="h-9 text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Phone (optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 555-5555" className="h-9 text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help?"
                          className="min-h-[80px] resize-none text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="sm" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContactForm;
