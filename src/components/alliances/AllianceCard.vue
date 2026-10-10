<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { Alliance } from '@/data/alliances'

/**
 * Tarjeta de aliado. Usa la identidad visual del propio aliado
 * (definida en src/data/alliances.ts) para distinguirlo de DASTI.
 */
defineProps<{ alliance: Alliance }>()
</script>

<template>
  <article
    class="ally-card group relative isolate flex h-full w-full flex-col overflow-hidden rounded-[30px] p-6 sm:p-8"
    :style="{
      '--ally-bg': alliance.theme.bg,
      '--ally-bg2': alliance.theme.bg2,
      '--ally-accent': alliance.theme.accent,
      '--ally-accent-light': alliance.theme.accentLight,
      '--ally-text': alliance.theme.text,
      '--ally-muted': alliance.theme.textMuted,
      '--ally-line': alliance.theme.line,
    }"
  >
    <img
      :src="alliance.heroImage.replace('w=1800', 'w=900')"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
    />
    <div class="ally-overlay absolute inset-0 -z-10" />

    <div class="flex items-start justify-between gap-4">
      <!-- Espacio reservado para el logotipo oficial -->
      <div
        class="grid h-16 min-w-16 place-items-center rounded-2xl border px-3"
        :class="alliance.logo ? 'bg-white/95' : 'border-dashed'"
        :style="{ borderColor: alliance.theme.line }"
      >
        <img v-if="alliance.logo" :src="alliance.logo" :alt="`Logotipo de ${alliance.name}`" class="h-10 w-auto object-contain" />
        <span v-else class="text-[0.6rem] font-medium uppercase tracking-[0.16em]" :style="{ color: alliance.theme.textMuted }">
          Logo
        </span>
      </div>
      <span
        class="rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
        :style="{ borderColor: alliance.theme.line, color: alliance.theme.accentLight }"
      >
        {{ alliance.badge }}
      </span>
    </div>

    <div class="mt-auto pt-16">
      <p class="text-[0.72rem] font-semibold uppercase tracking-[0.2em]" :style="{ color: alliance.theme.accent }">
        {{ alliance.specialty }}
      </p>
      <h3 class="mt-3 font-serif text-5xl leading-none tracking-wide sm:text-6xl" :style="{ color: alliance.theme.text }">
        {{ alliance.name }}
      </h3>
      <p class="mt-5 max-w-md text-[0.95rem] leading-relaxed" :style="{ color: alliance.theme.textMuted }">
        {{ alliance.description }}
      </p>
      <RouterLink
        :to="alliance.route"
        class="ally-btn mt-8 inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-sm font-semibold"
      >
        Conocer a {{ alliance.displayName }}
        <span class="grid h-9 w-9 place-items-center rounded-full bg-black/10 transition-transform duration-500 group-hover:-rotate-45">
          <ArrowUpRight :size="16" />
        </span>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.ally-card {
  background: var(--ally-bg);
  color: var(--ally-text);
  box-shadow: 0 0 0 1px var(--ally-line) inset;
}
.ally-overlay {
  background:
    radial-gradient(80% 60% at 100% 0%, color-mix(in srgb, var(--ally-accent) 22%, transparent), transparent 70%),
    linear-gradient(180deg, color-mix(in srgb, var(--ally-bg) 55%, transparent) 0%, var(--ally-bg) 70%);
}
.ally-btn {
  background: linear-gradient(135deg, var(--ally-accent-light), var(--ally-accent));
  color: var(--ally-bg);
  transition: box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.ally-btn:hover { box-shadow: 0 16px 40px -16px var(--ally-accent); }
.ally-btn:active { transform: scale(0.98); }
</style>
