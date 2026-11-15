-- ==============================================================================
-- RETRO-NEO DEVELOPER PORTFOLIO - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE content_status AS ENUM ('draft', 'published');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE skill_category AS ENUM ('frontend', 'backend', 'database', 'languages', 'tools');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. ADMIN USERS ALLOWLIST TABLE (STRICT ACCESS CONTROL)
-- Only Supabase users listed in this table are recognized as Administrators
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 4. SERVER-SIDE HELPER FUNCTION TO CHECK IF CALLER IS AN AUTHORIZED ADMIN
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
$$;

-- Allow authenticated admins to view the allowlist
CREATE POLICY "Admins can view admin_users"
ON public.admin_users FOR SELECT TO authenticated
USING (public.is_admin());

-- 5. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT 'Joshua Dev',
    title TEXT NOT NULL DEFAULT 'SOFTWARE DEVELOPER',
    bio TEXT NOT NULL DEFAULT 'I build scalable web applications and turn ideas into impactful products with clean, efficient code.',
    short_intro TEXT NOT NULL DEFAULT 'HEY, I''M JOSHUA 👋',
    email TEXT NOT NULL DEFAULT 'joshua.dev@example.com',
    github_url TEXT DEFAULT 'https://github.com',
    linkedin_url TEXT DEFAULT 'https://linkedin.com',
    twitter_url TEXT DEFAULT 'https://twitter.com',
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    resume_url TEXT DEFAULT '#',
    location TEXT DEFAULT 'San Francisco, CA',
    status_badge TEXT DEFAULT 'OPEN TO WORK',
    code_snippet TEXT DEFAULT '> const developer = {\n  code: ''TypeScript'',\n  build: ''React'',\n  deploy: ''Vercel'',\n  passion: ''Solving problems''\n}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT,
    image_url TEXT NOT NULL,
    live_url TEXT,
    github_url TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    featured BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category skill_category NOT NULL DEFAULT 'frontend',
    icon_name TEXT NOT NULL,
    proficiency INTEGER DEFAULT 90 CHECK (proficiency >= 0 AND proficiency <= 100),
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    organization TEXT NOT NULL,
    location TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_current BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    achievements TEXT[] DEFAULT ARRAY[]::TEXT[],
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    start_year TEXT NOT NULL,
    end_year TEXT NOT NULL,
    grade_or_honors TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    expiry_date TEXT,
    credential_id TEXT,
    credential_url TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. HACKATHONS TABLE
CREATE TABLE IF NOT EXISTS public.hackathons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    organizer TEXT NOT NULL,
    event_date TEXT NOT NULL,
    team_name TEXT,
    project_name TEXT NOT NULL,
    project_description TEXT NOT NULL,
    award_or_position TEXT NOT NULL,
    project_url TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_icon TEXT DEFAULT 'Trophy',
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. CODING STATISTICS TABLE
CREATE TABLE IF NOT EXISTS public.coding_statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value TEXT NOT NULL,
    profile_url TEXT,
    icon_name TEXT DEFAULT 'Code',
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published'
);

-- 15. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seo_title TEXT DEFAULT 'Joshua Dev | Retro-Neo Developer Portfolio',
    seo_description TEXT DEFAULT 'Neo-Brutalist retro-inspired software developer portfolio.',
    primary_accent TEXT DEFAULT '#C5FF4A',
    show_retro_stickers BOOLEAN DEFAULT true,
    show_grid_lines BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Only authorized admins can modify profiles" 
