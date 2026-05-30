<script setup lang="ts">
import { Target, Users, Layers, ShieldCheck } from '@lucide/vue'

const pillars = [
  {
    icon: Target,
    title: 'Enfoque práctico',
    desc: 'Analizamos cada situación para proponer soluciones funcionales, no genéricas.',
    color: '#3B82F6',
  },
  {
    icon: Layers,
    title: 'Soluciones personalizadas',
    desc: 'Cada empresa tiene necesidades distintas. Adaptamos la tecnología a tu operación.',
    color: '#818CF8',
  },
  {
    icon: Users,
    title: 'Acompañamiento técnico',
    desc: 'No desaparecemos al entregar. Acompañamos al cliente durante y después de la implementación.',
    color: '#34D399',
  },
  {
    icon: ShieldCheck,
    title: 'Tecnología para empresas',
    desc: 'Trabajamos con negocios reales que necesitan soluciones confiables, seguras y escalables.',
    color: '#FBBF24',
  },
]
</script>

<template>
  <section id="nosotros" class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

    <!-- Gradient orb -->
    <div class="orb w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2"
      style="background: rgba(37,99,235,0.05);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section label -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Quiénes somos</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span class="text-white">Tecnología con propósito,</span>
          <span class="gradient-text block">enfocada en tu operación</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          DASTI nace con el objetivo de acercar soluciones tecnológicas funcionales a negocios y empresas
          que buscan mejorar su operación, automatizar procesos, fortalecer su presencia digital y contar con
          soporte técnico confiable.
        </p>
      </div>

      <!-- Main grid -->
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">

        <!-- Left: Text -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
        >
          <h3 class="font-display text-2xl font-bold text-white mb-4">
            No vendemos soluciones genéricas
          </h3>
          <p class="text-slate-400 leading-relaxed mb-6">
            En DASTI aplicamos la tecnología para resolver necesidades reales de las empresas. Analizamos el problema,
            proponemos una solución funcional y acompañamos al cliente en la implementación.
          </p>
          <p class="text-slate-400 leading-relaxed mb-8">
            Nos enfocamos en entender las necesidades reales de cada cliente para proponer soluciones claras,
            escalables y adaptadas a su operación, desde la primera reunión hasta la entrega final.
          </p>

          <!-- Stats strip -->
          <div class="grid grid-cols-3 gap-4">
            <div v-for="(stat, i) in [
              { label: 'Soluciones a medida', sub: 'Para cada empresa' },
              { label: 'Implementación', sub: 'Profesional y documentada' },
              { label: 'Acompañamiento', sub: 'Antes y después' },
            ]" :key="i"
              class="text-center p-4 rounded-xl"
              style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);"
            >
              <div class="text-xs font-semibold text-blue-300 mb-1">{{ stat.label }}</div>
              <div class="text-xs text-slate-500">{{ stat.sub }}</div>
            </div>
          </div>
        </div>

        <!-- Right: Pillars grid -->
        <div class="grid sm:grid-cols-2 gap-4">
          <div
            v-for="(pillar, i) in pillars"
            :key="pillar.title"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 600 } }"
            class="glass-card rounded-xl p-5"
          >
            <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              :style="`background: ${pillar.color}1A; border: 1px solid ${pillar.color}40;`">
              <component :is="pillar.icon" :size="20" :style="`color: ${pillar.color}`" />
            </div>
            <h4 class="font-semibold text-white mb-2">{{ pillar.title }}</h4>
            <p class="text-sm text-slate-400 leading-relaxed">{{ pillar.desc }}</p>
          </div>
        </div>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto" />
  </section>
</template>
