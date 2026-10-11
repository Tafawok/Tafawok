import { NextRequest } from "next/server"
import { getCommercialDisciplines } from "@/lib/content/cre-service"
import { saveDisciplineAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"
import type { CommercialDiscipline } from "@/types/cre"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/disciplines
 * Lists all commercial disciplines.
 */
export async function GET() {
  try {
    const disciplines = await getCommercialDisciplines()
    return apiSuccess({ disciplines, count: disciplines.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch disciplines."
    return apiError(message, 500)
  }
}

/**
 * POST /api/nexus/disciplines
 * Creates or updates a commercial discipline.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const parsed = await safeParseJson<Partial<CommercialDiscipline> & { sortOrder?: number }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data

    if (!body.id || !body.title?.en || !body.title?.ar) {
      return apiError("Missing required discipline fields: id and bilingual title are mandatory.", 400)
    }

    const validIcons = ["building-2", "shopping-bag", "warehouse", "hard-hat"] as const
    if (body.iconName && !validIcons.includes(body.iconName as (typeof validIcons)[number])) {
      return apiError(
        `Invalid iconName '${body.iconName}'. Allowed: ${validIcons.join(", ")}`,
        400
      )
    }

    const cleanDiscipline: CommercialDiscipline = {
      id: body.id.trim().toLowerCase(),
      title: body.title,
      tagline: body.tagline || { en: "", ar: "" },
      description: body.description || { en: "", ar: "" },
      keyMetric: body.keyMetric || { value: "", label: { en: "", ar: "" } },
      features: body.features || [],
      iconName: body.iconName || "building-2",
    }

    const sortOrder = body.sortOrder ?? 0
    const result = await saveDisciplineAction(cleanDiscipline, sortOrder)

    if (!result.success) {
      return apiError(result.error || "Failed to create discipline.", 400)
    }

    return apiSuccess({ discipline: cleanDiscipline }, 201, "Discipline created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create discipline."
    return apiError(message, 500)
  }
}
