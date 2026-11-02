<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Gift, Plus, RotateCcw, X } from '@lucide/vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { nfcCombos, nfcMessageUrl, nfcStandLabel } from '@/data/nfc'
import {
  categoryById,
  comboSelectionMessage,
  nfcCatalogCategories,
  selectionText,
  summarizeSelection,
  type NfcCatalogCategoryId,
} from '@/data/nfcCatalog'

/**
 * Demostración ILUSTRATIVA de cómo se combinan funciones dentro de un combo.
 * No es un configurador de compra: no guarda ni envía pedidos. Solo arma un
 * mensaje de WhatsApp con la combinación elegida.
 */

const comboId = ref(nfcCombos.find((c) => c.id === 'conecta')?.id ?? nfcCombos[0].id)
const combo = computed(() => nfcCombos.find((c) => c.id === comboId.value) ?? nfcCombos[0])
const categories = [...nfcCatalogCategories].sort((a, b) => a.order - b.order)

type Slot = NfcCatalogCategoryId | null
const slots = ref<Slot[]>(['facebook', 'menu-digital', 'whatsapp', 'google-maps'])

/* Ajusta los espacios al cambiar de combo, conservando lo ya elegido. */
watch(
  () => combo.value.cards,
  (n) => {
    const next = slots.value.slice(0, n)
    while (next.length < n) next.push(null)
    slots.value = next
  },
)

const filled = computed(() => slots.value.filter(Boolean).length)
const isFull = computed(() => filled.value === combo.value.cards)
const lines = computed(() => summarizeSelection(slots.value))

const status = ref('')
const add = (id: NfcCatalogCategoryId) => {
  const i = slots.value.indexOf(null)
  if (i === -1) {
    status.value = `El ${combo.value.name} ya tiene sus ${combo.value.cards} tarjetas. Quita una para cambiarla.`
    return
  }
  slots.value[i] = id
  status.value = `Tarjeta ${i + 1}: ${categoryById(id)?.name}.`
}
const remove = (i: number) => {
  const name = slots.value[i] ? categoryById(slots.value[i] as NfcCatalogCategoryId)?.name : ''
  slots.value[i] = null
  status.value = `Tarjeta ${i + 1} libre${name ? ` (antes: ${name})` : ''}.`
}
const clear = () => {
  slots.value = slots.value.map(() => null)
  status.value = 'Combinación vacía.'
}

/* Ejemplos de combinaciones, ajustados a la cantidad del combo elegido. */
const examples: { label: string; mix: NfcCatalogCategoryId[] }[] = [
  { label: 'Restaurante', mix: ['facebook', 'menu-digital', 'whatsapp', 'google-maps', 'wifi', 'instagram'] },
  { label: 'Creador de contenido', mix: ['instagram', 'instagram', 'tiktok', 'sitio-web', 'tiktok', 'whatsapp'] },
]
const applyExample = (mix: NfcCatalogCategoryId[]) => {
  slots.value = Array.from({ length: combo.value.cards }, (_, i) => mix[i] ?? null)
  status.value = `Ejemplo aplicado: ${selectionText(summarizeSelection(slots.value))}.`
}

