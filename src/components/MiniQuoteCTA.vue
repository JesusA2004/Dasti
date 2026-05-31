<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRight, MessageCircle, Calculator, Zap } from '@lucide/vue'

const router = useRouter()

const highlights = [
  { icon: Zap, label: 'Respuesta en 24h', color: '#FBBF24' },
  { icon: Calculator, label: 'Sin costos ocultos', color: '#34D399' },
  { icon: MessageCircle, label: 'Asesoría incluida', color: '#F472B6' },
]
</script>

<template>
  <section class="py-24 relative overflow-hidden" style="background: var(--bg-surface);">

    <!-- Background canvas decoration -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute inset-0 grid-bg opacity-20"
      />
      <div class="orb w-[700px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
        style="background: var(--accent-glow);" />
      <div class="orb w-[300px] h-[300px] top-0 left-0 opacity-10" style="background: var(--accent-glow);" />
      <div class="orb w-[200px] h-[200px] bottom-0 right-0 opacity-10" style="background: var(--accent-glow);" />
    </div>

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
        style="background: var(--bg-card); border: 1px solid var(--border-medium); backdrop-filter: blur(20px);"
      >
        <!-- Inner glow -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
          style="background: radial-gradient(ellipse at top, var(--accent-glow) 0%, transparent 70%);" />

        <div class="relative">
          <!-- Badge -->
          <div class="flex items-center justify-center gap-2 mb-6">
            <span class="tag">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Cotizador disponible ahora
            </span>
          </div>

          <!-- Headline -->
          <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl mb-5" style="color: var(--text-primary);">
            ¿Cuánto cuesta la
            <span class="gradient-text"> solución que necesitas?</span>
          </h2>

          <p class="text-base sm:text-lg max-w-xl mx-auto mb-8" style="color: var(--text-secondary);">
            Usa nuestro cotizador para estimar la inversión. Selecciona servicios, ajusta cantidades y obtén un desglose transparente.
          </p>

          <!-- Highlights -->
          <div class="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div
              v-for="h in highlights"
              :key="h.label"
              class="flex items-center gap-2"
            >
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center"
                :style="`background: ${h.color}15; border: 1px solid ${h.color}25;`"
              >
                <component :is="h.icon" :size="13" :style="`color: ${h.color};`" />
              </div>
              <span class="text-sm font-medium" style="color: var(--text-secondary);">{{ h.label }}</span>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4 justify-center">
            <button @click="router.push('/cotizador')" class="btn-primary text-base px-8 py-3.5">
              <Calculator :size="17" />
              Abrir cotizador
              <ArrowRight :size="15" />
            </button>
            <button @click="router.push('/contacto')" class="btn-outline text-base px-8 py-3.5">
              <MessageCircle :size="17" />
              Hablar primero
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
