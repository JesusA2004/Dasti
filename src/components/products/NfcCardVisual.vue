<script setup lang="ts">
import { ref } from 'vue'
import { usePointerVars } from '@/composables/usePointerVars'

/**
 * Representación ilustrativa (CSS) de una tarjeta NFC DASTI.
 * No sustituye a las fotografías oficiales: se usa como pieza gráfica.
 * Con `interactive`, la tarjeta se inclina siguiendo el puntero.
 */
withDefaults(
  defineProps<{
    label?: string
    finish?: 'midnight' | 'pearl' | 'electric'
    interactive?: boolean
    waves?: boolean
  }>(),
  { label: 'Tarjeta inteligente', finish: 'midnight', interactive: true, waves: true },
)

const wrapRef = ref<HTMLElement>()
usePointerVars(wrapRef)

// Patrón decorativo (no es un código QR funcional)
const pattern = [
  1, 1, 1, 0, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 0, 1, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 1,
  0, 0, 0, 1, 0, 1, 0, 0, 0,
  1, 0, 1, 1, 1, 0, 1, 1, 0,
  0, 1, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 0, 1, 0, 1, 0,
  1, 0, 1, 1, 0, 0, 1, 1, 1,
  1, 1, 1, 0, 1, 1, 0, 0, 1,
]
</script>

<template>
  <div ref="wrapRef" class="nfc-wrap relative" :class="{ 'is-interactive': interactive }">
    <div class="nfc-float">
      <div class="nfc-card" :class="`finish-${finish}`" role="img" :aria-label="`Ilustración de tarjeta NFC: ${label}`">
        <div class="nfc-sheen" aria-hidden="true" />

        <div class="relative flex h-full flex-col justify-between p-[7%]">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
              <span class="grid h-[2.1em] w-[2.1em] place-items-center rounded-full bg-white/95">
                <img src="/img/favicon.png" alt="" class="h-[1.45em] w-[1.45em] object-contain" />
              </span>
              <span class="nfc-brand text-[0.95em] font-semibold tracking-[0.22em]">DASTI</span>
            </div>

            <!-- Símbolo de lectura sin contacto -->
            <span class="relative grid h-[2.4em] w-[2.4em] place-items-center">
              <svg viewBox="0 0 24 24" class="nfc-symbol h-[1.7em] w-[1.7em]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
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

          <div class="flex items-end justify-between gap-3">
            <div>
              <p class="nfc-kicker text-[0.58em] font-medium uppercase tracking-[0.2em]">NFC · QR</p>
              <p class="nfc-label mt-1 font-serif text-[1.35em] italic leading-none">{{ label }}</p>
            </div>
            <div class="nfc-qr grid shrink-0 grid-cols-9 gap-[1px] rounded-[0.35em] p-[0.32em]" aria-hidden="true">
              <span v-for="(c, i) in pattern" :key="i" class="h-[0.3em] w-[0.3em] rounded-[1px]" :class="c ? 'nfc-qr-on' : ''" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nfc-shadow" aria-hidden="true" />
  </div>
</template>

<style scoped>
.nfc-wrap {
  perspective: 1200px;
  font-size: clamp(12px, 2.4vw, 18px);
}

.nfc-float { animation: float-y 8s ease-in-out infinite; }

.nfc-card {
  position: relative;
  aspect-ratio: 85.6 / 54;
  width: 100%;
  border-radius: 1.1em;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: rotateX(calc(8deg + var(--py, 0) * -16deg)) rotateY(calc(-14deg + var(--px, 0) * 22deg)) rotateZ(-2deg);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.22) inset,
    0 30px 60px -20px rgba(2, 8, 18, 0.65);
}

.finish-midnight {
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(59, 130, 246, 0.55), transparent 55%),
    radial-gradient(90% 120% at 0% 100%, rgba(142, 197, 255, 0.22), transparent 60%),
    linear-gradient(145deg, #0E2142 0%, #071426 70%);
  color: #F2F6FC;
}
.finish-electric {
  background:
    radial-gradient(120% 140% at 0% 0%, rgba(255, 255, 255, 0.28), transparent 55%),
    linear-gradient(140deg, #3B82F6 0%, #1D4ED8 55%, #0B2A6F 100%);
  color: #fff;
}
.finish-pearl {
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(37, 99, 235, 0.16), transparent 55%),
    linear-gradient(145deg, #FFFFFF 0%, #E6EEF8 100%);
  color: #071426;
}

.nfc-brand { opacity: 0.95; }
.nfc-kicker { opacity: 0.6; }
.nfc-symbol { opacity: 0.9; }

.nfc-qr { background: rgba(255, 255, 255, 0.92); }
.nfc-qr-on { background: #071426; }
.finish-pearl .nfc-qr { background: #071426; }
.finish-pearl .nfc-qr-on { background: #fff; }

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
  width: 35%;
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
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(2, 8, 18, 0.35), transparent);
  filter: blur(6px);
}

@media (prefers-reduced-motion: reduce) {
  .nfc-card { transform: rotateX(8deg) rotateY(-14deg) rotateZ(-2deg); }
}
</style>
