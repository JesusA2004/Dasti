<script setup lang="ts">
import { Mail, Globe, BarChart2, Monitor, Wifi, Bot, GitMerge, Printer, ArrowRight } from '@lucide/vue'

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

const cases = [
  {
    icon: Mail,
    title: 'Empresa con comunicación profesional',
    desc: 'Una empresa mediana requería correos corporativos por área (ventas, administración, soporte, facturación). Se implementaron cuentas con dominio propio, configuración en todos los dispositivos y políticas de seguridad del dominio (SPF, DKIM, DMARC).',
    result: 'Correos corporativos activos y administrados',
    color: '#F472B6',
    tags: ['Correos corporativos', 'Dominio propio', 'Administración'],
  },
  {
    icon: Wifi,
    title: 'Empresa con cobertura WiFi insuficiente',
    desc: 'Una oficina tenía zonas sin señal y dispositivos que se desconectaban al moverse entre áreas. Se implementó un sistema mesh con roaming automático para ofrecer cobertura uniforme en toda la empresa.',
    result: 'Red unificada con roaming entre zonas',
    color: '#60A5FA',
    tags: ['Sistema mesh', 'Roaming', 'Redes empresariales'],
  },
  {
    icon: BarChart2,
    title: 'Área administrativa con reportes manuales',
    desc: 'El equipo administrativo generaba reportes semanales a mano, consumiendo horas de trabajo. Se automatizó la extracción, procesamiento y generación de reportes de forma automática.',
    result: 'Reportes automáticos sin intervención manual',
    color: '#34D399',
    tags: ['Automatización', 'Reportes automáticos', 'Ahorro de tiempo'],
  },
  {
    icon: Monitor,
    title: 'Empresa con equipos lentos',
    desc: 'Una empresa con computadoras de bajo rendimiento que afectaban la productividad del equipo. Se realizó diagnóstico, mantenimiento preventivo y en los casos que lo ameritaban, actualización de hardware.',
    result: 'Rendimiento recuperado sin compras innecesarias',
    color: '#FB923C',
    tags: ['Soporte técnico', 'Mantenimiento', 'Actualización'],
  },
  {
    icon: Globe,
    title: 'Negocio sin presencia digital',
    desc: 'Un negocio de servicios perdía prospectos ante competidores con sitio web. Se desarrolló un sitio moderno, responsivo y optimizado con formulario de contacto y estructura de comunicación clara.',
    result: 'Sitio activo captando prospectos desde el primer mes',
    color: '#818CF8',
    tags: ['Desarrollo web', 'Presencia digital', 'Captación de prospectos'],
  },
  {
    icon: Bot,
    title: 'Negocio con alta demanda de respuestas',
    desc: 'Un negocio recibía las mismas preguntas constantemente por WhatsApp, ocupando tiempo del equipo. Se implementó un chatbot de respuestas automáticas con flujo de captación de datos de prospectos.',
    result: 'Atención inicial automatizada las 24 horas',
    color: '#FBBF24',
    tags: ['Chatbot', 'Automatización', 'Captación de prospectos'],
  },
  {
    icon: GitMerge,
    title: 'Empresa con herramientas desconectadas',
    desc: 'El equipo usaba formularios, hojas de cálculo y un sistema interno que no se comunicaban entre sí. Se integró el flujo de datos para que la información llegara automáticamente al sistema sin capturas manuales.',
    result: 'Información centralizada y sin duplicidades',
    color: '#2DD4BF',
    tags: ['Integración de sistemas', 'Automatización', 'Flujos de datos'],
  },
  {
    icon: Printer,
    title: 'Empresa que necesitaba impresoras configuradas',
    desc: 'Una empresa adquirió impresoras nuevas sin poder configurarlas correctamente en red para que todos los equipos de trabajo las utilizaran. Se configuraron en red y se verificó acceso desde cada área.',
    result: 'Impresoras en red accesibles por toda la oficina',
    color: '#2DD4BF',
    tags: ['Impresoras en red', 'Configuración', 'Soporte técnico'],
  },
]
</script>

<template>
  <section class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[500px] h-[400px] top-0 left-0"
      style="background: rgba(37,99,235,0.05);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
          Ejemplos representativos de cómo DASTI implementa soluciones tecnológicas para resolver problemas concretos en empresas.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          v-for="(item, i) in cases"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: (i % 4) * 80, duration: 600 } }"
          class="glass-card rounded-2xl p-5 flex flex-col group cursor-default"
        >
          <div class="flex items-start gap-3 mb-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              :style="`background: ${item.color}12; border: 1px solid ${item.color}30;`">
              <component :is="item.icon" :size="18" :style="`color: ${item.color}`" />
            </div>
            <h3 class="font-semibold text-white text-sm leading-snug">{{ item.title }}</h3>
          </div>

          <p class="text-xs text-slate-400 leading-relaxed flex-1 mb-3">{{ item.desc }}</p>

          <div class="flex items-center gap-2 p-2.5 rounded-lg mb-3"
            :style="`background: ${item.color}0D; border: 1px solid ${item.color}25;`">
            <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="`background: ${item.color};`"></div>
            <span class="text-xs font-semibold" :style="`color: ${item.color}`">{{ item.result }}</span>
          </div>

          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in item.tags" :key="tag"
              class="text-xs px-2 py-0.5 rounded-full"
              style="background: rgba(255,255,255,0.04); color: #94a3b8; border: 1px solid rgba(255,255,255,0.07);">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mt-12"
      >
        <p class="text-slate-400 mb-4">¿Tu situación es similar a alguno de estos casos?</p>
        <button @click="scrollTo('#contacto')" class="btn-primary">
          Solicitar diagnóstico
          <ArrowRight :size="16" />
        </button>
      </div>

    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
