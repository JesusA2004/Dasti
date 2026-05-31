<script setup lang="ts">
import { ref } from 'vue'
import { Palette, X, Check } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

const { currentThemeId, themes, setTheme } = useTheme()
const isOpen = ref(false)
</script>

<template>
  <div class="fixed bottom-6 left-6 z-50">

    <!-- Toggle button -->
    <button
      @click="isOpen = !isOpen"
      class="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 relative group"
      style="background: var(--bg-elevated); border: 1px solid var(--border-medium);"
      :title="isOpen ? 'Cerrar' : 'Cambiar tema'"
    >
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 rotate-90 scale-50"
        enter-to-class="opacity-100 rotate-0 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 rotate-0 scale-100"
        leave-to-class="opacity-0 rotate-90 scale-50"
        mode="out-in"
      >
        <X v-if="isOpen" :size="16" style="color: var(--text-secondary);" />
        <Palette v-else :size="16" style="color: var(--accent-lighter);" />
      </Transition>
      <!-- Active theme dot -->
      <span
        v-if="!isOpen"
        class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
        :style="`background: ${themes.find(t => t.id === currentThemeId)?.preview.accent}; border-color: var(--bg-base);`"
      />
    </button>

    <!-- Panel -->
    <Transition
      enter-active-class="transition-all duration-280 ease-out"
      enter-from-class="opacity-0 scale-90 translate-y-3"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-90 translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-14 left-0 w-56 rounded-2xl overflow-hidden"
        style="background: var(--bg-elevated); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);"
      >
        <!-- Header -->
        <div class="px-4 pt-3.5 pb-2.5 border-b" style="border-color: var(--border-subtle);">
          <p class="text-xs font-semibold uppercase tracking-widest" style="color: var(--text-muted);">
            Tema visual
          </p>
        </div>

        <!-- Theme list -->
        <div class="p-2 space-y-0.5">
          <button
            v-for="t in themes"
            :key="t.id"
            @click="setTheme(t.id); isOpen = false"
            class="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-200 group"
            :style="`background: ${currentThemeId === t.id ? 'var(--accent-glow-sm)' : 'transparent'}; border: 1px solid ${currentThemeId === t.id ? 'var(--border-medium)' : 'transparent'};`"
          >
            <!-- Preview swatch -->
            <div
              class="w-9 h-9 rounded-lg flex-shrink-0 relative overflow-hidden"
              :style="`background: ${t.preview.bg}; border: 1px solid rgba(255,255,255,0.12);`"
            >
              <div
                class="absolute inset-0"
                :style="`background: linear-gradient(135deg, transparent 35%, ${t.preview.accent}60 100%);`"
              />
              <div
                class="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full"
                :style="`background: ${t.preview.accent}; box-shadow: 0 0 6px ${t.preview.accent}80;`"
              />
            </div>

            <div class="flex-1 text-left">
              <div class="text-xs font-semibold leading-tight" style="color: var(--text-primary);">{{ t.name }}</div>
              <div class="text-xs mt-0.5" style="color: var(--text-muted);">{{ t.label }}</div>
            </div>

            <Transition
              enter-active-class="transition-all duration-200"
              enter-from-class="opacity-0 scale-75"
              enter-to-class="opacity-100 scale-100"
            >
              <Check
                v-if="currentThemeId === t.id"
                :size="14"
                style="color: var(--accent-light); flex-shrink: 0;"
              />
            </Transition>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
