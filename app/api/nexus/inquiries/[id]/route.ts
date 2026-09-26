import { NextRequest } from "next/server"
import {
  updateInquiryStatusAction,
  deleteInquiryAction,
} from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"

export const dynamic = "force-dynamic"

/**
 * PATCH /api/nexus/inquiries/[id]
 * Updates an inquiry status (new | contacted | archived).
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const body = (await req.json()) as { status: "new" | "contacted" | "archived" }
    const { status } = body

    if (!status || !["new", "contacted", "archived"].includes(status)) {
      return apiError("Invalid status value. Must be 'new', 'contacted', or 'archived'.", 400)
    }

    await updateInquiryStatusAction(id, status)
    return apiSuccess({ id, status }, 200, `Inquiry status updated to '${status}'.`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update inquiry status."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/inquiries/[id]
 * Deletes an inquiry record.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    await deleteInquiryAction(id)
    return apiSuccess({ deletedId: id }, 200, "Inquiry deleted successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete inquiry."
    return apiError(message, 500)
  }
}
