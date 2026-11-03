<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { ChevronLeft, ChevronRight, Maximize2, QrCode, X } from '@lucide/vue'
import NfcCardVisual from '@/components/products/NfcCardVisual.vue'
import NfcDesignImage from '@/components/products/NfcDesignImage.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { nfcMessageUrl } from '@/data/nfc'
import {
  NFC_CATALOG_COPY,
  catalogModelMessage,
  catalogModelsFor,
  categoryById,
  nfcCatalogCategories,
  type NfcCatalogCategoryId,
  type NfcCatalogModel,
} from '@/data/nfcCatalog'

/**
 * Catálogo de diseños FRONTALES por función (dos modelos por categoría).
 * Filtros accesibles, transición entre categorías y vista ampliada (diálogo
 * nativo). El reverso no se muestra como imagen: se personaliza con el QR de
 * cada negocio y se explica en el bloque «El frente lo eliges tú…».
 * Todo el contenido proviene de src/data/nfcCatalog.ts.
 */

type Filter = NfcCatalogCategoryId | 'all'
const active = ref<Filter>('all')
const models = computed(() => catalogModelsFor(active.value))

const filters = computed(() => [
  { id: 'all' as Filter, name: 'Todos', count: catalogModelsFor('all').length },
  ...[...nfcCatalogCategories]
    .sort((a, b) => a.order - b.order)
    .map((c) => ({ id: c.id as Filter, name: c.name, count: catalogModelsFor(c.id).length }))
    .filter((f) => f.count > 0),
])

/* ── Vista ampliada ── */
type ZoomSide = 'front' | 'back'
const dialogRef = ref<HTMLDialogElement>()
const openIndex = ref(-1)
const zoomSide = ref<ZoomSide>('front')
const zoomSides: { id: ZoomSide; label: string }[] = [
  { id: 'front', label: 'Frente' },
  { id: 'back', label: 'Reverso de ejemplo' },
]
const openModel = computed<NfcCatalogModel | undefined>(() => models.value[openIndex.value])
const zoomImage = computed(() =>
  openModel.value ? (zoomSide.value === 'back' && openModel.value.back) || openModel.value.front : undefined,
)
let lastTrigger: HTMLElement | null = null

const openViewer = async (index: number, e: Event) => {
  lastTrigger = e.currentTarget as HTMLElement
  openIndex.value = index
  zoomSide.value = 'front'
  await nextTick()
  dialogRef.value?.showModal()
  document.documentElement.style.overflow = 'hidden'
}
const closeViewer = () => dialogRef.value?.close()
const onDialogClose = () => {
  document.documentElement.style.overflow = ''
  openIndex.value = -1
  lastTrigger?.focus()
}
const step = (dir: 1 | -1) => {
  const n = models.value.length
  if (n < 2) return
  openIndex.value = (openIndex.value + dir + n) % n
  zoomSide.value = 'front'
}
const onDialogKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}
const onDialogClick = (e: MouseEvent) => {
  if (e.target === dialogRef.value) closeViewer()
}
onBeforeUnmount(() => (document.documentElement.style.overflow = ''))

const categoryName = (m: NfcCatalogModel) => categoryById(m.categoryId)?.name ?? m.categoryId
const categoryIcon = (m: NfcCatalogModel) => categoryById(m.categoryId)?.icon
const modelLabel = (m: NfcCatalogModel) => `${categoryName(m)}, ${m.name}`
const designUrl = (m: NfcCatalogModel) => nfcMessageUrl(catalogModelMessage(m))
</script>

