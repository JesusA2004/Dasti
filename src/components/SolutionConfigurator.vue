<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, MessageCircle, Code2, Wifi, Mail, Monitor, Zap, Lightbulb, Wrench, ChevronRight } from '@lucide/vue'
import AnimatedParticles from '@/components/AnimatedParticles.vue'

const router = useRouter()
const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLElement>()
let rafId = 0

const categories = [
  {
    id: 'software',
    icon: Code2,
    color: '#3B82F6',
    label: 'Software',
    title: 'Desarrollo de software a medida',
    desc: 'Creamos sistemas propios, paneles administrativos y plataformas web adaptadas exactamente a tus procesos y necesidades de negocio.',
    services: ['Sistemas y paneles a medida', 'Plataformas web corporativas', 'Landing pages profesionales', 'Integraciones y APIs'],
    cta: 'Ver desarrollo',
  },
  {
    id: 'redes',
    icon: Wifi,
    color: '#34D399',
    label: 'Redes',
    title: 'Infraestructura y conectividad',
    desc: 'Diseñamos e implementamos redes empresariales estables con cobertura total, segmentación por área y sistemas mesh con roaming automático.',
    services: ['Redes cableadas e inalámbricas', 'Sistemas mesh empresariales', 'Roaming sin cortes', 'Segmentación por área'],
    cta: 'Ver redes',
  },
  {
    id: 'correos',
    icon: Mail,
    color: '#F472B6',
    label: 'Correos',
    title: 'Correos corporativos administrados',
    desc: 'Correos con tu propio dominio, organizados por área, con seguridad técnica avanzada (SPF, DKIM, DMARC). Imagen profesional desde el primer mensaje.',
    services: ['Cuentas @tuempresa.com', 'SPF · DKIM · DMARC', 'Organización por área', 'Administración continua'],
    cta: 'Ver correos',
  },
  {
    id: 'equipos',
    icon: Monitor,
    color: '#FB923C',
    label: 'Equipos',
    title: 'Suministro y soporte de equipos',
    desc: 'Seleccionamos, configuramos y entregamos equipos nuevos o actualizamos los existentes. Impresoras, periféricos y soporte técnico multimarca.',
    services: ['Equipos nuevos configurados', 'Actualización SSD y RAM', 'Impresoras multimarca', 'Soporte técnico preventivo'],
    cta: 'Ver equipos',
  },
  {
    id: 'automatizacion',
    icon: Zap,
    color: '#FBBF24',
    label: 'Automatización',
    title: 'Automatización e integración',
    desc: 'Conectamos plataformas, eliminamos tareas repetitivas y construimos flujos automáticos con chatbots e integración entre sistemas.',
    services: ['Automatización de procesos', 'Integración entre sistemas', 'Chatbots y asistentes', 'Reportes automáticos'],
    cta: 'Ver automatización',
  },
  {
    id: 'soporte',
    icon: Wrench,
    color: '#A78BFA',
    label: 'Soporte',
    title: 'Soporte técnico especializado',
    desc: 'Diagnóstico, mantenimiento preventivo y correctivo, optimización de equipos y atención técnica continua para mantener tu infraestructura funcionando.',
    services: ['Diagnóstico y mantenimiento', 'Optimización de equipos', 'Resolución de fallas', 'Atención remota y presencial'],
    cta: 'Ver soporte',
  },
  {
    id: 'asesoria',
    icon: Lightbulb,
    color: '#E879F9',
    label: 'Asesoría',
    title: 'Asesoramiento en TI',
    desc: 'Orientación tecnológica sin compromiso. Evaluamos tu situación actual y te mostramos qué soluciones realmente necesitas, sin sobreventas.',
    services: ['Evaluación tecnológica', 'Plan de mejora', 'Presencia digital', 'Sin compromiso de compra'],
    cta: 'Solicitar asesoría',
  },
]

const activeId = ref('software')
const activeData = computed(() => categories.find(c => c.id === activeId.value)!)

