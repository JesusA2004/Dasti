<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, ChevronRight, Code2, Globe, Zap, Bot, Mail, Network, Wrench, Monitor } from '@lucide/vue'

const canvasRef = ref<HTMLCanvasElement>()
let animFrameId: number

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number
}

const particles: Particle[] = []

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const parent = canvas.parentElement
  if (!parent) return

  const resize = () => {
    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000))
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.5 + 0.5,
    })
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(96,165,250,0.5)'
      ctx.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i]
      if (!pi) continue
      for (let j = i + 1; j < particles.length; j++) {
        const pj = particles[j]
        if (!pj) continue
        const dx = pi.x - pj.x
        const dy = pi.y - pj.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 110) {
          ctx.beginPath()
          ctx.moveTo(pi.x, pi.y)
          ctx.lineTo(pj.x, pj.y)
          ctx.strokeStyle = `rgba(59,130,246,${0.18 * (1 - dist / 110)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
    }

    animFrameId = requestAnimationFrame(animate)
  }

  animate()
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
})

const techTags = [
  { icon: Code2, label: 'Software a medida' },
  { icon: Mail, label: 'Correos empresariales' },
  { icon: Network, label: 'Redes y soporte' },
  { icon: Zap, label: 'Automatización' },
  { icon: Globe, label: 'Desarrollo web' },
  { icon: Bot, label: 'Chatbots' },
  { icon: Wrench, label: 'Mantenimiento' },
  { icon: Monitor, label: 'Equipos de cómputo' },
]

const scrollTo = (id: string) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="inicio"
    class="relative min-h-screen flex items-center overflow-hidden"
    style="background: linear-gradient(160deg, #020B18 0%, #0A1628 40%, #050D1A 100%);"
  >
    <!-- Canvas particles -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full pointer-events-none"
      style="opacity: 0.7;"
    />

    <!-- Grid overlay -->
    <div class="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

    <!-- Gradient orbs -->
    <div class="orb w-[600px] h-[600px] top-[-200px] right-[-100px]"
      style="background: rgba(37,99,235,0.06);" />
    <div class="orb w-[400px] h-[400px] bottom-[-100px] left-[-100px]"
      style="background: rgba(129,140,248,0.05);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Left: Text content -->
        <div>
          <!-- Badge -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="inline-flex items-center gap-2 mb-6"
          >
            <span class="tag">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Tecnología aplicada a soluciones reales
            </span>
          </div>

          <!-- Main headline -->
          <h1
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100, duration: 700 } }"
            class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Desarrollamos
            <span class="gradient-text block sm:inline"> soluciones digitales</span>
            <span class="text-white block"> para tu empresa</span>
          </h1>

          <!-- Subtitle -->
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 250, duration: 600 } }"
            class="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
          >
            Automatizaciones, sitios web, correos empresariales, redes y soporte técnico para que tu empresa trabaje de forma más eficiente, segura y profesional.
          </p>

          <!-- CTA buttons -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 600 } }"
            class="flex flex-wrap gap-4 mb-12"
          >
            <button class="btn-primary text-base" @click="scrollTo('#cotizador')">
              Cotizar servicio
              <ArrowRight :size="18" />
            </button>
            <button class="btn-outline text-base" @click="scrollTo('#servicios')">
              Ver servicios
            </button>
          </div>

          <!-- Tech tags -->
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 600, duration: 600 } }"
            class="flex flex-wrap gap-2"
          >
            <span
              v-for="tag in techTags"
              :key="tag.label"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-400 hover:text-blue-300 transition-colors cursor-default"
              style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);"
            >
              <component :is="tag.icon" :size="12" class="text-blue-400" />
              {{ tag.label }}
            </span>
          </div>
        </div>

        <!-- Right: Visual mockup -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 300, duration: 800 } }"
          class="hidden lg:flex justify-center items-center relative"
        >
          <!-- Main dashboard card -->
          <div class="relative w-full max-w-md animate-float">
            <div class="glass-card rounded-2xl p-6 glow-blue-sm">
              <!-- Card header -->
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                    style="background: rgba(37,99,235,0.2); border: 1px solid rgba(59,130,246,0.3);">
                    <Code2 :size="20" class="text-blue-400" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-white">Panel DASTI</div>
                    <div class="text-xs text-slate-500">Soluciones activas</div>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  style="background: rgba(34,197,94,0.12); color: #86efac; border: 1px solid rgba(34,197,94,0.25);">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Activo
                </div>
              </div>

              <!-- Metrics row -->
              <div class="grid grid-cols-3 gap-3 mb-5">
                <div v-for="(stat, i) in [
                  { label: 'Proyectos', value: '12+' },
                  { label: 'Servicios', value: '9' },
                  { label: 'Soporte', value: '24/7' },
                ]" :key="i"
                  class="rounded-xl p-3 text-center"
                  style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);"
                >
                  <div class="text-lg font-bold gradient-text">{{ stat.value }}</div>
                  <div class="text-xs text-slate-500">{{ stat.label }}</div>
                </div>
              </div>

              <!-- Service list -->
              <div class="space-y-2.5">
                <div v-for="(item, i) in [
                  { icon: Globe, label: 'Desarrollo web', status: 'Activo', color: '#3B82F6' },
                  { icon: Zap, label: 'Automatización', status: 'Activo', color: '#818CF8' },
                  { icon: Mail, label: 'Correo empresarial', status: 'Configurado', color: '#34D399' },
                  { icon: Network, label: 'Redes y soporte', status: 'Monitoreado', color: '#FBBF24' },
                ]" :key="i"
                  class="flex items-center justify-between rounded-lg px-3 py-2.5"
                  style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);"
                >
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-md flex items-center justify-center"
                      :style="`background: ${item.color}22; border: 1px solid ${item.color}40;`">
                      <component :is="item.icon" :size="14" :style="`color: ${item.color}`" />
                    </div>
                    <span class="text-xs font-medium text-slate-300">{{ item.label }}</span>
                  </div>
                  <span class="text-xs text-slate-500">{{ item.status }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating mini cards -->
          <div class="absolute -top-8 -right-4 animate-float-delayed">
            <div class="glass-card rounded-xl px-4 py-3 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                style="background: rgba(129,140,248,0.2);">
                <Zap :size="16" class="text-indigo-400" />
              </div>
              <div>
                <div class="text-xs font-semibold text-white">Proceso automatizado</div>
                <div class="text-xs text-slate-500">-68% tiempo manual</div>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-6 -left-4 animate-float" style="animation-delay: 1s;">
            <div class="glass-card rounded-xl px-4 py-3 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                style="background: rgba(34,197,94,0.15);">
                <Monitor :size="16" class="text-green-400" />
              </div>
              <div>
                <div class="text-xs font-semibold text-white">Soporte técnico</div>
                <div class="text-xs text-slate-500">Respuesta en &lt;2h</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom fade -->
    <div class="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
      style="background: linear-gradient(to bottom, transparent, #050D1A);" />
  </section>
</template>
