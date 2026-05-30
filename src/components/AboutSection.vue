<script setup lang="ts">
import { Layers, Wrench, Users, Target } from '@lucide/vue'

const pillars = [
  {
    icon: Layers,
    title: 'Soluciones integrales en TI',
    desc: 'No nos limitamos a un solo servicio. Integramos software, infraestructura, soporte técnico, equipos y herramientas digitales para que la tecnología funcione como parte real de la operación.',
    color: '#3B82F6',
  },
  {
    icon: Target,
    title: 'Desarrollo e implementación',
    desc: 'Desarrollamos, implementamos y configuramos cada solución con base en las necesidades reales de la empresa, no en plantillas genéricas.',
    color: '#818CF8',
  },
  {
    icon: Wrench,
    title: 'Infraestructura y soporte',
    desc: 'Administramos redes, equipos de cómputo, impresoras y sistemas de comunicación para mantener la operación tecnológica funcionando de forma estable.',
    color: '#34D399',
  },
  {
    icon: Users,
    title: 'Tecnología alineada a la operación',
    desc: 'Trabajamos con un enfoque práctico: analizamos la necesidad, proponemos una solución viable, la implementamos y acompañamos al cliente durante el proceso.',
    color: '#FBBF24',
  },
]
</script>

<template>
  <section id="nosotros" class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
    <div class="orb w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2"
      style="background: rgba(37,99,235,0.05);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Quiénes somos</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span class="text-white">Soluciones en TI para</span>
          <span class="gradient-text block">la operación empresarial</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          DASTI, Desarrollo y Aplicación de Soluciones en TI, es una empresa enfocada en desarrollar, implementar y administrar
          soluciones tecnológicas para empresas que buscan mejorar su operación, infraestructura, comunicación y procesos internos.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">

        <!-- Left: Text -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
        >
          <h3 class="font-display text-2xl font-bold text-white mb-4">
            No nos limitamos a un solo servicio
          </h3>
          <p class="text-slate-400 leading-relaxed mb-5">
            Integramos software, infraestructura, soporte técnico, equipos de cómputo, redes, correos corporativos y
            herramientas digitales para que la tecnología funcione como una parte real de la operación del negocio.
          </p>
          <p class="text-slate-400 leading-relaxed mb-8">
            Trabajamos con un enfoque práctico: analizamos la necesidad, proponemos una solución viable,
            la implementamos y acompañamos al cliente durante el proceso.
          </p>

          <div class="grid grid-cols-2 gap-3">
            <div v-for="(stat, i) in [
              { label: 'Software a medida', sub: 'Desarrollado para tu operación' },
              { label: 'Infraestructura', sub: 'Redes, mesh y equipos' },
              { label: 'Soporte técnico', sub: 'Prevención y solución' },
              { label: 'Acompañamiento', sub: 'Antes, durante y después' },
            ]" :key="i"
              class="p-4 rounded-xl"
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
