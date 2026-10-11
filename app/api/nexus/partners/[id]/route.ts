import { NextRequest } from "next/server"
import { getClientPartners } from "@/lib/content/cre-service"
import { savePartnerAction, deletePartnerAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { ClientPartner } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/partners/[id]
 * Retrieves a client partner by ID or index.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const partners = await getClientPartners()
    const index = parseInt(id, 10)
    const partner = !isNaN(index) ? partners[index] : partners.find((_, i) => `partner-${i + 1}` === id)

    if (!partner) {
      return apiError(`Partner '${id}' not found.`, 404)
    }

    return apiSuccess({ partner })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve partner."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/partners/[id]
 * Updates a client partner.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ partner?: Partial<ClientPartner>; sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    const partners = await getClientPartners()
    const index = parseInt(id, 10)
    const existing = !isNaN(index) ? partners[index] : partners.find((_, i) => `partner-${i + 1}` === id)

    if (!existing) {
      return apiError(`Partner '${id}' not found.`, 404)
    }

    const validCategories = ["energy", "epc", "commercial", "manufacturer"] as const
    if (
      body.partner?.category &&
      !validCategories.includes(body.partner.category as (typeof validCategories)[number])
    ) {
      return apiError(
        `Invalid partner category '${body.partner.category}'. Allowed: ${validCategories.join(", ")}`,
        400
      )
    }

    const updated: ClientPartner = {
      ...existing,
      ...(body.partner || {}),
    }

    const partnerDbId = isNaN(index) ? id : `partner-${index + 1}`
    const sortOrder = body.sortOrder ?? (isNaN(index) ? 0 : index)

    const result = await savePartnerAction(partnerDbId, updated, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to update partner.", 400)
    }

    return apiSuccess({ id: partnerDbId, partner: updated }, 200, `Partner '${id}' updated.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update partner."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/partners/[id]
 * Deletes a client partner.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const index = parseInt(id, 10)
    const partnerDbId = isNaN(index) ? id : `partner-${index + 1}`

    const result = await deletePartnerAction(partnerDbId)
    if (!result.success) {
      const status = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete partner.", status)
    }

    return apiSuccess({ deletedId: partnerDbId }, 200, `Partner '${id}' deleted.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete partner."
    return apiError(message, 500)
  }
}
