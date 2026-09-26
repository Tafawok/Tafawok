import { getCommercialDisciplines } from "@/lib/content/cre-service"
import { NexusDisciplinesTab } from "@/components/nexus/NexusDisciplinesTab"

export const dynamic = "force-dynamic"

export default async function NexusDisciplinesPage() {
  const disciplines = await getCommercialDisciplines()
  return <NexusDisciplinesTab disciplines={disciplines} />
}
