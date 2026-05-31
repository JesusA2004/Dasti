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

// Placeholders — replace hrefs with real URLs when available
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/dasticloud',
    color: '#1877F2',
    icon: 'facebook',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/dasticloud',
    color: '#E1306C',
    icon: 'instagram',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/dasti',
    color: '#0A66C2',
    icon: 'linkedin',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@dasticloud',
    color: '#ffffff',
    icon: 'tiktok',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/527771234567',
    color: '#25D366',
    icon: 'whatsapp',
  },
]
</script>

<template>
  <footer class="relative overflow-hidden" style="background: var(--bg-base);">

    <!-- Top gradient accent border -->
    <div
      class="absolute top-0 inset-x-0 h-[1px]"
      style="background: linear-gradient(90deg, transparent 0%, var(--accent-light) 30%, var(--accent) 50%, var(--accent-light) 70%, transparent 100%);"
    />

    <!-- Ambient orb -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
      style="background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%); opacity: 0.06;"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Main grid: Brand | Nav | Social -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-14 pb-10">

        <!-- ── Brand column ── -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2.5">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
              style="background: linear-gradient(135deg, var(--accent-light), var(--accent)); box-shadow: 0 0 16px var(--accent-glow);"
            >
              D
            </div>
            <span class="font-display font-bold text-xl gradient-text">DASTI</span>
          </div>

          <p class="text-sm leading-relaxed max-w-[240px]" style="color: var(--text-secondary);">
            Tecnología aplicada a soluciones reales.
          </p>

          <a
            href="https://dasti.cloud"
            target="_blank"
            rel="noopener"
            class="text-xs font-medium w-fit transition-all duration-200 hover:opacity-80"
            style="color: var(--accent-lighter);"
          >
            dasti.cloud ↗
          </a>
        </div>

        <!-- ── Nav column ── -->
        <div class="flex flex-col gap-3">
          <p class="text-xs font-bold tracking-widest uppercase mb-1" style="color: var(--text-muted);">
            Navegación
          </p>
          <button
            v-for="link in navLinks"
            :key="link.name"
            @click="router.push(link.href)"
            class="text-sm text-left w-fit transition-all duration-200 cursor-pointer hover:translate-x-1"
            style="color: var(--text-secondary);"
            @mouseenter="($event.target as HTMLElement).style.color = 'var(--text-primary)'"
            @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-secondary)'"
          >
            {{ link.name }}
          </button>
        </div>

        <!-- ── Social column ── -->
        <div class="flex flex-col gap-4">
          <p class="text-xs font-bold tracking-widest uppercase mb-1" style="color: var(--text-muted);">
            Conecta con nosotros
          </p>

          <div class="flex flex-wrap gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :title="social.name"
              class="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
              style="background: var(--bg-card); border: 1px solid var(--border-subtle);"
              @mouseenter="(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = social.color + '18'
                el.style.borderColor = social.color + '50'
                el.style.boxShadow = `0 0 18px ${social.color}30`
                el.style.transform = 'translateY(-2px) scale(1.08)'
              }"
              @mouseleave="(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--bg-card)'
                el.style.borderColor = 'var(--border-subtle)'
                el.style.boxShadow = 'none'
                el.style.transform = 'none'
              }"
            >
              <!-- Facebook -->
              <svg
                v-if="social.icon === 'facebook'"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="17"
                height="17"
                style="color: var(--text-muted); transition: color 0.2s; flex-shrink: 0;"
                class="group-hover:!text-[#1877F2]"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <!-- Instagram -->
              <svg
                v-else-if="social.icon === 'instagram'"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="17"
                height="17"
                style="color: var(--text-muted); transition: color 0.2s; flex-shrink: 0;"
                class="group-hover:!text-[#E1306C]"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <!-- LinkedIn -->
              <svg
                v-else-if="social.icon === 'linkedin'"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="17"
                height="17"
                style="color: var(--text-muted); transition: color 0.2s; flex-shrink: 0;"
                class="group-hover:!text-[#0A66C2]"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <!-- TikTok (custom SVG) -->
              <svg
                v-else-if="social.icon === 'tiktok'"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
                style="color: var(--text-muted); transition: color 0.2s; flex-shrink: 0;"
                class="group-hover:!text-white"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z"/>
              </svg>
              <!-- WhatsApp (custom SVG) -->
              <svg
                v-else-if="social.icon === 'whatsapp'"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
                style="color: var(--text-muted); transition: color 0.2s; flex-shrink: 0;"
                class="group-hover:!text-[#25D366]"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </div>

          <!-- Contact nudge -->
          <p class="text-xs mt-1" style="color: var(--text-muted);">
            Morelos, México · Disponibles en línea
          </p>
        </div>

      </div>

      <!-- Bottom bar -->
      <div
        class="py-5 flex flex-col sm:flex-row items-center justify-between gap-2"
        style="border-top: 1px solid var(--border-subtle);"
      >
        <p class="text-xs" style="color: var(--text-muted);">
          &copy; {{ year }} DASTI. Todos los derechos reservados.
        </p>
        <p class="text-xs" style="color: var(--text-muted);">
          Desarrollo y Aplicación de Soluciones en TI
        </p>
      </div>

    </div>
  </footer>
</template>
