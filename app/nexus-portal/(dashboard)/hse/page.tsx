import { getHseCharter } from "@/lib/content/cre-service"
import { NexusHseTab } from "@/components/nexus/NexusHseTab"

export const dynamic = "force-dynamic"

export default async function NexusHsePage() {
  const hseCharter = await getHseCharter()
  return <NexusHseTab hseCharter={hseCharter} />
}
