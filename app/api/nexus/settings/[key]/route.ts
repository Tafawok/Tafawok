import { NextRequest } from "next/server"
import {
  getCeoProfile,
  getCompanyIdentity,
  getHseCharter,
} from "@/lib/content/cre-service"
import { saveSiteSettingAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/settings/[key]
 * Retrieves a specific site setting by key (ceo_profile, company_identity, hse_charter).
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params

    switch (key) {
      case "ceo_profile": {
        const data = await getCeoProfile()
        return apiSuccess({ key, data })
      }
      case "company_identity": {
        const data = await getCompanyIdentity()
        return apiSuccess({ key, data })
      }
      case "hse_charter": {
        const data = await getHseCharter()
        return apiSuccess({ key, data })
      }
      default:
        return apiError(`Invalid site setting key '${key}'. Supported: ceo_profile, company_identity, hse_charter.`, 404)
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve setting."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/settings/[key]
 * Updates a site setting with new configuration payload.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { key } = await params
    const body = (await req.json()) as { data: unknown }
    const { data } = body

    if (!data) {
      return apiError("Missing 'data' in request body.", 400)
    }

    const validKeys = new Set(["ceo_profile", "company_identity", "hse_charter"])
    if (!validKeys.has(key)) {
      return apiError(`Invalid site setting key '${key}'.`, 400)
    }

    await saveSiteSettingAction(key, data)
    return apiSuccess({ key, data }, 200, `Setting '${key}' updated successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update setting."
    return apiError(message, 500)
  }
}
