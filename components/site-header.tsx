"use client"

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
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 pl-5 transition-all duration-500",
          // The glassmorphism is permanently active here because in the horizontal layout, 
          // the window itself doesn't scroll (the container below it does).
          "border-border bg-background/70 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        )}
      >
        <button onClick={() => onNavigate(0)} className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-[15px] font-medium tracking-tight">
            Tanishq
          </span>
          {/* New LiveClock component integrated seamlessly */}
          <LiveClock timeZone="Asia/Kolkata" label="London • Kolkata" />
        </button>

        <nav className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.index)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[13px] transition-colors",
                // Highlight the active tab
                activeIndex === item.index
                  ? "bg-foreground/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => onNavigate(3)} // Index 3 is Contact
          className="rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-transform duration-200 hover:scale-[1.03] active:scale-95"
        >
          Get in touch
        </button>
      </div>
    </header>
  )
}