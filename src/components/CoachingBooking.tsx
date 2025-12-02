import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock, DollarSign, Calendar as CalendarIcon, User, Mail, CreditCard } from "lucide-react";
import { format } from "date-fns";

const SESSION_PRICE = 15000; // $150.00 in cents

export const CoachingBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"date" | "time" | "details" | "payment">("date");
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });

  const fetchAvailableSlots = async (date: Date) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: { action: 'get-available-slots', date: format(date, 'yyyy-MM-dd') }
      });

      if (error) throw error;
      setAvailableSlots(data.slots || []);
    } catch (error: any) {
      console.error('Error fetching slots:', error);
      toast.error("Failed to load available times");
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime("");
    if (date) {
      fetchAvailableSlots(date);
      setStep("time");
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("details");
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep("payment");
  };

  const processPayment = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setLoading(true);
    try {
      // For now, using a test nonce. In production, integrate Square Web Payments SDK
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: {
          action: 'create-payment',
          sourceId: 'cnon:card-nonce-ok', // Test nonce - replace with real card nonce from Square Web Payments SDK
          amount: SESSION_PRICE,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          bookingDate: format(selectedDate, 'yyyy-MM-dd'),
          bookingTime: selectedTime,
        }
      });

      if (error) throw error;

      toast.success("Booking confirmed! Check your email for details.");
      // Reset form
      setStep("date");
      setSelectedDate(undefined);
      setSelectedTime("");
      setCustomerInfo({ name: "", email: "", phone: "" });
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string) => {
    const [hours] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${ampm}`;
  };

  return (
    <section id="coaching" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book a Coaching Session
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One-on-one guidance to help you navigate the recovery journey. Each session is 1 hour.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-primary">
            <DollarSign className="w-5 h-5" />
            <span className="text-xl font-semibold">$150 per session</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                {step === "date" && "Select a Date"}
                {step === "time" && "Choose a Time"}
                {step === "details" && "Your Information"}
                {step === "payment" && "Confirm & Pay"}
              </CardTitle>
              <CardDescription>
                {step === "date" && "Pick a date for your coaching session"}
                {step === "time" && selectedDate && `Available times for ${format(selectedDate, 'MMMM d, yyyy')}`}
                {step === "details" && "Enter your contact details"}
                {step === "payment" && "Review and complete your booking"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "date" && (
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>
              )}

              {step === "time" && (
                <div>
                  {loading ? (
                    <p className="text-center text-muted-foreground">Loading available times...</p>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? "default" : "outline"}
                          onClick={() => handleTimeSelect(slot)}
                          className="flex items-center gap-2"
                        >
                          <Clock className="w-4 h-4" />
                          {formatTime(slot)}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No available times for this date</p>
                  )}
                  <Button 
                    variant="ghost" 
                    onClick={() => setStep("date")} 
                    className="mt-4"
                  >
                    ← Back to calendar
                  </Button>
                </div>
              )}

              {step === "details" && (
                <form onSubmit={handleDetailsSubmit} className="space-y-4 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="button" variant="ghost" onClick={() => setStep("time")}>
                      ← Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}

              {step === "payment" && selectedDate && (
                <div className="max-w-md mx-auto space-y-6">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold">Booking Summary</h4>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {formatTime(selectedTime)}</p>
                    <p><strong>Duration:</strong> 1 hour</p>
                    <p><strong>Name:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    <div className="border-t pt-2 mt-2">
                      <p className="text-lg font-bold">Total: $150.00</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> This is a demo. In production, you'll enter your card details securely via Square.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setStep("details")}>
                      ← Back
                    </Button>
                    <Button 
                      onClick={processPayment} 
                      disabled={loading}
                      className="flex-1 flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      {loading ? "Processing..." : "Pay $150.00"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
