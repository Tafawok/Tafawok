import { getProperties } from "@/lib/content/cre-service"
import { NexusStoresTab } from "@/components/nexus/NexusStoresTab"

export const dynamic = "force-dynamic"

export default async function NexusStoresPage() {
  const properties = await getProperties()
  return <NexusStoresTab properties={properties} />
}
