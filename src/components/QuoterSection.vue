<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Globe, Code2, Zap, Bot, Mail, Monitor, Wrench, Wifi, Printer,
  Plus, Minus, CheckSquare, Square, MessageCircle, ChevronDown, ChevronUp, Info, Tag,
} from '@lucide/vue'
import AnimatedParticles from '@/components/AnimatedParticles.vue'
import { buildWhatsAppUrl } from '@/config/contact'

const router = useRouter()

interface Tier { name: string; price: number; custom?: boolean; note?: string }
interface MonthlyOption { name: string; price: number }

interface ServiceDef {
  id: string; icon: any; name: string; color: string; category: string
  tiers: Tier[]; hasQuantity?: boolean; note?: string
  mandatoryMonthly?: MonthlyOption[]
}

const servicesDef: ServiceDef[] = [
  {
    id: 'web', icon: Globe, name: 'Desarrollo web', color: '#818CF8', category: 'Software y desarrollo',
    tiers: [
      { name: 'Landing page profesional', price: 6000 },
      { name: 'Sitio corporativo', price: 12000 },
      { name: 'Sitio corporativo avanzado', price: 18000 },
      { name: 'Sitio con funciones personalizadas', price: 25000, note: 'Precio de referencia; puede variar según alcance y funcionalidades' },
    ],
  },
  {
    id: 'software', icon: Code2, name: 'Software a medida', color: '#3B82F6', category: 'Software y desarrollo',
    tiers: [
      { name: 'Sistema interno básico', price: 25000 },
      { name: 'Sistema administrativo con usuarios y reportes', price: 45000 },
      { name: 'Sistema por módulos', price: 80000, note: 'Precio de referencia; puede variar según módulos y alcance' },
      { name: 'Proyecto empresarial por alcance', price: 0, custom: true },
    ],
  },
  {
    id: 'email', icon: Mail, name: 'Correos corporativos', color: '#F472B6', category: 'Correos corporativos',
    mandatoryMonthly: [
      { name: 'Administración mensual estándar', price: 7500 },
      { name: 'Administración mensual prioritaria', price: 9000 },
    ],
    tiers: [
      { name: 'Implementación inicial (hasta 100 cuentas)', price: 20000, note: 'Incluye configuración técnica, cuentas por área, SPF/DKIM/DMARC y soporte de arranque' },
    ],
    note: 'La administración mensual es obligatoria e incluye soporte continuo, gestión de cuentas y renovaciones. Cuenta adicional: $70/mes. 10 GB adicionales: $150/mes.',
  },
  {
    id: 'network', icon: Wifi, name: 'Redes e infraestructura', color: '#60A5FA', category: 'Redes e infraestructura',
    tiers: [
      { name: 'Diagnóstico de red', price: 1500 },
      { name: 'Configuración básica de red', price: 3500 },
      { name: 'Sistema mesh básico (2 puntos de acceso)', price: 9500, note: 'Incluye instalación y configuración de roaming automático' },
      { name: 'Sistema mesh oficina (3 puntos de acceso)', price: 14500, note: 'Cobertura ampliada con roaming automático' },
      { name: 'Sistema mesh empresarial (4+ puntos)', price: 22000, note: 'Red unificada con cobertura total y roaming automático' },
      { name: 'Nodo adicional instalado y configurado', price: 4500 },
      { name: 'Proyecto de red por alcance', price: 0, custom: true },
    ],
    note: 'Los sistemas mesh permiten cubrir toda la empresa con una sola red WiFi inteligente y roaming automático.',
  },
  {
    id: 'equipment', icon: Monitor, name: 'Equipos de cómputo', color: '#FB923C', category: 'Equipos de cómputo',
    hasQuantity: true,
    tiers: [
      { name: 'Actualización básica', price: 5000, note: 'Mejora de velocidad con SSD o RAM' },
      { name: 'Actualización avanzada', price: 8000, note: 'Rendimiento, limpieza y configuración' },
      { name: 'Equipo administrativo nuevo', price: 12000, note: 'Oficina, correo, documentos, sistemas básicos' },
      { name: 'Equipo empresarial multitarea', price: 18000, note: 'Uso administrativo fuerte y multitarea' },
      { name: 'Equipo de alto rendimiento', price: 25000, note: 'Mayor carga de trabajo y exigencia' },
    ],
    note: 'Descuento por volumen aplicado sobre integración y configuración.',
  },
  {
    id: 'printers', icon: Printer, name: 'Impresoras y periféricos', color: '#2DD4BF', category: 'Equipos y periféricos',
    tiers: [
      { name: 'Suministro multimarca (cotización)', price: 0, custom: true, note: 'Disponibilidad varía según marca, modelo y proveedor.' },
      { name: 'Instalación y configuración básica', price: 350 },
      { name: 'Configuración en red', price: 500 },
      { name: 'Soporte o diagnóstico', price: 600 },
    ],
    note: 'Sujeto a existencia, marca, modelo y requerimientos del cliente.',
  },
  {
    id: 'support', icon: Wrench, name: 'Soporte técnico', color: '#A78BFA', category: 'Soporte técnico',
    tiers: [
      { name: 'Diagnóstico de equipo', price: 350 },
      { name: 'Mantenimiento preventivo', price: 600 },
      { name: 'Configuración de impresora o escáner', price: 350 },
      { name: 'Configuración de correo en equipo', price: 250 },
      { name: 'Optimización de sistema', price: 800 },
      { name: 'Soporte especializado', price: 1200 },
    ],
  },
  {
    id: 'automation', icon: Zap, name: 'Automatización e integración', color: '#34D399', category: 'Automatización e integración',
    tiers: [
      { name: 'Automatización básica', price: 7500 },
      { name: 'Reportes automáticos', price: 15000 },
      { name: 'Integración con APIs externas', price: 25000 },
      { name: 'Integración entre sistemas internos', price: 35000 },
      { name: 'Automatización avanzada por alcance', price: 0, custom: true },
    ],
  },
  {
    id: 'chatbot', icon: Bot, name: 'Chatbots y asistentes digitales', color: '#FBBF24', category: 'Automatización e integración',
    tiers: [
      { name: 'Bot básico de respuestas frecuentes', price: 8000 },
      { name: 'Bot con flujo comercial y captación de datos', price: 15000 },
      { name: 'Bot avanzado con integración a sistemas', price: 28000 },
      { name: 'Bot empresarial a medida', price: 0, custom: true },
    ],
  },
]

