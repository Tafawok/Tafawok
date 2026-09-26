import { NextRequest } from "next/server"
import { getInquiriesAction } from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/inquiries
 * Lists all contact & commercial leasing inquiries.
 */
export async function GET(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    let inquiries = await getInquiriesAction()
    if (status) {
      inquiries = inquiries.filter((i) => i.status === status)
    }

    return apiSuccess({ inquiries, count: inquiries.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch inquiries."
    return apiError(message, 500)
  }
}
