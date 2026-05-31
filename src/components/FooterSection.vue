<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const year = new Date().getFullYear()

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Cotizador', href: '/cotizador' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
]
</script>

<template>
  <footer class="relative overflow-hidden" style="background: var(--bg-base); border-top: 1px solid var(--border-subtle);">
    <div class="orb w-[500px] h-[300px] top-0 left-1/2 -translate-x-1/2 opacity-[0.04]" style="background: var(--accent-glow);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Main row -->
      <div class="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-8 py-10">

        <!-- Brand -->
        <div class="flex flex-col items-center sm:items-start gap-1.5 text-center sm:text-left">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white"
              style="background: linear-gradient(135deg, var(--accent-light), var(--accent));">
              D
            </div>
            <span class="font-display font-bold text-lg gradient-text">DASTI</span>
          </div>
          <p class="text-xs" style="color: var(--text-muted);">Tecnología aplicada a soluciones reales.</p>
          <a
            href="https://dasti.cloud"
            target="_blank"
            rel="noopener"
            class="text-xs transition-colors"
            style="color: var(--accent-lighter);"
          >
            dasti.cloud
          </a>
        </div>

        <!-- Nav links -->
        <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <button
            v-for="link in navLinks"
            :key="link.name"
            @click="router.push(link.href)"
            class="text-sm transition-colors cursor-pointer"
            style="color: var(--text-muted);"
            @mouseenter="($event.target as HTMLElement).style.color = 'var(--text-primary)'"
            @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-muted)'"
          >
            {{ link.name }}
          </button>
        </nav>
      </div>

      <!-- Bottom bar -->
      <div class="py-5 flex flex-col sm:flex-row items-center justify-between gap-2"
        style="border-top: 1px solid var(--border-subtle);">
        <p class="text-xs" style="color: var(--text-muted);">
          &copy; {{ year }} DASTI. Todos los derechos reservados.
        </p>
        <p class="text-xs" style="color: var(--text-muted);">
          Morelos, México · Desarrollo y Aplicación de Soluciones en TI
        </p>
      </div>
    </div>
  </footer>
</template>
