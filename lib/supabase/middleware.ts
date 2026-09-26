import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import type { Database } from "@/types/database.types"

/**
 * Updates the user's session cookies and enforces auth protection on `/nexus-portal` routes.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Fetch the current user securely using getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // 1. Bypass and whitelist: Static assets, Nexus Portal, and Auth
  const isNexusPortal = pathname.startsWith("/nexus-portal")
  const isMaintenancePage = pathname === "/maintenance"
  const isApiRoute = pathname.startsWith("/api")

  // Protect /nexus-portal routes
  if (isNexusPortal) {
    const isLoginPage = pathname === "/nexus-portal/login"

    // If not authenticated and trying to access a protected portal page
    if (!user && !isLoginPage) {
      const url = request.nextUrl.clone()
      url.pathname = "/nexus-portal/login"
      return NextResponse.redirect(url)
    }

    // If authenticated and visiting the login page, redirect to the portal dashboard
    if (user && isLoginPage) {
      const url = request.nextUrl.clone()
      url.pathname = "/nexus-portal"
      return NextResponse.redirect(url)
    }

    // Allow portal navigation
    return supabaseResponse
  }

  // 2. Determine maintenance mode status & bypass secret
  let isMaintenance =
    process.env.MAINTENANCE_MODE === "true" ||
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"
  let bypassSecret = "tafawok_admin_bypass"

  try {
    const { data: settingRow } = await supabase
      .from("site_settings")
      .select("data")
      .eq("key", "maintenance_mode")
      .single()

    if (
      settingRow?.data &&
      typeof settingRow.data === "object" &&
      "enabled" in settingRow.data
    ) {
      const data = settingRow.data as {
        enabled?: boolean
        bypassSecret?: string
      }
      if (data.enabled !== undefined) {
        isMaintenance = isMaintenance || !!data.enabled
      }
      if (data.bypassSecret) {
        bypassSecret = data.bypassSecret
      }
    }
  } catch {
    // If DB check fails, rely on environment flag
  }

  // Check if request carries bypass secret query parameter (?bypass=... or ?bypass_maintenance=...)
  const queryBypass =
    request.nextUrl.searchParams.get("bypass") ||
    request.nextUrl.searchParams.get("bypass_maintenance")

  const hasValidQueryBypass = queryBypass && queryBypass === bypassSecret

  // Check bypass cookie or authenticated admin
  const hasBypassCookie =
    request.cookies.get("tafawok_maintenance_bypass")?.value === "1"
  const isBypassed = hasValidQueryBypass || hasBypassCookie || !!user

  // If query bypass was provided, set cookie on response
  if (hasValidQueryBypass) {
    const cleanUrl = request.nextUrl.clone()
    cleanUrl.searchParams.delete("bypass")
    cleanUrl.searchParams.delete("bypass_maintenance")

    const redirectRes = NextResponse.redirect(cleanUrl)
    redirectRes.cookies.set("tafawok_maintenance_bypass", "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    })
    return redirectRes
  }

  // 3. Maintenance routing enforcement
  if (isMaintenance) {
    if (!isBypassed) {
      // Non-bypassed visitors on any public route get redirected to /maintenance
      if (!isMaintenancePage && !isApiRoute) {
        const url = request.nextUrl.clone()
        url.pathname = "/maintenance"
        return NextResponse.redirect(url)
      }
    } else {
      // Bypassed visitors visiting /maintenance directly get redirected back to /
      if (isMaintenancePage) {
        const url = request.nextUrl.clone()
        url.pathname = "/"
        return NextResponse.redirect(url)
      }
    }
  } else {
    // Maintenance is OFF: If anyone visits /maintenance directly, redirect to /
    if (isMaintenancePage) {
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

