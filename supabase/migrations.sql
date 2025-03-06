
-- Create profiles table for admin authentication
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create login attempts table for rate limiting
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  attempt_time TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create interest forms table for mortgage calculator
CREATE TABLE IF NOT EXISTS public.interest_forms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function for creating interest forms
CREATE OR REPLACE FUNCTION public.create_interest_form(
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT
) RETURNS void AS $$
BEGIN
  INSERT INTO public.interest_forms(full_name, email, phone)
  VALUES (p_full_name, p_email, p_phone);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on new tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interest_forms ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Add RLS policies for login attempts (admin only)
CREATE POLICY "Only admins can view login attempts" ON public.login_attempts
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Add RLS policies for interest forms (admin only)
CREATE POLICY "Only admins can view interest forms" ON public.interest_forms
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "Anyone can submit interest form" ON public.interest_forms
  FOR INSERT WITH CHECK (true);

-- Ensure views360 format function
CREATE OR REPLACE FUNCTION ensure_views360_format()
RETURNS TRIGGER AS $$
BEGIN
  -- If views360 is a string, convert it to a JSON array with one object
  IF jsonb_typeof(NEW.views360) = 'string' THEN
    NEW.views360 := jsonb_build_array(
      jsonb_build_object(
        'id', gen_random_uuid(),
        'title', 'جولة افتراضية 360°',
        'url', NEW.views360::text
      )
    );
  -- If it's null, set as empty array
  ELSIF NEW.views360 IS NULL THEN
    NEW.views360 := '[]'::jsonb;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for ensuring views360 format
DROP TRIGGER IF EXISTS ensure_views360_format_trigger ON project_details;
CREATE TRIGGER ensure_views360_format_trigger
BEFORE INSERT OR UPDATE ON project_details
FOR EACH ROW
EXECUTE FUNCTION ensure_views360_format();