ON public.profiles FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 2. PROJECTS POLICIES
CREATE POLICY "Public can view published projects" 
ON public.projects FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full project access" 
ON public.projects FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. SKILLS POLICIES
CREATE POLICY "Public can view published skills" 
ON public.skills FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full skills access" 
ON public.skills FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 4. EXPERIENCE POLICIES
CREATE POLICY "Public can view published experience" 
ON public.experience FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full experience access" 
ON public.experience FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5. EDUCATION POLICIES
CREATE POLICY "Public can view published education" 
ON public.education FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full education access" 
ON public.education FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6. CERTIFICATIONS POLICIES
CREATE POLICY "Public can view published certifications" 
ON public.certifications FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full certifications access" 
ON public.certifications FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 7. HACKATHONS POLICIES
CREATE POLICY "Public can view published hackathons" 
ON public.hackathons FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full hackathons access" 
ON public.hackathons FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 8. ACHIEVEMENTS POLICIES
CREATE POLICY "Public can view published achievements" 
ON public.achievements FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full achievements access" 
ON public.achievements FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 9. CODING STATISTICS POLICIES
CREATE POLICY "Public can view published coding statistics" 
ON public.coding_statistics FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full coding statistics access" 
ON public.coding_statistics FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 10. SOCIAL LINKS POLICIES
CREATE POLICY "Public can view published social links" 
ON public.social_links FOR SELECT USING (status = 'published');

CREATE POLICY "Only authorized admins have full social links access" 
ON public.social_links FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 11. CONTACT MESSAGES POLICIES
-- Anyone can submit a message
CREATE POLICY "Public can submit contact messages" 
ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Only authorized administrator can read and delete contact messages
CREATE POLICY "Only authorized admins can manage contact messages" 
ON public.contact_messages FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 12. SITE SETTINGS POLICIES
CREATE POLICY "Public can view site settings" 
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Only authorized admins have full site settings access" 
ON public.site_settings FOR ALL TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS & STRICT ADMIN ACCESS POLICIES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('profile-images', 'profile-images', true),
    ('project-images', 'project-images', true),
    ('certificates', 'certificates', true),
    ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view stored assets
CREATE POLICY "Public Read Profile Images" ON storage.objects FOR SELECT USING (bucket_id = 'profile-images');
CREATE POLICY "Public Read Project Images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Public Read Certificates" ON storage.objects FOR SELECT USING (bucket_id = 'certificates');
CREATE POLICY "Public Read Resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes');

-- Only authorized administrators can upload, replace, or delete files
CREATE POLICY "Admin Upload Profile Images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (public.is_admin() AND bucket_id = 'profile-images');
CREATE POLICY "Admin Update Profile Images" ON storage.objects FOR UPDATE TO authenticated USING (public.is_admin() AND bucket_id = 'profile-images');
CREATE POLICY "Admin Delete Profile Images" ON storage.objects FOR DELETE TO authenticated USING (public.is_admin() AND bucket_id = 'profile-images');

CREATE POLICY "Admin Upload Project Images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (public.is_admin() AND bucket_id = 'project-images');
CREATE POLICY "Admin Update Project Images" ON storage.objects FOR UPDATE TO authenticated USING (public.is_admin() AND bucket_id = 'project-images');
CREATE POLICY "Admin Delete Project Images" ON storage.objects FOR DELETE TO authenticated USING (public.is_admin() AND bucket_id = 'project-images');

CREATE POLICY "Admin Upload Certificates" ON storage.objects FOR INSERT TO authenticated WITH CHECK (public.is_admin() AND bucket_id = 'certificates');
CREATE POLICY "Admin Update Certificates" ON storage.objects FOR UPDATE TO authenticated USING (public.is_admin() AND bucket_id = 'certificates');
CREATE POLICY "Admin Delete Certificates" ON storage.objects FOR DELETE TO authenticated USING (public.is_admin() AND bucket_id = 'certificates');

CREATE POLICY "Admin Upload Resumes" ON storage.objects FOR INSERT TO authenticated WITH CHECK (public.is_admin() AND bucket_id = 'resumes');
CREATE POLICY "Admin Update Resumes" ON storage.objects FOR UPDATE TO authenticated USING (public.is_admin() AND bucket_id = 'resumes');
CREATE POLICY "Admin Delete Resumes" ON storage.objects FOR DELETE TO authenticated USING (public.is_admin() AND bucket_id = 'resumes');
