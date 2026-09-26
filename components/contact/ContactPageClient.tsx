"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import { MotionFade } from "@/components/motion/MotionFade"
import { ContactForm } from "@/components/contact/ContactForm"
import { OwnerCard } from "@/components/contact/OwnerCard"
import { HqMap } from "@/components/contact/HqMap"
import { OperatingHoursSection } from "@/components/contact/OperatingHoursSection"
import { DownloadProfileButton } from "@/components/shared/DownloadProfileButton"
import ContactLoading from "@/app/contact/loading"
import type { Property, CompanyIdentity, OwnerContact } from "@/types/cre"

interface ContactPageClientProps {
  properties?: Property[]
  identity?: CompanyIdentity
  ownerDetails?: OwnerContact
}

function ContactContent({
  properties,
  identity,
  ownerDetails,
}: ContactPageClientProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"
  const searchParams = useSearchParams()
  const propertyParam = searchParams.get("property") || ""

  const chapters = [
    { id: "inquiry-portal", label: t("contactPage.chapterInquiry") },
    { id: "owner-reach", label: t("contactPage.chapterOwner") },
    { id: "cairo-hq", label: t("contactPage.chapterHq") },
    { id: "operating-hours", label: t("contactPage.chapterHours") },
  ]

  return (
    <div className="relative flex flex-col">
      <PageLineSidebar
        items={chapters}
        title={isRtl ? "فهرس التواصل" : "Directory"}
      />

      {/* Hero / Monograph Header */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionFade direction="up" delay={0.05}>
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-bold tracking-wider text-primary uppercase">
                {t("contactPage.badge")}
              </span>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("contactPage.title")}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("contactPage.subtitle")}
              </p>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:space-y-24 lg:px-8">
          {/* Row 1: Dual Column Inquiry Form & Owner Reach */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left/Main Column: Inquiry Form */}
            <section id="inquiry-portal" className="scroll-mt-20 lg:col-span-7">
              <MotionFade direction="up" delay={0.1}>
                <ContactForm
                  initialProperty={propertyParam}
                  properties={properties}
                  ownerDetails={ownerDetails}
                />
              </MotionFade>
            </section>

            {/* Right/Secondary Column: Executive Owner Card & Download Corporate Profile */}
            <section id="owner-reach" className="scroll-mt-20 lg:col-span-5 space-y-6">
              <MotionFade direction="up" delay={0.15}>
                <OwnerCard ownerDetails={ownerDetails} />
              </MotionFade>
              <MotionFade direction="up" delay={0.2}>
                <DownloadProfileButton variant="contact" />
              </MotionFade>
            </section>
          </div>

          {/* Row 2: Cairo Executive Headquarters Map */}
          <section id="cairo-hq" className="scroll-mt-20">
            <MotionFade direction="up" delay={0.1}>
              <HqMap identity={identity} />
            </MotionFade>
          </section>

          {/* Row 3: Operating Schedule & SLA */}
          <section id="operating-hours" className="scroll-mt-20">
            <MotionFade direction="up" delay={0.1}>
              <OperatingHoursSection />
            </MotionFade>
          </section>
        </div>
      </div>
    </div>
  )
}

export function ContactPageClient(props: ContactPageClientProps) {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactContent {...props} />
    </Suspense>
  )
}
