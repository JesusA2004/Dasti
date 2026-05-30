<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Code2, Globe, Zap, Bot, Mail, Network, Wrench, Monitor, BarChart2,
  GitMerge, Printer, Wifi, Lightbulb, ShoppingBag, ArrowRight,
} from '@lucide/vue'

const router = useRouter()

const categories = [
  {
    number: '01',
    title: 'Desarrollo digital',
    desc: 'Software personalizado y presencia web para empresas que necesitan soluciones propias.',
    color: '#3B82F6',
    icon: Code2,
    services: [
      {
        icon: Code2, color: '#3B82F6',
        title: 'Desarrollo de software a medida',
        desc: 'Sistemas personalizados adaptados a la operación de tu empresa: control de información, gestión de usuarios, reportes automáticos y paneles administrativos.',
        included: ['Panel administrativo con roles y permisos', 'Módulos de carga y procesamiento de datos', 'Reportes automáticos y exportación', 'Integración con otras herramientas', 'Documentación técnica entregada'],
        idealFor: ['Empresas con procesos operativos propios', 'Equipos que quieren dejar de usar Excel para todo', 'Negocios que manejan información compleja'],
      },
      {
        icon: Globe, color: '#818CF8',
        title: 'Desarrollo web',
        desc: 'Sitios web modernos, responsivos y profesionales para transmitir confianza y facilitar el contacto con clientes.',
        included: ['Diseño responsivo para móvil y escritorio', 'Secciones de servicios, contacto y presentación', 'Formulario de contacto funcional', 'Panel de administración básico', 'Entrega optimizada para velocidad'],
        idealFor: ['Empresas sin presencia web', 'Negocios con sitio desactualizado', 'Profesionales que buscan imagen digital'],
      },
    ],
  },
  {
    number: '02',
    title: 'Comunicación empresarial',
    desc: 'Correo corporativo con dominio propio, seguridad avanzada y gestión continua.',
    color: '#F472B6',
    icon: Mail,
    services: [
      {
        icon: Mail, color: '#F472B6',
        title: 'Correos corporativos administrados',
        desc: 'Correos empresariales con dominio propio, seguridad técnica avanzada y soporte continuo.',
        included: ['Correos con dominio propio (@tuempresa.com)', 'Cuentas organizadas por área o puesto', 'Configuración SPF, DKIM y DMARC', 'Acceso desde cualquier dispositivo', 'Administración y soporte continuo'],
        idealFor: ['Empresas que usan correos gratuitos', 'Negocios que quieren imagen profesional', 'Equipos que necesitan control de cuentas por área'],
      },
    ],
  },
  {
    number: '03',
    title: 'Infraestructura y conectividad',
    desc: 'Redes estables, seguras y con cobertura total para tu espacio de trabajo.',
    color: '#60A5FA',
    icon: Wifi,
    services: [
      {
        icon: Wifi, color: '#60A5FA',
        title: 'Redes e infraestructura',
        desc: 'Diseñamos e implementamos redes empresariales con switches, routers y puntos de acceso para cobertura estable y segura.',
        included: ['Diagnóstico de red actual', 'Configuración de equipos de red', 'Segmentación por área o tipo de usuario', 'Documentación de red', 'Soporte posterior'],
        idealFor: ['Oficinas con conectividad inestable', 'Empresas que instalan nuevos espacios', 'Negocios que cambian de sede o amplían'],
      },
      {
        icon: Network, color: '#38BDF8',
        title: 'Sistemas mesh con roaming',
        desc: 'Sistemas mesh con roaming automático para cobertura WiFi total sin cambios manuales al moverse dentro de la empresa.',
        included: ['Instalación de puntos de acceso mesh', 'Configuración de roaming automático', 'Red unificada bajo un solo nombre', 'Cobertura en áreas difíciles', 'Puesta en marcha y pruebas'],
        idealFor: ['Empresas con múltiples espacios o plantas', 'Oficinas con zonas sin señal', 'Personal que se mueve frecuentemente'],
      },
    ],
  },
  {
    number: '04',
    title: 'Equipos y soporte técnico',
    desc: 'Equipos listos para operar, mantenimiento y soporte cuando lo necesitas.',
    color: '#FB923C',
    icon: Monitor,
    services: [
      {
        icon: Wrench, color: '#A78BFA',
        title: 'Soporte técnico',
        desc: 'Diagnóstico, mantenimiento preventivo, optimización y solución de fallas en equipos de cómputo, impresoras y sistemas.',
        included: ['Diagnóstico de hardware y software', 'Mantenimiento preventivo', 'Configuración de equipos y periféricos', 'Optimización de sistema operativo', 'Resolución de fallas'],
        idealFor: ['Equipos con rendimiento bajo', 'Mantenimiento preventivo periódico', 'Configuración de nuevos equipos'],
      },
      {
        icon: Monitor, color: '#FB923C',
        title: 'Actualización y mejora de equipos',
        desc: 'Mejoramos equipos existentes con SSD, RAM, limpieza interna y optimización del sistema para extender su vida útil.',
        included: ['Diagnóstico de estado del equipo', 'Cambio de SSD o ampliación de RAM', 'Limpieza interna y mantenimiento', 'Optimización del sistema operativo', 'Entrega lista para operar'],
        idealFor: ['Equipos de 3 a 6 años con rendimiento bajo', 'Presupuesto limitado para comprar nuevo', 'Equipos que aún pueden aprovecharse'],
      },
      {
        icon: ShoppingBag, color: '#FBBF24',
        title: 'Venta y suministro de equipos',
        desc: 'Selección, suministro y configuración completa de equipos nuevos según el perfil de uso de cada área.',
        included: ['Selección por perfil de uso', 'Configuración completa desde cero', 'Instalación de software necesario', 'Entrega lista para operar', 'Descuentos por volumen'],
        idealFor: ['Empresas que abren nuevas posiciones', 'Renovación de equipos por área', 'Compras de 2 o más equipos'],
      },
      {
        icon: Printer, color: '#2DD4BF',
        title: 'Impresoras y periféricos',
        desc: 'Suministro, instalación y configuración de impresoras y periféricos multimarca según las necesidades del cliente.',
        included: ['Cotización multimarca', 'Instalación y configuración básica', 'Configuración en red', 'Soporte y diagnóstico', 'Orientación técnica de selección'],
        idealFor: ['Empresas que necesitan impresoras en red', 'Cambio de equipos de impresión', 'Configuración de periféricos por área'],
      },
    ],
  },
  {
    number: '05',
    title: 'Automatización e integración',
    desc: 'Flujos automáticos, conexión de plataformas y asistentes digitales para optimizar operaciones.',
    color: '#34D399',
    icon: Zap,
    services: [
      {
        icon: Zap, color: '#34D399',
        title: 'Automatización de procesos',
        desc: 'Reducimos tareas repetitivas, generamos reportes automáticos y optimizamos flujos de trabajo para tu empresa.',
        included: ['Análisis de proceso actual', 'Diseño e implementación de automatización', 'Reportes y notificaciones automáticas', 'Pruebas y ajustes', 'Documentación entregada'],
        idealFor: ['Procesos manuales que consumen tiempo', 'Equipos que hacen tareas repetitivas', 'Reportes que deben generarse periódicamente'],
      },
      {
        icon: GitMerge, color: '#4ADE80',
        title: 'Integración de sistemas',
        desc: 'Conectamos herramientas, plataformas y bases de datos para que la información fluya entre áreas sin trabajo manual.',
        included: ['Análisis de sistemas actuales', 'Conexión vía APIs o bases de datos', 'Automatización de flujos de datos', 'Validación y pruebas', 'Documentación técnica'],
        idealFor: ['Múltiples plataformas desconectadas', 'Información duplicada entre sistemas', 'Negocios que quieren consolidar datos'],
      },
      {
        icon: Bot, color: '#FBBF24',
        title: 'Chatbots y asistentes digitales',
        desc: 'Chatbots para atención inicial, respuestas frecuentes, captación de prospectos y seguimiento en canales digitales.',
        included: ['Flujos de conversación personalizados', 'Integración con WhatsApp, web u otros canales', 'Captación y registro de datos', 'Integración con sistemas internos', 'Pruebas y ajustes'],
        idealFor: ['Alta demanda de atención inicial', 'Negocios que quieren captar leads automáticamente', 'Canales digitales con tráfico frecuente'],
      },
    ],
  },
  {
    number: '06',
    title: 'Asesoramiento y estrategia',
    desc: 'Orientación tecnológica clara para tomar mejores decisiones en TI sin compromiso de contratación.',
    color: '#E879F9',
    icon: Lightbulb,
    services: [
      {
        icon: Lightbulb, color: '#E879F9',
        title: 'Asesoramiento en TI',
        desc: 'Orientamos a empresas para tomar mejores decisiones tecnológicas: qué implementar, cómo estructurar la infraestructura y cómo planificar la inversión.',
        included: ['Diagnóstico de situación tecnológica actual', 'Identificación de necesidades y brechas', 'Propuesta de priorización', 'Orientación sobre proveedores y herramientas', 'Sin compromiso de contratación'],
        idealFor: ['Empresas que no saben por dónde empezar', 'Negocios con tecnología desorganizada', 'Directivos que toman decisiones en TI'],
      },
      {
        icon: BarChart2, color: '#2DD4BF',
        title: 'Presencia digital y redes sociales',
        desc: 'Apoyamos con estructura de comunicación digital, recursos para redes sociales y herramientas que mejoran la imagen de la empresa en línea.',
        included: ['Revisión de presencia digital actual', 'Estructura básica de comunicación', 'Recursos y plantillas digitales', 'Orientación sobre plataformas', 'Herramientas de apoyo'],
        idealFor: ['Empresas sin estrategia digital definida', 'Negocios que quieren mejorar su imagen online', 'Equipos que necesitan estructura de comunicación'],
      },
    ],
  },
]
</script>

