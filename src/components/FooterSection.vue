<script setup lang="ts">
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone, Clock } from '@lucide/vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { buildWhatsAppUrl, CONTACT_CONFIG, SOCIAL_LINKS } from '@/config/contact'
import { serviceCategories } from '@/data/services'
import { alliances } from '@/data/alliances'

const year = new Date().getFullYear()
const whatsappUrl = buildWhatsAppUrl('Hola, me interesa recibir asesoría de DASTI para una solución en TI.')

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Cotizador', href: '/cotizador' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
]

const coverageZones = [
  { zone: 'Morelos · Cuernavaca', label: 'Zona principal' },
  { zone: 'CDMX · Estado de México', label: 'Zona extendida' },
  { zone: 'Puebla y estados cercanos', label: 'Cobertura regional' },
  { zone: 'Atención remota', label: 'Sin restricción' },
]

const toTop = () => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="px-[clamp(8px,1.1vw,16px)] pb-[clamp(8px,1.1vw,16px)]" aria-labelledby="footer-title">
    <div class="on-ink grain relative isolate overflow-hidden rounded-[var(--r-stage)]">
      <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_0%,rgba(37,99,235,0.28),transparent_70%)]" />
      </div>

      <div class="shell">
        <!-- Llamado principal -->
        <div class="flex flex-col gap-8 border-b border-ink-line py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <h2 id="footer-title" class="display-2 max-w-2xl text-on-ink">
            Hablemos de tu próxima <span class="serif text-signal">solución en TI.</span>
          </h2>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/cotizador" class="btn btn-light">
              Cotizar solución
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
            <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ghost-ink" aria-label="Hablar con DASTI por WhatsApp">
              WhatsApp
              <span class="btn-orb"><WhatsAppIcon :size="15" /></span>
            </a>
          </div>
        </div>

        <!-- Columnas -->
        <div class="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <!-- Marca -->
          <div class="sm:col-span-2 lg:col-span-4 lg:pr-10">
            <RouterLink to="/" class="inline-flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4" aria-label="DASTI — Ir al inicio">
              <img src="/img/favicon.png" alt="" class="h-8 w-8 object-contain" width="32" height="32" />
              <img src="/img/logo.png" alt="DASTI — Soluciones en Tecnologías de la Información" class="h-5 w-auto object-contain" height="20" />
            </RouterLink>
            <p class="mt-6 font-medium text-on-ink">Tecnología aplicada a soluciones reales.</p>
            <p class="mt-2 max-w-sm text-sm leading-relaxed text-on-ink-3">
              Desarrollo e implementación de soluciones en Tecnologías de la Información para empresas.
            </p>

            <div class="mt-8 flex gap-2">
              <a
                v-for="social in SOCIAL_LINKS"
                :key="social.name"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-on-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:text-on-ink"
                :aria-label="`Visitar ${social.name} de DASTI`"
              >
                <svg v-if="social.icon === 'facebook'" viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <svg v-else-if="social.icon === 'instagram'" viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z" />
                </svg>
              </a>
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-on-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:text-on-ink"
                aria-label="Contactar a DASTI por WhatsApp"
              >
                <WhatsAppIcon :size="17" />
              </a>
            </div>
          </div>

          <!-- Navegación -->
          <nav class="lg:col-span-2" aria-label="Navegación del pie de página">
            <h3 class="footer-heading">Navegación</h3>
            <ul class="mt-5 space-y-3">
              <li v-for="link in navLinks" :key="link.href">
                <RouterLink :to="link.href" class="footer-link">{{ link.name }}</RouterLink>
              </li>
            </ul>
          </nav>

          <!-- Servicios -->
          <div class="lg:col-span-2">
            <h3 class="footer-heading">Servicios</h3>
            <ul class="mt-5 space-y-3">
              <li v-for="cat in serviceCategories" :key="cat.number">
                <RouterLink :to="`/servicios#cat-${cat.number}`" class="footer-link">{{ cat.title }}</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Productos y alianzas -->
          <div class="lg:col-span-2">
            <h3 class="footer-heading">Productos</h3>
            <ul class="mt-5 space-y-3">
              <li><RouterLink to="/productos/tarjetas-nfc" class="footer-link">Tarjetas NFC</RouterLink></li>
              <li><RouterLink to="/productos" class="footer-link">Catálogo</RouterLink></li>
            </ul>
            <h3 class="footer-heading mt-9">Alianzas</h3>
            <ul class="mt-5 space-y-3">
              <li v-for="a in alliances" :key="a.slug">
                <RouterLink :to="a.route" class="footer-link">{{ a.displayName }}</RouterLink>
                <span class="block text-[0.72rem] text-on-ink-3">Aliado independiente</span>
              </li>
              <li><RouterLink to="/alianzas" class="footer-link">Todas las alianzas</RouterLink></li>
            </ul>
          </div>

          <!-- Contacto -->
          <div class="lg:col-span-2">
            <h3 class="footer-heading">Contacto</h3>
            <ul class="mt-5 space-y-4 text-sm">
              <li>
                <a :href="`mailto:${CONTACT_CONFIG.displayEmail}`" class="footer-link inline-flex items-start gap-2 break-all">
                  <Mail :size="15" class="mt-0.5 shrink-0" /> {{ CONTACT_CONFIG.displayEmail }}
                </a>
              </li>
              <li>
                <a :href="`tel:+${CONTACT_CONFIG.whatsappNumber}`" class="footer-link inline-flex items-start gap-2">
                  <Phone :size="15" class="mt-0.5 shrink-0" /> {{ CONTACT_CONFIG.phoneDisplay }}
                </a>
              </li>
              <li class="flex items-start gap-2 text-on-ink-3">
                <Clock :size="15" class="mt-0.5 shrink-0" /> {{ CONTACT_CONFIG.businessHours }}
              </li>
              <li class="flex items-start gap-2 text-on-ink-3">
                <MapPin :size="15" class="mt-0.5 shrink-0" /> Morelos, México
              </li>
            </ul>
          </div>
        </div>

        <!-- Cobertura -->
        <div class="grid gap-6 border-t border-ink-line py-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="z in coverageZones" :key="z.zone">
            <p class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-signal">{{ z.label }}</p>
            <p class="mt-1 text-sm text-on-ink-2">{{ z.zone }}</p>
          </div>
        </div>
        <p class="pb-8 text-xs leading-relaxed text-on-ink-3">
          La mayoría de servicios puede coordinarse de forma remota. Para instalaciones, te visitamos.
        </p>
      </div>

      <!-- Marca tipográfica -->
      <div class="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p class="footer-wordmark">DASTI</p>
      </div>

      <!-- Legal -->
      <div class="shell">
        <div class="flex flex-col items-start justify-between gap-4 border-t border-ink-line py-6 text-xs text-on-ink-3 sm:flex-row sm:items-center">
          <p>&copy; {{ year }} DASTI. Todos los derechos reservados.</p>
          <p>Desarrollo y Aplicación de Soluciones en TI.</p>
          <button type="button" class="flex items-center gap-2 font-medium text-on-ink-2 transition-colors hover:text-on-ink" @click="toTop">
            Volver arriba
            <span class="grid h-8 w-8 place-items-center rounded-full border border-ink-line"><ArrowUp :size="14" /></span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-heading {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c-on-ink-3);
}
.footer-link {
  font-size: 0.92rem;
  color: var(--c-on-ink-2);
  transition: color 0.25s ease;
}
.footer-link:hover,
.footer-link:focus-visible { color: var(--c-on-ink); }

.footer-wordmark {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(5rem, 24vw, 22rem);
  line-height: 0.78;
  letter-spacing: -0.06em;
  text-align: center;
  background: linear-gradient(180deg, rgba(242, 246, 252, 0.16) 0%, rgba(242, 246, 252, 0) 85%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transform: translateY(12%);
}
</style>
