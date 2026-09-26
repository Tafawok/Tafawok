import { NextRequest } from "next/server"
import { getTimelineMilestones } from "@/lib/content/cre-service"
import { saveMilestoneAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
import type { TimelineMilestone } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/timeline
 * Lists corporate heritage milestones.
 */
export async function GET() {
  try {
    const milestones = await getTimelineMilestones()
    return apiSuccess({ milestones, count: milestones.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch timeline milestones."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/timeline
 * Creates a timeline milestone.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = (await req.json()) as {
      milestone: TimelineMilestone
      id?: string
      sortOrder?: number
    }
    const { milestone, sortOrder = 0 } = body

    if (!milestone || !milestone.year || !milestone.title?.en) {
      return apiError("Missing required milestone fields: year and bilingual title are mandatory.", 400)
    }

    const milestoneId = body.id || `milestone-${milestone.year}`
    await saveMilestoneAction(milestoneId, milestone, sortOrder)

    return apiSuccess({ id: milestoneId, milestone }, 201, "Milestone created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create milestone."
    return apiError(message, 500)
  }
}
