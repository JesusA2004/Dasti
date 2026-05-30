<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Globe, Code2, Zap, Bot, Mail, Monitor, Wrench, Network,
  Plus, Minus, CheckSquare, Square, MessageCircle, ChevronDown, ChevronUp, Info,
} from '@lucide/vue'

const WHATSAPP_NUMBER = '521XXXXXXXXXX'
const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

interface Tier {
  name: string
  price: number
  custom?: boolean
}

interface ServiceDef {
  id: string
  icon: any
  name: string
  color: string
  tiers: Tier[]
  hasQuantity?: boolean
  hasMonthly?: boolean
  monthlyPrice?: number
  monthlyLabel?: string
}

const servicesDef: ServiceDef[] = [
  {
    id: 'web',
    icon: Globe,
    name: 'Desarrollo web',
    color: '#818CF8',
    tiers: [
      { name: 'Landing page', price: 5000 },
      { name: 'Sitio corporativo', price: 10000 },
      { name: 'Sitio avanzado (secciones + formularios)', price: 18000 },
    ],
  },
  {
    id: 'software',
    icon: Code2,
    name: 'Software a la medida',
    color: '#3B82F6',
    tiers: [
      { name: 'Sistema básico interno', price: 20000 },
      { name: 'Sistema administrativo (usuarios + reportes)', price: 45000 },
      { name: 'Sistema avanzado con módulos personalizados', price: 80000 },
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    name: 'Automatización de procesos',
    color: '#34D399',
    tiers: [
      { name: 'Automatización básica', price: 3500 },
      { name: 'Flujo administrativo o reportes automáticos', price: 8000 },
      { name: 'Integración avanzada', price: 15000 },
    ],
  },
  {
    id: 'chatbot',
    icon: Bot,
    name: 'Chatbots y asistentes digitales',
    color: '#FBBF24',
    tiers: [
      { name: 'Bot básico de respuestas frecuentes', price: 4500 },
      { name: 'Bot con flujo comercial y captación de datos', price: 8000 },
      { name: 'Bot avanzado con integración a sistemas', price: 15000 },
    ],
  },
  {
    id: 'email',
    icon: Mail,
    name: 'Correo empresarial',
    color: '#F472B6',
    hasMonthly: true,
    monthlyPrice: 7500,
    monthlyLabel: 'Administración mensual',
    tiers: [
      { name: 'Implementación inicial', price: 20000 },
    ],
  },
  {
    id: 'equipment',
    icon: Monitor,
    name: 'Equipos de cómputo',
    color: '#FB923C',
    hasQuantity: true,
    tiers: [
      { name: 'Actualización básica', price: 5000 },
      { name: 'Actualización avanzada', price: 8000 },
      { name: 'Equipo administrativo nuevo', price: 12000 },
      { name: 'Equipo empresarial multitarea', price: 18000 },
      { name: 'Equipo de alto rendimiento', price: 25000 },
    ],
  },
  {
    id: 'support',
    icon: Wrench,
    name: 'Soporte técnico',
    color: '#A78BFA',
    tiers: [
      { name: 'Diagnóstico', price: 350 },
      { name: 'Mantenimiento preventivo', price: 600 },
      { name: 'Configuración o soporte especializado', price: 800 },
    ],
  },
  {
    id: 'network',
    icon: Network,
    name: 'Redes e infraestructura',
    color: '#60A5FA',
    tiers: [
      { name: 'Configuración básica', price: 1500 },
      { name: 'Instalación o mejora de red', price: 3500 },
      { name: 'Proyecto de red empresarial (se cotiza según alcance)', price: 0, custom: true },
    ],
  },
]

interface Selection {
  tierIndex: number
  quantity: number
  includeMonthly: boolean
}

const selections = ref<Record<string, Selection>>({})
const expandedId = ref<string | null>(null)

const isSelected = (id: string) => id in selections.value

const toggleService = (svc: ServiceDef) => {
  if (isSelected(svc.id)) {
    const { [svc.id]: _, ...rest } = selections.value
    selections.value = rest
    if (expandedId.value === svc.id) expandedId.value = null
  } else {
    selections.value = {
      ...selections.value,
      [svc.id]: { tierIndex: 0, quantity: 1, includeMonthly: false },
    }
    expandedId.value = svc.id
  }
}

const setTier = (id: string, idx: number) => {
  if (!selections.value[id]) return
  selections.value[id] = { ...selections.value[id], tierIndex: idx }
}

const adjustQty = (id: string, delta: number) => {
  if (!selections.value[id]) return
  const newQty = Math.max(1, selections.value[id].quantity + delta)
  selections.value[id] = { ...selections.value[id], quantity: newQty }
}

const toggleMonthly = (id: string) => {
  if (!selections.value[id]) return
  selections.value[id] = {
    ...selections.value[id],
    includeMonthly: !selections.value[id].includeMonthly,
  }
}

const getLineTotal = (svc: ServiceDef): number => {
  const sel = selections.value[svc.id]
  if (!sel) return 0
  const tier = svc.tiers[sel.tierIndex]
  if (!tier || tier.custom) return 0
  const base = tier.price * (svc.hasQuantity ? sel.quantity : 1)
  const monthly = svc.hasMonthly && sel.includeMonthly ? (svc.monthlyPrice || 0) : 0
  return base + monthly
}

const getSelection = (id: string): Selection => {
  return selections.value[id] ?? { tierIndex: 0, quantity: 1, includeMonthly: false }
}

const getTier = (svc: ServiceDef, idx: number) => svc.tiers[idx]

const total = computed(() =>
  servicesDef.reduce((sum, svc) => sum + getLineTotal(svc), 0)
)

const hasCustom = computed(() =>
  servicesDef.some(svc => {
    const sel = selections.value[svc.id]
    if (!sel) return false
    return svc.tiers[sel.tierIndex].custom
  })
)

const selectedCount = computed(() => Object.keys(selections.value).length)

const formatMXN = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 }).format(n)

