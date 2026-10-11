import { NextRequest } from "next/server"
import { getNotificationBanners } from "@/lib/content/cre-service"
import {
  saveNotificationBannerAction,
  deleteNotificationBannerAction,
  toggleBannerActiveAction,
} from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { NotificationBanner, NotificationBannerType } from "@/types/cre"

export const dynamic = "force-dynamic"

const VALID_TYPES: Set<NotificationBannerType> = new Set([
  "launch",
  "bazaar",
  "announcement",
  "urgent",
])

/**
 * GET /api/nexus/banners/[id]
 * Retrieves a notification banner by ID.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const banners = await getNotificationBanners()
    const banner = banners.find((b) => b.id === id)

    if (!banner) {
      return apiError(`Notification banner '${id}' not found.`, 404)
    }

    return apiSuccess({ banner })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve banner."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/banners/[id]
 * Updates a notification banner.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ banner?: Partial<NotificationBanner> }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { banner } = body

    if (!banner) {
      return apiError("Missing 'banner' payload.", 400)
    }

    const banners = await getNotificationBanners()
    const existing = banners.find((b) => b.id === id)

    if (!existing) {
      return apiError(`Notification banner '${id}' not found.`, 404)
    }

    if (banner.type && !VALID_TYPES.has(banner.type)) {
      return apiError(
        `Invalid banner type '${banner.type}'. Allowed: ${Array.from(VALID_TYPES).join(", ")}.`,
        400
      )
    }

    const updated: NotificationBanner = {
      ...existing,
      ...banner,
      id,
    }

    const result = await saveNotificationBannerAction(updated)
    if (!result.success) {
      return apiError(result.error || "Failed to update notification banner.", 400)
    }

    return apiSuccess({ banner: updated }, 200, `Notification banner '${id}' updated successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update banner."
    return apiError(message, 500)
  }
}

/**
 * PATCH /api/nexus/banners/[id]
 * Toggles active status of a banner.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ isActive?: boolean }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    if (typeof body.isActive !== "boolean") {
      return apiError("Missing boolean field 'isActive'.", 400)
    }

    const result = await toggleBannerActiveAction(id, body.isActive)
    if (!result.success) {
      const statusCode = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to toggle banner status.", statusCode)
    }

    return apiSuccess({ id, isActive: body.isActive }, 200, "Banner status updated.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update banner."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/banners/[id]
 * Deletes a notification banner.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const result = await deleteNotificationBannerAction(id)
    if (!result.success) {
      const statusCode = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete notification banner.", statusCode)
    }

    return apiSuccess({ deletedId: id }, 200, `Notification banner '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete banner."
    return apiError(message, 500)
  }
}
