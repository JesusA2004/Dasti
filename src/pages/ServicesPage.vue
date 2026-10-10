<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowDownRight, ArrowUpRight } from '@lucide/vue'
import ServiceBlock from '@/components/services/ServiceBlock.vue'
import { serviceCategories } from '@/data/services'

/**
 * Servicios DASTI. Cada categoría usa una composición distinta (campo
 * `layout` en src/data/services.ts). Contenido comercial sin cambios.
 */
const activeCat = ref(serviceCategories[0].number)
const chipRail = ref<HTMLElement>()
let io: IntersectionObserver | null = null

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        activeCat.value = (e.target as HTMLElement).dataset.cat ?? activeCat.value
        const chip = chipRail.value?.querySelector<HTMLElement>(`[data-chip="${activeCat.value}"]`)
        if (chip && chipRail.value) {
          chipRail.value.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' })
        }
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  document.querySelectorAll<HTMLElement>('[data-cat]').forEach((el) => io?.observe(el))
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <div class="pt-[96px]">
    <!-- ─── Hero ─── -->
    <section class="shell pb-14 pt-10 sm:pt-16 lg:pb-20" aria-labelledby="services-title">
      <div class="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow animate-fade" style="--d: 80ms">Servicios y soluciones</p>
          <h1 id="services-title" class="display-1 mt-6 text-fg">
            <span class="line-mask"><span style="--d: 120ms">Servicios en</span></span>
            <span class="line-mask"><span style="--d: 220ms">Tecnologías de la</span></span>
            <span class="line-mask"><span style="--d: 320ms" class="serif text-accent">Información.</span></span>
          </h1>
        </div>
        <div class="animate-rise lg:col-span-5" style="--d: 420ms">
          <p class="lead">
            Software, comunicación, infraestructura, equipos, automatización y asesoría. Selecciona el área que quieres
            mejorar para ver los servicios relacionados.
          </p>
          <ol class="mt-8 grid grid-cols-2 gap-x-6 border-t border-line">
            <li v-for="cat in serviceCategories" :key="cat.number" class="border-b border-line">
              <a :href="`#cat-${cat.number}`" class="group flex items-center justify-between gap-2 py-3 text-sm">
                <span class="flex items-center gap-3">
                  <span class="tabular text-fg-3">{{ cat.number }}</span>
                  <span class="font-medium text-fg">{{ cat.label }}</span>
                </span>
                <ArrowDownRight :size="15" class="text-fg-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ─── Índice fijo ─── -->
    <nav class="sticky top-[84px] z-30 sm:top-[92px]" aria-label="Categorías de servicios">
      <div class="shell">
        <div
          ref="chipRail"
          class="glass no-scrollbar mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1.5 shadow-[var(--shadow-soft)]"
        >
          <a
            v-for="cat in serviceCategories"
            :key="cat.number"
            :href="`#cat-${cat.number}`"
            :data-chip="cat.number"
            class="flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300"
            :class="activeCat === cat.number ? 'bg-ink text-on-ink dark:bg-on-ink dark:text-ink' : 'text-fg-2 hover:text-fg'"
            :aria-current="activeCat === cat.number ? 'true' : undefined"
          >
            <span class="tabular opacity-60">{{ cat.number }}</span>
            {{ cat.label }}
          </a>
        </div>
      </div>
    </nav>

    <!-- ─── Categorías ─── -->
    <div class="mt-10">
      <section
        v-for="(cat, ci) in serviceCategories"
        :id="`cat-${cat.number}`"
        :key="cat.number"
        :data-cat="cat.number"
        :aria-labelledby="`cat-title-${cat.number}`"
        class="section"
      >
        <!-- Layout: FEATURE ─ imagen panorámica + columnas -->
        <div v-if="cat.layout === 'feature'" class="shell">
          <header class="grid gap-6 lg:grid-cols-12 lg:items-end">
            <span v-reveal="'fade'" class="cat-num lg:col-span-2">{{ cat.number }}</span>
            <h2 :id="`cat-title-${cat.number}`" v-reveal="'clip'" class="display-2 text-fg lg:col-span-6">{{ cat.title }}</h2>
            <p v-reveal="{ variant: 'up', delay: 100 }" class="lead lg:col-span-4">{{ cat.desc }}</p>
          </header>
          <div v-reveal="'image'" class="relative mt-12 aspect-[16/10] overflow-hidden rounded-[32px] sm:aspect-[21/9]">
            <img :src="cat.image" :alt="`${cat.title} - DASTI servicios en TI`" loading="lazy" decoding="async" class="h-full w-full object-cover" />
            <div class="glass-light absolute bottom-4 left-4 hidden rounded-full px-4 py-2 text-xs font-semibold sm:block">
              {{ cat.services.length }} servicios · {{ cat.label }}
            </div>
          </div>
          <div class="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
            <div v-for="(svc, si) in cat.services" :key="svc.title" v-reveal="{ variant: 'up', delay: si * 100 }" class="border-t border-line pt-8">
              <ServiceBlock :service="svc" />
            </div>
          </div>
        </div>

        <!-- Layout: STATEMENT ─ bloque oscuro editorial -->
        <div v-else-if="cat.layout === 'statement'" class="stage on-ink grain">
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_100%_0%,rgba(37,99,235,0.3),transparent_70%)]" aria-hidden="true" />
          <div class="shell relative grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <div class="lg:col-span-5">
              <span class="cat-num !text-on-ink-3">{{ cat.number }}</span>
              <h2 :id="`cat-title-${cat.number}`" v-reveal="'clip'" class="display-2 mt-6 text-on-ink">{{ cat.title }}</h2>
              <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-5 !text-on-ink-2">{{ cat.desc }}</p>
              <div v-reveal="'image'" class="mt-10 aspect-[4/3] overflow-hidden rounded-[26px]">
                <img :src="cat.image" :alt="`${cat.title} - DASTI`" loading="lazy" decoding="async" class="h-full w-full object-cover" />
              </div>
            </div>
            <div class="flex flex-col gap-12 lg:col-span-7 lg:pt-24">
              <div v-for="svc in cat.services" :key="svc.title" v-reveal="'up'">
                <ServiceBlock :service="svc" tone="ink" />
              </div>
            </div>
          </div>
        </div>

        <!-- Layout: SPLIT ─ imagen fija + servicios -->
        <div v-else-if="cat.layout === 'split'" class="shell">
          <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div class="lg:col-span-5" :class="ci % 2 === 1 ? 'lg:order-2' : ''">
              <div class="lg:sticky lg:top-40">
                <span class="cat-num">{{ cat.number }}</span>
                <h2 :id="`cat-title-${cat.number}`" v-reveal="'clip'" class="display-2 mt-6 text-fg">{{ cat.title }}</h2>
                <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-5">{{ cat.desc }}</p>
                <div v-reveal="'image'" class="mt-10 aspect-[5/4] overflow-hidden rounded-[30px]">
                  <img :src="cat.image" :alt="`${cat.title} - DASTI`" loading="lazy" decoding="async" class="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <div class="lg:col-span-7" :class="ci % 2 === 1 ? 'lg:order-1' : ''">
              <div
                v-for="(svc, si) in cat.services"
                :key="svc.title"
                v-reveal="{ variant: 'up', delay: si * 90 }"
                class="card mb-5 overflow-hidden"
              >
                <div class="aspect-[16/7] overflow-hidden">
                  <img :src="svc.image" :alt="`${svc.title} - DASTI servicios en TI`" loading="lazy" decoding="async" class="h-full w-full object-cover" />
                </div>
                <div class="p-7 sm:p-9">
                  <ServiceBlock :service="svc" collapsible />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Layout: GRID ─ mosaico bento -->
        <div v-else-if="cat.layout === 'grid'" class="shell">
          <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span class="cat-num">{{ cat.number }}</span>
              <h2 :id="`cat-title-${cat.number}`" v-reveal="'clip'" class="display-2 mt-6 max-w-2xl text-fg">{{ cat.title }}</h2>
            </div>
            <p v-reveal="{ variant: 'up', delay: 100 }" class="lead max-w-md">{{ cat.desc }}</p>
          </header>
          <div class="mt-14 grid gap-5 lg:grid-cols-3">
            <article
              v-for="(svc, si) in cat.services"
              :key="svc.title"
              v-reveal="{ variant: 'up', delay: (si % 2) * 100 }"
              class="card flex flex-col overflow-hidden"
              :class="si === 0 || si === 3 ? 'lg:col-span-2 lg:flex-row' : ''"
            >
              <div
                class="shrink-0 overflow-hidden"
                :class="si === 0 || si === 3 ? 'aspect-[16/9] lg:aspect-auto lg:w-[44%]' : 'aspect-[16/9]'"
              >
                <img :src="svc.image" :alt="`${svc.title} - DASTI servicios en TI`" loading="lazy" decoding="async" class="h-full w-full object-cover" />
              </div>
              <div class="flex-1 p-7">
                <ServiceBlock :service="svc" collapsible />
              </div>
            </article>
          </div>
        </div>

        <!-- Layout: INK ─ franja con columnas numeradas -->
        <div v-else-if="cat.layout === 'ink'" class="stage bg-sky">
          <div class="relative aspect-[16/9] max-h-[440px] w-full overflow-hidden sm:aspect-[21/7]">
            <img :src="cat.image" :alt="`${cat.title} - DASTI`" loading="lazy" decoding="async" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#071426]/85 via-[#071426]/30 to-transparent" />
            <div class="shell absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
              <span class="cat-num !text-white/60">{{ cat.number }}</span>
              <h2 :id="`cat-title-${cat.number}`" v-reveal="'clip'" class="display-2 mt-4 max-w-3xl text-white">{{ cat.title }}</h2>
            </div>
          </div>
          <div class="shell py-14 lg:py-20">
            <p v-reveal="'up'" class="lead max-w-2xl">{{ cat.desc }}</p>
            <div class="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              <div v-for="(svc, si) in cat.services" :key="svc.title" v-reveal="{ variant: 'up', delay: si * 100 }" class="border-t-2 border-accent pt-7">
                <span class="tabular mb-5 block text-sm font-medium text-accent">{{ cat.number }}.{{ si + 1 }}</span>
                <ServiceBlock :service="svc" collapsible />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ─── Cierre ─── -->
    <section class="shell pb-24">
      <div class="card flex flex-col items-start justify-between gap-8 p-8 sm:p-12 lg:flex-row lg:items-center">
        <div>
          <p class="eyebrow">¿No sabes por dónde empezar?</p>
          <h2 class="display-3 mt-4 max-w-2xl text-fg">Te orientamos sin compromiso y estimamos la inversión contigo.</h2>
        </div>
        <div class="flex flex-wrap gap-3">
          <RouterLink to="/cotizador" class="btn btn-accent">
            Abrir cotizador
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
          <RouterLink to="/contacto" class="btn btn-line">
            Solicitar asesoría
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cat-num {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 7vw, 6rem);
  font-weight: 600;
  line-height: 0.8;
  letter-spacing: -0.06em;
  color: var(--c-fg-3);
  opacity: 0.55;
}
</style>
