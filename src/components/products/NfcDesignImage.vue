<script setup lang="ts">
import { ref, watch } from 'vue'
import { ImageOff } from '@lucide/vue'

/**
 * Imagen original de una cara de tarjeta del catálogo, en proporción vertical
 * CR80 (54 × 85.6). Usa `object-contain`: nunca recorta ni deforma el diseño.
 * Si el archivo todavía no existe, muestra un estado «Imagen pendiente»
 * (sin ícono de imagen rota y sin recrear el diseño).
 */
const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    /** Texto de la cara: «Frente» o «Reverso». */
    sideLabel: string
    eager?: boolean
  }>(),
  { eager: false },
)

const state = ref<'loading' | 'loaded' | 'missing'>('loading')
watch(
  () => props.src,
  () => (state.value = 'loading'),
)

const isDev = import.meta.env.DEV
</script>

<template>
  <div class="relative aspect-[54/85.6] w-full">
    <img
      v-if="state !== 'missing'"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      class="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
      :class="state === 'loaded' ? 'opacity-100' : 'opacity-0'"
      @load="state = 'loaded'"
      @error="state = 'missing'"
    />

    <div
      v-if="state === 'loading'"
      class="absolute inset-0 animate-pulse rounded-[0.9rem] bg-line/60"
      aria-hidden="true"
    />

    <div
      v-else-if="state === 'missing'"
      class="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[0.9rem] border border-dashed border-line-2 bg-paper-2/80 p-3 text-center"
      role="img"
      :aria-label="`${alt} (imagen pendiente)`"
    >
      <ImageOff :size="18" class="text-fg-3" aria-hidden="true" />
      <span class="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-fg-3">{{ sideLabel }}</span>
      <span class="text-[0.7rem] leading-snug text-fg-3">Imagen pendiente</span>
      <code v-if="isDev" class="mt-1 break-all text-[0.56rem] leading-tight text-fg-3/80">{{ src }}</code>
    </div>
  </div>
</template>
