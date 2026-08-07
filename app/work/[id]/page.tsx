import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  getAdjacentProject,
  getAllProjectIds,
  getProjectById,
} from "@/lib/projects"

function getYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url)

    // Already an embed URL
    if (parsed.pathname.startsWith("/embed/")) {
      return url
    }

    // youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1)
      return `https://www.youtube.com/embed/${id}`
    }

    // youtube.com/watch?v=VIDEO_ID
    const id = parsed.searchParams.get("v")
    if (id) {
      return `https://www.youtube.com/embed/${id}`
    }

    return url
  } catch {
    return url
  }
}

export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) return {}
  return {
    title: `${project.title} — ${project.client}`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  const next = getAdjacentProject(project.id)

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-36 sm:pt-44">
      {/* Back */}
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Index
      </Link>

      {/* Header */}
      <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
        <h1 className="max-w-3xl text-balance text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl">
          {project.title}{" "}
          <span className="font-serif italic text-primary">
            for {project.client}
          </span>
        </h1>
        <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[11px] tracking-widest text-white/85 backdrop-blur-md">
          {project.index}
        </span>
      </div>

      {project.description && (
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      )}

      {/* Meta row, styled like Hero's "Past clients" block */}
      <div className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Client
          </p>
          <p className="mt-2 text-[15px] font-medium tracking-tight">
            {project.client}
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Category
          </p>
          <p className="mt-2 text-[15px] font-medium tracking-tight">
            {project.category}
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Year
          </p>
          <p className="mt-2 text-[15px] font-medium tracking-tight">
            {project.year}
          </p>
        </div>
        {project.role?.length > 0 && (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Role
            </p>
            <p className="mt-2 text-[15px] font-medium tracking-tight">
              {project.role.join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Overview */}
      {project.overview && (
        <div className="mt-14 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Overview
          </p>
          <div className="mt-4 space-y-4 text-pretty text-[15px] leading-relaxed text-foreground/80">
            {project.overview.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
      <div className="tools-section py-4"> 
  <p>
    <strong className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Tools: </strong> 
    <span className="mt-4 space-y-4 text-pretty text-[15px] leading-relaxed text-foreground/80">
      {project.tools.join(" | ")}
    </span>
  </p>
</div>

      {/* Cover */}
      <div className="mt-14 overflow-hidden rounded-[26px] border border-border bg-card p-2.5">
        <div className="relative aspect-video overflow-hidden rounded-[18px] bg-secondary">
          {project.videoUrl ? (
            <iframe
        src={getYouTubeEmbedUrl(project.videoUrl)}
        title={`${project.title} video`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
            />
          ) : (
            <img
              src={project.cover || "/placeholder.svg"}
              alt={`${project.title} cover`}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          )}
        </div>
      </div>

      {/* Gallery */}
{project.gallery?.length > 0 && (
  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
    {project.gallery.map((item, i) => {
      const src = typeof item === "string" ? item : item.src
      const title = typeof item === "string" ? undefined : item.title

      return (
        <div
          key={src + i}
          className="overflow-hidden rounded-[26px] border border-border bg-card p-2.5"
        >
          <div className="relative aspect-video overflow-hidden rounded-[18px] bg-secondary">
            <img
              src={src || "/placeholder.svg"}
              alt={title || `${project.title} frame ${i + 1}`}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
          {title && (
            <p className="mt-3 px-1 pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {title}
            </p>
          )}
        </div>
      )
    })}
  </div>
)}

      {/* Next project */}
      {next && (
        <div className="mt-20 border-t border-border pt-10">
          <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
            Next up
          </p>
          <Link
            href={`/work/${next.id}`}
            className="group mt-4 flex items-center justify-between gap-4"
          >
            <span className="text-3xl font-medium tracking-tight text-foreground/80 transition-colors group-hover:text-primary sm:text-4xl">
              {next.title}{" "}
              <span className="font-serif italic">— {next.client}</span>
            </span>
            <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </div>
      )}
    </main>
  )
}