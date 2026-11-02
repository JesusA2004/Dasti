<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { ChevronLeft, ChevronRight, Maximize2, QrCode, X } from '@lucide/vue'
import NfcDesignImage from '@/components/products/NfcDesignImage.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { nfcMessageUrl } from '@/data/nfc'
import {
  NFC_CATALOG_COPY,
  catalogModelMessage,
  catalogModelsFor,
  categoryById,
  nfcCatalogCategories,
  type NfcCardSide,
  type NfcCatalogCategoryId,
  type NfcCatalogModel,
} from '@/data/nfcCatalog'

/**
 * Catálogo de diseños por función. Filtros accesibles, transición entre
 * categorías y vista ampliada (diálogo nativo) con frente y reverso.
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

const sides: { id: NfcCardSide; label: string }[] = [
  { id: 'front', label: 'Frente' },
  { id: 'back', label: 'Reverso' },
]

/* ── Vista ampliada ── */
const dialogRef = ref<HTMLDialogElement>()
const openIndex = ref(-1)
const zoomSide = ref<NfcCardSide>('front')
const openModel = computed<NfcCatalogModel | undefined>(() => models.value[openIndex.value])
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

    <p class="sr-only" aria-live="polite">{{ models.length }} {{ models.length === 1 ? 'diseño disponible' : 'diseños disponibles' }}</p>

    <!-- Rejilla -->
    <Transition
      mode="out-in"
      enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="opacity-0 translate-y-4"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <ul :key="active" class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <li
          v-for="(m, i) in models"
          :key="m.id"
          class="card group flex flex-col rounded-[28px] p-4 transition-transform duration-500 hover:-translate-y-1"
        >
          <div class="relative grid grid-cols-2 gap-3 rounded-[20px] bg-sky p-4">
            <figure v-for="s in sides" :key="s.id">
              <NfcDesignImage :src="m[s.id].src" :alt="m[s.id].alt" :side-label="s.label" />
              <figcaption class="mt-2 text-center text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-fg-3">
                {{ s.label }}
              </figcaption>
            </figure>
            <button
              type="button"
              class="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-fg shadow-[var(--shadow-float)] transition-all duration-300 hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
              :aria-label="`Ver en grande: diseño ${categoryName(m)}, ${m.name}`"
              @click="openViewer(i, $event)"
            >
              <Maximize2 :size="15" />
            </button>
          </div>

          <div class="flex flex-1 flex-col px-2 pb-1 pt-5">
            <p class="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">
              <component :is="categoryIcon(m)" :size="13" aria-hidden="true" />
              {{ categoryName(m) }}
            </p>
            <h3 class="title-4 mt-1.5 text-fg">{{ m.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-fg-2">{{ m.description }}</p>
            <p class="mt-3 flex items-start gap-1.5 text-xs text-fg-3">
              <QrCode :size="13" class="mt-px shrink-0" aria-hidden="true" />
              QR del reverso personalizado para tu negocio
            </p>
            <div class="mt-auto flex flex-wrap gap-2 pt-5">
              <a
                :href="designUrl(m)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-ink btn-sm"
                :aria-label="`Consultar el diseño ${categoryName(m)}, ${m.name}, por WhatsApp`"
              >
                Consultar diseño
                <span class="btn-orb"><WhatsAppIcon :size="14" /></span>
              </a>
              <button type="button" class="btn btn-line btn-sm btn-plain" @click="openViewer(i, $event)">Ver en grande</button>
            </div>
          </div>
        </li>
      </ul>
    </Transition>

    <p class="mt-6 max-w-3xl text-xs leading-relaxed text-fg-3">{{ NFC_CATALOG_COPY.qrDetail }}</p>

    <!-- Vista ampliada -->
    <dialog
      ref="dialogRef"
      class="m-auto max-h-[94svh] w-[min(920px,calc(100vw-24px))] overflow-y-auto rounded-[30px] bg-surface p-0 text-fg shadow-[var(--shadow-deep)] backdrop:bg-[#020812]/70 backdrop:backdrop-blur-sm"
      :aria-labelledby="openModel ? 'nfc-viewer-title' : undefined"
      @close="onDialogClose"
      @click="onDialogClick"
      @keydown="onDialogKeydown"
    >
      <div v-if="openModel" class="p-5 sm:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">{{ categoryName(openModel) }}</p>
            <h3 id="nfc-viewer-title" class="display-3 mt-1 text-fg">{{ openModel.name }}</h3>
          </div>
          <button type="button" class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-2 transition-colors hover:bg-paper-2" aria-label="Cerrar vista ampliada" @click="closeViewer">
            <X :size="18" />
          </button>
        </div>

        <!-- Selector de cara (móvil) -->
        <div class="mt-5 inline-flex rounded-full border border-line-2 p-1 sm:hidden" role="group" aria-label="Cara de la tarjeta">
          <button
            v-for="s in sides"
            :key="s.id"
            type="button"
            class="min-h-[38px] rounded-full px-4 text-sm font-medium transition-colors"
            :class="zoomSide === s.id ? 'bg-ink text-on-ink dark:bg-on-ink dark:text-ink' : 'text-fg-2'"
            :aria-pressed="zoomSide === s.id"
            @click="zoomSide = s.id"
          >
            {{ s.label }}
          </button>
        </div>

        <div class="mt-5 grid gap-5 rounded-[22px] bg-sky p-5 sm:grid-cols-2 sm:p-8">
          <figure v-for="s in sides" :key="s.id" class="mx-auto w-full max-w-[300px]" :class="zoomSide === s.id ? '' : 'hidden sm:block'">
            <NfcDesignImage :src="openModel[s.id].src" :alt="openModel[s.id].alt" :side-label="s.label" eager />
            <figcaption class="mt-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-fg-3">
              {{ s.label }}{{ s.id === 'back' ? ' · QR personalizado' : '' }}
            </figcaption>
          </figure>
        </div>

        <div class="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p class="max-w-md text-sm leading-relaxed text-fg-2">{{ openModel.description }} {{ NFC_CATALOG_COPY.qrNote }}</p>
          <div class="flex shrink-0 items-center gap-2">
            <template v-if="models.length > 1">
              <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-line-2 transition-colors hover:bg-paper-2" aria-label="Diseño anterior" @click="step(-1)">
                <ChevronLeft :size="18" />
              </button>
              <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-line-2 transition-colors hover:bg-paper-2" aria-label="Diseño siguiente" @click="step(1)">
                <ChevronRight :size="18" />
              </button>
            </template>
            <a :href="designUrl(openModel)" target="_blank" rel="noopener noreferrer" class="btn btn-ink btn-sm">
              Consultar diseño
              <span class="btn-orb"><WhatsAppIcon :size="14" /></span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
