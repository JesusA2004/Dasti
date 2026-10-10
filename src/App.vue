<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import FooterSection from '@/components/FooterSection.vue'
import FloatingCTA from '@/components/FloatingCTA.vue'
</script>

<template>
  <!-- overflow-x:clip recorta el desbordamiento horizontal sin crear un contenedor
       de scroll, preservando position:sticky y window.scrollY en los hijos. -->
  <div class="relative min-h-screen bg-paper text-fg" style="overflow-x: clip;">
    <a
      href="#contenido"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-on-ink"
    >
      Saltar al contenido
    </a>
    <AppNavbar />
    <main id="contenido">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </main>
    <FooterSection />
    <FloatingCTA />
  </div>
</template>

<style>
.page-enter-active {
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.page-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
}
.page-leave-to {
  opacity: 0;
  transform: translate3d(0, -8px, 0);
}
@media (prefers-reduced-motion: reduce) {
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}
</style>
