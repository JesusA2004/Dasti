<script setup lang="ts">
import type { NfcDesignBack, NfcDesignFront, NfcDesignTheme } from '@/data/nfc'

/**
 * Recreación limpia (CSS) de un diseño genérico de tarjeta NFC vertical,
 * basada en las tarjetas impresas reales. Se usa mientras no haya una
 * fotografía recortada y profesional del diseño (ver `image.src` en
 * src/data/nfc.ts). Los íconos son glifos genéricos, no logotipos oficiales.
 */
defineProps<{
  theme: NfcDesignTheme
  side: 'front' | 'back'
  front: NfcDesignFront
  back: NfcDesignBack
}>()
</script>

<template>
  <div class="dm" :class="`dm-${theme}`" aria-hidden="true">
    <div class="dm-glow" />

    <div class="relative flex h-full flex-col items-center px-[9%] pb-[9%] pt-[11%] text-center">
      <!-- Ícono temático -->
      <span class="dm-icon grid place-items-center">
        <!-- Pin de mapa -->
        <svg v-if="theme === 'maps'" viewBox="0 0 24 24" class="h-[62%] w-[62%]">
          <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7Z" fill="#EA4335" />
          <path d="M5 9c0-1.6.5-3 1.4-4.2L12 9H5Z" fill="#4285F4" opacity=".9" />
          <path d="M12 9 17.6 4.8C18.5 6 19 7.4 19 9h-7Z" fill="#FBBC04" opacity=".9" />
          <circle cx="12" cy="9" r="2.6" fill="#fff" />
        </svg>
        <!-- Cámara -->
        <svg v-else-if="theme === 'instagram'" viewBox="0 0 24 24" class="h-[58%] w-[58%]" fill="none" stroke="#fff" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="5.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="0.9" fill="#fff" stroke="none" />
        </svg>
        <!-- Comunidad -->
        <svg v-else viewBox="0 0 24 24" class="h-[56%] w-[56%]" fill="#fff">
          <circle cx="9" cy="8.5" r="3.2" />
          <circle cx="16.5" cy="9.5" r="2.5" opacity=".75" />
          <path d="M2.8 19.5c.6-3.4 3.2-5.5 6.2-5.5s5.6 2.1 6.2 5.5Z" />
          <path d="M15.6 14.1c2.6.1 4.8 1.9 5.4 5.4h-4.3c-.2-2-.6-3.8-1.1-5.4Z" opacity=".75" />
        </svg>
      </span>

      <template v-if="side === 'front'">
        <p class="dm-title mt-[9%]">{{ front.title }}</p>
        <p class="dm-text mt-[5%]">{{ front.text }}</p>

        <!-- Símbolo de lectura sin contacto -->
        <svg viewBox="0 0 24 24" class="dm-nfc mt-auto h-[1.9em] w-[1.9em]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path d="M8.5 9.2a4 4 0 0 1 0 5.6" />
          <path d="M11.6 7a7.2 7.2 0 0 1 0 10" />
          <path d="M14.7 4.8a10.4 10.4 0 0 1 0 14.4" />
        </svg>
        <span class="dm-button mt-[6%]">{{ front.button }}</span>
      </template>

      <template v-else>
        <span v-if="theme === 'maps'" class="dm-stars mt-[5%]">★★★★★</span>
        <p class="dm-title" :class="theme === 'maps' ? 'mt-[3%]' : 'mt-[9%]'">{{ back.title }}</p>
        <p class="dm-text mt-[5%]">{{ back.text }}</p>
        <ol class="dm-steps mt-auto w-full space-y-[0.45em] text-left">
          <li v-for="(step, i) in back.steps" :key="step" class="flex items-center gap-[0.55em]">
            <span class="dm-step-n grid shrink-0 place-items-center">{{ i + 1 }}</span>
            <span>{{ step }}</span>
          </li>
        </ol>
      </template>
    </div>
  </div>
</template>

<style scoped>
.dm {
  position: relative;
  aspect-ratio: 54 / 85.6;
  width: 100%;
  overflow: hidden;
  border-radius: 0.9em;
  font-size: clamp(9px, 1.05vw, 13px);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.3) inset,
    0 24px 48px -22px rgba(2, 8, 18, 0.55);
}
.dm-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.dm-icon {
  width: 3.6em;
  height: 3.6em;
  border-radius: 1.1em;
}
.dm-title {
  font-weight: 700;
  font-size: 1.32em;
  line-height: 1.12;
  letter-spacing: -0.01em;
}
.dm-text {
  font-size: 0.86em;
  line-height: 1.35;
  opacity: 0.82;
}
.dm-nfc { opacity: 0.55; }
.dm-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 999px;
  padding: 0.7em 1em;
  font-size: 0.9em;
  font-weight: 700;
}
.dm-steps { font-size: 0.82em; font-weight: 600; }
.dm-step-n {
  width: 1.75em;
  height: 1.75em;
  border-radius: 999px;
  font-size: 0.85em;
  font-weight: 700;
}
.dm-stars { color: #FBBC04; letter-spacing: 0.12em; font-size: 1.05em; }

/* Google Maps · reseñas: claro y colorido, botón azul */
.dm-maps { background: #fff; color: #1F2937; }
.dm-maps .dm-glow {
  background:
    radial-gradient(60% 35% at 0% 0%, rgba(66, 133, 244, 0.18), transparent 70%),
    radial-gradient(55% 30% at 100% 8%, rgba(251, 188, 4, 0.2), transparent 70%),
    radial-gradient(70% 35% at 100% 100%, rgba(52, 168, 83, 0.16), transparent 70%),
    radial-gradient(50% 30% at 0% 100%, rgba(234, 67, 53, 0.12), transparent 70%);
}
.dm-maps .dm-icon { background: #fff; box-shadow: 0 6px 18px -8px rgba(31, 41, 55, 0.35); }
.dm-maps .dm-button { background: #1A73E8; color: #fff; }
.dm-maps .dm-step-n { background: #1A73E8; color: #fff; }
.dm-maps .dm-nfc { color: #1A73E8; }

/* Instagram: degradado cálido-violeta */
.dm-instagram {
  background: linear-gradient(160deg, #FEDA75 -10%, #F58529 18%, #DD2A7B 50%, #8134AF 80%, #515BD4 110%);
  color: #fff;
}
.dm-instagram .dm-glow { background: radial-gradient(70% 40% at 50% 0%, rgba(255, 255, 255, 0.28), transparent 70%); }
.dm-instagram .dm-icon { background: rgba(255, 255, 255, 0.16); border: 1px solid rgba(255, 255, 255, 0.4); }
.dm-instagram .dm-button { background: #fff; color: #C13584; }
.dm-instagram .dm-step-n { background: #fff; color: #C13584; }

/* Facebook: tonos azules */
.dm-facebook {
  background: linear-gradient(165deg, #3B8BFF 0%, #1877F2 45%, #0B4FB3 100%);
  color: #fff;
}
.dm-facebook .dm-glow { background: radial-gradient(70% 40% at 100% 0%, rgba(255, 255, 255, 0.24), transparent 70%); }
.dm-facebook .dm-icon { background: rgba(255, 255, 255, 0.16); border: 1px solid rgba(255, 255, 255, 0.4); }
.dm-facebook .dm-button { background: #fff; color: #1877F2; }
.dm-facebook .dm-step-n { background: #fff; color: #1877F2; }
</style>
