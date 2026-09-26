import { NextRequest } from "next/server"
import { getCommercialDisciplines } from "@/lib/content/cre-service"
import { saveDisciplineAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"
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
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = (await req.json()) as Partial<CommercialDiscipline> & { sortOrder?: number }

    if (!body.id || !body.title?.en || !body.title?.ar) {
      return apiError("Missing required discipline fields: id and bilingual title are mandatory.", 400)
    }

    const sortOrder = body.sortOrder ?? 0
    await saveDisciplineAction(body as CommercialDiscipline, sortOrder)

    return apiSuccess({ discipline: body }, 201, "Discipline created successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create discipline."
    return apiError(message, 500)
  }
}
