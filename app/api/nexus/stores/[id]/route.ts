import { NextRequest } from "next/server"
import { getProperties } from "@/lib/content/cre-service"
import { saveStoreAction, deleteStoreAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { StoreItem } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/stores/[id]
 * Retrieves a single retail store by ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const properties = await getProperties()

    for (const p of properties) {
      if (p.stores) {
        const found = p.stores.find((s) => s.id === id)
        if (found) {
          return apiSuccess({
            store: { ...found, propertyId: p.id, propertyName: p.name?.en || "" },
          })
        }
      }
    }

    return apiError(`Store '${id}' not found.`, 404)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve store."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/stores/[id]
 * Updates a retail tenant store.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ propertyId?: string; store: Partial<StoreItem> }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    const properties = await getProperties()
    let targetPropertyId = body.propertyId
    let existingStore: StoreItem | null = null

    for (const p of properties) {
      if (p.stores) {
        const found = p.stores.find((s) => s.id === id)
        if (found) {
          existingStore = found
          if (!targetPropertyId) targetPropertyId = p.id
          break
        }
      }
    }

    if (!existingStore || !targetPropertyId) {
      return apiError(`Store '${id}' not found.`, 404)
    }

    const validStatuses = ["open", "coming_soon", "leased"] as const
    if (
      body.store?.status &&
      !validStatuses.includes(body.store.status as (typeof validStatuses)[number])
    ) {
      return apiError(
        `Invalid store status '${body.store.status}'. Allowed: ${validStatuses.join(", ")}`,
        400
      )
    }

    const updatedStore: StoreItem = {
      ...existingStore,
      ...body.store,
      id, // Preserve ID
    }

    const result = await saveStoreAction(targetPropertyId, updatedStore)
    if (!result.success) {
      return apiError(result.error || "Failed to update store.", 400)
    }

    return apiSuccess({ store: updatedStore, propertyId: targetPropertyId }, 200, `Store '${id}' updated.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update store."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/stores/[id]
 * Deletes a retail store.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const result = await deleteStoreAction(id)
    if (!result.success) {
      const status = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete store.", status)
    }

    return apiSuccess({ deletedId: id }, 200, `Store '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete store."
    return apiError(message, 500)
  }
}
