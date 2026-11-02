<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useElementVisibility, useIntervalFn } from '@vueuse/core'
import { ArrowDown, ArrowRight, KeyRound, Link2, QrCode, RefreshCw } from '@lucide/vue'
import NfcCardVisual from '@/components/products/NfcCardVisual.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { NFC_LINK_MANAGER, nfcMessageUrl } from '@/data/nfc'

/**
 * Propuesta de valor: el cliente controlará el destino de sus tarjetas.
 * El estado (en desarrollo / disponible) y todos los textos vienen de
 * NFC_LINK_MANAGER en src/data/nfc.ts. La demostración es ilustrativa:
 * no hay inicio de sesión ni panel real en este sitio.
 */
const lm = NFC_LINK_MANAGER
const statusCopy = computed(() => lm.statusCopy[lm.status])
const isAvailable = computed(() => lm.status === 'disponible')

const benefitIcons = { 'misma-tarjeta': RefreshCw, 'nfc-qr': QrCode, acceso: KeyRound } as Record<string, typeof RefreshCw>

/* ── Demostración antes / después ── */
const exampleIndex = ref(0)
const phase = ref<'before' | 'after'>('before')
const example = computed(() => lm.examples[exampleIndex.value])
const destination = computed(() => example.value[phase.value])

const demoRef = ref<HTMLElement>()
const visible = useElementVisibility(demoRef)
const userControlled = ref(false)
const reduced = ref(false)

const { pause, resume } = useIntervalFn(
  () => {
    if (phase.value === 'before') phase.value = 'after'
    else {
      phase.value = 'before'
      exampleIndex.value = (exampleIndex.value + 1) % lm.examples.length
    }
  },
  3400,
  { immediate: false },
)

onMounted(() => {
  reduced.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
})
watch([visible, userControlled, reduced], ([v, u, r]) => (v && !u && !r ? resume() : pause()), { immediate: true })

const setPhase = (p: 'before' | 'after') => {
  userControlled.value = true
  phase.value = p
}
const setExample = (i: number) => {
  userControlled.value = true
  exampleIndex.value = i
  phase.value = 'before'
}

const whatsappUrl = nfcMessageUrl(lm.message)
const scrollToPrices = () => {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  document.getElementById('paquetes')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
}
</script>

