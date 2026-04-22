import { useState, useCallback, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock, DollarSign, Calendar as CalendarIcon, User, Mail, CreditCard, Lock, Phone, CheckCircle, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { SquareCardForm } from "./SquareCardForm";
import { z } from "zod";

// Square credentials
const SQUARE_APPLICATION_ID = 'sq0idp-34je5bVBSLY-rwjmh47qrw';
const SQUARE_LOCATION_ID = '3CJ7Z2V1KEZR5';

type BookingType = 'consultation' | 'crisis-coaching' | 'readiness-intensive';

interface OfferConfig {
  label: string;
  durationMinutes: number;
  priceCents: number; // 0 for free
  priceLabel: string;
  description: string;
  shortName: string; // used in summaries
}

const OFFERS: Record<BookingType, OfferConfig> = {
  'consultation': {
    label: 'Free Consultation',
    durationMinutes: 15,
    priceCents: 0,
    priceLabel: 'Free',
    description: "A 15-minute Zoom call. Not every family needs an intervention—we'll assess your situation and explore the right next step.",
    shortName: 'Free Consultation (15 min)',
  },
  'crisis-coaching': {
    label: 'Crisis Coaching Session',
    durationMinutes: 60,
    priceCents: 15000,
    priceLabel: '$150',
    description: "A 60-minute Zoom session with you and any concerned loved ones. Walk away with an actionable plan to change your family's circumstances.",
    shortName: 'Crisis Coaching Session (60 min)',
  },
  'readiness-intensive': {
    label: 'Family Readiness Intensive',
    durationMinutes: 90,
    priceCents: 250000,
    priceLabel: '$2,500',
    description: "A 90-minute Zoom intensive plus 7 days of follow-up support by Zoom, phone, text, or email. The complete family readiness package.",
    shortName: 'Family Readiness Intensive (90 min)',
  },
};

// Validation schema for customer info
const customerInfoSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
});

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
  const [abandonedCartId, setAbandonedCartId] = useState<string | null>(null);

  // Pre-fill from URL params (abandoned cart recovery deep link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") as BookingType | null;
    if (type && (type === "consultation" || type === "crisis-coaching" || type === "readiness-intensive")) {
      setBookingType(type);
      const name = params.get("name") || "";
      const email = params.get("email") || "";
      const phone = params.get("phone") || "";
      if (name || email || phone) {
        setCustomerInfo({ name, email, phone });
      }
      const dateStr = params.get("date");
      const timeStr = params.get("time");
      if (dateStr) {
        const [y, m, d] = dateStr.split("-").map(Number);
        const date = new Date(y, m - 1, d);
        if (!isNaN(date.getTime())) {
          setSelectedDate(date);
          fetchAvailableSlots(date);
          if (timeStr) {
            setSelectedTime(timeStr);
            // Skip straight to details so user can confirm and pay
            setStep("details");
          } else {
            setStep("time");
          }
        } else {
          setStep("date");
        }
      } else {
        setStep("date");
      }
      // Clean URL so refreshes don't re-trigger
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, "", cleanUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offer = bookingType ? OFFERS[bookingType] : null;
  const isPaid = !!offer && offer.priceCents > 0;

  const filterSameDaySlots = (slots: string[], date: Date) => {
    const now = new Date();
    const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
    if (!isToday) return slots;
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
    if (bookingType === 'consultation' && !customerInfo.phone?.trim()) {
      setValidationErrors({ phone: "Phone is required for consultations" });
      toast.error("Phone number is required for consultations");
      return;
    }
    if (!isPaid) {
      await bookFreeConsultation();
    } else {
      // Capture abandoned cart for recovery (paid offers only)
      try {
        const { data: cartData } = await supabase
          .from("abandoned_carts")
          .insert({
            customer_name: customerInfo.name,
            customer_email: customerInfo.email,
            customer_phone: customerInfo.phone || null,
            booking_type: bookingType!,
            booking_date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
            booking_time: selectedTime || null,
            amount_cents: offer!.priceCents,
          })
          .select("id")
          .single();
        if (cartData?.id) setAbandonedCartId(cartData.id);
      } catch (err) {
        // Non-blocking — don't prevent checkout if capture fails
        console.warn("Cart capture failed:", err);
      }
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
    if (!selectedDate || !selectedTime || !bookingType || !offer) return;
    setLoading(true);
    try {
      const bookingDate = format(selectedDate, 'yyyy-MM-dd');
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: {
          action: 'create-booking',
          bookingType,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone || null,
          bookingDate,
          bookingTime: selectedTime,
          durationMinutes: offer.durationMinutes,
        }
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setBookingId(data.booking.id);
      setStep("confirmation");
      toast.success("Consultation booked successfully!");
      await sendBookingConfirmation(data.booking.id, bookingType, bookingDate, selectedTime, offer.durationMinutes);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || "Failed to book consultation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTokenize = useCallback((_token: string) => {}, []);
  const handleCardError = useCallback((error: string) => { toast.error(error); }, []);
  const handleCardReady = useCallback(() => { setCardReady(true); }, []);

  const processPayment = async () => {
    if (!selectedDate || !selectedTime || !bookingType || !offer) return;
    const tokenizeFn = (window as any).__squareTokenize;
    if (!tokenizeFn) {
      toast.error("Payment form not ready. Please wait.");
      return;
    }
    setLoading(true);
    try {
      const token = await tokenizeFn();
      if (!token) { setLoading(false); return; }
      const bookingDate = format(selectedDate, 'yyyy-MM-dd');
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: {
          action: 'create-payment',
          sourceId: token,
          amount: offer.priceCents,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          bookingDate,
          bookingTime: selectedTime,
          bookingType,
        }
      });
      if (error) throw error;
      const { data: bookingData, error: bookingError } = await supabase.functions.invoke('square-booking', {
        body: {
          action: 'create-booking',
          bookingType,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone || null,
          bookingDate,
          bookingTime: selectedTime,
          durationMinutes: offer.durationMinutes,
          paymentId: data.payment?.id,
          amountCents: offer.priceCents,
        }
      });
      if (bookingError) console.error('Booking save error:', bookingError);
      const booking = bookingData?.booking;
      setBookingId(booking?.id || null);
      setStep("confirmation");
      toast.success("Booking confirmed!");
      if (booking?.id) {
        await sendBookingConfirmation(booking.id, bookingType, bookingDate, selectedTime, offer.durationMinutes);
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

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userTzShort = (() => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: userTimeZone, timeZoneName: 'short' }).formatToParts(new Date());
      return parts.find((p) => p.type === 'timeZoneName')?.value || userTimeZone;
    } catch { return userTimeZone; }
  })();

  const formatTimeInUserTz = (time: string, date?: Date) => {
    if (!date) return '';
    const [h, m] = time.split(':').map(Number);
    const ymd = format(date, 'yyyy-MM-dd');
    const probe = new Date(`${ymd}T12:00:00Z`);
    const laParts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour12: false, hour: '2-digit', minute: '2-digit' }).formatToParts(probe);
    const laHour = parseInt(laParts.find((p) => p.type === 'hour')?.value || '0');
    const offsetHours = 12 - laHour;
    const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), h + offsetHours, m));
    return new Intl.DateTimeFormat('en-US', { timeZone: userTimeZone, hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' }).format(utc);
  };

  const isUserInPacific = userTimeZone === 'America/Los_Angeles';

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
      case 'date': return offer ? `Pick a date for your ${offer.label}` : '';
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
            Choose the level of support that fits your family's situation.
          </p>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
            Please complete an <a href="/assessment" className="text-primary hover:underline font-medium">assessment</a> before your meeting time.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
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
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleTypeSelect('consultation')}
                    className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="w-6 h-6 text-primary" />
                      <span className="text-lg font-semibold">Free Consultation</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 flex-1">
                      {OFFERS['consultation'].description}
                    </p>
                    <div className="text-2xl font-bold text-primary">Free</div>
                    <p className="text-xs text-muted-foreground mt-1">15-minute Zoom call</p>
                  </button>

                  <button
                    onClick={() => handleTypeSelect('crisis-coaching')}
                    className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-6 h-6 text-primary" />
                      <span className="text-lg font-semibold">Crisis Coaching Session</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 flex-1">
                      {OFFERS['crisis-coaching'].description}
                    </p>
                    <div className="text-2xl font-bold text-primary">$150</div>
                    <p className="text-xs text-muted-foreground mt-1">60-minute Zoom session</p>
                  </button>

                  <button
                    onClick={() => handleTypeSelect('readiness-intensive')}
                    className="p-6 rounded-lg border-2 border-accent/60 bg-accent/5 hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col relative"
                  >
                    <span className="absolute -top-3 right-4 text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      Premium
                    </span>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-6 h-6 text-primary" />
                      <span className="text-lg font-semibold">Family Readiness Intensive</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 flex-1">
                      {OFFERS['readiness-intensive'].description}
                    </p>
                    <div className="text-2xl font-bold text-primary">$2,500</div>
                    <p className="text-xs text-muted-foreground mt-1">90-min Zoom + 7 days follow-up support</p>
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
                  <div className="mb-4 p-3 rounded-md bg-primary/5 border border-primary/20 text-sm">
                    <p className="font-medium text-foreground">
                      Times shown in <span className="text-primary">your local time zone</span> ({userTzShort})
                    </p>
                    {!isUserInPacific && (
                      <p className="text-muted-foreground mt-1">
                        Appointments are scheduled in Pacific Time and automatically converted for you.
                      </p>
                    )}
                  </div>
                  {loading ? (
                    <p className="text-center text-muted-foreground">Loading available times...</p>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? "default" : "outline"}
                          onClick={() => handleTimeSelect(slot)}
                          className="flex flex-col items-center justify-center gap-0.5 text-xs sm:text-sm px-2 sm:px-3 h-auto py-2"
                        >
                          <span className="flex items-center gap-1 font-semibold whitespace-nowrap">
                            <Clock className="w-3 h-3 flex-shrink-0" />
                            {formatTimeInUserTz(slot, selectedDate)}
                          </span>
                          {!isUserInPacific && (
                            <span className="text-[10px] opacity-75 whitespace-nowrap">
                              {formatTime(slot)} PT
                            </span>
                          )}
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
                      {loading ? "Booking..." : !isPaid ? 'Book Consultation' : 'Continue to Payment'}
                    </Button>
                  </div>
                </form>
              )}

              {/* Step: Payment */}
              {step === "payment" && selectedDate && offer && (
                <div className="max-w-md mx-auto space-y-6">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold">Booking Summary</h4>
                    <p><strong>Session:</strong> {offer.shortName}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p>
                      <strong>Time:</strong> {formatTimeInUserTz(selectedTime, selectedDate)}
                      {!isUserInPacific && (
                        <span className="text-muted-foreground"> ({formatTime(selectedTime)} Pacific)</span>
                      )}
                    </p>
                    <p><strong>Name:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    {bookingType === 'readiness-intensive' && (
                      <p className="text-sm text-primary pt-1">
                        ✓ Includes 7 days of follow-up support by Zoom, phone, text, or email
                      </p>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <p className="text-lg font-bold">Total: {offer.priceLabel}</p>
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
                      {loading ? "Processing..." : `Pay ${offer.priceLabel}`}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step: Confirmation */}
              {step === "confirmation" && selectedDate && offer && (
                <div className="max-w-md mx-auto text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {!isPaid ? 'Consultation Booked!' : 'Payment Successful!'}
                    </h3>
                    <p className="text-muted-foreground">
                      We've sent a confirmation email to {customerInfo.email}
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2 text-left">
                    <p><strong>Session:</strong> {offer.shortName}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p>
                      <strong>Time:</strong> {formatTimeInUserTz(selectedTime, selectedDate)}
                      {!isUserInPacific && (
                        <span className="text-muted-foreground"> ({formatTime(selectedTime)} Pacific)</span>
                      )}
                    </p>
                    {bookingType === 'readiness-intensive' && (
                      <p className="text-sm text-primary pt-2">
                        Your booking includes 7 days of follow-up support by Zoom, phone, text, or email.
                      </p>
                    )}
                  </div>

                  {bookingType === 'readiness-intensive' ? (
                    <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-5 text-left space-y-3">
                      <h4 className="font-semibold text-primary flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Important Next Step
                      </h4>
                      <p className="text-sm text-foreground">
                        To get the most out of your Family Readiness Intensive, please complete the
                        Clinical Assessment <strong>as completely as possible</strong> before our session.
                        This gives Matt the full picture of your family's situation so we can make
                        every minute count.
                      </p>
                      <Button
                        onClick={() => window.location.href = '/assessment'}
                        variant="hero"
                        size="lg"
                        className="w-full"
                      >
                        Start Clinical Assessment
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      We'll contact you at {customerInfo.phone || customerInfo.email} to confirm the details.
                    </p>
                  )}

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
