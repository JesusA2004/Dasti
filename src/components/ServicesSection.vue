<script setup lang="ts">
import { Code2, Globe, Zap, Bot, Mail, Network, Wrench, Monitor, BarChart2, GitMerge, Printer, Wifi, Lightbulb } from '@lucide/vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const services = [
  {
    icon: Code2,
    title: 'Desarrollo de software a medida',
    desc: 'Desarrollamos sistemas personalizados para administrar información, controlar procesos, generar reportes, automatizar tareas y mejorar la operación interna de la empresa.',
    color: '#3B82F6',
    tags: ['Paneles administrativos', 'Reportes', 'Control de usuarios', 'Integración'],
  },
  {
    icon: Globe,
    title: 'Desarrollo web',
    desc: 'Desarrollamos sitios web modernos, responsivos y profesionales para presentar empresas, servicios y proyectos. El objetivo es transmitir confianza y facilitar el contacto con clientes.',
    color: '#818CF8',
    tags: ['Landing pages', 'Sitios corporativos', 'Formularios', 'Móvil optimizado'],
  },
  {
    icon: Mail,
    title: 'Correos corporativos administrados',
    desc: 'Implementamos y administramos correos empresariales con dominio propio, cuentas por área, configuración técnica, seguridad del dominio y soporte continuo.',
    color: '#F472B6',
    tags: ['Dominio propio', 'Outlook y webmail', 'SPF / DKIM / DMARC', 'Administración'],
  },
  {
    icon: Wifi,
    title: 'Infraestructura de red y sistemas mesh',
    desc: 'Diseñamos e implementamos redes empresariales con puntos de acceso, sistemas mesh y roaming para ofrecer cobertura WiFi estable en toda la empresa sin cambios manuales de red.',
    color: '#60A5FA',
    tags: ['Sistemas mesh', 'Roaming', 'Cobertura total', 'Segmentación de red'],
    highlight: true,
  },
  {
    icon: Wrench,
    title: 'Soporte técnico y mantenimiento',
    desc: 'Brindamos soporte para equipos de cómputo: configuración, diagnóstico, optimización, instalación de software autorizado, mantenimiento preventivo y solución de fallas.',
    color: '#A78BFA',
    tags: ['Diagnóstico', 'Mantenimiento preventivo', 'Optimización', 'Configuración'],
  },
  {
    icon: Monitor,
    title: 'Actualización y adquisición de equipos',
    desc: 'Evaluamos si conviene actualizar un equipo existente con SSD, RAM u optimización, o adquirir uno nuevo. Entregamos equipos configurados desde cero y listos para operar.',
    color: '#FB923C',
    tags: ['Actualización', 'Equipos nuevos', 'Configuración incluida', 'Por perfil de uso'],
  },
  {
    icon: Printer,
    title: 'Impresoras y periféricos',
    desc: 'Apoyamos en la selección, suministro y configuración de impresoras y periféricos multimarca según las necesidades del cliente. Disponibilidad sujeta a marca y modelo.',
    color: '#2DD4BF',
    tags: ['Multimarca', 'Configuración en red', 'Soporte', 'Selección técnica'],
  },
  {
    icon: GitMerge,
    title: 'Integración de sistemas',
    desc: 'Integramos sistemas, plataformas y herramientas para que la información fluya mejor entre áreas y procesos: formularios, bases de datos, APIs, reportes y plataformas internas.',
    color: '#34D399',
    tags: ['APIs', 'Bases de datos', 'Automatización de flujos', 'Plataformas internas'],
  },
  {
    icon: Zap,
    title: 'Automatización de procesos',
    desc: 'Implementamos automatizaciones para reducir tareas repetitivas, mejorar flujos internos, generar reportes, enviar notificaciones y conectar herramientas de trabajo.',
    color: '#FBBF24',
    tags: ['Reportes automáticos', 'Notificaciones', 'Flujos de trabajo', 'Reducción de errores'],
  },
  {
    icon: Bot,
    title: 'Chatbots y asistentes digitales',
    desc: 'Implementamos chatbots y asistentes digitales para atención inicial, respuestas frecuentes, captación de prospectos y seguimiento básico en canales digitales.',
    color: '#FB923C',
    tags: ['Atención 24h', 'Captación de datos', 'Integración con sistemas', 'Canales digitales'],
  },
  {
    icon: BarChart2,
    title: 'Presencia digital y redes sociales',
    desc: 'Apoyamos con presencia digital, estructura de comunicación, recursos para redes sociales y herramientas que ayudan a mejorar la imagen de la empresa en línea.',
    color: '#2DD4BF',
    tags: ['Imagen corporativa', 'Estructura digital', 'Herramientas', 'Comunicación'],
  },
  {
    icon: Network,
    title: 'Configuración de impresoras y recursos',
    desc: 'Configuramos impresoras en red, carpetas compartidas, accesos por área y dispositivos periféricos para que los equipos de trabajo los utilicen correctamente desde el inicio.',
    color: '#93C5FD',
    tags: ['Impresoras en red', 'Accesos compartidos', 'Configuración de área', 'Dispositivos'],
  },
  {
    icon: Lightbulb,
    title: 'Asesoramiento tecnológico',
    desc: 'Orientamos a empresas para tomar mejores decisiones en TI: qué herramientas implementar, cómo estructurar la infraestructura tecnológica, qué priorizar y cómo planificar la inversión.',
    color: '#E879F9',
    tags: ['Diagnóstico TI', 'Priorización', 'Estrategia tecnológica', 'Sin compromiso'],
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
        <span class="tag mb-4 inline-block">Servicios y soluciones</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Soluciones integrales en</span>
          <span class="gradient-text block">Tecnologías de la Información</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Desarrollamos, implementamos y administramos soluciones en cada área de TI que necesita tu empresa,
          desde software y redes hasta equipos y automatización.
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
          class="glass-card service-card rounded-2xl p-6 group cursor-default relative overflow-hidden"
        >
          <!-- Highlight glow for mesh -->
          <div v-if="service.highlight" class="absolute inset-0 rounded-2xl pointer-events-none"
            style="background: linear-gradient(135deg, rgba(96,165,250,0.05) 0%, transparent 60%);" />

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

          <!-- Bottom glow on hover -->
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
        <p class="text-slate-400 mb-5">¿Necesitas una solución en TI para tu empresa?</p>
        <button @click="router.push('/cotizador')" class="btn-primary">
          Estimar inversión
        </button>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
