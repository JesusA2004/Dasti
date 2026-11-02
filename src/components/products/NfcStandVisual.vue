<script setup lang="ts">
import NfcCardVisual from '@/components/products/NfcCardVisual.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import { nfcImages } from '@/data/nfc'

/**
 * Tarjeta vertical sobre su soporte de madera.
 * Si existe la fotografía real (`nfcImages.stand.src`), se muestra la foto;
 * mientras tanto, una representación sobria e identificada como ilustrativa.
 */
const photo = nfcImages.stand
</script>

<template>
  <div v-if="photo.src" class="aspect-[4/5] overflow-hidden rounded-[28px]">
    <MediaFrame :src="photo.src" :alt="photo.alt" />
  </div>
  <figure v-else class="stand-wrap" role="img" aria-label="Ilustración de una tarjeta NFC vertical sobre su soporte de madera">
    <div class="stand-card">
      <NfcCardVisual label="Lista para exhibir" finish="midnight" :interactive="false" :waves="false" />
    </div>
    <div class="stand-base" aria-hidden="true">
      <span class="stand-slot" />
    </div>
    <figcaption class="mt-6 text-center text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-fg-3">
      Representación ilustrativa
    </figcaption>
  </figure>
</template>

<style scoped>
.stand-wrap {
  position: relative;
  margin: 0 auto;
  width: min(100%, 250px);
}
.stand-card {
  position: relative;
  z-index: 1;
  width: 72%;
  margin: 0 auto -18%;
}
/* Oculta la sombra flotante de la tarjeta: aquí descansa sobre el soporte */
.stand-card :deep(.nfc-shadow) { display: none; }
.stand-card :deep(.nfc-float) { animation: none; }
/* Recta dentro de la ranura del soporte */
.stand-wrap .stand-card :deep(.nfc-card) { transform: none; }

.stand-base {
  position: relative;
  z-index: 2;
  height: 54px;
  border-radius: 10px 10px 14px 14px;
  background:
    repeating-linear-gradient(92deg, rgba(92, 52, 22, 0.16) 0 2px, transparent 2px 11px),
    repeating-linear-gradient(88deg, rgba(255, 236, 205, 0.12) 0 1px, transparent 1px 7px),
    linear-gradient(180deg, #C89A67 0%, #A8743F 55%, #8A5A2B 100%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.35) inset,
    0 24px 40px -18px rgba(60, 34, 12, 0.6);
}
.stand-slot {
  position: absolute;
  top: 9px;
  left: 50%;
  width: 62%;
  height: 5px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(60, 34, 12, 0.55);
}
</style>
