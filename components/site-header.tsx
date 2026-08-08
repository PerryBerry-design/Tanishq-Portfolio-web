"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LiveClock } from "@/components/live-clock"

const nav = [
  { label: "Home", index: 0 },
  { label: "Work", index: 1 },
  { label: "Playground", index: 2 },
  { label: "Contact", index: 3 },
]

interface SiteHeaderProps {
  activeIndex: number
  onNavigate: (index: number) => void
}

export function SiteHeader({ activeIndex, onNavigate }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleNavigate(index: number) {
    onNavigate(index)
    setMobileOpen(false)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div className="pointer-events-auto w-full max-w-6xl">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border px-3 py-2 pl-5 transition-all duration-500",
            "border-border bg-background/70 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl",
          )}
        >
          <button onClick={() => handleNavigate(0)} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[15px] font-medium tracking-tight">
                Tanishq
              </span>
              <LiveClock timeZone="Asia/Kolkata" label="London • Kolkata" />
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigate(item.index)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[13px] transition-colors",
                  activeIndex === item.index
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigate(3)}
              className="hidden rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:block"
            >
              Get in touch
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10 sm:hidden"
            >
              {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile expandable panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 overflow-hidden rounded-[26px] border border-border bg-background/90 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:hidden"
            >
              <nav className="flex flex-col gap-1 p-3">
                {nav.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item.index)}
                    className={cn(
                      "rounded-full px-4 py-2.5 text-left text-[14px] transition-colors",
                      activeIndex === item.index
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigate(3)}
                  className="mt-1 rounded-full bg-foreground px-4 py-2.5 text-center text-[14px] font-medium text-background transition-transform active:scale-95"
                >
                  Get in touch
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}