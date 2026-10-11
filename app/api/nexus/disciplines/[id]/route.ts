import { NextRequest } from "next/server"
import { getCommercialDisciplines } from "@/lib/content/cre-service"
import { saveDisciplineAction, deleteDisciplineAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<Partial<CommercialDiscipline> & { sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    const disciplines = await getCommercialDisciplines()
    const existing = disciplines.find((d) => d.id === id)

    if (!existing) {
      return apiError(`Discipline '${id}' not found.`, 404)
    }

    const validIcons = ["building-2", "shopping-bag", "warehouse", "hard-hat"] as const
    if (body.iconName && !validIcons.includes(body.iconName as (typeof validIcons)[number])) {
      return apiError(
        `Invalid iconName '${body.iconName}'. Allowed: ${validIcons.join(", ")}`,
        400
      )
    }

    const updated: CommercialDiscipline = {
      ...existing,
      ...body,
      id,
    }

    const sortOrder = body.sortOrder ?? 0
    const result = await saveDisciplineAction(updated, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to update discipline.", 400)
    }

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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const result = await deleteDisciplineAction(id)
    if (!result.success) {
      const status = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete discipline.", status)
    }

    return apiSuccess({ deletedId: id }, 200, `Discipline '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete discipline."
    return apiError(message, 500)
  }
}
