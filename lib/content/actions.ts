"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Json } from "@/types/database.types"

type DbJson = NonNullable<Json>

import type {
  Property,
  StoreItem,
  CommercialDiscipline,
  CorporateMetric,
  TimelineMilestone,
  CorporateValue,
  InvestmentPillar,
  ClientPartner,
  Activity,
  NotificationBanner,
  MaintenanceSettings,
} from "@/types/cre"

/**
 * Ensures the caller is authenticated and registered as a super_admin in `public.admin_users`.
 */
async function requireSuperAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error("Unauthorized: Please log in to the Nexus Portal.")
  }

  const { data: adminRecord, error: adminError } = await supabase
    .from("admin_users")
    .select("role")
    .eq("id", user.id)
    .single()

  if (adminError || !adminRecord || adminRecord.role !== "super_admin") {
    throw new Error("Forbidden: Super Admin access required.")
  }

  return { supabase, user }
}

/**
 * Revalidates public site paths after content mutation.
 */
function revalidatePublicContent() {
  revalidatePath("/", "layout")
  revalidatePath("/")
  revalidatePath("/properties")
  revalidatePath("/activities")
  revalidatePath("/about")
  revalidatePath("/ceo-message")
  revalidatePath("/contact")
}

// ------------------------------------------------------------------------------
// AUTH ACTIONS
// ------------------------------------------------------------------------------

export async function getCurrentAdmin() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null

    const { data: admin } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    return admin ? { id: admin.id, email: admin.email, role: admin.role } : null
  } catch {
    return null
  }
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/nexus-portal/login")
}

// ------------------------------------------------------------------------------
// PROPERTY & STORES CRUD
// ------------------------------------------------------------------------------

