<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { buildWhatsAppUrl, CONTACT_CONFIG } from '@/config/contact'

const whatsappUrl = buildWhatsAppUrl('Hola, me interesa recibir asesoría de DASTI para una solución en TI.')
</script>

<template>
  <section class="pb-6" aria-labelledby="cta-home-title">
    <div class="stage cta-stage">
      <div class="paper-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div class="shell section relative text-center">
        <p v-reveal="'fade'" class="eyebrow no-rule justify-center">Siguiente paso</p>
        <h2 id="cta-home-title" v-reveal="'clip'" class="display-1 mx-auto mt-6 max-w-4xl text-balance text-fg">
          ¿Qué necesita <span class="serif text-accent">tu empresa</span> hoy?
        </h2>
        <p v-reveal="{ variant: 'up', delay: 120 }" class="lead mx-auto mt-7 max-w-xl">
          Cuéntanos qué necesita tu operación y te orientamos con una solución en TI clara, funcional y escalable.
        </p>
        <div v-reveal="{ variant: 'up', delay: 200 }" class="mt-10 flex flex-wrap justify-center gap-3">
          <RouterLink to="/cotizador" class="btn btn-accent">
            Cotizar solución
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ink">
            Hablar por WhatsApp
            <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
          </a>
          <RouterLink to="/contacto" class="btn btn-line">
            Formulario de contacto
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
        <p v-reveal="{ variant: 'fade', delay: 260 }" class="mt-10 text-sm text-fg-3">
          {{ CONTACT_CONFIG.businessHours }} · {{ CONTACT_CONFIG.location }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-stage {
  background:
    radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--c-accent) 18%, transparent), transparent 70%),
    linear-gradient(180deg, var(--c-sky) 0%, var(--c-paper-2) 100%);
}
</style>
