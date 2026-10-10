<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSectionProgress } from '@/composables/useSectionProgress'

/**
 * Propuesta de valor. El enunciado se "enciende" palabra por palabra
 * conforme avanza el scroll (una sola variable CSS, sin renders por palabra).
 */
const statement =
  'Desarrollamos, implementamos, administramos, integramos, optimizamos, suministramos y asesoramos. Una empresa de TI completa para tu empresa.'
const words = statement.split(' ')

const sectionRef = ref<HTMLElement>()
const progress = useSectionProgress(sectionRef, 0.9, 0.55)
const progressStyle = computed(() => ({ '--p': progress.value.toFixed(3), '--n': words.length }))

const principles = [
  {
    title: 'Soluciones adaptadas',
    desc: 'No aplicamos plantillas genéricas. Analizamos la operación y proponemos lo que realmente se necesita.',
  },
  {
    title: 'Comunicación clara',
    desc: 'Explicamos cada etapa en lenguaje entendible, sin tecnicismos innecesarios y con total transparencia.',
  },
  {
    title: 'Experiencia integral',
    desc: 'Cubrimos software, infraestructura, redes, equipos, soporte técnico y automatización.',
  },
  {
    title: 'Tecnología funcional',
    desc: 'Cada solución parte de una necesidad concreta. La tecnología debe ser útil, no solo moderna.',
  },
]
</script>

<template>
  <section id="propuesta" ref="sectionRef" class="section" aria-labelledby="manifesto-title">
    <div class="shell">
      <div class="grid gap-10 lg:grid-cols-12">
        <p class="eyebrow lg:col-span-3 lg:pt-4">Propuesta de valor</p>
        <h2 id="manifesto-title" class="lg:col-span-9" :style="progressStyle">
          <span class="sr-only">{{ statement }}</span>
          <span aria-hidden="true" class="manifesto-text display-3 !text-[clamp(1.7rem,3.9vw,3.5rem)] !leading-[1.08]">
            <span
              v-for="(word, i) in words"
              :key="i"
              class="manifesto-word"
              :class="{ 'serif text-accent': i >= words.length - 4 }"
              :style="{ '--i': i }"
            >{{ word }}{{ ' ' }}</span>
          </span>
        </h2>
      </div>

      <div class="mt-20 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
        <article
          v-for="(p, i) in principles"
          :key="p.title"
          v-reveal="{ variant: 'up', delay: i * 90 }"
          class="group flex min-h-[230px] flex-col bg-paper p-7 transition-colors duration-500 hover:bg-surface sm:p-8"
        >
          <span class="tabular text-sm text-fg-3">0{{ i + 1 }}</span>
          <h3 class="title-4 mt-auto pt-12 text-fg">{{ p.title }}</h3>
          <p class="mt-3 text-[0.92rem] leading-relaxed text-fg-2">{{ p.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.manifesto-word {
  opacity: clamp(0.14, calc(var(--p) * (var(--n) + 4) - var(--i)), 1);
  transition: opacity 0.25s linear;
}
</style>
