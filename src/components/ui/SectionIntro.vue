<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    align?: 'left' | 'center'
    inverse?: boolean
  }>(),
  { align: 'left', inverse: false },
)
</script>

<template>
  <header :class="['max-w-3xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p v-if="eyebrow" v-reveal="'fade'" class="eyebrow mb-5" :class="inverse ? '!text-on-ink-3' : ''">
      {{ eyebrow }}
    </p>
    <h2 v-reveal="'clip'" class="display-2 text-balance" :class="inverse ? 'text-on-ink' : 'text-fg'">
      <slot name="title" />
    </h2>
    <p
      v-if="$slots.default"
      v-reveal="{ variant: 'up', delay: 120 }"
      class="lead mt-6 text-pretty"
      :class="[inverse ? '!text-on-ink-2' : '', align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl']"
    >
      <slot />
    </p>
  </header>
</template>
