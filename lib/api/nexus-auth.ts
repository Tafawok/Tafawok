import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export interface AdminUserRecord {
  id: string
  email: string
  role: string
}

export type NexusAuthResult =
  | {
      authorized: true
      supabase: Awaited<ReturnType<typeof createClient>>
      user: { id: string; email?: string }
      admin: AdminUserRecord
    }
  | {
      authorized: false
      response: NextResponse
    }

/**
 * Validates that the incoming request is authenticated as a Super Admin.
 * Returns either authorized context or a pre-configured 401/403 NextResponse.
 */
export async function authenticateNexusAdmin(
  req?: Request
): Promise<NexusAuthResult> {
  try {
    const authHeader = req?.headers.get("authorization") || undefined
    const supabase = await createClient(authHeader)

    // Support both Bearer token from headers and cookie-based session
    const bearerToken =
      authHeader && /^bearer\s+/i.test(authHeader)
        ? authHeader.replace(/^bearer\s+/i, "").trim()
        : undefined

    const {
      data: { user },
      error: authError,
    } = await (bearerToken
      ? supabase.auth.getUser(bearerToken)
      : supabase.auth.getUser())

    if (authError || !user) {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            error: "Unauthorized: Active Super Admin session required.",
          },
          { status: 401 }
        ),
      }
    }

    const { data: adminRecord, error: adminError } = await supabase
      .from("admin_users")
      .select("id, email, role")
      .eq("id", user.id)
      .single()

    if (adminError || !adminRecord || adminRecord.role !== "super_admin") {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            error: "Forbidden: Super Administrator credentials required.",
          },
          { status: 403 }
        ),
      }
    }

    return {
      authorized: true,
      supabase,
      user,
      admin: adminRecord as AdminUserRecord,
    }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Authentication verification failed."
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          error: message,
        },
        { status: 500 }
      ),
    }
  }
}

/**
 * Standardized success response helper.
 */
export function apiSuccess<T>(data: T, status: number = 200, message?: string) {
  return NextResponse.json(
    {
      success: true,
      ...(message ? { message } : {}),
      data,
    },
    { status }
  )
}

/**
 * Standardized error response helper.
 */
export function apiError(
  message: string,
  status: number = 400,
  details?: unknown
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details ? { details } : {}),
    },
    { status }
  )
}

/**
 * Safely parses and validates a JSON object from an incoming Request.
 * Rejects empty bodies, syntax errors, and non-object payloads with descriptive 400 errors.
 */
export async function safeParseJson<T = Record<string, unknown>>(
  req: Request
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const text = await req.text()
    if (!text || !text.trim()) {
      return { success: false, error: "Request body cannot be empty." }
    }
    const data = JSON.parse(text)
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      return {
        success: false,
        error: "Request body must be a valid JSON object.",
      }
    }
    return { success: true, data: data as T }
  } catch (err: unknown) {
    const message =
      err instanceof SyntaxError
        ? "Malformed JSON payload in request body."
        : "Failed to parse request body."
    return { success: false, error: message }
  }
}

