<script setup lang="ts">
import { Search, FileText, Settings, CheckCircle, Rocket } from '@lucide/vue'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    desc: 'Escuchamos la necesidad, problema o idea del cliente. Analizamos el contexto, los recursos disponibles y los objetivos a alcanzar.',
    color: '#3B82F6',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Propuesta',
    desc: 'Definimos alcance, solución recomendada, tiempos y costos. Presentamos una propuesta clara y sin tecnicismos innecesarios.',
    color: '#818CF8',
  },
  {
    number: '03',
    icon: Settings,
    title: 'Implementación',
    desc: 'Desarrollamos, configuramos o instalamos la solución acordada, manteniendo comunicación continua con el cliente.',
    color: '#34D399',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Pruebas',
    desc: 'Validamos funcionamiento, rendimiento y ajustes necesarios antes de la entrega definitiva. El cliente participa en la revisión.',
    color: '#FBBF24',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Entrega y acompañamiento',
    desc: 'Entregamos la solución lista para operar y damos seguimiento técnico según el tipo de servicio.',
    color: '#F472B6',
  },
]
</script>

<template>
  <section id="proceso" class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[600px] h-[400px] bottom-0 right-0"
      style="background: rgba(129,140,248,0.04);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Nuestro proceso</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Cómo trabajamos</span>
          <span class="gradient-text block">contigo</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Un proceso claro y estructurado para garantizar resultados reales, tiempos cumplidos
          y una comunicación directa en cada etapa.
        </p>
      </div>

      <!-- Steps: desktop timeline -->
      <div class="hidden lg:grid lg:grid-cols-5 gap-0 relative">
        <!-- Connector line -->
        <div class="absolute top-10 left-[10%] right-[10%] h-px z-0"
          style="background: linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 20%, rgba(59,130,246,0.5) 50%, rgba(59,130,246,0.3) 80%, transparent);" />

        <div
          v-for="(step, i) in steps"
          :key="step.number"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 120, duration: 600 } }"
          class="relative flex flex-col items-center text-center px-4 z-10"
        >
          <!-- Step bubble -->
          <div
            class="w-20 h-20 rounded-full flex flex-col items-center justify-center mb-6 relative"
            :style="`background: linear-gradient(135deg, ${step.color}20, ${step.color}08); border: 2px solid ${step.color}40;`"
          >
            <component :is="step.icon" :size="24" :style="`color: ${step.color}`" />
            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              :style="`background: ${step.color}; color: #050D1A;`">
              {{ i + 1 }}
            </span>
          </div>

          <h3 class="font-semibold text-white mb-2 text-base">{{ step.title }}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>

      <!-- Steps: mobile vertical -->
      <div class="lg:hidden space-y-4">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { delay: i * 80, duration: 500 } }"
          class="flex gap-5 items-start"
        >
          <!-- Icon column -->
          <div class="flex flex-col items-center flex-shrink-0">
            <div class="w-14 h-14 rounded-full flex items-center justify-center relative"
              :style="`background: ${step.color}15; border: 2px solid ${step.color}35;`">
              <component :is="step.icon" :size="20" :style="`color: ${step.color}`" />
            </div>
            <div v-if="i < steps.length - 1" class="w-px flex-1 mt-2"
              style="height: 40px; background: linear-gradient(to bottom, rgba(59,130,246,0.3), transparent);" />
          </div>

          <!-- Content -->
          <div class="pb-4">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold px-2 py-0.5 rounded-full"
                :style="`background: ${step.color}20; color: ${step.color};`">
                {{ step.number }}
              </span>
              <h3 class="font-semibold text-white">{{ step.title }}</h3>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
