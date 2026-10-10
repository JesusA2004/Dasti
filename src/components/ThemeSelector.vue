<script setup lang="ts">
import { computed } from 'vue'
import { Moon, Sun } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

/** Alternador de tema claro / oscuro (integrado en la navegación). */
withDefaults(defineProps<{ variant?: 'glass' | 'plain' }>(), { variant: 'glass' })

const { currentThemeId, toggleTheme } = useTheme()
const dark = computed(() => currentThemeId.value === 'dark')
</script>

<template>
  <button
    type="button"
    class="icon-btn relative overflow-hidden"
    :class="variant === 'glass' ? 'glass !border-line shadow-[var(--shadow-soft)]' : ''"
    :aria-label="dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
    :aria-pressed="dark"
    @click="toggleTheme"
  >
    <Transition
      enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="opacity-0 rotate-90 scale-50"
      leave-active-class="absolute transition duration-200"
      leave-to-class="opacity-0 -rotate-90 scale-50"
    >
      <Moon v-if="!dark" key="moon" :size="17" />
      <Sun v-else key="sun" :size="17" />
    </Transition>
  </button>
</template>