const buildWhatsAppMessage = () => {
  const lines = ['Hola, me interesa una cotización formal de DASTI:']
  servicesDef.forEach(svc => {
    const sel = selections.value[svc.id]
    if (!sel) return
    const tier = svc.tiers[sel.tierIndex]
    const qty = svc.hasQuantity ? ` (x${sel.quantity})` : ''
    const monthly = svc.hasMonthly && sel.includeMonthly ? ' + Administración mensual' : ''
    lines.push(`• ${svc.name}: ${tier.name}${qty}${monthly}`)
  })
  lines.push(`\nTotal estimado: ${hasCustom.value ? 'requiere cotización personalizada' : formatMXN(total.value)}`)
  lines.push('\n¿Pueden enviarme una propuesta formal?')
  return encodeURIComponent(lines.join('\n'))
}

const openWhatsApp = () => {
  const msg = buildWhatsAppMessage()
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
}
</script>

<template>
  <section id="cotizador" class="relative py-24 overflow-hidden" style="background: #060F1E;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[500px] h-[500px] top-1/2 left-0 -translate-y-1/2"
      style="background: rgba(37,99,235,0.05);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Cotizador aproximado</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Calcula el costo</span>
          <span class="gradient-text block">de tu proyecto</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Selecciona los servicios que necesitas para obtener una estimación aproximada.
          El costo final se define en una propuesta formal.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">

        <!-- Services list -->
        <div class="lg:col-span-2 space-y-3">
          <div
            v-for="svc in servicesDef"
            :key="svc.id"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 500 } }"
          >
            <!-- Service header card -->
            <div
              :class="['glass-card rounded-xl overflow-hidden transition-all duration-300', isSelected(svc.id) ? 'quote-card-selected' : '']"
            >
              <!-- Toggle row -->
              <div
                class="flex items-center gap-4 p-4 cursor-pointer group"
                @click="toggleService(svc)"
              >
                <!-- Checkbox visual -->
                <div class="flex-shrink-0">
                  <CheckSquare v-if="isSelected(svc.id)" :size="20" :style="`color: ${svc.color}`" />
                  <Square v-else :size="20" class="text-slate-600 group-hover:text-slate-400 transition-colors" />
                </div>

                <!-- Icon -->
                <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  :style="`background: ${svc.color}15; border: 1px solid ${svc.color}30;`">
                  <component :is="svc.icon" :size="18" :style="`color: ${svc.color}`" />
                </div>

                <!-- Name -->
                <span class="font-medium text-white flex-1">{{ svc.name }}</span>

                <!-- Price range or total -->
                <div class="text-right flex-shrink-0">
                  <template v-if="isSelected(svc.id) && !svc.tiers[selections[svc.id].tierIndex].custom">
                    <div class="text-sm font-semibold" :style="`color: ${svc.color}`">
                      {{ formatMXN(getLineTotal(svc)) }}
                    </div>
                  </template>
                  <template v-else-if="!isSelected(svc.id)">
                    <div class="text-xs text-slate-500">
                      desde {{ formatMXN(Math.min(...svc.tiers.filter(t => !t.custom).map(t => t.price))) }}
                    </div>
                  </template>
                </div>

                <!-- Expand toggle -->
                <div v-if="isSelected(svc.id)" @click.stop="expandedId = expandedId === svc.id ? null : svc.id"
                  class="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                  <ChevronDown v-if="expandedId !== svc.id" :size="16" />
                  <ChevronUp v-else :size="16" />
                </div>
              </div>

              <!-- Expanded options -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-all duration-200"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="isSelected(svc.id) && expandedId === svc.id"
                  class="px-4 pb-4 border-t"
                  style="border-color: rgba(59,130,246,0.1);"
                >
                  <!-- Tier options -->
                  <p class="text-xs text-slate-500 mt-3 mb-2 font-medium uppercase tracking-wider">Tipo de servicio</p>
                  <div class="space-y-2">
                    <label
                      v-for="(tier, idx) in svc.tiers"
                      :key="tier.name"
                      class="flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                      :style="selections[svc.id].tierIndex === idx
                        ? `background: ${svc.color}12; border: 1px solid ${svc.color}35;`
                        : 'background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);'"
                      @click="setTier(svc.id, idx)"
                    >
                      <div class="flex items-center gap-2.5">
                        <div class="w-4 h-4 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all"
                          :style="selections[svc.id].tierIndex === idx
                            ? `border-color: ${svc.color}; background: ${svc.color};`
                            : 'border-color: rgba(255,255,255,0.2);'"
                        >
                          <div v-if="selections[svc.id].tierIndex === idx" class="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                        <span class="text-sm text-slate-300">{{ tier.name }}</span>
                      </div>
                      <span class="text-sm font-semibold flex-shrink-0"
                        :style="`color: ${tier.custom ? '#94a3b8' : svc.color}`">
                        {{ tier.custom ? 'A cotizar' : formatMXN(tier.price) }}
                      </span>
                    </label>
                  </div>

                  <!-- Quantity (equipment) -->
                  <div v-if="svc.hasQuantity" class="mt-3 flex items-center gap-4">
                    <span class="text-xs text-slate-400 font-medium">Cantidad de equipos:</span>
                    <div class="flex items-center gap-2">
                      <button
                        @click="adjustQty(svc.id, -1)"
                        class="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        style="border: 1px solid rgba(255,255,255,0.1);"
                      >
                        <Minus :size="14" />
                      </button>
                      <span class="w-8 text-center text-sm font-bold text-white">
                        {{ selections[svc.id].quantity }}
                      </span>
                      <button
                        @click="adjustQty(svc.id, 1)"
                        class="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        style="border: 1px solid rgba(255,255,255,0.1);"
                      >
                        <Plus :size="14" />
                      </button>
                    </div>
                  </div>

                  <!-- Monthly option (email) -->
                  <div v-if="svc.hasMonthly" class="mt-3">
                    <label class="flex items-center gap-3 cursor-pointer group/monthly" @click="toggleMonthly(svc.id)">
                      <div class="w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-all"
                        :style="selections[svc.id].includeMonthly
                          ? `background: ${svc.color}; border-color: ${svc.color};`
                          : 'background: transparent; border-color: rgba(255,255,255,0.25);'"
                      >
                        <svg v-if="selections[svc.id].includeMonthly" width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <span class="text-sm text-slate-300 group-hover/monthly:text-white transition-colors">
                        Incluir administración mensual
                        <span class="ml-1 font-semibold" :style="`color: ${svc.color}`">
                          ({{ formatMXN(svc.monthlyPrice || 0) }}/mes)
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Summary panel -->
        <div class="lg:col-span-1">
          <div
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600 } }"
            class="glass-card rounded-2xl p-6 sticky top-24"
          >
            <h3 class="font-display font-bold text-white text-lg mb-5">Resumen estimado</h3>

            <!-- Empty state -->
            <div v-if="selectedCount === 0" class="text-center py-8">
              <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);">
                <CheckSquare :size="20" class="text-slate-600" />
              </div>
              <p class="text-sm text-slate-500">Selecciona uno o más servicios para ver el estimado.</p>
            </div>

            <!-- Selected services summary -->
            <div v-else class="space-y-3 mb-5">
              <div v-for="svc in servicesDef.filter(s => isSelected(s.id))" :key="svc.id"
                class="flex items-start justify-between gap-3"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <div class="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center"
                    :style="`background: ${svc.color}15;`">
                    <component :is="svc.icon" :size="12" :style="`color: ${svc.color}`" />
                  </div>
                  <div class="min-w-0">
                    <div class="text-xs text-slate-300 truncate">{{ svc.name }}</div>
                    <div class="text-xs text-slate-500 truncate">
                      {{ svc.tiers[selections[svc.id].tierIndex].name }}
                      <span v-if="svc.hasQuantity"> × {{ selections[svc.id].quantity }}</span>
                    </div>
                    <div v-if="svc.hasMonthly && selections[svc.id].includeMonthly"
                      class="text-xs text-slate-500">+ Mensual</div>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <template v-if="svc.tiers[selections[svc.id].tierIndex].custom">
                    <span class="text-xs text-slate-500">A cotizar</span>
                  </template>
                  <template v-else>
                    <span class="text-xs font-semibold" :style="`color: ${svc.color}`">
                      {{ formatMXN(getLineTotal(svc)) }}
                    </span>
                  </template>
                </div>
              </div>
            </div>

            <!-- Separator -->
            <div v-if="selectedCount > 0" class="section-line mb-5" />

            <!-- Total -->
            <div v-if="selectedCount > 0" class="mb-5">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm text-slate-400">Total estimado</span>
                <div class="text-right">
                  <div v-if="!hasCustom" class="text-2xl font-bold gradient-text">
                    {{ formatMXN(total) }}
                  </div>
                  <div v-else class="text-sm text-slate-400">Incluye servicios a cotizar</div>
                  <div v-if="!hasCustom && total > 0" class="text-xs text-slate-500">MXN (estimado)</div>
                </div>
              </div>
            </div>

            <!-- Disclaimer -->
            <div class="flex gap-2 p-3 rounded-lg mb-5"
              style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
              <Info :size="14" class="text-slate-500 flex-shrink-0 mt-0.5" />
              <p class="text-xs text-slate-500 leading-relaxed">
                Esta cotización es aproximada. El precio final puede variar según alcance, requerimientos,
                licencias, equipos, integraciones y tiempos de entrega.
              </p>
            </div>

            <!-- CTA buttons -->
            <div class="space-y-2.5">
              <button
                @click="openWhatsApp"
                :disabled="selectedCount === 0"
                class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-250"
                :style="selectedCount > 0
                  ? 'background: linear-gradient(135deg, #25D366, #128C7E); color: white; cursor: pointer;'
                  : 'background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.25); cursor: not-allowed;'"
              >
                <MessageCircle :size="16" />
                Solicitar cotización formal
              </button>
              <a
                href="#contacto"
                @click.prevent="scrollTo('#contacto')"
                class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:text-white"
                style="border: 1px solid rgba(255,255,255,0.08); background: transparent;"
              >
                Enviar por formulario
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
