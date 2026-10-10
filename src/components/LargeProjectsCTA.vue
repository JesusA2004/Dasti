<script setup lang="ts">
import { ArrowUpRight, MessageCircle, Users, Video } from '@lucide/vue'
import { buildWhatsAppUrl } from '@/config/contact'

const openWhatsApp = (type: string) => {
  const msg = `Hola, me interesa coordinar una ${type} con DASTI para revisar un proyecto.`
  window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer')
}

const options = [
  { icon: Video, title: 'Videollamada', desc: 'Revisamos alcance, requerimientos y tiempos de forma remota.', action: 'videollamada' },
  { icon: Users, title: 'Junta presencial', desc: 'Coordinamos una reunión presencial para proyectos complejos.', action: 'junta presencial' },
  { icon: MessageCircle, title: 'WhatsApp', desc: 'Cuéntanos el proyecto y te orientamos sobre el siguiente paso.', action: 'consulta' },
]
</script>

<template>
  <section class="pb-6" aria-labelledby="large-projects-title">
    <div class="stage on-ink grain">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_0%_100%,rgba(37,99,235,0.32),transparent_70%)]" aria-hidden="true" />
      <div class="shell section relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-6">
          <p v-reveal="'fade'" class="eyebrow !text-on-ink-3">Proyectos de mayor alcance</p>
          <h2 id="large-projects-title" v-reveal="'clip'" class="display-2 mt-5 text-on-ink">
            ¿Tu proyecto requiere una <span class="serif text-signal">solución más completa?</span>
          </h2>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-6 !text-on-ink-2">
            Para proyectos grandes, integraciones especiales, infraestructura de red, sistemas a medida o implementaciones
            por etapas, DASTI puede coordinar una videollamada o junta presencial para revisar necesidades, alcance, tiempos
            y requerimientos técnicos.
          </p>
          <p v-reveal="{ variant: 'up', delay: 140 }" class="mt-4 text-sm text-on-ink-3">
            La modalidad presencial dependerá de ubicación, disponibilidad y alcance del proyecto.
          </p>
          <div v-reveal="{ variant: 'up', delay: 180 }" class="mt-9 flex flex-wrap gap-3">
            <RouterLink to="/contacto" class="btn btn-light">
              Hablar con DASTI
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
            <RouterLink to="/cotizador" class="btn btn-ghost-ink">
              Estimar inversión
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
          </div>
        </div>

        <ul class="self-end border-t border-ink-line lg:col-span-6">
          <li v-for="(o, i) in options" :key="o.title" v-reveal="{ variant: 'up', delay: i * 90 }" class="border-b border-ink-line">
            <button
              type="button"
              class="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left"
              :aria-label="`Coordinar ${o.action} por WhatsApp`"
              @click="openWhatsApp(o.action)"
            >
              <span class="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-signal">
                <component :is="o.icon" :size="18" />
              </span>
              <span>
                <span class="block font-semibold text-on-ink">{{ o.title }}</span>
                <span class="mt-1 block text-sm text-on-ink-3">{{ o.desc }}</span>
              </span>
              <ArrowUpRight :size="18" class="text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-on-ink" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
