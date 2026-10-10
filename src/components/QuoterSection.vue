<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpRight, Check, ChevronDown, Info, Minus, Plus, Tag } from '@lucide/vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { buildWhatsAppUrl } from '@/config/contact'
import { servicesDef, getEquipmentDiscount, VOLUME_DISCOUNT_SCALE, type ServiceDef } from '@/data/quoter'

/*
 * Cotizador DASTI.
 * Catálogo, precios y descuentos: src/data/quoter.ts (sin cambios).
 * La lógica de selección, cálculo y mensaje de WhatsApp se conserva
 * idéntica a la versión anterior; el rediseño sólo afecta la interfaz.
 */

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

/* ── Sólo interfaz ── */
const guideSteps = [
  { n: '1', label: 'Selecciona servicios' },
  { n: '2', label: 'Ajusta cantidades' },
  { n: '3', label: 'Revisa la inversión' },
  { n: '4', label: 'Envía por WhatsApp' },
]
const guideStep = computed(() => (selectedCount.value === 0 ? 0 : 2))

const minPrice = (svc: ServiceDef) => Math.min(...svc.tiers.filter(t => !t.custom).map(t => t.price))
const toggleExpanded = (id: string) => {
  expandedId.value = expandedId.value === id ? null : id
}
const scrollToSummary = () => {
  document.getElementById('resumen')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section id="cotizador" class="pb-24 pt-[96px]" aria-labelledby="quoter-title">
    <!-- ─── Encabezado ─── -->
    <div class="shell grid gap-12 pb-14 pt-10 sm:pt-16 lg:grid-cols-12 lg:items-end lg:pb-20">
      <div class="lg:col-span-7">
        <p class="eyebrow animate-fade" style="--d: 80ms">Cotizador aproximado</p>
        <h1 id="quoter-title" class="display-1 mt-6 text-fg">
          <span class="line-mask"><span style="--d: 120ms">Cotizador aproximado</span></span>
          <span class="line-mask"><span style="--d: 220ms">de servicios <em class="serif font-normal text-accent">TI.</em></span></span>
        </h1>
        <p class="lead animate-rise mt-7 max-w-2xl" style="--d: 360ms">
          Calcula una referencia aproximada. Para una propuesta formal, revisamos el alcance, condiciones técnicas,
          licencias, equipos, ubicación y tiempos de entrega.
        </p>
      </div>

      <!-- Guía de uso -->
      <ol class="animate-rise grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-line bg-line lg:col-span-5" style="--d: 440ms" aria-label="Cómo usar el cotizador">
        <li
          v-for="(step, i) in guideSteps"
          :key="step.n"
          class="flex items-center gap-3 bg-paper p-4 transition-colors duration-500"
          :class="i <= guideStep ? '!bg-surface' : ''"
        >
          <span
            class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors duration-500"
            :class="i <= guideStep ? 'bg-accent text-white' : 'border border-line-2 text-fg-3'"
          >
            <Check v-if="i < guideStep" :size="14" />
            <template v-else>{{ step.n }}</template>
          </span>
          <span class="text-[0.85rem] font-medium" :class="i <= guideStep ? 'text-fg' : 'text-fg-3'">{{ step.label }}</span>
        </li>
      </ol>
    </div>

    <div class="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
      <!-- ─── Servicios por categoría ─── -->
      <div class="space-y-14 lg:col-span-8">
        <div v-for="(svcs, catName) in categories" :key="catName">
          <h2 class="eyebrow mb-5">{{ catName }}</h2>

          <div class="space-y-3">
            <article
              v-for="svc in svcs"
              :key="svc.id"
              class="overflow-hidden rounded-[24px] border bg-surface transition-[border-color,box-shadow] duration-300"
              :class="isSelected(svc.id) ? 'border-accent shadow-[0_0_0_3px_var(--c-accent-soft)]' : 'border-line hover:border-line-2'"
            >
              <!-- Fila principal -->
              <div class="flex items-stretch">
                <button
                  type="button"
                  class="flex flex-1 items-center gap-4 p-4 text-left sm:p-5"
                  :aria-pressed="isSelected(svc.id)"
                  :aria-label="`${isSelected(svc.id) ? 'Quitar' : 'Agregar'} ${svc.name}`"
                  @click="toggleService(svc)"
                >
                  <span
                    class="grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 transition-all duration-300"
                    :class="isSelected(svc.id) ? 'border-accent bg-accent text-white' : 'border-line-2 text-transparent'"
                  >
                    <Check :size="14" :stroke-width="3" />
                  </span>
                  <span
                    class="hidden h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 sm:grid"
                    :class="isSelected(svc.id) ? 'bg-accent-soft text-accent' : 'bg-paper text-fg-2'"
                  >
                    <component :is="svc.icon" :size="18" />
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block font-semibold text-fg">{{ svc.name }}</span>
                    <span v-if="isSelected(svc.id)" class="mt-0.5 block truncate text-xs text-fg-3">
                      {{ svc.tiers[selections[svc.id].tierIndex]?.name }}
                      <template v-if="svc.hasQuantity"> × {{ selections[svc.id].quantity }}</template>
                    </span>
                  </span>
                  <span class="shrink-0 text-right">
                    <template v-if="isSelected(svc.id) && !svc.tiers[selections[svc.id].tierIndex]?.custom">
                      <span class="tabular block text-sm font-semibold text-fg">{{ formatMXN(getOneTimeTotal(svc)) }}</span>
                      <span v-if="svc.mandatoryMonthly" class="tabular block text-xs text-accent">
                        + {{ formatMXN(getMonthlyAmount(svc)) }}/mes
                      </span>
                      <span
                        v-if="svc.hasQuantity && getEquipmentDiscount(selections[svc.id].quantity) > 0"
                        class="block text-xs font-medium text-emerald-600 dark:text-emerald-400"
                      >
                        {{ getDiscountLabel(selections[svc.id].quantity) }}
                      </span>
                    </template>
                    <span v-else-if="isSelected(svc.id)" class="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                      A cotizar
                    </span>
                    <span v-else class="tabular text-xs text-fg-3">desde {{ formatMXN(minPrice(svc)) }}</span>
                  </span>
                </button>
                <button
                  v-if="isSelected(svc.id)"
                  type="button"
                  class="grid w-12 shrink-0 place-items-center border-l border-line text-fg-3 transition-colors hover:text-fg sm:w-14"
                  :aria-expanded="expandedId === svc.id"
                  :aria-controls="`opts-${svc.id}`"
                  :aria-label="`${expandedId === svc.id ? 'Ocultar' : 'Mostrar'} opciones de ${svc.name}`"
                  @click="toggleExpanded(svc.id)"
                >
                  <ChevronDown :size="18" class="transition-transform duration-300" :class="expandedId === svc.id ? 'rotate-180' : ''" />
                </button>
              </div>

              <!-- Nota (no seleccionado) -->
              <p v-if="svc.note && !isSelected(svc.id)" class="-mt-1 px-5 pb-4 text-xs leading-relaxed text-fg-3 sm:pl-[4.75rem]">
                {{ svc.note }}
              </p>

              <!-- Opciones -->
              <div
                v-if="isSelected(svc.id)"
                :id="`opts-${svc.id}`"
                class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                :style="{ gridTemplateRows: expandedId === svc.id ? '1fr' : '0fr' }"
              >
                <div class="overflow-hidden">
                  <div class="border-t border-line bg-paper/60 p-4 sm:p-6">
                    <div v-if="svc.note" class="mb-5 flex items-start gap-2.5 rounded-2xl bg-accent-soft p-3.5">
                      <Info :size="15" class="mt-0.5 shrink-0 text-accent" />
                      <p class="text-xs leading-relaxed text-fg-2">{{ svc.note }}</p>
                    </div>

                    <p class="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">Tipo de servicio</p>
                    <div class="grid gap-2 sm:grid-cols-2" role="radiogroup" :aria-label="`Tipo de servicio: ${svc.name}`">
                      <button
                        v-for="(tier, idx) in svc.tiers"
                        :key="tier.name"
                        type="button"
                        role="radio"
                        :aria-checked="selections[svc.id]?.tierIndex === idx"
                        :tabindex="expandedId === svc.id ? 0 : -1"
                        class="flex items-start justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200"
                        :class="selections[svc.id]?.tierIndex === idx ? 'border-accent bg-surface shadow-[var(--shadow-soft)]' : 'border-line bg-surface/60 hover:border-line-2'"
                        @click="setTier(svc.id, idx)"
                      >
                        <span class="flex items-start gap-2.5">
                          <span
                            class="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition-colors"
                            :class="selections[svc.id]?.tierIndex === idx ? 'border-accent' : 'border-line-2'"
                          >
                            <span v-if="selections[svc.id]?.tierIndex === idx" class="h-1.5 w-1.5 rounded-full bg-accent" />
                          </span>
                          <span>
                            <span class="block text-sm text-fg">{{ tier.name }}</span>
                            <span v-if="tier.note" class="mt-0.5 block text-xs leading-snug text-fg-3">{{ tier.note }}</span>
                          </span>
                        </span>
                        <span class="tabular shrink-0 text-sm font-semibold" :class="tier.custom ? 'text-fg-3' : 'text-fg'">
                          {{ tier.custom ? 'A cotizar' : formatMXN(tier.price) }}
                        </span>
                      </button>
                    </div>

                    <!-- Cantidad (equipos) -->
                    <div v-if="svc.hasQuantity" class="mt-6">
                      <div class="mb-3 flex items-center justify-between gap-3">
                        <span class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">Cantidad de equipos</span>
                        <span
                          v-if="getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) > 0"
                          class="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                        >
                          <Tag :size="12" />
                          {{ getDiscountLabel(selections[svc.id]?.quantity ?? 1) }} por volumen
                        </span>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="flex items-center rounded-full border border-line-2 bg-surface p-1">
                          <button
                            type="button"
                            class="grid h-9 w-9 place-items-center rounded-full text-fg-2 transition-colors hover:bg-paper-2"
                            aria-label="Reducir cantidad"
                            :tabindex="expandedId === svc.id ? 0 : -1"
                            @click="adjustQty(svc.id, -1)"
                          >
                            <Minus :size="15" />
                          </button>
                          <span class="tabular w-10 text-center font-semibold text-fg" aria-live="polite">
                            {{ selections[svc.id]?.quantity ?? 1 }}
                          </span>
                          <button
                            type="button"
                            class="grid h-9 w-9 place-items-center rounded-full text-fg-2 transition-colors hover:bg-paper-2"
                            aria-label="Aumentar cantidad"
                            :tabindex="expandedId === svc.id ? 0 : -1"
                            @click="adjustQty(svc.id, 1)"
                          >
                            <Plus :size="15" />
                          </button>
                        </div>
                        <span class="text-xs text-fg-3">equipo(s)</span>
                      </div>

                      <!-- Escala de descuentos -->
                      <div class="mt-4 grid grid-cols-5 gap-1.5">
                        <div
                          v-for="vol in VOLUME_DISCOUNT_SCALE"
                          :key="vol.range"
                          class="rounded-xl border p-2 text-center text-xs transition-all duration-300"
                          :class="getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) * 100 === vol.disc
                            ? 'border-accent bg-accent text-white'
                            : 'border-line bg-surface text-fg-3'"
                        >
                          <div class="font-semibold">{{ vol.disc > 0 ? vol.disc + '%' : '—' }}</div>
                          <div class="mt-0.5 opacity-75">{{ vol.range }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Mensualidad obligatoria -->
                    <div v-if="svc.mandatoryMonthly" class="mt-6">
                      <div class="mb-4 flex items-start gap-2.5 rounded-2xl border border-accent/25 bg-accent-soft p-3.5">
                        <Info :size="15" class="mt-0.5 shrink-0 text-accent" />
                        <p class="text-xs leading-relaxed text-fg-2">
                          La administración mensual es <strong>obligatoria</strong> con correos corporativos. Selecciona el plan que mejor se adapte.
                        </p>
                      </div>
                      <p class="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">Administración mensual (obligatoria)</p>
                      <div class="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Administración mensual">
                        <button
                          v-for="(opt, idx) in svc.mandatoryMonthly"
                          :key="opt.name"
                          type="button"
                          role="radio"
                          :aria-checked="(selections[svc.id]?.monthlyOptionIndex ?? 0) === idx"
                          :tabindex="expandedId === svc.id ? 0 : -1"
                          class="flex items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200"
                          :class="(selections[svc.id]?.monthlyOptionIndex ?? 0) === idx ? 'border-accent bg-surface shadow-[var(--shadow-soft)]' : 'border-line bg-surface/60 hover:border-line-2'"
                          @click="setMonthlyOption(svc.id, idx)"
                        >
                          <span class="flex items-center gap-2.5">
                            <span
                              class="grid h-4 w-4 shrink-0 place-items-center rounded-full border-2"
                              :class="(selections[svc.id]?.monthlyOptionIndex ?? 0) === idx ? 'border-accent' : 'border-line-2'"
                            >
                              <span v-if="(selections[svc.id]?.monthlyOptionIndex ?? 0) === idx" class="h-1.5 w-1.5 rounded-full bg-accent" />
                            </span>
                            <span class="text-sm text-fg">{{ opt.name }}</span>
                          </span>
                          <span class="tabular shrink-0 text-sm font-semibold text-fg">{{ formatMXN(opt.price) }}/mes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- ─── Resumen ─── -->
      <aside id="resumen" class="lg:col-span-4" aria-labelledby="summary-title">
        <div class="on-ink grain relative overflow-hidden rounded-[30px] p-6 shadow-[var(--shadow-deep)] sm:p-7 lg:sticky lg:top-28">
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_100%_0%,rgba(37,99,235,0.35),transparent_70%)]" aria-hidden="true" />
          <div class="relative">
            <div class="flex items-center justify-between">
              <h3 id="summary-title" class="font-display text-lg font-semibold">Resumen estimado</h3>
              <span class="tabular rounded-full border border-ink-line px-2.5 py-1 text-xs text-on-ink-2">
                {{ selectedCount }} {{ selectedCount === 1 ? 'servicio' : 'servicios' }}
              </span>
            </div>

            <!-- Vacío -->
            <div v-if="selectedCount === 0" class="py-10 text-center">
              <div class="mx-auto grid h-14 w-14 place-items-center rounded-full border border-dashed border-white/25">
                <Plus :size="20" class="text-on-ink-3" />
              </div>
              <p class="mx-auto mt-4 max-w-[230px] text-sm text-on-ink-3">
                Selecciona los servicios que necesitas para ver la referencia.
              </p>
            </div>

            <!-- Detalle -->
            <div v-else class="mt-6 max-h-80 space-y-5 overflow-y-auto pr-1">
              <div v-if="oneTimeServices.length > 0">
                <p class="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-on-ink-3">Pago único</p>
                <ul class="space-y-2.5">
                  <li v-for="svc in oneTimeServices" :key="svc.id" class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <div class="truncate text-sm text-on-ink">{{ svc.name }}</div>
                      <div class="truncate text-xs text-on-ink-3">
                        {{ svc.tiers[selections[svc.id]?.tierIndex ?? 0]?.name }}
                        <span v-if="svc.hasQuantity"> × {{ selections[svc.id]?.quantity }}</span>
                      </div>
                      <div v-if="svc.hasQuantity && getEquipmentDiscount(selections[svc.id]?.quantity ?? 1) > 0" class="text-xs text-emerald-300">
                        {{ getDiscountLabel(selections[svc.id]?.quantity ?? 1) }}
                      </div>
                    </div>
                    <span class="tabular shrink-0 text-sm font-medium text-on-ink">{{ formatMXN(getOneTimeTotal(svc)) }}</span>
                  </li>
                </ul>
              </div>

              <div v-if="monthlyServices.length > 0">
                <p class="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-on-ink-3">Mensualidad</p>
                <ul class="space-y-2.5">
                  <li v-for="svc in monthlyServices" :key="svc.id" class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <div class="truncate text-sm text-on-ink">{{ svc.name }}</div>
                      <div class="truncate text-xs text-on-ink-3">
                        {{ svc.mandatoryMonthly![selections[svc.id]?.monthlyOptionIndex ?? 0]?.name }}
                      </div>
                    </div>
                    <span class="tabular shrink-0 text-sm font-medium text-on-ink">{{ formatMXN(getMonthlyAmount(svc)) }}/mes</span>
                  </li>
                </ul>
              </div>

              <div v-if="customServices.length > 0">
                <p class="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-on-ink-3">A cotizar</p>
                <ul class="space-y-2">
                  <li
                    v-for="svc in customServices"
                    :key="svc.id"
                    class="flex items-center justify-between gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-3 py-2"
                  >
                    <span class="truncate text-xs text-on-ink-2">{{ svc.name }}</span>
                    <span class="shrink-0 text-xs font-medium text-amber-300">A cotizar</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Totales -->
            <div v-if="selectedCount > 0" class="mt-6 space-y-4 border-t border-ink-line pt-6">
              <div v-if="oneTimeTotal > 0">
                <p class="text-[0.68rem] uppercase tracking-[0.16em] text-on-ink-3">Pago único estimado</p>
                <p class="tabular mt-1 font-display text-4xl font-semibold tracking-tight text-on-ink">{{ formatMXN(oneTimeTotal) }}</p>
                <p class="mt-1 text-xs text-on-ink-3">MXN (referencia aproximada)</p>
              </div>
              <div v-if="monthlyTotal > 0" :class="oneTimeTotal > 0 ? 'border-t border-ink-line pt-4' : ''">
                <p class="text-[0.68rem] uppercase tracking-[0.16em] text-on-ink-3">Mensualidad estimada</p>
                <p class="tabular mt-1 font-display text-2xl font-semibold text-signal">
                  {{ formatMXN(monthlyTotal) }} <span class="text-sm font-normal text-on-ink-3">/ mes</span>
                </p>
              </div>
              <div v-if="oneTimeTotal === 0 && monthlyTotal === 0" class="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-3 py-2.5">
                <p class="text-sm font-medium text-amber-300">Requiere cotización formal</p>
                <p class="mt-0.5 text-xs text-on-ink-3">Los servicios seleccionados se cotizan según alcance.</p>
              </div>
            </div>

            <!-- Aviso -->
            <div class="mt-6 flex gap-2.5 rounded-2xl bg-white/[0.05] p-3.5">
              <Info :size="14" class="mt-0.5 shrink-0 text-on-ink-3" />
              <p class="text-xs leading-relaxed text-on-ink-3">
                <template v-if="selectedCount > 0 && hasCustom && oneTimeTotal > 0">
                  El total estimado no incluye los servicios marcados como
                  <strong class="text-amber-300">A cotizar</strong>. Estos se definen según alcance.
                </template>
                <template v-else-if="selectedCount > 0 && hasCustom && oneTimeTotal === 0">
                  Los servicios seleccionados requieren cotización formal según alcance y requerimientos.
                </template>
                <template v-else>
                  Referencia aproximada. El precio final depende del alcance, licencias, equipos, ubicación y tiempos.
                </template>
              </p>
            </div>

            <!-- Acciones -->
            <div class="mt-6 space-y-2.5">
              <button type="button" class="btn btn-wa btn-block" :disabled="selectedCount === 0" @click="openWhatsApp">
                Solicitar cotización formal
                <span class="btn-orb"><WhatsAppIcon :size="16" /></span>
              </button>
              <RouterLink to="/contacto" class="btn btn-ghost-ink btn-block">
                Formulario de contacto
                <span class="btn-orb"><ArrowUpRight :size="16" /></span>
              </RouterLink>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- ─── Barra móvil ─── -->
    <Transition
      enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="translate-y-full opacity-0"
      leave-active-class="transition duration-300"
      leave-to-class="translate-y-full opacity-0"
    >
      <div v-if="selectedCount > 0" class="fixed inset-x-3 bottom-3 z-40 lg:hidden">
        <div class="on-ink flex items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2 shadow-[var(--shadow-deep)]">
          <div class="min-w-0">
            <p class="text-[0.68rem] text-on-ink-3">{{ selectedCount }} {{ selectedCount === 1 ? 'servicio' : 'servicios' }}</p>
            <p class="tabular truncate text-sm font-semibold">
              <template v-if="oneTimeTotal > 0">{{ formatMXN(oneTimeTotal) }}</template>
              <template v-if="monthlyTotal > 0">{{ oneTimeTotal > 0 ? ' + ' : '' }}{{ formatMXN(monthlyTotal) }}/mes</template>
              <template v-if="oneTimeTotal === 0 && monthlyTotal === 0">A cotizar</template>
            </p>
          </div>
          <button type="button" class="btn btn-light btn-sm" @click="scrollToSummary">
            Ver resumen
            <span class="btn-orb"><ChevronDown :size="14" /></span>
          </button>
        </div>
      </div>
    </Transition>
  </section>
</template>
