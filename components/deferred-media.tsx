// components/deferred-media.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function DeferredMedia({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Wait for the Framer Motion slide transition to finish
    const timeout = setTimeout(() => {
      setIsReady(true)
    }, 550) 

    return () => clearTimeout(timeout)
  }, [])

  return (
    // Removed 'overflow-hidden' and 'bg-foreground/5' from here so the card can pop out!
    <div className={`relative ${className}`}>
      {isReady ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      ) : (
        // Moved the background and rounded corners strictly to the skeleton loader
        // matched the rounded-[26px] to your ProjectCard's border radius
        <div className="absolute inset-0 h-full w-full animate-pulse rounded-[26px] bg-foreground/10" />
      )}
    </div>
  )
}