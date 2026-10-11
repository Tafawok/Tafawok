import { NextRequest } from "next/server"
import { getNotificationBanners } from "@/lib/content/cre-service"
import { saveNotificationBannerAction } from "@/lib/content/actions"
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
 * GET /api/nexus/banners
 * Lists all notification banners.
 */
export async function GET(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const banners = await getNotificationBanners()
    return apiSuccess({ banners, count: banners.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch banners."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/banners
 * Creates a notification banner.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<{ banner: NotificationBanner }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { banner } = body

    if (!banner) {
      return apiError("Missing 'banner' payload.", 400)
    }

    if (!banner.title?.en || !banner.title?.ar) {
      return apiError("Bilingual title (English and Arabic) is required.", 400)
    }

    if (!banner.message?.en || !banner.message?.ar) {
      return apiError("Bilingual message (English and Arabic) is required.", 400)
    }

    if (!banner.startDate || !banner.endDate) {
      return apiError("Start date and end date are mandatory.", 400)
    }

    if (!VALID_TYPES.has(banner.type)) {
      return apiError(
        `Invalid banner type '${banner.type}'. Allowed: ${Array.from(VALID_TYPES).join(", ")}.`,
        400
      )
    }

    const cleanId = (banner.id || `banner-${Date.now()}`).trim().toLowerCase()

    const cleanBanner: NotificationBanner = {
      ...banner,
      id: cleanId,
      isActive: banner.isActive ?? true,
      dismissible: banner.dismissible ?? true,
      priority: typeof banner.priority === "number" ? banner.priority : 0,
      linkUrl: banner.linkUrl?.trim() || undefined,
    }

    const result = await saveNotificationBannerAction(cleanBanner)
    if (!result.success) {
      return apiError(result.error || "Failed to create notification banner.", 400)
    }

    return apiSuccess({ banner: cleanBanner }, 201, "Notification banner created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create banner."
    return apiError(message, 500)
  }
}
