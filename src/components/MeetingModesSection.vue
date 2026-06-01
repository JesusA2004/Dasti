<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Wifi, Video, MapPin, ArrowRight, MessageCircle } from '@lucide/vue'
import { buildWhatsAppUrl } from '@/config/contact'

const router = useRouter()
const meetingWhatsAppUrl = buildWhatsAppUrl('Hola, me interesa una consulta con DASTI.')

const modes = [
  {
    icon: Wifi,
    color: '#3B82F6',
    title: 'Remoto',
    desc: 'Diagnóstico, configuración y soporte sin necesidad de desplazamiento. Rápido y eficiente.',
    tags: ['Acceso remoto seguro', 'Sin traslado', 'Ideal para software'],
  },
  {
    icon: Video,
    color: '#34D399',
    title: 'Videollamada',
    desc: 'Reunión virtual para consultas, presentación de propuestas y seguimiento de proyectos.',
    tags: ['Zoom · Meet · Teams', 'Presentación de propuesta', 'Seguimiento regular'],
  },
  {
    icon: MapPin,
    color: '#F472B6',
    title: 'Presencial',
    desc: 'Visita técnica cuando el proyecto lo requiere. Instalaciones, diagnósticos físicos y capacitaciones.',
    tags: ['Morelos · Cuernavaca', 'CDMX y zona cercana', 'Instalaciones y redes'],
  },
]
</script>

<template>
  <section class="relative overflow-hidden" style="background: var(--bg-surface);">

    <!-- Large background image -->
    <div class="relative h-72 sm:h-96 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1600&auto=format&fit=crop&q=80"
        alt="Atención DASTI"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to bottom, rgba(var(--accent-rgb, 37,99,235), 0.25), var(--bg-surface) 90%);"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to right, var(--bg-surface) 0%, transparent 30%, transparent 70%, var(--bg-surface) 100%);" />

      <!-- Centered headline over image -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center px-4">
          <span class="tag mb-4 inline-block">Modalidad de atención</span>
          <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl" style="color: var(--text-primary);">
            Remoto, videollamada
            <span class="gradient-text"> o presencial</span>
          </h2>
        </div>
      </div>
    </div>

    <!-- Cards + content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-2">

      <!-- 3 mode cards -->
      <div class="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-14">
        <div
          v-for="(mode, i) in modes"
          :key="mode.title"
          v-motion
          :initial="{ opacity: 0, y: 28 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 120, duration: 500 } }"
          class="glass-card rounded-2xl p-6 tilt-card"
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            :style="`background: ${mode.color}18; border: 1px solid ${mode.color}30; box-shadow: 0 0 20px ${mode.color}15;`"
          >
            <component :is="mode.icon" :size="22" :style="`color: ${mode.color};`" />
          </div>
          <h3 class="font-display font-bold text-lg mb-2" style="color: var(--text-primary);">{{ mode.title }}</h3>
          <p class="text-sm leading-relaxed mb-4" style="color: var(--text-secondary);">{{ mode.desc }}</p>
          <div class="flex flex-col gap-1.5">
            <div v-for="tag in mode.tags" :key="tag" class="flex items-center gap-2">
              <div class="w-1 h-1 rounded-full flex-shrink-0" :style="`background: ${mode.color};`" />
              <span class="text-xs" style="color: var(--text-muted);">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Coverage text + CTAs -->
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <div
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <h3 class="font-display font-bold text-2xl sm:text-3xl mb-4" style="color: var(--text-primary);">
            Principalmente Morelos,
            <br />
            <span class="gradient-text">también zona centro</span>
          </h3>
          <p class="text-base leading-relaxed mb-6" style="color: var(--text-secondary);">
            Nuestra sede es en Morelos — Cuernavaca y zona cercana. También atendemos proyectos en CDMX, Estado de México, Puebla y estados cercanos. Según el servicio, podemos trabajar de forma remota, por videollamada o desplazarnos para una reunión o instalación.
          </p>

          <!-- Zones -->
          <div class="space-y-2.5">
            <div v-for="z in [
              { name: 'Morelos · Cuernavaca y zona', type: 'Sede principal', color: '#3B82F6' },
              { name: 'CDMX · Estado de México', type: 'Según proyecto', color: '#818CF8' },
              { name: 'Puebla y estados cercanos', type: 'Con coordinación previa', color: '#34D399' },
            ]" :key="z.name" class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full flex-shrink-0" :style="`background: ${z.color};`" />
              <span class="text-sm font-medium" style="color: var(--text-primary);">{{ z.name }}</span>
              <span class="text-xs ml-auto" style="color: var(--text-muted);">{{ z.type }}</span>
            </div>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: 20 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600, delay: 150 } }"
          class="space-y-3"
        >
          <div
            class="rounded-2xl p-6 relative overflow-hidden"
            style="background: var(--bg-card); border: 1px solid var(--border-medium);"
          >
            <div class="orb w-40 h-40 -top-10 -right-10 opacity-20" style="background: var(--accent-glow);" />
            <div class="relative">
              <p class="text-xs font-semibold uppercase tracking-widest mb-3" style="color: var(--text-muted);">Contáctanos ahora</p>
              <h4 class="font-bold text-lg mb-4" style="color: var(--text-primary);">Agenda una consulta sin costo</h4>
              <div class="space-y-2.5">
                <button @click="router.push('/contacto')" class="btn-primary w-full justify-center">
                  <Video :size="16" />
                  Agendar videollamada
                </button>
                <button @click="router.push('/contacto')" class="btn-outline w-full justify-center">
                  <MapPin :size="16" />
                  Solicitar reunión presencial
                </button>
                <a
                  :href="meetingWhatsAppUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-ghost w-full justify-center"
                  style="border: 1px solid rgba(52,211,153,0.2); color: #34D399;"
                >
                  <MessageCircle :size="15" />
                  WhatsApp directo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto" />
  </section>
</template>
