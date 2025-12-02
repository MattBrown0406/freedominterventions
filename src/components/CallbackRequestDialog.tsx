import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallbackRequestDialogProps {
  children: React.ReactNode;
}

const timeWindows = [
  { value: "morning", label: "Morning (9 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 5 PM)" },
  { value: "evening", label: "Evening (5 PM - 7 PM)" },
  { value: "anytime", label: "Anytime" },
];

const CallbackRequestDialog = ({ children }: CallbackRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [timeWindow, setTimeWindow] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setSelectedDate(undefined);
    setTimeWindow("");
    setNotes("");
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !selectedDate || !timeWindow) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || null,
        booking_date: format(selectedDate, "yyyy-MM-dd"),
        booking_time: timeWindow,
        booking_type: "callback",
        notes: notes.trim() || null,
        status: "pending",
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Callback request submitted!");
    } catch (error: any) {
      console.error("Error submitting callback request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(resetForm, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary">
            {submitted ? "Request Received!" : "Request a Callback"}
          </DialogTitle>
          <DialogDescription>
            {submitted
              ? "We'll call you at your preferred time."
              : "Tell us the best time to reach you."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium">{name}</p>
              <p className="text-muted-foreground">
                {format(selectedDate!, "MMMM d, yyyy")}
              </p>
              <p className="text-muted-foreground">
                {timeWindows.find((t) => t.value === timeWindow)?.label}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              A member of our team will call you at {phone} during your preferred time.
            </p>
            <Button onClick={() => handleOpenChange(false)} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Best Date <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>
                Preferred Time <span className="text-destructive">*</span>
              </Label>
              <Select value={timeWindow} onValueChange={setTimeWindow}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time window" />
                </SelectTrigger>
                <SelectContent>
                  {timeWindows.map((window) => (
                    <SelectItem key={window.value} value={window.value}>
                      {window.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Anything we should know before calling?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              All calls are confidential.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallbackRequestDialog;