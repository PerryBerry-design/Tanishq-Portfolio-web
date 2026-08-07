"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects"
import { cn } from "@/lib/utils"

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

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
        href={`/work/${project.id}`}
        aria-label={`${project.title} — ${project.category} for ${project.client}`}
        className="block rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div
          className={cn(
            "relative rounded-[26px] border border-border bg-card p-2.5 transition-[transform,box-shadow] duration-300 ease-out will-change-transform",
            hovered
              ? "shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
              : "shadow-[0_18px_40px_-28px_rgba(0,0,0,0.7)]",
          )}
          style={{
            transform: hovered
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.012)`
              : "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cover */}
          <div className="relative aspect-video overflow-hidden rounded-[18px] bg-secondary">
            <img
              src={project.cover || "/placeholder.svg"}
              alt={`${project.title} motion design still`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              crossOrigin="anonymous"
            />

            {project.previewGif && (
  <video
    src={project.previewGif}
    aria-hidden="true"
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:scale-105"
    crossOrigin="anonymous"
  />
)}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(340px circle at ${glow.x}% ${glow.y}%, oklch(0.5 0.05 80 / 0.08), transparent 65%)`,
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
            />

            <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[11px] tracking-widest text-white/85 backdrop-blur-md">
              {project.index}
            </span>

            <div
              aria-hidden
              className="absolute bottom-3 right-3 flex translate-y-1 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[12px] font-medium text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            >
              View
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-end justify-between gap-4 px-2 pb-1.5 pt-3.5">
            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-medium tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
                {project.client}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[12px] font-medium text-foreground/80">
                {project.category}
              </p>
              <p className="mt-0.5 font-mono text-[11px] tracking-wider text-muted-foreground">
                {project.year}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}