-- Complete Database Setup for GitDocs README Generator
-- Run this script in your Supabase SQL Editor

-- ============================================================================
-- 1. CREATE USERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.users (
    id text NOT NULL,
    email text NULL,
    name text NULL,
    avatar text NULL,
    readme_count integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- ============================================================================
-- 2. DISABLE ROW LEVEL SECURITY (for simplicity)
-- ============================================================================

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 3. GRANT PERMISSIONS
-- ============================================================================

GRANT ALL ON public.users TO anon;
GRANT ALL ON public.users TO authenticated;

-- ============================================================================
-- 4. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_id ON public.users(id);
CREATE INDEX IF NOT EXISTS idx_users_readme_count ON public.users(readme_count);

-- ============================================================================
-- 5. CREATE UPDATED_AT TRIGGER
-- ============================================================================

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

-- ============================================================================
-- 6. VERIFICATION QUERIES
-- ============================================================================

-- Check table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check permissions
SELECT 
    grantee, 
    privilege_type, 
    is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'users' AND table_schema = 'public';

-- Check RLS status
SELECT 
    schemaname, 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- ============================================================================
-- 7. TEST THE SETUP
-- ============================================================================

-- Insert test user
INSERT INTO public.users (id, email, name, readme_count) 
VALUES ('test-setup-verification', 'test@example.com', 'Test User', 0)
ON CONFLICT (id) DO NOTHING;

-- Verify insert worked
SELECT * FROM public.users WHERE id = 'test-setup-verification';

-- Test update
UPDATE public.users 
SET readme_count = 1 
WHERE id = 'test-setup-verification';

-- Verify update worked and updated_at changed
SELECT id, readme_count, created_at, updated_at 
FROM public.users 
WHERE id = 'test-setup-verification';

-- Clean up test user
DELETE FROM public.users WHERE id = 'test-setup-verification';

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================

-- Your database is now ready for the GitDocs README Generator
-- The users table will track:
-- - User authentication (id from Clerk)
-- - User profile info (email, name, avatar)
-- - README generation count (readme_count)
-- - Timestamps (created_at, updated_at)

-- Each user can generate up to 3 READMEs (enforced by the application)