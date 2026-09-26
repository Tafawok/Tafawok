import { redirect } from "next/navigation"
import { getCurrentAdmin, getInquiriesAction } from "@/lib/content/actions"
import { NexusDashboardLayout } from "@/components/nexus/NexusDashboardLayout"

export const dynamic = "force-dynamic"

export default async function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()

  if (!admin || admin.role !== "super_admin") {
    redirect("/nexus-portal/login")
  }

  // Get unread inquiries count for sidebar badge
  const inquiries = await getInquiriesAction().catch(() => [])
  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length

  return (
    <NexusDashboardLayout
      admin={admin}
      unreadInquiriesCount={newInquiriesCount}
    >
      {children}
    </NexusDashboardLayout>
  )
}