interface Selection { tierIndex: number; quantity: number; monthlyOptionIndex: number }

const selections = ref<Record<string, Selection>>({})
const expandedId = ref<string | null>(null)

const isSelected = (id: string) => id in selections.value

const toggleService = (svc: ServiceDef) => {
  if (isSelected(svc.id)) {
    const { [svc.id]: _, ...rest } = selections.value
    selections.value = rest
    if (expandedId.value === svc.id) expandedId.value = null
  } else {
    selections.value = { ...selections.value, [svc.id]: { tierIndex: 0, quantity: 1, monthlyOptionIndex: 0 } }
    expandedId.value = svc.id
  }
}

const setTier = (id: string, idx: number) => {
  const s = selections.value[id]
  if (!s) return
  selections.value[id] = { ...s, tierIndex: idx }
}

const setMonthlyOption = (id: string, idx: number) => {
  const s = selections.value[id]
  if (!s) return
  selections.value[id] = { ...s, monthlyOptionIndex: idx }
}

const adjustQty = (id: string, delta: number) => {
  const s = selections.value[id]
  if (!s) return
  selections.value[id] = { ...s, quantity: Math.max(1, s.quantity + delta) }
}

const getEquipmentDiscount = (qty: number): number => {
  if (qty >= 21) return 0.15
  if (qty >= 11) return 0.10
  if (qty >= 6) return 0.08
  if (qty >= 3) return 0.05
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
  if (!sel || !svc.mandatoryMonthly) return 0
  return svc.mandatoryMonthly[sel.monthlyOptionIndex ?? 0].price
}

