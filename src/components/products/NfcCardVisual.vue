<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RotateCw } from '@lucide/vue'
import { usePointerVars } from '@/composables/usePointerVars'

/**
 * Representación ilustrativa (CSS) de una tarjeta NFC DASTI.
 *
 * Fiel al producto físico: formato CR80 en VERTICAL (54 × 85.6 mm).
 * - Frente: diseño y símbolo NFC. Nunca lleva código QR.
 * - Reverso: código QR personalizado (aquí, patrón decorativo no funcional).
 *
 * No sustituye a las fotografías oficiales ni a los diseños del catálogo:
 * es una pieza gráfica de apoyo. Con `flippable` se muestra un botón para
 * girarla; con `interactive`, se inclina siguiendo el puntero.
 */
const props = withDefaults(
  defineProps<{
    label?: string
    finish?: 'midnight' | 'pearl' | 'electric'
    side?: 'front' | 'back'
    flippable?: boolean
    interactive?: boolean
    waves?: boolean
  }>(),
  { label: 'Tarjeta inteligente', finish: 'midnight', side: 'front', flippable: false, interactive: true, waves: true },
)

const wrapRef = ref<HTMLElement>()
usePointerVars(wrapRef)

const showBack = ref(props.side === 'back')
watch(
  () => props.side,
  (s) => (showBack.value = s === 'back'),
)
const toggle = () => (showBack.value = !showBack.value)

const ariaLabel = computed(() =>
  showBack.value
    ? `Ilustración del reverso de una tarjeta NFC vertical con código QR personalizado: ${props.label}`
    : `Ilustración del frente de una tarjeta NFC vertical: ${props.label}`,
)

/*
 * Patrón decorativo 21 × 21 con apariencia de QR (no es un código funcional):
 * tres marcas de posición en las esquinas y módulos pseudoaleatorios estables.
 */
const SIZE = 21
const finder = (r: number, c: number) => {
  const inBox = (r0: number, c0: number) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7
  for (const [r0, c0] of [[0, 0], [0, SIZE - 7], [SIZE - 7, 0]] as const) {
    if (inBox(r0, c0)) {
      const rr = r - r0
      const cc = c - c0
      const ring = rr === 0 || rr === 6 || cc === 0 || cc === 6
      const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4
      return ring || core ? 1 : 0
    }
    // Separador blanco alrededor de cada marca
    if (r >= r0 - 1 && r <= r0 + 7 && c >= c0 - 1 && c <= c0 + 7) return 0
  }
  return null
}
const qr = Array.from({ length: SIZE * SIZE }, (_, i) => {
  const r = Math.floor(i / SIZE)
  const c = i % SIZE
  const f = finder(r, c)
  if (f !== null) return f
  return ((r * 7 + c * 13 + r * c * 3) % 5) % 2 === 0 ? 1 : 0
})
</script>

