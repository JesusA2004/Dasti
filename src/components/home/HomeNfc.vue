<script setup lang="ts">
import { ArrowUpRight, QrCode, Palette, Smartphone } from '@lucide/vue'
import NfcCardVisual from '@/components/products/NfcCardVisual.vue'
import { NFC_PRICING, nfcCardTypes, nfcIndividual } from '@/data/nfc'
import { formatMXN } from '@/utils/format'

const points = [
  { icon: Smartphone, title: 'Con un toque', desc: 'Acércala a un smartphone compatible con NFC.' },
  { icon: QrCode, title: 'O con su QR', desc: 'Alternativa para equipos sin NFC activo.' },
  { icon: Palette, title: 'Personalizada', desc: 'Diseño y destino definidos contigo.' },
]
</script>

<template>
  <section class="stage on-ink grain" aria-labelledby="nfc-home-title">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-[radial-gradient(55%_60%_at_25%_45%,rgba(37,99,235,0.35),transparent_70%)]" />
      <div class="tech-grid absolute inset-0 opacity-60" />
    </div>

    <div class="shell section relative">
      <div class="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <!-- Visual -->
        <div v-reveal="'scale'" class="relative mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-none lg:pr-10">
          <div class="relative">
            <NfcCardVisual label="Presentación digital" finish="midnight" />
            <div class="absolute -bottom-6 right-0 w-[58%] sm:-bottom-10">
              <NfcCardVisual label="Reseñas" finish="pearl" :waves="false" :interactive="false" />
            </div>
          </div>
        </div>

        <!-- Texto -->
        <div class="lg:col-span-6">
          <p v-reveal="'fade'" class="eyebrow !text-on-ink-3">Productos DASTI · Nuevo</p>
          <h2 id="nfc-home-title" v-reveal="'clip'" class="display-2 mt-5 text-on-ink">
            Tarjetas inteligentes.
            <span class="serif block text-signal">Conexiones inmediatas.</span>
          </h2>
          <p v-reveal="{ variant: 'up', delay: 120 }" class="lead mt-6 max-w-xl !text-on-ink-2">
            Comparte tu información digital con un solo toque mediante tecnología NFC, o a través de su código QR.
            Contacto, redes sociales, reseñas o el enlace que necesites.
          </p>

          <ul class="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-ink-line bg-ink-line sm:grid-cols-3">
            <li
              v-for="(p, i) in points"
              :key="p.title"
              v-reveal="{ variant: 'up', delay: 160 + i * 80 }"
              class="bg-[#071426] p-5"
            >
              <component :is="p.icon" :size="18" class="text-signal" />
              <p class="mt-4 text-sm font-semibold text-on-ink">{{ p.title }}</p>
              <p class="mt-1 text-[0.82rem] leading-snug text-on-ink-3">{{ p.desc }}</p>
            </li>
          </ul>

          <div v-reveal="{ variant: 'up', delay: 260 }" class="mt-8 flex flex-wrap gap-2">
            <span v-for="t in nfcCardTypes" :key="t.id" class="chip chip-ink">{{ t.short }}</span>
          </div>

          <p v-reveal="{ variant: 'up', delay: 300 }" class="mt-8 text-sm text-on-ink-3">
            Desde <span class="font-semibold text-on-ink">{{ formatMXN(nfcIndividual.fromPrice) }} {{ NFC_PRICING.currency }}</span>
            · {{ NFC_PRICING.vatLabel }} · Combos y envíos a toda la República
          </p>

          <RouterLink v-reveal="{ variant: 'up', delay: 320 }" to="/productos/tarjetas-nfc" class="btn btn-light mt-8">
            Descubrir tarjetas NFC
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
