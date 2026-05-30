<script setup lang="ts">
import { MapPin, Wifi, Monitor, Video } from '@lucide/vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const zones = [
  {
    name: 'Morelos · Cuernavaca',
    label: 'Zona principal',
    desc: 'Sede principal. Atendemos proyectos presenciales y remotos en Cuernavaca y zona metropolitana.',
    color: '#3B82F6',
    presential: true,
  },
  {
    name: 'CDMX · Estado de México',
    label: 'Zona extendida',
    desc: 'Proyectos de software, correo y automatización de forma remota. Presencial según alcance del proyecto.',
    color: '#818CF8',
    presential: false,
  },
  {
    name: 'Puebla y estados cercanos',
    label: 'Cobertura regional',
    desc: 'Servicios remotos sin restricción. Presencial para proyectos que justifican desplazamiento.',
    color: '#34D399',
    presential: false,
  },
]

const modalidades = [
  {
    icon: Wifi,
    title: 'Servicio remoto',
    desc: 'Software, correos, automatización, integración de sistemas y asesoramiento. Sin restricción geográfica.',
    color: '#3B82F6',
    services: ['Desarrollo de software', 'Correos corporativos', 'Automatización', 'Integración de sistemas', 'Chatbots', 'Asesoramiento TI'],
  },
  {
    icon: Monitor,
    title: 'Servicio presencial',
    desc: 'Instalación de redes, configuración de equipos e impresoras. Disponible en Morelos y zonas cercanas.',
    color: '#F472B6',
    services: ['Redes e infraestructura', 'Sistemas mesh y roaming', 'Configuración de equipos', 'Impresoras y periféricos', 'Soporte técnico in situ'],
  },
  {
    icon: Video,
    title: 'Consulta y asesoramiento',
    desc: 'Videollamada o reunión presencial para proyectos de mayor alcance o cuando la situación requiere análisis directo.',
    color: '#FBBF24',
    services: ['Diagnóstico de infraestructura', 'Proyectos grandes o por etapas', 'Propuestas formales', 'Revisión de requerimientos'],
  },
]
</script>

<template>
  <section class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[600px] h-[500px] top-1/2 right-0 -translate-y-1/2"
      style="background: rgba(37,99,235,0.04);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Cobertura y modalidad</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">¿Dónde y cómo</span>
          <span class="gradient-text block">trabajamos contigo?</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          DASTI opera desde Morelos. La mayoría de servicios se realizan de forma remota,
          por lo que podemos atender proyectos en toda la república.
        </p>
      </div>

      <!-- Zones -->
      <div class="grid sm:grid-cols-3 gap-5 mb-14">
        <div
          v-for="(zone, i) in zones"
          :key="zone.name"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 600 } }"
          class="glass-card rounded-2xl p-6 relative overflow-hidden"
        >
          <div class="flex items-start gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              :style="`background: ${zone.color}15; border: 1px solid ${zone.color}35;`">
              <MapPin :size="18" :style="`color: ${zone.color}`" />
            </div>
            <div>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium mb-1 inline-block"
                :style="`background: ${zone.color}12; color: ${zone.color}; border: 1px solid ${zone.color}25;`">
                {{ zone.label }}
              </span>
              <h3 class="font-semibold text-white text-base leading-snug">{{ zone.name }}</h3>
            </div>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed">{{ zone.desc }}</p>
          <div class="mt-4 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :style="`background: ${zone.presential ? '#4ade80' : zone.color};`" />
            <span class="text-xs text-slate-500">
              {{ zone.presential ? 'Presencial y remoto' : 'Principalmente remoto' }}
            </span>
          </div>
          <div class="absolute bottom-0 left-6 right-6 h-px rounded-full"
            :style="`background: linear-gradient(90deg, transparent, ${zone.color}40, transparent);`" />
        </div>
      </div>

      <!-- Modalidades -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-12"
      >
        <h3 class="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">
          Modalidades de servicio
        </h3>
        <div class="grid sm:grid-cols-3 gap-5">
          <div
            v-for="(mod, i) in modalidades"
            :key="mod.title"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 600 } }"
            class="glass-card rounded-2xl p-6"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              :style="`background: ${mod.color}15; border: 1px solid ${mod.color}35;`">
              <component :is="mod.icon" :size="18" :style="`color: ${mod.color}`" />
            </div>
            <h4 class="font-semibold text-white text-sm mb-2">{{ mod.title }}</h4>
            <p class="text-xs text-slate-400 leading-relaxed mb-4">{{ mod.desc }}</p>
            <ul class="space-y-1.5">
              <li v-for="svc in mod.services" :key="svc" class="flex items-center gap-2">
                <span class="w-1 h-1 rounded-full flex-shrink-0" :style="`background: ${mod.color};`" />
                <span class="text-xs text-slate-500">{{ svc }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center"
      >
        <p class="text-slate-400 mb-5 text-sm">¿Tienes dudas sobre si podemos atenderte en tu ubicación?</p>
        <button @click="router.push('/contacto')" class="btn-primary">
          Consultar disponibilidad
        </button>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
