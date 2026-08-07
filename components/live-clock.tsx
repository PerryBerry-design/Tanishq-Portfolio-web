"use client"

import { useEffect, useState } from "react"

type LiveClockProps = {
  timeZone: string
  label: string
}

export function LiveClock({ timeZone, label }: LiveClockProps) {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    function updateTime() {
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date())
      setTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [timeZone])

  if (!time) return null

  return (
    <span className="text-[13px] text-muted-foreground">
      {label} · {time}
    </span>
  )
}