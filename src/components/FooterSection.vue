<script setup lang="ts">
const year = new Date().getFullYear()

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Cotizador', href: '#cotizador' },
  { name: 'Preguntas frecuentes', href: '#faq' },
  { name: 'Contacto', href: '#contacto' },
]

const serviceLinks = [
  'Desarrollo web',
  'Software a medida',
  'Automatización',
  'Chatbots',
  'Correos empresariales',
  'Redes e infraestructura',
  'Soporte técnico',
  'Equipos de cómputo',
]

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative overflow-hidden" style="background: #020B18; border-top: 1px solid rgba(59,130,246,0.1);">
    <div class="orb w-[600px] h-[400px] top-0 left-1/2 -translate-x-1/2"
      style="background: rgba(37,99,235,0.03);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Main footer content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">

        <!-- Brand column -->
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style="background: linear-gradient(135deg, #2563EB, #1D4ED8);">
              D
            </div>
            <span class="font-display font-bold text-xl gradient-text">DASTI</span>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed mb-1">
            Desarrollo y Aplicación de Soluciones en TI
          </p>
          <p class="text-xs text-slate-500 italic mb-5">
            Tecnología aplicada a soluciones reales.
          </p>
          <a
            href="https://dasti.cloud"
            target="_blank"
            rel="noopener"
            class="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            dasti.cloud
          </a>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">Navegación</h4>
          <ul class="space-y-2.5">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.href"
                @click.prevent="scrollTo(link.href)"
                class="text-sm text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="sm:col-span-2 lg:col-span-2">
          <h4 class="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">Servicios</h4>
          <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            <li v-for="svc in serviceLinks" :key="svc">
              <a
                href="#servicios"
                @click.prevent="scrollTo('#servicios')"
                class="text-sm text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {{ svc }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-slate-600">
          &copy; {{ year }} DASTI. Todos los derechos reservados.
        </p>
        <p class="text-xs text-slate-600">
          Tecnología aplicada a soluciones reales.
        </p>
      </div>
    </div>
  </footer>
</template>
