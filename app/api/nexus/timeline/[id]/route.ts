import { NextRequest } from "next/server"
import { getTimelineMilestones } from "@/lib/content/cre-service"
import { saveMilestoneAction, deleteMilestoneAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { TimelineMilestone } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/timeline/[id]
 * Retrieves a single timeline milestone by year or ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const milestones = await getTimelineMilestones()
    const milestone = milestones.find((m) => m.year === id || `milestone-${m.year}` === id)

    if (!milestone) {
      return apiError(`Milestone '${id}' not found.`, 404)
    }

    return apiSuccess({ milestone })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve milestone."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/timeline/[id]
 * Updates a timeline milestone.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ milestone?: Partial<TimelineMilestone>; sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    const milestones = await getTimelineMilestones()
    const existing = milestones.find((m) => m.year === id || `milestone-${m.year}` === id)

    if (!existing) {
      return apiError(`Milestone '${id}' not found for update.`, 404)
    }

    const validScopes = ["heritage", "infrastructure", "commercial", "expansion"] as const
    if (
      body.milestone?.scopeCategory &&
      !validScopes.includes(body.milestone.scopeCategory as (typeof validScopes)[number])
    ) {
      return apiError(
        `Invalid scopeCategory '${body.milestone.scopeCategory}'. Allowed: ${validScopes.join(", ")}`,
        400
      )
    }

    const updated: TimelineMilestone = {
      ...existing,
      ...(body.milestone || {}),
    }

    const milestoneDbId = id.startsWith("milestone-") ? id : `milestone-${updated.year}`
    const sortOrder = body.sortOrder ?? 0

    const result = await saveMilestoneAction(milestoneDbId, updated, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to update milestone.", 400)
    }

    return apiSuccess({ id: milestoneDbId, milestone: updated }, 200, `Milestone '${id}' updated.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update milestone."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/timeline/[id]
 * Deletes a timeline milestone.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const milestoneDbId = id.startsWith("milestone-") ? id : `milestone-${id}`
    const result = await deleteMilestoneAction(milestoneDbId)
    if (!result.success) {
      const status = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete milestone.", status)
    }

    return apiSuccess({ deletedId: milestoneDbId }, 200, `Milestone '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete milestone."
    return apiError(message, 500)
  }
}
