import { getMaintenanceSettings } from "@/lib/content/cre-service"
import { NexusMaintenanceTab } from "@/components/nexus/NexusMaintenanceTab"

export const dynamic = "force-dynamic"

export default async function NexusMaintenancePage() {
  const maintenanceSettings = await getMaintenanceSettings()

  return <NexusMaintenanceTab initialSettings={maintenanceSettings} />
}
