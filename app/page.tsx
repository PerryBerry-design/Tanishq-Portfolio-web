"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ProjectLibrary } from "@/components/project-library"
import { Playground } from "@/components/playground"
import { SiteFooter } from "@/components/site-footer"
import { ChromaticGrid } from "@/components/chromatic-grid"
import BioSection from "@/components/BioSection"

// 1. Create a combined view that renders BOTH the Bio grid and the Footer
const ContactView = () => {
  return (
    <div className="flex flex-col w-full min-h-full">
      {/* The Bento Grid takes up the main space */}
      <div className="flex-1">
        <BioSection />
      </div>
      {/* The Footer sits right at the bottom */}
      <SiteFooter />
    </div>
  )
}

// 2. Assign our new combined view to the contact section
const sections = [
  { id: "about", component: Hero },
  { id: "work", component: ProjectLibrary },
  { id: "playground", component: Playground },
  { id: "contact", component: ContactView }, 
]

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  
  // Reference to the static scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleNavigate = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    
    // Reset scroll position to top when switching pages
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "instant" })
    }
  }

  // Safely grab the component to render
  const CurrentSection = sections[activeIndex]?.component

  return (
    <main className="grain relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <ChromaticGrid />
      
      <div className="relative z-10 flex h-full flex-col">
        <SiteHeader activeIndex={activeIndex} onNavigate={handleNavigate} />

        {/* Wrapper with fixed scrollbar and grid stacking */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-x-hidden overflow-y-auto grid"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={{
                enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} 
              style={{ willChange: "transform, opacity" }} 
              className="col-start-1 row-start-1 w-full pt-28 pb-12"
            >
              {/* Render the component, or a fallback if the import failed */}
              {CurrentSection ? (
                <CurrentSection />
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-500">
                  Section missing or import error.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}