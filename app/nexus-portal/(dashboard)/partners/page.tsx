import { getClientPartners } from "@/lib/content/cre-service"
import { NexusPartnersTab } from "@/components/nexus/NexusPartnersTab"

export const dynamic = "force-dynamic"

export default async function NexusPartnersPage() {
  const partners = await getClientPartners()
  return <NexusPartnersTab partners={partners} />
}
