<script setup lang="ts">
import { MapPin, Laptop, Users, Zap } from '@lucide/vue'

const data = [
  { icon: MapPin,  color: '#3B82F6', label: 'Morelos',    sub: 'Cuernavaca y zona' },
  { icon: Laptop,  color: '#34D399', label: 'Remoto',     sub: 'Y presencial' },
  { icon: Users,   color: '#F472B6', label: 'Empresas',   sub: 'Clientes activos' },
  { icon: Zap,     color: '#FBBF24', label: '14+ Servicios', sub: 'En TI' },
]
</script>

<template>
  <section class="py-24 relative overflow-hidden" style="background: var(--bg-surface);">
    <div class="orb w-[500px] h-[400px] -top-40 left-0 opacity-10" style="background: var(--accent-glow);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-14 items-center">

        <!-- Left: image frame -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 680 } }"
          class="relative"
        >
          <!-- Main image -->
          <div class="relative rounded-2xl overflow-hidden img-zoom aspect-[4/3]" style="box-shadow: var(--shadow-lg);">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80"
              alt="DASTI equipo de trabajo"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(135deg, var(--accent-glow-sm) 0%, transparent 55%);" />
          </div>

          <!-- Floating data cards -->
          <div
            class="absolute -bottom-5 -right-5 glass-card rounded-2xl p-4 flex items-center gap-3"
            style="box-shadow: var(--shadow-md);"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3);">
              <MapPin :size="18" style="color: #34D399;" />
            </div>
            <div>
              <p class="text-xs font-bold leading-tight" style="color: var(--text-primary);">Morelos, México</p>
              <p class="text-xs" style="color: var(--text-muted);">Atención local y remota</p>
            </div>
          </div>

          <div
            class="absolute -top-4 -left-4 glass-card rounded-2xl px-4 py-3 flex items-center gap-2.5"
            style="box-shadow: var(--shadow-md);"
          >
            <div class="w-2 h-2 rounded-full animate-pulse" style="background: #34D399;" />
            <span class="text-xs font-semibold" style="color: var(--text-primary);">DASTI — Activos</span>
          </div>
        </div>

        <!-- Right: content -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 680, delay: 100 } }"
        >
          <span class="tag mb-5 inline-block">¿Quiénes somos?</span>
          <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl mb-5" style="color: var(--text-primary);">
            Desarrollo y Aplicación de
            <span class="gradient-text"> Soluciones en TI</span>
          </h2>
          <p class="text-base sm:text-lg leading-relaxed mb-8" style="color: var(--text-secondary);">
            DASTI es una empresa ubicada en Morelos enfocada en desarrollar, implementar y administrar soluciones en Tecnologías de la Información para empresas que buscan mejorar su operación, infraestructura, comunicación y procesos internos.
          </p>

          <!-- Key data grid -->
          <div class="grid grid-cols-2 gap-3 mb-8">
            <div
              v-for="d in data"
              :key="d.label"
              class="glass-card rounded-xl p-4 flex items-center gap-3"
            >
              <div
                class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                :style="`background: ${d.color}18; border: 1px solid ${d.color}30;`"
              >
                <component :is="d.icon" :size="16" :style="`color: ${d.color};`" />
              </div>
              <div>
                <p class="text-sm font-bold leading-tight" style="color: var(--text-primary);">{{ d.label }}</p>
                <p class="text-xs" style="color: var(--text-muted);">{{ d.sub }}</p>
              </div>
            </div>
          </div>

          <p class="text-sm leading-relaxed" style="color: var(--text-muted);">
            Desarrollamos, implementamos, administramos, integramos, optimizamos, suministramos y asesoramos. Una empresa de TI completa para tu empresa.
          </p>
        </div>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto mt-20" />
  </section>
</template>
