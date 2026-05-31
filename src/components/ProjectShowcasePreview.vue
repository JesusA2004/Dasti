<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRight, Clock, Code2, Wifi, Mail } from '@lucide/vue'

const router = useRouter()

const placeholders = [
  {
    color: '#3B82F6',
    category: 'Desarrollo de software',
    icon: Code2,
    title: 'Sistema administrativo',
    desc: 'Panel de gestión interno para empresa en Morelos. Detalles próximamente.',
    tech: ['Vue 3', 'Node.js', 'PostgreSQL'],
  },
  {
    color: '#34D399',
    category: 'Infraestructura y redes',
    icon: Wifi,
    title: 'Red empresarial mesh',
    desc: 'Implementación de red WiFi con cobertura total. Caso en preparación.',
    tech: ['Mesh WiFi', 'Roaming', 'Segmentación'],
  },
  {
    color: '#F472B6',
    category: 'Correos corporativos',
    icon: Mail,
    title: 'Correos para empresa',
    desc: 'Migración y configuración de correos corporativos. Publicación próxima.',
    tech: ['@dominio.com', 'DKIM/SPF', 'Administración'],
  },
]
</script>

<template>
  <section class="py-24 relative overflow-hidden" style="background: var(--bg-base);">
    <div class="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
    <div class="orb w-[500px] h-[400px] bottom-0 right-0 opacity-10" style="background: var(--accent-glow);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 550 } }"
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12"
      >
        <div>
          <span class="tag mb-4 inline-block">Portafolio</span>
          <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl" style="color: var(--text-primary);">
            Proyectos
            <span class="gradient-text"> DASTI</span>
          </h2>
        </div>
        <p class="text-sm max-w-xs" style="color: var(--text-muted);">
          Casos reales próximamente. Los proyectos actuales están en etapa de documentación.
        </p>
      </div>

      <!-- Project cards -->
      <div class="grid sm:grid-cols-3 gap-5 mb-10">
        <div
          v-for="(p, i) in placeholders"
          :key="i"
          v-motion
          :initial="{ opacity: 0, y: 32 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 110, duration: 520 } }"
          class="group glass-card rounded-2xl overflow-hidden shimmer-card cursor-default"
        >
          <!-- Visual header -->
          <div
            class="relative flex flex-col items-center justify-center gap-3 p-8"
            :style="`background: linear-gradient(135deg, ${p.color}15 0%, ${p.color}06 100%); border-bottom: 1px solid ${p.color}15;`"
          >
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center"
              :style="`background: ${p.color}20; border: 1.5px solid ${p.color}35; box-shadow: 0 0 24px ${p.color}20;`"
            >
              <component :is="p.icon" :size="24" :style="`color: ${p.color};`" />
            </div>
            <div class="absolute top-3 right-3 flex items-center gap-1.5">
              <div class="w-1.5 h-1.5 rounded-full animate-pulse" :style="`background: ${p.color};`" />
              <span class="text-xs" :style="`color: ${p.color};`">En prep.</span>
            </div>
            <!-- Placeholder image bar -->
            <div
              class="w-full h-1.5 rounded-full mt-2"
              :style="`background: linear-gradient(90deg, ${p.color}40, ${p.color}10);`"
            />
          </div>

          <!-- Card body -->
          <div class="p-5">
            <span
              class="text-xs font-medium px-2.5 py-1 rounded-full mb-3 inline-block"
              :style="`background: ${p.color}10; color: ${p.color}; border: 1px solid ${p.color}25;`"
            >
              {{ p.category }}
            </span>
            <h3 class="font-display font-bold text-base mb-2" style="color: var(--text-primary);">{{ p.title }}</h3>
            <p class="text-sm leading-relaxed mb-4" style="color: var(--text-muted);">{{ p.desc }}</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="t in p.tech"
                :key="t"
                class="text-xs px-2 py-0.5 rounded-md"
                style="background: var(--bg-elevated); color: var(--text-muted); border: 1px solid var(--border-subtle);"
              >{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <button @click="router.push('/proyectos')" class="btn-outline">
          Ver página de proyectos
          <ArrowRight :size="15" />
        </button>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
