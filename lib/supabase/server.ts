import { createServerClient } from "@supabase/ssr"
import { cookies, headers } from "next/headers"
import type { Database } from "@/types/database.types"

/**
 * Creates an authenticated Supabase server client bound to the incoming request cookies and authorization headers.
 */
export async function createClient(customAuthHeader?: string) {
  let authHeader = customAuthHeader
  if (!authHeader) {
    try {
      const headerStore = await headers()
      authHeader = headerStore.get("authorization") || undefined
    } catch {
      // outside request context
    }
  }

  const globalHeaders: Record<string, string> = {}
  if (authHeader && /^bearer\s+/i.test(authHeader)) {
    const token = authHeader.replace(/^bearer\s+/i, "").trim()
    if (token) {
      globalHeaders.Authorization = `Bearer ${token}`
    }
  }

  try {
    const cookieStore = await cookies()

    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
        global: {
          headers: globalHeaders,
        },
      }
    )
  } catch {
    // If called outside request context (e.g. SSG / background tasks / scripts), create client with empty cookies
    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
      {
        cookies: {
          getAll() {
            return []
          },
          setAll() {},
        },
        global: {
          headers: globalHeaders,
        },
      }
    )
  }
}

