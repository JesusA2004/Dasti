<script setup lang="ts">
import { ref, useId } from 'vue'
import { Plus } from '@lucide/vue'

/** Acordeón accesible reutilizable (botón + región, teclado nativo). */
withDefaults(
  defineProps<{
    items: { q: string; a: string }[]
    inverse?: boolean
  }>(),
  { inverse: false },
)

const open = ref<number | null>(0)
const uid = useId()
const toggle = (i: number) => {
  open.value = open.value === i ? null : i
}
</script>

<template>
  <ul class="border-t" :class="inverse ? 'border-ink-line' : 'border-line'">
    <li v-for="(item, i) in items" :key="item.q" class="border-b" :class="inverse ? 'border-ink-line' : 'border-line'">
      <h3>
        <button
          :id="`${uid}-q-${i}`"
          type="button"
          class="group flex w-full items-start justify-between gap-6 py-6 text-left"
          :aria-expanded="open === i"
          :aria-controls="`${uid}-a-${i}`"
          @click="toggle(i)"
        >
          <span
            class="text-[1.02rem] font-medium leading-snug sm:text-lg"
            :class="inverse ? 'text-on-ink' : 'text-fg'"
          >
            {{ item.q }}
          </span>
          <span
            class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500"
            :class="[
              inverse ? 'border-ink-line text-on-ink' : 'border-line-2 text-fg',
              open === i ? 'rotate-45 !border-accent !bg-accent !text-white' : '',
            ]"
          >
            <Plus :size="15" />
          </span>
        </button>
      </h3>
      <div
        :id="`${uid}-a-${i}`"
        role="region"
        :aria-labelledby="`${uid}-q-${i}`"
        :aria-hidden="open !== i"
        class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :style="{ gridTemplateRows: open === i ? '1fr' : '0fr' }"
      >
        <div class="overflow-hidden">
          <p
            class="max-w-3xl pb-7 pr-12 text-[0.97rem] leading-relaxed"
            :class="inverse ? 'text-on-ink-2' : 'text-fg-2'"
          >
            {{ item.a }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>
