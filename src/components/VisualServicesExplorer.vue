<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Code2, Wifi, Mail, Monitor, Zap, Lightbulb, CheckCircle2 } from '@lucide/vue'

const router = useRouter()

const categories = [
  {
    id: 'desarrollo',
    label: 'Software y desarrollo',
    color: '#3B82F6',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80',
    services: [
      { name: 'Desarrollo web', desc: 'Landing pages, sitios corporativos y plataformas web.' },
      { name: 'Software a medida', desc: 'Sistemas propios, paneles admin y gestión empresarial.' },
      { name: 'Integración de APIs', desc: 'Conecta plataformas externas con tu sistema.' },
      { name: 'Automatización web', desc: 'Formularios, notificaciones y flujos automáticos.' },
    ],
  },
  {
    id: 'infraestructura',
    label: 'Infraestructura y redes',
    color: '#34D399',
    icon: Wifi,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80',
    services: [
      { name: 'Redes empresariales', desc: 'Cableado, configuración y segmentación por área.' },
      { name: 'Sistemas mesh', desc: 'Cobertura total sin puntos ciegos en tu espacio.' },
      { name: 'Roaming automático', desc: 'Dispositivos sin cortes al moverse entre zonas.' },
      { name: 'Diagnóstico de red', desc: 'Evaluamos y optimizamos tu infraestructura actual.' },
    ],
  },
  {
    id: 'comunicacion',
    label: 'Comunicación corporativa',
    color: '#F472B6',
    icon: Mail,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&auto=format&fit=crop&q=80',
    services: [
      { name: 'Correos @tudominio.com', desc: 'Imagen profesional desde el primer mensaje.' },
      { name: 'SPF · DKIM · DMARC', desc: 'Seguridad técnica contra suplantación de identidad.' },
      { name: 'Cuentas por área', desc: 'Organiza a tu equipo con cuentas departamentales.' },
      { name: 'Administración continua', desc: 'Gestión, soporte y ajustes en todo momento.' },
    ],
  },
  {
    id: 'equipamiento',
    label: 'Equipamiento',
    color: '#FB923C',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80',
    services: [
      { name: 'Equipos nuevos', desc: 'Selección, compra y configuración lista para usar.' },
      { name: 'Actualización SSD/RAM', desc: 'Extiende la vida útil de equipos existentes.' },
      { name: 'Impresoras multimarca', desc: 'Instalación y configuración en red.' },
      { name: 'Soporte técnico', desc: 'Diagnóstico, mantenimiento y reparación.' },
    ],
  },
  {
    id: 'automatizacion',
    label: 'Automatización',
    color: '#FBBF24',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80',
    services: [
      { name: 'Procesos automáticos', desc: 'Elimina tareas manuales y repetitivas.' },
      { name: 'Integración de sistemas', desc: 'Conecta plataformas que no se hablan entre sí.' },
      { name: 'Chatbots', desc: 'Asistentes digitales para atención y ventas.' },
      { name: 'Reportes automáticos', desc: 'Datos clave sin tener que generarlos manualmente.' },
    ],
  },
  {
    id: 'asesoria',
    label: 'Asesoramiento',
    color: '#E879F9',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=80',
    services: [
      { name: 'Evaluación tecnológica', desc: 'Diagnóstico de tu situación actual.' },
      { name: 'Plan de mejora', desc: 'Roadmap tecnológico adaptado a tu empresa.' },
      { name: 'Presencia digital', desc: 'Redes sociales y estrategia de visibilidad.' },
      { name: 'Sin compromiso', desc: 'Primera consulta sin costo ni obligación de contratar.' },
    ],
  },
]

const activeId = ref('desarrollo')
const activeData = computed(() => categories.find(c => c.id === activeId.value)!)
</script>

<template>
  <section class="py-24 relative overflow-hidden" style="background: var(--bg-base);">
    <div class="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 550 } }"
        class="text-center mb-12"
      >
        <span class="tag mb-4 inline-block">Todos los servicios</span>
        <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl mb-4" style="color: var(--text-primary);">
          Explora por área
          <span class="gradient-text"> de mejora</span>
        </h2>
        <p class="text-base sm:text-lg max-w-xl mx-auto" style="color: var(--text-secondary);">
          Selecciona una categoría y descubre qué soluciones ofrece DASTI en esa área.
        </p>
      </div>

      <!-- Category tabs -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { delay: 150, duration: 500 } }"
        class="flex flex-wrap gap-2 justify-center mb-10"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeId = cat.id"
          class="explorer-tab"
          :class="{ active: activeId === cat.id }"
          :style="activeId === cat.id ? `border-color: ${cat.color}50; color: ${cat.color}; background: ${cat.color}10;` : ''"
        >
          <component :is="cat.icon" :size="13" class="inline mr-1.5" :style="activeId === cat.id ? `color: ${cat.color}` : ''" />
          {{ cat.label }}
        </button>
      </div>

      <!-- Main panel -->
      <Transition
        enter-active-class="transition-all duration-400 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <div :key="activeId" class="grid lg:grid-cols-2 gap-8 items-center">

          <!-- Image side -->
          <div
            class="relative rounded-2xl overflow-hidden aspect-video img-zoom"
            style="box-shadow: var(--shadow-lg);"
          >
            <img
              :src="activeData.image"
              :alt="activeData.label"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              class="absolute inset-0 pointer-events-none"
              :style="`background: linear-gradient(135deg, ${activeData.color}22 0%, transparent 50%, var(--bg-base) 100%); opacity: 0.75;`"
            />
            <!-- Badge -->
            <div class="absolute bottom-4 left-4 glass-card rounded-xl px-3.5 py-2 flex items-center gap-2">
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center"
                :style="`background: ${activeData.color}25; border: 1px solid ${activeData.color}45;`"
              >
                <component :is="activeData.icon" :size="13" :style="`color: ${activeData.color};`" />
              </div>
              <span class="text-xs font-semibold" style="color: var(--text-primary);">{{ activeData.label }}</span>
            </div>
          </div>

          <!-- Services side -->
          <div>
            <h3 class="font-display font-bold text-2xl sm:text-3xl mb-2" style="color: var(--text-primary);">
              {{ activeData.label }}
            </h3>
            <p class="text-sm mb-6" style="color: var(--text-muted);">{{ activeData.services.length }} servicios disponibles</p>

            <div class="space-y-3 mb-8">
              <div
                v-for="(svc, i) in activeData.services"
                :key="svc.name"
                v-motion
                :initial="{ opacity: 0, x: 20 }"
                :visibleOnce="{ opacity: 1, x: 0, transition: { delay: i * 80, duration: 400 } }"
                class="flex items-start gap-3 p-4 rounded-xl cursor-default group transition-all duration-200"
                style="border: 1px solid var(--border-subtle); background: var(--bg-card);"
                :style="`&:hover { border-color: ${activeData.color}35; background: ${activeData.color}06; }`"
              >
                <CheckCircle2 :size="16" class="flex-shrink-0 mt-0.5" :style="`color: ${activeData.color};`" />
                <div>
                  <p class="text-sm font-semibold mb-0.5" style="color: var(--text-primary);">{{ svc.name }}</p>
                  <p class="text-xs leading-relaxed" style="color: var(--text-muted);">{{ svc.desc }}</p>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button @click="router.push('/servicios')" class="btn-primary" :style="`background: linear-gradient(135deg, ${activeData.color}CC, ${activeData.color});`">
                Ver servicios completos
                <ArrowRight :size="15" />
              </button>
              <button @click="router.push('/cotizador')" class="btn-outline">
                Estimar inversión
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