<template>
  <div class="nfc-wrap relative" :class="{ 'is-interactive': interactive }">
    <div ref="wrapRef" class="nfc-float">
      <div class="nfc-card" :class="{ 'is-back': showBack }" role="img" :aria-label="ariaLabel">
        <!-- Frente: diseño + NFC (sin QR) -->
        <div class="nfc-face nfc-front" :class="`finish-${finish}`" :aria-hidden="showBack">
          <div class="nfc-sheen" aria-hidden="true" />
          <div class="relative flex h-full flex-col p-[9%]">
            <div class="flex items-center gap-[0.45em]">
              <span class="grid h-[1.9em] w-[1.9em] place-items-center rounded-full bg-white/95">
                <img src="/img/favicon.png" alt="" class="h-[1.3em] w-[1.3em] object-contain" />
              </span>
              <span class="text-[0.8em] font-semibold tracking-[0.24em] opacity-95">DASTI</span>
            </div>

            <div class="flex flex-1 items-center justify-center">
              <span class="relative grid h-[4.6em] w-[4.6em] place-items-center">
                <svg viewBox="0 0 24 24" class="h-[3em] w-[3em] opacity-90" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
                  <path d="M8.5 9.2a4 4 0 0 1 0 5.6" />
                  <path d="M11.6 7a7.2 7.2 0 0 1 0 10" />
                  <path d="M14.7 4.8a10.4 10.4 0 0 1 0 14.4" />
                </svg>
                <template v-if="waves">
                  <span class="nfc-ring" aria-hidden="true" />
                  <span class="nfc-ring" style="animation-delay: 0.9s" aria-hidden="true" />
                </template>
              </span>
            </div>

            <div>
              <p class="text-[0.5em] font-medium uppercase tracking-[0.22em] opacity-60">Acerca tu teléfono</p>
              <p class="mt-[0.35em] font-serif text-[1.25em] italic leading-[1.05]">{{ label }}</p>
            </div>
          </div>
        </div>

        <!-- Reverso: QR personalizado -->
        <div class="nfc-face nfc-back" :class="`finish-${finish}`" :aria-hidden="!showBack">
          <div class="relative flex h-full flex-col items-center p-[9%] text-center">
            <span class="self-start text-[0.55em] font-semibold tracking-[0.24em] opacity-70">DASTI</span>
            <div class="flex flex-1 flex-col items-center justify-center">
              <div class="nfc-qr grid grid-cols-[repeat(21,1fr)] rounded-[0.5em] p-[0.45em]" aria-hidden="true">
                <span v-for="(on, i) in qr" :key="i" class="aspect-square" :class="on ? 'nfc-qr-on' : ''" />
              </div>
              <p class="mt-[0.8em] text-[0.5em] font-semibold uppercase tracking-[0.2em] opacity-75">QR personalizado</p>
            </div>
            <p class="text-[0.55em] leading-snug opacity-70">Escanea el código o acerca tu teléfono a la tarjeta</p>
          </div>
        </div>
      </div>
    </div>
    <div class="nfc-shadow" aria-hidden="true" />

    <div v-if="flippable" class="mt-4 flex justify-center">
      <button type="button" class="nfc-flip-btn" :aria-pressed="showBack" @click="toggle">
        <RotateCw :size="14" aria-hidden="true" />
        {{ showBack ? 'Ver frente' : 'Ver reverso con QR' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.nfc-wrap {
  container-type: inline-size;
}

.nfc-float {
  perspective: 1400px;
  animation: float-y 8s ease-in-out infinite;
}

/* Proporción física CR80 en vertical: 54 × 85.6 mm */
.nfc-card {
  --flip: 0deg;
  position: relative;
  aspect-ratio: 54 / 85.6;
  width: 100%;
  font-size: 7.4cqw;
  transform-style: preserve-3d;
  transform: rotateZ(-2deg) rotateX(calc(4deg + var(--py, 0) * -10deg)) rotateY(calc(-8deg + var(--px, 0) * 14deg + var(--flip)));
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.nfc-wrap:not(.is-interactive) .nfc-card {
  transform: rotateZ(-2deg) rotateX(4deg) rotateY(calc(-8deg + var(--flip)));
}
.nfc-card.is-back { --flip: 180deg; }

.nfc-face {
  position: absolute;
  inset: 0;
  border-radius: 0.95em;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.22) inset,
    0 30px 60px -20px rgba(2, 8, 18, 0.65);
}
.nfc-back { transform: rotateY(180deg); }

.finish-midnight {
  background:
    radial-gradient(120% 80% at 100% 0%, rgba(59, 130, 246, 0.55), transparent 55%),
    radial-gradient(90% 70% at 0% 100%, rgba(142, 197, 255, 0.22), transparent 60%),
    linear-gradient(160deg, #0E2142 0%, #071426 70%);
  color: #F2F6FC;
}
.finish-electric {
  background:
    radial-gradient(120% 80% at 0% 0%, rgba(255, 255, 255, 0.28), transparent 55%),
    linear-gradient(160deg, #3B82F6 0%, #1D4ED8 55%, #0B2A6F 100%);
  color: #fff;
}
.finish-pearl {
  background:
    radial-gradient(120% 80% at 100% 0%, rgba(37, 99, 235, 0.16), transparent 55%),
    linear-gradient(160deg, #FFFFFF 0%, #E6EEF8 100%);
  color: #071426;
}

/* El reverso usa un fondo más sobrio para que el QR destaque */
.nfc-back.finish-midnight,
.nfc-back.finish-electric {
  background: linear-gradient(180deg, #0E2142 0%, #071426 100%);
}

.nfc-qr {
  width: 72%;
  background: #fff;
  box-shadow: 0 10px 30px -12px rgba(2, 8, 18, 0.45);
}
.nfc-qr-on { background: #071426; }
.finish-pearl .nfc-qr { outline: 1px solid rgba(7, 20, 38, 0.08); }

.nfc-sheen {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.nfc-sheen::after {
  content: '';
  position: absolute;
  top: -20%;
  bottom: -20%;
  width: 45%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
  animation: sheen 6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.nfc-ring {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1px solid currentColor;
  opacity: 0;
  animation: nfc-wave 2.4s ease-out infinite;
}

.nfc-shadow {
  margin: 8% auto 0;
  width: 70%;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(2, 8, 18, 0.35), transparent);
  filter: blur(6px);
}

.nfc-flip-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 40px;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid currentColor;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.85;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.nfc-flip-btn:hover,
.nfc-flip-btn:focus-visible { opacity: 1; transform: translateY(-1px); }

@media (prefers-reduced-motion: reduce) {
  .nfc-float { animation: none; }
  .nfc-card { transition: none; transform: rotateY(var(--flip)); }
  .nfc-wrap:not(.is-interactive) .nfc-card { transform: rotateY(var(--flip)); }
}
</style>
