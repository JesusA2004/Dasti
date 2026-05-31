<script setup lang="ts">
import { Code2, Mail, Wifi, Monitor, ShoppingBag, Globe, GitMerge } from '@lucide/vue'

const projects = [
  {
    icon: Code2,
    title: 'Sistemas internos y reportes',
    color: '#3B82F6',
    category: 'Desarrollo de software',
    byScope: true,
    problem: 'La empresa maneja información en hojas de cálculo o sistemas dispersos sin control centralizado.',
    included: ['Panel administrativo con usuarios y roles', 'Módulos de carga y consulta de datos', 'Reportes automáticos y exportación', 'Historial de actividad'],
    idealFor: ['Empresas con procesos operativos propios', 'Equipos que necesitan control de información', 'Negocios que quieren dejar de usar Excel para todo'],
  },
  {
    icon: Mail,
    title: 'Correo corporativo administrado',
    color: '#F472B6',
    category: 'Correos corporativos',
    problem: 'La empresa usa correos gratuitos o sin dominio propio, sin control de cuentas por área.',
    included: ['Correos con dominio propio (@tuempresa.com)', 'Cuentas organizadas por área o puesto', 'Configuración SPF, DKIM y DMARC', 'Acceso desde cualquier dispositivo', 'Administración continua'],
    idealFor: ['Empresas que inician operaciones', 'Negocios que quieren imagen profesional', 'Equipos que necesitan correos por departamento'],
  },
  {
    icon: Wifi,
    title: 'Infraestructura de red empresarial',
    color: '#60A5FA',
    category: 'Redes e infraestructura',
    byScope: true,
    highlight: true,
    problem: 'La señal WiFi es inestable, no cubre todas las áreas o los dispositivos no mantienen conexión al moverse.',
    included: ['Diagnóstico de cobertura actual', 'Instalación de puntos de acceso o sistema mesh', 'Roaming automático entre puntos', 'Segmentación de red por área o tipo de dispositivo'],
    idealFor: ['Oficinas con múltiples espacios', 'Bodegas o plantas con amplia cobertura', 'Empresas con personal móvil interno'],
  },
  {
    icon: Monitor,
    title: 'Actualización de equipo de cómputo',
    color: '#FB923C',
    category: 'Equipos de cómputo',
    problem: 'Los equipos actuales son lentos, fallan con frecuencia o ya no dan el rendimiento necesario para el trabajo diario.',
    included: ['Diagnóstico de estado del equipo', 'Cambio de SSD o ampliación de RAM', 'Limpieza interna y mantenimiento', 'Optimización del sistema operativo', 'Entrega lista para operar'],
    idealFor: ['Empresas con equipos de 3–6 años de antigüedad', 'Equipos lentos que aún pueden aprovecharse', 'Presupuesto limitado para comprar equipos nuevos'],
  },
  {
    icon: ShoppingBag,
    title: 'Adquisición de equipos nuevos',
    color: '#FBBF24',
    category: 'Equipos de cómputo',
    problem: 'Se necesitan equipos nuevos configurados y listos para operar desde el primer día.',
    included: ['Selección por perfil de uso', 'Configuración completa desde cero', 'Instalación de software necesario', 'Descuentos por volumen en integración'],
    idealFor: ['Empresas que abren nuevas posiciones', 'Renovación de equipos por área', 'Compras de 2 o más equipos con configuración incluida'],
  },
  {
    icon: Globe,
    title: 'Desarrollo web corporativo',
    color: '#818CF8',
    category: 'Desarrollo web',
    problem: 'La empresa no tiene presencia en línea o su sitio web no transmite profesionalismo.',
    included: ['Diseño responsivo y moderno', 'Secciones de servicios, contacto y presentación', 'Formulario de contacto', 'Optimización para móviles', 'Entrega con acceso al panel'],
    idealFor: ['Empresas sin sitio web o con uno desactualizado', 'Negocios que quieren generar confianza en línea', 'Profesionales que buscan presencia digital clara'],
  },
  {
    icon: GitMerge,
    title: 'Integración de sistemas',
    color: '#34D399',
    category: 'Integración',
    byScope: true,
    problem: 'Hay herramientas o plataformas que no se comunican entre sí, generando trabajo manual.',
    included: ['Análisis de sistemas actuales', 'Conexión vía APIs o acceso a bases de datos', 'Automatización de flujos de datos', 'Validación y pruebas de integración'],
    idealFor: ['Empresas con múltiples plataformas desconectadas', 'Equipos que hacen trabajo manual automatizable', 'Negocios que quieren consolidar información'],
  },
]
</script>

