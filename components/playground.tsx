import { PlaygroundCard } from "@/components/playground-card"
import { playgroundItems } from "@/lib/playground"

export function Playground() {
  return (
    <section id="playground" className="mx-auto max-w-6xl px-4 pb-24 pt-8">
      <div className="mb-8 flex items-baseline justify-between border-t border-border pt-8">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Playground
        </h2>
        <span className="font-mono text-[12px] text-muted-foreground">
          {playgroundItems.length.toString().padStart(2, "0")} sketches
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {playgroundItems.map((item) => (
          <PlaygroundCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}