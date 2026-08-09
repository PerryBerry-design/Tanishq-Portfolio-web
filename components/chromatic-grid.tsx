"use client"

import { useEffect, useRef, useState } from "react"

type ChromaticGridConfig = {
  spacing: number
  fontSize: number
  baseOpacity: number
  maxOpacity: number
  minScale: number
  maxScale: number
  speed: number
  zoom: number
  color: string
  chromaticShift: number
  hoverRadius: number
  hoverMaxScale: number
  hoverAttack: number
  hoverRelease: number
}

const DEFAULT_CONFIG: ChromaticGridConfig = {
  spacing: 50,
  fontSize: 14,
  baseOpacity: 0.05,
  maxOpacity: 0.9,
  minScale: 0.4,
  maxScale: 1.6,
  speed: 0.45,
  zoom: 0.005,
  color: "233, 201, 155",
  chromaticShift: 0.2,
  hoverRadius: 160,
  hoverMaxScale: 2.0,
  hoverAttack: 0.3,
  hoverRelease: 0.04,
}

function createSimplexNoise() {
  const F3 = 1.0 / 3.0
  const G3 = 1.0 / 6.0
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256)
  const perm = new Uint8Array(512)
  const permMod12 = new Uint8Array(512)
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255]
    permMod12[i] = perm[i] % 12
  }

  function noise3D(xin: number, yin: number, zin: number) {
    let n0: number, n1: number, n2: number, n3: number
    const s = (xin + yin + zin) * F3
    const i = Math.floor(xin + s)
    const j = Math.floor(yin + s)
    const k = Math.floor(zin + s)
    const t = (i + j + k) * G3
    const X0 = i - t
    const Y0 = j - t
    const Z0 = k - t
    const x0 = xin - X0
    const y0 = yin - Y0
    const z0 = zin - Z0

    let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1 }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1 }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1 }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1 }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
    }

    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3
    const x2 = x0 - i2 + 2.0 * G3, y2 = y0 - j2 + 2.0 * G3, z2 = z0 - k2 + 2.0 * G3
    const x3 = x0 - 1.0 + 3.0 * G3, y3 = y0 - 1.0 + 3.0 * G3, z3 = z0 - 1.0 + 3.0 * G3

    const ii = i & 255, jj = j & 255, kk = k & 255
    const gi0 = permMod12[ii + perm[jj + perm[kk]]]
    const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]]
    const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]]
    const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]]

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
    if (t0 < 0) { n0 = 0.0 } else { t0 *= t0; n0 = t0 * t0 * (gi0 % 2 === 0 ? 1 : -1) * (x0 + y0) }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
    if (t1 < 0) { n1 = 0.0 } else { t1 *= t1; n1 = t1 * t1 * (gi1 % 2 === 0 ? 1 : -1) * (x1 + y1) }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
    if (t2 < 0) { n2 = 0.0 } else { t2 *= t2; n2 = t2 * t2 * (gi2 % 2 === 0 ? 1 : -1) * (x2 + y2) }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
    if (t3 < 0) { n3 = 0.0 } else { t3 *= t3; n3 = t3 * t3 * (gi3 % 2 === 0 ? 1 : -1) * (x3 + y3) }

    return 32.0 * (n0 + n1 + n2 + n3)
  }

  return { noise3D }
}