<template>
  <section id="proyectos" class="relative py-24 overflow-hidden" style="background: var(--bg-base);">
    <div class="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
    <div class="orb w-[700px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
      style="background: var(--accent-glow);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Tipos de proyectos</span>
        <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl mb-5" style="color: var(--text-primary);">
          Proyectos que
          <span class="gradient-text block"> desarrollamos e implementamos</span>
        </h2>
        <p class="text-lg max-w-2xl mx-auto" style="color: var(--text-secondary);">
          Cada solución se adapta al contexto y necesidades específicas del cliente.
        </p>
      </div>

      <!-- Projects grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div
          v-for="(proj, i) in projects"
          :key="proj.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: (i % 3) * 100, duration: 650 } }"
          class="glass-card rounded-2xl p-6 group cursor-default flex flex-col relative overflow-hidden tilt-card"
        >
          <div v-if="proj.highlight" class="absolute inset-0 rounded-2xl pointer-events-none"
            :style="`background: linear-gradient(135deg, ${proj.color}08 0%, transparent 50%);`" />

          <!-- Category -->
          <div class="flex items-center gap-2 mb-4 flex-wrap">
            <span class="text-xs px-2 py-0.5 rounded-full font-medium"
              style="background: var(--bg-elevated); color: var(--text-muted); border: 1px solid var(--border-subtle);">
              {{ proj.category }}
            </span>
            <span v-if="proj.byScope" class="text-xs px-2 py-0.5 rounded-full font-medium"
              style="background: rgba(251,191,36,0.08); color: #FBBF24; border: 1px solid rgba(251,191,36,0.2);">
              Por alcance
            </span>
          </div>

          <!-- Icon + title -->
          <div class="flex items-start gap-3 mb-4">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              :style="`background: ${proj.color}15; border: 1px solid ${proj.color}35;`">
              <component :is="proj.icon" :size="22" :style="`color: ${proj.color}`" />
            </div>
            <h3 class="font-semibold text-base leading-snug mt-1" style="color: var(--text-primary);">{{ proj.title }}</h3>
          </div>

          <!-- Problem -->
          <div class="mb-4 p-3 rounded-xl" style="background: var(--bg-elevated); border: 1px solid var(--border-subtle);">
            <p class="text-xs font-semibold uppercase tracking-wider mb-1" style="color: var(--text-muted);">Problema que resuelve</p>
            <p class="text-xs leading-relaxed" style="color: var(--text-secondary);">{{ proj.problem }}</p>
          </div>

          <!-- Included -->
          <div class="mb-4 flex-1">
            <p class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--text-muted);">¿Qué incluye?</p>
            <ul class="space-y-1">
              <li v-for="item in proj.included" :key="item" class="flex items-start gap-1.5">
                <span class="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" :style="`background: ${proj.color};`" />
                <span class="text-xs leading-relaxed" style="color: var(--text-secondary);">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Ideal for -->
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--text-muted);">Ideal para</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="ideal in proj.idealFor" :key="ideal"
                class="text-xs px-2 py-0.5 rounded-full"
                :style="`background: ${proj.color}10; color: ${proj.color}; border: 1px solid ${proj.color}20;`">
                {{ ideal }}
              </span>
            </div>
          </div>

          <div class="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :style="`background: linear-gradient(90deg, transparent, ${proj.color}60, transparent);`" />
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center"
      >
        <p class="text-sm" style="color: var(--text-muted);">
          Cada proyecto se define según el alcance, condiciones y requerimientos específicos de cada empresa.
        </p>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
