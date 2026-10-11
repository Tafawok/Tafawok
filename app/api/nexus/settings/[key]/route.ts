import { NextRequest } from "next/server"
import {
  getCeoProfile,
  getCompanyIdentity,
  getHseCharter,
  getHomepageSettings,
  getMaintenanceSettings,
} from "@/lib/content/cre-service"
import {
  saveSiteSettingAction,
  saveMaintenanceSettingsAction,
} from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { MaintenanceSettings } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/settings/[key]
 * Retrieves a specific site setting by key (ceo_profile, company_identity, hse_charter, homepage_settings, maintenance_mode).
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
      case "homepage_settings": {
        const data = await getHomepageSettings()
        return apiSuccess({ key, data })
      }
      case "maintenance_mode": {
        const data = await getMaintenanceSettings()
        return apiSuccess({ key, data })
      }
      default:
        return apiError(
          `Invalid site setting key '${key}'. Supported: ceo_profile, company_identity, hse_charter, homepage_settings, maintenance_mode.`,
          404
        )
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
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { key } = await params
    const parsed = await safeParseJson<{ data: unknown }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { data } = body

    if (!data) {
      return apiError("Missing 'data' in request body.", 400)
    }

    const validKeys = new Set([
      "ceo_profile",
      "company_identity",
      "hse_charter",
      "homepage_settings",
      "maintenance_mode",
    ])
    if (!validKeys.has(key)) {
      return apiError(`Invalid site setting key '${key}'. Supported: ${Array.from(validKeys).join(", ")}.`, 400)
    }

    let result: { success: boolean; error?: string }
    if (key === "maintenance_mode") {
      result = await saveMaintenanceSettingsAction(data as MaintenanceSettings)
    } else {
      result = await saveSiteSettingAction(key, data)
    }

    if (!result.success) {
      return apiError(result.error || `Failed to update setting '${key}'.`, 400)
    }

    return apiSuccess({ key, data }, 200, `Setting '${key}' updated successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update setting."
    return apiError(message, 500)
  }
}
