import { NextRequest } from "next/server"
import { getProperties } from "@/lib/content/cre-service"
import { savePropertyAction, deletePropertyAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<Partial<Property> & { sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    const properties = await getProperties()
    const existing = properties.find((p) => p.id === id)

    if (!existing) {
      return apiError(`Property '${id}' not found for update.`, 404)
    }

    const validTypes = ["office", "retail", "commercial", "mixed-use", "logistics"] as const
    if (body.type && !validTypes.includes(body.type as (typeof validTypes)[number])) {
      return apiError(
        `Invalid property type '${body.type}'. Allowed values: ${validTypes.join(", ")}`,
        400
      )
    }

    const validStatuses = ["active", "operational", "completed", "under-development", "pipeline"] as const
    if (body.status && !validStatuses.includes(body.status as (typeof validStatuses)[number])) {
      return apiError(
        `Invalid property status '${body.status}'. Allowed values: ${validStatuses.join(", ")}`,
        400
      )
    }

    const updated: Property = {
      ...existing,
      ...body,
      id, // Preserve URL identifier
    }

    const sortOrder = body.sortOrder ?? 0
    const result = await savePropertyAction(updated, sortOrder)

    if (!result.success) {
      return apiError(result.error || "Failed to update property.", 400)
    }

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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const result = await deletePropertyAction(id)

    if (!result.success) {
      const status = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete property.", status)
    }

    return apiSuccess({ deletedId: id }, 200, `Property '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete property."
    return apiError(message, 500)
  }
}
