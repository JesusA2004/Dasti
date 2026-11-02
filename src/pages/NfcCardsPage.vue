<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUpRight,
  Banknote,
  Building2,
  Check,
  CreditCard,
  Gift,
  Info,
  MapPin,
  QrCode,
  ReceiptText,
  Smartphone,
  Shuffle,
  Truck,
  Wallet,
} from '@lucide/vue'
import NfcCardVisual from '@/components/products/NfcCardVisual.vue'
import NfcComboMixer from '@/components/products/NfcComboMixer.vue'
import NfcDesignCatalog from '@/components/products/NfcDesignCatalog.vue'
import NfcLinkManager from '@/components/products/NfcLinkManager.vue'
import NfcModeOptions from '@/components/products/NfcModeOptions.vue'
import NfcPhoneMock from '@/components/products/NfcPhoneMock.vue'
import NfcStandVisual from '@/components/products/NfcStandVisual.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import FaqList from '@/components/ui/FaqList.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { useSectionProgress } from '@/composables/useSectionProgress'
import { formatMXN } from '@/utils/format'
import {
  NFC_COMBOS_FROM,
  NFC_COMBOS_INTRO,
  NFC_COMBOS_NOTE,
  NFC_DESIGN_CONDITIONS,
  NFC_PRICING,
  NFC_STAND,
  nfcCardTypes,
  nfcCombos,
  nfcEnterprise,
  nfcFaq,
  nfcImages,
  nfcIndividual,
  nfcMessageUrl,
  nfcOrderMessage,
  nfcShipping,
  nfcStandLabel,
  nfcSteps,
  nfcWhatsAppUrl,
  type NfcDesignMode,
} from '@/data/nfc'
import { NFC_CATALOG_COPY, nfcCatalogCategories } from '@/data/nfcCatalog'
import { PAYMENT_PAGE_ROUTE, paymentShortLabels } from '@/data/payments'

/* ── Tipos de tarjeta (pestañas accesibles) ── */
const activeType = ref(0)
const current = computed(() => nfcCardTypes[activeType.value])
const tabRefs = ref<HTMLButtonElement[]>([])
const finishes = ['midnight', 'electric', 'pearl', 'midnight'] as const

const onTabKeydown = async (e: KeyboardEvent) => {
  const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End']
  if (!keys.includes(e.key)) return
  e.preventDefault()
  const last = nfcCardTypes.length - 1
  if (e.key === 'Home') activeType.value = 0
  else if (e.key === 'End') activeType.value = last
  else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') activeType.value = activeType.value === last ? 0 : activeType.value + 1
  else activeType.value = activeType.value === 0 ? last : activeType.value - 1
  await nextTick()
  tabRefs.value.find((el) => el.dataset.index === String(activeType.value))?.focus()
}

/* ── Proceso con progreso ligado al scroll ── */
const stepsRef = ref<HTMLElement>()
const stepsProgress = useSectionProgress(stepsRef, 0.8, 0.5)

/* ── Precios (MXN, IVA incluido) ── */
const mxn = (n: number) => `${formatMXN(n)} ${NFC_PRICING.currency}`

const generalWhatsApp = nfcWhatsAppUrl()

/* Modalidad de diseño seleccionada por producto (por defecto: Lista para usar). */
const selectedMode = reactive<Record<string, NfcDesignMode>>(
  Object.fromEntries([nfcIndividual, ...nfcCombos].map((p) => [p.id, 'lista' as NfcDesignMode])),
)
const orderUrl = (product: Parameters<typeof nfcOrderMessage>[0] & { id: string }) =>
  nfcMessageUrl(nfcOrderMessage(product, selectedMode[product.id] ?? 'lista'))
const enterpriseWhatsApp = nfcMessageUrl(nfcEnterprise.message)

const paymentIcons = [Banknote, ArrowLeftRight, CreditCard, CreditCard] as const

const shippingIcons = { local: MapPin, nacional: Truck, costo: Wallet, factura: ReceiptText } as const

