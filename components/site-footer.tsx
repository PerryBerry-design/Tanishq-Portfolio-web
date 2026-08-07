import { ArrowUpRight } from "lucide-react"

const socials = [
  {
    label: "Email",
    handle: "cooltanishq07@gmail.com",
    href: "mailto:cooltanishq07@gmail.com",
  },
  {
    label: "X",
    handle: "@PerryBerry1325",
    href: "https://x.com/PerryBerry1325",
  },
  {
    label: "Telegram",
    handle: "@Tanishq_exe",
    href: "https://t.me/Tanishq_exe",
  },
  {
    label: "Instagram",
    handle: "@Tanishq.exe",
    href: "https://instagram.com/Tanishq.exe",
  },
]

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16"
    >
      <div className="rounded-[32px] border border-border bg-card p-8 sm:p-14">
        <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
          Available for selected projects — 2026
        </p>

        <h2 className="mt-6 max-w-3xl text-balance text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
          Let&apos;s make something worth{" "}
          <span className="font-serif italic text-primary">collecting</span>.
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="mailto:cooltanishq07@gmail.com"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            cooltanishq07@gmail.com
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm text-foreground transition-colors hover:bg-secondary"
          >
            Back to work
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === "X" ? "_blank" : undefined}
              rel={s.label === "X" ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-1"
            >
              <span className="text-[13px] text-muted-foreground">
                {s.label}
              </span>
              <span className="flex items-center gap-1 text-sm text-foreground transition-colors group-hover:text-primary">
                {s.handle}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-2 text-[12px] text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Tanishq Singh. All frames reserved.</span>
        <span className="font-mono tracking-wider">Crafted in motion.</span>
      </div>
    </footer>
  )
}
