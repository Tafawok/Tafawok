import { getInquiriesAction } from "@/lib/content/actions"
import { NexusInquiriesTab } from "@/components/nexus/NexusInquiriesTab"

export const dynamic = "force-dynamic"

export default async function NexusInquiriesPage() {
  const inquiries = await getInquiriesAction().catch(() => [])
  return <NexusInquiriesTab inquiries={inquiries} />
}
