import { getCeoProfile } from "@/lib/content/cre-service"
import { NexusCeoTab } from "@/components/nexus/NexusCeoTab"

export const dynamic = "force-dynamic"

export default async function NexusCeoPage() {
  const ceoProfile = await getCeoProfile()
  return <NexusCeoTab ceoProfile={ceoProfile} />
}
