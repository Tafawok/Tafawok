import { NextRequest } from "next/server"
import { getProperties } from "@/lib/content/cre-service"
import { savePropertyAction, deletePropertyAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
import type { Property } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/properties/[id]
 * Retrieves a single property by its ID or slug.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const properties = await getProperties()
    const property = properties.find((p) => p.id === id || p.slug === id)

    if (!property) {
      return apiError(`Property with ID or slug '${id}' not found.`, 404)
    }

    return apiSuccess({ property })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve property."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/properties/[id]
 * Updates a commercial property.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const body = (await req.json()) as Partial<Property> & { sortOrder?: number }

    const properties = await getProperties()
    const existing = properties.find((p) => p.id === id)

    if (!existing) {
      return apiError(`Property '${id}' not found for update.`, 404)
    }

    const updated: Property = {
      ...existing,
      ...body,
      id, // Preserve URL identifier
    }

    const sortOrder = body.sortOrder ?? 0
    await savePropertyAction(updated, sortOrder)

    return apiSuccess({ property: updated }, 200, `Property '${id}' updated successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update property."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/properties/[id]
 * Deletes a commercial property and cascades to associated stores.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    await deletePropertyAction(id)
    return apiSuccess({ deletedId: id }, 200, `Property '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete property."
    return apiError(message, 500)
  }
}
