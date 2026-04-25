import { useState, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock, DollarSign, Calendar as CalendarIcon, User, Mail, Lock, Phone, CheckCircle, Sparkles, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { generateContractPdf } from "@/utils/generateContractPdf";

// Square credentials
const SQUARE_APPLICATION_ID = 'sq0idp-34je5bVBSLY-rwjmh47qrw';
const SQUARE_LOCATION_ID = '3CJ7Z2V1KEZR5';

type BookingType = 'consultation' | 'crisis-coaching' | 'readiness-intensive';
type PaidReturnType = BookingType | 'fri-contract';

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

const customerInfoSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
});

const FRI_AGREEMENT_VERSION = "fri-v1";
const FRI_AGREEMENT_TEXT = `FAMILY READINESS INTENSIVE AGREEMENT

Freedom Interventions
Matt Brown
FreedomInterventions.com
(541) 838-6009

This Family Readiness Intensive Agreement ("Agreement") is entered into by and between Freedom Interventions ("Consultant") and the undersigned client ("Client").

1. Services
Client is engaging Consultant for a Family Readiness Intensive focused on evaluating the family system, current crisis dynamics, intervention readiness, communication strategy, boundary guidance, and immediate next-step recommendations relating to a loved one struggling with substance use or related behavioral health concerns.

The Family Readiness Intensive includes:
• one 90-minute consultation session, typically by Zoom unless otherwise arranged
• review of the family situation and relevant background shared by Client
• strategic guidance and recommendations
• up to 7 days of reasonable follow-up support by phone, Zoom, text, or email, at Consultant’s discretion and subject to scheduling availability

2. Fee
The fee for the Family Readiness Intensive is $2,500.00.

Client understands and agrees that this fee is earned in exchange for Consultant reserving time, providing specialized professional guidance, and making availability and follow-up support available to Client.

3. Payment Terms
Payment is due in full at the time of signing unless otherwise stated in writing by Consultant.

No services are guaranteed to begin until this Agreement is signed and payment has been successfully processed.

4. No Guarantee of Outcome
Client understands that Consultant does not and cannot guarantee any specific outcome, including but not limited to:
• that a loved one will accept help
• that a loved one will enter treatment
• that a family intervention will occur
• that any particular relationship, treatment, or recovery result will follow

Consultant agrees only to provide professional guidance, experience-based recommendations, and agreed support services.

5. Nonrefundable Fee
Client acknowledges that the Family Readiness Intensive requires Consultant to reserve time, prepare for the matter, provide specialized advisory services, and make follow-up availability available.

Accordingly, all fees paid under this Agreement are nonrefundable once the Agreement is signed and payment is processed, including in circumstances where:
• Client later decides not to proceed
• Client does not attend or fully participate
• Client believes the family is not ready
• the loved one refuses help or treatment
• the family elects not to move forward with any further services

Client agrees not to initiate a chargeback, payment dispute, or reversal based on dissatisfaction with outcome alone where Consultant has made the agreed professional time, guidance, and support available.

6. Scheduling and Rescheduling
Consultant will make reasonable efforts to schedule the session promptly. If Client needs to reschedule, Client agrees to provide as much notice as possible. Consultant will make reasonable efforts to accommodate a rescheduled session, but availability is not guaranteed on Client’s preferred timeline.

7. Client Responsibility
Client agrees to provide accurate information to the best of their knowledge and to participate honestly and in good faith. Client understands that the quality of strategic guidance may depend in part on the completeness and accuracy of the information provided.

8. Not Medical or Legal Advice
Consultant does not provide medical care, psychiatric treatment, legal advice, or emergency services. If there is an immediate safety risk, medical emergency, overdose concern, or psychiatric crisis, Client should contact 911 or appropriate emergency services immediately.

9. Confidentiality
Consultant will use reasonable discretion regarding information shared by Client, subject to legal, ethical, safety, and practical limitations. Electronic communications and virtual meetings carry inherent privacy and security risks that cannot be entirely eliminated.

10. Entire Agreement
This Agreement reflects the entire understanding between the parties regarding the Family Readiness Intensive and supersedes prior discussions relating to this specific service, unless modified in writing.

11. Acceptance
By signing below, Client acknowledges that Client has read this Agreement, understands it, and agrees to its terms, including the nonrefundable nature of the fee.`;

