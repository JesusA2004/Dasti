<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight, MessageCircle, Video, MapPin, CheckCircle2,
  Code2, Wifi, Mail, Monitor, Zap, Lightbulb, Clock,
} from '@lucide/vue'
import HeroSection from '@/components/HeroSection.vue'

const router = useRouter()

// ── 6 services overview ──────────────────────────────────────────
const services6 = [
  { icon: Code2,     name: 'Software a medida',        desc: 'Sistemas y paneles propios.',    color: '#3B82F6' },
  { icon: Wifi,      name: 'Infraestructura y redes',  desc: 'WiFi empresarial estable.',      color: '#60A5FA' },
  { icon: Mail,      name: 'Correos corporativos',     desc: 'Dominio propio y gestión.',      color: '#F472B6' },
  { icon: Monitor,   name: 'Equipos de cómputo',       desc: 'Suministro y configuración.',   color: '#FB923C' },
  { icon: Zap,       name: 'Automatización',           desc: 'Procesos sin fricción.',         color: '#34D399' },
  { icon: Lightbulb, name: 'Asesoramiento en TI',      desc: 'Orientación sin compromiso.',   color: '#E879F9' },
]

// ── Interactive solution tabs ─────────────────────────────────────
const tabs = [
  {
    id: 'operacion',
    label: 'Operación interna',
    color: '#3B82F6',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    title: 'Digitaliza tu operación',
    desc: 'Reemplaza hojas de cálculo dispersas con sistemas propios que centralizan información, controlan usuarios y generan reportes automáticos.',
    services: ['Software a medida', 'Panel administrativo', 'Reportes automáticos', 'Control de usuarios'],
  },
  {
    id: 'infraestructura',
    label: 'Infraestructura',
    color: '#60A5FA',
    icon: Wifi,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80',
    title: 'Red empresarial estable',
    desc: 'Diseñamos e implementamos infraestructura de red con cobertura total, segmentación y roaming automático en todos los espacios.',
    services: ['Redes empresariales', 'Sistema mesh', 'Roaming automático', 'Segmentación por área'],
  },
  {
    id: 'comunicacion',
    label: 'Comunicación',
    color: '#F472B6',
    icon: Mail,
    image: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=900&auto=format&fit=crop&q=80',
    title: 'Identidad profesional',
    desc: 'Correos con dominio propio, organizados por área y con seguridad técnica avanzada. Sin más Gmail genérico para comunicación empresarial.',
    services: ['Correos @tuempresa.com', 'SPF · DKIM · DMARC', 'Cuentas por área', 'Administración continua'],
  },
  {
    id: 'equipamiento',
    label: 'Equipamiento',
    color: '#FB923C',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80',
    title: 'Equipos listos para operar',
    desc: 'Selección, suministro y configuración completa de equipos nuevos o actualización de los existentes para extender su vida útil.',
    services: ['Equipos nuevos configurados', 'Actualización con SSD/RAM', 'Impresoras en red', 'Soporte técnico'],
  },
  {
    id: 'automatizacion',
    label: 'Automatización',
    color: '#34D399',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80',
    title: 'Procesos sin fricción',
    desc: 'Conectamos plataformas, automatizamos tareas repetitivas y reducimos el trabajo manual con flujos personalizados.',
    services: ['Automatización de procesos', 'Integración de sistemas', 'Chatbots', 'Reportes automáticos'],
  },
]
const activeTab = ref('operacion')
const activeData = computed(() => tabs.find(t => t.id === activeTab.value)!)

// ── Coverage zones ────────────────────────────────────────────────
const zones = [
  { name: 'Morelos · Cuernavaca', type: 'Sede principal', color: '#3B82F6' },
  { name: 'CDMX · Estado de México', type: 'Según proyecto', color: '#818CF8' },
  { name: 'Puebla y estados cercanos', type: 'Con desplazamiento', color: '#34D399' },
]
</script>

