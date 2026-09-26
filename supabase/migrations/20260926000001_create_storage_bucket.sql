-- ==============================================================================
-- TAFAWOK CRE — Supabase Storage Bucket & Policies for Media Assets
-- ==============================================================================

-- 1. Create or update public storage bucket for Tafawok CRE media assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tafawok-media',
  'tafawok-media',
  true,
  104857600, -- 100MB (supports images and high-res video walkthroughs)
  ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif',
    'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-matroska'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 104857600,
  allowed_mime_types = ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif',
    'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-matroska'
  ];

-- 2. Policy: Allow public read access to all objects in 'tafawok-media'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Public media access'
  ) THEN
    CREATE POLICY "Public media access"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'tafawok-media');
  END IF;
END $$;

-- 3. Policy: Allow authenticated super admins to insert/upload objects into 'tafawok-media'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Admin upload media'
  ) THEN
    CREATE POLICY "Admin upload media"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'tafawok-media' AND
      (public.is_admin())
    );
  END IF;
END $$;

-- 4. Policy: Allow authenticated super admins to update/upsert objects in 'tafawok-media'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Admin update media'
  ) THEN
    CREATE POLICY "Admin update media"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'tafawok-media' AND
      (public.is_admin())
    )
    WITH CHECK (
      bucket_id = 'tafawok-media' AND
      (public.is_admin())
    );
  END IF;
END $$;

-- 5. Policy: Allow authenticated super admins to delete objects in 'tafawok-media'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Admin delete media'
  ) THEN
    CREATE POLICY "Admin delete media"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'tafawok-media' AND
      (public.is_admin())
    );
  END IF;
END $$;
