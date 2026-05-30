<script setup lang="ts">
import { Video, Users, MessageCircle, ArrowRight } from '@lucide/vue'
import { useRouter } from 'vue-router'

const WHATSAPP_NUMBER = '521XXXXXXXXXX'
const router = useRouter()

const openWhatsApp = (type: string) => {
  const lines = [`Hola, me interesa coordinar una ${type} con DASTI para revisar un proyecto.`]
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
}

</script>

<template>
  <section class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

    <!-- Strong radial glow center -->
    <div class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%);" />

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Main card -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700 } }"
        class="rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden"
        style="background: rgba(13, 30, 54, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(59,130,246,0.2);"
      >
        <!-- Inner glow -->
        <div class="absolute inset-0 rounded-3xl pointer-events-none"
          style="background: linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(129,140,248,0.04) 50%, transparent 100%);" />
        <!-- Top border glow -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
          style="background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent);" />

        <div class="relative">
          <!-- Tag -->
          <span class="tag mb-6 inline-block">Proyectos de mayor alcance</span>

          <!-- Title -->
          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            ¿Tu proyecto requiere una
            <span class="gradient-text block">solución más completa?</span>
          </h2>

          <!-- Description -->
          <p class="text-slate-400 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            Para proyectos grandes, integraciones especiales, infraestructura de red, sistemas a medida
            o implementaciones por etapas, DASTI puede coordinar una videollamada o junta presencial
            para revisar necesidades, alcance, tiempos y requerimientos técnicos.
          </p>

          <p class="text-slate-500 text-sm max-w-xl mx-auto mb-10">
            La modalidad presencial dependerá de ubicación, disponibilidad y alcance del proyecto.
          </p>

          <!-- Action cards -->
          <div class="grid sm:grid-cols-3 gap-4 mb-10">
            <div
              v-for="(option, i) in [
                {
                  icon: Video,
                  title: 'Videollamada',
                  desc: 'Revisamos alcance, requerimientos y tiempos de forma remota.',
                  color: '#3B82F6',
                  action: 'videollamada',
                },
                {
                  icon: Users,
                  title: 'Junta presencial',
                  desc: 'Coordinamos una reunión presencial para proyectos complejos.',
                  color: '#818CF8',
                  action: 'junta presencial',
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp',
                  desc: 'Cuéntanos el proyecto y te orientamos sobre el siguiente paso.',
                  color: '#25D366',
                  action: 'consulta',
                },
              ]"
              :key="i"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 500 } }"
              class="rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
              :style="`background: ${option.color}0A; border: 1px solid ${option.color}25;`"
              @click="openWhatsApp(option.action)"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                :style="`background: ${option.color}15; border: 1px solid ${option.color}30;`">
                <component :is="option.icon" :size="20" :style="`color: ${option.color}`" />
              </div>
              <h4 class="font-semibold text-white text-sm mb-1">{{ option.title }}</h4>
              <p class="text-xs text-slate-400 leading-relaxed">{{ option.desc }}</p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-4 justify-center">
            <button @click="router.push('/contacto')" class="btn-primary">
              Hablar con DASTI
              <ArrowRight :size="16" />
            </button>
            <button @click="router.push('/cotizador')" class="btn-outline">
              Estimar inversión
            </button>
          </div>
        </div>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
