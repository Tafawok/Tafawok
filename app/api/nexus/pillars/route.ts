import { NextRequest } from "next/server"
import { getInvestmentPillars } from "@/lib/content/cre-service"
import { savePillarAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { InvestmentPillar } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/pillars
 * Lists investment pillars.
 */
export async function GET() {
  try {
    const pillars = await getInvestmentPillars()
    return apiSuccess({ pillars, count: pillars.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch investment pillars."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/pillars
 * Creates an investment pillar.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<{ pillar: InvestmentPillar; sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { pillar, sortOrder = 0 } = body

    if (!pillar || !pillar.id || !pillar.title?.en) {
      return apiError("Missing required fields: id and bilingual title are mandatory.", 400)
    }

    const cleanPillar: InvestmentPillar = {
      ...pillar,
      id: pillar.id.trim().toLowerCase(),
      title: {
        en: pillar.title.en.trim(),
        ar: pillar.title.ar?.trim() || pillar.title.en.trim(),
      },
      tagline: pillar.tagline || { en: "", ar: "" },
      description: pillar.description || { en: "", ar: "" },
      metric: pillar.metric || { value: "", label: { en: "", ar: "" } },
    }

    const result = await savePillarAction(cleanPillar, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to create investment pillar.", 400)
    }

    return apiSuccess({ pillar: cleanPillar }, 201, "Investment pillar created.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create investment pillar."
    return apiError(message, 500)
  }
}
