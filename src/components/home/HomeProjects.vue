<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from '@lucide/vue'
import SectionIntro from '@/components/ui/SectionIntro.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import { projects } from '@/data/projects'

const railRef = ref<HTMLElement>()
const scrollRail = (dir: 1 | -1) => {
  const el = railRef.value
  if (!el) return
  el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 520), behavior: 'smooth' })
}
</script>

<template>
  <section class="section overflow-hidden" aria-labelledby="projects-home-title">
    <div class="shell">
      <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionIntro eyebrow="Proyectos">
          <template #title>
            <span id="projects-home-title">Casos de estudio <span class="serif">en preparación.</span></span>
          </template>
          Publicaremos los proyectos de DASTI con nombre, imágenes y resultados en cuanto nuestros clientes lo autoricen.
          Mientras tanto, estas son las áreas en las que trabajamos.
        </SectionIntro>
        <div class="flex shrink-0 items-center gap-2">
          <button type="button" class="icon-btn" aria-label="Proyectos anteriores" @click="scrollRail(-1)">
            <ArrowLeft :size="17" />
          </button>
          <button type="button" class="icon-btn" aria-label="Proyectos siguientes" @click="scrollRail(1)">
            <ArrowRight :size="17" />
          </button>
        </div>
      </div>
    </div>

    <div
      ref="railRef"
      class="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rail-pad pb-4 sm:gap-6"
      tabindex="0"
      aria-label="Proyectos en preparación"
    >
      <article
        v-for="(p, i) in projects"
        :key="p.id"
        v-reveal="{ variant: 'up', delay: (i % 3) * 90 }"
        class="group w-[82vw] shrink-0 snap-start sm:w-[420px]"
      >
        <div class="relative aspect-[4/5] overflow-hidden rounded-[28px]">
          <MediaFrame
            :src="p.image"
            :alt="p.name"
            :tone="i % 2 === 0 ? 'ink' : 'light'"
            :show-caption="false"
          >
            <template #placeholder>
              <span class="relative flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-[0.18em]">
                {{ p.category }}
                <span class="flex items-center gap-1.5 rounded-full border border-current/20 px-2.5 py-1 normal-case tracking-normal">
                  <Clock :size="12" /> En preparación
                </span>
              </span>
              <span class="relative font-display text-[2.6rem] font-semibold leading-none tracking-tighter opacity-90">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
            </template>
          </MediaFrame>
        </div>
        <div class="mt-5 px-1">
          <h3 class="title-4 text-fg">{{ p.description.replace(' Detalles próximamente.', '') }}</h3>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span v-for="t in p.tags" :key="t" class="chip !py-1 !text-[0.72rem]">{{ t }}</span>
          </div>
        </div>
      </article>

      <RouterLink
        to="/proyectos"
        class="group flex w-[70vw] shrink-0 snap-start flex-col justify-between rounded-[28px] border border-line-2 p-7 transition-colors duration-500 hover:bg-surface sm:w-[320px]"
      >
        <span class="eyebrow no-rule">Portafolio</span>
        <span>
          <span class="display-3 block text-fg">Ver la sección de proyectos</span>
          <span class="mt-6 grid h-12 w-12 place-items-center rounded-full bg-ink text-on-ink transition-transform duration-500 group-hover:-rotate-45">
            <ArrowUpRight :size="18" />
          </span>
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.rail-pad {
  padding-inline: max(clamp(16px, 4vw, 44px), calc((100vw - 1360px) / 2 + 44px));
  scroll-padding-inline: max(clamp(16px, 4vw, 44px), calc((100vw - 1360px) / 2 + 44px));
}
</style>
