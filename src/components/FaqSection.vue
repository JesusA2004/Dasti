<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from '@lucide/vue'

import { useRouter } from 'vue-router'
const router = useRouter()
const openIndex = ref<number | null>(null)

const faqs = [
  {
    q: '¿DASTI solo desarrolla páginas web?',
    a: 'No. DASTI desarrolla e implementa soluciones en Tecnologías de la Información: software a medida, correos corporativos, redes, sistemas mesh, soporte técnico, equipos de cómputo, automatización, integración de sistemas y presencia digital. El desarrollo web es solo una parte del portafolio.',
  },
  {
    q: '¿Qué significa DASTI?',
    a: 'DASTI significa Desarrollo y Aplicación de Soluciones en TI. Es el enfoque central de la empresa: desarrollar e implementar soluciones tecnológicas reales y funcionales para negocios y empresas.',
  },
  {
    q: '¿Pueden apoyarme con una red WiFi empresarial?',
    a: 'Sí. Podemos revisar cobertura actual, configurar routers y puntos de acceso, implementar sistemas mesh para ampliar señal y habilitar roaming automático entre puntos. Apoyamos con soluciones para oficinas, bodegas, salas y distintas áreas de trabajo.',
  },
  {
    q: '¿Qué es un sistema mesh?',
    a: 'Un sistema mesh utiliza varios puntos de acceso que trabajan juntos como una sola red. Esto permite mejorar cobertura WiFi y estabilidad sin que el usuario tenga que cambiar manualmente de red al moverse dentro de la empresa.',
  },
  {
    q: '¿Qué es el roaming en una red?',
    a: 'El roaming permite que celulares, laptops u otros dispositivos se conecten automáticamente al punto de acceso más cercano mientras el usuario se desplaza dentro de la empresa, manteniendo la conexión estable y sin interrupciones.',
  },
  {
    q: '¿También venden equipos de cómputo?',
    a: 'Sí. Podemos evaluar si conviene actualizar equipos existentes con SSD, RAM u optimización, o adquirir equipos nuevos configurados según el perfil de uso de cada área: administrativo, multitarea o alto rendimiento.',
  },
  {
    q: '¿Pueden ser proveedores de impresoras?',
    a: 'Sí. Podemos apoyar con impresoras y periféricos multimarca, sujeto a disponibilidad, marca, modelo y requerimientos del cliente. La disponibilidad se confirma al momento de la cotización.',
  },
  {
    q: '¿DASTI desarrolla software a la medida?',
    a: 'Sí. Desarrollamos sistemas personalizados según las necesidades de operación de la empresa: control de información, gestión de usuarios, reportes automáticos, paneles administrativos, flujos de trabajo y más.',
  },
  {
    q: '¿Pueden administrar correos corporativos?',
    a: 'Sí. Implementamos y administramos correos con dominio propio, configuramos cuentas por área, aplicamos configuración técnica de seguridad (SPF, DKIM, DMARC) y brindamos soporte continuo.',
  },
  {
    q: '¿Pueden manejar redes sociales?',
    a: 'Podemos apoyar con presencia digital y gestión básica de redes sociales según el alcance acordado con el cliente, como parte de una estrategia de comunicación digital.',
  },
  {
    q: '¿Qué pasa si mi proyecto es grande o complejo?',
    a: 'Para proyectos de mayor alcance, integraciones especiales, infraestructura de red o implementaciones por etapas, podemos coordinar una videollamada o junta presencial para revisar necesidades, alcance y tiempos. La modalidad presencial depende de ubicación y disponibilidad.',
  },
  {
    q: '¿El cotizador da un precio final?',
    a: 'No. El cotizador muestra una referencia aproximada orientativa. El precio final se confirma después de revisar el alcance real, requerimientos técnicos, licencias, equipos, ubicación y tiempos de entrega en una propuesta formal.',
  },
  {
    q: '¿Pueden emitir factura?',
    a: 'Sí. DASTI puede emitir CFDI (Comprobante Fiscal Digital por Internet) en caso de ser requerido por el cliente o la empresa contratante.',
  },
  {
    q: '¿DASTI está ubicado en Morelos o Cuernavaca?',
    a: 'Sí. DASTI opera principalmente en Morelos, con enfoque en Cuernavaca y la zona metropolitana cercana. Desde ahí atendemos proyectos locales de forma presencial o remota.',
  },
  {
    q: '¿Atienden proyectos fuera de Morelos?',
    a: 'Sí. También atendemos proyectos en la Ciudad de México, Estado de México, Puebla y estados cercanos. La mayoría de servicios de software, correo, automatización e integración se realizan de forma remota sin restricción geográfica. Para servicios que requieren presencia física (redes, equipos, instalación de infraestructura), evaluamos viabilidad y costos de traslado según el proyecto.',
  },
  {
    q: '¿Todos los servicios pueden ser presenciales o remotos?',
    a: 'Depende del servicio. El desarrollo de software, correos corporativos, automatización, integración de sistemas y asesoramiento se realizan de forma remota. Los servicios de instalación de redes, configuración de equipos e impresoras pueden requerir presencia física. Para proyectos fuera de Morelos, coordinamos según el alcance y la ubicación del cliente.',
  },
  {
    q: '¿Pueden asesorarme si aún no sé qué solución necesito?',
    a: 'Sí. El asesoramiento tecnológico es parte de nuestros servicios. Si no tienes claro qué necesitas o por dónde empezar, podemos hacer un diagnóstico de tu situación actual y orientarte sobre qué implementar, en qué orden y cómo planificar la inversión. No es necesario contratar nada para recibir orientación inicial.',
  },
  {
    q: '¿Por qué algunos servicios aparecen como "A cotizar"?',
    a: 'Algunos servicios tienen un costo que depende del alcance específico del proyecto: número de puntos de acceso en una red, modelos de impresoras, integraciones involucradas, cantidad de módulos, entre otros factores. Para esos casos, necesitamos revisar el contexto del cliente antes de dar una cifra. El cotizador muestra "A cotizar" para ser transparentes: preferimos dar un precio real después de entender el proyecto que dar uno genérico que no aplique.',
  },
]

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
          Lo que más nos preguntan sobre nuestros servicios, tecnologías y forma de trabajo.
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 50, duration: 500 } }"
          class="glass-card rounded-xl overflow-hidden transition-all duration-300"
          :class="openIndex === i ? 'border-blue-500/30' : ''"
        >
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

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0"
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

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mt-12"
      >
        <p class="text-slate-400 mb-4">¿Tienes una pregunta que no está aquí?</p>
        <button @click="router.push('/contacto')" class="btn-outline">
          Escríbenos directamente
        </button>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