const getLineTotal = (svc: ServiceDef): number => getOneTimeTotal(svc) + getMonthlyAmount(svc)

const oneTimeTotal = computed(() => servicesDef.reduce((sum, svc) => sum + getOneTimeTotal(svc), 0))
const monthlyTotal = computed(() => servicesDef.reduce((sum, svc) => sum + getMonthlyAmount(svc), 0))
const hasCustom = computed(() => servicesDef.some(svc => { const sel = selections.value[svc.id]; if (!sel) return false; return !!(svc.tiers[sel.tierIndex]?.custom) }))
const customServices = computed(() => servicesDef.filter(svc => { const sel = selections.value[svc.id]; if (!sel) return false; return !!(svc.tiers[sel.tierIndex]?.custom) }))
const oneTimeServices = computed(() => servicesDef.filter(svc => { const sel = selections.value[svc.id]; if (!sel) return false; return !(svc.tiers[sel.tierIndex]?.custom) && getOneTimeTotal(svc) > 0 }))
const monthlyServices = computed(() => servicesDef.filter(svc => { const sel = selections.value[svc.id]; if (!sel) return false; return !!svc.mandatoryMonthly }))
const selectedCount = computed(() => Object.keys(selections.value).length)

const formatMXN = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 }).format(n)

const buildWhatsAppMessage = () => {
  const lines: string[] = ['Hola, me interesa una cotización formal de DASTI:']

  const otItems = servicesDef.filter(svc => { const sel = selections.value[svc.id]; if (!sel) return false; return !(svc.tiers[sel.tierIndex]?.custom) && getOneTimeTotal(svc) > 0 })
  const moItems = servicesDef.filter(svc => { const sel = selections.value[svc.id]; if (!sel) return false; return !!svc.mandatoryMonthly })
  const cuItems = servicesDef.filter(svc => { const sel = selections.value[svc.id]; if (!sel) return false; return !!(svc.tiers[sel.tierIndex]?.custom) })

  if (otItems.length > 0) {
    lines.push('\n— PAGO ÚNICO —')
    otItems.forEach(svc => {
      const sel = selections.value[svc.id]
      const tier = svc.tiers[sel.tierIndex]
      const qty = svc.hasQuantity ? ` (x${sel.quantity})` : ''
      const discount = svc.hasQuantity ? getEquipmentDiscount(sel.quantity) : 0
      const discountStr = discount > 0 ? ` [${(discount * 100).toFixed(0)}% desc. volumen]` : ''
      lines.push(`• ${svc.name}: ${tier.name}${qty}${discountStr} → ${formatMXN(getOneTimeTotal(svc))} MXN`)
    })
    lines.push(`Subtotal pago único: ${formatMXN(oneTimeTotal.value)} MXN`)
  }

  if (moItems.length > 0) {
    lines.push('\n— MENSUALIDAD —')
    moItems.forEach(svc => {
      const sel = selections.value[svc.id]
      const opt = svc.mandatoryMonthly![sel.monthlyOptionIndex ?? 0]
      lines.push(`• ${svc.name}: ${opt.name} → ${formatMXN(opt.price)} MXN/mes`)
    })
    lines.push(`Subtotal mensual: ${formatMXN(monthlyTotal.value)} MXN/mes`)
  }

  if (cuItems.length > 0) {
    lines.push('\n— A COTIZAR —')
    cuItems.forEach(svc => {
      const sel = selections.value[svc.id]
      const tier = svc.tiers[sel.tierIndex]
      lines.push(`• ${svc.name}: ${tier.name} → requiere cotización formal`)
    })
    lines.push('(El precio de estos servicios depende del alcance y requerimientos específicos)')
  }

  lines.push('\n¿Pueden enviarme una propuesta formal?')
  return lines.join('\n')
}

