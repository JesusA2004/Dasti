<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import FooterSection from '@/components/FooterSection.vue'
import FloatingCTA from '@/components/FloatingCTA.vue'
import ThemeSelector from '@/components/ThemeSelector.vue'
</script>

<template>
  <!-- overflow-x:clip clips horizontal overflow without creating a scroll container,
       preserving position:sticky and window.scrollY behaviour for all children. -->
  <div class="relative min-h-screen"
    style="overflow-x: clip; background-color: var(--bg-base); color: var(--text-primary);">
    <AppNavbar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </main>
    <FooterSection />
    <FloatingCTA />
    <ThemeSelector />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
