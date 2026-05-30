<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Globe, Code2, Zap, Bot, Mail, Monitor, Wrench, Wifi, GitMerge, Printer,
  Plus, Minus, CheckSquare, Square, MessageCircle, ChevronDown, ChevronUp, Info, Tag,
} from '@lucide/vue'

const WHATSAPP_NUMBER = '521XXXXXXXXXX'
const router = useRouter()

interface Tier {
  name: string
  price: number
  custom?: boolean
  note?: string
}

interface ServiceDef {
  id: string
  icon: any
  name: string
  color: string
  category: string
  tiers: Tier[]
  hasQuantity?: boolean
  hasMonthly?: boolean
  monthlyPrice?: number
  monthlyLabel?: string
  note?: string
}

const servicesDef: ServiceDef[] = [
  // Software y desarrollo — Desarrollo web
  {
    id: 'web',
    icon: Globe,
    name: 'Desarrollo web',
    color: '#818CF8',
    category: 'Software y desarrollo',
    tiers: [
      { name: 'Landing page profesional', price: 6000 },
      { name: 'Sitio corporativo', price: 12000 },
      { name: 'Sitio corporativo avanzado', price: 18000 },
      { name: 'Sitio con funciones personalizadas', price: 25000, note: 'Precio de referencia; puede variar según alcance y funcionalidades' },
    ],
  },
  // Software y desarrollo — Software a medida
  {
    id: 'software',
    icon: Code2,
    name: 'Software a medida',
    color: '#3B82F6',
    category: 'Software y desarrollo',
    tiers: [
      { name: 'Sistema interno básico', price: 25000 },
      { name: 'Sistema administrativo con usuarios y reportes', price: 45000 },
      { name: 'Sistema por módulos', price: 80000, note: 'Precio de referencia; puede variar según módulos y alcance' },
      { name: 'Proyecto empresarial por alcance', price: 0, custom: true },
    ],
  },
  // Correos corporativos
  {
    id: 'email',
    icon: Mail,
    name: 'Correos corporativos',
    color: '#F472B6',
    category: 'Correos corporativos',
    hasMonthly: true,
    monthlyPrice: 7500,
    monthlyLabel: 'Administración mensual estándar',
    tiers: [
      { name: 'Implementación inicial (hasta 100 cuentas)', price: 20000, note: 'Incluye configuración técnica, cuentas por área y soporte de arranque' },
    ],
    note: 'Administración mensual prioritaria desde $9,000/mes. Cuenta adicional: $70/mes. 10 GB adicionales de almacenamiento: $150/mes.',
  },
  // Redes e infraestructura
  {
    id: 'network',
    icon: Wifi,
    name: 'Redes e infraestructura',
    color: '#60A5FA',
    category: 'Redes e infraestructura',
    tiers: [
      { name: 'Diagnóstico de red', price: 1500 },
      { name: 'Configuración básica de red', price: 3500 },
      { name: 'Sistema mesh básico (2–3 puntos de acceso)', price: 7500, note: 'Incluye instalación y configuración de roaming' },
      { name: 'Sistema mesh empresarial (4+ puntos)', price: 15000, note: 'Red unificada con cobertura total y roaming automático' },
      { name: 'Proyecto de red por alcance', price: 0, custom: true },
    ],
    note: 'Los sistemas mesh permiten cubrir toda la empresa con una sola red WiFi inteligente y roaming automático.',
  },
  // Equipos de cómputo
  {
    id: 'equipment',
    icon: Monitor,
    name: 'Equipos de cómputo',
    color: '#FB923C',
    category: 'Equipos de cómputo',
    hasQuantity: true,
    tiers: [
      { name: 'Actualización básica', price: 5000, note: 'Mejora de velocidad con SSD o RAM' },
      { name: 'Actualización avanzada', price: 8000, note: 'Rendimiento, limpieza y configuración' },
      { name: 'Equipo administrativo nuevo', price: 12000, note: 'Oficina, correo, documentos, sistemas básicos' },
      { name: 'Equipo empresarial multitarea', price: 18000, note: 'Uso administrativo fuerte y multitarea' },
      { name: 'Equipo de alto rendimiento', price: 25000, note: 'Mayor carga de trabajo y exigencia' },
    ],
    note: 'Descuento por volumen aplicado sobre integración y configuración. En equipos nuevos, el precio final puede variar según marca, disponibilidad, garantía y características.',
  },
  // Impresoras y periféricos
  {
    id: 'printers',
    icon: Printer,
    name: 'Impresoras y periféricos',
    color: '#2DD4BF',
    category: 'Equipos y periféricos',
    tiers: [
      { name: 'Suministro multimarca (cotización)', price: 0, custom: true, note: 'Disponibilidad varía según marca, modelo y proveedor.' },
      { name: 'Instalación y configuración básica', price: 350 },
      { name: 'Configuración en red', price: 500 },
      { name: 'Soporte o diagnóstico', price: 600 },
    ],
    note: 'Sujeto a existencia, marca, modelo y requerimientos del cliente.',
  },
  // Soporte técnico
  {
    id: 'support',
    icon: Wrench,
    name: 'Soporte técnico',
    color: '#A78BFA',
    category: 'Soporte técnico',
    tiers: [
      { name: 'Diagnóstico de equipo', price: 350 },
      { name: 'Mantenimiento preventivo', price: 600 },
      { name: 'Configuración de impresora o escáner', price: 350 },
      { name: 'Configuración de correo en equipo', price: 250 },
      { name: 'Optimización de sistema', price: 800 },
      { name: 'Soporte especializado', price: 1200 },
    ],
  },
  // Automatización e integración
  {
    id: 'automation',
    icon: Zap,
    name: 'Automatización e integración',
    color: '#34D399',
    category: 'Automatización e integración',
    tiers: [
      { name: 'Automatización básica', price: 7500 },
      { name: 'Reportes automáticos', price: 15000 },
      { name: 'Integración con APIs externas', price: 25000 },
      { name: 'Integración entre sistemas internos', price: 35000 },
      { name: 'Automatización avanzada por alcance', price: 0, custom: true },
    ],
  },
  // Chatbots
  {
    id: 'chatbot',
    icon: Bot,
    name: 'Chatbots y asistentes digitales',
    color: '#FBBF24',
    category: 'Automatización e integración',
    tiers: [
      { name: 'Bot básico de respuestas frecuentes', price: 8000 },
      { name: 'Bot con flujo comercial y captación de datos', price: 15000 },
      { name: 'Bot avanzado con integración a sistemas', price: 28000 },
      { name: 'Bot empresarial a medida', price: 0, custom: true },
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
  const s = selections.value[id]
  if (!s) return
  selections.value[id] = { ...s, tierIndex: idx }
}

const adjustQty = (id: string, delta: number) => {
  const s = selections.value[id]
  if (!s) return
  selections.value[id] = { ...s, quantity: Math.max(1, s.quantity + delta) }
}

const toggleMonthly = (id: string) => {
  const s = selections.value[id]
  if (!s) return
  selections.value[id] = { ...s, includeMonthly: !s.includeMonthly }
}

const getEquipmentDiscount = (qty: number): number => {
  if (qty >= 21) return 0.15
  if (qty >= 11) return 0.10
  if (qty >= 6)  return 0.08
  if (qty >= 3)  return 0.05
  return 0
}

const getDiscountLabel = (qty: number): string => {
  const d = getEquipmentDiscount(qty)
  return d > 0 ? `${(d * 100).toFixed(0)}% desc.` : ''
}

const getOneTimeTotal = (svc: ServiceDef): number => {
  const sel = selections.value[svc.id]
  if (!sel) return 0
  const tier = svc.tiers[sel.tierIndex]
  if (!tier || tier.custom) return 0
  let base = tier.price
  if (svc.hasQuantity) {
    const qty = sel.quantity
    base = base * qty * (1 - getEquipmentDiscount(qty))
  }
  return base
}

const getMonthlyAmount = (svc: ServiceDef): number => {
  const sel = selections.value[svc.id]
  if (!sel || !svc.hasMonthly || !sel.includeMonthly) return 0
  return svc.monthlyPrice || 0
}

const getLineTotal = (svc: ServiceDef): number => getOneTimeTotal(svc) + getMonthlyAmount(svc)

const oneTimeTotal = computed(() =>
  servicesDef.reduce((sum, svc) => sum + getOneTimeTotal(svc), 0)
)

const monthlyTotal = computed(() =>
  servicesDef.reduce((sum, svc) => sum + getMonthlyAmount(svc), 0)
)

const hasCustom = computed(() =>
  servicesDef.some(svc => {
    const sel = selections.value[svc.id]
    if (!sel) return false
    return !!(svc.tiers[sel.tierIndex]?.custom)
  })
)

const customServices = computed(() =>
  servicesDef.filter(svc => {
    const sel = selections.value[svc.id]
    if (!sel) return false
    return !!(svc.tiers[sel.tierIndex]?.custom)
  })
)

const pricedServices = computed(() =>
  servicesDef.filter(svc => {
    const sel = selections.value[svc.id]
    if (!sel) return false
    return !(svc.tiers[sel.tierIndex]?.custom)
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
    if (!tier) return
    const qty = svc.hasQuantity ? ` (x${sel.quantity})` : ''
    const monthly = svc.hasMonthly && sel.includeMonthly ? ' + Administración mensual' : ''
    const discount = svc.hasQuantity ? getEquipmentDiscount(sel.quantity) : 0
    const discountStr = discount > 0 ? ` [${(discount * 100).toFixed(0)}% desc. volumen]` : ''
    const priceStr = tier.custom ? ' → A cotizar' : ` → ${formatMXN(getOneTimeTotal(svc))} MXN`
    lines.push(`• ${svc.name}: ${tier.name}${qty}${monthly}${discountStr}${priceStr}`)
  })
  if (oneTimeTotal.value > 0) lines.push(`\nPago único estimado: ${formatMXN(oneTimeTotal.value)} MXN`)
  if (monthlyTotal.value > 0) lines.push(`Mensualidad estimada: ${formatMXN(monthlyTotal.value)} MXN/mes`)
  if (hasCustom.value) lines.push('(Más servicios que requieren cotización formal)')
  lines.push('\n¿Pueden enviarme una propuesta formal?')
  return encodeURIComponent(lines.join('\n'))
}

const openWhatsApp = () => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, '_blank')
}

