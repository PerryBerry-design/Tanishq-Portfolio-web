import { ArrowRight } from "lucide-react"
import { ChromaticSymbolsBackground } from "@/components/chromatic-symbols-background"

const clients = ["Phantom", "Uniswap", "Superteam" , "Macallan", "Celestia", "Miden", "Layer3", "Codex"]

export function Hero() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl scroll-mt-24 overflow-hidden px-4 pb-10 pt-36 sm:pt-44"
    >
      {/* Background animation
      <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
        <ChromaticSymbolsBackground className="h-full w-full" />
      </div> */}

      <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
        <span className="inline-block h-px w-8 bg-primary" />
        Independent Motion Designer · Since 2020
      </div>

      <h1 className="mt-8 max-w-4xl text-balance text-5xl font-medium leading-[0.98] tracking-tight sm:text-7xl">
        A collectible library of{" "}
        <span className="font-serif italic text-primary text-yellow-200">motion</span> crafted
        to be picked up.
      </h1>

      <div className="mt-8 flex max-w-2xl flex-col gap-6 text-pretty text-base leading-relaxed text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <p>
          I&apos;m Tanishq — I create | Design | Brand.
        </p>
      </div>

      <div className="mt-14 border-t border-border pt-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
          Past clients
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-lg font-medium tracking-tight sm:text-xl">
          {clients.map((client) => (
            <span
              key={client}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {client}
            </span>
          ))}
          <span className="text-muted-foreground">and many more</span>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-3 text-[13px] text-muted-foreground">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowRight className="h-4 w-4 animate-bounce" />
        </span>
        Browse the library
      </div>
    </section>
  )
}