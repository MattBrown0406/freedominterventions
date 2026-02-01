import { useState, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock, DollarSign, Calendar as CalendarIcon, User, Mail, CreditCard, Lock, Phone, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { SquareCardForm } from "./SquareCardForm";
import { z } from "zod";

const SESSION_PRICE = 15000; // $150.00 in cents

// Square credentials
const SQUARE_APPLICATION_ID = 'sq0idp-34je5bVBSLY-rwjmh47qrw';
const SQUARE_LOCATION_ID = '3CJ7Z2V1KEZR5';

// Validation schema for customer info
const customerInfoSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
});

type BookingType = 'consultation' | 'coaching';
type Step = 'type' | 'date' | 'time' | 'details' | 'payment' | 'confirmation';

export const BookingCalendar = () => {
  const [bookingType, setBookingType] = useState<BookingType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("type");
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });
  const [cardReady, setCardReady] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const filterSameDaySlots = (slots: string[], date: Date) => {
    const now = new Date();
    const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
    
    if (!isToday) return slots;
    
    // Filter slots to only include times at least 1 hour from now
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    
    return slots.filter(slot => {
      const [hours, minutes] = slot.split(':').map(Number);
      const slotTime = new Date(date);
      slotTime.setHours(hours, minutes, 0, 0);
      return slotTime >= oneHourFromNow;
    });
  };

  const fetchAvailableSlots = async (date: Date) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: { action: 'get-available-slots', date: format(date, 'yyyy-MM-dd') }
      });

      if (error) throw error;
      
      // Filter same-day slots to require 1 hour lead time
      const filteredSlots = filterSameDaySlots(data.slots || [], date);
      setAvailableSlots(filteredSlots);
    } catch (error: any) {
      console.error('Error fetching slots:', error);
      toast.error("Failed to load available times");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (type: BookingType) => {
    setBookingType(type);
    setStep("date");
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

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Validate with Zod schema
    const validation = customerInfoSchema.safeParse(customerInfo);
    if (!validation.success) {
      const errors: { name?: string; email?: string; phone?: string } = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as 'name' | 'email' | 'phone';
        errors[field] = err.message;
      });
      setValidationErrors(errors);
      toast.error("Please correct the errors in the form");
      return;
    }

    // Additional check for consultation requiring phone
    if (bookingType === 'consultation' && !customerInfo.phone?.trim()) {
      setValidationErrors({ phone: "Phone is required for consultations" });
      toast.error("Phone number is required for consultations");
      return;
    }

    if (bookingType === 'consultation') {
      // Free consultation - book directly
      await bookFreeConsultation();
    } else {
      // Paid coaching - go to payment
      setCardReady(false);
      setStep("payment");
    }
  };

  const sendBookingConfirmation = async (
    id: string,
    type: BookingType,
    date: string,
    time: string,
    duration: number
  ) => {
    try {
      const { error } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          bookingId: id,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          bookingType: type,
          bookingDate: date,
          bookingTime: time,
          durationMinutes: duration,
        }
      });

      if (error) {
        console.error('Failed to send confirmation:', error);
        toast.error("Booking saved, but confirmation email failed to send.");
      }
    } catch (error) {
      console.error('Confirmation error:', error);
    }
  };

  const bookFreeConsultation = async () => {
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      const bookingDate = format(selectedDate, 'yyyy-MM-dd');
      
      // Use edge function with rate limiting
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: {
          action: 'create-booking',
          bookingType: 'consultation',
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone || null,
          bookingDate,
          bookingTime: selectedTime,
          durationMinutes: 15,
        }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setBookingId(data.booking.id);
      setStep("confirmation");
      toast.success("Consultation booked successfully!");

      // Send confirmation email with Zoom link
      await sendBookingConfirmation(data.booking.id, 'consultation', bookingDate, selectedTime, 15);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || "Failed to book consultation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTokenize = useCallback((token: string) => {
    // Token received from Square
  }, []);

  const handleCardError = useCallback((error: string) => {
    toast.error(error);
  }, []);

  const handleCardReady = useCallback(() => {
    setCardReady(true);
  }, []);

  const processPayment = async () => {
    if (!selectedDate || !selectedTime) return;

    const tokenizeFn = (window as any).__squareTokenize;
    if (!tokenizeFn) {
      toast.error("Payment form not ready. Please wait.");
      return;
    }

    setLoading(true);
    try {
      const token = await tokenizeFn();
      if (!token) {
        setLoading(false);
        return;
      }

      const bookingDate = format(selectedDate, 'yyyy-MM-dd');
      
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: {
          action: 'create-payment',
          sourceId: token,
          amount: SESSION_PRICE,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          bookingDate,
          bookingTime: selectedTime,
        }
      });

      if (error) throw error;

      // Save booking via edge function with rate limiting
      const { data: bookingData, error: bookingError } = await supabase.functions.invoke('square-booking', {
        body: {
          action: 'create-booking',
          bookingType: 'coaching',
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone || null,
          bookingDate,
          bookingTime: selectedTime,
          durationMinutes: 60,
          paymentId: data.payment?.id,
          amountCents: SESSION_PRICE
        }
      });

      if (bookingError) {
        console.error('Booking save error:', bookingError);
      }

      const booking = bookingData?.booking;
      setBookingId(booking?.id || null);
      setStep("confirmation");
      toast.success("Booking confirmed!");

      // Send confirmation email with Zoom link
      if (booking?.id) {
        await sendBookingConfirmation(booking.id, 'coaching', bookingDate, selectedTime, 60);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("type");
    setBookingType(null);
    setSelectedDate(undefined);
    setSelectedTime("");
    setCustomerInfo({ name: "", email: "", phone: "" });
    setBookingId(null);
  };

  const formatTime = (time: string) => {
    const [hours] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${ampm}`;
  };

  const getStepTitle = () => {
    switch (step) {
      case 'type': return 'Choose Session Type';
      case 'date': return 'Select a Date';
      case 'time': return 'Choose a Time';
      case 'details': return 'Your Information';
      case 'payment': return 'Payment';
      case 'confirmation': return 'Booking Confirmed!';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'type': return 'Select the type of session you\'d like to book';
      case 'date': return `Pick a date for your ${bookingType === 'consultation' ? 'free consultation' : 'coaching session'}`;
      case 'time': return selectedDate ? `Available times for ${format(selectedDate, 'MMMM d, yyyy')}` : '';
      case 'details': return 'Enter your contact details';
      case 'payment': return 'Complete your payment securely';
      case 'confirmation': return 'Your appointment has been scheduled';
    }
  };

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Schedule an Appointment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a free consultation or a paid coaching session to get the support you need.
          </p>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
            Please complete an <a href="/assessment" className="text-primary hover:underline font-medium">assessment</a> before your meeting time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                {getStepTitle()}
              </CardTitle>
              <CardDescription>{getStepDescription()}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step: Choose Type */}
              {step === "type" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleTypeSelect('consultation')}
                    className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="w-6 h-6 text-primary" />
                      <span className="text-lg font-semibold">Free Consultation</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      A 15-minute Zoom call. Not every family needs an intervention—we'll assess your situation and explore whether coaching can equip you with a strategy to move forward on your own.
                    </p>
                    <div className="text-2xl font-bold text-primary">Free</div>
                  </button>

                  <button
                    onClick={() => handleTypeSelect('coaching')}
                    className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-6 h-6 text-primary" />
                      <span className="text-lg font-semibold">Coaching Session</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      A 1-hour Zoom call with you and any concerned loved ones. This meeting is intended to give you an actionable plan to change your family's circumstances.
                    </p>
                    <div className="text-2xl font-bold text-primary">$150</div>
                  </button>
                </div>
              )}

              {/* Step: Select Date */}
              {step === "date" && (
                <div>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      className="rounded-md border"
                    />
                  </div>
                  <Button variant="ghost" onClick={() => setStep("type")} className="mt-4">
                    ← Back
                  </Button>
                </div>
              )}

              {/* Step: Select Time */}
              {step === "time" && (
                <div>
                  {loading ? (
                    <p className="text-center text-muted-foreground">Loading available times...</p>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? "default" : "outline"}
                          onClick={() => handleTimeSelect(slot)}
                          className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 h-10 sm:h-11"
                        >
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">{formatTime(slot)}</span>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No available times for this date</p>
                  )}
                  <Button variant="ghost" onClick={() => setStep("date")} className="mt-4">
                    ← Back
                  </Button>
                </div>
              )}

              {/* Step: Customer Details */}
              {step === "details" && (
                <form onSubmit={handleDetailsSubmit} className="space-y-4 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, name: e.target.value });
                        if (validationErrors.name) setValidationErrors({ ...validationErrors, name: undefined });
                      }}
                      placeholder="John Doe"
                      maxLength={100}
                      required
                      className={validationErrors.name ? "border-destructive" : ""}
                    />
                    {validationErrors.name && (
                      <p className="text-sm text-destructive">{validationErrors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, email: e.target.value });
                        if (validationErrors.email) setValidationErrors({ ...validationErrors, email: undefined });
                      }}
                      placeholder="john@example.com"
                      maxLength={255}
                      required
                      className={validationErrors.email ? "border-destructive" : ""}
                    />
                    {validationErrors.email && (
                      <p className="text-sm text-destructive">{validationErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone {bookingType === 'consultation' ? '*' : '(optional)'}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, phone: e.target.value });
                        if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: undefined });
                      }}
                      placeholder="(555) 123-4567"
                      maxLength={20}
                      required={bookingType === 'consultation'}
                      className={validationErrors.phone ? "border-destructive" : ""}
                    />
                    {validationErrors.phone && (
                      <p className="text-sm text-destructive">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="button" variant="ghost" onClick={() => setStep("time")}>
                      ← Back
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Booking..." : bookingType === 'consultation' ? 'Book Consultation' : 'Continue to Payment'}
                    </Button>
                  </div>
                </form>
              )}

              {/* Step: Payment (coaching only) */}
              {step === "payment" && selectedDate && (
                <div className="max-w-md mx-auto space-y-6">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold">Booking Summary</h4>
                    <p><strong>Session:</strong> Coaching (1 hour)</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {formatTime(selectedTime)}</p>
                    <p><strong>Name:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    <div className="border-t pt-2 mt-2">
                      <p className="text-lg font-bold">Total: $150.00</p>
                    </div>
                  </div>

                  <SquareCardForm
                    applicationId={SQUARE_APPLICATION_ID}
                    locationId={SQUARE_LOCATION_ID}
                    onTokenize={handleTokenize}
                    onError={handleCardError}
                    onReady={handleCardReady}
                  />

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Your payment is secured by Square</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setStep("details")}>
                      ← Back
                    </Button>
                    <Button
                      onClick={processPayment}
                      disabled={loading || !cardReady}
                      className="flex-1 flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      {loading ? "Processing..." : "Pay $150.00"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step: Confirmation */}
              {step === "confirmation" && selectedDate && (
                <div className="max-w-md mx-auto text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {bookingType === 'consultation' ? 'Consultation Booked!' : 'Payment Successful!'}
                    </h3>
                    <p className="text-muted-foreground">
                      We've sent a confirmation email to {customerInfo.email}
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2 text-left">
                    <p><strong>Session:</strong> {bookingType === 'consultation' ? 'Free Consultation (15 min)' : 'Coaching Session (1 hour)'}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {formatTime(selectedTime)}</p>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    We'll contact you at {customerInfo.phone || customerInfo.email} to confirm the details.
                  </p>

                  <Button onClick={resetForm} variant="outline" className="w-full">
                    Book Another Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