const highlights = [
  { icon: Smartphone, title: 'Un toque', desc: 'Lectura por NFC en smartphones compatibles.' },
  { icon: QrCode, title: 'QR en el reverso', desc: 'Personalizado para tu negocio, para cualquier cámara.' },
  { icon: Gift, title: 'Lista para exhibir', desc: 'Cada tarjeta incluye su soporte de madera.' },
]

/* Dos caras, un mismo destino (sección «Cómo funciona») */
const faces = [
  { id: 'front', icon: Smartphone, title: 'Frente · NFC', desc: 'Tu diseño con la tecnología NFC integrada. Basta con acercar un smartphone compatible.' },
  { id: 'back', icon: QrCode, title: 'Reverso · QR', desc: 'Un código QR personalizado para tu negocio, para teléfonos sin NFC activo.' },
  { id: 'same', icon: Shuffle, title: 'Un mismo destino', desc: 'NFC y QR abren el destino digital configurado para esa tarjeta.' },
]

const catalogFunctions = nfcCatalogCategories.map((c) => c.name).join(', ')

const scrollToHow = () => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <div class="pt-[84px] sm:pt-[92px]">
    <!-- ─── Hero de producto ─── -->
    <section class="stage on-ink grain" aria-labelledby="nfc-title">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_40%,rgba(37,99,235,0.42),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgba(142,197,255,0.12),transparent_70%)]" />
        <div class="tech-grid absolute inset-0 opacity-60" />
      </div>

      <div class="shell relative grid min-h-[calc(100svh-110px)] items-center gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div class="lg:col-span-6">
          <p class="animate-fade flex items-center gap-2 text-sm text-on-ink-2" style="--d: 80ms">
            <RouterLink to="/productos" class="link-u hover:text-on-ink">Productos</RouterLink>
            <span class="text-on-ink-3">/</span>
            <span class="text-on-ink">Tarjetas NFC</span>
          </p>
          <h1 id="nfc-title" class="display-1 mt-8 text-on-ink">
            <span class="line-mask"><span style="--d: 140ms">Tarjetas</span></span>
            <span class="line-mask"><span style="--d: 240ms">inteligentes.</span></span>
            <span class="line-mask"><span style="--d: 340ms" class="serif text-signal">Conexiones inmediatas.</span></span>
          </h1>
          <p class="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-on-ink-2" style="--d: 460ms">
            Comparte tu información digital con un solo toque mediante tecnología NFC, o a través de su código QR.
            Diseñadas, preparadas y programadas por DASTI.
          </p>
          <div class="animate-rise mt-10 flex flex-wrap gap-3" style="--d: 560ms">
            <a :href="generalWhatsApp" target="_blank" rel="noopener noreferrer" class="btn btn-light">
              Solicitar cotización
              <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
            </a>
            <button type="button" class="btn btn-ghost-ink" @click="scrollToHow">
              Cómo funciona
              <span class="btn-orb"><ArrowDown :size="15" /></span>
            </button>
          </div>
        </div>

        <!-- Visual -->
        <div class="relative lg:col-span-6">
          <div v-if="nfcImages.hero.src" class="animate-fade aspect-[4/5] overflow-hidden rounded-[32px]" style="--d: 200ms">
            <MediaFrame :src="nfcImages.hero.src" :alt="nfcImages.hero.alt" eager />
          </div>
          <div v-else class="animate-fade mx-auto w-full max-w-[560px]" style="--d: 200ms">
            <!-- Frente (diseño + NFC), reverso (QR) y teléfono como contexto -->
            <div class="relative aspect-square w-full">
              <div class="absolute right-[2%] top-0 w-[38%] rotate-[7deg]">
                <NfcPhoneMock type="presentacion" />
              </div>
              <div class="absolute left-[4%] top-[6%] w-[42%]">
                <NfcCardVisual label="Presentación digital" />
              </div>
              <div class="absolute bottom-[3%] right-[16%] w-[33%] rotate-[5deg]">
                <NfcCardVisual label="Presentación digital" side="back" finish="pearl" :interactive="false" :waves="false" />
              </div>
            </div>
            <ul class="mt-10 flex flex-wrap justify-center gap-2" aria-label="Partes de la tarjeta">
              <li class="chip chip-ink">Frente · tu diseño + NFC</li>
              <li class="chip chip-ink">Reverso · QR personalizado</li>
              <li class="chip chip-ink">Mismo destino</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Puntos clave -->
      <div class="relative border-t border-ink-line">
        <ul class="shell grid gap-6 py-8 sm:grid-cols-3">
          <li v-for="h in highlights" :key="h.title" class="flex items-start gap-4">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line text-signal">
              <component :is="h.icon" :size="17" />
            </span>
            <span>
              <span class="block text-sm font-semibold text-on-ink">{{ h.title }}</span>
              <span class="mt-0.5 block text-[0.82rem] text-on-ink-3">{{ h.desc }}</span>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ─── Cómo funciona ─── -->
    <section id="como-funciona" ref="stepsRef" class="section" aria-labelledby="how-title">
      <div class="shell">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p v-reveal="'fade'" class="eyebrow">Cómo funciona</p>
            <h2 id="how-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
              De la idea a tu tarjeta, <span class="serif">en cinco pasos.</span>
            </h2>
          </div>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead lg:col-span-5">
            Tú decides qué compartir; nosotros nos encargamos de prepararla y programarla.
          </p>
        </div>

        <div class="relative mt-16">
          <!-- Línea de progreso (escritorio) -->
          <div class="absolute left-0 right-0 top-6 hidden h-px bg-line-2 lg:block" aria-hidden="true">
            <div class="h-full origin-left bg-accent" :style="{ transform: `scaleX(${stepsProgress})` }" />
          </div>
          <ol class="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <li v-for="(s, i) in nfcSteps" :key="s.n" v-reveal="{ variant: 'up', delay: i * 90 }" class="relative">
              <span
                class="relative z-10 grid h-12 w-12 place-items-center rounded-full border text-sm font-semibold transition-colors duration-500"
                :class="stepsProgress >= i / (nfcSteps.length - 1) - 0.02 ? 'border-accent bg-accent text-white' : 'border-line-2 bg-paper text-fg-3'"
              >
                {{ s.n }}
              </span>
              <h3 class="title-4 mt-6 text-fg">{{ s.title }}</h3>
              <p class="mt-2 text-[0.93rem] leading-relaxed text-fg-2">{{ s.desc }}</p>
            </li>
          </ol>
        </div>

        <!-- Dos caras, un mismo destino -->
        <div class="mt-16 grid items-center gap-10 rounded-[30px] border border-line p-6 sm:p-9 lg:grid-cols-12">
          <div class="mx-auto w-full max-w-[220px] lg:col-span-3">
            <NfcCardVisual label="Tu diseño" finish="electric" flippable class="text-fg" />
          </div>
          <ul class="grid gap-6 sm:grid-cols-3 lg:col-span-9">
            <li v-for="(f, i) in faces" :key="f.id" v-reveal="{ variant: 'up', delay: i * 90 }">
              <span class="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                <component :is="f.icon" :size="17" />
              </span>
              <h3 class="title-4 mt-5 text-fg">{{ f.title }}</h3>
              <p class="mt-2 text-[0.93rem] leading-relaxed text-fg-2">{{ f.desc }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ─── Tipos de tarjetas ─── -->
    <section class="stage bg-sky" aria-labelledby="types-title">
      <div class="shell section">
        <p v-reveal="'fade'" class="eyebrow">Tipos de tarjetas</p>
        <h2 id="types-title" v-reveal="'clip'" class="display-2 mt-5 max-w-3xl text-fg">
          Una tarjeta para <span class="serif">cada forma</span> de conectar.
        </h2>

        <div class="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <!-- Pestañas -->
          <div class="lg:col-span-4">
            <div
              class="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
              role="tablist"
              aria-label="Tipos de tarjeta NFC"
              aria-orientation="vertical"
              @keydown="onTabKeydown"
            >
              <button
                v-for="(t, i) in nfcCardTypes"
                :id="`tab-${t.id}`"
                :key="t.id"
                ref="tabRefs"
                :data-index="i"
                type="button"
                role="tab"
                :aria-selected="activeType === i"
                :aria-controls="`panel-${t.id}`"
                :tabindex="activeType === i ? 0 : -1"
                class="group flex shrink-0 items-center gap-4 rounded-[20px] border p-4 text-left transition-all duration-300 lg:p-5"
                :class="activeType === i ? 'border-transparent bg-surface shadow-[var(--shadow-float)]' : 'border-line-2 hover:bg-surface/60'"
                @click="activeType = i"
              >
                <span class="tabular text-sm" :class="activeType === i ? 'text-accent' : 'text-fg-3'">0{{ i + 1 }}</span>
                <span class="font-semibold text-fg">{{ t.short }}</span>
                <ArrowUpRight
                  :size="16"
                  class="ml-auto hidden transition-all duration-300 lg:block"
                  :class="activeType === i ? 'text-accent' : 'text-fg-3 opacity-0 group-hover:opacity-100'"
                />
              </button>
            </div>
          </div>

          <!-- Panel -->
          <div
            :id="`panel-${current.id}`"
            role="tabpanel"
            :aria-labelledby="`tab-${current.id}`"
            class="grid gap-10 lg:col-span-8 md:grid-cols-2 md:items-center"
          >
            <div class="relative flex min-h-[380px] items-center justify-center md:order-2">
              <div class="w-[48%] max-w-[220px]">
                <NfcPhoneMock :type="current.id" />
              </div>
              <div class="absolute bottom-10 left-[4%] w-[34%] max-w-[160px] -rotate-6">
                <NfcCardVisual :label="current.short" :finish="finishes[activeType]" :waves="false" />
              </div>
            </div>

            <Transition
              mode="out-in"
              enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              enter-from-class="opacity-0 translate-y-3"
              leave-active-class="transition duration-150"
              leave-to-class="opacity-0"
            >
              <div :key="current.id">
                <h3 class="display-3 text-fg">{{ current.name }}</h3>
                <p class="mt-4 leading-relaxed text-fg-2">{{ current.description }}</p>
                <dl class="mt-7 space-y-5">
                  <div>
                    <dt class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">Destino</dt>
                    <dd class="mt-1 font-medium text-fg">{{ current.destination }}</dd>
                  </div>
                  <div>
                    <dt class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">Usos frecuentes</dt>
                    <dd class="mt-2 flex flex-wrap gap-1.5">
                      <span v-for="u in current.uses" :key="u" class="chip bg-surface/70">{{ u }}</span>
                    </dd>
                  </div>
                </dl>
                <a :href="nfcWhatsAppUrl(current.name)" target="_blank" rel="noopener noreferrer" class="btn btn-ink mt-8">
                  Cotizar esta tarjeta
                  <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
                </a>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Administración de enlaces (propuesta de valor) ─── -->
    <NfcLinkManager />

    <!-- ─── Catálogo de diseños ─── -->
    <section id="catalogo" class="section" aria-labelledby="designs-title">
      <div class="shell">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p v-reveal="'fade'" class="eyebrow">Catálogo de diseños</p>
            <h2 id="designs-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
              Diseños listos para usar, <span class="serif">para cada objetivo.</span>
            </h2>
          </div>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead lg:col-span-5">
            {{ NFC_CATALOG_COPY.qrNote }} Son los diseños de la modalidad «Lista para usar».
          </p>
        </div>
        <div v-reveal="'up'" class="mt-12">
          <NfcDesignCatalog />
        </div>
      </div>
    </section>

    <!-- ─── Precios: tarjeta individual, combos y Plan Empresarial ─── -->
    <section id="paquetes" class="section border-t border-line" aria-labelledby="packages-title">
      <div class="shell">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p v-reveal="'fade'" class="eyebrow">Precios</p>
            <h2 id="packages-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
              Elige cómo <span class="serif">empezar.</span>
            </h2>
          </div>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead lg:col-span-5">
            Una tarjeta, un combo o el Plan Empresarial. Cada tarjeta incluye su propio soporte de madera.
            {{ NFC_PRICING.policyNote }} Precios en {{ NFC_PRICING.currency }}.
          </p>
        </div>

        <!-- Tarjeta individual -->
        <article
          v-reveal="'up'"
          class="card mt-14 grid gap-10 rounded-[30px] p-7 sm:p-10 lg:grid-cols-12 lg:gap-12"
          aria-labelledby="individual-title"
        >
          <div class="lg:col-span-5">
            <span class="rounded-full bg-paper-2 px-2.5 py-1 text-[0.68rem] font-semibold text-fg-2">{{ nfcIndividual.quantityLabel }}</span>
            <h3 id="individual-title" class="display-3 mt-5 text-fg">{{ nfcIndividual.name }}</h3>
            <p class="mt-6 text-sm text-fg-3">Desde</p>
            <p class="font-display text-[2.4rem] font-semibold leading-none tracking-tight text-fg">
              {{ mxn(nfcIndividual.fromPrice) }}
            </p>
            <p class="mt-2 text-xs text-fg-3">{{ nfcIndividual.subtitle }}</p>
            <ul class="mt-7 space-y-2.5">
              <li v-for="f in nfcIndividual.includes" :key="f" class="flex items-start gap-2.5 text-sm">
                <Check :size="16" class="mt-0.5 shrink-0 text-accent" />
                <span class="text-fg-2">{{ f }}</span>
              </li>
            </ul>
            <p class="stand-pill mt-6">
              <Gift :size="15" aria-hidden="true" />
              <span><strong>{{ nfcStandLabel(nfcIndividual.cards) }}</strong> · {{ NFC_STAND.costLabel }}</span>
            </p>
            <a
              :href="orderUrl(nfcIndividual)"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-ink mt-8"
              aria-label="Pedir la tarjeta individual en la modalidad seleccionada por WhatsApp"
            >
              Hacer mi pedido
              <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
            </a>
          </div>

          <div class="lg:col-span-7">
            <p class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">Elige tu modalidad</p>
            <NfcModeOptions
              v-model="selectedMode[nfcIndividual.id]"
              class="mt-4"
              :name="`modo-${nfcIndividual.id}`"
              :product-name="nfcIndividual.name"
              :prices="nfcIndividual.prices"
              :conditions="NFC_DESIGN_CONDITIONS.individual"
              size="lg"
            />
          </div>
        </article>

        <!-- Combos más vendidos -->
        <div class="mt-20 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 v-reveal="'clip'" class="display-3 text-fg">{{ NFC_COMBOS_INTRO.title }}</h3>
            <p v-reveal="'fade'" class="mt-3 text-sm text-fg-2">{{ NFC_COMBOS_INTRO.subtitle }}</p>
          </div>
          <p v-reveal="'fade'" class="text-sm text-fg-3">
            Desde <span class="font-semibold text-fg">{{ mxn(NFC_COMBOS_FROM) }}</span> · {{ NFC_PRICING.vatLabel }}
          </p>
        </div>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="(combo, i) in nfcCombos"
            :key="combo.id"
            v-reveal="{ variant: 'up', delay: i * 90 }"
            class="card relative flex flex-col overflow-hidden rounded-[30px] p-7"
          >
            <div class="relative flex h-full flex-col">
              <div class="flex items-start justify-between gap-3">
                <h4 class="title-4 text-fg">{{ combo.name }}</h4>
                <span class="shrink-0 rounded-full bg-paper-2 px-2.5 py-1 text-[0.68rem] font-semibold text-fg-2">
                  {{ combo.cards }} tarjetas
                </span>
              </div>

              <div class="mt-6 border-y border-line py-5">
                <NfcModeOptions
                  v-model="selectedMode[combo.id]"
                  :name="`modo-${combo.id}`"
                  :product-name="combo.name"
                  :prices="combo.prices"
                />
                <p class="mt-3 text-xs text-fg-3">{{ NFC_PRICING.currency }} · {{ NFC_PRICING.vatLabel }}</p>
              </div>

              <p class="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">Incluye</p>
              <ul class="mt-3 space-y-2">
                <li v-for="f in combo.includes" :key="f" class="flex items-start gap-2.5 text-sm">
                  <Check :size="16" class="mt-0.5 shrink-0 text-accent" />
                  <span class="text-fg-2">{{ f }}</span>
                </li>
              </ul>

              <div class="mt-5 space-y-2">
                <p class="flex items-start gap-2 text-[0.82rem] text-fg-2">
                  <Shuffle :size="14" class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span><strong class="font-semibold text-fg">{{ combo.cards }} funciones</strong>, iguales o diferentes</span>
                </p>
                <p class="stand-pill">
                  <Gift :size="14" aria-hidden="true" />
                  <span><strong>{{ combo.cards }} soportes de madera</strong> · uno por tarjeta</span>
                </p>
              </div>

              <div class="mt-auto pt-7">
                <a
                  :href="orderUrl(combo)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-ink btn-block"
                  :aria-label="`Pedir ${combo.name} en la modalidad seleccionada por WhatsApp`"
                >
                  Pedir combo
                  <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
                </a>
              </div>
            </div>
          </article>

          <!-- Plan Empresarial (destacado) -->
          <article
            v-reveal="{ variant: 'up', delay: nfcCombos.length * 90 }"
            class="on-ink grain relative flex flex-col overflow-hidden rounded-[30px] p-7 shadow-[var(--shadow-deep)]"
            aria-labelledby="enterprise-title"
          >
            <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_0%,rgba(37,99,235,0.4),transparent_70%)]" aria-hidden="true" />
            <div class="relative flex h-full flex-col">
              <div class="flex items-start justify-between gap-3">
                <h4 id="enterprise-title" class="title-4 text-on-ink">{{ nfcEnterprise.name }}</h4>
                <span class="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[0.68rem] font-semibold text-on-ink-2">
                  {{ nfcEnterprise.quantityLabel }}
                </span>
              </div>

              <div class="mt-6 border-y border-ink-line py-5">
                <span class="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-signal">
                  <Building2 :size="17" />
                </span>
                <p class="mt-4 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-on-ink">
                  {{ nfcEnterprise.priceLabel }}
                </p>
                <p class="mt-1 text-sm text-on-ink-2">{{ nfcEnterprise.tagline }}</p>
              </div>

              <p class="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-on-ink-3">Incluye</p>
              <ul class="mt-3 space-y-2">
                <li v-for="f in nfcEnterprise.includes" :key="f" class="flex items-start gap-2.5 text-sm">
                  <Check :size="16" class="mt-0.5 shrink-0 text-signal" />
                  <span class="text-on-ink-2">{{ f }}</span>
                </li>
              </ul>

              <div class="mt-5 space-y-2">
                <p class="flex items-start gap-2 text-[0.82rem] text-on-ink-2">
                  <Shuffle :size="14" class="mt-0.5 shrink-0 text-signal" aria-hidden="true" />
                  <span>La combinación de funciones que necesite tu empresa</span>
                </p>
                <p class="stand-pill is-ink">
                  <Gift :size="14" aria-hidden="true" />
                  <span><strong>{{ NFC_STAND.enterpriseLabel }}</strong></span>
                </p>
              </div>

              <div class="mt-auto pt-7">
                <a :href="enterpriseWhatsApp" target="_blank" rel="noopener noreferrer" class="btn btn-light btn-block">
                  Solicitar cotización
                  <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
                </a>
              </div>
            </div>
          </article>
        </div>

        <!-- Condición general de los combos y condiciones de diseño -->
        <div v-reveal="'up'" class="mt-6 grid gap-5 rounded-[22px] border border-line bg-paper-2 p-5 sm:p-6 lg:grid-cols-12">
          <div class="flex items-start gap-3 lg:col-span-5">
            <Info :size="18" class="mt-0.5 shrink-0 text-accent" />
            <p class="text-sm leading-relaxed text-fg-2">
              <span class="font-semibold text-fg">{{ NFC_COMBOS_NOTE.included }}</span>
              {{ NFC_COMBOS_NOTE.excluded }}
            </p>
          </div>
          <dl class="grid gap-4 text-sm sm:grid-cols-2 lg:col-span-7">
            <div>
              <dt class="font-semibold text-fg">Imprimimos tu diseño</dt>
              <dd class="mt-1 leading-relaxed text-fg-2">{{ NFC_DESIGN_CONDITIONS.combos.imprimimos }}</dd>
            </div>
            <div>
              <dt class="font-semibold text-fg">Diseñamos para ti</dt>
              <dd class="mt-1 leading-relaxed text-fg-2">{{ NFC_DESIGN_CONDITIONS.combos.disenamos }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- ─── Combina funciones + soporte de madera ─── -->
    <section id="combina" class="stage bg-sky" aria-labelledby="mix-title">
      <div class="shell section">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p v-reveal="'fade'" class="eyebrow">Diferentes funciones, un solo combo</p>
            <h2 id="mix-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
              Combina tus tarjetas <span class="serif">como quieras.</span>
            </h2>
          </div>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead lg:col-span-5">
            Tú eliges a dónde dirige cada tarjeta. Repite una función o mezcla varias ({{ catalogFunctions }}) según la
            cantidad de tarjetas de tu combo.
          </p>
        </div>

        <div v-reveal="'up'" class="mt-12">
          <NfcComboMixer />
        </div>

        <!-- Soporte de madera -->
        <div class="mt-20 grid items-center gap-12 rounded-[30px] bg-surface/80 p-7 sm:p-10 lg:grid-cols-12">
          <div v-reveal="'scale'" class="lg:col-span-4">
            <NfcStandVisual />
          </div>
          <div class="lg:col-span-8">
            <p v-reveal="'fade'" class="eyebrow">{{ NFC_STAND.title }}</p>
            <h3 id="stand-title" v-reveal="'clip'" class="display-3 mt-4 text-fg">
              Lista para exhibir, <span class="serif">desde el primer día.</span>
            </h3>
            <p v-reveal="{ variant: 'up', delay: 80 }" class="mt-4 max-w-2xl leading-relaxed text-fg-2">
              {{ NFC_STAND.headline }} {{ NFC_STAND.description }}
            </p>
            <ul v-reveal="{ variant: 'up', delay: 140 }" class="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-4" aria-label="Soportes incluidos por producto">
              <li class="bg-surface p-4">
                <p class="text-xs text-fg-3">{{ nfcIndividual.name }}</p>
                <p class="mt-1 font-display text-lg font-semibold tracking-tight text-fg">{{ nfcIndividual.cards }} soporte</p>
              </li>
              <li v-for="c in nfcCombos" :key="c.id" class="bg-surface p-4">
                <p class="text-xs text-fg-3">{{ c.name }}</p>
                <p class="mt-1 font-display text-lg font-semibold tracking-tight text-fg">{{ c.cards }} soportes</p>
              </li>
            </ul>
            <p class="mt-4 text-sm text-fg-3">
              {{ nfcEnterprise.name }}: {{ NFC_STAND.enterpriseLabel.toLowerCase() }}. {{ NFC_STAND.costLabel }}.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Envíos y cobertura ─── -->
    <section aria-labelledby="shipping-title">
      <div class="shell section-sm">
        <p v-reveal="'fade'" class="eyebrow">Envíos, facturación y pagos</p>
        <h2 id="shipping-title" v-reveal="'clip'" class="display-3 mt-4 text-fg">
          Te las llevamos <span class="serif">a donde estés.</span>
        </h2>
        <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="(item, i) in nfcShipping"
            :key="item.id"
            v-reveal="{ variant: 'up', delay: i * 80 }"
            class="flex items-start gap-4 rounded-[22px] border border-line bg-surface p-5"
          >
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-white">
              <component :is="shippingIcons[item.id]" :size="17" />
            </span>
            <span>
              <span class="block text-sm font-semibold text-fg">{{ item.title }}</span>
              <span class="mt-0.5 block text-[0.82rem] leading-snug text-fg-2">{{ item.desc }}</span>
            </span>
          </li>
        </ul>

        <!-- Métodos de pago (DASTI) -->
        <div
          v-reveal="'up'"
          class="mt-6 flex flex-col gap-6 rounded-[24px] border border-line p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between"
          aria-labelledby="nfc-pay-title"
          role="group"
        >
          <div class="flex items-start gap-4">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Wallet :size="17" />
            </span>
            <div>
              <h3 id="nfc-pay-title" class="title-4 text-fg">Paga como prefieras</h3>
              <ul class="mt-3 flex flex-wrap gap-1.5" aria-label="Métodos de pago aceptados">
                <li v-for="(label, i) in paymentShortLabels" :key="label" class="chip inline-flex items-center gap-1.5">
                  <component :is="paymentIcons[i]" :size="13" class="text-accent" aria-hidden="true" />
                  {{ label }}
                </li>
              </ul>
            </div>
          </div>
          <RouterLink :to="PAYMENT_PAGE_ROUTE" class="btn btn-line btn-sm shrink-0 self-start lg:self-center">
            Ver métodos de pago
            <span class="btn-orb"><ArrowUpRight :size="14" /></span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ─── Preguntas frecuentes ─── -->
    <section class="section border-t border-line" aria-labelledby="nfc-faq-title">
      <div class="shell grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p v-reveal="'fade'" class="eyebrow">Preguntas frecuentes</p>
          <h2 id="nfc-faq-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
            Todo sobre <span class="serif">NFC.</span>
          </h2>
        </div>
        <div v-reveal="'up'" class="lg:col-span-8">
          <FaqList :items="nfcFaq" />
        </div>
      </div>
    </section>

    <!-- ─── Contacto comercial ─── -->
    <section class="pb-6" aria-labelledby="nfc-cta-title">
      <div class="stage on-ink grain">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(37,99,235,0.38),transparent_70%)]" aria-hidden="true" />
        <div class="shell section relative grid items-center gap-12 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <h2 id="nfc-cta-title" v-reveal="'clip'" class="display-2 text-on-ink">
              Diseñemos tus <span class="serif text-signal">tarjetas inteligentes.</span>
            </h2>
            <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-6 max-w-xl !text-on-ink-2">
              Escríbenos por WhatsApp con la tarjeta, el combo o el diseño que te interesa y te compartimos la cotización.
              Cada tarjeta incluye su soporte de madera. Envíos a toda la República.
            </p>
            <div v-reveal="{ variant: 'up', delay: 160 }" class="mt-9 flex flex-wrap gap-3">
              <a :href="generalWhatsApp" target="_blank" rel="noopener noreferrer" class="btn btn-wa">
                Solicitar cotización por WhatsApp
                <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
              </a>
              <RouterLink to="/contacto" class="btn btn-ghost-ink">
                Otros medios de contacto
                <span class="btn-orb"><ArrowUpRight :size="16" /></span>
              </RouterLink>
            </div>
          </div>
          <div v-reveal="'scale'" class="mx-auto w-full max-w-[240px] text-on-ink lg:col-span-5">
            <NfcCardVisual label="Tu diseño" finish="electric" flippable />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Distintivo del soporte de madera incluido (beneficio permanente, no promoción) */
.stand-pill {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 14px;
  padding: 0.55rem 0.8rem;
  font-size: 0.8rem;
  line-height: 1.35;
  color: #6B4423;
  background: linear-gradient(135deg, rgba(200, 154, 103, 0.18), rgba(168, 116, 63, 0.1));
  border: 1px solid rgba(168, 116, 63, 0.28);
}
.stand-pill :deep(svg) { margin-top: 0.1rem; flex-shrink: 0; }
.stand-pill strong { font-weight: 600; }
:global([data-theme='dark'] .stand-pill) { color: #E9C9A2; }
.stand-pill.is-ink {
  color: #E9C9A2;
  background: rgba(200, 154, 103, 0.12);
  border-color: rgba(233, 201, 162, 0.22);
}
</style>
