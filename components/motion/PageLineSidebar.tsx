"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { LineSidebar } from "@/components/motion/LineSidebar"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

export interface PageLineSidebarItem {
  id: string
  label: string
}

export interface PageLineSidebarProps {
  items: PageLineSidebarItem[]
  title?: string
  className?: string
}

export function PageLineSidebar({
  items,
  title,
  className = "",
}: PageLineSidebarProps) {
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"
  const [activeSection, setActiveSection] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const isClickScrollingRef = useRef(false)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Track active section via viewport bounding area and scroll position
  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      ticking = false

      if (!items || items.length === 0) return
      if (isClickScrollingRef.current) return

      const scrollY = window.scrollY || document.documentElement.scrollTop
      const innerHeight = window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight
      const scrollBottom = scrollY + innerHeight
      const remainingScroll = scrollHeight - scrollBottom

      // 1. If at the very top of the page (within 60px)
      if (scrollY <= 60) {
        setActiveSection(0)
        return
      }

      // 2. If at or near the complete end of the page (within 60px)
      if (remainingScroll <= 60) {
        setActiveSection(items.length - 1)
        return
      }

      // Viewport focal line: where user attention sits (~35% down viewport)
      const focalLine = Math.min(innerHeight * 0.35, 280)

      // 3. Last section early-entry check:
      // If the last section is in view and cannot scroll further to reach focalLine, activate it
      const lastIndex = items.length - 1
      const lastEl = document.getElementById(items[lastIndex]?.id)
      if (lastEl) {
        const lastRect = lastEl.getBoundingClientRect()
        if (
          lastRect.top < innerHeight * 0.7 &&
          remainingScroll < Math.max(0, lastRect.top - focalLine)
        ) {
          setActiveSection(lastIndex)
          return
        }
      }

      // 4. Bounding area detection across all sections:
      // First check if any section's bounding area directly contains the focal line
      let matchedIndex = -1
      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id)
        if (!el) continue
        const rect = el.getBoundingClientRect()

        if (rect.top <= focalLine && rect.bottom > focalLine) {
          matchedIndex = i
          break
        }
      }

      // If between sections or in an untracked gap, find the most recently entered section
      if (matchedIndex === -1) {
        for (let i = items.length - 1; i >= 0; i--) {
          const el = document.getElementById(items[i].id)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          if (rect.top <= focalLine) {
            matchedIndex = i
            break
          }
        }
      }

      if (matchedIndex !== -1) {
        setActiveSection(matchedIndex)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateActiveSection)
      }
    }

    // Cancel click-scroll lock on manual user scroll interaction
    const onUserScroll = () => {
      if (isClickScrollingRef.current) {
        isClickScrollingRef.current = false
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    window.addEventListener("wheel", onUserScroll, { passive: true })
    window.addEventListener("touchmove", onUserScroll, { passive: true })

    // Initial check on mount
    updateActiveSection()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      window.removeEventListener("wheel", onUserScroll)
      window.removeEventListener("touchmove", onUserScroll)
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    }
  }, [items])

  const handleItemClick = useCallback(
    (index: number) => {
      setActiveSection(index)
      isClickScrollingRef.current = true
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false
      }, 1000)

      const target = items[index]
      if (!target) return
      const el = document.getElementById(target.id)
      if (el) {
        const rect = el.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const top = Math.max(0, rect.top + scrollTop - 75)
        window.scrollTo({ top, behavior: "smooth" })
      }
    },
    [items]
  )

  if (!items || items.length === 0) return null

  return (
    <aside
      aria-label={title || "Page Navigation"}
      className={`fixed top-1/2 z-30 hidden -translate-y-1/2 transition-all duration-200 select-none min-[1440px]:block ${
        isExpanded
          ? "inset-s-4 max-w-xs rounded-xl border border-border/80 bg-background/95 p-4 shadow-2xl backdrop-blur-md"
          : "inset-s-3 min-[1440px]:inset-s-4 min-[1800px]:inset-s-8"
      } ${className}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        {title && (
          <div className="font-mono text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
            {isExpanded ? (
              <span>{title}</span>
            ) : (
              <>
                <span className="hidden min-[1800px]:inline">{title}</span>
                <span className="inline min-[1800px]:hidden">
                  {isRtl ? "فهرس" : "DIR"}
                </span>
              </>
            )}
          </div>
        )}
        {/* Expand / Collapse toggle for viewports < 1800px */}
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="flex size-5 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none min-[1800px]:hidden"
                aria-expanded={isExpanded}
                aria-label={
                  isExpanded
                    ? isRtl
                      ? "تصغير الفهرس"
                      : "Collapse directory"
                    : isRtl
                      ? "توسيع الفهرس"
                      : "Expand directory"
                }
              />
            }
          >
            {isExpanded ? (
              <PanelLeftClose
                className={`size-3.5 ${isRtl ? "rotate-180" : ""}`}
              />
            ) : (
              <PanelLeftOpen
                className={`size-3.5 ${isRtl ? "rotate-180" : ""}`}
              />
            )}
          </TooltipTrigger>
          <TooltipContent side={isRtl ? "left" : "right"}>
            {isExpanded
              ? isRtl
                ? "تصغير الفهرس"
                : "Collapse directory"
              : isRtl
                ? "توسيع الفهرس"
                : "Expand directory"}
          </TooltipContent>
        </Tooltip>
      </div>

      <LineSidebar
        items={items.map((i) => i.label)}
        activeItem={activeSection}
        onItemClick={handleItemClick}
        compact={!isExpanded}
        forceExpanded={isExpanded}
      />
    </aside>
  )
}
