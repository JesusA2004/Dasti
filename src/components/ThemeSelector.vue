<script setup lang="ts">
import { ref } from 'vue'
import { Palette, X, Check } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

const { currentThemeId, themes, setTheme } = useTheme()
const isOpen = ref(false)
</script>

<template>
  <div class="fixed bottom-6 left-6 z-50">
    <!-- Toggle -->
    <button
      @click="isOpen = !isOpen"
      class="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200"
      style="background: var(--bg-elevated); border: 1px solid var(--border-medium);"
      :title="isOpen ? 'Cerrar temas' : 'Cambiar tema'"
    >
      <X v-if="isOpen" :size="17" style="color: var(--text-secondary);" />
      <Palette v-else :size="17" style="color: var(--accent-lighter);" />
    </button>

    <!-- Panel -->
    <Transition
      enter-active-class="transition-all duration-250 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-14 left-0 w-52 rounded-2xl p-3"
        style="background: var(--bg-elevated); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);"
      >
        <p class="text-xs font-semibold uppercase tracking-widest mb-3 px-1"
          style="color: var(--text-muted);">
          Tema visual
        </p>
        <div class="space-y-0.5">
          <button
            v-for="t in themes"
            :key="t.id"
            @click="setTheme(t.id); isOpen = false"
            class="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-200 group"
            :style="`background: ${currentThemeId === t.id ? 'var(--accent-glow-sm)' : 'transparent'}; border: 1px solid ${currentThemeId === t.id ? 'var(--border-medium)' : 'transparent'};`"
          >
            <!-- Swatch -->
            <div
              class="w-8 h-8 rounded-lg flex-shrink-0 relative overflow-hidden border border-white/10"
              :style="`background: ${t.preview.bg};`"
            >
              <div
                class="absolute inset-0 rounded-lg"
                :style="`background: linear-gradient(135deg, transparent 40%, ${t.preview.accent}55 100%);`"
              />
              <div
                class="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full"
                :style="`background: ${t.preview.accent};`"
              />
            </div>
            <div class="flex-1 text-left">
              <div class="text-xs font-semibold leading-tight" style="color: var(--text-primary);">{{ t.name }}</div>
              <div class="text-xs" style="color: var(--text-muted);">{{ t.label }}</div>
            </div>
            <Check
              v-if="currentThemeId === t.id"
              :size="14"
              style="color: var(--accent-light); flex-shrink: 0;"
            />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
