<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const year = new Date().getFullYear()

const WHATSAPP_NUMBER = '527774428209'
const whatsappMessage = 'Hola, me interesa recibir asesoría de DASTI para una solución en TI.'

const whatsappUrl = computed(() =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
)

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Cotizador', href: '/cotizador' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
]


const socialLinks = [
  { name: 'Facebook',  href: 'https://www.facebook.com/people/DASTI/61590477301833/', color: '#1877F2', icon: 'facebook'  },
  { name: 'Instagram', href: 'https://www.instagram.com/grupodasti/',                  color: '#E1306C', icon: 'instagram' },
  { name: 'TikTok',   href: 'https://tiktok.com/@dasticloud',                          color: '#69C9D0', icon: 'tiktok'   },
  { name: 'WhatsApp', href: whatsappUrl.value,                                         color: '#25D366', icon: 'whatsapp' },
]

const particles = [
  { left: '3%',  top: '28%', size: '8px',  delay: '0s',   duration: '8s',  opacity: '0.82', anim: 'f-float-a' },
  { left: '9%',  top: '62%', size: '5px',  delay: '1.2s', duration: '11s', opacity: '0.55', anim: 'f-float-b' },
  { left: '16%', top: '18%', size: '10px', delay: '0.4s', duration: '9s',  opacity: '0.72', anim: 'f-float-c' },
  { left: '24%', top: '72%', size: '6px',  delay: '1.8s', duration: '13s', opacity: '0.52', anim: 'f-float-a' },
  { left: '33%', top: '35%', size: '7px',  delay: '0.7s', duration: '10s', opacity: '0.68', anim: 'f-float-b' },
  { left: '43%', top: '78%', size: '5px',  delay: '2.2s', duration: '12s', opacity: '0.48', anim: 'f-float-c' },
  { left: '50%', top: '22%', size: '9px',  delay: '0.3s', duration: '8s',  opacity: '0.76', anim: 'f-float-a' },
  { left: '58%', top: '65%', size: '6px',  delay: '1.5s', duration: '11s', opacity: '0.58', anim: 'f-float-b' },
  { left: '66%', top: '30%', size: '8px',  delay: '0.9s', duration: '9s',  opacity: '0.70', anim: 'f-float-c' },
  { left: '74%', top: '70%', size: '5px',  delay: '1.1s', duration: '12s', opacity: '0.50', anim: 'f-float-a' },
  { left: '81%', top: '20%', size: '11px', delay: '0.2s', duration: '8s',  opacity: '0.78', anim: 'f-float-b' },
  { left: '88%', top: '55%', size: '6px',  delay: '1.7s', duration: '10s', opacity: '0.60', anim: 'f-float-c' },
  { left: '95%', top: '36%', size: '8px',  delay: '0.6s', duration: '9s',  opacity: '0.74', anim: 'f-float-a' },
]

const coverageZones = [
  { zone: 'Morelos · Cuernavaca',      label: 'Zona principal',  color: '#3B82F6' },
  { zone: 'CDMX · Estado de México',   label: 'Zona extendida',  color: '#818CF8' },
  { zone: 'Puebla y estados cercanos', label: 'Cobertura regional', color: '#34D399' },
  { zone: 'Atención remota',           label: 'Sin restricción', color: '#FBBF24' },
]

function goTo(href: string) { router.push(href) }
function goToServices() { router.push('/servicios') }
</script>

