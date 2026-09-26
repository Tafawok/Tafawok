"use client"

import * as React from "react"
import { Download, FileText, ArrowDownToLine } from "lucide-react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { COMPANY_PROFILE_URL } from "@/content/cre-data"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface DownloadProfileButtonProps {
  variant?: "hero" | "about" | "contact" | "compact" | "card" | "footer"
  className?: string
  profileUrl?: string
}

export function DownloadProfileButton({
  variant = "hero",
  className,
  profileUrl = COMPANY_PROFILE_URL,
}: DownloadProfileButtonProps) {
  const { t, locale } = useLocaleStore()
  const isArabic = locale === "ar"

  const tooltipText = t("companyProfile.tooltip")
  const downloadText = t("companyProfile.downloadBtn")
  const downloadShort = t("companyProfile.downloadShort")
  const fileInfo = t("companyProfile.fileInfo")
  const description = t("companyProfile.description")

  // FOOTER VARIANT: Simplified, architectural link/button tailored for the footer
  if (variant === "footer") {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="TAFAWOK-Company-Profile.pdf"
              className={cn(
                "group inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-secondary hover:text-primary active:scale-95 shadow-2xs",
                className
              )}
              aria-label={downloadText}
            />
          }
        >
          <div className="flex size-5 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Download className="size-3 transition-transform group-hover:translate-y-0.5" />
          </div>
          <span>{downloadShort}</span>
          <span className="rounded border border-border/60 bg-muted/60 px-1 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground uppercase">
            PDF
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    )
  }

  // HERO VARIANT: Elegantly pairs with the primary CTA in the hero section
  if (variant === "hero") {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="TAFAWOK-Company-Profile.pdf"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "group cursor-pointer gap-2.5 rounded-xl border-border/80 bg-background/60 px-6 py-6 text-sm font-bold backdrop-blur-md transition-all duration-200 hover:border-primary/50 hover:bg-secondary/60 hover:text-foreground active:scale-[0.98]",
                className
              )}
              aria-label={downloadText}
            />
          }
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowDownToLine className="size-4 shrink-0 transition-transform group-hover:translate-y-0.5" />
          </div>
          <span>{downloadText}</span>
          <span className="rounded-sm border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground uppercase">
            PDF
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs text-center text-xs">
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    )
  }

  // ABOUT HERO VARIANT: Prestigious institutional download trigger
  if (variant === "about") {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="TAFAWOK-Company-Profile.pdf"
              className={cn(
                "group inline-flex cursor-pointer items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-5 py-3 text-xs font-bold text-foreground transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:shadow-md sm:text-sm",
                className
              )}
              aria-label={downloadText}
            />
          }
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs transition-transform group-hover:scale-105">
            <Download className="size-4" />
          </div>
          <div className="flex flex-col text-start">
            <span className="leading-tight">{downloadText}</span>
            <span className="text-[11px] font-medium text-muted-foreground">
              {fileInfo}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs text-xs">
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    )
  }

  // CONTACT VARIANT: Executive card for RFQ and investor download
  if (variant === "contact") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border/80 bg-linear-to-br from-card via-card to-primary/5 p-5 shadow-xs transition-all hover:border-primary/40 sm:p-6",
          className
        )}
      >
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <FileText className="size-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold tracking-tight text-foreground sm:text-base">
              {downloadText}
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="font-mono text-[11px] font-medium text-muted-foreground">
            {fileInfo}
          </span>

          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="TAFAWOK-Company-Profile.pdf"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "group cursor-pointer gap-2 rounded-lg bg-primary text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90"
                  )}
                  aria-label={downloadText}
                />
              }
            >
              <span>{isArabic ? "تحميل PDF" : "Download PDF"}</span>
              <ArrowDownToLine className="size-3.5 transition-transform group-hover:translate-y-0.5" />
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    )
  }

  // COMPACT VARIANT: Clean button for minimal placements
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="TAFAWOK-Company-Profile.pdf"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-2 rounded-lg text-xs font-semibold hover:border-primary/40",
              className
            )}
            aria-label={downloadText}
          />
        }
      >
        <Download className="size-3.5 text-primary" />
        <span>{downloadShort}</span>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  )
}
