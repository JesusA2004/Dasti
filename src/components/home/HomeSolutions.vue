<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import SectionIntro from '@/components/ui/SectionIntro.vue'
import { serviceCategories } from '@/data/services'

/**
 * Índice editorial de soluciones: lista tipográfica + imagen que responde
 * al elemento activo (hover, foco o toque). Cinta inferior con el catálogo.
 */
const active = ref(0)
const current = computed(() => serviceCategories[active.value])
const allServices = serviceCategories.flatMap((c) => c.services.map((s) => s.title))
</script>

<template>
  <section class="section pt-0" aria-labelledby="solutions-title">
    <div class="shell">
      <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionIntro eyebrow="Soluciones tecnológicas">
          <template #title>
            <span id="solutions-title">Seis áreas, <span class="serif">una sola</span> empresa de TI.</span>
          </template>
        </SectionIntro>
        <RouterLink v-reveal="'fade'" to="/servicios" class="btn btn-line shrink-0 self-start md:self-end">
          Ver todos los servicios
          <span class="btn-orb"><ArrowUpRight :size="16" /></span>
        </RouterLink>
      </div>

      <div class="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        <!-- Índice -->
        <ol class="border-t border-line lg:col-span-7">
          <li v-for="(cat, i) in serviceCategories" :key="cat.number" v-reveal="{ variant: 'up', delay: i * 60 }" class="border-b border-line">
            <RouterLink
              :to="`/servicios#cat-${cat.number}`"
              class="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 sm:gap-8 sm:py-7"
              @mouseenter="active = i"
              @focus="active = i"
            >
              <span class="tabular w-8 text-sm transition-colors duration-300" :class="active === i ? 'text-accent' : 'text-fg-3'">
                {{ cat.number }}
              </span>
              <span>
                <span
                  class="block font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.03em] transition-all duration-500 sm:text-[2rem]"
                  :class="active === i ? 'translate-x-1 text-fg' : 'text-fg-2'"
                >
                  {{ cat.title }}
                </span>
                <span
                  class="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  :class="active === i ? 'opacity-100' : 'opacity-0'"
                  :style="{ gridTemplateRows: active === i ? '1fr' : '0fr' }"
                >
                  <span class="overflow-hidden">
                    <span class="block max-w-lg pt-2 text-[0.93rem] leading-relaxed text-fg-2">{{ cat.desc }}</span>
                  </span>
                </span>
              </span>
              <span
                class="grid h-11 w-11 place-items-center rounded-full border transition-all duration-500"
                :class="active === i ? 'border-ink bg-ink text-on-ink -rotate-45 dark:border-on-ink dark:bg-on-ink dark:text-ink' : 'border-line-2 text-fg-3'"
              >
                <ArrowUpRight :size="17" />
              </span>
            </RouterLink>
          </li>
        </ol>

        <!-- Imagen activa -->
        <div class="hidden lg:col-span-5 lg:block">
          <div class="sticky top-28">
            <div v-reveal="'image'" class="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-ink">
              <img
                v-for="(cat, i) in serviceCategories"
                :key="cat.number"
                :src="cat.image"
                :alt="i === active ? cat.title : ''"
                :aria-hidden="i !== active"
                loading="lazy"
                decoding="async"
                class="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                :class="i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#071426]/70 via-transparent to-transparent" />
              <div class="glass-light absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[20px] px-5 py-4">
                <div>
                  <p class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#64748B]">{{ current.label }}</p>
                  <p class="mt-1 text-sm font-medium text-[#071426]">
                    {{ current.services.length }} {{ current.services.length === 1 ? 'servicio' : 'servicios' }}
                  </p>
                </div>
                <component :is="current.icon" :size="22" class="text-[#2563EB]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cinta del catálogo -->
    <div class="marquee-wrap mt-20 overflow-hidden border-y border-line py-6 lg:mt-28" aria-hidden="true">
      <div class="marquee">
        <span v-for="n in 2" :key="n" class="flex shrink-0 items-center">
          <span
            v-for="s in allServices"
            :key="`${n}-${s}`"
            class="flex items-center whitespace-nowrap px-6 font-display text-xl font-medium tracking-tight text-fg-3 sm:text-2xl"
          >
            {{ s }}
            <span class="ml-12 h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        </span>
      </div>
    </div>
  </section>
</template>
