'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// --- Data Config --- //
// Asymmetrical layout mapped to dynamic flexbox rows
const bentoRows = [
  // Row 1: Wide Left, Narrow Right
  [
    { id: 1, defaultFlex: 2, images: ['/gifs/photos/me 1.jpg', '/gifs/photos/me 2.jpg', '/gifs/photos/me 3.jpg'] },
    { id: 2, defaultFlex: 1, images: ['/gifs/photos/me 4.jpg', '/gifs/photos/me 5.jpg', '/gifs/photos/me 6.jpg'] },
  ],
  // Row 2: Medium-Narrow Left, Medium-Wide Right
  [
    { id: 3, defaultFlex: 1, images: ['/gifs/photos/me 10.jpg', '/gifs/photos/me 1.jpg', '/gifs/photos/me 9.jpg'] },
    { id: 4, defaultFlex: 1.5, images: ['/gifs/photos/me 2.jpg', '/gifs/photos/me 8.jpg', '/gifs/photos/me 6.jpg'] },
  ],
  // Row 3: Narrow Left, Wide Right
  [
    { id: 5, defaultFlex: 1, images: ['/gifs/photos/me 11.jpg', '/gifs/photos/me 5.jpg', '/gifs/photos/me 7.jpg'] },
    { id: 6, defaultFlex: 2, images: ['/gifs/photos/me 10.jpg', '/gifs/photos/me 8.jpg', '/gifs/photos/me 12.jpg'] },
  ],
];

const tags = [
  'Motion Designer',
  '3D Generalist',
  'Visual Storyteller',
  'AI',
  'Web3',
  'Branding',
  'Animation',
  'Creative strategy',
];

// --- Pre-compute ASCII Jitter Frames --- //
const JITTER_FRAMES = 5;
const CHAR_COUNT = 2500;
const chars = '+*. '; 
const noiseFrames = Array.from({ length: JITTER_FRAMES }).map(() => {
  let str = '';
  for (let i = 0; i < CHAR_COUNT; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
});

// --- ASCII Image-Mapped Overlay Component --- //
const JitterOverlay = ({ isActive, imageSrc }: { isActive: boolean; imageSrc: string }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % JITTER_FRAMES);
    }, 50);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-30 bg-[#050505]/95 pointer-events-none flex items-center justify-center"
        >
          {/* This div uses the photograph itself to color the text! */}
          <div
            className="w-full h-full overflow-hidden font-mono text-[10px] md:text-xs leading-none break-all"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              // Adds a subtle beige glow to the colored text
              textShadow: '0px 0px 8px rgba(233,201,155,0.25)',
            }}
          >
            {noiseFrames[frame]}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Single Bento Tile --- //
const BentoTile = ({
  item,
  hoveredId,
  setHoveredId,
  siblingId,
  globalTrigger,
}: {
  item: any;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  siblingId: number;
  globalTrigger: number;
}) => {
  const isHovered = hoveredId === item.id;
  const isSiblingHovered = hoveredId === siblingId;
  
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // 1. Handle Automatic Random Rotation
  useEffect(() => {
    if (globalTrigger === item.id && !isHovered && !isSiblingHovered) {
      setIsGlitching(true);
      
      // FIX: Swap the image immediately so it loads *behind* the glitch screen
      setCurrentImgIndex((prev) => (prev + 1) % item.images.length);

      // Keep the glitch active long enough for the browser to load the new image
      const endTimer = setTimeout(() => setIsGlitching(false), 800);

      return () => { clearTimeout(endTimer); };
    }
  }, [globalTrigger, item.id, item.images.length, isHovered, isSiblingHovered]);

  // 2. Handle Hover Interaction Glitch
  useEffect(() => {
    if (isHovered) {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), 450); 
      return () => clearTimeout(timer);
    } else {
      setIsGlitching(false);
    }
  }, [isHovered]);

  const currentFlex = isHovered ? 5 : isSiblingHovered ? 0.3 : item.defaultFlex;
  const currentImageSrc = item.images[currentImgIndex];

  return (
    <motion.div
      layout
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{ flex: currentFlex }}
      transition={{ type: 'spring', stiffness: 220, damping: 25, mass: 0.8 }}
      className="relative overflow-hidden rounded-2xl bg-zinc-900 group cursor-pointer h-full min-w-[10%]"
    >
      {/* Background Solid Color (Revealed when sibling is hovered) */}
      <motion.div
        className="absolute inset-0 z-20 bg-[#E9C99B] pointer-events-none"
        initial={false}
        animate={{ opacity: isSiblingHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Main Image */}
      <motion.img
        key={currentImageSrc} // Forces React to track image updates
        src={currentImageSrc}
        alt="Bento visual"
        className="absolute inset-0 w-full h-full object-cover z-10"
        initial={false}
        animate={{
          filter: isHovered ? 'grayscale(0%) brightness(1.1) contrast(1.05)' : 'grayscale(10%) brightness(0.8)',
          scale: isHovered ? 1.05 : 1.01, // Slight baseline scale prevents edge rendering bugs
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Passes the active image to paint the ASCII text */}
      <JitterOverlay isActive={isGlitching} imageSrc={currentImageSrc} />
    </motion.div>
  );
};

// --- Main Section Component --- //
export default function BioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeTriggerId, setActiveTriggerId] = useState(-1);
  const historyBuffer = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextId;
      do {
        nextId = Math.floor(Math.random() * 6) + 1;
      } while (historyBuffer.current.includes(nextId));

      historyBuffer.current.push(nextId);
      if (historyBuffer.current.length > 2) historyBuffer.current.shift(); 

      setActiveTriggerId(nextId);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-[transparent] text-zinc-50 flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 w-full selection:bg-[#E9C99B] selection:text-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
        
        {/* Left: Dynamic Expanding Bento Grid (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col gap-3 md:gap-4 h-[500px] md:h-[650px]">
          {bentoRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row gap-3 md:gap-4 w-full flex-1">
              <BentoTile
                item={row[0]}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                siblingId={row[1].id}
                globalTrigger={activeTriggerId}
              />
              <BentoTile
                item={row[1]}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                siblingId={row[0].id}
                globalTrigger={activeTriggerId}
              />
            </div>
          ))}
        </div>

        {/* Right: Bio Content (45%) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#E9C99B] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
              About Me
            </span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Hi, I'm Tanishq Singh.
            </h1>
            <h2 className="text-xl md:text-2xl text-zinc-300 font-light leading-snug mb-6">
              I design visuals that blend storytelling, motion, and technology.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 font-light">
              I am a Motion Designer and 3D Generalist with experience creating work across Web3, 
              startups, and digital products. I'm passionate about crafting visuals that simplify 
              complex ideas, experimenting with new technologies, and building memorable digital 
              experiences that leave a lasting impact.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-12">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05, backgroundColor: '#E9C99B', color: '#000' }}
                  className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-medium cursor-default transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-[#E9C99B] transition-colors w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Build Something
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}