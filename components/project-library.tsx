import { projects } from "@/lib/projects"
import { ProjectCard } from "@/components/project-card"
import { DeferredMedia } from "@/components/deferred-media" // Import the new component

export function ProjectLibrary() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 pb-24 pt-8">
      <div className="mb-8 flex items-baseline justify-between border-t border-border pt-8">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Selected Work
        </h2>
        <span className="font-mono text-[12px] text-muted-foreground">
          {projects.length.toString().padStart(2, "0")} pieces
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          // We wrap each card in DeferredMedia. 
          // Note: Adjust the 'min-h-[350px]' to closely match the actual height of your ProjectCard 
          // so the page doesn't suddenly change height when the cards fade in.
          <DeferredMedia 
            key={project.id} 
            className="w-full rounded-2xl"
          >
            <ProjectCard project={project} />
          </DeferredMedia>
        ))}
      </div>
    </section>
  )
}