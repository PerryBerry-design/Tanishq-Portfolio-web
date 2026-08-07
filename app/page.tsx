"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ProjectLibrary } from "@/components/project-library"
import { Playground } from "@/components/playground"
import { SiteFooter } from "@/components/site-footer"
import { ChromaticGrid } from "@/components/chromatic-grid"

const sections = [
  { id: "about", component: Hero },
  { id: "work", component: ProjectLibrary },
  { id: "playground", component: Playground },
  { id: "contact", component: SiteFooter },
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

  const CurrentSection = sections[activeIndex].component

  return (
    <main className="grain relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <ChromaticGrid />
      
      <div className="relative z-10 flex h-full flex-col">
        <SiteHeader activeIndex={activeIndex} onNavigate={handleNavigate} />

        {/* 
          1. Moved overflow-y-auto to this static wrapper so the scrollbar never moves.
          2. Used CSS Grid so the incoming and outgoing motion divs stack on top of each other perfectly.
        */}
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
              
              // FIX 1: Use a "tween" with a custom easing curve instead of a spring.
              // This is much lighter on the CPU and results in a buttery smooth slide.
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} 
              
              // FIX 2: Force hardware (GPU) acceleration ahead of time
              style={{ willChange: "transform, opacity" }} 
              
              className="col-start-1 row-start-1 w-full pt-28 pb-12"
            >
              <CurrentSection />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}