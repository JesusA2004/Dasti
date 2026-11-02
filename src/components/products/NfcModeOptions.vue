<script setup lang="ts">
import { nfcDesignModes, type NfcDesignMode, type NfcModePrices } from '@/data/nfc'
import { formatMXN } from '@/utils/format'

/**
 * Selector accesible de modalidad de diseño (radio group). Muestra las tres
 * modalidades con su precio final (MXN, IVA incluido) y, opcionalmente, la
 * condición de cada una. La modalidad elegida se usa en el mensaje de WhatsApp.
 */
const props = defineProps<{
  /** Nombre único del grupo de radios (uno por producto). */
  name: string
  /** Nombre del producto, para la leyenda accesible. */
  productName: string
  prices: NfcModePrices
  conditions?: Partial<Record<NfcDesignMode, string>>
  /** `lg`: filas amplias (tarjeta individual). `sm`: filas compactas (combos). */
  size?: 'lg' | 'sm'
}>()

const model = defineModel<NfcDesignMode>({ required: true })
const isLg = () => props.size === 'lg'
</script>

<template>
  <fieldset>
    <legend class="sr-only">Modalidad de diseño · {{ productName }}</legend>
    <div :class="isLg() ? 'space-y-3' : 'space-y-2'">
      <label
        v-for="m in nfcDesignModes"
        :key="m.id"
        class="flex cursor-pointer items-start gap-3 border transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent"
        :class="[
          isLg() ? 'rounded-[22px] p-5' : 'rounded-[16px] px-3.5 py-3',
          model === m.id ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-2',
        ]"
      >
        <input v-model="model" type="radio" class="sr-only" :name="name" :value="m.id" />
        <span
          class="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-300"
          :class="model === m.id ? 'border-accent' : 'border-line-2'"
          aria-hidden="true"
        >
          <span class="h-2 w-2 rounded-full bg-accent transition-transform duration-300" :class="model === m.id ? 'scale-100' : 'scale-0'" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block font-semibold text-fg" :class="isLg() ? '' : 'text-sm'">{{ m.label }}</span>
          <span v-if="conditions?.[m.id]" class="mt-1 block text-xs leading-relaxed text-fg-3">{{ conditions?.[m.id] }}</span>
        </span>
        <span
          class="tabular shrink-0 font-display font-semibold tracking-tight text-fg"
          :class="isLg() ? 'text-xl' : 'text-[0.95rem]'"
        >
          {{ formatMXN(prices[m.id]) }}
        </span>
      </label>
    </div>
  </fieldset>
</template>
