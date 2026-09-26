import { getCompanyIdentity } from "@/lib/content/cre-service"
import { NexusCompanyIdentityTab } from "@/components/nexus/NexusCompanyIdentityTab"

export const dynamic = "force-dynamic"

export default async function NexusCompanyPage() {
  const companyIdentity = await getCompanyIdentity()
  return <NexusCompanyIdentityTab identity={companyIdentity} />
}
