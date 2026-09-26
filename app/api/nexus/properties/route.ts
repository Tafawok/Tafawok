import { NextRequest } from "next/server"
import { getProperties } from "@/lib/content/cre-service"
import { savePropertyAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
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
          p.name.en.toLowerCase().includes(search) ||
          p.name.ar.includes(search) ||
          p.slug.toLowerCase().includes(search) ||
          p.location.city.en.toLowerCase().includes(search)
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
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = (await req.json()) as Partial<Property> & { sortOrder?: number }

    if (!body.id || !body.slug || !body.name?.en || !body.name?.ar) {
      return apiError("Missing required property fields: id, slug, and bilingual name are mandatory.", 400)
    }

    const sortOrder = body.sortOrder ?? 0
    await savePropertyAction(body as Property, sortOrder)

    return apiSuccess({ property: body }, 201, "Property created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create property."
    return apiError(message, 500)
  }
}
