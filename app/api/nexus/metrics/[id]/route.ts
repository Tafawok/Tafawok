import { NextRequest } from "next/server"
import { getCorporateMetrics } from "@/lib/content/cre-service"
import { saveMetricAction, deleteMetricAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
import type { CorporateMetric } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/metrics/[id]
 * Retrieves a single metric by ID or numerical index.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const metrics = await getCorporateMetrics()
    const index = parseInt(id, 10)
    const metric = !isNaN(index) ? metrics[index] : metrics.find((_, i) => `metric-${i + 1}` === id)

    if (!metric) {
      return apiError(`Metric '${id}' not found.`, 404)
    }

    return apiSuccess({ metric })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve metric."
    return apiError(message, 500)
  }
}

/**
 * PUT /api/nexus/metrics/[id]
 * Updates a corporate metric.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const body = (await req.json()) as { metric: Partial<CorporateMetric>; sortOrder?: number }

    const metrics = await getCorporateMetrics()
    const index = parseInt(id, 10)
    const existing = !isNaN(index) ? metrics[index] : metrics.find((_, i) => `metric-${i + 1}` === id)

    if (!existing) {
      return apiError(`Metric '${id}' not found for update.`, 404)
    }

    const updated: CorporateMetric = {
      ...existing,
      ...body.metric,
    }

    const metricDbId = isNaN(index) ? id : `metric-${index + 1}`
    const sortOrder = body.sortOrder ?? (isNaN(index) ? 0 : index)

    await saveMetricAction(metricDbId, updated, sortOrder)
    return apiSuccess({ id: metricDbId, metric: updated }, 200, `Metric '${id}' updated.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update metric."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/metrics/[id]
 * Deletes a corporate metric.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    await deleteMetricAction(id)
    return apiSuccess({ deletedId: id }, 200, `Metric '${id}' deleted successfully.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete metric."
    return apiError(message, 500)
  }
}
