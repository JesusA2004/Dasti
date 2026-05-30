<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Calculator } from '@lucide/vue'

const visible = ref(false)

const handleScroll = () => {
  visible.value = window.scrollY > 400
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const scrollToQuoter = () => {
  const el = document.querySelector('#cotizador')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="visible"
      @click="scrollToQuoter"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-xl transition-all duration-250 hover:-translate-y-1 group"
      style="background: linear-gradient(135deg, #2563EB, #1D4ED8); box-shadow: 0 4px 24px rgba(37,99,235,0.4), 0 0 0 1px rgba(59,130,246,0.3);"
      aria-label="Cotizar proyecto"
    >
      <Calculator :size="18" class="group-hover:rotate-12 transition-transform duration-200" />
      <span class="hidden sm:inline">Cotizar proyecto</span>
    </button>
  </Transition>
</template>
