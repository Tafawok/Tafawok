import { NextRequest } from "next/server"
import {
  getInquiryByIdAction,
  updateInquiryStatusAction,
  deleteInquiryAction,
} from "@/lib/content/actions"
import { authenticateNexusAdmin, apiSuccess, apiError, safeParseJson } from "@/lib/api/nexus-auth"

export const dynamic = "force-dynamic"

/**
 * GET /api/nexus/inquiries/[id]
 * Retrieves a single inquiry record by UUID.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const inquiry = await getInquiryByIdAction(id)
    if (!inquiry) {
      return apiError(`Inquiry '${id}' not found.`, 404)
    }

    return apiSuccess({ inquiry })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve inquiry."
    return apiError(message, 500)
  }
}

/**
 * PATCH /api/nexus/inquiries/[id]
 * Updates an inquiry status (new | contacted | archived).
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const parsed = await safeParseJson<{ status: "new" | "contacted" | "archived" }>(req)
    if (!parsed.success) {
      return apiError(parsed.error, 400)
    }
    const body = parsed.data
    const { status } = body

    if (!status || !["new", "contacted", "archived"].includes(status)) {
      return apiError("Invalid status value. Must be 'new', 'contacted', or 'archived'.", 400)
    }

    const result = await updateInquiryStatusAction(id, status)
    if (!result.success) {
      const statusCode = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to update inquiry status.", statusCode)
    }

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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticateNexusAdmin(req)
  if (!auth.authorized) return auth.response

  try {
    const { id } = await params
    const result = await deleteInquiryAction(id)
    if (!result.success) {
      const statusCode = result.error?.includes("not found") ? 404 : 400
      return apiError(result.error || "Failed to delete inquiry.", statusCode)
    }

    return apiSuccess({ deletedId: id }, 200, "Inquiry deleted successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete inquiry."
    return apiError(message, 500)
  }
}
