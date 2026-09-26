import { NextRequest } from "next/server"
import { getCorporateMetrics } from "@/lib/content/cre-service"
import { saveMetricAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
import type { CorporateMetric } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/metrics
 * Lists all corporate metrics.
 */
export async function GET() {
  try {
    const metrics = await getCorporateMetrics()
    return apiSuccess({ metrics, count: metrics.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch metrics."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/metrics
 * Creates a corporate metric.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = (await req.json()) as {
      id?: string
      metric: CorporateMetric
      sortOrder?: number
    }
    const { metric, sortOrder = 0 } = body
    const metricId = body.id || `metric-${Date.now()}`

    if (!metric || typeof metric.value !== "number" || !metric.label?.en) {
      return apiError("Missing required metric fields: value and bilingual label are mandatory.", 400)
    }

    await saveMetricAction(metricId, metric, sortOrder)
    return apiSuccess({ id: metricId, metric }, 201, "Metric created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create metric."
    return apiError(message, 500)
  }
}
