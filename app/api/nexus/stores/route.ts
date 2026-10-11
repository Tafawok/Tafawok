import { NextRequest } from "next/server"
import { getProperties } from "@/lib/content/cre-service"
import { saveStoreAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { StoreItem } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/stores
 * Lists stores across all properties, supporting filtering by property_id, status, or search query.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const propertyId = searchParams.get("property_id")
    const status = searchParams.get("status")
    const search = searchParams.get("search")?.toLowerCase().trim()

    const properties = await getProperties()
    const allStores: Array<StoreItem & { propertyId: string; propertyName: string }> = []

    for (const p of properties) {
      if (propertyId && p.id !== propertyId) continue
      if (p.stores) {
        for (const s of p.stores) {
          allStores.push({
            ...s,
            propertyId: p.id,
            propertyName: p.name?.en || "",
          })
        }
      }
    }

    let filtered = allStores
    if (status) {
      filtered = filtered.filter((s) => s.status === status)
    }
    if (search) {
      filtered = filtered.filter(
        (s) =>
          (s.name?.en && s.name.en.toLowerCase().includes(search)) ||
          (s.name?.ar && s.name.ar.includes(search)) ||
          (s.unitNumber && s.unitNumber.toLowerCase().includes(search))
      )
    }

    return apiSuccess({ stores: filtered, count: filtered.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch retail stores."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/stores
 * Creates a new retail tenant store under a specified property.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<{ propertyId: string; store: StoreItem }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const { propertyId, store } = parsed.data

    if (!propertyId || !store || !store.id || !store.name?.en || !store.name?.ar) {
      return apiError(
        "Missing required fields: propertyId, store.id, and bilingual store.name are required.",
        400
      )
    }

    const validStatuses = ["open", "coming_soon", "leased"] as const
    if (store.status && !validStatuses.includes(store.status as (typeof validStatuses)[number])) {
      return apiError(
        `Invalid store status '${store.status}'. Allowed values: ${validStatuses.join(", ")}`,
        400
      )
    }

    const cleanStore: StoreItem = {
      ...store,
      status: store.status || "open",
    }

    const result = await saveStoreAction(propertyId, cleanStore)
    if (!result.success) {
      return apiError(result.error || "Failed to create store.", 400)
    }

    return apiSuccess({ store: cleanStore, propertyId }, 201, "Store created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create store."
    return apiError(message, 500)
  }
}