<template>
  <div>
    <!-- Filtros -->
    <div
      class="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      role="group"
      aria-label="Filtrar diseños por función"
    >
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300"
        :class="
          active === f.id
            ? 'border-ink bg-ink text-on-ink shadow-[var(--shadow-float)] dark:border-on-ink dark:bg-on-ink dark:text-ink'
            : 'border-line-2 bg-surface text-fg-2 hover:border-fg-3 hover:text-fg'
        "
        :aria-pressed="active === f.id"
        @click="active = f.id"
      >
        {{ f.name }}
        <span class="tabular text-[0.7rem] opacity-60">{{ f.count }}</span>
      </button>
    </div>

    <p class="sr-only" aria-live="polite">
      {{ models.length }} {{ models.length === 1 ? 'diseño frontal disponible' : 'diseños frontales disponibles' }}
    </p>

    <!-- Rejilla de diseños frontales -->
    <Transition
      mode="out-in"
      enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="opacity-0 translate-y-4"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <ul
        :key="active"
        class="mt-8 grid gap-5 sm:grid-cols-2"
        :class="active === 'all' ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:mx-auto lg:max-w-4xl lg:gap-8'"
      >
        <li
          v-for="(m, i) in models"
          :key="m.id"
          class="card group flex flex-col rounded-[28px] p-4 transition-transform duration-500 hover:-translate-y-1"
        >
          <div class="relative rounded-[20px] bg-sky px-6 py-6 sm:px-8">
            <span class="absolute left-3 top-3 z-[1] rounded-full bg-surface/90 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-fg shadow-[var(--shadow-float)]">
              {{ m.name }}
            </span>
            <button
              type="button"
              class="mx-auto block w-full max-w-[240px] rounded-[0.9rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              :aria-label="`Ver en grande: ${modelLabel(m)}`"
              @click="openViewer(i, $event)"
            >
              <NfcDesignImage :src="m.front.src" :alt="m.front.alt" :side-label="`${m.name} · Frente`" />
            </button>
            <span
              class="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-fg shadow-[var(--shadow-float)] transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
              aria-hidden="true"
            >
              <Maximize2 :size="15" />
            </span>
          </div>

          <div class="flex flex-1 flex-col px-2 pb-1 pt-5">
            <p class="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">
              <component :is="categoryIcon(m)" :size="13" aria-hidden="true" />
              {{ categoryName(m) }}
            </p>
            <h3 class="title-4 mt-1.5 text-fg">{{ categoryName(m) }} · {{ m.name }}</h3>
            <p v-if="m.headline" class="serif mt-1.5 text-[1.05rem] leading-snug text-fg">«{{ m.headline }}»</p>
            <p class="mt-2 text-sm leading-relaxed text-fg-2">{{ m.description }}</p>
            <p class="mt-3 flex items-start gap-1.5 text-xs text-fg-3">
              <QrCode :size="13" class="mt-px shrink-0" aria-hidden="true" />
              Diseño frontal · reverso con el QR de tu negocio
            </p>
            <div class="mt-auto flex flex-wrap gap-2 pt-5">
              <a
                :href="designUrl(m)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-ink btn-sm"
                :aria-label="`Elegir el diseño ${modelLabel(m)} por WhatsApp`"
              >
                Elegir este diseño
                <span class="btn-orb"><WhatsAppIcon :size="14" /></span>
              </a>
              <button type="button" class="btn btn-line btn-sm btn-plain" @click="openViewer(i, $event)">Ver en grande</button>
            </div>
          </div>
        </li>
      </ul>
    </Transition>

    <!-- El reverso se personaliza -->
    <div class="mt-12 grid items-center gap-8 overflow-hidden rounded-[30px] border border-line bg-surface p-6 sm:p-9 lg:grid-cols-12 lg:gap-12">
      <div class="lg:col-span-8">
        <p class="eyebrow">Reverso personalizado</p>
        <h3 class="display-3 mt-4 text-fg">
          {{ NFC_CATALOG_COPY.backTitle }} <span class="serif">{{ NFC_CATALOG_COPY.backTitleAccent }}</span>
        </h3>
        <p class="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-fg-2">{{ NFC_CATALOG_COPY.backText }}</p>
        <ol class="mt-6 grid gap-3 sm:grid-cols-2">
          <li v-for="(point, i) in NFC_CATALOG_COPY.backPoints" :key="point" class="flex items-start gap-3 text-sm text-fg-2">
            <span class="tabular grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper-2 text-[0.7rem] font-semibold text-fg">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="pt-1">{{ point }}</span>
          </li>
        </ol>
        <p class="mt-6 text-xs leading-relaxed text-fg-3">{{ NFC_CATALOG_COPY.backWhyNoImage }}</p>
      </div>
      <figure class="mx-auto w-full max-w-[200px] lg:col-span-4">
        <NfcCardVisual label="Tu negocio" side="back" finish="pearl" :interactive="false" :waves="false" />
        <figcaption class="mt-5 text-center text-[0.64rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-fg-3">
          {{ NFC_CATALOG_COPY.backIllustrationLabel }}
        </figcaption>
      </figure>
    </div>

    <!-- Vista ampliada -->
    <dialog
      ref="dialogRef"
      class="m-auto max-h-[94svh] w-[min(880px,calc(100vw-24px))] overflow-y-auto rounded-[30px] bg-surface p-0 text-fg shadow-[var(--shadow-deep)] backdrop:bg-[#020812]/70 backdrop:backdrop-blur-sm"
      :aria-labelledby="openModel ? 'nfc-viewer-title' : undefined"
      @close="onDialogClose"
      @click="onDialogClick"
      @keydown="onDialogKeydown"
    >
      <div v-if="openModel && zoomImage" class="p-5 sm:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">
              {{ categoryName(openModel) }} · Diseño frontal
            </p>
            <h3 id="nfc-viewer-title" class="display-3 mt-1 text-fg">{{ categoryName(openModel) }}, {{ openModel.name }}</h3>
          </div>
          <button type="button" class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-2 transition-colors hover:bg-paper-2" aria-label="Cerrar vista ampliada" @click="closeViewer">
            <X :size="18" />
          </button>
        </div>

        <div class="mt-6 grid gap-6 sm:grid-cols-[minmax(0,320px)_minmax(0,1fr)] sm:items-center sm:gap-8">
          <div class="rounded-[22px] bg-sky p-5 sm:p-7">
            <!-- Reverso de ejemplo: solo si el modelo lo declara (uso futuro) -->
            <div v-if="openModel.back" class="mb-4 inline-flex rounded-full border border-line-2 bg-surface p-1" role="group" aria-label="Cara de la tarjeta">
              <button
                v-for="s in zoomSides"
                :key="s.id"
                type="button"
                class="min-h-[36px] rounded-full px-3.5 text-xs font-medium transition-colors"
                :class="zoomSide === s.id ? 'bg-ink text-on-ink dark:bg-on-ink dark:text-ink' : 'text-fg-2'"
                :aria-pressed="zoomSide === s.id"
                @click="zoomSide = s.id"
              >
                {{ s.label }}
              </button>
            </div>
            <Transition
              mode="out-in"
              enter-active-class="transition duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
              enter-from-class="opacity-0 scale-[0.98]"
              leave-active-class="transition duration-150"
              leave-to-class="opacity-0"
            >
              <figure :key="zoomImage.src" class="mx-auto w-full max-w-[280px]">
                <NfcDesignImage :src="zoomImage.src" :alt="zoomImage.alt" :side-label="`${openModel.name} · ${zoomSide === 'back' ? 'Reverso' : 'Frente'}`" eager />
                <figcaption class="mt-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-fg-3">
                  {{ openModel.name }} · {{ zoomSide === 'back' ? 'Reverso de ejemplo' : 'Frente' }}
                </figcaption>
              </figure>
            </Transition>
          </div>

          <div>
            <p v-if="openModel.headline" class="serif text-2xl leading-snug text-fg">«{{ openModel.headline }}»</p>
            <p class="mt-3 text-sm leading-relaxed text-fg-2">{{ openModel.description }}</p>
            <p class="mt-5 flex items-start gap-2 rounded-[18px] bg-paper-2 p-4 text-sm leading-relaxed text-fg-2">
              <QrCode :size="16" class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span class="font-semibold text-fg">{{ NFC_CATALOG_COPY.backTitle }} {{ NFC_CATALOG_COPY.backTitleAccent }}</span>
                El QR del reverso y el NFC llevan al destino que configuramos para ti.
              </span>
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-2">
              <a :href="designUrl(openModel)" target="_blank" rel="noopener noreferrer" class="btn btn-ink btn-sm">
                Elegir este diseño
                <span class="btn-orb"><WhatsAppIcon :size="14" /></span>
              </a>
              <template v-if="models.length > 1">
                <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-line-2 transition-colors hover:bg-paper-2" aria-label="Diseño anterior" @click="step(-1)">
                  <ChevronLeft :size="18" />
                </button>
                <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-line-2 transition-colors hover:bg-paper-2" aria-label="Diseño siguiente" @click="step(1)">
                  <ChevronRight :size="18" />
                </button>
                <span class="tabular text-xs text-fg-3">{{ openIndex + 1 }} / {{ models.length }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
