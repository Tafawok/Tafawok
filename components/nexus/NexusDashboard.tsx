"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Store,
  Briefcase,
  TrendingUp,
  History,
  Diamond,
  Users,
  UserCheck,
  Building,
  ShieldCheck,
  MessageSquare,
  ExternalLink,
  LogOut,
  Loader2,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { signOutAction } from "@/lib/content/actions"
import { TafawokEmblem } from "@/components/layout/Logo"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

import { NexusOverviewTab } from "@/components/nexus/NexusOverviewTab"
import { NexusPropertiesTab } from "@/components/nexus/NexusPropertiesTab"
import { NexusStoresTab } from "@/components/nexus/NexusStoresTab"
import { NexusDisciplinesTab } from "@/components/nexus/NexusDisciplinesTab"
import { NexusMetricsTab } from "@/components/nexus/NexusMetricsTab"
import { NexusTimelineTab } from "@/components/nexus/NexusTimelineTab"
import { NexusValuesPillarsTab } from "@/components/nexus/NexusValuesPillarsTab"
import { NexusPartnersTab } from "@/components/nexus/NexusPartnersTab"
import { NexusCeoTab } from "@/components/nexus/NexusCeoTab"
import { NexusCompanyIdentityTab } from "@/components/nexus/NexusCompanyIdentityTab"
import { NexusHseTab } from "@/components/nexus/NexusHseTab"
import { NexusInquiriesTab } from "@/components/nexus/NexusInquiriesTab"

import type { Tables } from "@/types/database.types"
import type {
  Property,
  CommercialDiscipline,
  CorporateMetric,
  TimelineMilestone,
  CorporateValue,
  InvestmentPillar,
  ClientPartner,
  CeoProfile,
  HseCharter,
  CompanyIdentity,
} from "@/types/cre"

interface NexusDashboardProps {
  admin?: { email: string; role: string } | null
  properties: Property[]
  disciplines: CommercialDiscipline[]
  metrics: CorporateMetric[]
  milestones: TimelineMilestone[]
  values: CorporateValue[]
  pillars: InvestmentPillar[]
  partners: ClientPartner[]
  companyIdentity: CompanyIdentity
  ceoProfile: CeoProfile
  hseCharter: HseCharter
  inquiries: Tables<"inquiries">[]
}

