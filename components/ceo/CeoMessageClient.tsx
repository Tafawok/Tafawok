"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CeoHeroSection } from "@/components/ceo/CeoHeroSection"
import { CeoAddressSection } from "@/components/ceo/CeoAddressSection"
import { CeoDoctrineSection } from "@/components/ceo/CeoDoctrineSection"
import { CeoDirectReachCard } from "@/components/ceo/CeoDirectReachCard"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import type { CeoProfile } from "@/types/cre"

const CHAPTERS = [
  { id: "executive-profile", labelKey: "ceoMessage.chapterProfile" },
  { id: "formal-address", labelKey: "ceoMessage.chapterAddress" },
  { id: "strategic-doctrine", labelKey: "ceoMessage.chapterDoctrine" },
  { id: "direct-reach", labelKey: "ceoMessage.chapterReach" },
]

interface CeoMessageClientProps {
  profile?: CeoProfile
}

export function CeoMessageClient({ profile }: CeoMessageClientProps) {
  const { t } = useLocaleStore()

  const items = CHAPTERS.map((ch) => ({
    id: ch.id,
    label: t(ch.labelKey),
  }))

  return (
    <div className="relative flex flex-col">
      <PageLineSidebar items={items} />
      <CeoHeroSection profile={profile} />
      <CeoAddressSection profile={profile} />
      <CeoDoctrineSection profile={profile} />
      <CeoDirectReachCard ownerDetails={profile?.directReach} />
    </div>
  )
}
