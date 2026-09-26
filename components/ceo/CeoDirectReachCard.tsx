"use client"

import React from "react"
import Link from "next/link"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { OWNER_DETAILS } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { Phone, ArrowRight, ArrowLeft } from "lucide-react"
import type { OwnerContact } from "@/types/cre"

interface CeoDirectReachCardProps {
  ownerDetails?: OwnerContact
}

export function CeoDirectReachCard({
  ownerDetails = OWNER_DETAILS,
}: CeoDirectReachCardProps) {
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  const details = ownerDetails || OWNER_DETAILS
  const cleanPhone = details.phone.replace(/[^+\d]/g, "")

  return (
    <section
      id="direct-reach"
      className="relative scroll-mt-20 border-b border-border/70 py-16 sm:py-24"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <MotionFade direction="up" delay={0.05}>
          <div className="text-center">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {isRtl
                ? "تواصل مباشر مع الإدارة التنفيذية"
                : "Direct Engagement with Executive Leadership"}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {isRtl
                ? "لبحث استئجار المقرات الإدارية الكبرى، الشراكات الاستثمارية، والتطوير التجاري المشترك."
                : "For corporate headquarters leasing, joint commercial ventures, and institutional investor partnerships."}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${cleanPhone}`}
                className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto"
              >
                <Phone className="size-4 rtl:-scale-x-100" />
                <span>
                  {isRtl ? "الاتصال بالمكتب التنفيذي" : "Call Executive Office"}
                </span>
              </a>

              <Link
                href="/contact"
                className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/80 bg-card px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:border-primary/50 hover:bg-secondary/40 active:scale-[0.98] sm:w-auto"
              >
                <span>
                  {isRtl ? "طلب استفسار رسمي" : "Submit Formal Inquiry"}
                </span>
                <ArrowIcon className="size-4" />
              </Link>
            </div>
          </div>
        </MotionFade>
      </div>
    </section>
  )
}
