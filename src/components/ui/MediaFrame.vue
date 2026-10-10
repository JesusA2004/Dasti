<script setup lang="ts">
import { ref, watch } from 'vue'
import { ImageIcon } from '@lucide/vue'

/**
 * Marco de imagen con placeholder editorial.
 * Si `src` es null o la imagen no carga, muestra una composición de marca
 * en lugar de un error de carga. Útil para fotografías pendientes.
 */
const props = withDefaults(
  defineProps<{
    src: string | null
    alt: string
    caption?: string
    tone?: 'ink' | 'light'
    eager?: boolean
    showCaption?: boolean
    imgClass?: string
  }>(),
  { tone: 'ink', eager: false, showCaption: true, imgClass: '' },
)

const failed = ref(false)
watch(
  () => props.src,
  () => {
    failed.value = false
  },
)
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <img
      v-if="src && !failed"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      class="h-full w-full object-cover"
      :class="imgClass"
      @error="failed = true"
    />
    <div
      v-else
      class="absolute inset-0 flex flex-col justify-between p-5"
      :class="tone === 'ink' ? 'ph' : 'ph ph-light'"
      role="img"
      :aria-label="`${alt} (fotografía próximamente)`"
    >
      <slot name="placeholder">
        <span class="relative flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em]">
          <ImageIcon :size="13" />
          Fotografía oficial próximamente
        </span>
      </slot>
      <span v-if="showCaption && caption" class="relative font-serif text-xl italic leading-tight sm:text-2xl">
        {{ caption }}
      </span>
    </div>
  </div>
</template>
