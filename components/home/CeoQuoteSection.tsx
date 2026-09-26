"use client"

import Link from "next/link"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { OWNER_DETAILS, UI_DICTIONARY } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { Phone, Mail, MessageSquare, ArrowRight, ArrowLeft } from "lucide-react"
import type { OwnerContact } from "@/types/cre"

interface CeoQuoteSectionProps {
  ownerDetails?: OwnerContact
}

export function CeoQuoteSection({
  ownerDetails = OWNER_DETAILS,
}: CeoQuoteSectionProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  const details = ownerDetails || OWNER_DETAILS

  return (
    <section
      id="leadership"
      className="relative scroll-mt-20 border-b border-border/60 bg-background py-20 md:py-28 lg:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionFade delay={0.05} direction="up">
          {/* Monumental Raw Editorial Quote */}
          <blockquote className="mt-6 text-xl font-medium tracking-tight text-foreground sm:mt-8 sm:text-2xl md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl">
            &ldquo;{t(details.visionSnippet)}&rdquo;
          </blockquote>

          {/* Author Byline & Direct Reach Bar */}
          <div className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-border/70 pt-8 sm:mt-12 md:flex-row md:items-end">
            {/* Author */}
            <div>
              <div className="text-lg font-black text-foreground sm:text-xl md:text-2xl">
                {t(details.name)}
              </div>
              <div className="mt-1 text-xs font-semibold text-primary sm:text-sm">
                {t(details.role)}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground sm:text-xs">
                {t(details.experience)} • {t(details.headquarters)}
              </div>

              <div className="mt-3 sm:mt-4">
                <Link
                  href="/ceo-message"
                  className="cursor-target inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span>{t(UI_DICTIONARY.home.ceoReadFull)}</span>
                  <ArrowIcon className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Direct Executive Access Links — Minimalist & Architectural */}
            <div className="flex w-full flex-col items-stretch gap-2.5 text-xs sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <a
                href={`tel:${details.phone}`}
                className="cursor-target inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-muted/40 px-4 py-2.5 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="size-3.5 shrink-0 text-primary" />
                <PhoneNumber phone={details.phone} />
              </a>

              <a
                href={`https://wa.me/${details.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
              >
                <MessageSquare className="size-3.5 shrink-0" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${details.email}`}
                className="cursor-target inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-muted/40 px-4 py-2.5 font-mono font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Mail className="size-3.5 shrink-0 text-primary" />
                <span>{details.email}</span>
              </a>
            </div>
          </div>
        </MotionFade>
      </div>
    </section>
  )
}
