<script setup lang="ts">
import { Mail, Globe, Zap, Monitor, Database, Users2, ShieldCheck, Network, ArrowRight } from '@lucide/vue'

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

const needs = [
  {
    icon: Mail,
    problem: 'Mi empresa necesita correos profesionales',
    solution: 'Correo empresarial administrado',
    desc: 'Configuramos cuentas con dominio propio, administración por área y soporte técnico incluido.',
    color: '#F472B6',
    href: '#servicios',
  },
  {
    icon: Globe,
    problem: 'Quiero una página web moderna',
    solution: 'Desarrollo web profesional',
    desc: 'Diseñamos sitios rápidos, responsivos y visualmente atractivos para captar más clientes.',
    color: '#818CF8',
    href: '#servicios',
  },
  {
    icon: Zap,
    problem: 'Necesito automatizar procesos internos',
    solution: 'Automatización de procesos',
    desc: 'Eliminamos tareas repetitivas y conectamos sistemas para ahorrar tiempo y reducir errores.',
    color: '#34D399',
    href: '#servicios',
  },
  {
    icon: Monitor,
    problem: 'Mis equipos están lentos o con fallas',
    solution: 'Soporte técnico y mantenimiento',
    desc: 'Diagnóstico, mantenimiento preventivo y actualización de equipos para una operación sin interrupciones.',
    color: '#FB923C',
    href: '#servicios',
  },
  {
    icon: Database,
    problem: 'Necesito administrar mejor mi información',
    solution: 'Software a la medida',
    desc: 'Desarrollamos sistemas de gestión con paneles, reportes y control de acceso para tu equipo.',
    color: '#3B82F6',
    href: '#servicios',
  },
  {
    icon: Users2,
    problem: 'Quiero captar más clientes en línea',
    solution: 'Web + Chatbot + Marketing digital',
    desc: 'Combinamos presencia digital, automatización de respuestas y herramientas de captación.',
    color: '#FBBF24',
    href: '#servicios',
  },
  {
    icon: ShieldCheck,
    problem: 'Necesito soporte técnico confiable',
    solution: 'Soporte técnico especializado',
    desc: 'Atendemos fallas, realizamos diagnósticos y mantenemos tus equipos en óptimas condiciones.',
    color: '#A78BFA',
    href: '#servicios',
  },
  {
    icon: Network,
    problem: 'Quiero mejorar mi red o infraestructura',
    solution: 'Redes e infraestructura tecnológica',
    desc: 'Configuramos y mejoramos la red de tu empresa para una conectividad estable y segura.',
    color: '#60A5FA',
    href: '#servicios',
  },
]
</script>

<template>
  <section class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[600px] h-[400px] bottom-0 right-0"
      style="background: rgba(129,140,248,0.04);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Soluciones por necesidad</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Identifica qué</span>
          <span class="gradient-text block"> necesita tu empresa</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Cada empresa tiene necesidades distintas. Encuentra la solución que mejor se adapta a tu situación actual.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(item, i) in needs"
          :key="item.problem"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: (i % 4) * 80, duration: 600 } }"
          class="glass-card rounded-2xl p-5 group cursor-default flex flex-col"
        >
          <!-- Icon badge -->
          <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            :style="`background: ${item.color}12; border: 1px solid ${item.color}30;`">
            <component :is="item.icon" :size="20" :style="`color: ${item.color}`" />
          </div>

          <!-- Problem statement -->
          <p class="text-sm font-semibold text-white mb-2 leading-snug">{{ item.problem }}</p>

          <!-- Solution label -->
          <div class="mb-3">
            <span class="text-xs px-2 py-0.5 rounded-full font-medium"
              :style="`background: ${item.color}15; color: ${item.color}; border: 1px solid ${item.color}25;`">
              {{ item.solution }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-400 leading-relaxed flex-1">{{ item.desc }}</p>

          <!-- Link -->
          <a
            :href="item.href"
            @click.prevent="scrollTo(item.href)"
            class="mt-4 flex items-center gap-1 text-xs font-medium transition-colors duration-200"
            :style="`color: ${item.color};`"
          >
            Ver solución
            <ArrowRight :size="12" class="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
