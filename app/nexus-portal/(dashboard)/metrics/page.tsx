import { getCorporateMetrics } from "@/lib/content/cre-service"
import { NexusMetricsTab } from "@/components/nexus/NexusMetricsTab"

export const dynamic = "force-dynamic"

export default async function NexusMetricsPage() {
  const metrics = await getCorporateMetrics()
  return <NexusMetricsTab metrics={metrics} />
}
