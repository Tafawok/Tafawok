-- ==============================================================================
-- TAFAWOK CRE — Schema Migration: Commercial Real Estate Content & Management
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. PROPERTIES (Commercial Flagships: Offices, Retail, Mixed-Use)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL,
    tagline JSONB NOT NULL,
    type TEXT NOT NULL DEFAULT 'retail' CHECK (type IN ('office', 'retail', 'logistics')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'pipeline')),
    category JSONB NOT NULL,
    description JSONB NOT NULL,
    full_overview JSONB NOT NULL,
    main_image TEXT NOT NULL,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    video JSONB,
    location JSONB NOT NULL,
    contact JSONB NOT NULL,
    key_stats JSONB NOT NULL,
    specs JSONB NOT NULL DEFAULT '[]'::jsonb,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for slug lookups and sorting
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_sort_order ON public.properties(sort_order);

-- ------------------------------------------------------------------------------
-- 2. PROPERTY STORES (Retail Showrooms, Outlets & Tenants)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.property_stores (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    name JSONB NOT NULL,
    category JSONB NOT NULL,
    floor JSONB NOT NULL,
    unit_number TEXT,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'coming_soon', 'leased')),
    description JSONB,
    phone TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_property_stores_property_id ON public.property_stores(property_id);
CREATE INDEX IF NOT EXISTS idx_property_stores_sort_order ON public.property_stores(sort_order);

-- ------------------------------------------------------------------------------
-- 3. COMMERCIAL DISCIPLINES (Core Business Sectors)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.commercial_disciplines (
    id TEXT PRIMARY KEY,
    title JSONB NOT NULL,
    tagline JSONB NOT NULL,
    description JSONB NOT NULL,
    key_metric JSONB NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    icon_name TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_disciplines_sort_order ON public.commercial_disciplines(sort_order);

-- ------------------------------------------------------------------------------
-- 4. CORPORATE METRICS (Hero Credentials)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.corporate_metrics (
    id TEXT PRIMARY KEY,
    value NUMERIC NOT NULL,
    suffix TEXT NOT NULL DEFAULT '',
    label JSONB NOT NULL,
    description JSONB NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_metrics_sort_order ON public.corporate_metrics(sort_order);

-- ------------------------------------------------------------------------------
-- 5. TIMELINE MILESTONES (Corporate Heritage)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.timeline_milestones (
    id TEXT PRIMARY KEY,
    year TEXT NOT NULL,
    title JSONB NOT NULL,
    badge JSONB NOT NULL,
    description JSONB NOT NULL,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    scope_category TEXT NOT NULL DEFAULT 'commercial' CHECK (scope_category IN ('heritage', 'infrastructure', 'commercial', 'expansion')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_timeline_sort_order ON public.timeline_milestones(sort_order);

-- ------------------------------------------------------------------------------
-- 6. CORPORATE VALUES (Institutional Values)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.corporate_values (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL,
    title JSONB NOT NULL,
    tagline JSONB NOT NULL,
    description JSONB NOT NULL,
    icon_name TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_values_sort_order ON public.corporate_values(sort_order);

-- ------------------------------------------------------------------------------
-- 7. INVESTMENT PILLARS (Strategic Thesis)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.investment_pillars (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL,
    title JSONB NOT NULL,
    tagline JSONB NOT NULL,
    description JSONB NOT NULL,
    metric JSONB NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pillars_sort_order ON public.investment_pillars(sort_order);

-- ------------------------------------------------------------------------------
-- 8. CLIENT PARTNERS (Tier-1 Institutional Track Record)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.client_partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('energy', 'epc', 'commercial', 'manufacturer')),
    country TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_partners_sort_order ON public.client_partners(sort_order);

-- ------------------------------------------------------------------------------
-- 9. SITE SETTINGS (Singleton Records: Identity, CEO Profile, HSE Charter)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 10. INQUIRIES (Commercial Leasing & Turnkey RFQs)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    interest_type TEXT,
    property_slug TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);

-- ------------------------------------------------------------------------------
-- 11. ADMIN USERS (Super Admin Access Control)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'super_admin' CHECK (role IN ('super_admin', 'editor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helper function to verify admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = (SELECT auth.uid())
  );
$$;

-- ------------------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS across all tables
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commercial_disciplines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Properties: Public can read published; Admin has full access
CREATE POLICY "Public read published properties"
    ON public.properties FOR SELECT
    TO anon, authenticated
    USING (is_published = true OR public.is_admin());

CREATE POLICY "Admin write properties"
    ON public.properties FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Property Stores
CREATE POLICY "Public read stores"
    ON public.property_stores FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin write stores"
    ON public.property_stores FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Commercial Disciplines
CREATE POLICY "Public read disciplines"
    ON public.commercial_disciplines FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin write disciplines"
    ON public.commercial_disciplines FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Corporate Metrics
CREATE POLICY "Public read metrics"
    ON public.corporate_metrics FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin write metrics"
    ON public.corporate_metrics FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Timeline Milestones
CREATE POLICY "Public read timeline"
    ON public.timeline_milestones FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin write timeline"
    ON public.timeline_milestones FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Corporate Values
CREATE POLICY "Public read values"
    ON public.corporate_values FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin write values"
    ON public.corporate_values FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Investment Pillars
CREATE POLICY "Public read pillars"
    ON public.investment_pillars FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin write pillars"
    ON public.investment_pillars FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Client Partners
CREATE POLICY "Public read partners"
    ON public.client_partners FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin write partners"
    ON public.client_partners FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Site Settings
CREATE POLICY "Public read settings"
    ON public.site_settings FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin write settings"
    ON public.site_settings FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Inquiries: Public can insert; Admin can view and update
CREATE POLICY "Public insert inquiries"
    ON public.inquiries FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admin manage inquiries"
    ON public.inquiries FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Admin Users: Admins can view admins
CREATE POLICY "Admin view admin_users"
    ON public.admin_users FOR SELECT
    TO authenticated
    USING (id = (SELECT auth.uid()) OR public.is_admin());

-- ------------------------------------------------------------------------------
-- 13. API GRANTS
-- ------------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
