import { getTimelineMilestones } from "@/lib/content/cre-service"
import { NexusTimelineTab } from "@/components/nexus/NexusTimelineTab"

export const dynamic = "force-dynamic"

export default async function NexusTimelinePage() {
  const milestones = await getTimelineMilestones()
  return <NexusTimelineTab milestones={milestones} />
}
