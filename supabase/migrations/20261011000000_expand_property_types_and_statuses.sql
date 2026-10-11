-- ==============================================================================
-- TAFAWOK CRE — Schema Migration: Expand Property Types and Statuses
-- ==============================================================================

-- Expand properties type check constraint to include all CRE asset disciplines
ALTER TABLE public.properties
  DROP CONSTRAINT IF EXISTS properties_type_check;

ALTER TABLE public.properties
  ADD CONSTRAINT properties_type_check
  CHECK (type IN ('office', 'retail', 'commercial', 'mixed-use', 'logistics'));

-- Expand properties status check constraint to include operational & lifecycle states
ALTER TABLE public.properties
  DROP CONSTRAINT IF EXISTS properties_status_check;

ALTER TABLE public.properties
  ADD CONSTRAINT properties_status_check
  CHECK (status IN ('active', 'operational', 'completed', 'under-development', 'pipeline'));
