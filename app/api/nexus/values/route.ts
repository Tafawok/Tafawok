import { NextRequest } from "next/server"
import { getCorporateValues } from "@/lib/content/cre-service"
import { saveValueAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = (await req.json()) as { value: CorporateValue; sortOrder?: number }
    const { value, sortOrder = 0 } = body

    if (!value || !value.id || !value.title?.en) {
      return apiError("Missing required fields: id and bilingual title are mandatory.", 400)
    }

    await saveValueAction(value, sortOrder)
    return apiSuccess({ value }, 201, "Corporate value created.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create value."
    return apiError(message, 500)
  }
}
