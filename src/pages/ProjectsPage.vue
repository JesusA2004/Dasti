<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Clock, ExternalLink, Code2, Wifi, Mail, Monitor, Globe, GitMerge, Zap, ShoppingBag } from '@lucide/vue'
import LargeProjectsCTA from '@/components/LargeProjectsCTA.vue'

const router = useRouter()

const categories = ['Todos', 'Desarrollo', 'Infraestructura', 'Correos', 'Equipos', 'Automatización', 'Web']
const activeCategory = ref('Todos')

// Placeholder projects — ready to replace with real data
const projects = [
  {
    id: 1,
    slug: 'proyecto-software-interno',
    name: 'Proyecto en preparación',
    description: 'Sistema interno personalizado. Detalles próximamente.',
    category: 'Desarrollo',
    icon: Code2,
    color: '#3B82F6',
    tags: ['Software', 'Panel', 'Automatización'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 2,
    slug: 'proyecto-red-empresarial',
    name: 'Proyecto en preparación',
    description: 'Infraestructura de red empresarial. Detalles próximamente.',
    category: 'Infraestructura',
    icon: Wifi,
    color: '#60A5FA',
    tags: ['Redes', 'Mesh', 'WiFi'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 3,
    slug: 'proyecto-correo-corporativo',
    name: 'Proyecto en preparación',
    description: 'Implementación de correos corporativos. Detalles próximamente.',
    category: 'Correos',
    icon: Mail,
    color: '#F472B6',
    tags: ['Correos', 'Dominio', 'Seguridad'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 4,
    slug: 'proyecto-web-corporativo',
    name: 'Proyecto en preparación',
    description: 'Sitio web corporativo moderno. Detalles próximamente.',
    category: 'Web',
    icon: Globe,
    color: '#818CF8',
    tags: ['Web', 'Diseño', 'Responsivo'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 5,
    slug: 'proyecto-equipos',
    name: 'Proyecto en preparación',
    description: 'Suministro y configuración de equipos. Detalles próximamente.',
    category: 'Equipos',
    icon: Monitor,
    color: '#FB923C',
    tags: ['Equipos', 'Configuración', 'Soporte'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 6,
    slug: 'proyecto-automatizacion',
    name: 'Proyecto en preparación',
    description: 'Automatización de procesos empresariales. Detalles próximamente.',
    category: 'Automatización',
    icon: Zap,
    color: '#34D399',
    tags: ['Automatización', 'Integración', 'APIs'],
    image: null,
    link: null,
    status: 'pending',
  },
]

const filtered = computed(() =>
  activeCategory.value === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeCategory.value)
)
</script>

<template>
  <div class="pt-18">

    <!-- Header -->
    <section class="relative py-20 overflow-hidden" style="background: var(--bg-base);">
      <div class="absolute inset-0 grid-bg opacity-35 pointer-events-none" />
      <div class="orb w-[600px] h-[400px] top-0 right-0" style="background: var(--accent-glow-sm);" />
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          <span class="tag mb-4 inline-block">Portfolio</span>
          <h1 class="font-display text-4xl sm:text-5xl font-bold mb-6" style="color: var(--text-primary);">
            Proyectos
            <span class="gradient-text block">DASTI</span>
          </h1>
          <p class="text-lg max-w-2xl mx-auto" style="color: var(--text-secondary);">
            Los casos de proyectos desarrollados e implementados por DASTI se publicarán próximamente. Por ahora, aquí está la estructura lista para mostrar el trabajo real.
          </p>
        </div>
      </div>
    </section>

    <!-- Portfolio grid -->
    <section class="py-16" style="background: var(--bg-surface);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Category filters -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 12 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="flex flex-wrap gap-2 justify-center mb-12"
        >
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            :style="activeCategory === cat
              ? `background: var(--accent-glow-sm); color: var(--accent-lighter); border: 1px solid var(--border-accent);`
              : `background: var(--bg-card); color: var(--text-muted); border: 1px solid var(--border-subtle);`"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Project grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div
            v-for="(proj, i) in filtered"
            :key="proj.id"
            v-motion
            :initial="{ opacity: 0, y: 28 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: (i % 3) * 80, duration: 580 } }"
            class="glass-card rounded-2xl overflow-hidden flex flex-col group shimmer-card"
            style="box-shadow: var(--shadow-sm);"
          >
            <!-- Visual header (image placeholder) -->
            <div
              class="relative flex items-center justify-center flex-col gap-3"
              style="height: 200px;"
              :style="`background: linear-gradient(135deg, ${proj.color}18 0%, ${proj.color}06 100%);`"
            >
              <div class="absolute inset-0 pointer-events-none"
                style="background: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.012) 20px, rgba(255,255,255,0.012) 40px);" />
              <!-- Large watermark icon -->
              <component
                :is="proj.icon" :size="80"
                class="opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.12]"
                :style="`color: ${proj.color};`"
              />
              <!-- "Coming soon" overlay -->
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span class="text-xs font-medium px-2.5 py-1 rounded-full"
                  :style="`background: ${proj.color}18; color: ${proj.color}; border: 1px solid ${proj.color}30;`">
                  {{ proj.category }}
                </span>
                <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);">
                  <Clock :size="11" style="color: #94A3B8;" />
                  <span class="text-xs" style="color: #94A3B8;">Próximamente</span>
                </div>
              </div>
            </div>

            <!-- Card body -->
            <div class="p-6 flex-1 flex flex-col">
              <h3 class="font-semibold text-lg mb-2" style="color: var(--text-primary);">{{ proj.name }}</h3>
              <p class="text-sm leading-relaxed mb-4 flex-1" style="color: var(--text-muted);">
                {{ proj.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-5">
                <span
                  v-for="tag in proj.tags"
                  :key="tag"
                  class="text-xs px-2 py-0.5 rounded-full"
                  :style="`background: ${proj.color}10; color: ${proj.color}; border: 1px solid ${proj.color}20;`"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- CTAs -->
              <div class="flex gap-2">
                <button
                  @click="router.push('/contacto')"
                  class="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
                  :style="`background: ${proj.color}15; color: ${proj.color}; border: 1px solid ${proj.color}30;`"
                >
                  Solicitar proyecto similar
                  <ArrowRight :size="11" />
                </button>
                <button
                  disabled
                  class="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg cursor-not-allowed opacity-40"
                  style="background: var(--bg-elevated); border: 1px solid var(--border-subtle); color: var(--text-muted);"
                  title="Enlace pendiente"
                >
                  <ExternalLink :size="11" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state notice -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visibleOnce="{ opacity: 1, transition: { duration: 600 } }"
          class="text-center py-8"
        >
          <div class="glass-card rounded-2xl p-8 max-w-lg mx-auto"
            style="background: linear-gradient(135deg, var(--accent-glow-sm) 0%, var(--bg-card) 100%);">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style="background: var(--accent-glow-sm); border: 1px solid var(--border-medium);">
              <Clock :size="22" style="color: var(--accent-lighter);" />
            </div>
            <h3 class="font-semibold text-lg mb-2" style="color: var(--text-primary);">
              Casos en preparación
            </h3>
            <p class="text-sm mb-4" style="color: var(--text-secondary);">
              Los proyectos reales de DASTI se publicarán aquí con nombre, descripción, imágenes y referencias una vez que los clientes lo autoricen.
            </p>
            <p class="text-xs" style="color: var(--text-muted);">
              Si quieres ver en qué tipo de proyectos trabajamos, visita la sección de servicios.
            </p>
          </div>
        </div>
      </div>
    </section>

    <LargeProjectsCTA />

  </div>
</template>
