import { NextRequest } from "next/server"
import { getClientPartners } from "@/lib/content/cre-service"
import { savePartnerAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { ClientPartner } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/partners
 * Lists client partners.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    let partners = await getClientPartners()
    if (category) {
      partners = partners.filter((p) => p.category === category)
    }

    return apiSuccess({ partners, count: partners.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch partners."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/partners
 * Creates a client partner.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<{ partner: ClientPartner; id?: string; sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { partner, sortOrder = 0 } = body

    if (!partner || !partner.name || !partner.category) {
      return apiError("Missing required fields: partner name and category are mandatory.", 400)
    }

    const validCategories = ["energy", "epc", "commercial", "manufacturer"] as const
    if (!validCategories.includes(partner.category as (typeof validCategories)[number])) {
      return apiError(
        `Invalid partner category '${partner.category}'. Allowed: ${validCategories.join(", ")}`,
        400
      )
    }

    const partnerId = (body.id || `partner-${Date.now()}`).trim().toLowerCase()
    const cleanPartner: ClientPartner = {
      name: partner.name.trim(),
      category: partner.category,
      country: partner.country?.trim() || "",
    }

    const result = await savePartnerAction(partnerId, cleanPartner, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to create partner.", 400)
    }

    return apiSuccess({ id: partnerId, partner: cleanPartner }, 201, "Partner created.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create partner."
    return apiError(message, 500)
  }
}
