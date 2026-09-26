import { NextRequest } from "next/server"
import { getInvestmentPillars } from "@/lib/content/cre-service"
import { savePillarAction, deletePillarAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
import type { InvestmentPillar } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/pillars/[id]
 * Retrieves an investment pillar by ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const pillars = await getInvestmentPillars()
    const pillar = pillars.find((p) => p.id === id)

    if (!pillar) {
      return apiError(`Investment pillar '${id}' not found.`, 404)
    }

    return apiSuccess({ pillar })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve pillar."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/pillars/[id]
 * Updates an investment pillar.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const body = (await req.json()) as { pillar: Partial<InvestmentPillar>; sortOrder?: number }

    const pillars = await getInvestmentPillars()
    const existing = pillars.find((p) => p.id === id)

    if (!existing) {
      return apiError(`Investment pillar '${id}' not found.`, 404)
    }

    const updated: InvestmentPillar = {
      ...existing,
      ...body.pillar,
      id,
    }

    const sortOrder = body.sortOrder ?? 0
    await savePillarAction(updated, sortOrder)

    return apiSuccess({ pillar: updated }, 200, `Investment pillar '${id}' updated.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update pillar."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/pillars/[id]
 * Deletes an investment pillar.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    await deletePillarAction(id)
    return apiSuccess({ deletedId: id }, 200, `Investment pillar '${id}' deleted.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete pillar."
    return apiError(message, 500)
  }
}
