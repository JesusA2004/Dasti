<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import SectionIntro from '@/components/ui/SectionIntro.vue'
import AllianceCard from '@/components/alliances/AllianceCard.vue'
import { alliances } from '@/data/alliances'
</script>

<template>
  <section class="section pt-0" aria-labelledby="alliances-home-title">
    <div class="shell">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="flex flex-col lg:col-span-5">
          <SectionIntro eyebrow="Alianzas estratégicas">
            <template #title>
              <span id="alliances-home-title">Especialistas <span class="serif">independientes</span> que suman.</span>
            </template>
            Colaboramos con especialistas independientes que complementan las necesidades de las empresas.
          </SectionIntro>
          <p v-reveal="{ variant: 'up', delay: 180 }" class="mt-6 max-w-md text-sm leading-relaxed text-fg-3">
            Cada aliado es una empresa independiente de DASTI y presta sus servicios directamente, bajo sus propias
            condiciones y responsabilidad.
          </p>
          <RouterLink v-reveal="{ variant: 'up', delay: 240 }" to="/alianzas" class="btn btn-line mt-8 self-start lg:mt-auto">
            Ver alianzas
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>

        <div class="grid gap-6 lg:col-span-7" :class="alliances.length > 1 ? 'sm:grid-cols-2' : ''">
          <div v-for="(a, i) in alliances" :key="a.slug" v-reveal="{ variant: 'up', delay: i * 100 }" class="flex min-h-[460px]">
            <AllianceCard :alliance="a" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
