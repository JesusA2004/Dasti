<script setup lang="ts">
import InteractiveHero from '@/components/InteractiveHero.vue'
import SolutionConfigurator from '@/components/SolutionConfigurator.vue'
import DastiAboutBlock from '@/components/DastiAboutBlock.vue'
import GuidedTourSection from '@/components/GuidedTourSection.vue'
import VisualServicesExplorer from '@/components/VisualServicesExplorer.vue'
import MeetingModesSection from '@/components/MeetingModesSection.vue'
import ProjectShowcasePreview from '@/components/ProjectShowcasePreview.vue'
import MiniQuoteCTA from '@/components/MiniQuoteCTA.vue'
</script>

<template>
  <div>
    <!-- 1. Hero futurista interactivo con canvas + parallax -->
    <InteractiveHero />

    <!-- 2. Configurador de soluciones — área de mejora seleccionable -->
    <SolutionConfigurator />

    <!-- 3. Quiénes somos — editorial con imagen grande -->
    <DastiAboutBlock />

    <!-- 4. Tour guiado: cómo trabajamos en 4 pasos -->
    <GuidedTourSection />

    <!-- 5. Explorador visual de servicios por categoría -->
    <VisualServicesExplorer />

    <!-- 6. Modalidad de atención: remoto / video / presencial -->
    <MeetingModesSection />

    <!-- 7. Preview de proyectos (placeholders elegantes) -->
    <ProjectShowcasePreview />

    <!-- 8. CTA final hacia el cotizador -->
    <MiniQuoteCTA />
  </div>
</template>
