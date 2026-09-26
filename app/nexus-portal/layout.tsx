import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus Portal — Super Admin Control Suite | TAFAWOK CRE",
  description:
    "Enterprise content management dashboard for TAFAWOK Real Estate Investment & Contracting.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NexusPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {children}
    </div>
  )
}