export async function savePropertyAction(
  property: Property,
  sortOrder: number = 0
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!property || typeof property !== "object") {
      return { success: false, error: "Property payload is required." }
    }

    const id = property.id?.trim().toLowerCase()
    const slug = property.slug?.trim().toLowerCase()

    if (!id || !slug) {
      return { success: false, error: "Property 'id' and 'slug' are mandatory." }
    }

    const validTypes = ["office", "retail", "commercial", "mixed-use", "logistics"] as const
    const type = property.type && validTypes.includes(property.type as (typeof validTypes)[number])
      ? property.type
      : "commercial"

    const validStatuses = ["active", "operational", "completed", "under-development", "pipeline"] as const
    const status = property.status && validStatuses.includes(property.status as (typeof validStatuses)[number])
      ? property.status
      : "operational"

    const { error } = await supabase.from("properties").upsert({
      id,
      slug,
      name: (property.name || { en: "", ar: "" }) as unknown as DbJson,
      tagline: (property.tagline || { en: "", ar: "" }) as unknown as DbJson,
      type,
      status,
      category: (property.category || { en: "", ar: "" }) as unknown as DbJson,
      description: (property.description || { en: "", ar: "" }) as unknown as DbJson,
      full_overview: (property.fullOverview || { en: "", ar: "" }) as unknown as DbJson,
      main_image: property.mainImage || "/placeholder.webp",
      gallery: (property.gallery || []) as unknown as DbJson,
      video: (property.video || null) as unknown as Json,
      location: (property.location || {
        address: { en: "", ar: "" },
        city: { en: "", ar: "" },
        country: { en: "Egypt", ar: "مصر" },
        coordinates: { lat: 30.0, lng: 31.0 },
        googleMapsEmbedUrl: "",
        googleMapsDirectUrl: "",
      }) as unknown as DbJson,
      contact: (property.contact || {
        phone: "",
        email: "",
        leasingOffice: { en: "", ar: "" },
      }) as unknown as DbJson,
      key_stats: (property.keyStats || {
        gla: "",
        builtUpArea: "",
        floors: { en: "", ar: "" },
        parkingCapacity: { en: "", ar: "" },
        zoning: { en: "", ar: "" },
      }) as unknown as DbJson,
      specs: (property.specs || []) as unknown as DbJson,
      highlights: (property.highlights || []) as unknown as DbJson,
      amenities: (property.amenities || []) as unknown as DbJson,
      sort_order: typeof sortOrder === "number" ? sortOrder : 0,
      is_published: true,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[savePropertyAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to save property."
    console.error("[savePropertyAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deletePropertyAction(
  propertyId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!propertyId || typeof propertyId !== "string" || !propertyId.trim()) {
      return { success: false, error: "Valid property ID is required." }
    }

    const cleanId = propertyId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("properties")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deletePropertyAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Property '${propertyId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete property."
    console.error("[deletePropertyAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function saveStoreAction(
  propertyId: string,
  store: StoreItem,
  sortOrder: number = 0
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!propertyId || typeof propertyId !== "string" || !propertyId.trim()) {
      return { success: false, error: "Valid propertyId is required." }
    }
    if (!store || typeof store !== "object" || !store.id?.trim()) {
      return { success: false, error: "Valid store item with id is required." }
    }

    const cleanPropId = propertyId.trim().toLowerCase()
    const cleanStoreId = store.id.trim().toLowerCase()

    const validStatuses = ["open", "coming_soon", "leased"] as const
    const status = validStatuses.includes(store.status as (typeof validStatuses)[number])
      ? store.status
      : "open"

    const { error } = await supabase.from("property_stores").upsert({
      id: cleanStoreId,
      property_id: cleanPropId,
      name: (store.name || { en: "", ar: "" }) as unknown as DbJson,
      category: (store.category || { en: "", ar: "" }) as unknown as DbJson,
      floor: (store.floor || { en: "", ar: "" }) as unknown as DbJson,
      unit_number: store.unitNumber?.trim() || null,
      status,
      description: (store.description || null) as unknown as Json,
      phone: store.phone?.trim() || null,
      sort_order: typeof sortOrder === "number" ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[saveStoreAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save store."
    console.error("[saveStoreAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deleteStoreAction(
  storeId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!storeId || typeof storeId !== "string" || !storeId.trim()) {
      return { success: false, error: "Valid store ID is required." }
    }

    const cleanId = storeId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("property_stores")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deleteStoreAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Store '${storeId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete store."
    console.error("[deleteStoreAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// COMMERCIAL DISCIPLINES CRUD
// ------------------------------------------------------------------------------

export async function saveDisciplineAction(
  discipline: CommercialDiscipline,
  sortOrder: number = 0
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!discipline || typeof discipline !== "object" || !discipline.id?.trim()) {
      return { success: false, error: "Valid discipline item with id is required." }
    }

    const cleanId = discipline.id.trim().toLowerCase()
    const validIcons = ["building-2", "shopping-bag", "warehouse", "hard-hat"] as const
    const iconName = validIcons.includes(discipline.iconName as (typeof validIcons)[number])
      ? discipline.iconName
      : "building-2"

    const { error } = await supabase.from("commercial_disciplines").upsert({
      id: cleanId,
      title: (discipline.title || { en: "", ar: "" }) as unknown as DbJson,
      tagline: (discipline.tagline || { en: "", ar: "" }) as unknown as DbJson,
      description: (discipline.description || { en: "", ar: "" }) as unknown as DbJson,
      key_metric: (discipline.keyMetric || { value: "", label: { en: "", ar: "" } }) as unknown as DbJson,
      features: (discipline.features || []) as unknown as DbJson,
      icon_name: iconName,
      sort_order: typeof sortOrder === "number" ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[saveDisciplineAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save discipline."
    console.error("[saveDisciplineAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deleteDisciplineAction(
  disciplineId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!disciplineId || typeof disciplineId !== "string" || !disciplineId.trim()) {
      return { success: false, error: "Valid discipline ID is required." }
    }

    const cleanId = disciplineId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("commercial_disciplines")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deleteDisciplineAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Discipline '${disciplineId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete discipline."
    console.error("[deleteDisciplineAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// CORPORATE METRICS CRUD
// ------------------------------------------------------------------------------

export async function saveMetricAction(
  metricId: string,
  metric: CorporateMetric,
  sortOrder: number = 0
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!metricId || typeof metricId !== "string" || !metricId.trim()) {
      return { success: false, error: "Valid metric ID is required." }
    }
    if (!metric || typeof metric !== "object") {
      return { success: false, error: "Valid metric data is required." }
    }

    const cleanId = metricId.trim().toLowerCase()
    const { error } = await supabase.from("corporate_metrics").upsert({
      id: cleanId,
      value: Number(metric.value) || 0,
      suffix: metric.suffix || "",
      label: (metric.label || { en: "", ar: "" }) as unknown as DbJson,
      description: (metric.description || { en: "", ar: "" }) as unknown as DbJson,
      sort_order: typeof sortOrder === "number" ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[saveMetricAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save metric."
    console.error("[saveMetricAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deleteMetricAction(
  metricId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!metricId || typeof metricId !== "string" || !metricId.trim()) {
      return { success: false, error: "Valid metric ID is required." }
    }

    const cleanId = metricId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("corporate_metrics")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deleteMetricAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Metric '${metricId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete metric."
    console.error("[deleteMetricAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// TIMELINE MILESTONES CRUD
// ------------------------------------------------------------------------------

export async function saveMilestoneAction(
  milestoneId: string,
  milestone: TimelineMilestone,
  sortOrder: number = 0
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!milestoneId || typeof milestoneId !== "string" || !milestoneId.trim()) {
      return { success: false, error: "Valid milestone ID is required." }
    }
    if (!milestone || typeof milestone !== "object") {
      return { success: false, error: "Valid milestone data is required." }
    }

    const cleanId = milestoneId.trim().toLowerCase()
    const validScopes = ["heritage", "infrastructure", "commercial", "expansion"] as const
    const scopeCategory = validScopes.includes(milestone.scopeCategory as (typeof validScopes)[number])
      ? milestone.scopeCategory
      : "commercial"

    const { error } = await supabase.from("timeline_milestones").upsert({
      id: cleanId,
      year: milestone.year ? milestone.year.trim() : "2026",
      title: (milestone.title || { en: "", ar: "" }) as unknown as DbJson,
      badge: (milestone.badge || { en: "", ar: "" }) as unknown as DbJson,
      description: (milestone.description || { en: "", ar: "" }) as unknown as DbJson,
      highlights: (milestone.highlights || []) as unknown as DbJson,
      scope_category: scopeCategory,
      sort_order: typeof sortOrder === "number" ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[saveMilestoneAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save milestone."
    console.error("[saveMilestoneAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deleteMilestoneAction(
  milestoneId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!milestoneId || typeof milestoneId !== "string" || !milestoneId.trim()) {
      return { success: false, error: "Valid milestone ID is required." }
    }

    const cleanId = milestoneId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("timeline_milestones")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deleteMilestoneAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Milestone '${milestoneId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete milestone."
    console.error("[deleteMilestoneAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// CORPORATE VALUES CRUD
// ------------------------------------------------------------------------------

export async function saveValueAction(
  value: CorporateValue,
  sortOrder: number = 0
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!value || typeof value !== "object" || !value.id?.trim()) {
      return { success: false, error: "Valid corporate value with id is required." }
    }

    const cleanId = value.id.trim().toLowerCase()
    const { error } = await supabase.from("corporate_values").upsert({
      id: cleanId,
      number: value.number || "01",
      title: (value.title || { en: "", ar: "" }) as unknown as DbJson,
      tagline: (value.tagline || { en: "", ar: "" }) as unknown as DbJson,
      description: (value.description || { en: "", ar: "" }) as unknown as DbJson,
      icon_name: value.iconName || "award",
      sort_order: typeof sortOrder === "number" ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[saveValueAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save corporate value."
    console.error("[saveValueAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deleteValueAction(
  valueId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!valueId || typeof valueId !== "string" || !valueId.trim()) {
      return { success: false, error: "Valid value ID is required." }
    }

    const cleanId = valueId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("corporate_values")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deleteValueAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Corporate value '${valueId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete corporate value."
    console.error("[deleteValueAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// INVESTMENT PILLARS CRUD
// ------------------------------------------------------------------------------

export async function savePillarAction(
  pillar: InvestmentPillar,
  sortOrder: number = 0
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!pillar || typeof pillar !== "object" || !pillar.id?.trim()) {
      return { success: false, error: "Valid investment pillar with id is required." }
    }

    const cleanId = pillar.id.trim().toLowerCase()
    const { error } = await supabase.from("investment_pillars").upsert({
      id: cleanId,
      number: pillar.number || "01",
      title: (pillar.title || { en: "", ar: "" }) as unknown as DbJson,
      tagline: (pillar.tagline || { en: "", ar: "" }) as unknown as DbJson,
      description: (pillar.description || { en: "", ar: "" }) as unknown as DbJson,
      metric: (pillar.metric || { value: "", label: { en: "", ar: "" } }) as unknown as DbJson,
      sort_order: typeof sortOrder === "number" ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[savePillarAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save investment pillar."
    console.error("[savePillarAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deletePillarAction(
  pillarId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!pillarId || typeof pillarId !== "string" || !pillarId.trim()) {
      return { success: false, error: "Valid pillar ID is required." }
    }

    const cleanId = pillarId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("investment_pillars")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deletePillarAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Investment pillar '${pillarId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete investment pillar."
    console.error("[deletePillarAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// CLIENT PARTNERS CRUD
// ------------------------------------------------------------------------------

export async function savePartnerAction(
  partnerId: string,
  partner: ClientPartner,
  sortOrder: number = 0
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!partnerId || typeof partnerId !== "string" || !partnerId.trim()) {
      return { success: false, error: "Valid partner ID is required." }
    }
    if (!partner || typeof partner !== "object") {
      return { success: false, error: "Valid partner data is required." }
    }

    const cleanId = partnerId.trim().toLowerCase()
    const validCategories = ["energy", "epc", "commercial", "manufacturer"] as const
    const category = validCategories.includes(partner.category as (typeof validCategories)[number])
      ? partner.category
      : "commercial"

    const { error } = await supabase.from("client_partners").upsert({
      id: cleanId,
      name: partner.name ? partner.name.trim() : "",
      category,
      country: partner.country ? partner.country.trim() : "",
      sort_order: typeof sortOrder === "number" ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[savePartnerAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save partner."
    console.error("[savePartnerAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deletePartnerAction(
  partnerId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!partnerId || typeof partnerId !== "string" || !partnerId.trim()) {
      return { success: false, error: "Valid partner ID is required." }
    }

    const cleanId = partnerId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("client_partners")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deletePartnerAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Partner '${partnerId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete partner."
    console.error("[deletePartnerAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// SITE SETTINGS (Company Identity, CEO Profile, HSE Charter, Homepage, Maintenance)
// ------------------------------------------------------------------------------

export async function saveSiteSettingAction(
  key: string,
  data: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!key || typeof key !== "string" || !key.trim()) {
      return { success: false, error: "Setting key is required." }
    }

    const cleanKey = key.trim().toLowerCase()
    const validKeys = [
      "ceo_profile",
      "company_identity",
      "hse_charter",
      "homepage_settings",
      "maintenance_mode",
    ]
    if (!validKeys.includes(cleanKey)) {
      return {
        success: false,
        error: `Invalid site setting key '${key}'. Supported: ${validKeys.join(", ")}.`,
      }
    }

    if (data === undefined || data === null) {
      return { success: false, error: "Setting data payload is required." }
    }

    const { error } = await supabase.from("site_settings").upsert({
      key: cleanKey,
      data: data as unknown as DbJson,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error(`[saveSiteSettingAction] Database error for ${key}:`, error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : `Failed to save setting ${key}.`
    console.error(`[saveSiteSettingAction] Error for ${key}:`, message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// INQUIRIES & RFQS
// ------------------------------------------------------------------------------

export async function getInquiriesAction() {
  const { supabase } = await requireSuperAdmin()

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(`Failed to fetch inquiries: ${error.message}`)
  return data || []
}

export async function getInquiryByIdAction(id: string) {
  const { supabase } = await requireSuperAdmin()
  if (!id || typeof id !== "string" || !id.trim()) return null

  const cleanId = id.trim().toLowerCase()
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(cleanId)) return null

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", cleanId)
    .single()

  if (error || !data) return null
  return data
}

export async function updateInquiryStatusAction(
  id: string,
  status: "new" | "contacted" | "archived"
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!id || typeof id !== "string" || !id.trim()) {
      return { success: false, error: "Valid inquiry ID is required." }
    }

    const cleanId = id.trim().toLowerCase()
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(cleanId)) {
      return { success: false, error: "Invalid inquiry ID: must be a valid UUID." }
    }

    const validStatuses = ["new", "contacted", "archived"]
    if (!validStatuses.includes(status)) {
      return { success: false, error: `Invalid inquiry status '${status}'.` }
    }

    const { data, error } = await supabase
      .from("inquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[updateInquiryStatusAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Inquiry '${id}' not found.` }
    }

    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update inquiry status."
    console.error("[updateInquiryStatusAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deleteInquiryAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!id || typeof id !== "string" || !id.trim()) {
      return { success: false, error: "Valid inquiry ID is required." }
    }

    const cleanId = id.trim().toLowerCase()
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(cleanId)) {
      return { success: false, error: "Invalid inquiry ID: must be a valid UUID." }
    }

    const { data, error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deleteInquiryAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Inquiry '${id}' not found.` }
    }

    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete inquiry."
    console.error("[deleteInquiryAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// ACTIVITIES CRUD
// ------------------------------------------------------------------------------

export async function saveActivityAction(
  activity: Activity
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!activity || typeof activity !== "object" || !activity.id?.trim() || !activity.slug?.trim()) {
      return { success: false, error: "Valid activity payload with id and slug is required." }
    }

    const cleanId = activity.id.trim().toLowerCase()
    const cleanSlug = activity.slug.trim().toLowerCase()

    const validCategories = [
      "launch",
      "bazaar",
      "exhibition",
      "corporate",
      "community",
    ] as const
    const category = validCategories.includes(
      activity.category as (typeof validCategories)[number]
    )
      ? activity.category
      : "launch"

    const validStatuses = ["upcoming", "ongoing", "past"] as const
    const status = validStatuses.includes(
      activity.status as (typeof validStatuses)[number]
    )
      ? activity.status
      : "upcoming"

    const { error } = await supabase.from("activities").upsert({
      id: cleanId,
      slug: cleanSlug,
      title: (activity.title || { en: "", ar: "" }) as unknown as DbJson,
      summary: (activity.summary || { en: "", ar: "" }) as unknown as DbJson,
      content: (activity.content || { en: "", ar: "" }) as unknown as DbJson,
      category,
      status,
      start_date: activity.startDate || new Date().toISOString(),
      end_date: activity.endDate || null,
      location_name: (activity.locationName || { en: "", ar: "" }) as unknown as DbJson,
      location_url: activity.locationUrl?.trim() || null,
      main_image: activity.mainImage || "/placeholder.webp",
      gallery: (activity.gallery || []) as unknown as DbJson,
      featured: activity.featured ?? false,
      is_published: activity.isPublished ?? true,
      action_url: activity.actionUrl?.trim() || null,
      action_label: activity.actionLabel
        ? (activity.actionLabel as unknown as DbJson)
        : null,
      sort_order: typeof activity.sortOrder === "number" ? activity.sortOrder : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[saveActivityAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    revalidatePath(`/activities/${cleanSlug}`)
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to save activity."
    console.error("[saveActivityAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deleteActivityAction(
  activityId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!activityId || typeof activityId !== "string" || !activityId.trim()) {
      return { success: false, error: "Valid activity ID is required." }
    }

    const cleanId = activityId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("activities")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deleteActivityAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Activity '${activityId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete activity."
    console.error("[deleteActivityAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function toggleActivityPublishedAction(
  activityId: string,
  isPublished: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!activityId || typeof activityId !== "string" || !activityId.trim()) {
      return { success: false, error: "Valid activity ID is required." }
    }

    const cleanId = activityId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("activities")
      .update({
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[toggleActivityPublishedAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Activity '${activityId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to update publication status."
    console.error("[toggleActivityPublishedAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// NOTIFICATION BANNERS CRUD
// ------------------------------------------------------------------------------

export async function saveNotificationBannerAction(
  banner: NotificationBanner
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!banner || typeof banner !== "object" || !banner.id?.trim()) {
      return { success: false, error: "Valid banner item with id is required." }
    }

    const cleanId = banner.id.trim().toLowerCase()
    const validTypes = ["launch", "bazaar", "announcement", "urgent"] as const
    const type = validTypes.includes(
      banner.type as (typeof validTypes)[number]
    )
      ? banner.type
      : "announcement"

    const now = new Date()
    const defaultStart = now.toISOString()
    const defaultEnd = new Date(now.getTime() + 30 * 86400000).toISOString()

    const { error } = await supabase.from("notification_banners").upsert({
      id: cleanId,
      title: (banner.title || { en: "", ar: "" }) as unknown as DbJson,
      message: (banner.message || { en: "", ar: "" }) as unknown as DbJson,
      badge: banner.badge ? (banner.badge as unknown as DbJson) : null,
      location: banner.location
        ? (banner.location as unknown as DbJson)
        : null,
      start_date: banner.startDate || defaultStart,
      end_date: banner.endDate || defaultEnd,
      is_active: banner.isActive ?? true,
      type,
      link_url: banner.linkUrl?.trim() || null,
      link_label: banner.linkLabel
        ? (banner.linkLabel as unknown as DbJson)
        : null,
      dismissible: banner.dismissible ?? true,
      priority: typeof banner.priority === "number" ? banner.priority : 0,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[saveNotificationBannerAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to save notification banner."
    console.error("[saveNotificationBannerAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function deleteNotificationBannerAction(
  bannerId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!bannerId || typeof bannerId !== "string" || !bannerId.trim()) {
      return { success: false, error: "Valid banner ID is required." }
    }

    const cleanId = bannerId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("notification_banners")
      .delete()
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[deleteNotificationBannerAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Notification banner '${bannerId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to delete notification banner."
    console.error("[deleteNotificationBannerAction] Error:", message)
    return { success: false, error: message }
  }
}

export async function toggleBannerActiveAction(
  bannerId: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!bannerId || typeof bannerId !== "string" || !bannerId.trim()) {
      return { success: false, error: "Valid banner ID is required." }
    }

    const cleanId = bannerId.trim().toLowerCase()
    const { data, error } = await supabase
      .from("notification_banners")
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cleanId)
      .select("id")

    if (error) {
      console.error("[toggleBannerActiveAction] Database error:", error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: `Notification banner '${bannerId}' not found.` }
    }

    revalidatePublicContent()
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to toggle banner status."
    console.error("[toggleBannerActiveAction] Error:", message)
    return { success: false, error: message }
  }
}

// ------------------------------------------------------------------------------
// MAINTENANCE SETTINGS CRUD
// ------------------------------------------------------------------------------

export async function saveMaintenanceSettingsAction(
  settings: MaintenanceSettings
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase } = await requireSuperAdmin()

    if (!settings || typeof settings !== "object") {
      return { success: false, error: "Maintenance settings payload is required." }
    }

    const cleanSettings: MaintenanceSettings = {
      enabled: Boolean(settings.enabled),
      title: settings.title || { en: "", ar: "" },
      headline: settings.headline || { en: "", ar: "" },
      message: settings.message || { en: "", ar: "" },
      expectedBack: settings.expectedBack || null,
      bypassSecret: settings.bypassSecret || "",
      allowAdminBypass: settings.allowAdminBypass ?? true,
      emergencyPhone: settings.emergencyPhone || "",
      emergencyEmail: settings.emergencyEmail || "",
    }

    const { error } = await supabase.from("site_settings").upsert({
      key: "maintenance_mode",
      data: cleanSettings as unknown as DbJson,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[saveMaintenanceSettingsAction] Database error:", error)
      return { success: false, error: error.message }
    }

    revalidatePublicContent()
    revalidatePath("/maintenance")
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to save maintenance settings."
    console.error("[saveMaintenanceSettingsAction] Error:", message)
    return { success: false, error: message }
  }
}


