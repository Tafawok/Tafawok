import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/types/database.types"
import {
  PROPERTIES as STATIC_PROPERTIES,
  COMMERCIAL_DISCIPLINES as STATIC_DISCIPLINES,
  CORPORATE_METRICS as STATIC_METRICS,
  CLIENT_PARTNERS as STATIC_PARTNERS,
  CORPORATE_TIMELINE as STATIC_TIMELINE,
  CORPORATE_VALUES as STATIC_VALUES,
  HSE_CHARTER as STATIC_HSE,
  CRE_INVESTMENT_THESIS as STATIC_PILLARS,
  CEO_PROFILE as STATIC_CEO,
  COMPANY_IDENTITY as STATIC_IDENTITY,
} from "@/content/cre-data"
import type {
  Property,
  CommercialDiscipline,
  CorporateMetric,
  ClientPartner,
  TimelineMilestone,
  CorporateValue,
  InvestmentPillar,
  CeoProfile,
  HseCharter,
  StoreItem,
  LocalizedString,
  CompanyIdentity,
} from "@/types/cre"

/**
 * Transforms a Supabase property row (and attached stores) to the domain `Property` model.
 */
function mapPropertyRow(
  row: Tables<"properties">,
  stores: StoreItem[] = []
): Property {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name as unknown as LocalizedString,
    tagline: row.tagline as unknown as LocalizedString,
    type: (row.type as Property["type"]) || "retail",
    status: (row.status as Property["status"]) || "active",
    category: row.category as unknown as LocalizedString,
    description: row.description as unknown as LocalizedString,
    fullOverview: row.full_overview as unknown as LocalizedString,
    mainImage: row.main_image,
    gallery: Array.isArray(row.gallery)
      ? (row.gallery as unknown as string[])
      : [],
    video: (row.video as unknown as Property["video"]) || undefined,
    location: row.location as unknown as Property["location"],
    contact: row.contact as unknown as Property["contact"],
    keyStats: row.key_stats as unknown as Property["keyStats"],
    specs: Array.isArray(row.specs)
      ? (row.specs as unknown as Property["specs"])
      : [],
    highlights: Array.isArray(row.highlights)
      ? (row.highlights as unknown as Property["highlights"])
      : [],
    amenities: Array.isArray(row.amenities)
      ? (row.amenities as unknown as Property["amenities"])
      : [],
    stores: stores.length > 0 ? stores : [],
  }
}

/**
 * Fetches all properties from Supabase, joining property stores, falling back to static content.
 */
export async function getProperties(): Promise<Property[]> {
  try {
    const supabase = await createClient()
    const { data: properties, error: propError } = await supabase
      .from("properties")
      .select("*")
      .order("sort_order", { ascending: true })

    if (propError || !properties || properties.length === 0) {
      return STATIC_PROPERTIES
    }

    const { data: stores } = await supabase
      .from("property_stores")
      .select("*")
      .order("sort_order", { ascending: true })

    const storesByPropId = new Map<string, StoreItem[]>()
    if (stores) {
      for (const s of stores) {
        const item: StoreItem = {
          id: s.id,
          name: s.name as unknown as LocalizedString,
          category: s.category as unknown as LocalizedString,
          floor: s.floor as unknown as LocalizedString,
          unitNumber: s.unit_number || undefined,
          status: s.status as StoreItem["status"],
          description: s.description
            ? (s.description as unknown as LocalizedString)
            : undefined,
          phone: s.phone || undefined,
        }
        const existing = storesByPropId.get(s.property_id) || []
        existing.push(item)
        storesByPropId.set(s.property_id, existing)
      }
    }

    return properties.map((p) =>
      mapPropertyRow(p, storesByPropId.get(p.id) || [])
    )
  } catch {
    return STATIC_PROPERTIES
  }
}

/**
 * Fetches a single property by slug.
 */
export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  try {
    const supabase = await createClient()
    const { data: property, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error || !property) {
      const staticProp = STATIC_PROPERTIES.find((p) => p.slug === slug)
      return staticProp || null
    }

    const { data: stores } = await supabase
      .from("property_stores")
      .select("*")
      .eq("property_id", property.id)
      .order("sort_order", { ascending: true })

    const storeItems: StoreItem[] = (stores || []).map((s) => ({
      id: s.id,
      name: s.name as unknown as LocalizedString,
      category: s.category as unknown as LocalizedString,
      floor: s.floor as unknown as LocalizedString,
      unitNumber: s.unit_number || undefined,
      status: s.status as StoreItem["status"],
      description: s.description
        ? (s.description as unknown as LocalizedString)
        : undefined,
      phone: s.phone || undefined,
    }))

    return mapPropertyRow(property, storeItems)
  } catch {
    const staticProp = STATIC_PROPERTIES.find((p) => p.slug === slug)
    return staticProp || null
  }
}