<template>
  <div class="pt-18">

    <!-- Header -->
    <section class="relative py-20 overflow-hidden" style="background: linear-gradient(160deg, #020B18 0%, #0A1628 60%, #050D1A 100%);">
      <div class="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div class="orb w-[600px] h-[400px] top-0 right-0" style="background: rgba(37,99,235,0.06);" />
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          <span class="tag mb-4 inline-block">Servicios y soluciones</span>
          <h1 class="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span class="text-white">Soluciones integrales en</span>
            <span class="gradient-text block">Tecnologías de la Información</span>
          </h1>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto">
            Desarrollamos, implementamos y administramos soluciones en cada área de TI que necesita tu empresa.
          </p>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <div style="background: #060F1E;">
      <div
        v-for="(cat, ci) in categories"
        :key="cat.number"
        class="relative"
      >
        <!-- Category header -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
        >
          <div class="flex items-center gap-6">
            <span class="cat-number select-none hidden sm:block">{{ cat.number }}</span>
            <div class="flex items-start gap-4 flex-1">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                :style="`background: ${cat.color}15; border: 1px solid ${cat.color}30;`">
                <component :is="cat.icon" :size="22" :style="`color: ${cat.color}`" />
              </div>
              <div>
                <h2 class="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {{ cat.title }}
                </h2>
                <p class="text-slate-400 text-sm mt-1 max-w-xl">{{ cat.desc }}</p>
              </div>
            </div>
          </div>
          <div class="mt-6 hr-accent" />
        </div>

        <!-- Services grid for this category -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div
            :class="[
              'grid gap-5',
              cat.services.length === 1 ? 'lg:grid-cols-1 max-w-2xl' : 'lg:grid-cols-2',
            ]"
          >
            <div
              v-for="(svc, si) in cat.services"
              :key="svc.title"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { delay: si * 80, duration: 600 } }"
              class="glass-card rounded-2xl p-6 flex flex-col group shimmer-card"
            >
              <!-- Icon + title -->
              <div class="flex items-start gap-4 mb-4">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  :style="`background: ${svc.color}15; border: 1px solid ${svc.color}35;`">
                  <component :is="svc.icon" :size="20" :style="`color: ${svc.color}`" />
                </div>
                <div>
                  <h3 class="font-semibold text-white text-base leading-snug">{{ svc.title }}</h3>
                  <p class="text-sm text-slate-400 mt-1 leading-relaxed">{{ svc.desc }}</p>
                </div>
              </div>

              <!-- Included -->
              <div class="mb-4 flex-1">
                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">¿Qué incluye?</p>
                <ul class="space-y-1.5">
                  <li v-for="item in svc.included" :key="item" class="flex items-start gap-2">
                    <span class="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" :style="`background: ${svc.color};`" />
                    <span class="text-xs text-slate-400">{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Ideal for -->
              <div class="mb-5">
                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ideal para</p>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="ideal in svc.idealFor" :key="ideal"
                    class="text-xs px-2 py-0.5 rounded-full"
                    :style="`background: ${svc.color}10; color: ${svc.color}; border: 1px solid ${svc.color}20;`">
                    {{ ideal }}
                  </span>
                </div>
              </div>

              <!-- CTAs -->
              <div class="flex gap-3 flex-wrap">
                <button
                  @click="router.push('/contacto')"
                  class="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
                  :style="`background: ${svc.color}15; color: ${svc.color}; border: 1px solid ${svc.color}30;`"
                >
                  Solicitar asesoría
                  <ArrowRight :size="12" />
                </button>
                <button
                  @click="router.push('/cotizador')"
                  class="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
                  style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
                >
                  Estimar inversión
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Category separator (not last) -->
        <div v-if="ci < categories.length - 1" class="section-line max-w-7xl mx-auto" />
      </div>
    </div>

  </div>
</template>
