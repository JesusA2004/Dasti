<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ArrowDown, ArrowUpRight } from '@lucide/vue'
import AnimatedParticles from '@/components/AnimatedParticles.vue'
import { serviceCategories } from '@/data/services'
import { usePointerVars } from '@/composables/usePointerVars'

/**
 * Hero interactivo DASTI.
 * Conserva la red de partículas que reacciona al puntero y el parallax de
 * elementos flotantes, ahora dentro de un "stage" editorial con un panel
 * fotográfico que cambia según la solución activa (rail lateral).
 */

const heroRef = ref<HTMLElement>()
usePointerVars(heroRef)

const ROTATE_MS = 6000
const active = ref(0)
const userInteracted = ref(false)
const hovering = ref(false)
const current = computed(() => serviceCategories[active.value])

let timer = 0
const reduced = ref(false)

const select = (i: number) => {
  active.value = i
  userInteracted.value = true
}

const tick = () => {
  if (userInteracted.value || hovering.value || document.hidden) return
  active.value = (active.value + 1) % serviceCategories.length
}

onMounted(() => {
  reduced.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (!reduced.value) timer = window.setInterval(tick, ROTATE_MS)
})
onUnmounted(() => window.clearInterval(timer))

const stats = [
  { value: '14+', label: 'Servicios en TI' },
  { value: '100%', label: 'Remoto o presencial' },
  { value: 'Morelos', label: 'Sede principal' },
]

const scrollNext = () => {
  document.querySelector('#propuesta')?.scrollIntoView({ behavior: reduced.value ? 'auto' : 'smooth' })
}
</script>