function createChimeEngine() {
  let ctx: AudioContext | null = null
  let masterGain: GainNode | null = null
  let reverbNode: ConvolverNode | null = null
  let dryGain: GainNode | null = null
  let wetGain: GainNode | null = null
  let unlocked = false
  let muted = false

  const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25]

  function buildReverbImpulse(audioCtx: AudioContext, seconds = 2.2, decay = 3.2) {
    const rate = audioCtx.sampleRate
    const length = Math.floor(rate * seconds)
    const impulse = audioCtx.createBuffer(2, length, rate)
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch)
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
      }
    }
    return impulse
  }

  function init() {
    if (unlocked || typeof window === "undefined") return
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return

    ctx = new AudioCtx()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.5

    dryGain = ctx.createGain()
    wetGain = ctx.createGain()
    dryGain.gain.value = 0.55
    wetGain.gain.value = 0.75

    reverbNode = ctx.createConvolver()
    reverbNode.buffer = buildReverbImpulse(ctx)

    dryGain.connect(masterGain)
    reverbNode.connect(wetGain)
    wetGain.connect(masterGain)
    masterGain.connect(ctx.destination)

    unlocked = true
  }

  function resume() {
    if (ctx && ctx.state === "suspended") {
      ctx.resume()
    }
  }

  function playChime(intensity: number) {
    if (!ctx || !masterGain || !dryGain || !reverbNode || muted) return
    resume()

    const clamped = Math.min(1, Math.max(0, intensity))
    const noteCount = clamped < 0.35 ? 1 : clamped < 0.7 ? 2 : 3
    const baseVolume = 0.05 + clamped * 0.09
    const attack = 0.02 + (1 - clamped) * 0.03
    const release = 1.6 + (1 - clamped) * 1.4

    for (let n = 0; n < noteCount; n++) {
      const freq = SCALE[Math.floor(Math.random() * SCALE.length)] * (n === 0 ? 1 : n === 1 ? 2 : 1.5)

      const osc = ctx.createOscillator()
      osc.type = "sine"
      osc.frequency.value = freq

      const noteGain = ctx.createGain()
      const now = ctx.currentTime
      noteGain.gain.setValueAtTime(0, now)
      noteGain.gain.linearRampToValueAtTime(baseVolume / noteCount, now + attack)
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + attack + release)

      osc.connect(noteGain)
      noteGain.connect(dryGain)
      noteGain.connect(reverbNode)

      osc.start(now)
      osc.stop(now + attack + release + 0.1)
    }
  }

  function setMuted(value: boolean) {
    muted = value
  }

  function dispose() {
    if (ctx) {
      ctx.close()
      ctx = null
      unlocked = false
    }
  }

  return { init, playChime, setMuted, dispose }
}

type Dot = {
  x: number
  y: number
  symbol: HTMLCanvasElement
  hoverEase: number
  timeOffset: number
}

