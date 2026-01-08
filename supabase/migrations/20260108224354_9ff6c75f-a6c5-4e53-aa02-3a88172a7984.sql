-- Create trigger for assessments audit (write operations are already audited via function)
-- This ensures the existing audit_assessments_writes function is connected to the table
CREATE TRIGGER audit_assessments_changes
AFTER UPDATE OR DELETE ON public.assessments
FOR EACH ROW
EXECUTE FUNCTION public.audit_assessments_writes();

-- Add IP and user_agent capture to bookings audit for consistency
ALTER TABLE public.bookings_access_audit 
ADD COLUMN IF NOT EXISTS ip text,
ADD COLUMN IF NOT EXISTS user_agent text;