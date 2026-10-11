import { NextRequest } from "next/server"
import { getCorporateMetrics } from "@/lib/content/cre-service"
import { saveMetricAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<{
      id?: string
      metric: CorporateMetric
      sortOrder?: number
    }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { metric, sortOrder = 0 } = body
    const metricId = (body.id || `metric-${Date.now()}`).trim().toLowerCase()

    if (!metric || typeof metric.value !== "number" || !metric.label?.en) {
      return apiError("Missing required metric fields: value and bilingual label are mandatory.", 400)
    }

    const cleanMetric: CorporateMetric = {
      value: Number(metric.value) || 0,
      suffix: metric.suffix || "",
      label: {
        en: metric.label.en.trim(),
        ar: metric.label.ar?.trim() || metric.label.en.trim(),
      },
      description: {
        en: metric.description?.en?.trim() || "",
        ar: metric.description?.ar?.trim() || "",
      },
    }

    const result = await saveMetricAction(metricId, cleanMetric, sortOrder)
    if (!result.success) {
      return apiError(result.error || "Failed to create metric.", 400)
    }

    return apiSuccess({ id: metricId, metric: cleanMetric }, 201, "Metric created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create metric."
    return apiError(message, 500)
  }
}
