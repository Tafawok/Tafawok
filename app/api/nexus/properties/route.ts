import { NextRequest } from "next/server"
import { getProperties } from "@/lib/content/cre-service"
import { savePropertyAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { Property } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/properties
 * Lists all commercial properties with optional type, status, and search filters.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const search = searchParams.get("search")?.toLowerCase().trim()

    let properties = await getProperties()

    if (type) {
      properties = properties.filter((p) => p.type === type)
    }
    if (status) {
      properties = properties.filter((p) => p.status === status)
    }
    if (search) {
      properties = properties.filter(
        (p) =>
          (p.name?.en && p.name.en.toLowerCase().includes(search)) ||
          (p.name?.ar && p.name.ar.includes(search)) ||
          (p.slug && p.slug.toLowerCase().includes(search)) ||
          (p.location?.city?.en &&
            p.location.city.en.toLowerCase().includes(search)) ||
          (p.location?.city?.ar && p.location.city.ar.includes(search))
      )
    }

    return apiSuccess({ properties, count: properties.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch properties."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/properties
 * Creates or upserts a commercial flagship property.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<Partial<Property> & { sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    if (!body.id || !body.slug || !body.name?.en || !body.name?.ar) {
      return apiError("Missing required property fields: id, slug, and bilingual name are mandatory.", 400)
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

    const cleanProperty: Property = {
      ...(body as Property),
      id: body.id.trim().toLowerCase(),
      slug: body.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      type: (body.type as Property["type"]) || "commercial",
      status: (body.status as Property["status"]) || "operational",
    }

    const sortOrder = body.sortOrder ?? 0
    const result = await savePropertyAction(cleanProperty, sortOrder)

    if (!result.success) {
      return apiError(result.error || "Failed to save property.", 400)
    }

    return apiSuccess({ property: cleanProperty }, 201, "Property created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create property."
    return apiError(message, 500)
  }
}
