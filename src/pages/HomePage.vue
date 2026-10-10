<script setup lang="ts">
import InteractiveHero from '@/components/InteractiveHero.vue'
import HomeManifesto from '@/components/home/HomeManifesto.vue'
import HomeSolutions from '@/components/home/HomeSolutions.vue'
import HomeProcess from '@/components/home/HomeProcess.vue'
import HomeNfc from '@/components/home/HomeNfc.vue'
import HomeProjects from '@/components/home/HomeProjects.vue'
import HomeAbout from '@/components/home/HomeAbout.vue'
import HomeAlliances from '@/components/home/HomeAlliances.vue'
import HomeCta from '@/components/home/HomeCta.vue'
</script>

<template>
  <div>
    <!-- 1. Hero tecnológico inmersivo (red de partículas interactiva) -->
    <InteractiveHero />
    <!-- 2. Propuesta de valor (texto que se enciende con el scroll) -->
    <HomeManifesto />
    <!-- 3. Soluciones tecnológicas (índice editorial + imagen activa) -->
    <HomeSolutions />
    <!-- 4. Forma de trabajo (columna fija + pasos) -->
    <HomeProcess />
    <!-- 5. Productos NFC -->
    <div class="pt-6"><HomeNfc /></div>
    <!-- 6. Proyectos (casos en preparación) -->
    <HomeProjects />
    <!-- 7. Acerca de DASTI + modalidades de atención -->
    <HomeAbout />
    <!-- 8. Alianzas estratégicas -->
    <HomeAlliances />
    <!-- 9. CTA final -->
    <HomeCta />
  </div>
</template>