const categories = computed(() => {
  const cats: Record<string, ServiceDef[]> = {}
  servicesDef.forEach(svc => {
    if (!cats[svc.category]) cats[svc.category] = []
    cats[svc.category].push(svc)
  })
  return cats
})
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
          <span class="text-white">Estima la inversión</span>
          <span class="gradient-text block">para tu proyecto</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Calcula una referencia aproximada. Para una propuesta formal, revisamos el alcance, condiciones técnicas,
          licencias, equipos, ubicación y tiempos de entrega.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">

        <!-- Services list grouped by category -->
        <div class="lg:col-span-2 space-y-8">
          <div
            v-for="(svcs, catName) in categories"
            :key="catName"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 500 } }"
          >
            <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 px-1">
              {{ catName }}
            </h3>

            <div class="space-y-2.5">
              <div
                v-for="svc in svcs"
                :key="svc.id"
                :class="['glass-card rounded-xl overflow-hidden transition-all duration-300', isSelected(svc.id) ? 'quote-card-selected' : '']"
              >
                <!-- Toggle row -->
                <div class="flex items-center gap-4 p-4 cursor-pointer group" @click="toggleService(svc)">
                  <div class="flex-shrink-0">
                    <CheckSquare v-if="isSelected(svc.id)" :size="20" :style="`color: ${svc.color}`" />
                    <Square v-else :size="20" class="text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>

                  <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    :style="`background: ${svc.color}15; border: 1px solid ${svc.color}30;`">
                    <component :is="svc.icon" :size="18" :style="`color: ${svc.color}`" />
                  </div>

                  <span class="font-medium text-white flex-1">{{ svc.name }}</span>

                  <div class="text-right flex-shrink-0">
                    <template v-if="isSelected(svc.id) && !svc.tiers[selections[svc.id].tierIndex]?.custom">
                      <div class="text-sm font-semibold" :style="`color: ${svc.color}`">
                        {{ formatMXN(getLineTotal(svc)) }}
                      </div>
                      <div v-if="svc.hasQuantity && getEquipmentDiscount(selections[svc.id].quantity) > 0"
                        class="text-xs text-green-400">
                        {{ getDiscountLabel(selections[svc.id].quantity) }}
                      </div>
                    </template>
                    <template v-else-if="!isSelected(svc.id)">
                      <div class="text-xs text-slate-500">
                        desde {{ formatMXN(Math.min(...svc.tiers.filter(t => !t.custom).map(t => t.price))) }}
                      </div>
                    </template>
                  </div>

                  <div v-if="isSelected(svc.id)"
                    @click.stop="expandedId = expandedId === svc.id ? null : svc.id"
                    class="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                    <ChevronDown v-if="expandedId !== svc.id" :size="16" />
                    <ChevronUp v-else :size="16" />
                  </div>
                </div>

                <!-- Service note (collapsed) -->
                <div v-if="svc.note && !isSelected(svc.id)" class="px-4 pb-3">
                  <p class="text-xs text-slate-500 italic">{{ svc.note }}</p>
                </div>

                <!-- Expanded options -->
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition-all duration-200"
                  leave-to-class="opacity-0"
                >
                  <div
                    v-if="isSelected(svc.id) && expandedId === svc.id"
                    class="px-4 pb-4 border-t"
                    style="border-color: rgba(59,130,246,0.1);"
                  >
                    <div v-if="svc.note" class="mt-3 flex items-start gap-2 p-2.5 rounded-lg mb-3"
                      style="background: rgba(96,165,250,0.06); border: 1px solid rgba(96,165,250,0.12);">
                      <Info :size="13" class="text-blue-400 flex-shrink-0 mt-0.5" />
                      <p class="text-xs text-slate-400">{{ svc.note }}</p>
                    </div>

                    <p class="text-xs text-slate-500 mt-3 mb-2 font-medium uppercase tracking-wider">Tipo de servicio</p>
                    <div class="space-y-2">
                      <label
                        v-for="(tier, idx) in svc.tiers"
                        :key="tier.name"
                        class="flex items-start justify-between gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                        :style="selections[svc.id]?.tierIndex === idx
                          ? `background: ${svc.color}12; border: 1px solid ${svc.color}35;`
                          : 'background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);'"
                        @click="setTier(svc.id, idx)"
                      >
                        <div class="flex items-start gap-2.5">
                          <div class="w-4 h-4 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all mt-0.5"
                            :style="selections[svc.id]?.tierIndex === idx
                              ? `border-color: ${svc.color}; background: ${svc.color};`
                              : 'border-color: rgba(255,255,255,0.2);'"
                          >
                            <div v-if="selections[svc.id]?.tierIndex === idx" class="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                          <div>
                            <span class="text-sm text-slate-300 block">{{ tier.name }}</span>
                            <span v-if="tier.note" class="text-xs text-slate-500 block mt-0.5">{{ tier.note }}</span>
                          </div>
                        </div>
                        <span class="text-sm font-semibold flex-shrink-0"
                          :style="`color: ${tier.custom ? '#94a3b8' : svc.color}`">
                          {{ tier.custom ? 'A cotizar' : formatMXN(tier.price) }}
                        </span>
                      </label>
                    </div>

                    <!-- Quantity (equipment) -->
                    <div v-if="svc.hasQuantity" class="mt-4">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-slate-400 font-medium">Cantidad de equipos:</span>
                        <div v-if="getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) > 0"
                          class="flex items-center gap-1 text-xs text-green-400 font-medium">
                          <Tag :size="12" />
                          {{ getDiscountLabel(selections[svc.id]?.quantity ?? 1) }} por volumen
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <button @click="adjustQty(svc.id, -1)"
                          class="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                          style="border: 1px solid rgba(255,255,255,0.1);">
                          <Minus :size="14" />
                        </button>
                        <span class="w-10 text-center text-sm font-bold text-white">
                          {{ selections[svc.id]?.quantity ?? 1 }}
                        </span>
                        <button @click="adjustQty(svc.id, 1)"
                          class="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                          style="border: 1px solid rgba(255,255,255,0.1);">
                          <Plus :size="14" />
                        </button>
                        <span class="text-xs text-slate-500">equipo(s)</span>
                      </div>
                      <!-- Discount scale -->
                      <div class="mt-3 grid grid-cols-5 gap-1">
                        <div v-for="(vol, i) in [
                          { range: '1-2', disc: 0 },
                          { range: '3-5', disc: 5 },
                          { range: '6-10', disc: 8 },
                          { range: '11-20', disc: 10 },
                          { range: '21+', disc: 15 },
                        ]" :key="i"
                          class="text-center p-1.5 rounded-md text-xs"
                          :style="getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) * 100 === vol.disc
                            ? `background: ${svc.color}20; border: 1px solid ${svc.color}40; color: ${svc.color};`
                            : 'background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); color: #64748b;'"
                        >
                          <div class="font-semibold">{{ vol.disc > 0 ? vol.disc + '%' : '—' }}</div>
                          <div class="text-xs opacity-70">{{ vol.range }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Monthly option -->
                    <div v-if="svc.hasMonthly" class="mt-3">
                      <label class="flex items-center gap-3 cursor-pointer group/monthly" @click="toggleMonthly(svc.id)">
                        <div class="w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-all"
                          :style="selections[svc.id]?.includeMonthly
                            ? `background: ${svc.color}; border-color: ${svc.color};`
                            : 'background: transparent; border-color: rgba(255,255,255,0.25);'"
                        >
                          <svg v-if="selections[svc.id]?.includeMonthly" width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                        <span class="text-sm text-slate-300 group-hover/monthly:text-white transition-colors">
                          Incluir {{ svc.monthlyLabel || 'administración mensual' }}
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
              <p class="text-sm text-slate-500">Selecciona los servicios que necesitas para ver la referencia.</p>
            </div>

            <!-- Priced services list -->
            <div v-else>
              <div v-if="pricedServices.length > 0" class="space-y-3 mb-4 max-h-52 overflow-y-auto pr-1">
                <div v-for="svc in pricedServices" :key="svc.id"
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
                        {{ svc.tiers[selections[svc.id]?.tierIndex ?? 0]?.name }}
                        <span v-if="svc.hasQuantity"> × {{ selections[svc.id]?.quantity }}</span>
                      </div>
                      <div v-if="svc.hasQuantity && getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) > 0"
                        class="text-xs text-green-400">
                        {{ getDiscountLabel(selections[svc.id]?.quantity ?? 1) }}
                      </div>
                    </div>
                  </div>
                  <span class="text-xs font-semibold flex-shrink-0" :style="`color: ${svc.color}`">
                    {{ formatMXN(getLineTotal(svc)) }}
                  </span>
                </div>
              </div>

              <!-- "A cotizar" services -->
              <div v-if="customServices.length > 0" class="mb-4">
                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">A cotizar</p>
                <div class="space-y-2">
                  <div v-for="svc in customServices" :key="svc.id"
                    class="flex items-center justify-between gap-2 p-2 rounded-lg"
                    style="background: rgba(251,191,36,0.05); border: 1px solid rgba(251,191,36,0.15);"
                  >
                    <div class="flex items-center gap-2 min-w-0">
                      <component :is="svc.icon" :size="12" :style="`color: ${svc.color}`" class="flex-shrink-0" />
                      <span class="text-xs text-slate-300 truncate">{{ svc.name }}</span>
                    </div>
                    <span class="text-xs text-amber-400 font-medium flex-shrink-0">A cotizar</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedCount > 0" class="section-line mb-5" />

            <!-- Totals — separated pago único / mensualidad -->
            <div v-if="selectedCount > 0" class="mb-5 space-y-4">
              <div v-if="oneTimeTotal > 0">
                <p class="text-xs text-slate-500 uppercase tracking-wider mb-1">Pago único estimado</p>
                <div class="text-4xl font-bold gradient-text leading-tight">
                  {{ formatMXN(oneTimeTotal) }}
                </div>
                <p class="text-xs text-slate-500 mt-1">MXN (referencia aproximada)</p>
              </div>

              <div v-if="monthlyTotal > 0" class="pt-3 border-t" style="border-color: rgba(255,255,255,0.06);">
                <p class="text-xs text-slate-500 uppercase tracking-wider mb-1">Mensualidad estimada</p>
                <div class="text-2xl font-bold text-blue-400 leading-tight">
                  {{ formatMXN(monthlyTotal) }}
                  <span class="text-sm font-normal text-slate-400"> / mes</span>
                </div>
              </div>

              <div v-if="oneTimeTotal === 0 && monthlyTotal === 0" class="py-2 px-3 rounded-lg"
                style="background: rgba(251,191,36,0.06); border: 1px solid rgba(251,191,36,0.15);">
                <p class="text-sm text-amber-400 font-medium">Requiere cotización formal</p>
                <p class="text-xs text-slate-500 mt-0.5">Los servicios seleccionados se cotizan según alcance.</p>
              </div>
            </div>

            <!-- Disclaimer -->
            <div v-if="selectedCount > 0" class="flex gap-2 p-3 rounded-lg mb-5"
              style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
              <Info :size="14" class="text-slate-500 flex-shrink-0 mt-0.5" />
              <p class="text-xs text-slate-500 leading-relaxed">
                <template v-if="hasCustom && oneTimeTotal > 0">
                  El total estimado no incluye los servicios marcados como <strong class="text-amber-400">A cotizar</strong>. Estos se definen según alcance y requerimientos técnicos.
                </template>
                <template v-else-if="hasCustom && oneTimeTotal === 0">
                  Los servicios seleccionados requieren cotización formal según alcance y requerimientos.
                </template>
                <template v-else>
                  Referencia aproximada. El precio final depende del alcance, licencias, equipos, ubicación y tiempos de entrega.
                </template>
              </p>
            </div>
            <div v-else class="flex gap-2 p-3 rounded-lg mb-5"
              style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
              <Info :size="14" class="text-slate-500 flex-shrink-0 mt-0.5" />
              <p class="text-xs text-slate-500 leading-relaxed">
                Referencia aproximada. El precio final depende del alcance, requerimientos, licencias, equipos, ubicación y tiempos de entrega.
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
              <button
                @click="router.push('/contacto')"
                class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:text-white"
                style="border: 1px solid rgba(255,255,255,0.08); background: transparent;"
              >
                Formulario de contacto
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
