<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  density?: 'low' | 'medium' | 'high' | 'ultra'
  variant?: 'minimal' | 'dots' | 'connected' | 'network'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  glow?: boolean
  opacity?: number
  speed?: 'slow' | 'normal' | 'fast'
  zIndex?: number
}>(), {
  density: 'medium',
  variant: 'connected',
  size: 'md',
  interactive: false,
  glow: false,
  opacity: 0.85,
  speed: 'normal',
  zIndex: 0,
})

const canvasRef = ref<HTMLCanvasElement>()
let rafId = 0
let mouseX = -1000
let mouseY = -1000

const densityMap = { low: 35, medium: 65, high: 100, ultra: 140 }
const speedMap = { slow: 0.22, normal: 0.42, fast: 0.72 }
const sizeMap = { sm: [0.6, 2.0], md: [1.4, 3.4], lg: [2.2, 5.0] }

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  let w = 0, h = 0
  type Particle = { x: number; y: number; vx: number; vy: number; r: number; op: number; phase: number }
  let particles: Particle[] = []

  const resize = () => {
    w = canvas.width = canvas.offsetWidth
    h = canvas.height = canvas.offsetHeight
    initParticles()
  }

  const initParticles = () => {
    const count = densityMap[props.density]
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

  const getRGB = () =>
    getComputedStyle(document.documentElement).getPropertyValue('--canvas-particle').trim() || '59,130,246'

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    const rgb = getRGB()
    const t = Date.now() * 0.001
    const connectDist = props.variant === 'network' ? 160 : 130

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1

      // Mouse repulsion
      if (props.interactive && mouseX > -100) {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const d = Math.sqrt(dx * dx + dy * dy)
        const radius = 110
        if (d < radius && d > 0) {
          const force = ((radius - d) / radius) * 0.8
          p.x += (dx / d) * force
          p.y += (dy / d) * force
        }
      }
    })

    // Draw connections
    if (props.variant === 'connected' || props.variant === 'network') {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < connectDist) {
            const alpha = (1 - d / connectDist) * 0.28 * props.opacity
            ctx.strokeStyle = `rgba(${rgb},${alpha})`
            ctx.lineWidth = props.variant === 'network' ? 0.8 : 0.65
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Draw particles
    particles.forEach((p, idx) => {
      const pulse = props.variant === 'network' ? 1 + Math.sin(t * 1.5 + p.phase) * 0.12 : 1
      const radius = p.r * pulse

      if (props.glow) {
        ctx.shadowBlur = radius * 3.5
        ctx.shadowColor = `rgba(${rgb}, 0.65)`
      }

      if (props.variant === 'minimal') {
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 0.75, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.op * 0.6 * props.opacity})`
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.op * props.opacity})`
        ctx.fill()
      }

      if (props.glow) ctx.shadowBlur = 0

      // Larger "node" particles in network variant
      if (props.variant === 'network' && idx % 7 === 0) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.op * 0.18 * props.opacity})`
        ctx.fill()
      }
    })

    rafId = requestAnimationFrame(draw)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!props.interactive) return
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  }
  const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000 }

  resize()
  draw()

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  if (props.interactive) {
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    // Forward parent mousemove if canvas has pointer-events none
    document.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
      }
    })
  }

  return () => {
    cancelAnimationFrame(rafId)
    ro.disconnect()
  }
})

onUnmounted(() => cancelAnimationFrame(rafId))
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full"
    :style="`z-index: ${zIndex}; pointer-events: ${interactive ? 'none' : 'none'};`"
  />
</template>
