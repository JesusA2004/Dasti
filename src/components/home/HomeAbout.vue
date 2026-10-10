<script setup lang="ts">
import { ArrowUpRight, MapPin, Video, Wifi } from '@lucide/vue'

const modes = [
  {
    icon: Wifi,
    title: 'Remoto',
    desc: 'Diagnóstico, configuración y soporte sin necesidad de desplazamiento. Rápido y eficiente.',
  },
  {
    icon: Video,
    title: 'Videollamada',
    desc: 'Reunión virtual para consultas, presentación de propuestas y seguimiento de proyectos.',
  },
  {
    icon: MapPin,
    title: 'Presencial',
    desc: 'Visita técnica cuando el proyecto lo requiere. Instalaciones, diagnósticos físicos y capacitaciones.',
  },
]
</script>

<template>
  <section class="section" aria-labelledby="about-home-title">
    <div class="shell">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <!-- Collage -->
        <div class="relative lg:col-span-6">
          <div v-reveal="'image'" class="aspect-[4/5] overflow-hidden rounded-[32px] sm:aspect-[5/5]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80"
              alt="Espacio de trabajo DASTI en Morelos"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div
            v-reveal="{ variant: 'up', delay: 200 }"
            class="glass absolute -bottom-6 right-4 max-w-[260px] rounded-[24px] p-5 shadow-[var(--shadow-float)] sm:right-8"
          >
            <span class="flex items-center gap-2 text-xs font-semibold text-fg">
              <span class="dot-live" /> DASTI · Morelos, México
            </span>
            <p class="mt-2 text-[0.82rem] leading-snug text-fg-2">Atención principal en Cuernavaca y zona metropolitana.</p>
          </div>
        </div>

        <!-- Texto -->
        <div class="flex flex-col lg:col-span-6 lg:pl-6">
          <p v-reveal="'fade'" class="eyebrow">Acerca de DASTI</p>
          <h2 id="about-home-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
            Desarrollo y Aplicación de <span class="serif text-accent">Soluciones en TI.</span>
          </h2>
          <p v-reveal="{ variant: 'up', delay: 120 }" class="lead mt-6">
            DASTI es una empresa ubicada en Morelos enfocada en desarrollar, implementar y administrar soluciones en
            Tecnologías de la Información para empresas que buscan mejorar su operación, infraestructura, comunicación y
            procesos internos.
          </p>

          <ul class="mt-10 border-t border-line">
            <li
              v-for="(m, i) in modes"
              :key="m.title"
              v-reveal="{ variant: 'up', delay: 160 + i * 80 }"
              class="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-5"
            >
              <span class="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                <component :is="m.icon" :size="17" />
              </span>
              <span>
                <span class="block font-semibold text-fg">{{ m.title }}</span>
                <span class="mt-1 block text-[0.92rem] leading-relaxed text-fg-2">{{ m.desc }}</span>
              </span>
            </li>
          </ul>

          <RouterLink v-reveal="{ variant: 'up', delay: 300 }" to="/nosotros" class="btn btn-ink mt-10 self-start">
            Conocer DASTI
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