<template>
  <section id="enlaces" class="stage on-ink grain" aria-labelledby="links-title">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-[radial-gradient(45%_60%_at_85%_30%,rgba(37,99,235,0.42),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgba(142,197,255,0.12),transparent_70%)]" />
      <div class="tech-grid absolute inset-0 opacity-50" />
    </div>

    <div class="shell section relative grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
      <!-- Texto -->
      <div class="lg:col-span-6">
        <p v-reveal="'fade'" class="eyebrow !text-on-ink-3">{{ lm.eyebrow }}</p>
        <h2 id="links-title" v-reveal="'clip'" class="display-2 mt-5 text-on-ink">
          Cambia tu enlace, <span class="serif text-signal">no tu tarjeta.</span>
        </h2>
        <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-6 max-w-xl !text-on-ink-2">{{ lm.description }}</p>

        <p v-reveal="{ variant: 'up', delay: 140 }" class="mt-6">
          <span class="chip chip-ink">
            <span :class="isAvailable ? 'dot-live' : 'h-1.5 w-1.5 rounded-full bg-amber-300'" aria-hidden="true" />
            {{ statusCopy.badge }}
          </span>
        </p>

        <ul v-reveal="{ variant: 'up', delay: 180 }" class="mt-9 grid gap-px overflow-hidden rounded-[24px] border border-ink-line bg-ink-line sm:grid-cols-3">
          <li v-for="b in lm.benefits" :key="b.id" class="bg-[#071426] p-5">
            <component :is="benefitIcons[b.id]" :size="18" class="text-signal" aria-hidden="true" />
            <p class="mt-4 text-sm font-semibold text-on-ink">{{ b.title }}</p>
            <p class="mt-1 text-[0.82rem] leading-snug text-on-ink-3">{{ b.desc }}</p>
          </li>
        </ul>

        <p class="mt-5 max-w-xl text-xs leading-relaxed text-on-ink-3">{{ statusCopy.note }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <button type="button" class="btn btn-light" @click="scrollToPrices">
            Ver tarjetas y combos
            <span class="btn-orb"><ArrowDown :size="15" /></span>
          </button>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ghost-ink">
            Preguntar por WhatsApp
            <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
          </a>
        </div>
      </div>

      <!-- Demostración -->
      <div ref="demoRef" v-reveal="'scale'" class="lg:col-span-6">
        <div class="rounded-[30px] border border-ink-line bg-white/[0.04] p-5 backdrop-blur-sm sm:p-7">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="flex items-center gap-2 text-sm font-semibold text-on-ink">
              <Link2 :size="16" class="text-signal" aria-hidden="true" /> Destino de tu tarjeta
            </p>
            <span class="rounded-full border border-ink-line px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-on-ink-3">
              Vista ilustrativa
            </span>
          </div>

          <div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Ejemplo de cambio de destino">
            <button
              v-for="(ex, i) in lm.examples"
              :key="ex.id"
              type="button"
              class="min-h-[36px] rounded-full px-3.5 text-xs font-medium transition-colors duration-300"
              :class="exampleIndex === i ? 'bg-white text-[#071426]' : 'border border-ink-line text-on-ink-2 hover:text-on-ink'"
              :aria-pressed="exampleIndex === i"
              @click="setExample(i)"
            >
              {{ ex.label }}
            </button>
          </div>

          <div class="mt-7 grid grid-cols-[minmax(0,88px)_auto_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[minmax(0,112px)_auto_minmax(0,1fr)] sm:gap-5">
            <NfcCardVisual label="Tu tarjeta" :interactive="false" :waves="phase === 'after'" />

            <span class="link-flow" :class="{ 'is-active': phase === 'after' }" aria-hidden="true">
              <ArrowRight :size="16" />
            </span>

            <div class="min-w-0 rounded-[22px] bg-[#F6F9FD] p-4 text-[#071426] sm:p-5">
              <p class="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#071426]/55">
                Tarjeta 01 · NFC + QR
              </p>
              <Transition
                mode="out-in"
                enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                enter-from-class="opacity-0 translate-y-2"
                leave-active-class="transition duration-200"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <div :key="`${example.id}-${phase}`" class="mt-3">
                  <span
                    class="inline-flex rounded-full px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em]"
                    :class="phase === 'after' ? 'bg-[#2563EB] text-white' : 'bg-[#071426]/[0.07] text-[#071426]/70'"
                  >
                    {{ phase === 'after' ? 'Después' : 'Antes' }}
                  </span>
                  <p class="mt-2 font-display text-lg font-semibold leading-tight tracking-tight">{{ destination.title }}</p>
                  <p class="mt-1 truncate font-mono text-xs text-[#071426]/60">{{ destination.url }}</p>
                </div>
              </Transition>
            </div>
          </div>

          <div class="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-ink-line pt-5">
            <div class="inline-flex rounded-full border border-ink-line p-1" role="group" aria-label="Momento del ejemplo">
              <button
                type="button"
                class="min-h-[36px] rounded-full px-4 text-xs font-semibold transition-colors"
                :class="phase === 'before' ? 'bg-white text-[#071426]' : 'text-on-ink-2'"
                :aria-pressed="phase === 'before'"
                @click="setPhase('before')"
              >
                Antes
              </button>
              <button
                type="button"
                class="min-h-[36px] rounded-full px-4 text-xs font-semibold transition-colors"
                :class="phase === 'after' ? 'bg-white text-[#071426]' : 'text-on-ink-2'"
                :aria-pressed="phase === 'after'"
                @click="setPhase('after')"
              >
                Después
              </button>
            </div>
            <p class="text-xs text-on-ink-3">Misma tarjeta física · mismo QR · nuevo destino</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.link-flow {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  border: 1px solid var(--c-ink-line);
  color: var(--c-on-ink-3);
  transition: color 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.link-flow.is-active {
  color: var(--c-signal);
  border-color: rgba(142, 197, 255, 0.45);
  transform: translateX(2px);
}
.link-flow::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1px solid var(--c-signal);
  opacity: 0;
}
.link-flow.is-active::after { animation: nfc-wave 1.6s ease-out 1; }

@media (prefers-reduced-motion: reduce) {
  .link-flow,
  .link-flow.is-active { transition: none; transform: none; }
  .link-flow.is-active::after { animation: none; }
}
</style>
