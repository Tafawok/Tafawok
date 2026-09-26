-- ==============================================================================
-- TAFAWOK CRE — Schema Migration: Activities, Banners & Maintenance Mode
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ACTIVITIES (Company Events, Bazars, Project Launches, Exhibitions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activities (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title JSONB NOT NULL,
    summary JSONB NOT NULL,
    content JSONB NOT NULL,
    category TEXT NOT NULL DEFAULT 'launch' CHECK (category IN ('launch', 'bazaar', 'exhibition', 'corporate', 'community')),
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'past')),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    location_name JSONB NOT NULL,
    location_url TEXT,
    main_image TEXT NOT NULL,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    action_url TEXT,
    action_label JSONB,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activities_slug ON public.activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_category ON public.activities(category);
CREATE INDEX IF NOT EXISTS idx_activities_status ON public.activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_start_date ON public.activities(start_date DESC);
CREATE INDEX IF NOT EXISTS idx_activities_sort_order ON public.activities(sort_order);

-- ------------------------------------------------------------------------------
-- 2. NOTIFICATION BANNERS (Time-delimited Announcement Ribbons)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notification_banners (
    id TEXT PRIMARY KEY,
    title JSONB NOT NULL,
    message JSONB NOT NULL,
    badge JSONB,
    location JSONB,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    type TEXT NOT NULL DEFAULT 'announcement' CHECK (type IN ('launch', 'bazaar', 'announcement', 'urgent')),
    link_url TEXT,
    link_label JSONB,
    dismissible BOOLEAN NOT NULL DEFAULT true,
    priority INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_banners_is_active ON public.notification_banners(is_active);
CREATE INDEX IF NOT EXISTS idx_banners_dates ON public.notification_banners(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_banners_priority ON public.notification_banners(priority DESC);

-- ------------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_banners ENABLE ROW LEVEL SECURITY;

-- Activities Policies
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'activities' AND policyname = 'Public read published activities'
    ) THEN
        CREATE POLICY "Public read published activities"
            ON public.activities FOR SELECT
            TO anon, authenticated
            USING (is_published = true OR public.is_admin());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'activities' AND policyname = 'Admin write activities'
    ) THEN
        CREATE POLICY "Admin write activities"
            ON public.activities FOR ALL
            TO authenticated
            USING (public.is_admin())
            WITH CHECK (public.is_admin());
    END IF;
END $$;

-- Notification Banners Policies
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'notification_banners' AND policyname = 'Public read active banners'
    ) THEN
        CREATE POLICY "Public read active banners"
            ON public.notification_banners FOR SELECT
            TO anon, authenticated
            USING (is_active = true OR public.is_admin());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'notification_banners' AND policyname = 'Admin write banners'
    ) THEN
        CREATE POLICY "Admin write banners"
            ON public.notification_banners FOR ALL
            TO authenticated
            USING (public.is_admin())
            WITH CHECK (public.is_admin());
    END IF;
END $$;
