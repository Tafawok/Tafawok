import { getHomepageSettings, getProperties } from "@/lib/content/cre-service"
import { NexusHomepageTab } from "@/components/nexus/NexusHomepageTab"

export const dynamic = "force-dynamic"

export default async function NexusHomepageManagementPage() {
  const [homepageSettings, properties] = await Promise.all([
    getHomepageSettings(),
    getProperties(),
  ])

  return (
    <NexusHomepageTab
      initialSettings={homepageSettings}
      properties={properties}
    />
  )
}
