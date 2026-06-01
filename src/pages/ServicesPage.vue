<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Code2, Globe, Zap, Bot, Mail, Network, Wrench, Monitor, BarChart2,
  GitMerge, Printer, Wifi, Lightbulb, ShoppingBag, ArrowRight, ChevronDown,
} from '@lucide/vue'
import AnimatedParticles from '@/components/AnimatedParticles.vue'

const router = useRouter()

const heroCategories = [
  { icon: Code2,     label: 'Software',       color: '#3B82F6', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80', target: '01' },
  { icon: Mail,      label: 'Correos',         color: '#F472B6', image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=900&auto=format&fit=crop&q=80', target: '02' },
  { icon: Wifi,      label: 'Redes',           color: '#60A5FA', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80', target: '03' },
  { icon: Monitor,   label: 'Equipos',         color: '#FB923C', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80', target: '04' },
  { icon: Zap,       label: 'Automatización',  color: '#34D399', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80', target: '05' },
  { icon: Lightbulb, label: 'Asesoría',        color: '#E879F9', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=80', target: '06' },
]

const heroActive = ref(0)
const scrollToCategory = (number: string) => {
  document.getElementById(`cat-${number}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Track expanded service detail
const expandedSvc = ref<string | null>(null)
const toggleExpand = (title: string) => {
  expandedSvc.value = expandedSvc.value === title ? null : title
}

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
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80',
        title: 'Desarrollo de software a medida',
        desc: 'Sistemas propios: control de información, gestión de usuarios, reportes automáticos y paneles administrativos adaptados a tu operación.',
        included: ['Panel administrativo con roles y permisos', 'Módulos de carga y procesamiento de datos', 'Reportes automáticos y exportación', 'Integración con otras herramientas', 'Documentación técnica entregada'],
        idealFor: ['Empresas con procesos operativos propios', 'Equipos que quieren dejar de usar Excel para todo', 'Negocios que manejan información compleja'],
      },
      {
        icon: Globe, color: '#818CF8',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&auto=format&fit=crop&q=80',
        title: 'Desarrollo web',
        desc: 'Sitios web modernos, responsivos y profesionales que transmiten confianza y facilitan el contacto con clientes.',
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
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=700&auto=format&fit=crop&q=80',
        title: 'Correos corporativos administrados',
        desc: 'Correos con tu propio dominio, organizados por área, con seguridad técnica avanzada y administración continua.',
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
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80',
        title: 'Redes e infraestructura',
        desc: 'Redes empresariales con switches, routers y puntos de acceso para cobertura estable y segura en todo tu espacio.',
        included: ['Diagnóstico de red actual', 'Configuración de equipos de red', 'Segmentación por área o tipo de usuario', 'Documentación de red', 'Soporte posterior'],
        idealFor: ['Oficinas con conectividad inestable', 'Empresas que instalan nuevos espacios', 'Negocios que cambian de sede o amplían'],
      },
      {
        icon: Network, color: '#38BDF8',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&auto=format&fit=crop&q=80',
        title: 'Sistemas mesh con roaming',
        desc: 'WiFi de cobertura total con roaming automático. Sin puntos muertos, sin desconexiones al moverse dentro del espacio.',
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
        image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=700&auto=format&fit=crop&q=80',
        title: 'Soporte técnico',
        desc: 'Diagnóstico, mantenimiento preventivo, optimización y resolución de fallas en equipos, impresoras y sistemas.',
        included: ['Diagnóstico de hardware y software', 'Mantenimiento preventivo', 'Configuración de equipos y periféricos', 'Optimización de sistema operativo', 'Resolución de fallas'],
        idealFor: ['Equipos con rendimiento bajo', 'Mantenimiento preventivo periódico', 'Configuración de nuevos equipos'],
      },
      {
        icon: Monitor, color: '#FB923C',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&auto=format&fit=crop&q=80',
        title: 'Actualización y mejora de equipos',
        desc: 'Mejoramos equipos con SSD, RAM y optimización del sistema para extender su vida útil a una fracción del costo de uno nuevo.',
        included: ['Diagnóstico de estado del equipo', 'Cambio de SSD o ampliación de RAM', 'Limpieza interna y mantenimiento', 'Optimización del sistema operativo', 'Entrega lista para operar'],
        idealFor: ['Equipos de 3 a 6 años con rendimiento bajo', 'Presupuesto limitado', 'Equipos que aún pueden aprovecharse'],
      },
      {
        icon: ShoppingBag, color: '#FBBF24',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&auto=format&fit=crop&q=80',
        title: 'Venta y suministro de equipos',
        desc: 'Selección, suministro y configuración completa de equipos nuevos según el perfil de uso de cada área.',
        included: ['Selección por perfil de uso', 'Configuración completa desde cero', 'Instalación de software necesario', 'Entrega lista para operar', 'Descuentos por volumen'],
        idealFor: ['Empresas que abren nuevas posiciones', 'Renovación de equipos por área', 'Compras de 2 o más equipos'],
      },
      {
        icon: Printer, color: '#2DD4BF',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=700&auto=format&fit=crop&q=80',
        title: 'Impresoras y periféricos',
        desc: 'Suministro, instalación y configuración de impresoras y periféricos multimarca en red para toda la empresa.',
        included: ['Cotización multimarca', 'Instalación y configuración básica', 'Configuración en red', 'Soporte y diagnóstico', 'Orientación técnica'],
        idealFor: ['Empresas que necesitan impresoras en red', 'Cambio de equipos de impresión', 'Configuración de periféricos por área'],
      },
    ],
  },
  {
    number: '05',
    title: 'Automatización e integración',
    desc: 'Flujos automáticos, conexión de plataformas y asistentes digitales.',
    color: '#34D399',
    icon: Zap,
    services: [
      {
        icon: Zap, color: '#34D399',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80',
        title: 'Automatización de procesos',
        desc: 'Reducimos tareas repetitivas, generamos reportes automáticos y optimizamos flujos de trabajo internos.',
        included: ['Análisis de proceso actual', 'Diseño e implementación de automatización', 'Reportes y notificaciones automáticas', 'Pruebas y ajustes', 'Documentación entregada'],
        idealFor: ['Procesos manuales que consumen tiempo', 'Equipos con tareas repetitivas', 'Reportes periódicos automáticos'],
      },
      {
        icon: GitMerge, color: '#4ADE80',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&auto=format&fit=crop&q=80',
        title: 'Integración de sistemas',
        desc: 'Conectamos plataformas y bases de datos para que la información fluya entre áreas sin trabajo manual.',
        included: ['Análisis de sistemas actuales', 'Conexión vía APIs o bases de datos', 'Automatización de flujos de datos', 'Validación y pruebas', 'Documentación técnica'],
        idealFor: ['Múltiples plataformas desconectadas', 'Información duplicada entre sistemas', 'Consolidación de datos'],
      },
      {
        icon: Bot, color: '#FBBF24',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=700&auto=format&fit=crop&q=80',
        title: 'Chatbots y asistentes digitales',
        desc: 'Chatbots para atención inicial, respuestas frecuentes, captación de prospectos y seguimiento automatizado.',
        included: ['Flujos de conversación personalizados', 'Integración con WhatsApp, web u otros canales', 'Captación y registro de datos', 'Integración con sistemas internos', 'Pruebas y ajustes'],
        idealFor: ['Alta demanda de atención inicial', 'Captación automática de leads', 'Canales digitales con tráfico frecuente'],
      },
    ],
  },
  {
    number: '06',
    title: 'Asesoramiento y estrategia',
    desc: 'Orientación tecnológica clara para tomar mejores decisiones en TI.',
    color: '#E879F9',
    icon: Lightbulb,
    services: [
      {
        icon: Lightbulb, color: '#E879F9',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80',
        title: 'Asesoramiento en TI',
        desc: 'Orientación para tomar mejores decisiones tecnológicas: qué implementar, cómo estructurar la infraestructura y cómo planificar la inversión.',
        included: ['Diagnóstico de situación tecnológica actual', 'Identificación de necesidades y brechas', 'Propuesta de priorización', 'Orientación sobre proveedores y herramientas', 'Sin compromiso de contratación'],
        idealFor: ['Empresas que no saben por dónde empezar', 'Tecnología desorganizada', 'Directivos que toman decisiones en TI'],
      },
      {
        icon: BarChart2, color: '#2DD4BF',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&auto=format&fit=crop&q=80',
        title: 'Presencia digital y redes sociales',
        desc: 'Estructura de comunicación digital, recursos para redes sociales y herramientas para mejorar la imagen en línea.',
        included: ['Revisión de presencia digital actual', 'Estructura básica de comunicación', 'Recursos y plantillas digitales', 'Orientación sobre plataformas', 'Herramientas de apoyo'],
        idealFor: ['Empresas sin estrategia digital', 'Negocios que quieren mejorar imagen online', 'Equipos que necesitan estructura de comunicación'],
      },
    ],
  },
]
</script>

<template>
  <div class="pt-18">

    <!-- ──────────────────────────────────────────────
         HERO: Image + category selector
    ────────────────────────────────────────────── -->
    <section class="relative overflow-hidden" style="background: var(--bg-base);">
      <!-- Full-width image area -->
      <div class="relative h-72 sm:h-80 overflow-hidden">
        <Transition
          enter-active-class="transition-all duration-700 ease-out"
          enter-from-class="opacity-0 scale-[1.04]"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-400"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <img
            :key="heroActive"
            :src="heroCategories[heroActive].image"
            :alt="`Servicios de ${heroCategories[heroActive].label} - DASTI soluciones en TI`"
            class="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </Transition>
        <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(0,0,0,0.25), var(--bg-base) 88%);" />
        <div class="absolute inset-0" style="background: linear-gradient(to right, var(--bg-base) 0%, transparent 18%, transparent 82%, var(--bg-base) 100%);" />
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-8">
          <span class="tag mb-3">Servicios y soluciones</span>
          <h1 class="display-text text-3xl sm:text-4xl lg:text-5xl" style="color: var(--text-primary);">
            Servicios en
            <span class="gradient-text block"> Tecnologías de la Información</span>
          </h1>
        </div>
      </div>

      <!-- Category quick-selector -->
      <div class="relative py-7" style="background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle);">
        <AnimatedParticles density="low" variant="minimal" size="sm" :opacity="0.35" speed="slow" />
        <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p class="text-center text-xs font-medium mb-4" style="color: var(--text-muted);">
            Selecciona el área que quieres mejorar para ver los servicios relacionados
          </p>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <button
              v-for="(cat, i) in heroCategories"
              :key="cat.label"
              @click="heroActive = i; scrollToCategory(cat.target)"
              @mouseenter="heroActive = i"
              class="group flex flex-col items-center gap-2 p-3.5 rounded-xl transition-all duration-250"
              :style="`
                background: ${heroActive === i ? cat.color + '14' : 'var(--bg-card)'};
                border: 1.5px solid ${heroActive === i ? cat.color + '45' : 'var(--border-subtle)'};
                transform: ${heroActive === i ? 'translateY(-3px)' : 'translateY(0)'};
              `"
            >
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                :style="`background: ${cat.color}15; border: 1px solid ${cat.color}28;`"
              >
                <component :is="cat.icon" :size="17" :style="`color: ${cat.color};`" />
              </div>
              <span class="text-xs font-semibold" style="color: var(--text-primary);">{{ cat.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────
         SERVICE CATEGORIES
    ────────────────────────────────────────────── -->
    <div style="background: var(--bg-base);">
      <div
        v-for="(cat, ci) in categories"
        :key="cat.number"
        :id="`cat-${cat.number}`"
        class="relative"
        style="scroll-margin-top: 90px;"
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
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                :style="`background: ${cat.color}15; border: 1px solid ${cat.color}30;`"
              >
                <component :is="cat.icon" :size="22" :style="`color: ${cat.color}`" />
              </div>
              <div>
                <h2 class="font-display text-2xl sm:text-3xl font-bold leading-tight" style="color: var(--text-primary);">
                  {{ cat.title }}
                </h2>
                <p class="text-sm mt-1 max-w-xl" style="color: var(--text-secondary);">{{ cat.desc }}</p>
              </div>
            </div>
          </div>
          <div class="mt-6 hr-accent" />
        </div>

        <!-- Service cards grid with images -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div
            :class="[
              'grid gap-6',
              cat.services.length === 1 ? 'lg:grid-cols-1 max-w-3xl' : 'lg:grid-cols-2',
            ]"
          >
            <div
              v-for="(svc, si) in cat.services"
              :key="svc.title"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { delay: si * 90, duration: 600 } }"
              class="group glass-card rounded-2xl overflow-hidden flex flex-col"
              style="transition: box-shadow 0.3s ease, transform 0.3s ease;"
              @mouseenter="($event.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; ($event.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'"
              @mouseleave="($event.currentTarget as HTMLElement).style.transform = 'translateY(0)'; ($event.currentTarget as HTMLElement).style.boxShadow = ''"
            >
              <!-- Service image — prominent at top -->
              <div class="relative overflow-hidden" style="aspect-ratio: 16/7; flex-shrink: 0;">
                <img
                  :src="svc.image"
                  :alt="`${svc.title} - DASTI servicios en TI`"
                  class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <!-- Overlay -->
                <div
                  class="absolute inset-0"
                  :style="`background: linear-gradient(135deg, ${svc.color}22 0%, transparent 55%, rgba(0,0,0,0.2) 100%);`"
                />
                <!-- Category badge -->
                <div class="absolute top-3 left-3">
                  <div
                    class="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
                    :style="`background: ${svc.color}20; border: 1px solid ${svc.color}40;`"
                  >
                    <component :is="svc.icon" :size="11" :style="`color: ${svc.color};`" />
                    <span class="text-xs font-semibold" :style="`color: ${svc.color};`">
                      {{ cat.title }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Card body -->
              <div class="p-6 flex flex-col flex-1">
                <!-- Icon + title -->
                <div class="flex items-start gap-3 mb-3">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                    :style="`background: ${svc.color}15; border: 1px solid ${svc.color}30;`"
                  >
                    <component :is="svc.icon" :size="18" :style="`color: ${svc.color}`" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-base leading-snug" style="color: var(--text-primary);">{{ svc.title }}</h3>
                    <p class="text-sm mt-1 leading-relaxed" style="color: var(--text-secondary);">{{ svc.desc }}</p>
                  </div>
                </div>

                <!-- Expandable detail section -->
                <div class="flex-1">
                  <button
                    class="flex items-center gap-2 text-xs font-medium mt-2 mb-3 transition-colors"
                    :style="`color: ${svc.color};`"
                    @click="toggleExpand(svc.title)"
                  >
                    <span>{{ expandedSvc === svc.title ? 'Ocultar detalles' : 'Ver qué incluye' }}</span>
                    <ChevronDown
                      :size="13"
                      :class="['transition-transform duration-300', expandedSvc === svc.title ? 'rotate-180' : '']"
                    />
                  </button>

                  <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200"
                    leave-to-class="opacity-0"
                  >
                    <div v-if="expandedSvc === svc.title">
                      <!-- Included -->
                      <div class="mb-3">
                        <p class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--text-muted);">¿Qué incluye?</p>
                        <ul class="space-y-1.5">
                          <li v-for="item in svc.included" :key="item" class="flex items-start gap-2">
                            <span class="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" :style="`background: ${svc.color};`" />
                            <span class="text-xs" style="color: var(--text-secondary);">{{ item }}</span>
                          </li>
                        </ul>
                      </div>
                      <!-- Ideal for -->
                      <div>
                        <p class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--text-muted);">Ideal para</p>
                        <div class="flex flex-wrap gap-1.5">
                          <span
                            v-for="ideal in svc.idealFor"
                            :key="ideal"
                            class="text-xs px-2 py-0.5 rounded-full"
                            :style="`background: ${svc.color}10; color: ${svc.color}; border: 1px solid ${svc.color}20;`"
                          >{{ ideal }}</span>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>

                <!-- CTAs -->
                <div class="flex gap-2 pt-4 mt-auto border-t" style="border-color: var(--border-subtle);">
                  <button
                    @click="router.push('/contacto')"
                    :aria-label="`Solicitar asesoría sobre ${svc.title}`"
                    class="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all duration-200"
                    :style="`background: ${svc.color}14; color: ${svc.color}; border: 1px solid ${svc.color}28;`"
                    @mouseenter="($event.target as HTMLElement).style.background = svc.color + '22'"
                    @mouseleave="($event.target as HTMLElement).style.background = svc.color + '14'"
                  >
                    Solicitar asesoría
                    <ArrowRight :size="11" />
                  </button>
                  <button
                    @click="router.push('/cotizador')"
                    :aria-label="`Cotizar ${svc.title}`"
                    class="flex items-center gap-1.5 text-xs font-medium px-3 py-2.5 rounded-xl transition-all duration-200"
                    style="background: var(--bg-elevated); color: var(--text-muted); border: 1px solid var(--border-subtle);"
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Category separator -->
        <div v-if="ci < categories.length - 1" class="section-line max-w-7xl mx-auto" />
      </div>
    </div>

  </div>
</template>
