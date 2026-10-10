<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { ArrowDown, ArrowUpRight, Check, QrCode, Palette, Smartphone } from '@lucide/vue'
import NfcCardVisual from '@/components/products/NfcCardVisual.vue'
import NfcPhoneMock from '@/components/products/NfcPhoneMock.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import FaqList from '@/components/ui/FaqList.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { useSectionProgress } from '@/composables/useSectionProgress'
import { formatMXN } from '@/utils/format'
import {
  NFC_PRICING,
  nfcCardTypes,
  nfcFaq,
  nfcGallery,
  nfcImages,
  nfcPackages,
  nfcSteps,
  nfcWhatsAppUrl,
  type NfcPackage,
} from '@/data/nfc'

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

/* ── Precios ── */
const priceLabel = (pkg: NfcPackage) => (pkg.price === null ? NFC_PRICING.pendingLabel : formatMXN(pkg.price))

const generalWhatsApp = nfcWhatsAppUrl()

const gallerySpans = ['lg:col-span-7 lg:row-span-2', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4']

const highlights = [
  { icon: Smartphone, title: 'Un toque', desc: 'Lectura por NFC en smartphones compatibles.' },
  { icon: QrCode, title: 'Código QR', desc: 'Alternativa para cualquier cámara.' },
  { icon: Palette, title: 'Personalizada', desc: 'Diseño y destino definidos contigo.' },
]

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
          <div v-else class="animate-fade relative mx-auto flex max-w-[560px] items-center justify-center py-6" style="--d: 200ms">
            <div class="w-[46%] max-w-[240px] -rotate-6">
              <NfcPhoneMock type="presentacion" />
            </div>
            <div class="absolute left-0 top-1/2 w-[72%] -translate-y-1/3 sm:left-[-4%]">
              <NfcCardVisual label="Presentación digital" />
            </div>
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
              <div class="absolute bottom-8 left-0 w-[62%]">
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

    <!-- ─── Paquetes ─── -->
    <section id="paquetes" class="section" aria-labelledby="packages-title">
      <div class="shell">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p v-reveal="'fade'" class="eyebrow">Paquetes</p>
            <h2 id="packages-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
              Elige cómo <span class="serif">empezar.</span>
            </h2>
          </div>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead lg:col-span-5">
            Cotizamos según cantidad, tipo de tarjeta y personalización. {{ NFC_PRICING.policyNote }}
          </p>
        </div>

        <div class="mt-14 grid gap-5 lg:grid-cols-3">
          <article
            v-for="(pkg, i) in nfcPackages"
            :key="pkg.id"
            v-reveal="{ variant: 'up', delay: i * 100 }"
            class="relative flex flex-col overflow-hidden rounded-[30px] p-7 sm:p-8"
            :class="pkg.featured ? 'on-ink grain shadow-[var(--shadow-deep)]' : 'card'"
          >
            <div v-if="pkg.featured" class="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_0%,rgba(37,99,235,0.4),transparent_70%)]" aria-hidden="true" />
            <div class="relative flex h-full flex-col">
              <div class="flex items-start justify-between gap-3">
                <h3 class="title-4" :class="pkg.featured ? 'text-on-ink' : 'text-fg'">{{ pkg.name }}</h3>
                <span
                  class="shrink-0 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold"
                  :class="pkg.featured ? 'bg-white/10 text-on-ink-2' : 'bg-paper-2 text-fg-2'"
                >
                  {{ pkg.quantity }}
                </span>
              </div>
              <p class="mt-3 text-[0.93rem] leading-relaxed" :class="pkg.featured ? 'text-on-ink-2' : 'text-fg-2'">{{ pkg.summary }}</p>

              <div class="mt-8 border-y py-6" :class="pkg.featured ? 'border-ink-line' : 'border-line'">
                <p class="font-display text-[1.75rem] font-semibold tracking-tight" :class="pkg.featured ? 'text-on-ink' : 'text-fg'">
                  {{ priceLabel(pkg) }}
                </p>
                <p class="mt-1 text-xs" :class="pkg.featured ? 'text-on-ink-3' : 'text-fg-3'">
                  {{ pkg.price === null ? 'Precio final con IVA incluido al cotizar' : `${NFC_PRICING.currency} · ${NFC_PRICING.vatLabel}` }}
                </p>
              </div>

              <p class="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em]" :class="pkg.featured ? 'text-on-ink-3' : 'text-fg-3'">
                Personalización
              </p>
              <p class="mt-1 text-sm" :class="pkg.featured ? 'text-on-ink' : 'text-fg'">{{ pkg.customization }}</p>

              <ul class="mt-6 space-y-2.5">
                <li v-for="f in pkg.features" :key="f" class="flex items-start gap-2.5 text-sm">
                  <Check :size="16" class="mt-0.5 shrink-0" :class="pkg.featured ? 'text-signal' : 'text-accent'" />
                  <span :class="pkg.featured ? 'text-on-ink-2' : 'text-fg-2'">{{ f }}</span>
                </li>
              </ul>

              <ul class="mt-6 space-y-1">
                <li v-for="c in pkg.conditions" :key="c" class="text-xs" :class="pkg.featured ? 'text-on-ink-3' : 'text-fg-3'">· {{ c }}</li>
              </ul>

              <div class="mt-auto pt-8">
                <a
                  :href="nfcWhatsAppUrl(pkg.name)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-block"
                  :class="pkg.featured ? 'btn-light' : 'btn-ink'"
                >
                  Solicitar cotización
                  <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ─── Galería ─── -->
    <section class="section pt-0" aria-labelledby="gallery-title">
      <div class="shell">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="gallery-title" v-reveal="'clip'" class="display-2 text-fg">Galería</h2>
          <p v-reveal="'fade'" class="max-w-sm text-sm text-fg-3">
            Fotografías oficiales de nuestras tarjetas, acabados y presentaciones.
          </p>
        </div>
        <div class="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-12">
          <figure
            v-for="(img, i) in nfcGallery"
            :key="img.caption"
            v-reveal="{ variant: 'image', delay: (i % 3) * 80 }"
            class="overflow-hidden rounded-[26px]"
            :class="gallerySpans[i] ?? 'lg:col-span-4'"
          >
            <MediaFrame :src="img.src" :alt="img.alt" :caption="img.caption" :tone="i % 3 === 1 ? 'light' : 'ink'" />
          </figure>
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
              Escríbenos por WhatsApp con el tipo de tarjeta o paquete que te interesa y te compartimos la cotización.
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
          <div v-reveal="'scale'" class="mx-auto w-full max-w-[380px] lg:col-span-5">
            <NfcCardVisual label="Tu diseño" finish="electric" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
