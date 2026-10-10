<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import FaqList from '@/components/ui/FaqList.vue'
import { faqs } from '@/data/faq'
</script>

<template>
  <section class="section" aria-labelledby="faq-title">
    <div class="shell grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <div class="lg:sticky lg:top-32">
          <p v-reveal="'fade'" class="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
            Respuestas <span class="serif">claras.</span>
          </h2>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-5">
            Lo que más nos preguntan sobre servicios, cobertura, cotizaciones y facturación.
          </p>
          <RouterLink v-reveal="{ variant: 'up', delay: 160 }" to="/contacto" class="btn btn-line mt-8">
            Hacer otra pregunta
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
      </div>
      <div v-reveal="'up'" class="lg:col-span-8">
        <FaqList :items="faqs" />
      </div>
    </div>
  </section>
</template>
