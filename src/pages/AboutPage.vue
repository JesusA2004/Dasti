<script setup lang="ts">
import { useRouter } from 'vue-router'
import { MapPin, Wifi, Monitor, Layers, MessageSquare, ArrowRight } from '@lucide/vue'
import FaqSection from '@/components/FaqSection.vue'

const router = useRouter()

const zones = [
  {
    name: 'Morelos · Cuernavaca',
    label: 'Zona principal',
    desc: 'Sede principal. Proyectos presenciales y remotos en Cuernavaca y zona metropolitana.',
    color: '#3B82F6',
    presential: true,
  },
  {
    name: 'CDMX · Estado de México',
    label: 'Zona extendida',
    desc: 'Servicios de software, correo y automatización de forma remota. Presencial según alcance.',
    color: '#818CF8',
    presential: false,
  },
  {
    name: 'Puebla y estados cercanos',
    label: 'Cobertura regional',
    desc: 'Servicios remotos sin restricción. Presencial para proyectos que justifican desplazamiento.',
    color: '#34D399',
    presential: false,
  },
]

const values = [
  { icon: Layers, title: 'Soluciones adaptadas', desc: 'No aplicamos plantillas genéricas. Analizamos la operación y proponemos lo que realmente se necesita.', color: '#3B82F6' },
  { icon: MessageSquare, title: 'Comunicación clara', desc: 'Explicamos cada etapa en lenguaje entendible, sin tecnicismos innecesarios y con total transparencia.', color: '#818CF8' },
  { icon: Wifi, title: 'Experiencia integral', desc: 'Cubrimos software, infraestructura, redes, equipos, soporte técnico y automatización.', color: '#34D399' },
  { icon: Monitor, title: 'Tecnología funcional', desc: 'Cada solución parte de una necesidad concreta. La tecnología debe ser útil, no solo moderna.', color: '#FBBF24' },
]
</script>

