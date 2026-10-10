<script setup lang="ts">
import { ref, useId } from 'vue'
import { ArrowUpRight, Check, Plus } from '@lucide/vue'
import type { ServiceItem } from '@/data/services'

/**
 * Detalle de un servicio: descripción, qué incluye, ideal para y CTAs.
 * `collapsible` oculta el detalle tras un botón accesible.
 */
const props = withDefaults(
  defineProps<{
    service: ServiceItem
    collapsible?: boolean
    tone?: 'paper' | 'ink'
    headingLevel?: 'h3' | 'h4'
  }>(),
  { collapsible: false, tone: 'paper', headingLevel: 'h3' },
)

const open = ref(!props.collapsible)
const uid = useId()
</script>

<template>
  <div :class="tone === 'ink' ? 'text-on-ink' : 'text-fg'">
    <component :is="headingLevel" class="title-4">{{ service.title }}</component>
    <p class="mt-3 text-[0.97rem] leading-relaxed" :class="tone === 'ink' ? 'text-on-ink-2' : 'text-fg-2'">
      {{ service.desc }}
    </p>

    <button
      v-if="collapsible"
      type="button"
      class="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
      :class="tone === 'ink' ? 'text-signal' : 'text-accent'"
      :aria-expanded="open"
      :aria-controls="`${uid}-detail`"
      @click="open = !open"
    >
      <span
        class="grid h-6 w-6 place-items-center rounded-full border border-current/30 transition-transform duration-500"
        :class="open ? 'rotate-45' : ''"
      >
        <Plus :size="13" />
      </span>
      {{ open ? 'Ocultar detalles' : 'Ver qué incluye' }}
    </button>

    <div
      :id="`${uid}-detail`"
      class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :style="{ gridTemplateRows: open ? '1fr' : '0fr' }"
      :aria-hidden="!open"
    >
      <div class="overflow-hidden">
        <div class="pt-6">
          <p class="text-[0.7rem] font-semibold uppercase tracking-[0.16em]" :class="tone === 'ink' ? 'text-on-ink-3' : 'text-fg-3'">
            ¿Qué incluye?
          </p>
          <ul class="mt-3 space-y-2.5">
            <li v-for="item in service.included" :key="item" class="flex items-start gap-3 text-[0.92rem]">
              <Check :size="16" class="mt-0.5 shrink-0" :class="tone === 'ink' ? 'text-signal' : 'text-accent'" />
              <span :class="tone === 'ink' ? 'text-on-ink-2' : 'text-fg-2'">{{ item }}</span>
            </li>
          </ul>

          <p class="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em]" :class="tone === 'ink' ? 'text-on-ink-3' : 'text-fg-3'">
            Ideal para
          </p>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span v-for="ideal in service.idealFor" :key="ideal" class="chip !text-[0.75rem]" :class="tone === 'ink' ? 'chip-ink' : ''">
              {{ ideal }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-7 flex flex-wrap gap-2">
      <RouterLink
        to="/contacto"
        class="btn btn-sm"
        :class="tone === 'ink' ? 'btn-light' : 'btn-ink'"
        :aria-label="`Solicitar asesoría sobre ${service.title}`"
      >
        Solicitar asesoría
        <span class="btn-orb"><ArrowUpRight :size="14" /></span>
      </RouterLink>
      <RouterLink
        to="/cotizador"
        class="btn btn-sm btn-plain"
        :class="tone === 'ink' ? 'btn-ghost-ink' : 'btn-line'"
        :aria-label="`Cotizar ${service.title}`"
      >
        Cotizar
      </RouterLink>
    </div>
  </div>
</template>
