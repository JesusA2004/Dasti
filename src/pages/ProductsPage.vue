<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import NfcCardVisual from '@/components/products/NfcCardVisual.vue'
import { NFC_PRICING, nfcCardTypes, nfcIndividual } from '@/data/nfc'
import { formatMXN } from '@/utils/format'
</script>

<template>
  <div class="pt-[96px]">
    <section class="shell pb-14 pt-10 sm:pt-16" aria-labelledby="products-title">
      <p class="eyebrow animate-fade" style="--d: 80ms">Productos DASTI</p>
      <h1 id="products-title" class="display-1 mt-6 max-w-4xl text-fg">
        <span class="line-mask"><span style="--d: 120ms">Tecnología que se</span></span>
        <span class="line-mask"><span style="--d: 220ms" class="serif text-accent">puede tocar.</span></span>
      </h1>
      <p class="lead animate-rise mt-8 max-w-2xl" style="--d: 360ms">
        Además de nuestros servicios en TI, desarrollamos productos tecnológicos listos para usar. Comenzamos con
        tarjetas inteligentes NFC.
      </p>
    </section>

    <!-- Producto destacado -->
    <section class="pb-6" aria-label="Tarjetas inteligentes NFC">
      <RouterLink to="/productos/tarjetas-nfc" class="stage on-ink grain group block">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_65%_at_75%_40%,rgba(37,99,235,0.42),transparent_70%)]" aria-hidden="true" />
        <div class="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div class="shell relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-24">
          <div class="lg:col-span-6">
            <span class="chip chip-ink"><span class="dot-live" /> Disponible</span>
            <h2 class="display-2 mt-6 text-on-ink">
              Tarjetas inteligentes NFC
            </h2>
            <p class="lead mt-5 max-w-lg !text-on-ink-2">
              Tarjetas inteligentes. Conexiones inmediatas. Comparte información digital con un toque o mediante su código QR.
            </p>
            <div class="mt-8 flex flex-wrap gap-2">
              <span v-for="t in nfcCardTypes" :key="t.id" class="chip chip-ink">{{ t.short }}</span>
            </div>
            <p class="mt-8 text-sm text-on-ink-3">
              Desde <span class="font-semibold text-on-ink">{{ formatMXN(nfcIndividual.fromPrice) }} {{ NFC_PRICING.currency }}</span>
              · {{ NFC_PRICING.vatLabel }} · Envíos a toda la República
            </p>
            <span class="btn btn-light mt-8">
              Descubrir tarjetas NFC
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </span>
          </div>
          <div class="mx-auto w-full max-w-[520px] transition-transform duration-700 group-hover:-translate-y-2 lg:col-span-6">
            <NfcCardVisual label="Tarjeta inteligente" />
          </div>
        </div>
      </RouterLink>
    </section>

    <section class="shell section-sm" aria-label="Próximos productos">
      <div class="grid gap-6 rounded-[28px] border border-dashed border-line-2 p-8 sm:p-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-8">
          <p class="eyebrow">Catálogo en crecimiento</p>
          <p class="title-4 mt-4 text-fg">Nuevas líneas de producto se publicarán en esta sección.</p>
          <p class="mt-2 text-sm text-fg-2">¿Buscas una solución tecnológica específica? Escríbenos y la revisamos contigo.</p>
        </div>
        <div class="lg:col-span-4 lg:text-right">
          <RouterLink to="/contacto" class="btn btn-line">
            Contactar a DASTI
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
