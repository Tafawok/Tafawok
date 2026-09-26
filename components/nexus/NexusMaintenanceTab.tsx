"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  KeyRound,
  Copy,
  ExternalLink,
  Phone,
  Mail,
  Loader2,
  ShieldAlert,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { saveMaintenanceSettingsAction } from "@/lib/content/actions"
import type { MaintenanceSettings } from "@/types/cre"

interface NexusMaintenanceTabProps {
  initialSettings: MaintenanceSettings
}

export function NexusMaintenanceTab({ initialSettings }: NexusMaintenanceTabProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = React.useState(false)

  // Form State
  const [enabled, setEnabled] = React.useState(initialSettings.enabled)
  const [titleEn, setTitleEn] = React.useState(initialSettings.title.en)
  const [titleAr, setTitleAr] = React.useState(initialSettings.title.ar)
  const [headlineEn, setHeadlineEn] = React.useState(initialSettings.headline.en)
  const [headlineAr, setHeadlineAr] = React.useState(initialSettings.headline.ar)
  const [messageEn, setMessageEn] = React.useState(initialSettings.message.en)
  const [messageAr, setMessageAr] = React.useState(initialSettings.message.ar)
  const [expectedBack, setExpectedBack] = React.useState(
    initialSettings.expectedBack ? initialSettings.expectedBack.slice(0, 16) : ""
  )
  const [bypassSecret, setBypassSecret] = React.useState(
    initialSettings.bypassSecret || "tafawok_admin_bypass"
  )
  const [emergencyPhone, setEmergencyPhone] = React.useState(
    initialSettings.emergencyPhone || "+201001740007"
  )
  const [emergencyEmail, setEmergencyEmail] = React.useState(
    initialSettings.emergencyEmail || "info@tafawok.co"
  )

  const handleCopyBypassLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/?bypass=${encodeURIComponent(bypassSecret)}`
      navigator.clipboard?.writeText(url)
      toast.success("Bypass link copied to clipboard!")
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const payload: MaintenanceSettings = {
        enabled,
        title: { en: titleEn.trim(), ar: titleAr.trim() },
        headline: { en: headlineEn.trim(), ar: headlineAr.trim() },
        message: { en: messageEn.trim(), ar: messageAr.trim() },
        expectedBack: expectedBack ? new Date(expectedBack).toISOString() : null,
        bypassSecret: bypassSecret.trim() || "tafawok_admin_bypass",
        allowAdminBypass: true,
        emergencyPhone: emergencyPhone.trim(),
        emergencyEmail: emergencyEmail.trim(),
      }

      await saveMaintenanceSettingsAction(payload)
      toast.success("Maintenance settings saved successfully!")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save maintenance settings.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleQuickToggle = async () => {
    const nextState = !enabled
    setEnabled(nextState)
    setSubmitting(true)

    try {
      const payload: MaintenanceSettings = {
        enabled: nextState,
        title: { en: titleEn.trim(), ar: titleAr.trim() },
        headline: { en: headlineEn.trim(), ar: headlineAr.trim() },
        message: { en: messageEn.trim(), ar: messageAr.trim() },
        expectedBack: expectedBack ? new Date(expectedBack).toISOString() : null,
        bypassSecret: bypassSecret.trim() || "tafawok_admin_bypass",
        allowAdminBypass: true,
        emergencyPhone: emergencyPhone.trim(),
        emergencyEmail: emergencyEmail.trim(),
      }

      await saveMaintenanceSettingsAction(payload)
      toast.success(
        nextState
          ? "⚠️ Maintenance mode is now ACTIVE for the public!"
          : "✅ Maintenance mode deactivated. Public site is LIVE!"
      )
      router.refresh()
    } catch (err) {
      setEnabled(!nextState)
      toast.error(err instanceof Error ? err.message : "Failed to toggle maintenance mode.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Maintenance Mode Control Center
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Control the site-wide maintenance screen, live countdown timer, and manage administrator bypass tokens.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={enabled ? "destructive" : "default"}
            onClick={handleQuickToggle}
            disabled={submitting}
            className="cursor-pointer gap-2"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : enabled ? (
              <>
                <ShieldAlert className="h-4 w-4" />
                <span>Turn OFF Maintenance</span>
              </>
            ) : (
              <>
                <Wrench className="h-4 w-4" />
                <span>Activate Maintenance Mode</span>
              </>
            )}
          </Button>

          <a
            href="/maintenance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Preview Screen</span>
          </a>
        </div>
      </div>

      {/* Prominent Status Banner */}
      <Card
        className={`border-2 ${
          enabled
            ? "border-amber-500 bg-amber-500/10 text-amber-900 dark:border-amber-400 dark:bg-amber-400/10 dark:text-amber-100"
            : "border-emerald-500/40 bg-emerald-500/5 text-foreground"
        }`}
      >
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {enabled ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                <AlertTriangle className="h-5 w-5 animate-pulse" />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">
                  {enabled ? "Maintenance Mode is ACTIVE" : "Public Platform is LIVE"}
                </h3>
                <Badge variant={enabled ? "destructive" : "default"}>
                  {enabled ? "Traffic Blocked" : "Normal Operations"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {enabled
                  ? "Non-bypassed public traffic visiting the website is automatically redirected to the Maintenance page."
                  : "All public pages (Home, About, Properties, Activities, CEO Message, Contact) are functioning normally."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyBypassLink}
              className="gap-1.5 cursor-pointer text-xs"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Bypass Link</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Configuration Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Content & Messaging</CardTitle>
            <CardDescription>
              Configure the bilingual headlines, detailed messages, and estimated return schedule shown on the screen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Title Bilingual */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="maint-title-en">Page Tab Title (English)</Label>
                <Input
                  id="maint-title-en"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maint-title-ar" className="text-right block" dir="rtl">
                  عنوان تبويب الصفحة (بالعربية)
                </Label>
                <Input
                  id="maint-title-ar"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Headline Bilingual */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="maint-head-en">Main Headline (English)</Label>
                <Input
                  id="maint-head-en"
                  value={headlineEn}
                  onChange={(e) => setHeadlineEn(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maint-head-ar" className="text-right block" dir="rtl">
                  العنوان الرئيسي بالصفحة (بالعربية)
                </Label>
                <Input
                  id="maint-head-ar"
                  value={headlineAr}
                  onChange={(e) => setHeadlineAr(e.target.value)}
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Detailed Message Bilingual */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="maint-msg-en">Official Statement (English)</Label>
                <Textarea
                  id="maint-msg-en"
                  value={messageEn}
                  onChange={(e) => setMessageEn(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maint-msg-ar" className="text-right block" dir="rtl">
                  البيان والتوضيح الرسمي (بالعربية)
                </Label>
                <Textarea
                  id="maint-msg-ar"
                  value={messageAr}
                  onChange={(e) => setMessageAr(e.target.value)}
                  rows={4}
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Estimated Return Schedule */}
            <div className="rounded-xl border border-border/70 bg-secondary/20 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Estimated Platform Return (Countdown Timer)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                When specified, a live Days : Hours : Minutes : Seconds countdown timer will be rendered on the maintenance screen.
              </p>
              <div className="max-w-md">
                <Input
                  type="datetime-local"
                  value={expectedBack}
                  onChange={(e) => setExpectedBack(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Access Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Bypass Key & Emergency Communication</CardTitle>
            <CardDescription>
              Define the bypass token for testing and emergency contact channels displayed during maintenance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Bypass Secret Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="maint-secret">Admin Bypass Secret Token</Label>
                <div className="relative">
                  <KeyRound className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="maint-secret"
                    value={bypassSecret}
                    onChange={(e) => setBypassSecret(e.target.value)}
                    className="pe-24 ps-9"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleCopyBypassLink}
                    className="absolute end-1.5 top-1/2 -translate-y-1/2 rounded bg-secondary px-2 py-1 text-[11px] font-medium text-foreground hover:bg-secondary/80 cursor-pointer"
                  >
                    Copy Link
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Anyone accessing the website with <code className="rounded bg-muted px-1">?bypass={bypassSecret}</code> will immediately bypass the maintenance screen.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label>Super Admin Protection</Label>
                <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
                  Logged-in Super Admins on the Nexus Portal are automatically whitelisted and can browse the public site freely without needing a token.
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="maint-phone">Emergency Telephone Hotline</Label>
                <div className="relative">
                  <Phone className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="maint-phone"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="ps-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maint-email">Emergency Inquiries Corporate Email</Label>
                <div className="relative">
                  <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="maint-email"
                    value={emergencyEmail}
                    onChange={(e) => setEmergencyEmail(e.target.value)}
                    className="ps-9"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={submitting}
            className="cursor-pointer px-6"
          >
            {submitting ? (
              <>
                <Loader2 className="me-2 h-4 w-4 animate-spin" />
                Saving Configuration...
              </>
            ) : (
              "Save All Maintenance Settings"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
