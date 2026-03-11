import { useState } from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, CheckCircle, CalendarIcon, Clock, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

type Step = 'lookup' | 'select-date' | 'select-time' | 'confirmation';

interface BookingData {
  id: string;
  booking_type: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  customer_email: string;
}

const Reschedule = () => {
  const [step, setStep] = useState<Step>('lookup');
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

  const lookupBooking = async () => {
    if (!bookingId.trim() || !email.trim()) {
      toast.error("Please enter both booking ID and email");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: { 
          action: 'lookup-booking', 
          bookingId: bookingId.trim(),
          email: email.trim().toLowerCase()
        }
      });

      if (error) throw error;
      
      if (!data.booking) {
        toast.error("No booking found with that ID and email");
        return;
      }

      setBooking(data.booking);
      setStep('select-date');
      toast.success("Booking found!");
    } catch (error: any) {
      console.error('Error looking up booking:', error);
      toast.error("Failed to find booking. Please check your details.");
    } finally {
      setLoading(false);
    }
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

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime('');
    if (date) {
      fetchAvailableSlots(date);
      setStep('select-time');
    }
  };

  const handleReschedule = async () => {
    if (!booking || !selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('square-booking', {
        body: { 
          action: 'reschedule-booking',
          bookingId: booking.id,
          email: email.trim().toLowerCase(),
          newDate: format(selectedDate, 'yyyy-MM-dd'),
          newTime: selectedTime
        }
      });

      if (error) throw error;

      setStep('confirmation');
      toast.success("Booking rescheduled successfully!");
    } catch (error: any) {
      console.error('Error rescheduling:', error);
      toast.error("Failed to reschedule booking");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr + 'T00:00:00'), 'MMMM d, yyyy');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <SEOHead
        title="Reschedule Booking | Freedom Interventions"
        description="Reschedule your consultation appointment with Freedom Interventions. Enter your booking ID and email to select a new date and time."
        noindex={true}
      />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-lg">
          <Card className="border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-display text-primary">
                {step === 'lookup' && 'Reschedule Booking'}
                {step === 'select-date' && 'Select New Date'}
                {step === 'select-time' && 'Select New Time'}
                {step === 'confirmation' && 'Booking Updated!'}
              </CardTitle>
              <CardDescription>
                {step === 'lookup' && 'Enter your booking details to reschedule'}
                {step === 'select-date' && `Current: ${formatDate(booking?.booking_date || '')} at ${formatTime(booking?.booking_time || '')}`}
                {step === 'select-time' && `New date: ${selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}`}
                {step === 'confirmation' && 'Your appointment has been rescheduled'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 'lookup' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bookingId">Booking ID</Label>
                    <Input
                      id="bookingId"
                      placeholder="Enter your booking ID"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={lookupBooking} 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span> Looking up...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4" /> Find Booking
                      </span>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Your booking ID was sent in your confirmation email
                  </p>
                </div>
              )}

              {step === 'select-date' && (
                <div className="space-y-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    className="rounded-md border mx-auto"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('lookup')}
                    className="w-full"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              )}

              {step === 'select-time' && (
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <span className="animate-spin text-2xl">⏳</span>
                      <p className="mt-2 text-muted-foreground">Loading available times...</p>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No available times for this date</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setStep('select-date')}
                        className="mt-4"
                      >
                        Choose Another Date
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                            className="text-sm"
                          >
                            {formatTime(slot)}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setStep('select-date')}
                          className="flex-1"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button 
                          onClick={handleReschedule}
                          disabled={!selectedTime || loading}
                          className="flex-1"
                        >
                          {loading ? 'Updating...' : 'Confirm Reschedule'}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {step === 'confirmation' && (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-lg">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <span>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-lg">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{formatTime(selectedTime)}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    A confirmation email has been sent with your updated appointment details.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="w-full"
                  >
                    Return Home
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reschedule;