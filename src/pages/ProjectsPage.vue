<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, Clock, ExternalLink } from '@lucide/vue'
import LargeProjectsCTA from '@/components/LargeProjectsCTA.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import { projectCategories, projects } from '@/data/projects'

/**
 * Proyectos. Los casos con status 'pending' se muestran como espacios
 * reservados; no se presentan como proyectos terminados.
 */
const activeCategory = ref('Todos')

const filtered = computed(() =>
  activeCategory.value === 'Todos' ? projects : projects.filter((p) => p.category === activeCategory.value),
)

const capabilities = [
  { title: 'Sistemas y software', desc: 'Paneles administrativos, gestión de usuarios, reportes y módulos a medida.' },
  { title: 'Sitios web', desc: 'Sitios corporativos responsivos, formularios funcionales y paneles básicos.' },
  { title: 'Infraestructura', desc: 'Redes empresariales, sistemas mesh con roaming y segmentación por área.' },
  { title: 'Integración y automatización', desc: 'Conexión entre plataformas, APIs, chatbots y reportes automáticos.' },
]
</script>

<template>
  <div class="pt-[96px]">
    <!-- ─── Encabezado ─── -->
    <section class="shell pb-16 pt-10 sm:pt-16" aria-labelledby="projects-title">
      <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow animate-fade" style="--d: 80ms">Portafolio</p>
          <h1 id="projects-title" class="display-1 mt-6 text-fg">
            <span class="line-mask"><span style="--d: 120ms">Proyectos</span></span>
            <span class="line-mask"><span style="--d: 220ms" class="serif text-accent">DASTI.</span></span>
          </h1>
        </div>
        <div class="animate-rise lg:col-span-5" style="--d: 360ms">
          <p class="lead">
            Los casos de proyectos desarrollados e implementados por DASTI se publicarán próximamente. Por ahora, aquí está
            la estructura lista para mostrar el trabajo real.
          </p>
          <p class="mt-4 flex items-center gap-2 text-sm text-fg-3">
            <Clock :size="15" /> Publicación sujeta a la autorización de cada cliente.
          </p>
        </div>
      </div>
    </section>

    <!-- ─── Capacidades ─── -->
    <section class="shell" aria-label="Áreas de trabajo">
      <div class="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(c, i) in capabilities" :key="c.title" v-reveal="{ variant: 'up', delay: i * 80 }" class="bg-paper p-7">
          <span class="tabular text-sm text-fg-3">0{{ i + 1 }}</span>
          <h2 class="title-4 mt-10 text-fg">{{ c.title }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-fg-2">{{ c.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ─── Casos ─── -->
    <section class="section" aria-labelledby="cases-title">
      <div class="shell">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="cases-title" v-reveal="'clip'" class="display-3 text-fg">Casos de estudio</h2>
          <div class="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Filtrar por categoría">
            <button
              v-for="cat in projectCategories"
              :key="cat"
              type="button"
              class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300"
              :class="activeCategory === cat ? 'border-ink bg-ink text-on-ink dark:border-on-ink dark:bg-on-ink dark:text-ink' : 'border-line-2 text-fg-2 hover:text-fg'"
              :aria-pressed="activeCategory === cat"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <TransitionGroup
          tag="div"
          class="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          enter-from-class="opacity-0 translate-y-4"
          leave-active-class="hidden"
        >
          <article
            v-for="(proj, i) in filtered"
            :key="proj.id"
            class="group flex flex-col"
            :class="i % 3 === 1 ? 'lg:translate-y-12' : ''"
          >
            <div class="relative aspect-[4/5] overflow-hidden rounded-[28px]">
              <MediaFrame :src="proj.image" :alt="proj.name" :tone="i % 2 === 0 ? 'ink' : 'light'" :show-caption="false">
                <template #placeholder>
                  <span class="relative flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-[0.18em]">
                    {{ proj.category }}
                    <span class="flex items-center gap-1.5 rounded-full border border-current/20 px-2.5 py-1 normal-case tracking-normal">
                      <Clock :size="12" /> Próximamente
                    </span>
                  </span>
                  <span class="relative">
                    <span class="block font-serif text-2xl italic leading-tight opacity-90">Espacio reservado para caso de estudio</span>
                    <span class="mt-3 block text-xs opacity-70">Imágenes, contexto y resultados se publicarán con autorización.</span>
                  </span>
                </template>
              </MediaFrame>
            </div>

            <div class="mt-5 flex flex-1 flex-col px-1">
              <h3 class="title-4 text-fg">{{ proj.name }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-fg-2">{{ proj.description }}</p>
              <div class="mt-4 flex flex-wrap gap-1.5">
                <span v-for="tag in proj.tags" :key="tag" class="chip !py-1 !text-[0.72rem]">{{ tag }}</span>
              </div>
              <div class="mt-6 flex items-center gap-2">
                <RouterLink to="/contacto" class="btn btn-ink btn-sm">
                  Solicitar proyecto similar
                  <span class="btn-orb"><ArrowUpRight :size="14" /></span>
                </RouterLink>
                <a
                  v-if="proj.link"
                  :href="proj.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="icon-btn h-10 w-10"
                  :aria-label="`Ver ${proj.name}`"
                >
                  <ExternalLink :size="15" />
                </a>
                <span v-else class="icon-btn h-10 w-10 cursor-not-allowed opacity-40" title="Enlace pendiente" aria-hidden="true">
                  <ExternalLink :size="15" />
                </span>
              </div>
            </div>
          </article>
        </TransitionGroup>

        <div v-reveal="'up'" class="mt-24 grid gap-6 rounded-[28px] border border-dashed border-line-2 p-8 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-8">
            <h3 class="title-4 text-fg">Casos en preparación</h3>
            <p class="mt-2 text-sm leading-relaxed text-fg-2">
              Los proyectos reales de DASTI se publicarán aquí con nombre, descripción, imágenes y referencias una vez que
              los clientes lo autoricen. Si quieres ver en qué tipo de proyectos trabajamos, visita la sección de servicios.
            </p>
          </div>
          <div class="lg:col-span-4 lg:text-right">
            <RouterLink to="/servicios" class="btn btn-line">
              Ver servicios
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <LargeProjectsCTA />
  </div>
</template>
