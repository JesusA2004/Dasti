<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'

const openIndex = ref<number | null>(null)

const faqs = [
  {
    q: '¿Qué tipo de empresas atiende DASTI?',
    a: 'Atendemos negocios, emprendedores y empresas de cualquier tamaño que buscan mejorar su operación tecnológica, presencia digital o infraestructura. Trabajamos con empresas de servicios, comercio, administración y sectores varios que requieren soluciones de TI confiables.',
  },
  {
    q: '¿Los precios del cotizador son finales?',
    a: 'No. Los precios del cotizador son estimaciones aproximadas orientativas. El costo final depende del alcance real del proyecto, requerimientos específicos, licencias de software, hardware necesario, integraciones con otros sistemas y tiempos de entrega acordados. Siempre emitimos una propuesta formal antes de iniciar.',
  },
  {
    q: '¿DASTI desarrolla software a la medida?',
    a: 'Sí. Podemos crear sistemas personalizados según las necesidades de operación interna: control de inventario, gestión de clientes, reportes automáticos, paneles de administración, flujos de trabajo y más. Cada sistema se desarrolla conforme a la operación real de la empresa.',
  },
  {
    q: '¿Pueden administrar correos empresariales?',
    a: 'Sí. Implementamos y administramos correos corporativos con dominio propio, configuramos cuentas por área, gestionamos usuarios, aplicamos configuración técnica de seguridad (SPF, DKIM, DMARC) y brindamos soporte técnico continuo.',
  },
  {
    q: '¿También dan soporte a equipos de cómputo?',
    a: 'Sí. Realizamos diagnóstico de equipos, mantenimiento preventivo, instalación de software autorizado, optimización del sistema operativo y apoyo en la adquisición de equipos nuevos según el perfil de uso de cada colaborador.',
  },
  {
    q: '¿Pueden ayudar con redes e infraestructura?',
    a: 'Sí. Apoyamos con configuración de redes locales, conectividad, impresoras compartidas, accesos por área, seguridad básica de red y mejoras de infraestructura tecnológica para oficinas y empresas.',
  },
  {
    q: '¿El sitio web incluye dominio y hosting?',
    a: 'Depende del paquete que se elija. El dominio y hosting pueden incluirse en la propuesta o cotizarse por separado según las necesidades del cliente. Siempre se aclara en la propuesta formal.',
  },
  {
    q: '¿Pueden emitir factura?',
    a: 'Sí, DASTI puede emitir CFDI (Comprobante Fiscal Digital por Internet) en caso de ser requerido por el cliente o la empresa contratante.',
  },
]

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="relative py-24 overflow-hidden" style="background: #060F1E;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[500px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style="background: rgba(37,99,235,0.04);" />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-14"
      >
        <span class="tag mb-4 inline-block">Preguntas frecuentes</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Respuestas</span>
          <span class="gradient-text block">a tus dudas</span>
        </h2>
        <p class="text-slate-400 text-lg">
          Lo que más nos preguntan sobre nuestros servicios y forma de trabajo.
        </p>
      </div>

      <!-- Accordion -->
      <div class="space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 60, duration: 500 } }"
          class="glass-card rounded-xl overflow-hidden transition-all duration-300"
          :class="openIndex === i ? 'border-blue-500/30' : ''"
        >
          <!-- Question -->
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
            @click="toggle(i)"
            :aria-expanded="openIndex === i"
          >
            <span class="font-medium text-white text-sm sm:text-base leading-snug group-hover:text-blue-200 transition-colors">
              {{ faq.q }}
            </span>
            <div class="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
              :style="openIndex === i
                ? 'background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4);'
                : 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);'"
            >
              <ChevronDown
                :size="16"
                :class="['text-slate-400 transition-transform duration-300', openIndex === i ? 'rotate-180' : '']"
              />
            </div>
          </button>

          <!-- Answer -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-all duration-200"
            leave-to-class="opacity-0"
          >
            <div v-if="openIndex === i" class="px-6 pb-5 border-t" style="border-color: rgba(59,130,246,0.08);">
              <p class="text-slate-400 text-sm leading-relaxed pt-4">{{ faq.a }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Contact prompt -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mt-12"
      >
        <p class="text-slate-400 mb-4">¿Tienes una pregunta que no está aquí?</p>
        <button
          @click="scrollTo('#contacto')"
          class="btn-outline"
        >
          Escríbenos directamente
        </button>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
