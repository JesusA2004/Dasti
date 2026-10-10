<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import AllianceCard from '@/components/alliances/AllianceCard.vue'
import { alliances } from '@/data/alliances'
</script>

<template>
  <div class="pt-[96px]">
    <section class="shell pb-14 pt-10 sm:pt-16" aria-labelledby="alliances-title">
      <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow animate-fade" style="--d: 80ms">Alianzas estratégicas</p>
          <h1 id="alliances-title" class="display-1 mt-6 text-fg">
            <span class="line-mask"><span style="--d: 120ms">Especialistas que</span></span>
            <span class="line-mask"><span style="--d: 220ms" class="serif text-accent">complementan.</span></span>
          </h1>
        </div>
        <div class="animate-rise lg:col-span-5" style="--d: 360ms">
          <p class="lead">
            Colaboramos con especialistas independientes que complementan las necesidades de las empresas.
          </p>
          <p class="mt-4 text-sm leading-relaxed text-fg-3">
            Nuestros aliados son empresas independientes de DASTI. Sus servicios no forman parte del catálogo de DASTI y se
            contratan directamente con cada aliado, bajo sus propias condiciones y responsabilidad.
          </p>
        </div>
      </div>
    </section>

    <section class="shell pb-24" aria-label="Aliados">
      <div class="grid gap-6" :class="alliances.length > 1 ? 'lg:grid-cols-2' : ''">
        <div v-for="(a, i) in alliances" :key="a.slug" v-reveal="{ variant: 'up', delay: i * 100 }" class="flex min-h-[520px]">
          <AllianceCard :alliance="a" />
        </div>
      </div>

      <div class="mt-16 grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:items-center">
        <p class="text-sm leading-relaxed text-fg-2 lg:col-span-8">
          ¿Tu empresa ofrece servicios complementarios a la tecnología y te interesa colaborar con DASTI?
        </p>
        <div class="lg:col-span-4 lg:text-right">
          <RouterLink to="/contacto" class="btn btn-line">
            Proponer una alianza
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
