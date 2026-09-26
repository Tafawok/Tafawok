import {
  getProperties,
  getCommercialDisciplines,
  getCorporateMetrics,
  getTimelineMilestones,
  getClientPartners,
} from "@/lib/content/cre-service"
import { getInquiriesAction } from "@/lib/content/actions"
import { NexusOverviewTab } from "@/components/nexus/NexusOverviewTab"

export const dynamic = "force-dynamic"

export default async function NexusOverviewPage() {
  const [properties, disciplines, metrics, milestones, partners, inquiries] =
    await Promise.all([
      getProperties(),
      getCommercialDisciplines(),
      getCorporateMetrics(),
      getTimelineMilestones(),
      getClientPartners(),
      getInquiriesAction().catch(() => []),
    ])

  return (
    <NexusOverviewTab
      properties={properties}
      disciplines={disciplines}
      metrics={metrics}
      milestones={milestones}
      partners={partners}
      inquiries={inquiries}
    />
  )
}
