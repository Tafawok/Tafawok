import { NextRequest } from "next/server"
import { getAllActivitiesForAdmin } from "@/lib/content/cre-service"
import {
  saveActivityAction,
  deleteActivityAction,
  toggleActivityPublishedAction,
} from "@/lib/content/actions"
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
 * GET /api/nexus/activities/[id]
 * Retrieves an activity by ID.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const activities = await getAllActivitiesForAdmin()
    const activity = activities.find((a) => a.id === id)

    if (!activity) {
      return apiError(`Activity '${id}' not found.`, 404)
    }

    return apiSuccess({ activity })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve activity."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/activities/[id]
 * Updates an activity record.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ activity?: Partial<Activity> }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { activity } = body

    if (!activity) {
      return apiError("Missing 'activity' payload.", 400)
    }

    const activities = await getAllActivitiesForAdmin()
    const existing = activities.find((a) => a.id === id)

    if (!existing) {
      return apiError(`Activity '${id}' not found.`, 404)
    }

    if (activity.category && !VALID_CATEGORIES.has(activity.category)) {
      return apiError(
        `Invalid category '${activity.category}'. Allowed: ${Array.from(VALID_CATEGORIES).join(", ")}.`,
        400
      )
    }

    if (activity.status && !VALID_STATUSES.has(activity.status)) {
      return apiError(
        `Invalid status '${activity.status}'. Allowed: ${Array.from(VALID_STATUSES).join(", ")}.`,
        400
      )
    }

    const updated: Activity = {
      ...existing,
      ...activity,
      id,
    }

    const result = await saveActivityAction(updated)
    if (!result.success) {
      return apiError(result.error || "Failed to update activity.", 400)
    }

    return apiSuccess({ activity: updated }, 200, `Activity '${id}' updated successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update activity."
    return apiError(message, 500)
  }
}

/**
 * PATCH /api/nexus/activities/[id]
 * Toggles publication status of an activity.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ isPublished?: boolean }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    if (typeof body.isPublished !== "boolean") {
      return apiError("Missing boolean field 'isPublished'.", 400)
    }

    const result = await toggleActivityPublishedAction(id, body.isPublished)
    if (!result.success) {
      const statusCode = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to toggle activity publication.", statusCode)
    }

    return apiSuccess({ id, isPublished: body.isPublished }, 200, "Publication status updated.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update activity."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/activities/[id]
 * Deletes an activity record.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const result = await deleteActivityAction(id)
    if (!result.success) {
      const statusCode = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete activity.", statusCode)
    }

    return apiSuccess({ deletedId: id }, 200, `Activity '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete activity."
    return apiError(message, 500)
  }
}
