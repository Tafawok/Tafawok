"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  FolderArchive,
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
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { PageImpactGuide } from "@/components/nexus/PageImpactGuide"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

export interface CurrentAdmin {
  id?: string
  email: string
  role: string
}

interface NavItem {
  id: string
  href: string
  label: string
  labelAr: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  badge?: number | null
  badgeVariant?: "destructive" | "default"
}

interface NavGroup {
  id: string
  label: string
  labelAr: string
  items: NavItem[]
}

interface NexusDashboardLayoutProps {
  admin: CurrentAdmin
  unreadInquiriesCount?: number
  children: React.ReactNode
}

export function NexusDashboardLayout({
  admin,
  unreadInquiriesCount = 0,
  children,
}: NexusDashboardLayoutProps) {
  const pathname = usePathname()
  const { locale } = useLocaleStore()
  const isArabic = locale === "ar"
  const [signingOut, setSigningOut] = React.useState<boolean>(false)

  const navigationGroups: NavGroup[] = React.useMemo(
    () => [
      {
        id: "portfolio",
        label: "Commercial Portfolio",
        labelAr: "المحفظة التجارية",
        items: [
          {
            id: "overview",
            href: "/nexus-portal",
            label: "Overview",
            labelAr: "نظرة عامة",
            icon: LayoutDashboard,
            description:
              "Centralized commercial performance summary and quick control cards.",
          },
          {
            id: "homepage",
            href: "/nexus-portal/homepage",
            label: "Homepage & Showcase",
            labelAr: "الرئيسية والاستعراض التفاعلي",
            icon: Sparkles,
            description:
              "Edit public landing hero, credentials, and interactive scroll-expand showcase image and copy.",
          },
          {
            id: "properties",
            href: "/nexus-portal/properties",
            label: "Commercial Assets",
            labelAr: "الأصول التجارية",
            icon: Building2,
            description:
              "Manage commercial towers, retail plazas, business parks, and technical specifications.",
          },
          {
            id: "stores",
            href: "/nexus-portal/stores",
            label: "Retail Directory",
            labelAr: "دليل المتاجر",
            icon: Store,
            description:
              "Configure commercial mall tenants, floor locations, and leasing statuses.",
          },
          {
            id: "disciplines",
            href: "/nexus-portal/disciplines",
            label: "Sectors & Capabilities",
            labelAr: "القطاعات والتخصصات",
            icon: Briefcase,
            description:
              "Define corporate CRE disciplines, turnkey EPC scopes, and capacity indicators.",
          },
          {
            id: "media",
            href: "/nexus-portal/media",
            label: "Media Library & CDN",
            labelAr: "مكتبة الوسائط والملفات",
            icon: FolderArchive,
            description:
              "Upload, preview, copy URLs, and permanently delete images, videos, and PDF documents from the CDN bucket.",
          },
        ],
      },
      {
        id: "heritage-scale",
        label: "Heritage & Scale",
        labelAr: "العراقة والنمو",
        items: [
          {
            id: "metrics",
            href: "/nexus-portal/metrics",
            label: "Corporate Benchmarks",
            labelAr: "المؤشرات القياسية",
            icon: TrendingUp,
            description:
              "Institutional scale metrics, GLA capacity, Gulf track record, and core engineers.",
          },
          {
            id: "timeline",
            href: "/nexus-portal/timeline",
            label: "Heritage Timeline",
            labelAr: "مسيرة العراقة",
            icon: History,
            description:
              "Chronological milestones from contracting foundations to modern commercial real estate.",
          },
          {
            id: "values",
            href: "/nexus-portal/values",
            label: "Values & Pillars",
            labelAr: "القيم والركائز",
            icon: Diamond,
            description:
              "Corporate values and commercial investment pillars driving capital allocation.",
          },
          {
            id: "partners",
            href: "/nexus-portal/partners",
            label: "Clients & Partners",
            labelAr: "الشركاء والعملاء",
            icon: Users,
            description:
              "Tier-1 institutional credentials, Energy & Petroleum clients, and EPC affiliations.",
          },
        ],
      },
      {
        id: "governance",
        label: "Leadership & Coordinates",
        labelAr: "القيادة والبيانات",
        items: [
          {
            id: "ceo",
            href: "/nexus-portal/ceo",
            label: "Executive Leadership Statement",
            labelAr: "بيان القيادة التنفيذية",
            icon: UserCheck,
            description:
              "Executive profile, credentials, and official corporate address by TAFAWOK Leadership.",
          },
          {
            id: "company",
            href: "/nexus-portal/company",
            label: "Headquarters & Identity",
            labelAr: "الهوية والمقر الرئيسي",
            icon: Building,
            description:
              "Official legal entity naming, registration numbers, headquarters coordinates, and maps.",
          },
          {
            id: "hse",
            href: "/nexus-portal/hse",
            label: "HSE & Governance",
            labelAr: "السلامة والجودة",
            icon: ShieldCheck,
            description:
              "Zero-Harm safety policy, quality charters, and international ISO certification frameworks.",
          },
        ],
      },
      {
        id: "inbound",
        label: "Inbound Leads",
        labelAr: "طلبات التواصل",
        items: [
          {
            id: "inquiries",
            href: "/nexus-portal/inquiries",
            label: "Inquiries & RFQs",
            labelAr: "الاستفسارات والطلبات",
            icon: MessageSquare,
            description:
              "Live commercial leasing inquiries, investment requests, and tenant contact leads.",
            badge: unreadInquiriesCount > 0 ? unreadInquiriesCount : null,
            badgeVariant: "destructive" as const,
          },
        ],
      },
    ],
    [unreadInquiriesCount]
  )

  const activeItem = React.useMemo(() => {
    for (const group of navigationGroups) {
      for (const item of group.items) {
        if (item.href === "/nexus-portal" && pathname === "/nexus-portal") {
          return item
        }
        if (item.href !== "/nexus-portal" && pathname.startsWith(item.href)) {
          return item
        }
      }
    }
    return navigationGroups[0].items[0]
  }, [navigationGroups, pathname])

  const ActiveIcon = activeItem.icon

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOutAction()
    } catch {
      toast.error("Failed to sign out.")
      setSigningOut(false)
    }
  }

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
                        const isActive =
                          item.href === "/nexus-portal"
                            ? pathname === "/nexus-portal"
                            : pathname.startsWith(item.href)
                        const labelText = isArabic ? item.labelAr : item.label

                        return (
                          <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                              render={<Link href={item.href} />}
                              isActive={isActive}
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
                <div className="flex flex-col overflow-hidden text-start group-data-[collapsible=icon]:hidden">
                  <span className="truncate text-xs font-semibold text-sidebar-foreground">
                    Super Administrator
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground">
                    {admin?.email || "admin@tafawok.co"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Link
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label={isArabic ? "معاينة الموقع المباشر" : "View Live Site"}
                      />
                    }
                  >
                    <ExternalLink className="size-3.5" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {isArabic ? "معاينة الموقع المباشر" : "View Live Site"}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                        aria-label={isArabic ? "تسجيل الخروج" : "Sign Out"}
                      />
                    }
                  >
                    {signingOut ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <LogOut className="size-3.5" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {isArabic ? "تسجيل الخروج" : "Sign Out"}
                  </TooltipContent>
                </Tooltip>
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
            <div className="flex items-center gap-2.5">
              <SidebarTrigger className="-ms-1 size-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" />
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <ActiveIcon className="size-3.5" />
                </span>
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  {isArabic ? activeItem.labelAr : activeItem.label}
                </span>
                <PageImpactGuide activeId={activeItem.id} isArabic={isArabic} />
              </div>
            </div>

            {/* Right Controls Cluster */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* View Live Website Button with Tooltip */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground shadow-xs transition-all hover:border-primary/40 hover:bg-muted md:inline-flex"
                      aria-label={isArabic ? "فتح الموقع العام في نافذة جديدة" : "Open public website in new tab"}
                    />
                  }
                >
                  <span>{isArabic ? "الموقع المباشر" : "Live Website"}</span>
                  <ExternalLink className="size-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {isArabic
                    ? "فتح الموقع العام في نافذة جديدة"
                    : "Open public website in a new tab"}
                </TooltipContent>
              </Tooltip>

              <LanguageToggle />
              <ThemeToggle />
            </div>
          </header>

          {/* MAIN VIEWPORT CANVAS */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* PAGE-SPECIFIC CONTENT (LOADS ONLY ITS CONTENT FROM BACKEND) */}
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
