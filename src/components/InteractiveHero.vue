<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, MessageCircle, ChevronDown, Code2, Wifi, Mail, Zap, Monitor, Wrench, Lightbulb } from '@lucide/vue'
import AnimatedParticles from '@/components/AnimatedParticles.vue'

const router = useRouter()
const heroRef = ref<HTMLElement>()
const mouseX = ref(0)
const mouseY = ref(0)

const parallaxStyle = (factor: number) => ({
  transform: `translate(${mouseX.value * factor}px, ${mouseY.value * factor}px)`,
  transition: 'transform 0.18s ease-out',
})

const floatingChips = [
  { icon: Code2,     label: 'Software a medida',     sub: 'Sistemas propios',       color: '#3B82F6', factor: 22, cls: 'top-[18%] left-[4%] lg:left-[6%]' },
  { icon: Wifi,      label: 'Redes & Mesh',           sub: 'WiFi empresarial',        color: '#34D399', factor: 16, cls: 'top-[38%] left-[2%] lg:left-[3%]' },
  { icon: Mail,      label: 'Correos corporativos',   sub: '@tuempresa.com',          color: '#F472B6', factor: 28, cls: 'top-[16%] right-[4%] lg:right-[5%]' },
  { icon: Zap,       label: 'Automatización',         sub: 'Procesos optimizados',    color: '#FBBF24', factor: 20, cls: 'top-[42%] right-[2%] lg:right-[4%]' },
  { icon: Monitor,   label: 'Equipos de cómputo',     sub: 'Suministro & soporte',    color: '#FB923C', factor: 14, cls: 'bottom-[28%] left-[3%] lg:left-[5%]' },
  { icon: Lightbulb, label: 'Asesoramiento TI',       sub: 'Sin compromiso',          color: '#E879F9', factor: 18, cls: 'bottom-[26%] right-[3%] lg:right-[5%]' },
]

const handleMouseMove = (e: MouseEvent) => {
  const el = heroRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left) / rect.width - 0.5
  mouseY.value = (e.clientY - rect.top) / rect.height - 0.5
}
const handleMouseLeave = () => { mouseX.value = 0; mouseY.value = 0 }

onUnmounted(() => {})

const scrollToConfigurator = () => {
  document.querySelector('#configurador')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    style="background: var(--bg-base);"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Particle system: interactive connected network -->
    <AnimatedParticles
      density="high"
      variant="connected"
      size="md"
      :interactive="true"
      :glow="true"
      :opacity="0.75"
      speed="slow"
      :zIndex="1"
    />

    <!-- Grid overlay -->
    <div class="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

    <!-- Radial gradient hero -->
    <div class="absolute inset-0 pointer-events-none" style="background: var(--hero-gradient);" />

    <!-- Orb lights -->
    <div class="orb w-[600px] h-[600px] -top-40 right-[-180px] opacity-30"
      style="background: var(--accent-glow);" />
    <div class="orb w-[400px] h-[400px] bottom-[-100px] -left-20 opacity-20"
      style="background: var(--accent-glow);" />

    <!-- Floating chips (parallax, hidden on mobile) -->
    <div
      v-for="chip in floatingChips"
      :key="chip.label"
      :class="`absolute hidden lg:flex items-center gap-2.5 glass-card rounded-xl px-3 py-2 pointer-events-none ${chip.cls}`"
      :style="{ ...parallaxStyle(chip.factor), minWidth: '160px', boxShadow: 'var(--shadow-md)' }"
    >
      <div
        class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        :style="`background: ${chip.color}20; border: 1px solid ${chip.color}35;`"
      >
        <component :is="chip.icon" :size="13" :style="`color: ${chip.color};`" />
      </div>
      <div>
        <div class="text-xs font-semibold leading-tight" style="color: var(--text-primary);">{{ chip.label }}</div>
        <div class="text-xs" style="color: var(--text-muted);">{{ chip.sub }}</div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-28 pb-16 w-full">

      <!-- Badge -->
      <div
        v-motion
        :initial="{ opacity: 0, y: -12 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="flex items-center justify-center gap-2 mb-8"
      >
        <span class="tag text-sm">
          <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background: var(--accent-light);"></span>
          Desarrollo y Aplicación de Soluciones en TI
        </span>
      </div>

      <!-- Headline -->
      <h1
        v-motion
        :initial="{ opacity: 0, y: 28 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 80, duration: 700, ease: 'easeOut' } }"
        class="display-text mb-6 tracking-tight"
        style="font-size: clamp(2.6rem, 7vw, 5rem); color: var(--text-primary);"
      >
        <span class="gradient-text">Tecnología aplicada</span>
        <br />
        <span>a soluciones reales.</span>
      </h1>

      <!-- Subtitle -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 220, duration: 600 } }"
        class="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        style="color: var(--text-secondary);"
      >
        Desarrollamos e implementamos soluciones en TI para empresas: software, infraestructura, correos corporativos, redes, equipos, automatización e integración de sistemas.
      </p>

      <!-- CTAs -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 360, duration: 550 } }"
        class="flex flex-wrap gap-3 justify-center mb-14"
      >
        <button @click="router.push('/cotizador')" class="btn-primary text-base px-6 py-3">
          Cotizar solución
          <ArrowRight :size="16" />
        </button>
        <button @click="router.push('/contacto')" class="btn-outline text-base px-6 py-3">
          <MessageCircle :size="16" />
          Hablar con DASTI
        </button>
        <button @click="router.push('/servicios')" class="btn-ghost px-5 py-3">
          Explorar servicios
          <ArrowRight :size="14" />
        </button>
      </div>

      <!-- Stats row -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 520, duration: 600 } }"
        class="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
      >
        <div v-for="stat in [
          { value: '14+', label: 'Servicios en TI' },
          { value: '100%', label: 'Remoto o presencial' },
          { value: 'Morelos', label: 'Sede principal' },
        ]" :key="stat.label" class="flex flex-col items-center gap-1">
          <span class="font-display font-bold text-2xl sm:text-3xl gradient-text">{{ stat.value }}</span>
          <span class="text-xs sm:text-sm" style="color: var(--text-muted);">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 900, duration: 600 } }"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
      @click="scrollToConfigurator"
    >
      <span class="text-xs tracking-widest uppercase" style="color: var(--text-muted);">Explorar</span>
      <div
        class="w-8 h-12 rounded-full border flex items-start justify-center pt-2 group-hover:border-opacity-60 transition-colors"
        style="border-color: var(--border-medium);"
      >
        <ChevronDown :size="14" class="animate-scan" style="color: var(--accent-light);" />
      </div>
    </div>
  </section>
</template>
