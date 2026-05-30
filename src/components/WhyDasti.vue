<script setup lang="ts">
import { Layers, MessageSquare, Cpu, Target, Users, TrendingUp, FileCheck, Wrench } from '@lucide/vue'

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

const reasons = [
  {
    icon: Layers,
    title: 'Soluciones adaptadas a cada empresa',
    desc: 'No aplicamos plantillas genéricas. Analizamos tu operación y proponemos lo que realmente necesitas.',
    color: '#3B82F6',
  },
  {
    icon: MessageSquare,
    title: 'Comunicación clara y directa',
    desc: 'Explicamos cada etapa en lenguaje entendible. Sin tecnicismos innecesarios, con total transparencia.',
    color: '#818CF8',
  },
  {
    icon: Cpu,
    title: 'Experiencia en múltiples áreas de TI',
    desc: 'Desde desarrollo hasta soporte y redes. Cubrimos el espectro tecnológico que necesitan las empresas.',
    color: '#34D399',
  },
  {
    icon: Target,
    title: 'Enfoque en problemas reales',
    desc: 'Cada solución parte de una necesidad concreta, no de tendencias tecnológicas sin aplicación práctica.',
    color: '#FBBF24',
  },
  {
    icon: Users,
    title: 'Acompañamiento técnico',
    desc: 'Estamos presentes antes, durante y después de la implementación. El cliente no queda solo.',
    color: '#F472B6',
  },
  {
    icon: TrendingUp,
    title: 'Opciones escalables',
    desc: 'Las soluciones que implementamos pueden crecer con tu empresa, evitando costos de rehacer.',
    color: '#60A5FA',
  },
  {
    icon: FileCheck,
    title: 'Entrega documentada',
    desc: 'Documentamos lo implementado para que puedas operarlo con total seguridad y confianza.',
    color: '#A78BFA',
  },
  {
    icon: Wrench,
    title: 'Soporte posterior',
    desc: 'Ofrecemos seguimiento técnico post-entrega según el tipo de proyecto y necesidades del cliente.',
    color: '#FB923C',
  },
]
</script>

<template>
  <section class="relative py-24 overflow-hidden" style="background: #060F1E;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[700px] h-[500px] top-1/2 right-0 -translate-y-1/2"
      style="background: rgba(37,99,235,0.04);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Por qué elegir DASTI</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Comprometidos con</span>
          <span class="gradient-text block">resultados reales</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          La tecnología debe ser clara, funcional y útil para la operación diaria.
          En DASTI convertimos necesidades empresariales en soluciones digitales reales.
        </p>
      </div>

      <!-- Reasons grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(reason, i) in reasons"
          :key="reason.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: (i % 4) * 80, duration: 600 } }"
          class="glass-card rounded-xl p-5 group cursor-default"
        >
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            :style="`background: ${reason.color}15; border: 1px solid ${reason.color}35;`">
            <component :is="reason.icon" :size="20" :style="`color: ${reason.color}`" />
          </div>
          <h4 class="font-semibold text-white text-sm mb-2 leading-snug">{{ reason.title }}</h4>
          <p class="text-xs text-slate-400 leading-relaxed">{{ reason.desc }}</p>
        </div>
      </div>

      <!-- Bottom CTA banner -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mt-16 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
        style="background: linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(129,140,248,0.08) 100%); border: 1px solid rgba(59,130,246,0.2);"
      >
        <div class="orb w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style="background: rgba(37,99,235,0.08);" />
        <div class="relative">
          <h3 class="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
            ¿Listo para mejorar la tecnología de tu empresa?
          </h3>
          <p class="text-slate-400 mb-7 max-w-lg mx-auto">
            Cuéntanos qué necesitas y te ayudamos a encontrar la mejor solución tecnológica.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button
              @click="scrollTo('#contacto')"
              class="btn-primary"
            >
              Hablar con DASTI
            </button>
            <button
              @click="scrollTo('#cotizador')"
              class="btn-outline"
            >
              Calcular costo aproximado
            </button>
          </div>
        </div>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