<template>
  <section class="pt-[84px] sm:pt-[92px]" aria-labelledby="hero-title">
    <div
      ref="heroRef"
      class="stage on-ink grain hero-stage"
      @pointerenter="hovering = true"
      @pointerleave="hovering = false"
    >
      <!-- Capas de fondo -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="hero-glow absolute inset-0" />
        <div class="tech-grid absolute inset-0 opacity-70" />
      </div>
      <AnimatedParticles
        density="medium"
        variant="connected"
        size="md"
        :interactive="true"
        :opacity="0.85"
        speed="slow"
        color="142, 197, 255"
        :z-index="0"
      />

      <div class="relative z-10 grid gap-10 px-5 pb-6 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-8 lg:pt-16 xl:px-16">
        <!-- Texto -->
        <div class="flex flex-col lg:col-span-7 lg:pr-4">
          <span class="chip chip-ink animate-fade self-start" style="--d: 100ms">
            <span class="dot-live" />
            Desarrollo y Aplicación de Soluciones en TI
          </span>

          <h1 id="hero-title" class="display-1 mt-7 text-on-ink sm:mt-9">
            <span class="line-mask"><span style="--d: 120ms">Tecnología aplicada</span></span>
            <span class="line-mask">
              <span style="--d: 240ms">a soluciones <em class="serif font-normal text-signal">reales.</em></span>
            </span>
          </h1>

          <p class="animate-rise mt-7 max-w-xl text-[1.05rem] leading-relaxed text-on-ink-2 sm:text-lg" style="--d: 420ms">
            Desarrollamos e implementamos soluciones en TI para empresas: software, infraestructura, correos
            corporativos, redes, equipos, automatización e integración de sistemas.
          </p>

          <div class="animate-rise mt-9 flex flex-wrap items-center gap-3" style="--d: 540ms">
            <RouterLink to="/cotizador" class="btn btn-light">
              Cotizar solución
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
            <RouterLink to="/contacto" class="btn btn-ghost-ink">
              Hablar con DASTI
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
            <RouterLink to="/servicios" class="link-u ml-1 text-sm font-medium text-on-ink-2 hover:text-on-ink">
              Explorar servicios
            </RouterLink>
          </div>

          <!-- Datos -->
          <dl class="animate-rise mt-auto grid grid-cols-3 gap-3 pt-12 sm:max-w-lg" style="--d: 680ms">
            <div v-for="s in stats" :key="s.label" class="border-t border-ink-line pt-4">
              <dt class="sr-only">{{ s.label }}</dt>
              <dd class="font-display text-xl font-semibold tracking-tight text-on-ink sm:text-2xl">{{ s.value }}</dd>
              <dd class="mt-1 text-xs text-on-ink-3 sm:text-[0.8rem]">{{ s.label }}</dd>
            </div>
          </dl>
        </div>

        <!-- Panel visual -->
        <div class="relative lg:col-span-5 lg:pr-16">
          <div class="hero-panel animate-fade relative overflow-hidden rounded-[28px] sm:rounded-[34px]" style="--d: 300ms">
            <img
              v-for="(cat, i) in serviceCategories"
              :key="cat.number"
              :src="cat.image.replace('w=1400', 'w=1000')"
              :alt="i === active ? `${cat.title} — servicios DASTI` : ''"
              :aria-hidden="i !== active"
              :loading="i === 0 ? 'eager' : 'lazy'"
              decoding="async"
              class="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              :class="i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#071426]/85 via-[#071426]/15 to-transparent" />

            <!-- Número editorial -->
            <span
              class="parallax-1 pointer-events-none absolute right-5 top-4 font-display text-[4.5rem] font-semibold leading-none tracking-tighter text-white/90 sm:text-[6rem]"
              aria-hidden="true"
            >
              {{ current.number }}
            </span>

            <!-- Tarjeta flotante -->
            <div class="parallax-2 glass-light absolute inset-x-3 bottom-3 rounded-[22px] p-5 sm:inset-x-4 sm:bottom-4 sm:p-6">
              <div class="flex items-center justify-between gap-3">
                <span class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#64748B]">Solución</span>
                <span class="tabular text-[0.7rem] font-medium text-[#64748B]">
                  {{ current.number }} / {{ String(serviceCategories.length).padStart(2, '0') }}
                </span>
              </div>
              <Transition
                mode="out-in"
                enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                enter-from-class="opacity-0 translate-y-2"
                leave-active-class="transition duration-200"
                leave-to-class="opacity-0"
              >
                <div :key="current.number" class="mt-3">
                  <p class="font-display text-xl font-semibold tracking-tight text-[#071426] sm:text-2xl">
                    {{ current.title }}
                  </p>
                  <p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#3A4A5F]">{{ current.desc }}</p>
                </div>
              </Transition>
              <div class="mt-4 flex items-center justify-between gap-4">
                <div class="h-[3px] flex-1 overflow-hidden rounded-full bg-[#071426]/10" aria-hidden="true">
                  <div
                    :key="`${active}-${userInteracted}`"
                    class="h-full rounded-full bg-[#2563EB]"
                    :class="userInteracted || reduced ? 'w-full' : 'hero-progress'"
                    :style="{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: hovering ? 'paused' : 'running' }"
                  />
                </div>
                <RouterLink
                  :to="`/servicios#cat-${current.number}`"
                  class="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2563EB]"
                >
                  Ver servicio <ArrowUpRight :size="15" />
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Rail de soluciones -->
          <div
            class="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col lg:overflow-visible lg:pb-0"
            role="group"
            aria-label="Explorar soluciones"
          >
            <button
              v-for="(cat, i) in serviceCategories"
              :key="cat.number"
              type="button"
              class="group relative flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-300 lg:h-11 lg:w-11 lg:justify-center lg:p-0"
              :class="
                i === active
                  ? 'border-white bg-white text-[#071426]'
                  : 'border-white/15 bg-white/5 text-on-ink-2 hover:border-white/40 hover:text-on-ink'
              "
              :aria-pressed="i === active"
              :aria-label="`Mostrar ${cat.title}`"
              @click="select(i)"
            >
              <component :is="cat.icon" :size="16" />
              <span class="lg:hidden">{{ cat.label }}</span>
              <span
                class="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#071426] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
                aria-hidden="true"
              >
                {{ cat.label }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Pie del stage -->
      <div class="relative z-10 flex items-center justify-between gap-4 border-t border-ink-line px-5 py-4 sm:px-8 lg:px-12 xl:px-16">
        <p class="text-xs text-on-ink-3">Cuernavaca · Morelos · Atención remota en todo México</p>
        <button
          type="button"
          class="flex items-center gap-2 text-xs font-medium text-on-ink-2 transition-colors hover:text-on-ink"
          @click="scrollNext"
        >
          Explorar
          <span class="grid h-8 w-8 place-items-center rounded-full border border-ink-line">
            <ArrowDown :size="14" class="float-y" />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-stage {
  min-height: calc(100svh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero-glow {
  background:
    radial-gradient(60% 55% at 78% 30%, rgba(37, 99, 235, 0.38), transparent 70%),
    radial-gradient(45% 50% at 8% 95%, rgba(142, 197, 255, 0.14), transparent 70%),
    linear-gradient(180deg, #071426 0%, #050F1E 100%);
}

.hero-panel {
  aspect-ratio: 4 / 3.4;
  box-shadow: 0 40px 90px -40px rgba(0, 0, 0, 0.7);
  transform: translate3d(calc(var(--px, 0) * -10px), calc(var(--py, 0) * -10px), 0);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 1024px) {
  .hero-panel { aspect-ratio: 4 / 4.6; max-height: 62svh; width: 100%; }
}

.parallax-1 {
  transform: translate3d(calc(var(--px, 0) * 26px), calc(var(--py, 0) * 18px), 0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.parallax-2 {
  transform: translate3d(calc(var(--px, 0) * 14px), calc(var(--py, 0) * 10px), 0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-progress {
  width: 100%;
  transform-origin: left;
  animation-name: hero-progress;
  animation-timing-function: linear;
  animation-fill-mode: both;
}

@keyframes hero-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
</style>