export function NexusDashboard({
  admin,
  properties,
  disciplines,
  metrics,
  milestones,
  values,
  pillars,
  partners,
  companyIdentity,
  ceoProfile,
  hseCharter,
  inquiries,
}: NexusDashboardProps) {
  const router = useRouter()
  const { locale } = useLocaleStore()
  const isArabic = locale === "ar"

  const [activeTab, setActiveTab] = React.useState<string>("overview")
  const [signingOut, setSigningOut] = React.useState<boolean>(false)

  const totalStores = React.useMemo(
    () => properties.reduce((acc, p) => acc + (p.stores?.length || 0), 0),
    [properties]
  )
  const newInquiriesCount = React.useMemo(
    () => inquiries.filter((i) => i.status === "new").length,
    [inquiries]
  )

  const handleRefresh = () => {
    router.refresh()
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOutAction()
    } catch {
      toast.error("Failed to sign out.")
      setSigningOut(false)
    }
  }

  const navigationGroups = React.useMemo(
    () => [
      {
        id: "portfolio",
        label: "Commercial Portfolio",
        labelAr: "المحفظة الاستثمارية",
        items: [
          {
            id: "overview",
            label: "Dashboard Overview",
            labelAr: "لوحة التحكم الشاملة",
            icon: LayoutDashboard,
            badge: null,
            badgeVariant: undefined,
            description:
              "System overview, high-level metrics, and portfolio quick actions.",
          },
          {
            id: "properties",
            label: "Commercial Assets",
            labelAr: "الأصول التجارية",
            icon: Building2,
            badge: properties.length,
            badgeVariant: undefined,
            description:
              "Prime commercial developments, plazas, specs, and multimedia galleries.",
          },
          {
            id: "stores",
            label: "Retail Directory",
            labelAr: "دليل المستأجرين",
            icon: Store,
            badge: totalStores,
            badgeVariant: undefined,
            description:
              "Retail tenants, unit allocations, operating statuses, and floor plans.",
          },
          {
            id: "disciplines",
            label: "Sectors & Disciplines",
            labelAr: "قطاعات التطوير",
            icon: Briefcase,
            badge: disciplines.length,
            badgeVariant: undefined,
            description:
              "Core commercial disciplines, EPC capabilities, and sector scope.",
          },
        ],
      },
      {
        id: "heritage",
        label: "Heritage & Scale",
        labelAr: "الإرث والأرقام",
        items: [
          {
            id: "metrics",
            label: "Corporate Benchmarks",
            labelAr: "المؤشرات والأرقام",
            icon: TrendingUp,
            badge: metrics.length,
            badgeVariant: undefined,
            description:
              "Hero numerical benchmarks, square meters delivered, and capital volume.",
          },
          {
            id: "timeline",
            label: "Heritage Timeline",
            labelAr: "السجل التاريخي",
            icon: History,
            badge: milestones.length,
            badgeVariant: undefined,
            description:
              "Chronological milestone entries dating back to foundation in 1974.",
          },
          {
            id: "values",
            label: "Values & Pillars",
            labelAr: "القيم والمحاور",
            icon: Diamond,
            badge: values.length + pillars.length,
            badgeVariant: undefined,
            description:
              "Institutional code, architectural principles, and strategic thesis.",
          },
          {
            id: "partners",
            label: "Partners & Clients",
            labelAr: "الشركاء والعملاء",
            icon: Users,
            badge: partners.length,
            badgeVariant: undefined,
            description:
              "Tier-1 energy, EPC corporations, and anchor commercial retail brands.",
          },
        ],
      },
      {
        id: "governance",
        label: "Leadership & HQ",
        labelAr: "القيادة والمقر",
        items: [
          {
            id: "ceo",
            label: "CEO Profile & Vision",
            labelAr: "رؤية الرئيس التنفيذي",
            icon: UserCheck,
            badge: null,
            badgeVariant: undefined,
            description:
              "Eng. Tarek Ahmed's executive leadership statement and credentials.",
          },
          {
            id: "identity",
            label: "HQ Coordinates",
            labelAr: "بيانات المقر والتواصل",
            icon: Building,
            badge: null,
            badgeVariant: undefined,
            description:
              "Official contact points, Cairo HQ coordinates, and commercial registry.",
          },
          {
            id: "hse",
            label: "HSE & Governance",
            labelAr: "السلامة والجودة (HSE)",
            icon: ShieldCheck,
            badge: null,
            badgeVariant: undefined,
            description:
              "Zero-Harm charter, ISO certifications, and structural safety protocols.",
          },
        ],
      },
      {
        id: "communications",
        label: "Inbound Leads",
        labelAr: "التواصل والطلبات",
        items: [
          {
            id: "inquiries",
            label: "Inquiries & RFQs",
            labelAr: "الطلبات والمراسلات",
            icon: MessageSquare,
            badge:
              newInquiriesCount > 0
                ? `${newInquiriesCount} new`
                : inquiries.length,
            badgeVariant: (newInquiriesCount > 0
              ? "destructive"
              : "secondary") as "destructive" | "secondary",
            description:
              "Live investor, leasing, and EPC inquiries received via website forms.",
          },
        ],
      },
    ],
    [
      properties.length,
      totalStores,
      disciplines.length,
      metrics.length,
      milestones.length,
      values.length,
      pillars.length,
      partners.length,
      inquiries.length,
      newInquiriesCount,
    ]
  )

  const activeItem = React.useMemo(() => {
    for (const group of navigationGroups) {
      const found = group.items.find((i) => i.id === activeTab)
      if (found) return found
    }
    return navigationGroups[0].items[0]
  }, [navigationGroups, activeTab])

  const ActiveIcon = activeItem.icon

  return (
    <SidebarProvider defaultOpen={true}>
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="flex min-h-screen w-full bg-background text-foreground"
      >
        {/* SHADCN SIDEBAR */}
        <Sidebar
          collapsible="icon"
          variant="sidebar"
          side={isArabic ? "right" : "left"}
          dir={isArabic ? "rtl" : "ltr"}
          className="border-sidebar-border bg-sidebar"
        >
          {/* SIDEBAR HEADER: TAFAWOK LOGO */}
          <SidebarHeader className="border-b border-sidebar-border/60 p-3.5">
            <Link
              href="/nexus-portal"
              className="flex items-center gap-3 px-1 outline-none group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              aria-label="TAFAWOK Nexus Portal"
            >
              <TafawokEmblem className="size-8 shrink-0 text-foreground transition-opacity hover:opacity-85" />
              <div className="flex flex-col justify-center overflow-hidden group-data-[collapsible=icon]:hidden">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-[15px] font-black tracking-[0.12em] text-foreground uppercase">
                    {isArabic ? "تَفَـوُّق" : "TAFAWOK"}
                  </span>
                  <span className="rounded-sm bg-primary/15 px-1 py-0.5 text-[9px] font-bold text-primary uppercase">
                    Nexus
                  </span>
                </div>
                <span className="mt-1 text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {isArabic
                    ? "للاستثمار العقاري والمقاولات"
                    : "Real Estate & Contracting"}
                </span>
              </div>
            </Link>
          </SidebarHeader>

          {/* SIDEBAR CONTENT */}
          <SidebarContent className="px-0 py-2">
            {navigationGroups.map((group, groupIndex) => (
              <React.Fragment key={group.id}>
                {groupIndex > 0 && <SidebarSeparator className="my-1.5" />}
                <SidebarGroup className="px-2 py-1">
                  <SidebarGroupLabel className="text-[10px] font-bold tracking-wider text-muted-foreground/80 uppercase">
                    {isArabic ? group.labelAr : group.label}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.id
                        const labelText = isArabic ? item.labelAr : item.label

                        return (
                          <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                              isActive={isActive}
                              onClick={() => setActiveTab(item.id)}
                              tooltip={labelText}
                              className={cn(
                                "gap-3 transition-colors",
                                isActive &&
                                  "rounded-s-none border-s-2 border-primary bg-primary/10 font-semibold text-primary"
                              )}
                            >
                              <Icon
                                className={cn(
                                  "size-4 shrink-0",
                                  isActive
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                )}
                              />
                              <span className="truncate text-xs">
                                {labelText}
                              </span>
                              {item.badge !== null &&
                                item.badge !== undefined && (
                                  <SidebarMenuBadge
                                    className={cn(
                                      "ms-auto text-[10px]",
                                      item.badgeVariant === "destructive"
                                        ? "bg-destructive/15 font-bold text-destructive"
                                        : "bg-muted text-muted-foreground"
                                    )}
                                  >
                                    {item.badge}
                                  </SidebarMenuBadge>
                                )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </React.Fragment>
            ))}
          </SidebarContent>

          {/* SIDEBAR FOOTER */}
          <SidebarFooter className="border-t border-sidebar-border/60 p-2">
            <div className="flex items-center justify-between gap-2 rounded-lg p-1.5 transition-colors group-data-[collapsible=icon]:p-0 hover:bg-sidebar-accent">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Avatar className="size-8 shrink-0 rounded-lg border border-border">
                  <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {admin?.email?.slice(0, 2).toUpperCase() || "SA"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
                  <span className="truncate text-xs font-medium text-sidebar-foreground">
                    {admin?.email || "superadmin@tafawok.co"}
                  </span>
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                    Super Admin
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  title="Open Live Website"
                >
                  <ExternalLink className="size-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                  title="Sign Out"
                >
                  {signingOut ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <LogOut className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </SidebarFooter>

          {/* SIDEBAR RAIL FOR COLLAPSE/EXPAND */}
          <SidebarRail />
        </Sidebar>

        {/* SHADCN SIDEBAR INSET (MAIN CANVAS) */}
        <SidebarInset className="flex min-w-0 flex-col bg-background">
          {/* TOP BAR / DASHBOARD HEADER */}
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border/70 bg-card/85 px-4 backdrop-blur-md transition-all sm:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ms-1 size-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {isArabic ? activeItem.labelAr : activeItem.label}
              </span>
            </div>

            {/* Right Controls Cluster */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* View Live Website Button */}
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground shadow-xs transition-all hover:border-primary/40 hover:bg-muted md:inline-flex"
              >
                <span>{isArabic ? "الموقع المباشر" : "Live Website"}</span>
                <ExternalLink className="size-3 text-muted-foreground" />
              </Link>

              <LanguageToggle />
              <ThemeToggle />
            </div>
          </header>

          {/* MAIN VIEWPORT CANVAS */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Active Tab Hero / Action Header */}
              <div className="flex flex-col gap-2 border-b border-border/50 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <ActiveIcon className="size-4" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {isArabic ? activeItem.labelAr : activeItem.label}
                    </h1>
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {activeItem.description}
                  </p>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                  >
                    <Sparkles className="me-1 size-3" />
                    Super Admin Suite
                  </Badge>
                  {activeItem.badge !== null &&
                    activeItem.badge !== undefined && (
                      <Badge
                        variant={activeItem.badgeVariant || "secondary"}
                        className="px-2.5 py-1 text-xs"
                      >
                        {activeItem.badge}{" "}
                        {typeof activeItem.badge === "number" ? "items" : ""}
                      </Badge>
                    )}
                </div>
              </div>

              {/* ACTIVE TAB RENDER */}
              <div className="pt-1">
                {activeTab === "overview" && (
                  <NexusOverviewTab
                    properties={properties}
                    disciplines={disciplines}
                    metrics={metrics}
                    milestones={milestones}
                    partners={partners}
                    inquiries={inquiries}
                    onSelectTab={setActiveTab}
                  />
                )}
                {activeTab === "properties" && (
                  <NexusPropertiesTab
                    properties={properties}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "stores" && (
                  <NexusStoresTab
                    properties={properties}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "disciplines" && (
                  <NexusDisciplinesTab
                    disciplines={disciplines}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "metrics" && (
                  <NexusMetricsTab
                    metrics={metrics}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "timeline" && (
                  <NexusTimelineTab
                    milestones={milestones}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "values" && (
                  <NexusValuesPillarsTab
                    values={values}
                    pillars={pillars}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "partners" && (
                  <NexusPartnersTab
                    partners={partners}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "ceo" && (
                  <NexusCeoTab
                    ceoProfile={ceoProfile}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "identity" && (
                  <NexusCompanyIdentityTab
                    identity={companyIdentity}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "hse" && (
                  <NexusHseTab
                    hseCharter={hseCharter}
                    onRefresh={handleRefresh}
                  />
                )}
                {activeTab === "inquiries" && (
                  <NexusInquiriesTab
                    inquiries={inquiries}
                    onRefresh={handleRefresh}
                  />
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
