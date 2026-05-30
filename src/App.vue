<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import SolutionsByNeed from '@/components/SolutionsByNeed.vue'
import QuoterSection from '@/components/QuoterSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import WhyDasti from '@/components/WhyDasti.vue'
import UseCases from '@/components/UseCases.vue'
import FaqSection from '@/components/FaqSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import FloatingCTA from '@/components/FloatingCTA.vue'
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden" style="background-color: #050D1A; color: #F1F5F9;">
    <AppNavbar />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SolutionsByNeed />
      <QuoterSection />
      <ProcessSection />
      <WhyDasti />
      <UseCases />
      <FaqSection />
      <ContactSection />
    </main>
    <FooterSection />
    <FloatingCTA />
  </div>
</template>