<template>
  <div class="pt-18">

    <!-- Hero -->
    <section class="relative py-20 overflow-hidden" style="background: linear-gradient(160deg, #020B18 0%, #0A1628 60%, #050D1A 100%);">
      <div class="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div class="orb w-[600px] h-[400px] top-0 left-1/2 -translate-x-1/2"
        style="background: rgba(37,99,235,0.06);" />
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          <span class="tag mb-4 inline-block">Quiénes somos</span>
          <h1 class="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span class="text-white">Desarrollo y Aplicación de</span>
            <span class="gradient-text block">Soluciones en TI</span>
          </h1>
          <p class="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            DASTI es una empresa ubicada en Morelos, con atención principal en Cuernavaca y zona metropolitana.
            Desarrollamos, implementamos y administramos soluciones en Tecnologías de la Información para empresas
            que buscan mejorar su operación, infraestructura, comunicación y procesos internos.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button @click="router.push('/servicios')" class="btn-primary">
              Ver servicios
              <ArrowRight :size="16" />
            </button>
            <button @click="router.push('/contacto')" class="btn-outline">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- What is DASTI -->
    <section class="py-20" style="background: #050D1A;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-start">
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
          >
            <h2 class="font-display text-3xl font-bold text-white mb-6">¿Qué significa DASTI?</h2>
            <p class="text-slate-400 leading-relaxed mb-5">
              DASTI significa <strong class="text-white">Desarrollo y Aplicación de Soluciones en TI</strong>.
              Es el enfoque central de la empresa: desarrollar e implementar soluciones tecnológicas reales
              y funcionales para negocios y empresas que necesitan tecnología que funcione.
            </p>
            <p class="text-slate-400 leading-relaxed mb-5">
              No nos limitamos a servicios digitales. Integramos software, infraestructura de red, correos
              corporativos, soporte técnico, equipos de cómputo, impresoras, automatización, integración
              de sistemas y asesoramiento tecnológico.
            </p>
            <p class="text-slate-400 leading-relaxed">
              Trabajamos con un enfoque práctico: analizamos la necesidad, proponemos una solución viable,
              la implementamos y acompañamos al cliente durante todo el proceso.
            </p>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
            class="grid grid-cols-2 gap-4"
          >
            <div v-for="v in values" :key="v.title"
              class="glass-card rounded-xl p-5"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                :style="`background: ${v.color}15; border: 1px solid ${v.color}35;`">
                <component :is="v.icon" :size="20" :style="`color: ${v.color}`" />
              </div>
              <h4 class="font-semibold text-white text-sm mb-2">{{ v.title }}</h4>
              <p class="text-xs text-slate-400 leading-relaxed">{{ v.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section-line max-w-7xl mx-auto mt-20" />
    </section>

    <!-- How we work -->
    <section class="py-20" style="background: #060F1E;">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-14"
        >
          <span class="tag mb-4 inline-block">Forma de trabajo</span>
          <h2 class="font-display text-3xl font-bold text-white mb-4">Cómo trabajamos</h2>
          <p class="text-slate-400">Proceso claro desde la primer consulta hasta la entrega.</p>
        </div>
        <div class="space-y-6">
          <div v-for="(step, i) in [
            { n: '01', title: 'Consulta inicial', desc: 'Escuchamos lo que necesitas. Si no tienes claro el alcance, te ayudamos a definirlo sin compromiso.' },
            { n: '02', title: 'Propuesta y alcance', desc: 'Documentamos el alcance, plazos y costo estimado. Sin sorpresas en la entrega.' },
            { n: '03', title: 'Implementación', desc: 'Desarrollamos, configuramos o instalamos la solución con los estándares técnicos adecuados.' },
            { n: '04', title: 'Entrega y acompañamiento', desc: 'Entregamos documentado y acompañamos al cliente durante la adopción y uso de la solución.' },
          ]" :key="i"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: i * 80, duration: 500 } }"
            class="flex items-start gap-5 glass-card rounded-xl p-5"
          >
            <div class="text-2xl font-bold font-display flex-shrink-0 gradient-text">{{ step.n }}</div>
            <div>
              <h4 class="font-semibold text-white mb-1">{{ step.title }}</h4>
              <p class="text-sm text-slate-400 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section-line max-w-7xl mx-auto mt-20" />
    </section>

    <!-- Coverage -->
    <section class="py-20" style="background: #050D1A;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-12"
        >
          <span class="tag mb-4 inline-block">Cobertura geográfica</span>
          <h2 class="font-display text-3xl font-bold text-white mb-4">¿Dónde atendemos?</h2>
          <p class="text-slate-400 max-w-xl mx-auto">
            La mayoría de servicios pueden realizarse de forma remota. Para servicios que requieren
            presencia física, atendemos Morelos y zonas cercanas.
          </p>
        </div>
        <div class="grid sm:grid-cols-3 gap-5 mb-12">
          <div
            v-for="(zone, i) in zones"
            :key="zone.name"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 600 } }"
            class="glass-card rounded-2xl p-6 relative overflow-hidden"
          >
            <div class="flex items-start gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                :style="`background: ${zone.color}15; border: 1px solid ${zone.color}35;`">
                <MapPin :size="18" :style="`color: ${zone.color}`" />
              </div>
              <div>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium mb-1 inline-block"
                  :style="`background: ${zone.color}12; color: ${zone.color}; border: 1px solid ${zone.color}25;`">
                  {{ zone.label }}
                </span>
                <h3 class="font-semibold text-white text-base">{{ zone.name }}</h3>
              </div>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed">{{ zone.desc }}</p>
            <div class="mt-4 flex items-center gap-2">
              <div class="w-2 h-2 rounded-full" :style="`background: ${zone.presential ? '#4ade80' : zone.color};`" />
              <span class="text-xs text-slate-500">{{ zone.presential ? 'Presencial y remoto' : 'Principalmente remoto' }}</span>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button @click="router.push('/contacto')" class="btn-primary">
            Consultar disponibilidad
          </button>
        </div>
      </div>
      <div class="section-line max-w-7xl mx-auto mt-20" />
    </section>

    <!-- FAQ -->
    <FaqSection />

  </div>
</template>
