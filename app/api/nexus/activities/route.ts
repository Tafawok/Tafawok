import { NextRequest } from "next/server"
import { getAllActivitiesForAdmin } from "@/lib/content/cre-service"
import { saveActivityAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { Activity, ActivityCategory, ActivityStatus } from "@/types/cre"

export const dynamic = "force-dynamic"

const VALID_CATEGORIES: Set<ActivityCategory> = new Set([
  "launch",
  "bazaar",
  "exhibition",
  "corporate",
  "community",
])

const VALID_STATUSES: Set<ActivityStatus> = new Set([
  "upcoming",
  "ongoing",
  "past",
])

/**
 * GET /api/nexus/activities
 * Lists all activities (including drafts) with optional category/status filters.
 */
export async function GET(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")

    let activities = await getAllActivitiesForAdmin()

    if (category) {
      activities = activities.filter((a) => a.category === category)
    }
    if (status) {
      activities = activities.filter((a) => a.status === status)
    }

    return apiSuccess({ activities, count: activities.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch activities."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/activities
 * Creates a new corporate / commercial activity.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<{ activity: Activity }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { activity } = body

    if (!activity) {
      return apiError("Missing 'activity' payload.", 400)
    }

    if (!activity.title?.en || !activity.title?.ar) {
      return apiError("Bilingual title (English and Arabic) is required.", 400)
    }

    if (!activity.slug || typeof activity.slug !== "string") {
      return apiError("Valid URL slug is required.", 400)
    }

    if (!VALID_CATEGORIES.has(activity.category)) {
      return apiError(
        `Invalid category '${activity.category}'. Allowed: ${Array.from(VALID_CATEGORIES).join(", ")}.`,
        400
      )
    }

    if (!VALID_STATUSES.has(activity.status)) {
      return apiError(
        `Invalid status '${activity.status}'. Allowed: ${Array.from(VALID_STATUSES).join(", ")}.`,
        400
      )
    }

    const cleanId = (activity.id || `act-${Date.now()}`).trim().toLowerCase()
    const cleanSlug = activity.slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")

    const cleanActivity: Activity = {
      ...activity,
      id: cleanId,
      slug: cleanSlug,
      summary: activity.summary || { en: "", ar: "" },
      content: activity.content || { en: "", ar: "" },
      locationName: activity.locationName || { en: "", ar: "" },
      gallery: Array.isArray(activity.gallery) ? activity.gallery : [],
      featured: Boolean(activity.featured),
      isPublished: Boolean(activity.isPublished),
      sortOrder: typeof activity.sortOrder === "number" ? activity.sortOrder : 0,
      mainImage: activity.mainImage || "",
      startDate: activity.startDate || new Date().toISOString().split("T")[0],
    }

    const result = await saveActivityAction(cleanActivity)
    if (!result.success) {
      return apiError(result.error || "Failed to create activity.", 400)
    }

    return apiSuccess({ activity: cleanActivity }, 201, "Activity created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create activity."
    return apiError(message, 500)
  }
}
