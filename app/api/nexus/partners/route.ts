import { NextRequest } from "next/server"
import { getClientPartners } from "@/lib/content/cre-service"
import { savePartnerAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = (await req.json()) as { partner: ClientPartner; id?: string; sortOrder?: number }
    const { partner, sortOrder = 0 } = body

    if (!partner || !partner.name || !partner.category) {
      return apiError("Missing required fields: partner name and category are mandatory.", 400)
    }

    const partnerId = body.id || `partner-${Date.now()}`
    await savePartnerAction(partnerId, partner, sortOrder)

    return apiSuccess({ id: partnerId, partner }, 201, "Partner created.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create partner."
    return apiError(message, 500)
  }
}
