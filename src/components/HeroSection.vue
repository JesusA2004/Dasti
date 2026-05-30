<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { ArrowRight, MessageCircle, Code2, Wifi, Mail, Zap, Monitor, Wrench } from '@lucide/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mouse parallax
const heroRef = ref<HTMLElement>()
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  const el = heroRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left) / rect.width - 0.5
  mouseY.value = (e.clientY - rect.top) / rect.height - 0.5
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
}

const parallaxStyle = (factor: number, baseX = 0, baseY = 0) => ({
  transform: `translate(${baseX + mouseX.value * factor}px, ${baseY + mouseY.value * factor}px)`,
  transition: 'transform 0.15s ease-out',
})

const floatingCards = [
  {
    icon: Code2, color: '#3B82F6',
    title: 'Software a medida',
    sub: 'Sistemas propios',
    factor: 22, pos: 'top-8 -left-6 lg:-left-10',
  },
  {
    icon: Wifi, color: '#34D399',
    title: 'Redes y mesh',
    sub: 'WiFi empresarial',
    factor: 18, pos: 'bottom-20 -left-4 lg:-left-8',
  },
  {
    icon: Mail, color: '#F472B6',
    title: 'Correos corporativos',
    sub: '@tuempresa.com',
    factor: 28, pos: 'top-4 -right-4 lg:-right-10',
  },
  {
    icon: Zap, color: '#FBBF24',
    title: 'Automatización',
    sub: 'Procesos optimizados',
    factor: 20, pos: 'bottom-8 -right-4 lg:-right-8',
  },
]

const stats = [
  { value: '14+', label: 'Servicios en TI' },
  { value: '100%', label: 'Remoto o presencial' },
  { value: 'Sin', label: 'Plantillas genéricas' },
]
</script>

<template>
  <section
    ref="heroRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    class="relative min-h-screen flex items-center overflow-hidden"
    style="background: var(--bg-base);"
  >
    <!-- Grid -->
    <div class="absolute inset-0 grid-bg opacity-35 pointer-events-none" />

    <!-- Glow blobs -->
    <div class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 55% 45% at 65% 40%, var(--accent-glow-sm) 0%, transparent 70%);" />
    <div class="orb w-[700px] h-[600px] -top-40 right-[-200px]"
      style="background: var(--accent-glow-sm);" />
    <div class="orb w-[400px] h-[400px] bottom-[-150px] -left-20"
      style="background: var(--accent-glow-sm); opacity: 0.5;" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- LEFT: text content -->
        <div class="relative z-10">
          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 550 } }"
            class="mb-6"
          >
            <span class="tag">
              <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background: var(--accent-light);"></span>
              Soluciones integrales en Tecnologías de la Información
            </span>
          </div>

          <h1
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 80, duration: 650 } }"
            class="font-display font-bold leading-[1.08] mb-6 tracking-tight"
            style="font-size: clamp(2.2rem, 5.5vw, 3.75rem); color: var(--text-primary);"
          >
            <span class="gradient-text">Tecnología aplicada</span><br>
            <span>a soluciones reales.</span>
          </h1>

          <p
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
            class="text-lg leading-relaxed mb-8 max-w-lg"
            style="color: var(--text-secondary);"
          >
            Desarrollamos e implementamos soluciones en TI para empresas: software, infraestructura, correos corporativos, redes, equipos, automatización e integración de sistemas.
          </p>

          <div
            v-motion
            :initial="{ opacity: 0, y: 14 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 320, duration: 550 } }"
            class="flex flex-wrap gap-3 mb-10"
          >
            <button class="btn-primary text-base" @click="router.push('/cotizador')">
              Cotizar solución
              <ArrowRight :size="17" />
            </button>
            <button class="btn-outline text-base" @click="router.push('/contacto')">
              <MessageCircle :size="17" />
              Hablar con DASTI
            </button>
          </div>

          <!-- Stats row -->
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 480, duration: 600 } }"
            class="flex flex-wrap gap-6"
          >
            <div v-for="s in stats" :key="s.label" class="flex items-center gap-2.5">
              <div class="text-xl font-bold font-display gradient-text">{{ s.value }}</div>
              <div class="text-xs leading-tight" style="color: var(--text-muted);">{{ s.label }}</div>
            </div>
          </div>
        </div>

        <!-- RIGHT: visual composition with parallax -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.96 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: 180, duration: 750 } }"
          class="hidden lg:block relative"
          style="height: 520px;"
        >
          <!-- Main image with parallax -->
          <div
            :style="parallaxStyle(-14)"
            class="absolute inset-4 rounded-2xl overflow-hidden img-zoom"
            style="border: 1px solid var(--border-subtle); box-shadow: var(--shadow-lg);"
          >
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&auto=format&fit=crop&q=80"
              alt="Tecnología aplicada a soluciones reales"
              class="w-full h-full object-cover"
              loading="eager"
            />
            <div class="absolute inset-0 pointer-events-none"
              style="background: linear-gradient(135deg, var(--bg-base) 0%, transparent 35%, transparent 65%, var(--bg-base) 100%); opacity: 0.55;" />
          </div>

          <!-- Floating cards with individual parallax -->
          <div
            v-for="card in floatingCards"
            :key="card.title"
            :style="parallaxStyle(card.factor)"
            :class="`absolute ${card.pos} glass-card rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 cursor-default pointer-events-none`"
            style="min-width: 168px; box-shadow: var(--shadow-md);"
          >
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              :style="`background: ${card.color}22; border: 1px solid ${card.color}40;`">
              <component :is="card.icon" :size="15" :style="`color: ${card.color};`" />
            </div>
            <div>
              <div class="text-xs font-semibold" style="color: var(--text-primary);">{{ card.title }}</div>
              <div class="text-xs" style="color: var(--text-muted);">{{ card.sub }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom fade into next section -->
    <div class="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
      style="background: linear-gradient(to bottom, transparent, var(--bg-base));" />
  </section>
</template>
