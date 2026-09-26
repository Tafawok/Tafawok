import {
  getCorporateValues,
  getInvestmentPillars,
} from "@/lib/content/cre-service"
import { NexusValuesPillarsTab } from "@/components/nexus/NexusValuesPillarsTab"

export const dynamic = "force-dynamic"

export default async function NexusValuesPage() {
  const [values, pillars] = await Promise.all([
    getCorporateValues(),
    getInvestmentPillars(),
  ])

  return <NexusValuesPillarsTab values={values} pillars={pillars} />
}
