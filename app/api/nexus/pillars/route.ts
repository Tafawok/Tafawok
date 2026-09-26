import { NextRequest } from "next/server"
import { getInvestmentPillars } from "@/lib/content/cre-service"
import { savePillarAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = (await req.json()) as { pillar: InvestmentPillar; sortOrder?: number }
    const { pillar, sortOrder = 0 } = body

    if (!pillar || !pillar.id || !pillar.title?.en) {
      return apiError("Missing required fields: id and bilingual title are mandatory.", 400)
    }

    await savePillarAction(pillar, sortOrder)
    return apiSuccess({ pillar }, 201, "Investment pillar created.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create investment pillar."
    return apiError(message, 500)
  }
}
