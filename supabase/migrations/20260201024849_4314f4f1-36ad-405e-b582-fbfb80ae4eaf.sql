-- Create table for admin availability settings
CREATE TABLE public.availability_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 6 = Saturday
    start_time time NOT NULL,
    end_time time NOT NULL,
    is_available boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (day_of_week)
);

-- Enable RLS
ALTER TABLE public.availability_settings ENABLE ROW LEVEL SECURITY;

-- Only strict admins can manage availability
CREATE POLICY "Only strict admins can view availability"
ON public.availability_settings
FOR SELECT
USING (is_strict_admin());

CREATE POLICY "Only strict admins can insert availability"
ON public.availability_settings
FOR INSERT
WITH CHECK (is_strict_admin());

CREATE POLICY "Only strict admins can update availability"
ON public.availability_settings
FOR UPDATE
USING (is_strict_admin())
WITH CHECK (is_strict_admin());

CREATE POLICY "Only strict admins can delete availability"
ON public.availability_settings
FOR DELETE
USING (is_strict_admin());

-- Public can read availability for booking (anonymous access for calendar)
CREATE POLICY "Anyone can read availability for booking"
ON public.availability_settings
FOR SELECT
USING (true);

-- Insert default availability (Mon-Fri 9 AM to 7 PM)
INSERT INTO public.availability_settings (day_of_week, start_time, end_time, is_available)
VALUES 
    (0, '09:00', '19:00', false),  -- Sunday - unavailable
    (1, '09:00', '19:00', true),   -- Monday
    (2, '09:00', '19:00', true),   -- Tuesday
    (3, '09:00', '19:00', true),   -- Wednesday
    (4, '09:00', '19:00', true),   -- Thursday
    (5, '09:00', '19:00', true),   -- Friday
    (6, '09:00', '19:00', false);  -- Saturday - unavailable

-- Create trigger for updated_at
CREATE TRIGGER update_availability_settings_updated_at
    BEFORE UPDATE ON public.availability_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();