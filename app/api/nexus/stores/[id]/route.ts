import { NextRequest } from "next/server"
import { getProperties } from "@/lib/content/cre-service"
import { saveStoreAction, deleteStoreAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
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
            store: { ...found, propertyId: p.id, propertyName: p.name.en },
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
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const body = (await req.json()) as { propertyId?: string; store: Partial<StoreItem> }

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

    const updatedStore: StoreItem = {
      ...existingStore,
      ...body.store,
      id, // Preserve ID
    }

    await saveStoreAction(targetPropertyId, updatedStore)
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
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    await deleteStoreAction(id)
    return apiSuccess({ deletedId: id }, 200, `Store '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete store."
    return apiError(message, 500)
  }
}
