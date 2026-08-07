"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { RotateCw } from "lucide-react"
import type { PlaygroundItem } from "@/lib/playground"
import { cn } from "@/lib/utils"

export function PlaygroundCard({ item }: { item: PlaygroundItem }) {
  const cardRef = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const isVideo = item.cover?.toLowerCase().endsWith(".webm")

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ x: (0.5 - py) * 6, y: (px - 0.5) * 6 })
    setGlow({ x: px * 100, y: py * 100 })
  }

  function reset() {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
    setGlow({ x: 50, y: 50 })
  }

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group [perspective:1200px]"
    >
      <Link
        href={`/playground/${item.id}`}
        aria-label={`${item.title} — ${item.tool} experiment`}
        className="block rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div
          className={cn(
            "relative rounded-[22px] border border-border bg-card p-2 transition-[transform,box-shadow] duration-300 ease-out will-change-transform",
            hovered
              ? "shadow-[0_32px_64px_-28px_rgba(0,0,0,0.85)]"
              : "shadow-[0_14px_32px_-24px_rgba(0,0,0,0.7)]",
          )}
          style={{
            transform: hovered
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-5px) scale(1.012)`
              : "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cover */}
          <div className="relative aspect-square overflow-hidden rounded-[15px] bg-secondary">
            {isVideo ? (
              <video
                src={item.cover}
                autoPlay
                muted
                loop
                playsInline
                aria-label={`${item.title} experiment preview`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                crossOrigin="anonymous"
              />
            ) : (
              <img
                src={item.cover || "/placeholder.svg"}
                alt={`${item.title} experiment preview`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                crossOrigin="anonymous"
              />
            )}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, oklch(0.9 0.05 80 / 0.18), transparent 65%)`,
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
            />

            <span className="absolute left-2.5 top-2.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur-md">
              {item.tool}
            </span>

          
             
          </div>

          {/* Meta */}
          <div className="px-1.5 pb-1 pt-3">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="truncate text-[14px] font-medium tracking-tight text-foreground">
                {item.title}
              </h3>
              <span className="shrink-0 font-mono text-[11px] tracking-wider text-muted-foreground">
                {item.year}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[12.5px] text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}