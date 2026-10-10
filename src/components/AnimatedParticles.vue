<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Red de partículas en canvas (concepto original del hero DASTI).
 * Mejoras del rediseño:
 * - Escalado por devicePixelRatio (nitidez en pantallas retina).
 * - Densidad proporcional al área (menos partículas en móvil).
 * - Se pausa fuera del viewport o con la pestaña oculta.
 * - Con prefers-reduced-motion dibuja un único cuadro estático.
 * - `color` opcional (RGB "r, g, b"); por defecto usa --canvas-particle.
 * - En modo interactivo, el puntero conecta los nodos cercanos.
 */
const props = withDefaults(defineProps<{
  density?: 'low' | 'medium' | 'high' | 'ultra'
  variant?: 'minimal' | 'dots' | 'connected' | 'network'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  glow?: boolean
  opacity?: number
  speed?: 'slow' | 'normal' | 'fast'
  zIndex?: number
  color?: string
}>(), {
  density: 'medium',
  variant: 'connected',
  size: 'md',
  interactive: false,
  glow: false,
  opacity: 0.85,
  speed: 'normal',
  zIndex: 0,
  color: '',
})

const canvasRef = ref<HTMLCanvasElement>()
let rafId = 0
let running = false
let visible = true
let mouseX = -1000
let mouseY = -1000
let ro: ResizeObserver | null = null
let io: IntersectionObserver | null = null
let docMoveHandler: ((e: PointerEvent) => void) | null = null
let visibilityHandler: (() => void) | null = null

// Partículas por cada 100.000 px² (referencia: ~1440×800)
const densityMap = { low: 3, medium: 5.6, high: 8.6, ultra: 12 }
const speedMap = { slow: 0.22, normal: 0.42, fast: 0.72 }
const sizeMap = { sm: [0.6, 2.0], md: [1.2, 2.8], lg: [2.0, 4.4] }

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  let w = 0
  let h = 0
  let rgb = '59,130,246'
  let frame = 0

  type Particle = { x: number; y: number; vx: number; vy: number; r: number; op: number; phase: number }
  let particles: Particle[] = []

  const readColor = () => {
    rgb = props.color ||
      getComputedStyle(document.documentElement).getPropertyValue('--canvas-particle').trim() ||
      '59,130,246'
  }

  const initParticles = () => {
    const area = (w * h) / 100000
    const count = Math.round(Math.min(160, Math.max(18, area * densityMap[props.density])))
    const spd = speedMap[props.speed]
    const [rMin, rMax] = sizeMap[props.size]
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * spd,
      vy: (Math.random() - 0.5) * spd,
      r: rMin + Math.random() * (rMax - rMin),
      op: 0.3 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
    }))
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = canvas.offsetWidth
    h = canvas.offsetHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    initParticles()
    if (reduced || !running) drawFrame(false)
  }

  const drawFrame = (animate: boolean) => {
    ctx.clearRect(0, 0, w, h)
    const t = performance.now() * 0.001
    const connectDist = props.variant === 'network' ? 160 : 130
    const connectSq = connectDist * connectDist

    if (animate) {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        if (props.interactive && mouseX > -100) {
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const d = Math.sqrt(dx * dx + dy * dy)
          const radius = 120
          if (d < radius && d > 0) {
            const force = ((radius - d) / radius) * 0.7
            p.x += (dx / d) * force
            p.y += (dy / d) * force
          }
        }
      }
    }

    if (props.variant === 'connected' || props.variant === 'network') {
      ctx.lineWidth = props.variant === 'network' ? 0.8 : 0.65
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dSq = dx * dx + dy * dy
          if (dSq < connectSq) {
            const alpha = (1 - Math.sqrt(dSq) / connectDist) * 0.28 * props.opacity
            ctx.strokeStyle = `rgba(${rgb},${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }

    // Conexiones con el puntero
    if (props.interactive && mouseX > -100) {
      const reach = 180
      ctx.lineWidth = 0.8
      for (const p of particles) {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < reach) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - d / reach) * 0.55 * props.opacity})`
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
        }
      }
    }

    for (let idx = 0; idx < particles.length; idx++) {
      const p = particles[idx]
      const pulse = props.variant === 'network' ? 1 + Math.sin(t * 1.5 + p.phase) * 0.12 : 1
      const radius = p.r * pulse

      if (props.glow) {
        ctx.shadowBlur = radius * 3.5
        ctx.shadowColor = `rgba(${rgb}, 0.6)`
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, props.variant === 'minimal' ? radius * 0.75 : radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb},${p.op * (props.variant === 'minimal' ? 0.6 : 1) * props.opacity})`
      ctx.fill()

      if (props.glow) ctx.shadowBlur = 0

      if (props.variant === 'network' && idx % 7 === 0) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.op * 0.18 * props.opacity})`
        ctx.fill()
      }
    }
  }

  const loop = () => {
    if (!running) return
    // Relee el color cada ~2 s por si cambia el tema
    if (frame++ % 120 === 0) readColor()
    drawFrame(true)
    rafId = requestAnimationFrame(loop)
  }

  const start = () => {
    if (running || reduced || !visible || document.hidden) return
    running = true
    rafId = requestAnimationFrame(loop)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(rafId)
  }

  readColor()
  resize()
  drawFrame(false)

  ro = new ResizeObserver(resize)
  ro.observe(canvas)

  io = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting)
    if (visible) start()
    else stop()
  })
  io.observe(canvas)

  visibilityHandler = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', visibilityHandler)

  if (props.interactive && !reduced) {
    docMoveHandler = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const rect = canvas.getBoundingClientRect()
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
      } else {
        mouseX = -1000
        mouseY = -1000
      }
    }
    document.addEventListener('pointermove', docMoveHandler, { passive: true })
  }

  start()
})

onUnmounted(() => {
  running = false
  cancelAnimationFrame(rafId)
  ro?.disconnect()
  io?.disconnect()
  if (docMoveHandler) {
    document.removeEventListener('pointermove', docMoveHandler)
    docMoveHandler = null
  }
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
    visibilityHandler = null
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 h-full w-full"
    :style="{ zIndex, pointerEvents: 'none' }"
    aria-hidden="true"
  />
</template>
