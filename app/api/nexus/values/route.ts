import { NextRequest } from "next/server"
import { getCorporateValues } from "@/lib/content/cre-service"
import { saveValueAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { CorporateValue } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/values
 * Lists all corporate values.
 */
export async function GET() {
  try {
    const values = await getCorporateValues()
    return apiSuccess({ values, count: values.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch values."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/values
 * Creates a corporate value.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<{ value: CorporateValue; sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { value, sortOrder = 0 } = body

    if (!value || !value.id || !value.title?.en) {
      return apiError("Missing required fields: id and bilingual title are mandatory.", 400)
    }

    const cleanValue: CorporateValue = {
      ...value,
      id: value.id.trim().toLowerCase(),
      title: {
        en: value.title.en.trim(),
        ar: value.title.ar?.trim() || value.title.en.trim(),
      },
      tagline: value.tagline || { en: "", ar: "" },
      description: value.description || { en: "", ar: "" },
    }

    const result = await saveValueAction(cleanValue, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to create value.", 400)
    }

    return apiSuccess({ value: cleanValue }, 201, "Corporate value created.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create value."
    return apiError(message, 500)
  }
}