export function ChromaticGrid({
  config: userConfig,
  className,
  soundEnabled = true,
}: {
  config?: Partial<ChromaticGridConfig>
  className?: string
  soundEnabled?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [needsUnlock, setNeedsUnlock] = useState(soundEnabled)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const config: ChromaticGridConfig = { ...DEFAULT_CONFIG, ...userConfig }
    const simplex = createSimplexNoise()
    const chime = createChimeEngine()
    chime.setMuted(!soundEnabled)

    let dots: Dot[] = []
    let currentDpr = 1
    let spritePlus!: HTMLCanvasElement
    let spriteDot!: HTMLCanvasElement
    let spriteDrawSize = 0
    let rafId = 0

    const mouse = { x: -1000, y: -1000, isActive: false }

    let lastMouseX = -1000
    let lastMouseY = -1000
    let lastMouseTime = 0
    let lastChimeTime = 0
    const CHIME_COOLDOWN_MS = 220

    function generateSprites() {
      spriteDrawSize = config.fontSize * 3
      const maxResolutionScale = config.hoverMaxScale * currentDpr
      const pixelCanvasSize = spriteDrawSize * maxResolutionScale

      const [r, g, b] = config.color.split(",").map(Number)
      const shift = config.chromaticShift

      function createSymbolSprite(symbol: string) {
        const offscreen = document.createElement("canvas")
        offscreen.width = pixelCanvasSize
        offscreen.height = pixelCanvasSize
        const oCtx = offscreen.getContext("2d")!

        oCtx.scale(maxResolutionScale, maxResolutionScale)
        oCtx.textAlign = "center"
        oCtx.textBaseline = "middle"
        oCtx.font = `${config.fontSize}px monospace`
        oCtx.globalCompositeOperation = "lighter"

        const centerX = spriteDrawSize / 2
        const centerY = spriteDrawSize / 2

        oCtx.fillStyle = `rgb(${r}, 0, 0)`
        oCtx.fillText(symbol, centerX - shift, centerY - shift * 0.5)

        oCtx.fillStyle = `rgb(0, ${g}, 0)`
        oCtx.fillText(symbol, centerX, centerY)

        oCtx.fillStyle = `rgb(0, 0, ${b})`
        oCtx.fillText(symbol, centerX + shift, centerY + shift * 0.5)

        return offscreen
      }

      spritePlus = createSymbolSprite("+")
      spriteDot = createSymbolSprite("\u00B7")
    }

    function createGrid(width: number, height: number) {
      dots = []
      const cols = Math.ceil(width / config.spacing)
      const rows = Math.ceil(height / config.spacing)

      const offsetX = (width - cols * config.spacing) / 2
      const offsetY = (height - rows * config.spacing) / 2

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const isPlus = (i + j) % 2 === 0
          dots.push({
            x: i * config.spacing + offsetX,
            y: j * config.spacing + offsetY,
            symbol: isPlus ? spritePlus : spriteDot,
            hoverEase: 0,
            timeOffset: Math.random() * 100,
          })
        }
      }
    }

    function resize() {
      currentDpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * currentDpr
      canvas.height = height * currentDpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      generateSprites()
      createGrid(width, height)
    }

    function animate(timestamp: number) {
      const globalTime = timestamp * 0.001 * config.speed

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const activeHoverRadius = config.hoverRadius
      const halfSize = spriteDrawSize / 2

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        const localTime = globalTime + dot.timeOffset * 0.02
        const rawNoise = simplex.noise3D(dot.x * config.zoom, dot.y * config.zoom, localTime)
        const normalizedNoise = (rawNoise + 1) / 2
        const intensity = Math.pow(normalizedNoise, 3.2)

        const noiseOpacity = config.baseOpacity + intensity * (config.maxOpacity - config.baseOpacity)
        const noiseScale = config.minScale + intensity * (config.maxScale - config.minScale)

        let targetHoverEase = 0
        if (mouse.isActive) {
          const dx = dot.x - mouse.x
          const dy = dot.y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < activeHoverRadius) {
            targetHoverEase = 1 - distance / activeHoverRadius
          }
        }

        if (targetHoverEase > dot.hoverEase) {
          dot.hoverEase += (targetHoverEase - dot.hoverEase) * config.hoverAttack
        } else {
          dot.hoverEase += (targetHoverEase - dot.hoverEase) * config.hoverRelease
        }

        const finalScale = noiseScale + dot.hoverEase * (config.hoverMaxScale - noiseScale)
        const finalOpacity = noiseOpacity + dot.hoverEase * (1.0 - noiseOpacity)

        const s = finalScale * currentDpr
        ctx.setTransform(s, 0, 0, s, dot.x * currentDpr, dot.y * currentDpr)
        ctx.globalAlpha = finalOpacity

        ctx.drawImage(dot.symbol, -halfSize, -halfSize, spriteDrawSize, spriteDrawSize)
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      rafId = requestAnimationFrame(animate)
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.isActive = true

      if (soundEnabled) {
        const now = performance.now()
        const dt = now - lastMouseTime
        if (lastMouseTime > 0 && dt > 0) {
          const dx = e.clientX - lastMouseX
          const dy = e.clientY - lastMouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const speed = distance / dt

          const intensity = Math.min(1, speed / 2.2)
          const cooldown = CHIME_COOLDOWN_MS - intensity * 100
          if (speed > 0.15 && now - lastChimeTime > cooldown) {
            chime.playChime(intensity)
            lastChimeTime = now
          }
        }
        lastMouseX = e.clientX
        lastMouseY = e.clientY
        lastMouseTime = now
      }
    }

    function handleMouseOut() {
      mouse.isActive = false
    }

    // Unlock audio on the first real user gesture (click/tap, key press,
    // or scroll all count — mousemove does NOT, per browser autoplay policy).
    function handleFirstInteraction() {
      if (soundEnabled) {
        chime.init()
        chime.playChime(0.15)
        setNeedsUnlock(false)
      }
      window.removeEventListener("pointerdown", handleFirstInteraction)
      window.removeEventListener("keydown", handleFirstInteraction)
      window.removeEventListener("scroll", handleFirstInteraction)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseout", handleMouseOut)
    window.addEventListener("pointerdown", handleFirstInteraction, { once: true })
    window.addEventListener("keydown", handleFirstInteraction, { once: true })
    window.addEventListener("scroll", handleFirstInteraction, { once: true, passive: true })

    resize()
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("pointerdown", handleFirstInteraction)
      window.removeEventListener("keydown", handleFirstInteraction)
      window.removeEventListener("scroll", handleFirstInteraction)
      chime.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundEnabled])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className ?? "pointer-events-none fixed inset-0 z-0"}
        aria-hidden="true"
      />
      {soundEnabled && needsUnlock && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-6 left-1/2 z-10 -translate-x-1/2 animate-pulse rounded-full border border-border bg-background/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md"
        >
          Click anywhere for sound ✨
        </div>
      )}
    </>
  )
}