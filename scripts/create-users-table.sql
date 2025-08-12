-- Create users table with the exact schema you provided
CREATE TABLE IF NOT EXISTS public.users (
    id text NOT NULL,
    email text NULL,
    name text NULL,
    avatar text NULL,
    readme_count integer NULL DEFAULT 0,
    CONSTRAINT users_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Disable RLS for now to avoid permission issues
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_users_id ON public.users(id);

-- Insert a test user to verify the table works
INSERT INTO public.users (id, email, name, avatar, readme_count) 
VALUES ('test-user-123', 'test@example.com', 'Test User', null, 0)
ON CONFLICT (id) DO NOTHING;

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;