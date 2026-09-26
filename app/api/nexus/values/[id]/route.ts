import { NextRequest } from "next/server"
import { getCorporateValues } from "@/lib/content/cre-service"
import { saveValueAction, deleteValueAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
import type { CorporateValue } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/values/[id]
 * Retrieves a corporate value by ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const values = await getCorporateValues()
    const value = values.find((v) => v.id === id)

    if (!value) {
      return apiError(`Corporate value '${id}' not found.`, 404)
    }

    return apiSuccess({ value })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve value."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/values/[id]
 * Updates a corporate value.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const body = (await req.json()) as { value: Partial<CorporateValue>; sortOrder?: number }

    const values = await getCorporateValues()
    const existing = values.find((v) => v.id === id)

    if (!existing) {
      return apiError(`Corporate value '${id}' not found.`, 404)
    }

    const updated: CorporateValue = {
      ...existing,
      ...body.value,
      id,
    }

    const sortOrder = body.sortOrder ?? 0
    await saveValueAction(updated, sortOrder)

    return apiSuccess({ value: updated }, 200, `Corporate value '${id}' updated.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update value."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/values/[id]
 * Deletes a corporate value.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    await deleteValueAction(id)
    return apiSuccess({ deletedId: id }, 200, `Corporate value '${id}' deleted.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete value."
    return apiError(message, 500)
  }
}
