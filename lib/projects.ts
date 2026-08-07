export type Project = {
  id: string
  index: string
  title: string
  client: string
  category: string
  year: string
  cover: string
  /** relative height weight for the masonry layout */
  span: "short" | "tall" | "mid"
  accent?: boolean
  description: string
  role: string[]
  gallery: { src: string; title?: string }[] | string[]
  videoUrl?: string
  previewGif?: string // optional — falls back to static cover if not set
  overview?: string
  tools: string[]
}

export const projects: Project[] = [
  {
    id: "Timeswap",
    index: "01",
    title: "V2 Launch Film",
    client: "Timeswap",
    category: "Launch Film",
    year: "2023",
    cover: "/covers/Timeswap cover.png",
    span: "tall",
    accent: true,
    description:
      "A cinematic product film built for Timeswap's v2 launch — translating a complex protocol update into a sequence of tactile, physical metaphors. The brief called for something that felt premium without losing the crypto-native edge.",
    role: ["Direction", "Animation", "Design"],
    gallery: [
  { src: "/images/project-1-detail.jpg", title: "Homepage detail" },
  { src: "/images/project-1-mobile.jpg", title: "Mobile view" },
],
    previewGif: "/gifs/timeswap webm.webm", videoUrl: 'https://youtu.be/vfyaA0HmnsQ',
    overview:
      "Leading the creative direction for the Timeswap V2 launch meant finding a visual language that clearly showed how much the protocol had evolved beyond V1. I designed the motion and narrative around its improvements in capital efficiency, helping turn complex DeFi mechanics into something people could instantly understand. The goal was to make the technology feel approachable without losing its technical depth.",
      tools: [" Cinema4D" , " After effects"],
  },
  {
    id: "Wonder",
    index: "02",
    title: "Wonder shader",
    client: "wonder",
    category: "Brand Motion",
    year: "2026",
    cover: "/covers/Wonder cover.png",
    span: "mid",
    description:
      "An opening title sequence for Form Studio's annual reel — heavy, architectural type paired with slow, deliberate camera moves through negative space.",
    role: ["Direction", "Animation",],
    gallery: ["/covers/monolith-1.png", "/covers/monolith-2.png"],
    previewGif: "/gifs/web m/wonder.webm", videoUrl: 'https://youtu.be/o-ECL0RiN5w',
     overview:
      "Partnering with Tina from the Wonder design team, I helped introduce their new shader toolkit through a launch film that put the product front and center. Rather than overcomplicating the visuals, I focused on creating motion that felt polished, tactile, and satisfying—allowing the toolkit's capabilities to speak for themselves.",
      tools: [ "Figma", "After effects"],
  },
  {
    id: "Miden",
    index: "03",
    title: "Miden public Launch",
    client: "Miden",
    category: "Brand Motion",
    year: "2025",
    cover: "/covers/Miden cover.png",
    span: "short",
    description:
      "A modular motion system built for Wavelength's rebrand — a small library of reusable transitions, loaders, and idents designed to scale across their entire product suite.",
    role: ["Animation", "Direction", "Motion Design"],
    gallery: ["/covers/pulse-1.png"],
    previewGif: "/gifs/web m/Miden Intro Final 2_1.webm", videoUrl: 'https://youtu.be/cL12GWP1000',
    overview:
      "Helping shape Miden's first introduction video meant creating a visual identity before the audience had any expectations. I designed an abstract motion language that captured the project's technical ambition while keeping the story engaging from the very first frame. Together with sound designer Evgeny, we built a launch that went on to surpass 500K views on X",
      tools: ["Cinema4D", "After effects"],
  },
  {
    id: "Fan_Tv",
    index: "04",
    title: "Fan TV trailer",
    client: "Fan tv",
    category: "Brand Film",
    year: "2024",
    cover: "/covers/Fan TV cover.png",
    span: "tall",
    description:
      "A fashion film shot and cut for Atelier Bloom's SS24 collection — soft, drifting camera work matched to an ambient score, favoring texture and fabric movement over hard cuts.",
    role: [ "animation",],
    gallery: ["/covers/drift-1.png", "/covers/drift-2.png", "/covers/drift-3.png"],
    previewGif: "/gifs/web m/fantv_1.webm",  videoUrl: 'https://youtu.be/7l4C9LfJLWs',
    overview:
      "Joining forces with the Spacekayak design team, I animated the launch film for FanTV, an AI-powered media platform focused on content creation and discovery. My role was to bring the product to life through energetic motion, turning static designs into a launch experience that felt dynamic and easy to follow.",
      tools: ["Blender", "Cinema4D", "After effects"],
  },
  {
    id: "Ethereal",
    index: "05",
    title: "Launch trailer",
    client: "Ethereal",
    category: "Brand Motion",
    year: "2025",
    cover: "/covers/Ethereal cover.png",
    span: "mid",
    description:
      "A two-minute explainer for Vega Labs, breaking down a technical infrastructure product into a clear, character-driven narrative without dumbing down the mechanics.",
    role: ["Direction", "Animation"],
    gallery: ["/covers/orbit-1.png"],
     previewGif: "/gifs/web m/etheral_1.webm", videoUrl: 'https://youtu.be/_XbaiNwIkSI',
     overview:
      "Collaborating with RWS Agency, I created the launch visuals for Ethereal's perpetual trading platform. The challenge was balancing a premium aesthetic with the speed and precision expected from a modern trading experience. The final launch film reached 500K+ views on X while helping introduce the protocol's mainnet.",
      tools: ["Cinema4D", "After effects"],
  },
  {
    id: "Silhouette",
    index: "06",
    title: "Silhouette Launch",
    client: "Silhouette",
    category: "Brand Motion",
    year: "2025",
    cover: "/covers/Sil cover.png",
    span: "short",
    accent: true,
    description:
      "A set of broadcast idents for Kindle Films — short, punchy loops designed to work as bumpers across their channel package, built around a single recurring flame motif.",
    role: ["Animation", "Direction"],
    gallery: ["/covers/ember-1.png"],
    previewGif: "/gifs/web m/sova.webm",  videoUrl: 'https://youtu.be/eBE5byrVI8E',
    overview:
      "Designing the launch for Silhouette meant translating a highly technical privacy solution into visuals that felt intuitive. I built a series of detailed motion sequences showing how users can trade on Hyperliquid while keeping transactions shielded, making a complex concept easier to grasp. The launch video went on to earn 300K+ views on X.",
      tools: ["Houdini", "Cinema4D", "After effects"],
  },
  {
    id: "Phantom",
    index: "07",
    title: "L3 x Phantom",
    client: "Layer 3",
    category: "Launch Film",
    year: "2023",
    cover: "/covers/L3 cover.png",
    span: "tall",
    description:
      "A macro product film for Prism Jewelry, built entirely around light refracting through cut stone — every transition timed to a rotation of the piece itself.",
    role: ["Direction", "Animation",],
    gallery: ["/covers/facet-1.png", "/covers/facet-2.png"],
    previewGif: "/gifs/web m/layer 3.webm", videoUrl: 'https://youtu.be/iUj2KN-oI3o',
    overview:
      "Working alongside my friend Zeel and the Layer3 team, I helped bring their Phantom integration launch to life. The focus was on building excitement around the partnership while keeping the animation clean, playful, and true to Layer3's visual identity.",
      tools: ["Figma", "Cinema4D", "After effects"],
  },
  {
    id: "Pulse",
    index: "08",
    title: "Pulse Launch",
    client: "Makina",
    category: "Launch Film",
    year: "2024",
    cover: "/covers/Pulse cover.png",
    span: "mid",
    description:
      "A campaign film for Dune Wellness's product launch — slow, breathing pacing meant to mirror the calm the brand sells, shot against minimal, sand-toned sets.",
    role: ["Direction", "Editing","Modelling"],
    gallery: ["/covers/tide-1.png"],
    previewGif: "/gifs/web m/pulse.webm", videoUrl: 'https://youtu.be/OHqdIJix9u8',
    overview:
      "Building Pulse from the ground up gave me the opportunity to own the entire creative process—from storyboarding and creative direction to 3D modelling and final animation. The launch introduced an AI-powered health wearable designed to track sleep, recovery, and wellness, with the film ultimately reaching 700K+ views on X.",
      tools: ["Cinema4D", "After effects"],
  },
   {
    id: "Celestia",
    index: "09",
    title: "Celestia Logo motion",
    client: "Celestia",
    category: "Brand motion",
    year: "2025",
    cover: "/covers/Celestia cover.png",
    span: "mid",
    description:
      "A campaign film for Dune Wellness's product launch — slow, breathing pacing meant to mirror the calm the brand sells, shot against minimal, sand-toned sets.",
    role: ["Direction", "simulation"],
    gallery: ["/covers/tide-1.png"],
    previewGif: "/gifs/web m/celestia Da.webm", videoUrl: 'https://youtu.be/4NkYfgs3-so',
    overview:
      "Creating the launch animation for Celestia revolved around fluid motion and transformation rather than a traditional logo reveal. Working closely with the team, I developed a simulation-driven piece that gave the brand a more organic and memorable introduction",
      tools: ["Houdini", "Cinema4D", "After effects"],
  },
  {
    id: "Cyber_Fund",
    index: "10",
    title: "CF Hero motion",
    client: "Cyber Fund",
    category: "Hero animation",
    year: "2026",
    cover: "/covers/CF cover.png",
    span: "mid",
    description:
      "A campaign film for Dune Wellness's product launch — slow, breathing pacing meant to mirror the calm the brand sells, shot against minimal, sand-toned sets.",
    role: ["Animation", "Simulation"],
    gallery: ["/covers/tide-1.png"],
    previewGif: "/gifs/web m/cyber Fund red final.webm", videoUrl: 'https://youtu.be/TcyXDG33kh8',
    overview:
      "Helping define Cyber Fund's visual identity extended far beyond a single animation. I contributed across branding, logo design, hero visuals, merchandise, and launch content, including a particle simulation that transformed into a monastery—a visual metaphor for their vision of building an AI monastery for founders.",
      tools: ["Houdini", "Cinema4D", "After effects"],
  },
  {
    id: "Codex",
    index: "11",
    title: "Codex hero",
    client: "Codex",
    category: "Hero animation",
    year: "2026",
    cover: "/covers/Codex cover.png",
    span: "mid",
    description:
      "A campaign film for Dune Wellness's product launch — slow, breathing pacing meant to mirror the calm the brand sells, shot against minimal, sand-toned sets.",
    role: ["Direction", "Simulation"],
    gallery: ["/covers/tide-1.png"],
    previewGif: "/gifs/web m/codex.webm", videoUrl: 'https://youtu.be/cNfgj_DnlPI',
    overview:
      "Developing the hero visuals for Codex meant finding a simple way to communicate seamless currency exchange. Using fluid simulations, I created transitions where currencies naturally transformed into one another, reinforcing the platform's ability to move effortlessly between fiat and crypto.",
      tools: ["Houdini", "Cinema4D", "After effects"],
  },
  {
    id: "Sovereign",
    index: "12",
    title: "Sovereign Launch design",
    client: "Sovereign",
    category: "Launch Film",
    year: "2025",
    cover: "/covers/soveriegn cover.png",
    span: "mid",
    description:
      "A campaign film for Dune Wellness's product launch — slow, breathing pacing meant to mirror the calm the brand sells, shot against minimal, sand-toned sets.",
    role: ["Direction", "Animation"],
    gallery: ["/covers/tide-1.png"],
    previewGif: "/gifs/web m/sover.webm", videoUrl: 'https://youtu.be/cu0qdCOmbBM',
    overview:
      "Collaborating directly with the founder, I crafted a launch film around the idea that meaningful products can be built from anywhere in the world. Instead of focusing purely on technology, the visuals celebrated creativity, independence, and global collaboration. The film went on to reach 500K+ views on X.",
      tools: ["Blender", "Cinema4D", "After effects"],
  },
]

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id)
}

export function getAllProjectIds() {
  return projects.map((p) => p.id)
}

export function getAdjacentProject(id: string) {
  const idx = projects.findIndex((p) => p.id === id)
  if (idx === -1) return undefined
  return projects[(idx + 1) % projects.length]
}