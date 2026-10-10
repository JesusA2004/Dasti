<script setup lang="ts">
import { Scale } from '@lucide/vue'

/** Leyenda de independencia del aliado. Discreta, pero siempre visible. */
withDefaults(
  defineProps<{
    text: string
    accent?: string
    tone?: 'dark' | 'light'
    compact?: boolean
  }>(),
  { accent: '#C8A45D', tone: 'dark', compact: false },
)
</script>

<template>
  <aside
    class="flex items-start gap-4 rounded-[22px] border"
    :class="[
      compact ? 'p-4' : 'p-5 sm:p-6',
      tone === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-line bg-surface',
    ]"
    aria-label="Aviso de independencia"
  >
    <span
      class="grid h-10 w-10 shrink-0 place-items-center rounded-full border"
      :style="{ borderColor: `${accent}55`, color: accent }"
    >
      <Scale :size="17" />
    </span>
    <p class="text-[0.88rem] leading-relaxed" :class="tone === 'dark' ? 'text-white/75' : 'text-fg-2'">
      {{ text }}
    </p>
  </aside>
</template>