const openWhatsApp = () => {
  window.open(buildWhatsAppUrl(buildWhatsAppMessage()), '_blank', 'noopener,noreferrer')
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
  <section id="cotizador" class="relative py-24 overflow-hidden" style="background: var(--bg-base);">
    <div class="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
    <AnimatedParticles density="low" variant="minimal" :opacity="0.6" speed="slow" />
    <div class="orb w-[500px] h-[500px] top-1/2 left-0 -translate-y-1/2 opacity-10"
      style="background: var(--accent-glow);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- 4-step usage guide -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="flex flex-wrap items-center justify-center gap-2 mb-12"
      >
        <div
          v-for="(step, i) in [
            { n: '1', label: 'Selecciona servicios', color: '#3B82F6' },
            { n: '2', label: 'Ajusta cantidades', color: '#34D399' },
            { n: '3', label: 'Revisa la inversión', color: '#F472B6' },
            { n: '4', label: 'Envía por WhatsApp', color: '#FBBF24' },
          ]"
          :key="i"
          class="flex items-center gap-1.5"
        >
          <div
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            :style="`background: ${step.color}12; color: ${step.color}; border: 1px solid ${step.color}28;`"
          >
            <span
              class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              :style="`background: ${step.color};`"
            >{{ step.n }}</span>
            {{ step.label }}
          </div>
          <span v-if="i < 3" class="text-xs" style="color: var(--border-medium);">→</span>
        </div>
      </div>

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Cotizador aproximado</span>
        <h1 class="display-text text-3xl sm:text-4xl lg:text-5xl mb-5" style="color: var(--text-primary);">
          Cotizador aproximado
          <span class="gradient-text block">de servicios TI</span>
        </h1>
        <p class="text-lg max-w-2xl mx-auto" style="color: var(--text-secondary);">
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
            <h3 class="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style="color: var(--text-muted);">
              {{ catName }}
            </h3>

            <div class="space-y-2.5">
              <div
                v-for="svc in svcs"
                :key="svc.id"
                class="rounded-xl overflow-hidden transition-all duration-300"
                :style="`background: var(--bg-card); border: 1px solid ${isSelected(svc.id) ? svc.color + '45' : 'var(--border-subtle)'}; backdrop-filter: blur(12px); ${isSelected(svc.id) ? 'box-shadow: 0 0 20px ' + svc.color + '10;' : ''}`"
              >
                <!-- Toggle row -->
                <div
                  class="flex items-center gap-4 p-4 cursor-pointer group"
                  @click="toggleService(svc)"
                >
                  <div class="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                    <CheckSquare v-if="isSelected(svc.id)" :size="20" :style="`color: ${svc.color}`" />
                    <Square v-else :size="20" style="color: var(--text-muted);" />
                  </div>

                  <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    :style="`background: ${svc.color}15; border: 1px solid ${svc.color}30;`">
                    <component :is="svc.icon" :size="17" :style="`color: ${svc.color}`" />
                  </div>

                  <span class="font-medium flex-1 text-sm" style="color: var(--text-primary);">{{ svc.name }}</span>

                  <div class="text-right flex-shrink-0">
                    <template v-if="isSelected(svc.id) && !svc.tiers[selections[svc.id].tierIndex]?.custom">
                      <div class="text-sm font-semibold transition-all duration-300" :style="`color: ${svc.color}`">
                        {{ formatMXN(getOneTimeTotal(svc)) }}
                      </div>
                      <div v-if="svc.mandatoryMonthly" class="text-xs" :style="`color: ${svc.color}99`">
                        + {{ formatMXN(getMonthlyAmount(svc)) }}/mes
                      </div>
                      <div v-if="svc.hasQuantity && getEquipmentDiscount(selections[svc.id].quantity) > 0"
                        class="text-xs" style="color: #34D399;">
                        {{ getDiscountLabel(selections[svc.id].quantity) }}
                      </div>
                    </template>
                    <template v-else-if="!isSelected(svc.id)">
                      <div class="text-xs" style="color: var(--text-muted);">
                        desde {{ formatMXN(Math.min(...svc.tiers.filter(t => !t.custom).map(t => t.price))) }}
                      </div>
                    </template>
                  </div>

                  <div
                    v-if="isSelected(svc.id)"
                    @click.stop="expandedId = expandedId === svc.id ? null : svc.id"
                    class="flex-shrink-0 cursor-pointer transition-colors"
                    style="color: var(--text-muted);"
                  >
                    <ChevronDown v-if="expandedId !== svc.id" :size="16" />
                    <ChevronUp v-else :size="16" />
                  </div>
                </div>

                <!-- Service note collapsed -->
                <div v-if="svc.note && !isSelected(svc.id)" class="px-4 pb-3">
                  <p class="text-xs italic" style="color: var(--text-muted);">{{ svc.note }}</p>
                </div>

                <!-- Expanded options -->
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="opacity-0 -translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition-all duration-200"
                  leave-to-class="opacity-0"
                >
                  <div
                    v-if="isSelected(svc.id) && expandedId === svc.id"
                    class="px-4 pb-4 border-t"
                    style="border-color: var(--border-subtle);"
                  >
                    <!-- Note -->
                    <div v-if="svc.note" class="mt-3 flex items-start gap-2 p-2.5 rounded-lg mb-3"
                      :style="`background: ${svc.color}08; border: 1px solid ${svc.color}15;`">
                      <Info :size="13" class="flex-shrink-0 mt-0.5" :style="`color: ${svc.color};`" />
                      <p class="text-xs" style="color: var(--text-secondary);">{{ svc.note }}</p>
                    </div>

                    <p class="text-xs font-medium uppercase tracking-wider mt-3 mb-2" style="color: var(--text-muted);">
                      Tipo de servicio
                    </p>

                    <div class="space-y-2">
                      <div
                        v-for="(tier, idx) in svc.tiers"
                        :key="tier.name"
                        class="flex items-start justify-between gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                        :style="selections[svc.id]?.tierIndex === idx
                          ? `background: ${svc.color}10; border: 1px solid ${svc.color}35;`
                          : `background: var(--bg-elevated); border: 1px solid var(--border-subtle);`"
                        @click="setTier(svc.id, idx)"
                      >
                        <div class="flex items-start gap-2.5">
                          <div
                            class="w-4 h-4 rounded-full flex items-center justify-center border-2 flex-shrink-0 mt-0.5 transition-all"
                            :style="selections[svc.id]?.tierIndex === idx
                              ? `border-color: ${svc.color}; background: ${svc.color};`
                              : `border-color: var(--border-medium); background: transparent;`"
                          >
                            <div v-if="selections[svc.id]?.tierIndex === idx" class="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                          <div>
                            <span class="text-sm block" style="color: var(--text-primary);">{{ tier.name }}</span>
                            <span v-if="tier.note" class="text-xs block mt-0.5" style="color: var(--text-muted);">{{ tier.note }}</span>
                          </div>
                        </div>
                        <span
                          class="text-sm font-semibold flex-shrink-0"
                          :style="`color: ${tier.custom ? 'var(--text-muted)' : svc.color}`"
                        >
                          {{ tier.custom ? 'A cotizar' : formatMXN(tier.price) }}
                        </span>
                      </div>
                    </div>

                    <!-- Quantity (equipment) -->
                    <div v-if="svc.hasQuantity" class="mt-4">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-medium" style="color: var(--text-secondary);">Cantidad de equipos:</span>
                        <div v-if="getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) > 0"
                          class="flex items-center gap-1 text-xs font-medium" style="color: #34D399;">
                          <Tag :size="11" />
                          {{ getDiscountLabel(selections[svc.id]?.quantity ?? 1) }} por volumen
                        </div>
                      </div>

                      <div class="flex items-center gap-3">
                        <button
                          @click="adjustQty(svc.id, -1)"
                          aria-label="Reducir cantidad"
                          class="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                          style="border: 1px solid var(--border-medium); background: var(--bg-elevated); color: var(--text-muted);"
                        >
                          <Minus :size="14" />
                        </button>
                        <span class="w-10 text-center text-sm font-bold" style="color: var(--text-primary);">
                          {{ selections[svc.id]?.quantity ?? 1 }}
                        </span>
                        <button
                          @click="adjustQty(svc.id, 1)"
                          aria-label="Aumentar cantidad"
                          class="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                          style="border: 1px solid var(--border-medium); background: var(--bg-elevated); color: var(--text-muted);"
                        >
                          <Plus :size="14" />
                        </button>
                        <span class="text-xs" style="color: var(--text-muted);">equipo(s)</span>
                      </div>

                      <!-- Discount scale -->
                      <div class="mt-3 grid grid-cols-5 gap-1">
                        <div
                          v-for="(vol, i) in [
                            { range: '1-2', disc: 0 },
                            { range: '3-5', disc: 5 },
                            { range: '6-10', disc: 8 },
                            { range: '11-20', disc: 10 },
                            { range: '21+', disc: 15 },
                          ]"
                          :key="i"
                          class="text-center p-1.5 rounded-md text-xs transition-all"
                          :style="getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) * 100 === vol.disc
                            ? `background: ${svc.color}18; border: 1px solid ${svc.color}40; color: ${svc.color};`
                            : `background: var(--bg-elevated); border: 1px solid var(--border-subtle); color: var(--text-muted);`"
                        >
                          <div class="font-semibold">{{ vol.disc > 0 ? vol.disc + '%' : '—' }}</div>
                          <div class="text-xs opacity-70">{{ vol.range }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Mandatory monthly options -->
                    <div v-if="svc.mandatoryMonthly" class="mt-4">
                      <div class="flex items-start gap-2 p-2.5 rounded-lg mb-3"
                        :style="`background: ${svc.color}0A; border: 1px solid ${svc.color}25;`">
                        <Info :size="13" class="flex-shrink-0 mt-0.5" :style="`color: ${svc.color};`" />
                        <p class="text-xs" style="color: var(--text-secondary);">
                          La administración mensual es <strong>obligatoria</strong> con correos corporativos. Selecciona el plan que mejor se adapte.
                        </p>
                      </div>

                      <p class="text-xs font-medium uppercase tracking-wider mb-2" style="color: var(--text-muted);">
                        Administración mensual (obligatoria)
                      </p>

                      <div class="space-y-2">
                        <div
                          v-for="(opt, idx) in svc.mandatoryMonthly"
                          :key="opt.name"
                          class="flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                          :style="(selections[svc.id]?.monthlyOptionIndex ?? 0) === idx
                            ? `background: ${svc.color}10; border: 1px solid ${svc.color}35;`
                            : `background: var(--bg-elevated); border: 1px solid var(--border-subtle);`"
                          @click="setMonthlyOption(svc.id, idx)"
                        >
                          <div class="flex items-center gap-2.5">
                            <div
                              class="w-4 h-4 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all"
                              :style="(selections[svc.id]?.monthlyOptionIndex ?? 0) === idx
                                ? `border-color: ${svc.color}; background: ${svc.color};`
                                : `border-color: var(--border-medium); background: transparent;`"
                            >
                              <div v-if="(selections[svc.id]?.monthlyOptionIndex ?? 0) === idx" class="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                            <span class="text-sm" style="color: var(--text-primary);">{{ opt.name }}</span>
                          </div>
                          <span class="text-sm font-semibold flex-shrink-0" :style="`color: ${svc.color}`">
                            {{ formatMXN(opt.price) }}/mes
                          </span>
                        </div>
                      </div>
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
            class="rounded-2xl p-6 sticky top-24"
            style="background: var(--bg-card); border: 1px solid var(--border-medium); backdrop-filter: blur(20px);"
          >
            <h3 class="font-display font-bold text-lg mb-5" style="color: var(--text-primary);">Resumen estimado</h3>

            <!-- Empty state -->
            <div v-if="selectedCount === 0" class="text-center py-8">
              <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style="background: var(--bg-elevated); border: 1px solid var(--border-subtle);">
                <CheckSquare :size="20" style="color: var(--text-muted);" />
              </div>
              <p class="text-sm" style="color: var(--text-muted);">
                Selecciona los servicios que necesitas para ver la referencia.
              </p>
            </div>

            <!-- Summary sections -->
            <div v-else class="space-y-4 max-h-72 overflow-y-auto pr-1">

              <!-- Pago único -->
              <div v-if="oneTimeServices.length > 0">
                <p class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--text-muted);">Pago único</p>
                <div class="space-y-2.5">
                  <div v-for="svc in oneTimeServices" :key="svc.id" class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center"
                        :style="`background: ${svc.color}15;`">
                        <component :is="svc.icon" :size="11" :style="`color: ${svc.color}`" />
                      </div>
                      <div class="min-w-0">
                        <div class="text-xs truncate" style="color: var(--text-primary);">{{ svc.name }}</div>
                        <div class="text-xs truncate" style="color: var(--text-muted);">
                          {{ svc.tiers[selections[svc.id]?.tierIndex ?? 0]?.name }}
                          <span v-if="svc.hasQuantity"> × {{ selections[svc.id]?.quantity }}</span>
                        </div>
                        <div v-if="svc.hasQuantity && getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) > 0"
                          class="text-xs" style="color: #34D399;">
                          {{ getDiscountLabel(selections[svc.id]?.quantity ?? 1) }}
                        </div>
                      </div>
                    </div>
                    <span class="text-xs font-semibold flex-shrink-0" :style="`color: ${svc.color}`">
                      {{ formatMXN(getOneTimeTotal(svc)) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Mensualidad -->
              <div v-if="monthlyServices.length > 0">
                <p class="text-xs font-semibold uppercase tracking-wider mb-2 mt-1" style="color: var(--text-muted);">Mensualidad</p>
                <div class="space-y-2.5">
                  <div v-for="svc in monthlyServices" :key="svc.id" class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center"
                        :style="`background: ${svc.color}15;`">
                        <component :is="svc.icon" :size="11" :style="`color: ${svc.color}`" />
                      </div>
                      <div class="min-w-0">
                        <div class="text-xs truncate" style="color: var(--text-primary);">{{ svc.name }}</div>
                        <div class="text-xs truncate" style="color: var(--text-muted);">
                          {{ svc.mandatoryMonthly![selections[svc.id]?.monthlyOptionIndex ?? 0]?.name }}
                        </div>
                      </div>
                    </div>
                    <span class="text-xs font-semibold flex-shrink-0" :style="`color: ${svc.color}`">
                      {{ formatMXN(getMonthlyAmount(svc)) }}/mes
                    </span>
                  </div>
                </div>
              </div>

              <!-- A cotizar -->
              <div v-if="customServices.length > 0">
                <p class="text-xs font-semibold uppercase tracking-wider mb-2 mt-1" style="color: var(--text-muted);">A cotizar</p>
                <div class="space-y-2">
                  <div
                    v-for="svc in customServices"
                    :key="svc.id"
                    class="flex items-center justify-between gap-2 p-2 rounded-lg"
                    style="background: rgba(251,191,36,0.06); border: 1px solid rgba(251,191,36,0.18);"
                  >
                    <div class="flex items-center gap-2 min-w-0">
                      <component :is="svc.icon" :size="11" :style="`color: ${svc.color}`" class="flex-shrink-0" />
                      <span class="text-xs truncate" style="color: var(--text-secondary);">{{ svc.name }}</span>
                    </div>
                    <span class="text-xs font-medium flex-shrink-0" style="color: #FBBF24;">A cotizar</span>
                  </div>
                </div>
              </div>

            </div>

            <div v-if="selectedCount > 0" class="section-line my-5" />

            <!-- Totals -->
            <div v-if="selectedCount > 0" class="mb-5 space-y-4">
              <div v-if="oneTimeTotal > 0">
                <p class="text-xs uppercase tracking-wider mb-1" style="color: var(--text-muted);">Pago único estimado</p>
                <div class="text-3xl sm:text-4xl font-bold gradient-text leading-tight">
                  {{ formatMXN(oneTimeTotal) }}
                </div>
                <p class="text-xs mt-1" style="color: var(--text-muted);">MXN (referencia aproximada)</p>
              </div>

              <div v-if="monthlyTotal > 0" :class="oneTimeTotal > 0 ? 'pt-3 border-t' : ''" style="border-color: var(--border-subtle);">
                <p class="text-xs uppercase tracking-wider mb-1" style="color: var(--text-muted);">Mensualidad estimada</p>
                <div class="text-2xl font-bold leading-tight" style="color: var(--accent-lighter);">
                  {{ formatMXN(monthlyTotal) }}
                  <span class="text-sm font-normal" style="color: var(--text-muted);"> / mes</span>
                </div>
              </div>

              <div v-if="oneTimeTotal === 0 && monthlyTotal === 0"
                class="py-2 px-3 rounded-lg"
                style="background: rgba(251,191,36,0.06); border: 1px solid rgba(251,191,36,0.18);"
              >
                <p class="text-sm font-medium" style="color: #FBBF24;">Requiere cotización formal</p>
                <p class="text-xs mt-0.5" style="color: var(--text-muted);">Los servicios seleccionados se cotizan según alcance.</p>
              </div>
            </div>

            <!-- Disclaimer -->
            <div
              class="flex gap-2 p-3 rounded-xl mb-5"
              style="background: var(--bg-elevated); border: 1px solid var(--border-subtle);"
            >
              <Info :size="14" class="flex-shrink-0 mt-0.5" style="color: var(--text-muted);" />
              <p class="text-xs leading-relaxed" style="color: var(--text-muted);">
                <template v-if="selectedCount > 0 && hasCustom && oneTimeTotal > 0">
                  El total estimado no incluye los servicios marcados como
                  <strong style="color: #FBBF24;">A cotizar</strong>. Estos se definen según alcance.
                </template>
                <template v-else-if="selectedCount > 0 && hasCustom && oneTimeTotal === 0">
                  Los servicios seleccionados requieren cotización formal según alcance y requerimientos.
                </template>
                <template v-else>
                  Referencia aproximada. El precio final depende del alcance, licencias, equipos, ubicación y tiempos.
                </template>
              </p>
            </div>

            <!-- CTAs -->
            <div class="space-y-2.5">
              <button
                @click="openWhatsApp"
                :disabled="selectedCount === 0"
                class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-250"
                :style="selectedCount > 0
                  ? 'background: linear-gradient(135deg, #25D366, #128C7E); color: white; cursor: pointer; box-shadow: 0 4px 16px rgba(37,211,102,0.25);'
                  : 'background: var(--bg-elevated); color: var(--text-muted); cursor: not-allowed; opacity: 0.5;'"
              >
                <MessageCircle :size="16" />
                Solicitar cotización formal
              </button>
              <button
                @click="router.push('/contacto')"
                class="btn-ghost w-full justify-center text-sm"
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
