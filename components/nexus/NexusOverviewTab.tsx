"use client"

import * as React from "react"
import {
  Building2,
  Store,
  Briefcase,
  TrendingUp,
  History,
  Users,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Tables } from "@/types/database.types"
import type {
  Property,
  CommercialDiscipline,
  CorporateMetric,
  TimelineMilestone,
  ClientPartner,
} from "@/types/cre"

interface NexusOverviewTabProps {
  properties: Property[]
  disciplines: CommercialDiscipline[]
  metrics: CorporateMetric[]
  milestones: TimelineMilestone[]
  partners: ClientPartner[]
  inquiries: Tables<"inquiries">[]
  onSelectTab?: (tabId: string) => void
}

export function NexusOverviewTab({
  properties,
  disciplines,
  metrics,
  milestones,
  partners,
  inquiries,
  onSelectTab,
}: NexusOverviewTabProps) {
  void onSelectTab
  const totalStores = properties.reduce(
    (acc, p) => acc + (p.stores?.length || 0),
    0
  )
  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length

  const stats = [
    {
      label: "Commercial Assets",
      value: properties.length,
      sub: "Active Flagships & Plazas",
      icon: Building2,
      tab: "properties",
      accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Retail Tenants & Stores",
      value: totalStores,
      sub: "Across all asset proms",
      icon: Store,
      tab: "stores",
      accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Commercial Disciplines",
      value: disciplines.length,
      sub: "Core business sectors",
      icon: Briefcase,
      tab: "disciplines",
      accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Hero Metrics",
      value: metrics.length,
      sub: "Live corporate track record",
      icon: TrendingUp,
      tab: "metrics",
      accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Heritage Milestones",
      value: milestones.length,
      sub: "1974 – Present timeline",
      icon: History,
      tab: "timeline",
      accent: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    },
    {
      label: "Client & EPC Partners",
      value: partners.length,
      sub: "Tier-1 institutional credentials",
      icon: Users,
      tab: "partners",
      accent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      label: "Incoming Inquiries",
      value: inquiries.length,
      sub: `${newInquiriesCount} new submissions`,
      icon: MessageSquare,
      tab: "inquiries",
      accent:
        newInquiriesCount > 0
          ? "text-rose-500 bg-rose-500/10 border-rose-500/20"
          : "text-zinc-500 bg-zinc-500/10 border-zinc-500/20",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-br from-card via-card/90 to-primary/5 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase">
              <Sparkles className="size-4" />
              <span>Full Static Content Control</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome to the TAFAWOK Nexus Portal
            </h2>
            <p className="mt-1 max-w-2xl text-xs text-muted-foreground sm:text-sm">
              Manage all commercial portfolio data, retail directories,
              credentials, milestones, and site configuration directly. All
              mutations update your Supabase PostgreSQL 17 database and
              revalidate live Next.js pages instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/nexus-portal/properties">
              <Button
                className="bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Building2 className="me-1.5 size-4" />
                Manage Assets
              </Button>
            </Link>
            <Link href="/nexus-portal/inquiries">
              <Button
                variant="outline"
                className="text-xs"
              >
                <MessageSquare className="me-1.5 size-4" />
                View Inquiries ({inquiries.length})
              </Button>
            </Link>
          </div>
        </div>

        {/* Database Sync Status Badge */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium text-emerald-500">
            <CheckCircle2 className="size-4" />
            <span>Supabase Database Connected & In Sync</span>
          </div>
          <span className="hidden text-border sm:inline">•</span>
          <span>PostgreSQL 17 (AWS eu-west-1)</span>
          <span className="hidden text-border sm:inline">•</span>
          <span>Automatic Next.js On-Demand ISR Revalidation</span>
        </div>
      </div>

      {/* Grid of Content Modules */}
      <div>
        <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Content Domains & Entities
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <Link key={s.label} href={`/nexus-portal/${s.tab}`}>
                <Card
                  className="group cursor-pointer border-border/80 bg-card/60 transition-all hover:border-primary/40 hover:bg-card hover:shadow-lg"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      {s.label}
                    </CardTitle>
                    <div className={`rounded-lg border p-2 ${s.accent}`}>
                      <Icon className="size-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {s.value}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {s.sub}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Launchpad */}
      <div className="rounded-xl border border-border/80 bg-card/40 p-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Quick Content Actions
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/nexus-portal/properties">
            <Button variant="outline" size="sm" className="text-xs">
              🏢 Edit Flagship Assets
            </Button>
          </Link>
          <Link href="/nexus-portal/stores">
            <Button variant="outline" size="sm" className="text-xs">
              🏪 Edit Tenant Directory
            </Button>
          </Link>
          <Link href="/nexus-portal/metrics">
            <Button variant="outline" size="sm" className="text-xs">
              📊 Update Hero Metrics
            </Button>
          </Link>
          <Link href="/nexus-portal/ceo">
            <Button variant="outline" size="sm" className="text-xs">
              👤 CEO Statement & Doctrine
            </Button>
          </Link>
          <Link href="/nexus-portal/company">
            <Button variant="outline" size="sm" className="text-xs">
              📍 HQ Address & Coordinates
            </Button>
          </Link>
          <Link href="/nexus-portal/hse">
            <Button variant="outline" size="sm" className="text-xs">
              🛡️ HSE Charter & Standards
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