<template>
  <div>

    <!-- ──────────────────────────────────────────────
         A) HERO
    ────────────────────────────────────────────── -->
    <HeroSection />

    <!-- ──────────────────────────────────────────────
         B) SERVICES 6-PACK   (surface bg = contrast)
    ────────────────────────────────────────────── -->
    <section class="py-20 relative overflow-hidden" style="background: var(--bg-surface);">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          v-motion
          :initial="{ opacity: 0, y: 18 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 550 } }"
          class="text-center mb-12"
        >
          <span class="tag mb-4 inline-block">¿Qué hace DASTI?</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold" style="color: var(--text-primary);">
            Tecnología en cada área
            <span class="gradient-text block">de tu empresa</span>
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <div
            v-for="(svc, i) in services6"
            :key="svc.name"
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 55, duration: 480 } }"
            class="glass-card rounded-2xl p-5 cursor-pointer group flex flex-col items-center text-center tilt-card"
            @click="router.push('/servicios')"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110"
              :style="`background: ${svc.color}18; border: 1px solid ${svc.color}30;`"
            >
              <component :is="svc.icon" :size="22" :style="`color: ${svc.color};`" />
            </div>
            <p class="text-sm font-semibold mb-1 leading-tight" style="color: var(--text-primary);">{{ svc.name }}</p>
            <p class="text-xs leading-snug" style="color: var(--text-muted);">{{ svc.desc }}</p>
          </div>
        </div>

        <div class="text-center">
          <button @click="router.push('/servicios')" class="btn-primary">
            Ver todos los servicios
            <ArrowRight :size="16" />
          </button>
        </div>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────
         C) INTERACTIVE TABS — "Soluciones adaptadas"
    ────────────────────────────────────────────── -->
    <section class="py-24 relative overflow-hidden" style="background: var(--bg-base);">
      <div class="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          v-motion
          :initial="{ opacity: 0, y: 18 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 550 } }"
          class="text-center mb-12"
        >
          <span class="tag mb-4 inline-block">Soluciones adaptadas</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold" style="color: var(--text-primary);">
            ¿En qué área necesitas apoyo?
          </h2>
        </div>

        <!-- Tab buttons -->
        <div class="flex flex-wrap gap-2 justify-center mb-10">
          <button
            v-for="t in tabs"
            :key="t.id"
            @click="activeTab = t.id"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-250"
            :style="activeTab === t.id
              ? `background: ${t.color}22; color: ${t.color}; border: 1px solid ${t.color}50;`
              : `background: var(--bg-card); color: var(--text-muted); border: 1px solid var(--border-subtle);`"
          >
            {{ t.label }}
          </button>
        </div>

        <!-- Tab panel (animated transition) -->
        <Transition
          enter-active-class="transition-all duration-350 ease-out"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-3"
          mode="out-in"
        >
          <div :key="activeTab" class="grid lg:grid-cols-2 gap-10 items-center">

            <!-- Image side -->
            <div class="relative rounded-2xl overflow-hidden aspect-video img-zoom"
              style="box-shadow: var(--shadow-lg);">
              <img
                :src="activeData.image"
                :alt="activeData.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 pointer-events-none"
                :style="`background: linear-gradient(135deg, ${activeData.color}18 0%, transparent 50%);`" />
              <!-- Overlay badge -->
              <div class="absolute bottom-4 left-4">
                <div class="glass-card rounded-xl px-3.5 py-2 flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center"
                    :style="`background: ${activeData.color}25; border: 1px solid ${activeData.color}45;`">
                    <component :is="activeData.icon" :size="14" :style="`color: ${activeData.color};`" />
                  </div>
                  <span class="text-xs font-semibold" style="color: var(--text-primary);">{{ activeData.label }}</span>
                </div>
              </div>
            </div>

            <!-- Content side -->
            <div>
              <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                :style="`background: ${activeData.color}18; border: 1px solid ${activeData.color}30;`">
                <component :is="activeData.icon" :size="20" :style="`color: ${activeData.color};`" />
              </div>
              <h3 class="font-display font-bold text-2xl sm:text-3xl mb-3" style="color: var(--text-primary);">
                {{ activeData.title }}
              </h3>
              <p class="text-base leading-relaxed mb-6" style="color: var(--text-secondary);">
                {{ activeData.desc }}
              </p>
              <ul class="space-y-2.5 mb-6">
                <li
                  v-for="svc in activeData.services"
                  :key="svc"
                  class="flex items-center gap-2.5"
                >
                  <CheckCircle2 :size="15" :style="`color: ${activeData.color};`" />
                  <span class="text-sm" style="color: var(--text-secondary);">{{ svc }}</span>
                </li>
              </ul>
              <button @click="router.push('/servicios')" class="btn-outline">
                Ver servicio completo
                <ArrowRight :size="15" />
              </button>
            </div>
          </div>
        </Transition>
      </div>
      <div class="section-line max-w-7xl mx-auto mt-24" />
    </section>

    <!-- ──────────────────────────────────────────────
         D) ATENCIÓN PRESENCIAL / REMOTA (surface bg + image)
    ────────────────────────────────────────────── -->
    <section class="py-24 relative overflow-hidden" style="background: var(--bg-surface);">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">

          <!-- Image -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 680 } }"
            class="relative"
          >
            <div class="rounded-2xl overflow-hidden aspect-[4/3] img-zoom"
              style="box-shadow: var(--shadow-lg);">
              <img
                src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=900&auto=format&fit=crop&q=80"
                alt="Videollamada y reunión presencial DASTI"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 pointer-events-none"
                style="background: linear-gradient(135deg, var(--accent-glow-sm) 0%, transparent 60%);" />
            </div>
            <!-- Floating badge -->
            <div class="absolute -bottom-5 -right-5 glass-card rounded-2xl p-4"
              style="box-shadow: var(--shadow-md);">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                  style="background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3);">
                  <MapPin :size="18" style="color: #34D399;" />
                </div>
                <div>
                  <p class="text-xs font-bold leading-tight" style="color: var(--text-primary);">Sede: Morelos</p>
                  <p class="text-xs" style="color: var(--text-muted);">Presencial y remoto</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Text -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 680 } }"
          >
            <span class="tag mb-5 inline-block">Modalidad de atención</span>
            <h2 class="font-display text-3xl sm:text-4xl font-bold mb-5" style="color: var(--text-primary);">
              Remoto o presencial —
              <span class="gradient-text">nos adaptamos</span>
            </h2>
            <p class="text-base leading-relaxed mb-7" style="color: var(--text-secondary);">
              Atendemos desde Morelos — principalmente Cuernavaca y zona cercana. También coordinamos proyectos en CDMX, Estado de México, Puebla y estados cercanos. Según el servicio, trabajamos remoto, por videollamada o mediante reunión presencial.
            </p>

            <div class="space-y-3 mb-8">
              <div v-for="z in zones" :key="z.name" class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full flex-shrink-0" :style="`background: ${z.color};`" />
                <span class="text-sm font-medium" style="color: var(--text-primary);">{{ z.name }}</span>
                <span class="text-xs ml-auto" style="color: var(--text-muted);">{{ z.type }}</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button @click="router.push('/contacto')" class="btn-primary">
                <Video :size="16" />
                Agendar videollamada
              </button>
              <button @click="router.push('/contacto')" class="btn-outline">
                <MessageCircle :size="16" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────
         E) PROYECTOS PREVIEW (base bg)
    ────────────────────────────────────────────── -->
    <section class="py-24 relative overflow-hidden" style="background: var(--bg-base);">
      <div class="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          v-motion
          :initial="{ opacity: 0, y: 18 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 550 } }"
          class="text-center mb-12"
        >
          <span class="tag mb-4 inline-block">Proyectos</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold mb-3" style="color: var(--text-primary);">
            Casos en preparación
          </h2>
          <p class="text-base max-w-lg mx-auto" style="color: var(--text-secondary);">
            Próximamente: casos de proyectos desarrollados e implementados por DASTI.
          </p>
        </div>

        <div class="grid sm:grid-cols-3 gap-5 mb-10">
          <div
            v-for="(ph, i) in [
              { color: '#3B82F6', tag: 'Desarrollo de software' },
              { color: '#60A5FA', tag: 'Redes e infraestructura' },
              { color: '#F472B6', tag: 'Correos corporativos' },
            ]"
            :key="i"
            v-motion
            :initial="{ opacity: 0, y: 28 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 580 } }"
            class="glass-card rounded-2xl overflow-hidden flex flex-col shimmer-card"
          >
            <!-- Visual placeholder header -->
            <div
              class="relative flex items-center justify-center flex-col gap-2"
              style="height: 160px;"
              :style="`background: linear-gradient(135deg, ${ph.color}18 0%, ${ph.color}08 100%);`"
            >
              <div class="absolute inset-0 pointer-events-none"
                style="background: repeating-linear-gradient(45deg, transparent, transparent 16px, rgba(255,255,255,0.01) 16px, rgba(255,255,255,0.01) 32px);" />
              <Clock :size="30" :style="`color: ${ph.color}; opacity: 0.28;`" />
              <p class="text-xs font-medium relative" :style="`color: ${ph.color}; opacity: 0.5;`">
                Imagen pendiente
              </p>
            </div>
            <!-- Card body -->
            <div class="p-5 flex-1 flex flex-col">
              <span class="text-xs font-medium px-2 py-0.5 rounded-full mb-3 self-start"
                :style="`background: ${ph.color}12; color: ${ph.color}; border: 1px solid ${ph.color}25;`">
                {{ ph.tag }}
              </span>
              <h3 class="font-semibold text-base mb-1.5" style="color: var(--text-primary);">
                Proyecto en preparación
              </h3>
              <p class="text-sm leading-relaxed mb-4 flex-1" style="color: var(--text-muted);">
                Detalles y descripción del proyecto se publicarán próximamente.
              </p>
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full animate-pulse" :style="`background: ${ph.color};`" />
                <span class="text-xs" style="color: var(--text-muted);">En preparación</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button @click="router.push('/proyectos')" class="btn-outline">
            Ver página de proyectos
          </button>
        </div>
      </div>
      <div class="section-line max-w-7xl mx-auto mt-20" />
    </section>

    <!-- ──────────────────────────────────────────────
         F) CTA FINAL
    ────────────────────────────────────────────── -->
    <section class="py-24 relative overflow-hidden" style="background: var(--bg-base);">
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          v-motion
          :initial="{ opacity: 0, y: 18 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 550 } }"
          class="rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
          style="background: linear-gradient(135deg, var(--accent-glow-sm) 0%, var(--bg-elevated) 100%); border: 1px solid var(--border-medium);"
        >
          <div class="orb w-[500px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style="background: var(--accent-glow-sm);" />
          <div class="relative">
            <h2 class="font-display text-2xl sm:text-4xl font-bold mb-4" style="color: var(--text-primary);">
              Cuéntanos qué necesita tu empresa
            </h2>
            <p class="text-base mb-8 max-w-md mx-auto" style="color: var(--text-secondary);">
              Te asesoramos sin compromiso y te mostramos cómo DASTI puede ayudarte.
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
              <button @click="router.push('/cotizador')" class="btn-primary">
                Cotizar solución
                <ArrowRight :size="16" />
              </button>
              <button @click="router.push('/contacto')" class="btn-outline">
                <MessageCircle :size="16" />
                Hablar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
