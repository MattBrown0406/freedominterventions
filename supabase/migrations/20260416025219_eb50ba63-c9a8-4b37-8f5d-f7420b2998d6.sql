
CREATE OR REPLACE FUNCTION public.notify_assessment_to_notion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  payload jsonb;
  request_id bigint;
BEGIN
  payload := jsonb_build_object(
    'record', row_to_json(NEW)
  );

  SELECT net.http_post(
    url := 'https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/assessment-to-notion',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := payload
  ) INTO request_id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_assessment_insert_notify_notion
AFTER INSERT ON public.assessments
FOR EACH ROW
EXECUTE FUNCTION public.notify_assessment_to_notion();
