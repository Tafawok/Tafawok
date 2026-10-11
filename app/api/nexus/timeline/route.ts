import { NextRequest } from "next/server"
import { getTimelineMilestones } from "@/lib/content/cre-service"
import { saveMilestoneAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<{
      milestone: TimelineMilestone
      id?: string
      sortOrder?: number
    }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { milestone, sortOrder = 0 } = body

    if (!milestone || !milestone.year || !milestone.title?.en) {
      return apiError("Missing required milestone fields: year and bilingual title are mandatory.", 400)
    }

    const validScopes = ["heritage", "infrastructure", "commercial", "expansion"] as const
    if (
      milestone.scopeCategory &&
      !validScopes.includes(milestone.scopeCategory as (typeof validScopes)[number])
    ) {
      return apiError(
        `Invalid scopeCategory '${milestone.scopeCategory}'. Allowed: ${validScopes.join(", ")}`,
        400
      )
    }

    const milestoneId = (body.id || `milestone-${milestone.year.trim()}`).trim().toLowerCase()
    const cleanMilestone: TimelineMilestone = {
      year: milestone.year.trim(),
      title: {
        en: milestone.title.en.trim(),
        ar: milestone.title.ar?.trim() || milestone.title.en.trim(),
      },
      badge: {
        en: milestone.badge?.en?.trim() || "",
        ar: milestone.badge?.ar?.trim() || "",
      },
      description: {
        en: milestone.description?.en?.trim() || "",
        ar: milestone.description?.ar?.trim() || "",
      },
      highlights: milestone.highlights || [],
      scopeCategory: milestone.scopeCategory || "commercial",
    }

    const result = await saveMilestoneAction(milestoneId, cleanMilestone, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to create milestone.", 400)
    }

    return apiSuccess({ id: milestoneId, milestone: cleanMilestone }, 201, "Milestone created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create milestone."
    return apiError(message, 500)
  }
}
