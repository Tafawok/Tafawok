"use client"

import React, { useState } from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { OWNER_DETAILS } from "@/content/cre-data"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import {
  Phone,
  MessageSquare,
  Mail,
  Copy,
  Check,
  Building2,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { OwnerContact } from "@/types/cre"

interface OwnerCardProps {
  className?: string
  ownerDetails?: OwnerContact
}

export function OwnerCard({
  className = "",
  ownerDetails = OWNER_DETAILS,
}: OwnerCardProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const [copied, setCopied] = useState(false)
  const details = ownerDetails || OWNER_DETAILS

  const cleanPhone = details.phone.replace(/[^+\d]/g, "")
  const cleanAltPhone = details.altPhone.replace(/[^+\d]/g, "")
  const whatsappUrl = `https://wa.me/${details.whatsapp}?text=${encodeURIComponent(
    isRtl
      ? "مرحباً، أود الاستفسار عن مشروعات شركة تفوق للاستثمار العقاري والمقاولات."
      : "Hello, I would like to inquire about TAFAWOK commercial properties and contracting services."
  )}`

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(details.phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card/60 p-6 shadow-xs sm:p-8",
        className
      )}
    >
      {/* Category Eyebrow */}
      <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-4">
        <span className="font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
          {t("contactPage.ownerCardBadge")}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
          <Award className="size-3" />
          <span>25+ Yrs Leadership</span>
        </span>
      </div>

      {/* Profile Header */}
      <div className="mt-5 space-y-2">
        <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          {details.name[locale]}
        </h3>
        <p className="text-xs font-bold text-primary sm:text-sm">
          {details.role[locale]}
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {t("contactPage.ownerCardSubtitle")}
        </p>
      </div>

      {/* Credentials Summary */}
      <div className="mt-6 rounded-xl border border-border/70 bg-background/50 p-3.5 text-xs text-muted-foreground">
        <p className="leading-relaxed">{details.experience[locale]}</p>
      </div>

      {/* Direct Contact Coordinates */}
      <div className="mt-6 space-y-4">
        {/* Primary Phone */}
        <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Phone className="size-4 rtl:-scale-x-100" />
            </div>
            <div>
              <span className="block text-[10px] font-semibold text-muted-foreground uppercase">
                {t("contactPage.callDirect")}
              </span>
              <a
                href={`tel:${cleanPhone}`}
                className="text-sm font-bold text-foreground transition-colors hover:text-primary"
              >
                <PhoneNumber phone={details.phone} />
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyPhone}
            title={t("contactPage.copyPhone")}
            className="cursor-target inline-flex items-center gap-1 rounded-lg border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
          >
            {copied ? (
              <>
                <Check className="size-3 text-primary" />
                <span className="font-semibold text-primary">
                  {t("contactPage.phoneCopied")}
                </span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>{t("contactPage.copyPhone")}</span>
              </>
            )}
          </button>
        </div>

        {/* Alternate Executive Line */}
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
            <Phone className="size-4 rtl:-scale-x-100" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-muted-foreground uppercase">
              {isRtl ? "الخط التنفيذي الإضافي" : "Secondary Line"}
            </span>
            <a
              href={`tel:${cleanAltPhone}`}
              className="text-sm font-bold text-foreground transition-colors hover:text-primary"
            >
              <PhoneNumber phone={details.altPhone} />
            </a>
          </div>
        </div>

        {/* Executive Email */}
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Mail className="size-4" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-muted-foreground uppercase">
              {t("contactPage.emailDirect")}
            </span>
            <a
              href={`mailto:${details.email}`}
              className="text-sm font-bold text-foreground transition-colors hover:text-primary"
            >
              {details.email}
            </a>
          </div>
        </div>

        {/* Cairo Headquarters Location */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <Building2 className="size-4" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-muted-foreground uppercase">
              {t("contactPage.chapterHq")}
            </span>
            <span className="text-xs leading-relaxed font-semibold text-foreground">
              {details.headquarters[locale]}
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp Action CTA */}
      <div className="mt-8 border-t border-border/70 pt-6">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98] sm:text-sm"
        >
          <MessageSquare className="size-4" />
          <span>{t("contactPage.whatsappDirect")}</span>
        </a>
      </div>
    </div>
  )
}
