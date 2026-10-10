<script setup lang="ts">
import type { NfcTypeId } from '@/data/nfc'

/**
 * Smartphone esquemático que ilustra el destino de cada tipo de tarjeta.
 * Es una vista ilustrativa: no representa una aplicación específica.
 */
defineProps<{ type: NfcTypeId }>()
</script>

<template>
  <div class="phone" role="img" :aria-label="`Vista ilustrativa del destino digital (${type})`">
    <div class="phone-notch" aria-hidden="true" />
    <div class="phone-screen">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        enter-from-class="opacity-0 translate-y-3"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <!-- Presentación digital -->
        <div v-if="type === 'presentacion'" key="presentacion" class="flex h-full flex-col items-center px-4 pt-10">
          <span class="h-16 w-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#071426]" />
          <span class="mt-4 h-3 w-28 rounded-full bg-[#071426]/80" />
          <span class="mt-2 h-2 w-20 rounded-full bg-[#071426]/25" />
          <span class="mt-6 flex h-9 w-full items-center justify-center rounded-full bg-[#2563EB] text-[0.62rem] font-semibold text-white">
            Guardar contacto
          </span>
          <div class="mt-5 w-full space-y-2.5">
            <div v-for="n in 3" :key="n" class="flex items-center gap-3 rounded-xl bg-[#071426]/[0.04] p-2.5">
              <span class="h-6 w-6 rounded-lg bg-[#2563EB]/15" />
              <span class="h-2 flex-1 rounded-full bg-[#071426]/20" />
            </div>
          </div>
        </div>

        <!-- Redes sociales -->
        <div v-else-if="type === 'redes'" key="redes" class="flex h-full flex-col px-4 pt-10">
          <span class="h-3 w-24 rounded-full bg-[#071426]/80" />
          <span class="mt-2 h-2 w-32 rounded-full bg-[#071426]/25" />
          <div class="mt-6 grid grid-cols-2 gap-2.5">
            <span v-for="n in 4" :key="n" class="aspect-square rounded-2xl" :class="n % 2 ? 'bg-[#2563EB]/90' : 'bg-[#071426]/85'" />
          </div>
          <span class="mt-4 h-9 rounded-full border border-[#071426]/15" />
        </div>

        <!-- Reseñas de Google -->
        <div v-else-if="type === 'resenas'" key="resenas" class="flex h-full flex-col items-center px-4 pt-12 text-center">
          <span class="h-12 w-12 rounded-2xl bg-[#071426]/85" />
          <span class="mt-4 h-3 w-28 rounded-full bg-[#071426]/80" />
          <div class="mt-5 flex gap-1.5" aria-hidden="true">
            <svg v-for="n in 5" :key="n" viewBox="0 0 24 24" class="h-6 w-6" fill="#F5B301">
              <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
            </svg>
          </div>
          <span class="mt-6 h-16 w-full rounded-xl bg-[#071426]/[0.05]" />
          <span class="mt-4 flex h-9 w-full items-center justify-center rounded-full bg-[#2563EB] text-[0.62rem] font-semibold text-white">
            Publicar reseña
          </span>
        </div>

        <!-- Enlaces personalizados -->
        <div v-else key="enlaces" class="flex h-full flex-col px-4 pt-10">
          <span class="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-[#8EC5FF] to-[#2563EB]" />
          <span class="mx-auto mt-4 h-3 w-24 rounded-full bg-[#071426]/80" />
          <div class="mt-6 space-y-2.5">
            <span
              v-for="n in 4"
              :key="n"
              class="flex h-10 items-center justify-between rounded-full px-4"
              :class="n === 1 ? 'bg-[#071426] ' : 'bg-[#071426]/[0.05]'"
            >
              <span class="h-2 w-20 rounded-full" :class="n === 1 ? 'bg-white/80' : 'bg-[#071426]/25'" />
              <span class="h-2 w-2 rounded-full" :class="n === 1 ? 'bg-white/80' : 'bg-[#071426]/25'" />
            </span>
          </div>
        </div>
      </Transition>
    </div>
    <p class="phone-caption">Vista ilustrativa</p>
  </div>
</template>

<style scoped>
.phone {
  position: relative;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 9 / 18.5;
  border-radius: 38px;
  padding: 10px;
  background: linear-gradient(160deg, #1B2A44, #050C18);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
    0 40px 80px -30px rgba(2, 8, 18, 0.7);
}
.phone-notch {
  position: absolute;
  top: 18px;
  left: 50%;
  width: 70px;
  height: 18px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #050C18;
  z-index: 2;
}
.phone-screen {
  position: relative;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  background: #F6F9FD;
}
.phone-caption {
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-fg-3);
  white-space: nowrap;
}
</style>
