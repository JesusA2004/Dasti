<script setup lang="ts">
import { Mail, Globe, BarChart2, Monitor, Network, Bot, ArrowRight } from '@lucide/vue'

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

const cases = [
  {
    icon: Mail,
    title: 'Empresa con comunicación profesional',
    desc: 'Una empresa mediana necesitaba correos corporativos por área (ventas, administración, soporte). Implementamos correos con dominio propio, configuración en todos los dispositivos y políticas de seguridad básicas.',
    result: 'Correos empresariales activos en 48h',
    color: '#F472B6',
    tags: ['Correo empresarial', 'Dominio propio'],
  },
  {
    icon: Globe,
    title: 'Negocio que necesitaba presencia digital',
    desc: 'Un negocio de servicios no tenía sitio web y perdía prospectos frente a competidores con presencia digital. Desarrollamos un sitio moderno con formulario de contacto y posicionamiento básico.',
    result: 'Sitio activo y captando prospectos',
    color: '#818CF8',
    tags: ['Desarrollo web', 'Presencia digital'],
  },
  {
    icon: BarChart2,
    title: 'Área administrativa con reportes manuales',
    desc: 'El equipo administrativo generaba reportes a mano cada semana, consumiendo horas de trabajo. Automatizamos la extracción y presentación de datos con reportes generados de forma automática.',
    result: '-80% tiempo en generación de reportes',
    color: '#34D399',
    tags: ['Automatización', 'Reportes automáticos'],
  },
  {
    icon: Monitor,
    title: 'Equipo de trabajo con equipos lentos',
    desc: 'Una empresa tenía computadoras con bajo rendimiento que afectaban la productividad. Realizamos diagnóstico, mantenimiento preventivo y en algunos casos recomendamos actualización de hardware.',
    result: 'Rendimiento recuperado sin compras innecesarias',
    color: '#FB923C',
    tags: ['Soporte técnico', 'Equipos de cómputo'],
  },
  {
    icon: Network,
    title: 'Empresa con problemas de conectividad',
    desc: 'Una oficina tenía red lenta e inestable que afectaba videoconferencias y trabajo colaborativo. Evaluamos la infraestructura y realizamos mejoras en configuración de red y equipo de conectividad.',
    result: 'Red estable y segmentada por área',
    color: '#60A5FA',
    tags: ['Redes', 'Infraestructura'],
  },
  {
    icon: Bot,
    title: 'Negocio con alta demanda de preguntas frecuentes',
    desc: 'Un negocio recibía las mismas preguntas por WhatsApp constantemente, ocupando tiempo del equipo. Implementamos un bot de respuestas automáticas con flujo de captación de prospectos.',
    result: 'Atención automatizada las 24h',
    color: '#FBBF24',
    tags: ['Chatbot', 'Automatización de comunicación'],
  },
]
</script>

<template>
  <section class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[500px] h-[400px] top-0 left-0"
      style="background: rgba(37,99,235,0.05);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Casos de uso</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Soluciones en</span>
          <span class="gradient-text block">situaciones reales</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Ejemplos representativos de cómo DASTI aplica tecnología para resolver problemas concretos en empresas reales.
        </p>
      </div>

      <!-- Cases grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(item, i) in cases"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: (i % 3) * 100, duration: 600 } }"
          class="glass-card rounded-2xl p-6 flex flex-col group cursor-default"
        >
          <!-- Header -->
          <div class="flex items-start gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              :style="`background: ${item.color}12; border: 1px solid ${item.color}30;`">
              <component :is="item.icon" :size="20" :style="`color: ${item.color}`" />
            </div>
            <h3 class="font-semibold text-white text-sm leading-snug">{{ item.title }}</h3>
          </div>

          <!-- Description -->
          <p class="text-sm text-slate-400 leading-relaxed flex-1 mb-4">{{ item.desc }}</p>

          <!-- Result badge -->
          <div class="flex items-center gap-2 p-3 rounded-lg mb-3"
            :style="`background: ${item.color}0D; border: 1px solid ${item.color}25;`">
            <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="`background: ${item.color};`"></div>
            <span class="text-xs font-semibold" :style="`color: ${item.color}`">{{ item.result }}</span>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in item.tags" :key="tag"
              class="text-xs px-2 py-0.5 rounded-full"
              style="background: rgba(255,255,255,0.04); color: #94a3b8; border: 1px solid rgba(255,255,255,0.07);">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Bottom prompt -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mt-12"
      >
        <p class="text-slate-400 mb-4">¿Tu situación es similar a alguno de estos casos?</p>
        <button
          @click="scrollTo('#contacto')"
          class="btn-primary"
        >
          Solicitar diagnóstico
          <ArrowRight :size="16" />
        </button>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
