
-- Create case_documents table
CREATE TABLE public.case_documents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  notion_case_id text NOT NULL,
  client_name text NOT NULL,
  doc_type text NOT NULL CHECK (doc_type IN ('assessment', 'contract', 'insurance_card', 'intervention_letter', 'notes', 'other')),
  title text NOT NULL,
  file_url text,
  file_path text,
  file_size integer,
  mime_type text,
  notes text,
  ai_summary text,
  uploaded_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create index on notion_case_id for fast lookups
CREATE INDEX idx_case_documents_notion_case_id ON public.case_documents (notion_case_id);

-- Enable RLS
ALTER TABLE public.case_documents ENABLE ROW LEVEL SECURITY;

-- RLS: block all direct client access (edge function uses service role)
CREATE POLICY "No direct client access" ON public.case_documents FOR ALL USING (false) WITH CHECK (false);

-- Strict admin can view for dashboard purposes
CREATE POLICY "Strict admins can view case documents" ON public.case_documents FOR SELECT TO authenticated USING (public.is_strict_admin());

-- Updated_at trigger
CREATE TRIGGER update_case_documents_updated_at
  BEFORE UPDATE ON public.case_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create private storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('case-documents', 'case-documents', false);

-- Storage RLS: only service role (edge function) can manage files
CREATE POLICY "No direct client uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'case-documents' AND false);
CREATE POLICY "No direct client reads" ON storage.objects FOR SELECT USING (bucket_id = 'case-documents' AND false);
CREATE POLICY "No direct client deletes" ON storage.objects FOR DELETE USING (bucket_id = 'case-documents' AND false);
CREATE POLICY "Strict admins can view case document files" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'case-documents' AND public.is_strict_admin());