type Step = 'type' | 'date' | 'time' | 'details' | 'agreement' | 'payment' | 'confirmation';

export const BookingCalendar = () => {
  const [bookingType, setBookingType] = useState<BookingType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("type");
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });
  const [friAgreementAccepted, setFriAgreementAccepted] = useState(false);
  const [friSignerName, setFriSignerName] = useState("");
  const [friAgreementError, setFriAgreementError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [contractId, setContractId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [abandonedCartId, setAbandonedCartId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const squareStatus = params.get("square_status");
    const returnedBookingId = params.get("booking_id");
    const returnedType = params.get("type") as PaidReturnType | null;
    const returnedDate = params.get("date");
    const returnedTime = params.get("time");
    const returnedName = params.get("name");
    const returnedEmail = params.get("email");
    const returnedPhone = params.get("phone");

    if (squareStatus === 'success' && returnedBookingId) {
      if (returnedType && (returnedType === 'consultation' || returnedType === 'crisis-coaching' || returnedType === 'readiness-intensive' || returnedType === 'fri-contract')) {
        setBookingType(returnedType === 'fri-contract' ? 'readiness-intensive' : returnedType);
      }
      if (returnedDate) {
        const [y, m, d] = returnedDate.split('-').map(Number);
        const date = new Date(y, m - 1, d);
        if (!isNaN(date.getTime())) setSelectedDate(date);
      }
      if (returnedTime) setSelectedTime(returnedTime);
      if (returnedName || returnedEmail || returnedPhone) {
        setCustomerInfo({ name: returnedName || '', email: returnedEmail || '', phone: returnedPhone || '' });
      }
      if (returnedType === 'fri-contract') {
        setContractId(returnedBookingId);
        supabase.functions.invoke('contracts', {
          body: {
            action: 'mark-paid',
            contractId: returnedBookingId,
          }
        }).catch((error) => {
          console.error('Failed to mark FRI contract paid:', error);
        });
      } else {
        setBookingId(returnedBookingId);
      }
      setStep('confirmation');
      toast.success('Payment completed successfully.');
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', cleanUrl);
      return;
    }

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
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, "", cleanUrl);
    }
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
      toast.error('Failed to load available times');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (type: BookingType) => {
    setBookingType(type);
    setStep('date');
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime('');
    if (date) {
      fetchAvailableSlots(date);
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
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
      toast.error('Please correct the errors in the form');
      return;
    }
    if (bookingType === 'consultation' && !customerInfo.phone?.trim()) {
      setValidationErrors({ phone: 'Phone is required for consultations' });
      toast.error('Phone number is required for consultations');
      return;
    }
    if (!isPaid) {
      await bookFreeConsultation();
    } else {
      try {
        const { data: cartData } = await supabase
          .from('abandoned_carts')
          .insert({
            customer_name: customerInfo.name,
            customer_email: customerInfo.email,
            customer_phone: customerInfo.phone || null,
            booking_type: bookingType!,
            booking_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
            booking_time: selectedTime || null,
            amount_cents: offer!.priceCents,
          })
          .select('id')
          .single();
        if (cartData?.id) setAbandonedCartId(cartData.id);
      } catch (err) {
        console.warn('Cart capture failed:', err);
      }
      setStep(bookingType === 'readiness-intensive' ? 'agreement' : 'payment');
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
        toast.error('Booking saved, but confirmation email failed to send.');
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
      setStep('confirmation');
      toast.success('Consultation booked successfully!');
      await sendBookingConfirmation(data.booking.id, bookingType, bookingDate, selectedTime, offer.durationMinutes);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to book consultation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHostedCheckout = useCallback(async () => {
    if (!selectedDate || !selectedTime || !bookingType || !offer) return;
    if (bookingType === 'readiness-intensive') {
      const signerName = friSignerName.trim();
      if (!friAgreementAccepted || !signerName) {
        setFriAgreementError('Please sign and accept the Family Readiness Intensive agreement before payment.');
        toast.error('Agreement signature is required before payment.');
        return;
      }
    }

    setLoading(true);
    try {
      const bookingDate = format(selectedDate, 'yyyy-MM-dd');
      const agreementSignedAt = new Date().toISOString();
      let data;
      let error;

      if (bookingType === 'readiness-intensive') {
        const pdfBlob = generateContractPdf({
          contractTitle: 'Family Readiness Intensive Agreement',
          contractVersion: FRI_AGREEMENT_VERSION,
          clientName: customerInfo.name,
          clientEmail: customerInfo.email,
          clientPhone: customerInfo.phone || '',
          signerName: friSignerName.trim(),
          signedAt: agreementSignedAt,
          bookingTypeLabel: 'Family Readiness Intensive',
          amountLabel: offer.priceLabel,
          metadata: {
            'Session Date': format(selectedDate, 'MMMM d, yyyy'),
            'Session Time': `${formatTimeInUserTz(selectedTime, selectedDate)}${!isUserInPacific ? ` (${formatTime(selectedTime)} Pacific)` : ''}`,
          },
          agreementText: FRI_AGREEMENT_TEXT,
        });

        const pdfBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1] || '');
          };
          reader.onerror = () => reject(new Error('Failed to encode FRI contract PDF.'));
          reader.readAsDataURL(pdfBlob);
        });

        const pdfPath = `fri/${crypto.randomUUID()}.pdf`;

        const contractResponse = await supabase.functions.invoke('contracts', {
          body: {
            action: 'create-contract',
            contractType: 'readiness-intensive',
            clientName: customerInfo.name,
            clientEmail: customerInfo.email,
            clientPhone: customerInfo.phone || null,
            signerName: friSignerName.trim(),
            signedAt: agreementSignedAt,
            agreementText: FRI_AGREEMENT_TEXT,
            agreementVersion: FRI_AGREEMENT_VERSION,
            amountCents: offer.priceCents,
            contractPdfPath: pdfPath,
            contractPdfBase64: pdfBase64,
            metadata: {
              bookingDate,
              bookingTime: selectedTime,
              durationMinutes: offer.durationMinutes,
              followUpIncluded: true,
            },
          }
        });
        error = contractResponse.error;
        data = contractResponse.data;
        if (error) throw error;
        if (!data?.contract?.id) throw new Error('FRI contract record was not created.');

        setContractId(data.contract.id);

        const paymentResponse = await supabase.functions.invoke('contracts', {
          body: {
            action: 'create-payment-link',
            contractId: data.contract.id,
            amount: offer.priceCents,
            customerEmail: customerInfo.email,
            customerName: customerInfo.name,
            redirectPath: `/booking?square_status=success&contract_status=success&contract_id=${data.contract.id}&booking_id=${data.contract.id}&type=fri-contract&date=${bookingDate}&time=${selectedTime}&name=${encodeURIComponent(customerInfo.name)}&email=${encodeURIComponent(customerInfo.email)}${customerInfo.phone ? `&phone=${encodeURIComponent(customerInfo.phone)}` : ''}`,
            note: `Family Readiness Intensive for ${customerInfo.name}`,
          }
        });
        error = paymentResponse.error;
        data = paymentResponse.data;
      } else {
        const response = await supabase.functions.invoke('square-booking', {
          body: {
            action: 'create-checkout-link',
            amount: offer.priceCents,
            customerEmail: customerInfo.email,
            customerName: customerInfo.name,
            customerPhone: customerInfo.phone || null,
            bookingDate,
            bookingTime: selectedTime,
            bookingType,
            durationMinutes: offer.durationMinutes,
          }
        });
        error = response.error;
        data = response.data;
      }
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (abandonedCartId) {
        try {
          await supabase
            .from('abandoned_carts')
            .update({ status: 'recovered', recovered_at: new Date().toISOString() })
            .eq('id', abandonedCartId);
        } catch (err) {
          console.warn('Failed to mark cart recovered:', err);
        }
      }
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      throw new Error('Hosted checkout link was not returned.');
    } catch (error: any) {
      console.error('Hosted checkout error:', error);
      toast.error(error.message || 'Failed to start payment. Please try again.');
      setLoading(false);
    }
  }, [selectedDate, selectedTime, bookingType, offer, customerInfo, friAgreementAccepted, friSignerName, abandonedCartId]);

  const resetForm = () => {
    setStep('type');
    setBookingType(null);
    setSelectedDate(undefined);
    setSelectedTime('');
    setCustomerInfo({ name: '', email: '', phone: '' });
    setFriAgreementAccepted(false);
    setFriSignerName('');
    setFriAgreementError(null);
    setBookingId(null);
    setContractId(null);
    setAbandonedCartId(null);
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
      case 'agreement': return 'Review and Sign Agreement';
      case 'payment': return 'Secure Payment';
      case 'confirmation': return 'Booking Confirmed!';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'type': return 'Select the type of session you\'d like to book';
      case 'date': return offer ? `Pick a date for your ${offer.label}` : '';
      case 'time': return selectedDate ? `Available times for ${format(selectedDate, 'MMMM d, yyyy')}` : '';
      case 'details': return 'Enter your contact details';
      case 'agreement': return 'Review the Family Readiness Intensive agreement before payment';
      case 'payment': return 'You will complete payment securely on Square-hosted checkout';
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
              {step === 'type' && (
                <div className="grid md:grid-cols-3 gap-4">
                  <button onClick={() => handleTypeSelect('consultation')} className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col">
                    <div className="flex items-center gap-2 mb-3"><Phone className="w-6 h-6 text-primary" /><span className="text-lg font-semibold">Free Consultation</span></div>
                    <p className="text-muted-foreground text-sm mb-3 flex-1">{OFFERS.consultation.description}</p>
                    <div className="text-2xl font-bold text-primary">Free</div>
                    <p className="text-xs text-muted-foreground mt-1">15-minute Zoom call</p>
                  </button>
                  <button onClick={() => handleTypeSelect('crisis-coaching')} className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col">
                    <div className="flex items-center gap-2 mb-3"><DollarSign className="w-6 h-6 text-primary" /><span className="text-lg font-semibold">Crisis Coaching Session</span></div>
                    <p className="text-muted-foreground text-sm mb-3 flex-1">{OFFERS['crisis-coaching'].description}</p>
                    <div className="text-2xl font-bold text-primary">$150</div>
                    <p className="text-xs text-muted-foreground mt-1">60-minute Zoom session</p>
                  </button>
                  <button onClick={() => handleTypeSelect('readiness-intensive')} className="p-6 rounded-lg border-2 border-accent/60 bg-accent/5 hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col relative">
                    <span className="absolute -top-3 right-4 text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">Premium</span>
                    <div className="flex items-center gap-2 mb-3"><Sparkles className="w-6 h-6 text-primary" /><span className="text-lg font-semibold">Family Readiness Intensive</span></div>
                    <p className="text-muted-foreground text-sm mb-3 flex-1">{OFFERS['readiness-intensive'].description}</p>
                    <div className="text-2xl font-bold text-primary">$2,500</div>
                    <p className="text-xs text-muted-foreground mt-1">90-min Zoom + 7 days follow-up support</p>
                  </button>
                </div>
              )}

              {step === 'date' && (
                <div>
                  <div className="flex justify-center">
                    <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} className="rounded-md border" />
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="ghost" onClick={() => setStep('type')}>← Back</Button>
                  </div>
                </div>
              )}

              {step === 'time' && selectedDate && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Times shown in your timezone ({userTzShort})</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableSlots.map((slot) => (
                      <Button key={slot} variant="outline" onClick={() => handleTimeSelect(slot)} className="h-auto py-4 flex flex-col gap-1">
                        <span className="font-semibold">{formatTimeInUserTz(slot, selectedDate)}</span>
                        {!isUserInPacific && <span className="text-xs text-muted-foreground">{formatTime(slot)} Pacific</span>}
                      </Button>
                    ))}
                  </div>
                  {availableSlots.length === 0 && !loading && <p className="text-center text-muted-foreground">No available times for this date.</p>}
                  <div className="flex justify-between"><Button variant="ghost" onClick={() => setStep('date')}>← Back</Button></div>
                </div>
              )}

              {step === 'details' && selectedDate && offer && (
                <form onSubmit={handleDetailsSubmit} className="max-w-md mx-auto space-y-6">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold">Booking Summary</h4>
                    <p><strong>Session:</strong> {offer.shortName}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {formatTimeInUserTz(selectedTime, selectedDate)} {!isUserInPacific && <span className="text-muted-foreground">({formatTime(selectedTime)} Pacific)</span>}</p>
                    <div className="border-t pt-2 mt-2"><p className="text-lg font-bold">Total: {offer.priceLabel}</p></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="name" className="flex items-center gap-2"><User className="w-4 h-4" /> Full Name *</Label><Input id="name" value={customerInfo.name} onChange={(e) => { setCustomerInfo({ ...customerInfo, name: e.target.value }); if (validationErrors.name) setValidationErrors({ ...validationErrors, name: undefined }); }} placeholder="John Smith" maxLength={100} required className={validationErrors.name ? 'border-destructive' : ''} />{validationErrors.name && <p className="text-sm text-destructive">{validationErrors.name}</p>}</div>
                  <div className="space-y-2"><Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email *</Label><Input id="email" type="email" value={customerInfo.email} onChange={(e) => { setCustomerInfo({ ...customerInfo, email: e.target.value }); if (validationErrors.email) setValidationErrors({ ...validationErrors, email: undefined }); }} placeholder="john@example.com" maxLength={255} required className={validationErrors.email ? 'border-destructive' : ''} />{validationErrors.email && <p className="text-sm text-destructive">{validationErrors.email}</p>}</div>
                  <div className="space-y-2"><Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone {bookingType === 'consultation' ? '*' : '(optional)'}</Label><Input id="phone" type="tel" value={customerInfo.phone} onChange={(e) => { setCustomerInfo({ ...customerInfo, phone: e.target.value }); if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: undefined }); }} placeholder="(555) 123-4567" maxLength={20} required={bookingType === 'consultation'} className={validationErrors.phone ? 'border-destructive' : ''} />{validationErrors.phone && <p className="text-sm text-destructive">{validationErrors.phone}</p>}</div>
                  <div className="flex gap-2 pt-4"><Button type="button" variant="ghost" onClick={() => setStep('time')}>← Back</Button><Button type="submit" disabled={loading} className="flex-1">{loading ? 'Booking...' : !isPaid ? 'Book Consultation' : 'Continue to Payment'}</Button></div>
                </form>
              )}

              {step === 'agreement' && selectedDate && offer && bookingType === 'readiness-intensive' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold">Booking Summary</h4>
                    <p><strong>Session:</strong> {offer.shortName}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {formatTimeInUserTz(selectedTime, selectedDate)} {!isUserInPacific && <span className="text-muted-foreground">({formatTime(selectedTime)} Pacific)</span>}</p>
                    <p><strong>Name:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    <div className="border-t pt-2 mt-2"><p className="text-lg font-bold">Total: {offer.priceLabel}</p></div>
                  </div>
                  <div className="rounded-lg border bg-background p-5 space-y-4">
                    <h4 className="font-semibold text-lg">Family Readiness Intensive Agreement</h4>
                    <Textarea value={FRI_AGREEMENT_TEXT} readOnly className="min-h-[360px] text-sm leading-6 bg-muted/40" />
                    <div className="space-y-2"><Label htmlFor="fri-signer-name">Type your full legal name</Label><Input id="fri-signer-name" value={friSignerName} onChange={(e) => { setFriSignerName(e.target.value); if (friAgreementError) setFriAgreementError(null); }} placeholder="Full legal name" maxLength={100} /></div>
                    <div className="flex items-start gap-3 rounded-lg border p-4"><Checkbox id="fri-agreement-accepted" checked={friAgreementAccepted} onCheckedChange={(checked) => { setFriAgreementAccepted(checked === true); if (friAgreementError) setFriAgreementError(null); }} /><Label htmlFor="fri-agreement-accepted" className="leading-6 font-normal">I have read this agreement, understand it, and agree to its terms, including the nonrefundable nature of the fee.</Label></div>
                    {friAgreementError && <p className="text-sm text-destructive">{friAgreementError}</p>}
                    <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep('details')}>← Back</Button><Button onClick={() => { const signerName = friSignerName.trim(); if (!friAgreementAccepted || !signerName) { setFriAgreementError('Please type your full name and accept the agreement before continuing.'); return; } setFriAgreementError(null); setStep('payment'); }} className="flex-1">Continue to Payment</Button></div>
                  </div>
                </div>
              )}

              {step === 'payment' && selectedDate && offer && (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold">Booking Summary</h4>
                    <p><strong>Session:</strong> {offer.shortName}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {formatTimeInUserTz(selectedTime, selectedDate)} {!isUserInPacific && <span className="text-muted-foreground">({formatTime(selectedTime)} Pacific)</span>}</p>
                    <p><strong>Name:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    {bookingType === 'readiness-intensive' && <p className="text-sm text-primary pt-1">✓ Includes 7 days of follow-up support by Zoom, phone, text, or email</p>}
                    <div className="border-t pt-2 mt-2"><p className="text-lg font-bold">Total: {offer.priceLabel}</p></div>
                  </div>
                  <div className="rounded-lg border bg-card p-6 space-y-4">
                    <div className="flex items-center gap-3"><div className="rounded-full bg-primary/10 p-2"><ExternalLink className="w-5 h-5 text-primary" /></div><div><h4 className="font-semibold">Complete payment on Square</h4><p className="text-sm text-muted-foreground">You’ll be redirected to Square’s secure hosted checkout page to enter card details and complete payment.</p></div></div>
                    <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground space-y-2">
                      <div className="flex items-center gap-2"><Lock className="w-4 h-4" /><span>Secure hosted checkout powered by Square</span></div>
                      <p>You’ll return here after payment. This gives you a more professional payment experience than the embedded card field.</p>
                    </div>
                  </div>
                  <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(bookingType === 'readiness-intensive' ? 'agreement' : 'details')}>← Back</Button><Button onClick={handleHostedCheckout} disabled={loading} className="flex-1 flex items-center gap-2">{loading ? 'Redirecting...' : `Continue to Square Checkout`}</Button></div>
                </div>
              )}

              {step === 'confirmation' && selectedDate && offer && (
                <div className="max-w-md mx-auto text-center space-y-6">
                  <div className="flex justify-center"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"><CheckCircle className="w-10 h-10 text-green-600" /></div></div>
                  <div><h3 className="text-xl font-semibold mb-2">{!isPaid ? 'Consultation Booked!' : 'Payment Successful!'}</h3><p className="text-muted-foreground">We've sent a confirmation email to {customerInfo.email}</p></div>
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-left">
                    <p><strong>Session:</strong> {offer.shortName}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {formatTimeInUserTz(selectedTime, selectedDate)} {!isUserInPacific && <span className="text-muted-foreground">({formatTime(selectedTime)} Pacific)</span>}</p>
                    {bookingType === 'readiness-intensive' && <p className="text-sm text-primary pt-2">Your booking includes 7 days of follow-up support by Zoom, phone, text, or email.</p>}
                  </div>
                  {bookingType === 'readiness-intensive' ? (
                    <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-5 text-left space-y-3"><h4 className="font-semibold text-primary flex items-center gap-2"><Sparkles className="w-5 h-5" />Important Next Step</h4><p className="text-sm text-foreground">Please complete the family assessment before your Family Readiness Intensive so Matt has the strongest possible picture of your situation before the session.</p><Button asChild className="w-full"><a href="/assessment">Complete Assessment</a></Button></div>
                  ) : null}
                  <div className="flex gap-2 justify-center"><Button variant="outline" onClick={resetForm}>Book Another Session</Button>{bookingId && <Button variant="secondary" asChild><a href={`/reschedule?bookingId=${bookingId}&email=${encodeURIComponent(customerInfo.email)}`}>Manage Booking</a></Button>}</div>
                  {contractId && bookingType === 'readiness-intensive' ? <p className="text-xs text-muted-foreground">Contract ID: {contractId}</p> : null}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
