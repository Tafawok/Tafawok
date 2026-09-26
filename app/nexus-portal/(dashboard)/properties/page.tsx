import { getProperties } from "@/lib/content/cre-service"
import { NexusPropertiesTab } from "@/components/nexus/NexusPropertiesTab"

export const dynamic = "force-dynamic"

export default async function NexusPropertiesPage() {
  const properties = await getProperties()
  return <NexusPropertiesTab properties={properties} />
}