const whatsappUrl = computed(() => nfcMessageUrl(comboSelectionMessage(combo.value, lines.value)))
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-12 lg:gap-10">
    <!-- Controles -->
    <div class="lg:col-span-5">
      <p class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">1 · Elige un combo</p>
      <div class="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Combo de la demostración">
        <button
          v-for="c in nfcCombos"
          :key="c.id"
          type="button"
          class="rounded-[18px] border px-3 py-3 text-left transition-all duration-300"
          :class="
            comboId === c.id
              ? 'border-ink bg-ink text-on-ink shadow-[var(--shadow-float)] dark:border-on-ink dark:bg-on-ink dark:text-ink'
              : 'border-line-2 bg-surface text-fg hover:border-fg-3'
          "
          :aria-pressed="comboId === c.id"
          @click="comboId = c.id"
        >
          <span class="block text-[0.82rem] font-semibold leading-tight">{{ c.name.replace('Combo ', '') }}</span>
          <span class="mt-0.5 block text-xs opacity-70">{{ c.cards }} tarjetas</span>
        </button>
      </div>

      <p class="mt-7 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-3">2 · Asigna una función a cada tarjeta</p>
      <div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Funciones disponibles">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line-2 bg-surface px-3.5 text-sm font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-45"
          :disabled="isFull"
          :aria-label="`Agregar una tarjeta de ${cat.name}`"
          @click="add(cat.id)"
        >
          <component :is="cat.icon" :size="14" aria-hidden="true" />
          {{ cat.name }}
          <Plus :size="13" class="opacity-50" aria-hidden="true" />
        </button>
      </div>

      <div class="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <span class="text-fg-3">Ejemplos:</span>
        <button
          v-for="ex in examples"
          :key="ex.label"
          type="button"
          class="link-u font-medium text-fg"
          @click="applyExample(ex.mix)"
        >
          {{ ex.label }}
        </button>
        <span class="text-line-2" aria-hidden="true">·</span>
        <button type="button" class="inline-flex items-center gap-1 font-medium text-fg-2 hover:text-fg" @click="clear">
          <RotateCcw :size="13" aria-hidden="true" /> Vaciar
        </button>
      </div>
    </div>

    <!-- Resultado -->
    <div class="lg:col-span-7">
      <div class="rounded-[26px] border border-line bg-surface p-5 shadow-[var(--shadow-float)] sm:p-7">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <p class="font-display text-lg font-semibold tracking-tight text-fg">{{ combo.name }}</p>
          <p class="tabular text-sm text-fg-3">{{ filled }} / {{ combo.cards }} tarjetas asignadas</p>
        </div>

        <TransitionGroup
          tag="ul"
          class="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-6"
          move-class="transition-transform duration-500"
          aria-label="Tarjetas del combo"
        >
          <li v-for="(slot, i) in slots" :key="`slot-${i}`" class="relative">
            <button
              v-if="slot"
              type="button"
              class="mix-slot group is-filled"
              :aria-label="`Tarjeta ${i + 1}: ${categoryById(slot)?.name}. Quitar`"
              @click="remove(i)"
            >
              <Transition
                mode="out-in"
                enter-active-class="transition duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                enter-from-class="opacity-0 scale-75"
              >
                <span :key="slot" class="flex flex-col items-center gap-1.5">
                  <span class="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                    <component :is="categoryById(slot)?.icon" :size="16" aria-hidden="true" />
                  </span>
                  <span class="px-1 text-center text-[0.66rem] font-semibold leading-tight">{{ categoryById(slot)?.name }}</span>
                </span>
              </Transition>
              <X :size="12" class="absolute right-1.5 top-1.5 opacity-60 group-hover:opacity-100" aria-hidden="true" />
            </button>
            <div v-else class="mix-slot" :aria-label="`Tarjeta ${i + 1}: sin asignar`" role="img">
              <span class="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-fg-3">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
          </li>
        </TransitionGroup>

        <div class="mt-5 border-t border-line pt-4" aria-live="polite">
          <p class="text-sm text-fg-2">
            <template v-if="lines.length">
              Tu combinación: <span class="font-semibold text-fg">{{ selectionText(lines) }}</span>.
            </template>
            <template v-else>Toca una función para asignarla a la siguiente tarjeta.</template>
          </p>
          <p class="sr-only">{{ status }}</p>
          <p class="mt-2 flex items-start gap-2 text-sm text-fg-2">
            <Gift :size="15" class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <span>
              Recibes <span class="font-semibold text-fg">{{ nfcStandLabel(combo.cards) }}</span>, sin costo adicional.
            </span>
          </p>
        </div>

        <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs leading-relaxed text-fg-3">Demostración ilustrativa: no genera un pedido ni un cobro.</p>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ink btn-sm shrink-0"
            :class="{ 'pointer-events-none opacity-50': !lines.length }"
            :aria-disabled="!lines.length"
            :tabindex="lines.length ? undefined : -1"
          >
            Consultar esta combinación
            <span class="btn-orb"><WhatsAppIcon :size="14" /></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mix-slot {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 54 / 85.6;
  border-radius: 14px;
  border: 1px dashed var(--c-line-2);
  background: var(--c-paper-2);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, border-color 0.3s ease;
}
.mix-slot.is-filled {
  border: 1px solid transparent;
  background:
    radial-gradient(120% 70% at 100% 0%, rgba(59, 130, 246, 0.5), transparent 60%),
    linear-gradient(160deg, #0E2142, #071426);
  color: #F2F6FC;
  box-shadow: 0 14px 30px -18px rgba(2, 8, 18, 0.7);
}
.mix-slot.is-filled:hover { transform: translateY(-2px); }
.mix-slot.is-filled:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .mix-slot { transition: none; }
}
</style>
