
CREATE TABLE public.skin_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  diagnosis TEXT NOT NULL,
  diagnosis_code TEXT,
  full_name TEXT,
  confidence NUMERIC,
  risk TEXT,
  stage TEXT,
  urgency TEXT,
  description TEXT,
  characteristics JSONB DEFAULT '[]'::jsonb,
  recommendations JSONB DEFAULT '[]'::jsonb,
  doctor_consultation JSONB DEFAULT '{}'::jsonb,
  differential_diagnosis JSONB DEFAULT '[]'::jsonb,
  skin_type_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.skin_analyses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (no auth required for this public tool)
CREATE POLICY "Anyone can insert analyses"
  ON public.skin_analyses FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read analyses
CREATE POLICY "Anyone can read analyses"
  ON public.skin_analyses FOR SELECT
  USING (true);
