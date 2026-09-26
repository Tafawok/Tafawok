"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ArrowRight, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { PropertyDropdown } from "@/components/layout/PropertyDropdown"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { MobileNav } from "@/components/layout/MobileNav"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { useUiStore } from "@/stores/useUiStore"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const { locale, t } = useLocaleStore()
  const { setMobileNavOpen } = useUiStore()
  const [scrolled, setScrolled] = React.useState(false)
  const isArabic = locale === "ar"

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  // Detect scroll to heighten border contrast / shadow
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname?.startsWith("/nexus-portal")) {
    return null
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md transition-all duration-200",
          scrolled
            ? "border-border py-2 shadow-sm"
            : "border-border/60 py-2.5 lg:py-3"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 xl:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-6">
            {/* Start: Brand Identity */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* Center: Desktop Navigation - tuned for lg (1024px) and xl */}
            <nav className="hidden items-center gap-0.5 text-xs font-medium lg:flex xl:gap-1.5 xl:text-sm">
              <Link
                href="/"
                className={cn(
                  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 select-none xl:px-3.5 xl:text-sm",
                  pathname === "/"
                    ? "bg-secondary/80 font-semibold text-foreground"
                    : "text-foreground/75 hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                {t("nav.home")}
              </Link>

              <Link
                href="/about"
                className={cn(
                  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 select-none xl:px-3.5 xl:text-sm",
                  pathname === "/about"
                    ? "bg-secondary/80 font-semibold text-foreground"
                    : "text-foreground/75 hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                {t("nav.about")}
              </Link>

              {/* Commercial Assets with Interactive Dropdown */}
              <PropertyDropdown />

              <Link
                href="/ceo-message"
                className={cn(
                  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 select-none xl:px-3.5 xl:text-sm",
                  pathname === "/ceo-message"
                    ? "bg-secondary/80 font-semibold text-foreground"
                    : "text-foreground/75 hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                {t("nav.ceo")}
              </Link>

              <Link
                href="/contact"
                className={cn(
                  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 select-none xl:px-3.5 xl:text-sm",
                  pathname === "/contact"
                    ? "bg-secondary/80 font-semibold text-foreground"
                    : "text-foreground/75 hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                {t("nav.contact")}
              </Link>
            </nav>

            {/* End: Utilities & Primary CTA - all sharing exact h-9 height */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 xl:gap-2.5">
              {/* Theme & Language Toggles */}
              <ThemeToggle />
              <LanguageToggle />

              {/* Primary Inquire CTA Button - matching h-9 height */}
              <Link
                href="/contact"
                className="hidden h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold whitespace-nowrap text-primary-foreground shadow-sm transition-all duration-150 select-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95 sm:inline-flex xl:px-4"
              >
                <span>{t("nav.inquireNow")}</span>
                <ArrowIcon className="h-3.5 w-3.5 opacity-90 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>

              {/* Mobile Hamburger Trigger - matching h-9 height */}
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label={t("nav.openMenu")}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border/70 text-foreground transition-colors hover:bg-secondary active:scale-95 lg:hidden"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out mobile navigation sheet */}
      <MobileNav />
    </>
  )
}
