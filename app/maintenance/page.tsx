import type { Metadata } from "next"
import { getMaintenanceSettings, getOwnerDetails } from "@/lib/content/cre-service"
import { MaintenanceClient } from "@/components/maintenance/MaintenanceClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Under Scheduled Maintenance | TAFAWOK CRE",
  description:
    "TAFAWOK Real Estate Investment & Contracting platforms are currently undergoing scheduled maintenance.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function MaintenancePage() {
  const [settings, ownerDetails] = await Promise.all([
    getMaintenanceSettings(),
    getOwnerDetails(),
  ])

  return (
    <MaintenanceClient
      settings={settings}
      ownerDetails={ownerDetails}
    />
  )
}
