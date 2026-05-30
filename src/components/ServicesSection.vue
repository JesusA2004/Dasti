<script setup lang="ts">
import { Code2, Globe, Zap, Bot, Mail, Network, Wrench, Monitor, BarChart2 } from '@lucide/vue'

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

const services = [
  {
    icon: Code2,
    title: 'Desarrollo de software a la medida',
    desc: 'Sistemas personalizados para controlar procesos, administrar información, generar reportes, automatizar tareas y mejorar la operación interna de tu empresa.',
    color: '#3B82F6',
    tags: ['Sistemas', 'Reportes', 'Paneles administrativos'],
  },
  {
    icon: Globe,
    title: 'Desarrollo web',
    desc: 'Sitios rápidos, modernos y responsivos para mostrar tu empresa, servicios y captar prospectos. Diseño profesional adaptado a tu identidad.',
    color: '#818CF8',
    tags: ['Landing page', 'Sitio corporativo', 'Diseño responsivo'],
  },
  {
    icon: Zap,
    title: 'Automatización de procesos',
    desc: 'Automatizamos tareas repetitivas, flujos internos, reportes, capturas y notificaciones para ahorrar tiempo y reducir errores operativos.',
    color: '#34D399',
    tags: ['Flujos de trabajo', 'Reportes automáticos', 'Notificaciones'],
  },
  {
    icon: Bot,
    title: 'Chatbots y asistentes digitales',
    desc: 'Asistentes digitales para atención inicial, preguntas frecuentes, captación de datos y seguimiento de prospectos en canales digitales.',
    color: '#FBBF24',
    tags: ['Atención al cliente', 'Captación de prospectos', 'Canales digitales'],
  },
  {
    icon: Mail,
    title: 'Correo empresarial administrado',
    desc: 'Cuentas con dominio propio, administración de usuarios, configuración técnica, seguridad del dominio y soporte continuo.',
    color: '#F472B6',
    tags: ['Dominio propio', 'Cuentas por área', 'Seguridad'],
  },
  {
    icon: Network,
    title: 'Redes e infraestructura',
    desc: 'Configuración de redes, conectividad, impresoras, accesos compartidos y apoyo en infraestructura tecnológica para mejorar tu operación.',
    color: '#60A5FA',
    tags: ['Conectividad', 'Infraestructura', 'Seguridad de red'],
  },
  {
    icon: Wrench,
    title: 'Soporte técnico y mantenimiento',
    desc: 'Diagnóstico, mantenimiento preventivo, instalación de software autorizado, optimización y configuración de equipos de cómputo.',
    color: '#A78BFA',
    tags: ['Diagnóstico', 'Mantenimiento preventivo', 'Optimización'],
  },
  {
    icon: Monitor,
    title: 'Actualización y adquisición de equipo',
    desc: 'Evaluamos si conviene actualizar o adquirir equipos nuevos y los entregamos configurados y listos para trabajar según el perfil de uso.',
    color: '#FB923C',
    tags: ['Oficina', 'Multitarea', 'Alto rendimiento'],
  },
  {
    icon: BarChart2,
    title: 'Marketing digital y presencia en redes',
    desc: 'Apoyo en soluciones digitales para mejorar presencia en línea, estructura de comunicación y herramientas tecnológicas para redes sociales.',
    color: '#2DD4BF',
    tags: ['Presencia digital', 'Comunicación', 'Herramientas'],
  },
]
</script>

<template>
  <section id="servicios" class="relative py-24 overflow-hidden" style="background: #060F1E;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style="background: rgba(37,99,235,0.04);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Nuestros servicios</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Soluciones tecnológicas</span>
          <span class="gradient-text block">para tu empresa</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Ofrecemos un portafolio completo de servicios de TI para cubrir todas las necesidades operativas,
          digitales e infraestructurales de tu negocio.
        </p>
      </div>

      <!-- Services grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: (i % 3) * 100, duration: 600 } }"
          class="glass-card service-card rounded-2xl p-6 group cursor-default"
        >
          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
            :style="`background: ${service.color}15; border: 1px solid ${service.color}35;`">
            <component :is="service.icon" :size="24" :style="`color: ${service.color}`" />
          </div>

          <!-- Content -->
          <h3 class="font-semibold text-white text-lg mb-3 leading-snug">{{ service.title }}</h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">{{ service.desc }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in service.tags"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-full"
              :style="`background: ${service.color}12; color: ${service.color}; border: 1px solid ${service.color}25;`"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Hover glow line -->
          <div class="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            :style="`background: linear-gradient(90deg, transparent, ${service.color}50, transparent);`" />
        </div>
      </div>

      <!-- CTA row -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mt-14"
      >
        <p class="text-slate-400 mb-5">¿Tienes un proyecto en mente? Calcula el costo aproximado.</p>
        <button
          @click="scrollTo('#cotizador')"
          class="btn-primary"
        >
          Calcular costo aproximado
        </button>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
