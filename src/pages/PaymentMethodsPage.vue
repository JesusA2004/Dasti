<script setup lang="ts">
import { ArrowLeftRight, ArrowUpRight, Banknote, CreditCard, Info } from '@lucide/vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import {
  PAYMENT_NOTE,
  PAYMENT_SCOPE_NOTE,
  paymentMethods,
  paymentWhatsAppUrl,
  type PaymentMethodId,
} from '@/data/payments'

/*
 * Página informativa de métodos de pago de DASTI.
 * No hay cobro en línea ni pasarela: los pagos se coordinan con el equipo.
 */
const methodIcons: Record<PaymentMethodId, typeof Banknote> = {
  efectivo: Banknote,
  transferencia: ArrowLeftRight,
  tarjetas: CreditCard,
}
</script>

<template>
  <div class="pt-[96px]">
    <!-- ─── Encabezado ─── -->
    <section class="shell grid gap-10 pb-14 pt-10 sm:pt-16 lg:grid-cols-12 lg:items-end" aria-labelledby="payments-title">
      <div class="lg:col-span-7">
        <p class="eyebrow animate-fade" style="--d: 80ms">Pagos</p>
        <h1 id="payments-title" class="display-1 mt-6 text-fg">
          <span class="line-mask"><span style="--d: 120ms">Métodos</span></span>
          <span class="line-mask"><span style="--d: 220ms" class="serif text-accent">de pago.</span></span>
        </h1>
      </div>
      <p class="lead animate-rise lg:col-span-5" style="--d: 360ms">
        En DASTI contamos con diferentes opciones para que puedas realizar tus pagos de forma cómoda y segura.
      </p>
    </section>

    <!-- ─── Métodos ─── -->
    <section class="shell pb-6" aria-label="Métodos de pago aceptados">
      <ul class="grid gap-5 md:grid-cols-3">
        <li
          v-for="(m, i) in paymentMethods"
          :key="m.id"
          v-reveal="{ variant: 'up', delay: i * 90 }"
          class="card flex flex-col rounded-[30px] p-7 sm:p-8"
        >
          <span class="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
            <component :is="methodIcons[m.id]" :size="20" />
          </span>
          <h2 class="title-4 mt-8 text-fg">{{ m.title }}</h2>
          <p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">{{ m.description }}</p>
        </li>
      </ul>

      <!-- Consideraciones -->
      <div v-reveal="'up'" class="mt-6 flex items-start gap-3 rounded-[22px] border border-line bg-paper-2 p-5 sm:p-6">
        <Info :size="18" class="mt-0.5 shrink-0 text-accent" />
        <div class="text-sm leading-relaxed text-fg-2">
          <p class="font-semibold text-fg">{{ PAYMENT_NOTE }}</p>
          <p class="mt-1">{{ PAYMENT_SCOPE_NOTE }}</p>
        </div>
      </div>
    </section>

    <!-- ─── Contacto ─── -->
    <section class="pb-6 pt-14" aria-labelledby="payments-cta-title">
      <div class="stage on-ink grain">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(37,99,235,0.38),transparent_70%)]" aria-hidden="true" />
        <div class="shell section relative grid items-end gap-10 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <h2 id="payments-cta-title" v-reveal="'clip'" class="display-2 text-on-ink">
              ¿Dudas sobre <span class="serif text-signal">cómo pagar?</span>
            </h2>
            <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-6 max-w-xl !text-on-ink-2">
              Escríbenos por WhatsApp y te orientamos sobre las opciones disponibles para tu pedido o contratación.
            </p>
          </div>
          <div v-reveal="{ variant: 'up', delay: 160 }" class="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <a :href="paymentWhatsAppUrl" target="_blank" rel="noopener noreferrer" class="btn btn-wa">
              Consultar opciones de pago
              <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
            </a>
            <RouterLink to="/contacto" class="btn btn-ghost-ink">
              Otros medios de contacto
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