const selectCategory = (id: string) => { activeId.value = id }

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  let w = 0, h = 0
  const resize = () => {
    w = canvas.width = canvas.offsetWidth
    h = canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    const rgb = getComputedStyle(document.documentElement).getPropertyValue('--canvas-particle').trim() || '59,130,246'

    const activeColor = activeData.value.color
    const hex = activeColor.replace('#', '')
    const r = parseInt(hex.slice(0,2), 16)
    const g = parseInt(hex.slice(2,4), 16)
    const b = parseInt(hex.slice(4,6), 16)

    ctx.strokeStyle = `rgba(${r},${g},${b},0.15)`
    ctx.lineWidth = 1
    ctx.setLineDash([4, 8])
    const cx = w / 2, cy = h / 2

    for (let i = 0; i < 3; i++) {
      const radius = 60 + i * 50
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.setLineDash([])
    ctx.strokeStyle = `rgba(${r},${g},${b},0.25)`
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(cx - 20, cy)
    ctx.lineTo(cx + 20, cy)
    ctx.moveTo(cx, cy - 20)
    ctx.lineTo(cx, cy + 20)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(cx, cy, 8, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r},${g},${b},0.6)`
    ctx.fill()

    rafId = requestAnimationFrame(draw)
  }
  draw()

  return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
})

onUnmounted(() => cancelAnimationFrame(rafId))
</script>

<template>
  <section id="configurador" class="py-24 relative overflow-hidden" style="background: var(--bg-surface);">
    <div class="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
    <AnimatedParticles density="medium" variant="connected" size="sm" :interactive="true" :glow="false" :opacity="0.65" speed="slow" />
    <div class="orb w-[500px] h-[400px] top-0 right-0 opacity-15" style="background: var(--accent-glow);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 550 } }"
        class="text-center mb-14"
      >
        <span class="tag mb-4 inline-block">Configura tu solución</span>
        <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl mb-4" style="color: var(--text-primary);">
          ¿Qué área necesitas
          <span class="gradient-text"> mejorar?</span>
        </h2>
        <p class="text-base sm:text-lg max-w-xl mx-auto" style="color: var(--text-secondary);">
          Selecciona el área de tu empresa y descubre exactamente qué puede hacer DASTI por ti.
        </p>
      </div>

      <!-- Configurator grid -->
      <div ref="containerRef" class="grid lg:grid-cols-[300px_1fr] gap-6 lg:gap-10 items-start">

        <!-- Left: category nodes -->
        <div class="space-y-2">
          <button
            v-for="(cat, i) in categories"
            :key="cat.id"
            @click="selectCategory(cat.id)"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: i * 60, duration: 450 } }"
            :class="`node-btn ${activeId === cat.id ? 'active' : ''}`"
          >
            <!-- Icon -->
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-250"
              :style="`background: ${cat.color}${activeId === cat.id ? '22' : '12'}; border: 1px solid ${cat.color}${activeId === cat.id ? '45' : '20'};`"
            >
              <component :is="cat.icon" :size="16" :style="`color: ${cat.color};`" />
            </div>

            <!-- Label + number -->
            <div class="flex-1">
              <span class="text-sm font-semibold" style="color: var(--text-primary);">{{ cat.label }}</span>
            </div>

            <!-- Active indicator -->
            <ChevronRight
              :size="14"
              class="flex-shrink-0 transition-all duration-200"
              :style="`color: ${activeId === cat.id ? cat.color : 'var(--text-muted)'}; transform: ${activeId === cat.id ? 'translateX(2px)' : 'none'};`"
            />
          </button>
        </div>

        <!-- Right: detail panel -->
        <Transition
          enter-active-class="transition-all duration-380 ease-out"
          enter-from-class="opacity-0 translate-x-4 scale-98"
          enter-to-class="opacity-100 translate-x-0 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <div
            :key="activeId"
            class="relative rounded-2xl overflow-hidden"
            style="border: 1px solid var(--border-medium); background: var(--bg-card); backdrop-filter: blur(20px);"
          >
            <!-- Top accent bar -->
            <div
              class="absolute top-0 left-0 right-0 h-0.5"
              :style="`background: linear-gradient(90deg, ${activeData.color}80, ${activeData.color}, ${activeData.color}20);`"
            />

            <!-- Canvas background (subtle) -->
            <canvas
              ref="canvasRef"
              class="absolute inset-0 w-full h-full pointer-events-none"
              style="opacity: 0.4;"
            />

            <div class="relative p-8 sm:p-10">
              <!-- Icon + title -->
              <div class="flex items-start gap-4 mb-6">
                <div
                  class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  :style="`background: ${activeData.color}18; border: 1.5px solid ${activeData.color}35; box-shadow: 0 0 20px ${activeData.color}20;`"
                >
                  <component :is="activeData.icon" :size="26" :style="`color: ${activeData.color};`" />
                </div>
                <div>
                  <h3 class="font-display font-bold text-xl sm:text-2xl leading-tight mb-1" style="color: var(--text-primary);">
                    {{ activeData.title }}
                  </h3>
                  <span
                    class="text-xs font-medium px-2 py-0.5 rounded-full"
                    :style="`background: ${activeData.color}12; color: ${activeData.color}; border: 1px solid ${activeData.color}25;`"
                  >
                    Área: {{ activeData.label }}
                  </span>
                </div>
              </div>

              <!-- Description -->
              <p class="text-base leading-relaxed mb-8" style="color: var(--text-secondary);">
                {{ activeData.desc }}
              </p>

              <!-- Services grid -->
              <div class="grid sm:grid-cols-2 gap-3 mb-8">
                <div
                  v-for="(svc, i) in activeData.services"
                  :key="svc"
                  class="flex items-center gap-2.5 p-3 rounded-xl"
                  :style="`background: ${activeData.color}08; border: 1px solid ${activeData.color}18;`"
                >
                  <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="`background: ${activeData.color};`" />
                  <span class="text-sm font-medium" style="color: var(--text-secondary);">{{ svc }}</span>
                </div>
              </div>

              <!-- CTAs -->
              <div class="flex flex-wrap gap-3">
                <button @click="router.push('/servicios')" class="btn-primary" :style="`background: linear-gradient(135deg, ${activeData.color}CC, ${activeData.color});`">
                  {{ activeData.cta }}
                  <ArrowRight :size="15" />
                </button>
                <button @click="router.push('/cotizador')" class="btn-outline">
                  Cotizar esta área
                </button>
                <button @click="router.push('/contacto')" class="btn-ghost">
                  <MessageCircle :size="14" />
                  Preguntar
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
