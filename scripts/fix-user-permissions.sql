-- Fix user permissions and RLS policies for Supabase

-- First, ensure the users table exists with correct schema
CREATE TABLE IF NOT EXISTS public.users (
    id text NOT NULL,
    email text NULL,
    name text NULL,
    avatar text NULL,
    readme_count integer NULL DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Disable RLS temporarily to allow user creation
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to anon and authenticated roles
GRANT ALL ON public.users TO anon;
GRANT ALL ON public.users TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_id ON public.users(id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Enable RLS with proper policies (uncomment if you want RLS)
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own data
-- CREATE POLICY "Users can view own profile" ON public.users
--     FOR SELECT USING (auth.uid()::text = id);

-- Policy to allow users to insert their own data
-- CREATE POLICY "Users can insert own profile" ON public.users
--     FOR INSERT WITH CHECK (auth.uid()::text = id);

-- Policy to allow users to update their own data
-- CREATE POLICY "Users can update own profile" ON public.users
--     FOR UPDATE USING (auth.uid()::text = id);

-- Test the setup by inserting a test user
INSERT INTO public.users (id, email, name, avatar, readme_count) 
VALUES ('test-setup-user', 'test@setup.com', 'Test Setup User', null, 0)
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    updated_at = now();

-- Verify the test user was created
SELECT * FROM public.users WHERE id = 'test-setup-user';

-- Clean up test user
DELETE FROM public.users WHERE id = 'test-setup-user';

-- Show current table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;