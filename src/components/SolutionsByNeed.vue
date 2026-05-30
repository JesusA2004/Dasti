<script setup lang="ts">
import { Mail, Globe, Zap, Monitor, Database, Users2, ShieldCheck, Wifi, GitMerge, Printer, ArrowRight } from '@lucide/vue'

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

const needs = [
  {
    icon: Mail,
    problem: 'Necesito correos corporativos para mi equipo',
    solution: 'Correos corporativos administrados',
    desc: 'Implementamos y administramos cuentas con dominio propio, configuración técnica, acceso desde cualquier dispositivo y soporte.',
    color: '#F472B6',
    href: '#servicios',
  },
  {
    icon: Wifi,
    problem: 'Mi red WiFi no cubre toda la oficina',
    solution: 'Redes y sistemas mesh',
    desc: 'Implementamos sistemas mesh para distribuir la señal de forma inteligente en toda tu empresa con roaming automático entre puntos.',
    color: '#60A5FA',
    href: '#servicios',
  },
  {
    icon: Monitor,
    problem: 'Mis equipos están lentos o fallando',
    solution: 'Soporte técnico y mantenimiento',
    desc: 'Realizamos diagnóstico, mantenimiento preventivo y optimización para recuperar el rendimiento de los equipos sin reemplazarlos innecesariamente.',
    color: '#FB923C',
    href: '#servicios',
  },
  {
    icon: Monitor,
    problem: 'Necesito comprar computadoras nuevas',
    solution: 'Adquisición de equipos configurados',
    desc: 'Seleccionamos, adquirimos, configuramos y entregamos equipos listos para operar según el perfil de uso de cada área.',
    color: '#A78BFA',
    href: '#servicios',
  },
  {
    icon: Globe,
    problem: 'Quiero una página web profesional',
    solution: 'Desarrollo web corporativo',
    desc: 'Desarrollamos sitios modernos, responsivos y optimizados para transmitir confianza y facilitar el contacto con tus clientes.',
    color: '#818CF8',
    href: '#servicios',
  },
  {
    icon: Database,
    problem: 'Necesito un sistema a medida',
    solution: 'Software a medida',
    desc: 'Desarrollamos sistemas para administrar información, controlar procesos, gestionar usuarios y generar reportes adaptados a tu operación.',
    color: '#3B82F6',
    href: '#servicios',
  },
  {
    icon: Zap,
    problem: 'Quiero automatizar reportes o procesos',
    solution: 'Automatización de procesos',
    desc: 'Eliminamos tareas repetitivas y automatizamos flujos, reportes y notificaciones para ahorrar tiempo y reducir errores.',
    color: '#34D399',
    href: '#servicios',
  },
  {
    icon: GitMerge,
    problem: 'Necesito integrar herramientas o sistemas',
    solution: 'Integración de sistemas',
    desc: 'Conectamos plataformas, APIs, bases de datos, formularios y herramientas para que la información fluya entre áreas sin trabajo manual.',
    color: '#2DD4BF',
    href: '#servicios',
  },
  {
    icon: Printer,
    problem: 'Busco proveedor de impresoras o periféricos',
    solution: 'Impresoras y periféricos multimarca',
    desc: 'Apoyamos en la selección, suministro y configuración de impresoras y periféricos multimarca según las necesidades de cada área.',
    color: '#FBBF24',
    href: '#servicios',
  },
  {
    icon: Users2,
    problem: 'Necesito mejorar mi presencia digital',
    solution: 'Presencia digital y redes sociales',
    desc: 'Apoyamos con estructura de comunicación, herramientas digitales y recursos para mejorar la imagen de la empresa en línea.',
    color: '#F472B6',
    href: '#servicios',
  },
]
</script>

<template>
  <section class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[600px] h-[400px] bottom-0 right-0"
      style="background: rgba(129,140,248,0.04);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Soluciones por área</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Soluciones para cada necesidad</span>
          <span class="gradient-text block">de tu empresa</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Identifica la situación que describe mejor tu empresa y encuentra la solución tecnológica adecuada.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="(item, i) in needs"
          :key="item.problem"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: (i % 5) * 70, duration: 600 } }"
          class="glass-card rounded-2xl p-5 group cursor-default flex flex-col"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            :style="`background: ${item.color}12; border: 1px solid ${item.color}30;`">
            <component :is="item.icon" :size="20" :style="`color: ${item.color}`" />
          </div>

          <p class="text-sm font-semibold text-white mb-2 leading-snug">{{ item.problem }}</p>

          <div class="mb-3">
            <span class="text-xs px-2 py-0.5 rounded-full font-medium"
              :style="`background: ${item.color}15; color: ${item.color}; border: 1px solid ${item.color}25;`">
              {{ item.solution }}
            </span>
          </div>

          <p class="text-xs text-slate-400 leading-relaxed flex-1">{{ item.desc }}</p>

          <a
            :href="item.href"
            @click.prevent="scrollTo(item.href)"
            class="mt-4 flex items-center gap-1 text-xs font-medium transition-colors duration-200"
            :style="`color: ${item.color};`"
          >
            Ver solución
            <ArrowRight :size="12" class="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
