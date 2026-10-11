import { NextRequest } from "next/server"
import { getCorporateValues } from "@/lib/content/cre-service"
import { saveValueAction, deleteValueAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ value?: Partial<CorporateValue>; sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    const values = await getCorporateValues()
    const existing = values.find((v) => v.id === id)

    if (!existing) {
      return apiError(`Corporate value '${id}' not found.`, 404)
    }

    const updated: CorporateValue = {
      ...existing,
      ...(body.value || {}),
      id,
    }

    const sortOrder = body.sortOrder ?? 0
    const result = await saveValueAction(updated, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to update value.", 400)
    }

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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const result = await deleteValueAction(id)
    if (!result.success) {
      const status = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete value.", status)
    }
    return apiSuccess({ deletedId: id }, 200, `Corporate value '${id}' deleted.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete value."
    return apiError(message, 500)
  }
}
