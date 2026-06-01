<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Calculator, MessageCircle } from '@lucide/vue'
import { buildWhatsAppUrl } from '@/config/contact'

const router = useRouter()
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 350
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const goToQuoter = () => {
  router.push('/cotizador')
}

const openWhatsApp = () => {
  const msg = 'Hola, me interesa recibir asesoría de DASTI para una solución en TI.'
  window.open(buildWhatsAppUrl(msg), '_blank')
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

    <!-- Quoter button — appears after scroll -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <button
        v-if="scrolled"
        @click="goToQuoter"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 group"
        style="background: linear-gradient(135deg, #2563EB, #1D4ED8); box-shadow: 0 4px 20px rgba(37,99,235,0.4), 0 0 0 1px rgba(59,130,246,0.25);"
        aria-label="Cotizador"
      >
        <Calculator :size="15" class="group-hover:rotate-12 transition-transform duration-200" />
        <span class="hidden sm:inline">Estimar inversión</span>
      </button>
    </Transition>

    <!-- WhatsApp button — always visible -->
    <button
      @click="openWhatsApp"
      class="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95"
      style="background: linear-gradient(135deg, #25D366, #1EAE52); box-shadow: 0 6px 24px rgba(37,211,102,0.45), 0 0 0 1px rgba(37,211,102,0.2);"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle :size="26" class="text-white" fill="white" style="fill: white;" />
    </button>
  </div>
</template>
