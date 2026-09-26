import { NextRequest } from "next/server"
import { getCommercialDisciplines } from "@/lib/content/cre-service"
import { saveDisciplineAction, deleteDisciplineAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
import type { CommercialDiscipline } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/disciplines/[id]
 * Retrieves a single commercial discipline by ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const disciplines = await getCommercialDisciplines()
    const discipline = disciplines.find((d) => d.id === id)

    if (!discipline) {
      return apiError(`Discipline '${id}' not found.`, 404)
    }

    return apiSuccess({ discipline })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve discipline."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/disciplines/[id]
 * Updates a commercial discipline.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const body = (await req.json()) as Partial<CommercialDiscipline> & { sortOrder?: number }

    const disciplines = await getCommercialDisciplines()
    const existing = disciplines.find((d) => d.id === id)

    if (!existing) {
      return apiError(`Discipline '${id}' not found.`, 404)
    }

    const updated: CommercialDiscipline = {
      ...existing,
      ...body,
      id,
    }

    const sortOrder = body.sortOrder ?? 0
    await saveDisciplineAction(updated, sortOrder)

    return apiSuccess({ discipline: updated }, 200, `Discipline '${id}' updated.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update discipline."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/disciplines/[id]
 * Deletes a commercial discipline.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    await deleteDisciplineAction(id)
    return apiSuccess({ deletedId: id }, 200, `Discipline '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete discipline."
    return apiError(message, 500)
  }
}