<template>
  <footer
    class="relative w-full overflow-hidden"
    style="background: var(--bg-base); color: var(--text-primary);"
  >

    <!-- ── Fondo: grid tecnológico + glows + partículas ─────────── -->
    <div class="f-grid pointer-events-none absolute inset-0" />

    <div
      class="pointer-events-none absolute left-1/4 -top-40 h-[560px] w-[800px] -translate-x-1/2 rounded-full blur-3xl"
      style="background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 65%); opacity: 0.26;"
    />
    <div
      class="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full blur-3xl"
      style="background: radial-gradient(circle, var(--accent) 0%, transparent 70%); opacity: 0.09;"
    />
    <div
      class="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full blur-3xl"
      style="background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%); opacity: 0.07;"
    />

    <!-- Partículas flotantes -->
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="f-particle pointer-events-none absolute rounded-full"
      :style="`
        left: ${p.left}; top: ${p.top};
        width: ${p.size}; height: ${p.size};
        opacity: ${p.opacity};
        animation-name: ${p.anim};
        animation-delay: ${p.delay};
        animation-duration: ${p.duration};
        background: var(--accent-light);
        box-shadow: 0 0 18px var(--accent-light), 0 0 38px var(--accent-glow);
      `"
    />

    <!-- Línea superior de acento -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px"
      style="background: linear-gradient(90deg, transparent 0%, var(--accent-light) 18%, var(--accent) 50%, var(--accent-light) 82%, transparent 100%);"
    />

    <!-- ══════════════════════════════════════════════════════════
         FRANJA 1 — CTA: texto izquierda / botones derecha
    ══════════════════════════════════════════════════════════ -->
    <section
      class="f-cta-band relative w-full"
      aria-label="Llamada a acción — contactar DASTI"
    >
      <!-- Overlay de banda -->
      <div
        class="pointer-events-none absolute inset-0"
        style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 55%, var(--bg-surface) 100%); opacity: 0.65;"
      />
      <!-- Diagonal deco subtle -->
      <div class="pointer-events-none absolute inset-0 f-diag" />
      <!-- Separador inferior -->
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style="background: linear-gradient(90deg, transparent 0%, var(--border-subtle) 25%, var(--border-medium) 50%, var(--border-subtle) 75%, transparent 100%);"
      />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div class="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">

          <!-- Texto -->
          <div class="flex-1">
            <div class="flex items-center gap-2.5 mb-6">
              <span
                class="w-2 h-2 rounded-full animate-pulse"
                style="background: var(--accent);"
              />
              <span
                class="text-xs font-bold uppercase tracking-widest"
                style="color: var(--accent);"
              >DASTI · Soluciones en TI</span>
            </div>

            <h2
              class="font-display font-bold leading-tight mb-5"
              style="font-size: clamp(1.65rem, 3.8vw, 2.7rem); color: var(--text-primary);"
            >
              ¿Listo para llevar tu empresa<br class="hidden sm:block" />
              al siguiente nivel tecnológico?
            </h2>

            <p
              class="text-base leading-relaxed max-w-xl"
              style="color: var(--text-secondary);"
            >
              Cuéntanos qué necesita tu operación y te orientamos con una solución en TI
              clara, funcional y escalable.
            </p>
          </div>

          <!-- Botones -->
          <div class="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[230px] shrink-0">
            <button
              type="button"
              class="f-btn f-btn-primary"
              aria-label="Cotizar solución con DASTI"
              @click="goTo('/cotizador')"
            >
              Cotizar solución
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>

            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="f-btn f-btn-wa"
              aria-label="Hablar con DASTI por WhatsApp"
            >
              Hablar por WhatsApp
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         FRANJA 2 — Marca / Nav / Servicios / Contacto
         Sin cards — columnas abiertas con separador sutil
    ══════════════════════════════════════════════════════════ -->
    <section class="relative w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">

          <!-- COL 1: Marca -->
          <div class="lg:pr-10">
            <button
              type="button"
              class="group flex items-center gap-3 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xl"
              style="--tw-ring-color: var(--accent);"
              aria-label="Ir al inicio de DASTI"
              @click="goTo('/')"
            >
              <span class="relative shrink-0">
                <img
                  src="/img/favicon.png"
                  alt="Ícono DASTI"
                  class="h-11 w-auto object-contain"
                  width="44" height="44"
                />
                <span
                  class="absolute inset-0 -z-10 rounded-xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                  style="background: var(--accent-glow);"
                />
              </span>
              <img
                src="/img/logo.png"
                alt="DASTI — Soluciones en Tecnologías de la Información"
                class="h-9 w-auto max-w-[148px] object-contain"
              />
            </button>

            <p class="text-sm font-semibold mb-2" style="color: var(--text-primary);">
              Tecnología aplicada a soluciones reales.
            </p>
            <p class="text-xs leading-relaxed mb-7" style="color: var(--text-muted);">
              Desarrollo e implementación de soluciones en Tecnologías de la Información para empresas.
            </p>

            <div
              class="inline-flex items-center gap-1.5 text-xs"
              style="color: var(--text-muted);"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              Morelos, México
            </div>
          </div>

          <!-- COL 2: Navegación -->
          <nav
            class="f-col-divider lg:px-10"
            aria-label="Navegación principal del footer"
          >
            <h3 class="f-col-heading">Navegación</h3>
            <ul class="mt-5 space-y-3.5">
              <li v-for="link in navLinks" :key="link.name">
                <button
                  type="button"
                  class="f-nav-link"
                  :aria-label="`Ir a ${link.name}`"
                  @click="goTo(link.href)"
                >
                  {{ link.name }}
                </button>
              </li>
            </ul>
          </nav>

          <!-- COL 3: Cobertura -->
          <div
            class="f-col-divider lg:px-10"
            aria-label="Cobertura geográfica de DASTI"
          >
            <h3 class="f-col-heading">Cobertura</h3>
            <ul class="mt-5 space-y-4">
              <li
                v-for="z in coverageZones"
                :key="z.zone"
                class="flex flex-col gap-0.5"
              >
                <span
                  class="text-xs font-bold uppercase tracking-wider"
                  :style="`color: ${z.color};`"
                >{{ z.label }}</span>
                <span class="text-sm" style="color: var(--text-secondary);">{{ z.zone }}</span>
              </li>
            </ul>

            <div
              class="mt-7 flex items-start gap-2.5 rounded-xl p-3"
              style="background: var(--bg-elevated); border: 1px solid var(--border-subtle);"
            >
              <span
                class="mt-0.5 w-2 h-2 rounded-full shrink-0 animate-pulse"
                style="background: var(--accent-light);"
              />
              <p class="text-xs leading-relaxed" style="color: var(--text-muted);">
                La mayoría de servicios puede coordinarse de forma remota. Para instalaciones, te visitamos.
              </p>
            </div>
          </div>

          <!-- COL 4: Redes + Contacto -->
          <div class="f-col-divider lg:pl-10">
            <h3 class="f-col-heading">Contacto y redes</h3>

            <!-- Iconos redes sociales -->
            <div class="mt-5 flex gap-2.5 flex-wrap">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="f-social"
                :aria-label="social.name === 'WhatsApp'
                  ? 'Contactar a DASTI por WhatsApp'
                  : `Visitar ${social.name} de DASTI`"
                :title="social.name"
                :style="`--sc: ${social.color};`"
              >
                <!-- Facebook -->
                <svg v-if="social.icon === 'facebook'" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <!-- Instagram -->
                <svg v-else-if="social.icon === 'instagram'" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                <!-- TikTok -->
                <svg v-else-if="social.icon === 'tiktok'" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z"/>
                </svg>
                <!-- WhatsApp -->
                <svg v-else-if="social.icon === 'whatsapp'" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                </svg>
              </a>
            </div>

            <!-- Links de contacto -->
            <div class="mt-7 space-y-3.5">
              <a
                href="mailto:direcciondasti@gmail.com"
                class="f-contact-link"
                aria-label="Enviar correo a direcciondasti@gmail.com"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/>
                </svg>
                direcciondasti@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         FRANJA 3 — Copyright
    ══════════════════════════════════════════════════════════ -->
    <section class="relative w-full" aria-label="Copyright DASTI">
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px"
        style="background: linear-gradient(90deg, transparent 0%, var(--border-subtle) 20%, var(--border-medium) 50%, var(--border-subtle) 80%, transparent 100%);"
      />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p class="text-xs text-center sm:text-left" style="color: var(--text-muted);">
            &copy; {{ year }} DASTI. Todos los derechos reservados.
          </p>
          <p class="text-xs text-center sm:text-right" style="color: var(--text-muted);">
            Desarrollo y Aplicación de Soluciones en TI.
          </p>
        </div>
      </div>
    </section>

  </footer>
</template>

<style scoped>
/* ── Fondo grid tecnológico ─── */
.f-grid {
  background-image:
    linear-gradient(to right,  color-mix(in srgb, var(--border-subtle) 60%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--border-subtle) 60%, transparent) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at 50% 0%, black 0%, transparent 72%);
  opacity: 0.32;
}

/* ── Overlay diagonal CTA ─── */
.f-diag {
  background-image: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 28px,
    color-mix(in srgb, var(--accent) 4%, transparent) 28px,
    color-mix(in srgb, var(--accent) 4%, transparent) 29px
  );
}

/* ── Partículas flotantes ─── */
.f-particle {
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* arriba-derecha */
@keyframes f-float-a {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  35%  { transform: translate3d(18px, -26px, 0) scale(1.5); }
  70%  { transform: translate3d(8px, -14px, 0) scale(1.2); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}

/* arriba-izquierda */
@keyframes f-float-b {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  40%  { transform: translate3d(-16px, -22px, 0) scale(1.4); }
  75%  { transform: translate3d(-6px, -10px, 0) scale(1.15); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}

/* diagonal con pulso */
@keyframes f-float-c {
  0%   { transform: translate3d(0, 0, 0) scale(1); opacity: inherit; }
  25%  { transform: translate3d(10px, -18px, 0) scale(1.6); }
  50%  { transform: translate3d(20px, -30px, 0) scale(1.1); }
  75%  { transform: translate3d(6px, -12px, 0) scale(1.45); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}

/* ── Botones CTA ─── */
.f-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.8rem 1.4rem;
  border-radius: 0.875rem;
  font-size: 0.9rem;
  font-weight: 700;
  transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease;
  white-space: nowrap;
}

.f-btn-primary {
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  box-shadow: 0 12px 28px var(--accent-glow-sm);
}
.f-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 38px var(--accent-glow);
}

.f-btn-wa {
  color: var(--text-primary);
  background: transparent;
  border: 1.5px solid var(--border-medium);
}
.f-btn-wa:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, #25d366 55%, transparent);
  background: color-mix(in srgb, #25d366 10%, transparent);
  box-shadow: 0 12px 28px color-mix(in srgb, #25d366 22%, transparent);
}

.f-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* ── Separador vertical entre columnas (solo lg) ─── */
@media (min-width: 1024px) {
  .f-col-divider {
    border-left: 1px solid var(--border-subtle);
  }
}

/* ── Heading columna ─── */
.f-col-heading {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* ── Links de navegación ─── */
.f-nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 0.88rem;
  color: var(--text-secondary);
  transition: color 180ms ease, transform 180ms ease;
}

.f-nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 220ms ease;
}

.f-nav-link:hover {
  color: var(--text-primary);
  transform: translateX(4px);
}

.f-nav-link:hover::after {
  width: 100%;
}

.f-nav-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 4px;
}

/* ── Iconos redes sociales ─── */
.f-social {
  position: relative;
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.875rem;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border-subtle);
  transition:
    color 180ms ease,
    border-color 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.f-social:hover {
  color: var(--sc);
  border-color: color-mix(in srgb, var(--sc) 50%, transparent);
  background: color-mix(in srgb, var(--sc) 10%, transparent);
  box-shadow: 0 0 22px color-mix(in srgb, var(--sc) 30%, transparent);
  transform: translateY(-4px) scale(1.06);
}

.f-social:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* ── Links de contacto ─── */
.f-contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
  transition: color 180ms ease, transform 180ms ease;
}

.f-contact-link:hover {
  color: var(--text-primary);
  transform: translateX(4px);
}

.f-contact-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 4px;
}

/* ── Responsive móvil ─── */
@media (max-width: 640px) {
  .f-btn {
    width: 100%;
  }
}

/* ── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  .f-particle { animation: none; }
  .f-btn,
  .f-social,
  .f-nav-link,
  .f-contact-link { transition: none; }
  .f-nav-link::after { transition: none; }
}
</style>
