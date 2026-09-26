import { NextRequest } from "next/server"
import { getClientPartners } from "@/lib/content/cre-service"
import { savePartnerAction, deletePartnerAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const body = (await req.json()) as { partner: Partial<ClientPartner>; sortOrder?: number }

    const partners = await getClientPartners()
    const index = parseInt(id, 10)
    const existing = !isNaN(index) ? partners[index] : partners.find((_, i) => `partner-${i + 1}` === id)

    if (!existing) {
      return apiError(`Partner '${id}' not found.`, 404)
    }

    const updated: ClientPartner = {
      ...existing,
      ...body.partner,
    }

    const partnerDbId = isNaN(index) ? id : `partner-${index + 1}`
    const sortOrder = body.sortOrder ?? (isNaN(index) ? 0 : index)

    await savePartnerAction(partnerDbId, updated, sortOrder)
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
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const index = parseInt(id, 10)
    const partnerDbId = isNaN(index) ? id : `partner-${index + 1}`

    await deletePartnerAction(partnerDbId)
    return apiSuccess({ deletedId: partnerDbId }, 200, `Partner '${id}' deleted.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete partner."
    return apiError(message, 500)
  }
}
