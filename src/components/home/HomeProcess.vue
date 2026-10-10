<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUpRight } from '@lucide/vue'

/**
 * Forma de trabajo. Columna fija con indicador de avance + pasos que se
 * activan al recorrerlos con el scroll (IntersectionObserver).
 */
const steps = [
  {
    number: '01',
    title: 'Entendemos tu necesidad',
    desc: 'Empezamos con una consulta sin compromiso. Analizamos tu situación actual, identificamos los puntos de dolor y entendemos qué quieres lograr con tecnología.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=85',
    tags: ['Consulta', 'Diagnóstico', 'Objetivos'],
    keyword: 'Escuchar primero',
  },
  {
    number: '02',
    title: 'Diseñamos la solución',
    desc: 'Con base en lo que encontramos, diseñamos una propuesta técnica adaptada a tu presupuesto y tamaño. Sin soluciones genéricas. Sin sobreventas.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=85',
    tags: ['Propuesta', 'Presupuesto', 'Cronograma'],
    keyword: 'Soluciones a medida',
  },
  {
    number: '03',
    title: 'Implementamos la tecnología',
    desc: 'Desarrollamos, configuramos e instalamos todo. Infraestructura, software, correos, redes — lo que sea necesario para que funcione como se propuso.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=85',
    tags: ['Desarrollo', 'Instalación', 'Configuración'],
    keyword: 'Ejecución técnica',
  },
  {
    number: '04',
    title: 'Te acompañamos después',
    desc: 'La entrega es el inicio, no el final. Ofrecemos capacitación, soporte técnico y seguimiento para que el proyecto siga funcionando y evolucionando.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=85',
    tags: ['Soporte', 'Capacitación', 'Seguimiento'],
    keyword: 'Acompañamiento real',
  },
]

const active = ref(0)
const stepRefs = ref<HTMLElement[]>([])
let io: IntersectionObserver | null = null

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = Number((e.target as HTMLElement).dataset.index ?? 0)
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  )
  stepRefs.value.forEach((el) => io?.observe(el))
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <section class="stage bg-sky" aria-labelledby="process-title">
    <div class="shell section">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <!-- Columna fija -->
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-32">
            <p v-reveal="'fade'" class="eyebrow">Forma de trabajo</p>
            <h2 id="process-title" v-reveal="'clip'" class="display-2 mt-5 text-balance text-fg">
              Un proceso claro, <span class="serif">de la consulta</span> al soporte.
            </h2>
            <p v-reveal="{ variant: 'up', delay: 120 }" class="lead mt-6 max-w-md">
              Cuatro etapas para que sepas en todo momento qué sigue, qué se entrega y quién te acompaña.
            </p>

            <div class="mt-10 hidden lg:block" aria-hidden="true">
              <div class="flex items-baseline gap-3 font-display">
                <span class="text-6xl font-semibold tracking-tighter text-fg">{{ steps[active].number }}</span>
                <span class="text-fg-3">/ 04</span>
              </div>
              <p class="mt-2 text-sm font-medium text-accent">{{ steps[active].keyword }}</p>
              <div class="mt-6 h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-line-2">
                <div
                  class="h-full origin-left rounded-full bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  :style="{ transform: `scaleX(${(active + 1) / steps.length})` }"
                />
              </div>
            </div>

            <RouterLink v-reveal="{ variant: 'up', delay: 200 }" to="/contacto" class="btn btn-ink mt-10">
              Agendar consulta
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
          </div>
        </div>

        <!-- Pasos -->
        <ol class="space-y-6 lg:col-span-7">
          <li
            v-for="(step, i) in steps"
            :key="step.number"
            ref="stepRefs"
            :data-index="i"
            class="overflow-hidden rounded-[30px] bg-surface transition-[box-shadow,transform] duration-700"
            :class="active === i ? 'shadow-[var(--shadow-float)] lg:-translate-y-1' : 'lg:opacity-80'"
          >
            <div v-reveal="'image'" class="relative aspect-[16/8] overflow-hidden">
              <img :src="step.image" :alt="`Paso ${step.number}: ${step.title} — proceso de trabajo DASTI`" loading="lazy" decoding="async" class="h-full w-full object-cover" />
              <span class="glass-light absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold">{{ step.keyword }}</span>
            </div>
            <div class="grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8">
              <span class="font-display text-4xl font-semibold tracking-tighter text-accent">{{ step.number }}</span>
              <div>
                <h3 class="title-4 text-fg">{{ step.title }}</h3>
                <p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">{{ step.desc }}</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span v-for="t in step.tags" :key="t" class="chip">{{ t }}</span>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
