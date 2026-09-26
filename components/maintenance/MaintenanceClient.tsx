"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Wrench,
  Clock,
  Phone,
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
} from "lucide-react"
import { TafawokEmblem } from "@/components/layout/Logo"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { toast } from "sonner"
import type { MaintenanceSettings, OwnerContact } from "@/types/cre"

interface MaintenanceClientProps {
  settings: MaintenanceSettings
  ownerDetails?: OwnerContact
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPassed: boolean
}

function calculateTimeRemaining(targetIso?: string | null): TimeRemaining {
  if (!targetIso) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true }
  }

  const target = new Date(targetIso).getTime()
  const now = new Date().getTime()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isPassed: false }
}

export function MaintenanceClient({ settings, ownerDetails }: MaintenanceClientProps) {
  const router = useRouter()
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const [timeRemaining, setTimeRemaining] = React.useState<TimeRemaining>(() =>
    calculateTimeRemaining(settings.expectedBack)
  )
  const [showBypassInput, setShowBypassInput] = React.useState<boolean>(false)
  const [tokenInput, setTokenInput] = React.useState<string>("")
  const [submittingBypass, setSubmittingBypass] = React.useState<boolean>(false)

  // Live timer tick
  React.useEffect(() => {
    if (!settings.expectedBack) return

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(settings.expectedBack))
    }, 1000)

    return () => clearInterval(interval)
  }, [settings.expectedBack])

  const handleBypassSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingBypass(true)

    const expectedSecret = settings.bypassSecret || "tafawok_admin_bypass"

    if (tokenInput.trim() === expectedSecret) {
      document.cookie = "tafawok_maintenance_bypass=1; path=/; max-age=604800; SameSite=Lax"
      toast.success(
        isArabic
          ? "تم تفعيل تصريح الإدارة بنجاح! جاري توجيهك..."
          : "Admin bypass authorized! Redirecting to platform..."
      )
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 700)
    } else {
      toast.error(t("maintenance.invalidBypass"))
      setSubmittingBypass(false)
    }
  }

  const phone = settings.emergencyPhone || ownerDetails?.phone || "+201001740007"
  const email = settings.emergencyEmail || ownerDetails?.email || "info@tafawok.co"
  const hqAddress = ownerDetails?.headquarters

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background text-foreground">
      {/* Architectural Background Grid & Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 start-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px] dark:bg-primary/15" />

      {/* Top Header Bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <TafawokEmblem className="h-9 w-9 text-primary" />
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-foreground sm:text-base">
              {isArabic ? "شركة تفوق للاستثمار العقاري والمقاولات" : "TAFAWOK Real Estate & Contracting"}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
              CRE Infrastructure Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      {/* Main Center Architectural Monograph */}
      <main className="relative z-10 mx-auto my-auto flex w-full max-w-3xl flex-col items-center px-4 py-8 text-center sm:px-6">
        {/* Pulsing Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
          </span>
          <Wrench className="h-3.5 w-3.5" />
          <span>{t("maintenance.badge")}</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t(settings.headline)}
        </h1>

        {/* Message */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t(settings.message)}
        </p>

        {/* Live Countdown Display (if expectedBack is configured and not yet passed) */}
        {settings.expectedBack && !timeRemaining.isPassed && (
          <div className="mt-8 w-full max-w-md rounded-2xl border border-border/80 bg-card/60 p-5 shadow-sm backdrop-blur-md">
            <div className="mb-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>{isArabic ? "الوقت المتوقع لعودة المنصة للعمل" : "Estimated Platform Restoration"}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center" dir="ltr">
              <div className="rounded-xl border border-border/60 bg-secondary/50 p-2 sm:p-3">
                <span className="font-mono text-xl font-bold text-foreground sm:text-3xl">
                  {String(timeRemaining.days).padStart(2, "0")}
                </span>
                <span className="block text-[10px] font-medium text-muted-foreground uppercase">
                  {t("maintenance.countdownDays")}
                </span>
              </div>
              <div className="rounded-xl border border-border/60 bg-secondary/50 p-2 sm:p-3">
                <span className="font-mono text-xl font-bold text-foreground sm:text-3xl">
                  {String(timeRemaining.hours).padStart(2, "0")}
                </span>
                <span className="block text-[10px] font-medium text-muted-foreground uppercase">
                  {t("maintenance.countdownHours")}
                </span>
              </div>
              <div className="rounded-xl border border-border/60 bg-secondary/50 p-2 sm:p-3">
                <span className="font-mono text-xl font-bold text-foreground sm:text-3xl">
                  {String(timeRemaining.minutes).padStart(2, "0")}
                </span>
                <span className="block text-[10px] font-medium text-muted-foreground uppercase">
                  {t("maintenance.countdownMinutes")}
                </span>
              </div>
              <div className="rounded-xl border border-border/60 bg-secondary/50 p-2 sm:p-3">
                <span className="font-mono text-xl font-bold text-primary sm:text-3xl">
                  {String(timeRemaining.seconds).padStart(2, "0")}
                </span>
                <span className="block text-[10px] font-medium text-muted-foreground uppercase">
                  {t("maintenance.countdownSeconds")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Communication Channels */}
        <div className="mt-8 flex w-full max-w-xl flex-col items-center gap-3 rounded-xl border border-border/70 bg-card/40 p-4 text-xs backdrop-blur-sm sm:flex-row sm:justify-around sm:text-sm">
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            <PhoneNumber phone={phone} />
          </a>

          <span className="hidden text-border sm:inline">•</span>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4 text-primary" />
            <span>{email}</span>
          </a>

          {hqAddress && (
            <>
              <span className="hidden text-border sm:inline">•</span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="truncate max-w-[180px]">{t(hqAddress)}</span>
              </div>
            </>
          )}
        </div>

        {/* Admin Bypass Toggle & Token Input */}
        <div className="mt-8 flex flex-col items-center">
          {!showBypassInput ? (
            <button
              type="button"
              onClick={() => setShowBypassInput(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Lock className="h-3 w-3" />
              <span>{t("maintenance.adminBypass")}</span>
            </button>
          ) : (
            <form
              onSubmit={handleBypassSubmit}
              className="flex w-full max-w-sm items-center gap-1.5 rounded-lg border border-border bg-background p-1 shadow-sm"
            >
              <KeyRound className="ms-2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder={t("maintenance.bypassPlaceholder")}
                className="flex-1 bg-transparent px-2 py-1 text-xs outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              <button
                type="submit"
                disabled={submittingBypass || !tokenInput}
                className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {submittingBypass ? (
                  <CheckCircle2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <>
                    <span>{t("maintenance.bypassSubmit")}</span>
                    <ArrowIcon className="h-3 w-3" />
                  </>
                )}
              </button>
            </form>
          )}

          {showBypassInput && (
            <a
              href="/nexus-portal/login"
              className="mt-2 text-[11px] text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {isArabic ? "أو تسجيل الدخول إلى بوابة نكسوس الإدارية" : "Or log into Nexus Management Portal"}
            </a>
          )}
        </div>
      </main>

      {/* Bottom Footer Stamp */}
      <footer className="relative z-10 border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {isArabic ? "شركة تفوق للاستثمار العقاري والمقاولات. جميع الحقوق محفوظة." : "TAFAWOK Real Estate Investment & Contracting. All rights reserved."}
        </p>
      </footer>
    </div>
  )
}