/**
 * Fetches commercial disciplines.
 */
export async function getCommercialDisciplines(): Promise<
  CommercialDiscipline[]
> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("commercial_disciplines")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error || !data || data.length === 0) return STATIC_DISCIPLINES

    return data.map((d) => ({
      id: d.id,
      title: d.title as unknown as LocalizedString,
      tagline: d.tagline as unknown as LocalizedString,
      description: d.description as unknown as LocalizedString,
      keyMetric: d.key_metric as unknown as CommercialDiscipline["keyMetric"],
      features: (d.features as unknown as LocalizedString[]) || [],
      iconName: d.icon_name as CommercialDiscipline["iconName"],
    }))
  } catch {
    return STATIC_DISCIPLINES
  }
}

/**
 * Fetches corporate hero metrics.
 */
export async function getCorporateMetrics(): Promise<CorporateMetric[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("corporate_metrics")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error || !data || data.length === 0) return STATIC_METRICS

    return data.map((m) => ({
      value: Number(m.value),
      suffix: m.suffix,
      label: m.label as unknown as LocalizedString,
      description: m.description as unknown as LocalizedString,
    }))
  } catch {
    return STATIC_METRICS
  }
}

/**
 * Fetches corporate heritage timeline.
 */
export async function getTimelineMilestones(): Promise<TimelineMilestone[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("timeline_milestones")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error || !data || data.length === 0) return STATIC_TIMELINE

    return data.map((t) => ({
      year: t.year,
      title: t.title as unknown as LocalizedString,
      badge: t.badge as unknown as LocalizedString,
      description: t.description as unknown as LocalizedString,
      highlights: (t.highlights as unknown as LocalizedString[]) || [],
      scopeCategory: t.scope_category as TimelineMilestone["scopeCategory"],
    }))
  } catch {
    return STATIC_TIMELINE
  }
}

/**
 * Fetches corporate values.
 */
export async function getCorporateValues(): Promise<CorporateValue[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("corporate_values")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error || !data || data.length === 0) return STATIC_VALUES

    return data.map((v) => ({
      id: v.id,
      number: v.number,
      title: v.title as unknown as LocalizedString,
      tagline: v.tagline as unknown as LocalizedString,
      description: v.description as unknown as LocalizedString,
      iconName: v.icon_name,
    }))
  } catch {
    return STATIC_VALUES
  }
}

/**
 * Fetches investment pillars.
 */
export async function getInvestmentPillars(): Promise<InvestmentPillar[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("investment_pillars")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error || !data || data.length === 0) return STATIC_PILLARS

    return data.map((p) => ({
      id: p.id,
      number: p.number,
      title: p.title as unknown as LocalizedString,
      tagline: p.tagline as unknown as LocalizedString,
      description: p.description as unknown as LocalizedString,
      metric: p.metric as unknown as InvestmentPillar["metric"],
    }))
  } catch {
    return STATIC_PILLARS
  }
}

/**
 * Fetches client partners.
 */
export async function getClientPartners(): Promise<ClientPartner[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("client_partners")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error || !data || data.length === 0) return STATIC_PARTNERS

    return data.map((cp) => ({
      name: cp.name,
      category: cp.category as ClientPartner["category"],
      country: cp.country,
    }))
  } catch {
    return STATIC_PARTNERS
  }
}

/**
 * Fetches singleton site settings (company_identity, ceo_profile, hse_charter).
 */
export async function getSiteSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("site_settings")
      .select("data")
      .eq("key", key)
      .single()

    if (error || !data) return fallback
    return data.data as unknown as T
  } catch {
    return fallback
  }
}

export async function getCompanyIdentity(): Promise<CompanyIdentity> {
  return await getSiteSetting<CompanyIdentity>(
    "company_identity",
    STATIC_IDENTITY
  )
}

export async function getCeoProfile(): Promise<CeoProfile> {
  return await getSiteSetting<CeoProfile>("ceo_profile", STATIC_CEO)
}

export async function getHseCharter(): Promise<HseCharter> {
  return await getSiteSetting<HseCharter>("hse_charter", STATIC_HSE)
}
