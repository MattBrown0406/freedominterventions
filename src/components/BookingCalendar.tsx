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
import { trackEvent } from "@/lib/analytics";
import { getFunnelAttribution } from "@/lib/funnelAttribution";

// Square credentials
const SQUARE_APPLICATION_ID = 'sq0idp-34je5bVBSLY-rwjmh47qrw';
const SQUARE_LOCATION_ID = '3CJ7Z2V1KEZR5';

type BookingType = 'consultation' | 'crisis-coaching' | 'readiness-intensive' | 'aftercare-planning';
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
  'aftercare-planning': {
    label: 'Aftercare Planning Call',
    durationMinutes: 30,
    priceCents: 0,
    priceLabel: 'Free',
    description: "A free 30-minute call for families whose loved one is entering or leaving treatment. We map the aftercare structure your family needs and discuss ongoing support options.",
    shortName: 'Aftercare Planning Call (30 min)',
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
