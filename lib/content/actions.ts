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
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("properties").upsert({
    id: property.id,
    slug: property.slug,
    name: property.name as unknown as DbJson,
    tagline: property.tagline as unknown as DbJson,
    type: property.type || "retail",
    status: property.status || "active",
    category: property.category as unknown as DbJson,
    description: property.description as unknown as DbJson,
    full_overview: property.fullOverview as unknown as DbJson,
    main_image: property.mainImage,
    gallery: (property.gallery || []) as unknown as DbJson,
    video: (property.video || null) as unknown as Json,
    location: property.location as unknown as DbJson,
    contact: property.contact as unknown as DbJson,
    key_stats: property.keyStats as unknown as DbJson,
    specs: (property.specs || []) as unknown as DbJson,
    highlights: (property.highlights || []) as unknown as DbJson,
    amenities: (property.amenities || []) as unknown as DbJson,
    sort_order: sortOrder,
    is_published: true,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save property: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deletePropertyAction(propertyId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", propertyId)
  if (error) throw new Error(`Failed to delete property: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function saveStoreAction(
  propertyId: string,
  store: StoreItem,
  sortOrder: number = 0
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("property_stores").upsert({
    id: store.id,
    property_id: propertyId,
    name: store.name as unknown as DbJson,
    category: store.category as unknown as DbJson,
    floor: store.floor as unknown as DbJson,
    unit_number: store.unitNumber || null,
    status: store.status,
    description: (store.description || null) as unknown as Json,
    phone: store.phone || null,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save store: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deleteStoreAction(storeId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("property_stores")
    .delete()
    .eq("id", storeId)
  if (error) throw new Error(`Failed to delete store: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// COMMERCIAL DISCIPLINES CRUD
// ------------------------------------------------------------------------------

export async function saveDisciplineAction(
  discipline: CommercialDiscipline,
  sortOrder: number = 0
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("commercial_disciplines").upsert({
    id: discipline.id,
    title: discipline.title as unknown as DbJson,
    tagline: discipline.tagline as unknown as DbJson,
    description: discipline.description as unknown as DbJson,
    key_metric: discipline.keyMetric as unknown as DbJson,
    features: (discipline.features || []) as unknown as DbJson,
    icon_name: discipline.iconName,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save discipline: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deleteDisciplineAction(disciplineId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("commercial_disciplines")
    .delete()
    .eq("id", disciplineId)

  if (error) throw new Error(`Failed to delete discipline: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// CORPORATE METRICS CRUD
// ------------------------------------------------------------------------------

export async function saveMetricAction(
  metricId: string,
  metric: CorporateMetric,
  sortOrder: number = 0
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("corporate_metrics").upsert({
    id: metricId,
    value: metric.value,
    suffix: metric.suffix,
    label: metric.label as unknown as DbJson,
    description: metric.description as unknown as DbJson,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save metric: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deleteMetricAction(metricId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("corporate_metrics")
    .delete()
    .eq("id", metricId)
  if (error) throw new Error(`Failed to delete metric: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// TIMELINE MILESTONES CRUD
// ------------------------------------------------------------------------------

export async function saveMilestoneAction(
  milestoneId: string,
  milestone: TimelineMilestone,
  sortOrder: number = 0
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("timeline_milestones").upsert({
    id: milestoneId,
    year: milestone.year,
    title: milestone.title as unknown as DbJson,
    badge: milestone.badge as unknown as DbJson,
    description: milestone.description as unknown as DbJson,
    highlights: (milestone.highlights || []) as unknown as DbJson,
    scope_category: milestone.scopeCategory,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save milestone: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deleteMilestoneAction(milestoneId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("timeline_milestones")
    .delete()
    .eq("id", milestoneId)

  if (error) throw new Error(`Failed to delete milestone: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// CORPORATE VALUES CRUD
// ------------------------------------------------------------------------------

export async function saveValueAction(
  value: CorporateValue,
  sortOrder: number = 0
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("corporate_values").upsert({
    id: value.id,
    number: value.number,
    title: value.title as unknown as DbJson,
    tagline: value.tagline as unknown as DbJson,
    description: value.description as unknown as DbJson,
    icon_name: value.iconName,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save corporate value: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deleteValueAction(valueId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("corporate_values")
    .delete()
    .eq("id", valueId)
  if (error)
    throw new Error(`Failed to delete corporate value: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// INVESTMENT PILLARS CRUD
// ------------------------------------------------------------------------------

export async function savePillarAction(
  pillar: InvestmentPillar,
  sortOrder: number = 0
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("investment_pillars").upsert({
    id: pillar.id,
    number: pillar.number,
    title: pillar.title as unknown as DbJson,
    tagline: pillar.tagline as unknown as DbJson,
    description: pillar.description as unknown as DbJson,
    metric: pillar.metric as unknown as DbJson,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  })

  if (error)
    throw new Error(`Failed to save investment pillar: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deletePillarAction(pillarId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("investment_pillars")
    .delete()
    .eq("id", pillarId)

  if (error)
    throw new Error(`Failed to delete investment pillar: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// CLIENT PARTNERS CRUD
// ------------------------------------------------------------------------------

export async function savePartnerAction(
  partnerId: string,
  partner: ClientPartner,
  sortOrder: number = 0
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("client_partners").upsert({
    id: partnerId,
    name: partner.name,
    category: partner.category,
    country: partner.country,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save partner: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deletePartnerAction(partnerId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("client_partners")
    .delete()
    .eq("id", partnerId)
  if (error) throw new Error(`Failed to delete partner: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// SITE SETTINGS (Company Identity, CEO Profile, HSE Charter)
// ------------------------------------------------------------------------------

export async function saveSiteSettingAction(key: string, data: unknown) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("site_settings").upsert({
    key,
    data: data as unknown as DbJson,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save setting ${key}: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
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
  return data
}

export async function updateInquiryStatusAction(
  id: string,
  status: "new" | "contacted" | "archived"
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("inquiries")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error)
    throw new Error(`Failed to update inquiry status: ${error.message}`)
  return { success: true }
}

export async function deleteInquiryAction(id: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("inquiries").delete().eq("id", id)
  if (error) throw new Error(`Failed to delete inquiry: ${error.message}`)
  return { success: true }
}

// ------------------------------------------------------------------------------
// ACTIVITIES CRUD
// ------------------------------------------------------------------------------

export async function saveActivityAction(activity: Activity) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("activities").upsert({
    id: activity.id,
    slug: activity.slug,
    title: activity.title as unknown as DbJson,
    summary: activity.summary as unknown as DbJson,
    content: activity.content as unknown as DbJson,
    category: activity.category,
    status: activity.status,
    start_date: activity.startDate,
    end_date: activity.endDate || null,
    location_name: activity.locationName as unknown as DbJson,
    location_url: activity.locationUrl || null,
    main_image: activity.mainImage,
    gallery: activity.gallery as unknown as DbJson,
    featured: activity.featured,
    is_published: activity.isPublished,
    action_url: activity.actionUrl || null,
    action_label: activity.actionLabel
      ? (activity.actionLabel as unknown as DbJson)
      : null,
    sort_order: activity.sortOrder,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Failed to save activity: ${error.message}`)

  revalidatePublicContent()
  revalidatePath(`/activities/${activity.slug}`)
  return { success: true }
}

export async function deleteActivityAction(activityId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", activityId)

  if (error) throw new Error(`Failed to delete activity: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function toggleActivityPublishedAction(
  activityId: string,
  isPublished: boolean
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("activities")
    .update({
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", activityId)

  if (error)
    throw new Error(`Failed to update publication status: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// NOTIFICATION BANNERS CRUD
// ------------------------------------------------------------------------------

export async function saveNotificationBannerAction(banner: NotificationBanner) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("notification_banners").upsert({
    id: banner.id,
    title: banner.title as unknown as DbJson,
    message: banner.message as unknown as DbJson,
    badge: banner.badge ? (banner.badge as unknown as DbJson) : null,
    location: banner.location
      ? (banner.location as unknown as DbJson)
      : null,
    start_date: banner.startDate,
    end_date: banner.endDate,
    is_active: banner.isActive,
    type: banner.type,
    link_url: banner.linkUrl || null,
    link_label: banner.linkLabel
      ? (banner.linkLabel as unknown as DbJson)
      : null,
    dismissible: banner.dismissible,
    priority: banner.priority,
    updated_at: new Date().toISOString(),
  })

  if (error)
    throw new Error(`Failed to save notification banner: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function deleteNotificationBannerAction(bannerId: string) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("notification_banners")
    .delete()
    .eq("id", bannerId)

  if (error)
    throw new Error(`Failed to delete notification banner: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

export async function toggleBannerActiveAction(
  bannerId: string,
  isActive: boolean
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase
    .from("notification_banners")
    .update({
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", bannerId)

  if (error)
    throw new Error(`Failed to toggle banner status: ${error.message}`)

  revalidatePublicContent()
  return { success: true }
}

// ------------------------------------------------------------------------------
// MAINTENANCE SETTINGS CRUD
// ------------------------------------------------------------------------------

export async function saveMaintenanceSettingsAction(
  settings: MaintenanceSettings
) {
  const { supabase } = await requireSuperAdmin()

  const { error } = await supabase.from("site_settings").upsert({
    key: "maintenance_mode",
    data: settings as unknown as DbJson,
    updated_at: new Date().toISOString(),
  })

  if (error)
    throw new Error(`Failed to save maintenance settings: ${error.message}`)

  revalidatePublicContent()
  revalidatePath("/maintenance")
  return { success: true }
}

