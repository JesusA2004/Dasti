<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Calculator } from '@lucide/vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { buildWhatsAppUrl } from '@/config/contact'
import { alliances, allianceWhatsAppUrl } from '@/data/alliances'

/**
 * Accesos flotantes contextuales.
 * - Sitio DASTI: WhatsApp de DASTI + cotizador.
 * - Páginas de aliados: WhatsApp del propio aliado (nunca el de DASTI).
 * - Cotizador: oculto (la página tiene su propia barra de resumen).
 */
const route = useRoute()
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 600
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const ally = computed(() => alliances.find((a) => a.route === route.path))
const hidden = computed(() => route.path === '/cotizador')

const dastiWhatsApp = buildWhatsAppUrl('Hola, me interesa recibir asesoría de DASTI para una solución en TI.')
const allyWhatsApp = computed(() => (ally.value ? allianceWhatsAppUrl(ally.value) : ''))
</script>

<template>
  <Transition
    enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    enter-from-class="opacity-0 translate-y-4"
    leave-active-class="transition duration-300"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="scrolled && !hidden"
      class="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full p-1.5 shadow-[var(--shadow-deep)] sm:bottom-6 sm:right-6"
      :class="ally ? 'bg-[#070B14] ring-1 ring-[#C8A45D]/30' : 'glass'"
    >
      <template v-if="ally">
        <a
          :href="allyWhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[#070B14]"
          :style="{ background: `linear-gradient(135deg, ${ally.theme.accentLight}, ${ally.theme.accent})` }"
          :aria-label="`Contactar a ${ally.displayName} por WhatsApp`"
        >
          <WhatsAppIcon :size="17" />
          <span>Contactar a {{ ally.displayName }}</span>
        </a>
      </template>
      <template v-else>
        <RouterLink
          to="/cotizador"
          class="flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-fg transition-colors hover:bg-paper-2"
          aria-label="Abrir cotizador"
        >
          <Calculator :size="17" />
          <span class="hidden sm:inline">Cotizador</span>
        </RouterLink>
        <a
          :href="dastiWhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          class="grid h-12 w-12 place-items-center rounded-full bg-[#128C4A] text-white transition-transform duration-300 hover:scale-105"
          aria-label="Contactar a DASTI por WhatsApp"
        >
          <WhatsAppIcon :size="19" />
        </a>
      </template>
    </div>
  </Transition>
</template>
