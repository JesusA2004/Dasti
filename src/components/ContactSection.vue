<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight, Send, MessageCircle, Mail, Phone, Clock, MapPin, Video, CalendarCheck } from '@lucide/vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { buildWhatsAppUrl, CONTACT_CONFIG } from '@/config/contact'

/*
 * Contacto DASTI. La lógica del formulario (campos, honeypot, envío a
 * /api/contact, estados de carga/error) y de los modos de contacto se
 * conserva sin cambios; el rediseño sólo afecta la interfaz.
 */
const CONTACT_EMAIL = CONTACT_CONFIG.displayEmail
const CONTACT_PHONE = CONTACT_CONFIG.phoneDisplay
const BUSINESS_HOURS = CONTACT_CONFIG.businessHours

const services = [
  'Desarrollo web', 'Software a medida', 'Correos corporativos',
  'Redes y sistemas mesh', 'Soporte técnico', 'Equipos de cómputo',
  'Impresoras y periféricos', 'Automatización', 'Integración de sistemas',
  'Presencia digital / redes sociales', 'Proyecto grande o personalizado', 'Otro / No estoy seguro',
]

type ContactMode = 'whatsapp' | 'video' | 'presencial' | 'form'
const selectedMode = ref<ContactMode | null>('form')

const contactModes: Array<{ id: ContactMode; icon: any; title: string; sub: string; desc: string; color: string; action: () => void }> = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    title: 'WhatsApp',
    sub: 'Respuesta directa',
    desc: 'Escríbenos ahora. Respuesta rápida y personalizada para resolver tus dudas.',
    color: '#25D366',
    action: () => openWhatsApp(),
  },
  {
    id: 'video',
    icon: Video,
    title: 'Videollamada',
    sub: 'Agenda tu horario',
    desc: 'Coordina una videollamada por Zoom o Meet para revisar tu proyecto en detalle.',
    color: '#3B82F6',
    action: () => openWhatsApp(),
  },
  {
    id: 'presencial',
    icon: CalendarCheck,
    title: 'Presencial',
    sub: 'Morelos y zona',
    desc: 'Reunión física disponible en Morelos y zonas cercanas para proyectos complejos.',
    color: '#818CF8',
    action: () => openWhatsApp(),
  },
  {
    id: 'form',
    icon: Send,
    title: 'Formulario',
    sub: 'Mensaje detallado',
    desc: 'Envíanos un mensaje con los detalles de tu proyecto. Te contactaremos a la brevedad.',
    color: '#F472B6',
    action: () => null,
  },
]

const form = ref({ name: '', company: '', phone: '', email: '', service: '', message: '', website_url: '' })
const submitted = ref(false)
const sending = ref(false)
const sendError = ref('')

const handleSubmit = async () => {
  sending.value = true
  sendError.value = ''
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })
    const data = await res.json()
    if (data.ok) {
      submitted.value = true
    } else {
      sendError.value = data.message || 'No se pudo enviar el mensaje.'
    }
  } catch {
    sendError.value = 'Error de conexión. Intenta de nuevo o contáctanos por WhatsApp.'
  } finally {
    sending.value = false
  }
}

const resetForm = () => {
  form.value = { name: '', company: '', phone: '', email: '', service: '', message: '', website_url: '' }
  submitted.value = false
  sendError.value = ''
}

const openWhatsApp = () => {
  const lines = ['Hola, me interesa conocer más sobre los servicios de DASTI.']
  if (form.value.name) lines.push(`Nombre: ${form.value.name}`)
  if (form.value.company) lines.push(`Empresa: ${form.value.company}`)
  if (form.value.service) lines.push(`Servicio de interés: ${form.value.service}`)
  if (form.value.message) lines.push(`Mensaje: ${form.value.message}`)
  window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer')
}

const selectMode = (mode: ContactMode) => {
  if (mode !== 'form') {
    const m = contactModes.find(c => c.id === mode)
    if (m?.action) m.action()
  }
  selectedMode.value = mode
}

const activeMode = () => contactModes.find(m => m.id === selectedMode.value)
</script>

<template>
  <section id="contacto" class="pb-24 pt-[96px]" aria-labelledby="contact-title">
    <!-- ─── Encabezado ─── -->
    <div class="shell grid gap-10 pb-12 pt-10 sm:pt-16 lg:grid-cols-12 lg:items-end lg:pb-16">
      <div class="lg:col-span-7">
        <p class="eyebrow animate-fade" style="--d: 80ms">Contacto</p>
        <h1 id="contact-title" class="display-1 mt-6 text-fg">
          <span class="line-mask"><span style="--d: 120ms">Hablemos de tu</span></span>
          <span class="line-mask"><span style="--d: 220ms">solución <em class="serif font-normal text-accent">en TI.</em></span></span>
        </h1>
      </div>
      <p class="lead animate-rise lg:col-span-5" style="--d: 360ms">
        Elige cómo prefieres comunicarte. Escuchamos lo que necesitas y te orientamos sin compromiso.
      </p>
    </div>

    <!-- ─── Imagen ─── -->
    <div class="stage animate-fade relative h-56 sm:h-72 lg:h-80" style="--d: 300ms">
      <img
        src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1800&auto=format&fit=crop&q=75"
        alt="Contacta a DASTI para asesoría en soluciones de Tecnologías de la Información en Morelos"
        class="h-full w-full object-cover"
        loading="eager"
        decoding="async"
        width="1800"
        height="640"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#071426]/70 via-[#071426]/20 to-transparent" />
      <div class="glass-light absolute bottom-4 left-4 flex items-center gap-3 rounded-full py-2 pl-2 pr-5 sm:bottom-6 sm:left-6">
        <span class="grid h-9 w-9 place-items-center rounded-full bg-[#071426] text-white"><Clock :size="15" /></span>
        <span class="text-xs font-medium sm:text-sm">{{ BUSINESS_HOURS }}</span>
      </div>
    </div>

    <!-- ─── Modalidades ─── -->
    <div class="shell mt-14">
      <p class="mb-5 text-sm text-fg-2">Selecciona cómo quieres contactarnos:</p>
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4" role="group" aria-label="Modalidad de contacto">
        <button
          v-for="mode in contactModes"
          :key="mode.id"
          type="button"
          class="group relative flex flex-col items-start rounded-[24px] border p-5 text-left transition-all duration-300 sm:p-6"
          :class="selectedMode === mode.id ? 'border-ink bg-ink text-on-ink shadow-[var(--shadow-float)] dark:border-on-ink dark:bg-on-ink dark:text-ink' : 'border-line bg-surface text-fg hover:border-line-2'"
          :aria-label="`Contactar por ${mode.title}`"
          :aria-pressed="selectedMode === mode.id"
          @click="selectMode(mode.id)"
        >
          <span
            class="grid h-11 w-11 place-items-center rounded-full transition-colors duration-300"
            :class="selectedMode === mode.id ? 'bg-white/15 dark:bg-ink/10' : 'bg-accent-soft text-accent'"
          >
            <component :is="mode.icon" :size="19" />
          </span>
          <span class="mt-8 font-display text-lg font-semibold tracking-tight">{{ mode.title }}</span>
          <span class="mt-0.5 text-xs opacity-70">{{ mode.sub }}</span>
          <ArrowUpRight
            v-if="mode.id !== 'form'"
            :size="16"
            class="absolute right-5 top-5 opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        </button>
      </div>
    </div>

    <!-- ─── Detalle / formulario ─── -->
    <div class="shell mt-10">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        enter-from-class="opacity-0 translate-y-5"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0"
      >
        <!-- Modalidades que abren WhatsApp -->
        <div v-if="selectedMode && selectedMode !== 'form'" :key="selectedMode" class="card mx-auto max-w-3xl p-8 text-center sm:p-12">
          <span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-accent">
            <component :is="activeMode()?.icon" :size="24" />
          </span>
          <h2 class="display-3 mt-6 text-fg">{{ activeMode()?.title }}</h2>
          <p class="lead mx-auto mt-3 max-w-lg">{{ activeMode()?.desc }}</p>
          <button type="button" class="btn btn-wa mt-8" @click="activeMode()?.action()">
            Contactar por {{ activeMode()?.title }}
            <span class="btn-orb"><WhatsAppIcon :size="16" /></span>
          </button>
        </div>

        <!-- Formulario -->
        <div v-else-if="selectedMode === 'form'" key="form" class="grid gap-6 lg:grid-cols-12">
          <!-- Información -->
          <div class="on-ink grain relative overflow-hidden rounded-[30px] p-7 sm:p-9 lg:col-span-5">
            <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(37,99,235,0.35),transparent_70%)]" aria-hidden="true" />
            <div class="relative flex h-full flex-col">
              <p class="font-display text-2xl font-semibold">DASTI</p>
              <p class="mt-1 text-sm text-on-ink-2">Desarrollo y Aplicación de Soluciones en TI.</p>

              <ul class="mt-10 space-y-5">
                <li>
                  <a :href="`mailto:${CONTACT_EMAIL}`" class="group flex items-start gap-4">
                    <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line"><Mail :size="16" /></span>
                    <span class="min-w-0">
                      <span class="block text-xs text-on-ink-3">Correo</span>
                      <span class="link-u block break-all text-sm text-on-ink">{{ CONTACT_EMAIL }}</span>
                    </span>
                  </a>
                </li>
                <li class="flex items-start gap-4">
                  <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line"><Phone :size="16" /></span>
                  <span>
                    <span class="block text-xs text-on-ink-3">Teléfono</span>
                    <span class="block text-sm text-on-ink">{{ CONTACT_PHONE }}</span>
                  </span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line"><Clock :size="16" /></span>
                  <span>
                    <span class="block text-xs text-on-ink-3">Horario</span>
                    <span class="block text-sm text-on-ink">{{ BUSINESS_HOURS }}</span>
                  </span>
                </li>
                <li class="flex items-start gap-4">
                  <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line"><MapPin :size="16" /></span>
                  <span>
                    <span class="block text-xs text-on-ink-3">Ubicación</span>
                    <span class="block text-sm text-on-ink">Morelos · Cuernavaca, México</span>
                  </span>
                </li>
              </ul>

              <div class="mt-auto pt-10">
                <p class="text-sm leading-relaxed text-on-ink-2">
                  ¿Proyecto grande o complejo? Podemos coordinar una videollamada o junta presencial para revisar
                  necesidades, alcance y tiempos.
                </p>
                <button type="button" class="btn btn-ghost-ink btn-sm mt-5" @click="openWhatsApp">
                  WhatsApp
                  <span class="btn-orb"><WhatsAppIcon :size="14" /></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Formulario -->
          <div class="card p-6 sm:p-9 lg:col-span-7">
            <!-- Éxito -->
            <div v-if="submitted" class="py-10 text-center" role="status">
              <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path d="M5 14L11 20L23 8" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <h2 class="display-3 mt-6 text-fg">Mensaje enviado</h2>
              <p class="mx-auto mt-3 max-w-md text-sm text-fg-2">
                Gracias por contactarnos. Te responderemos a la brevedad a <strong>{{ form.email || 'la brevedad' }}</strong>.
              </p>
              <button type="button" class="btn btn-line btn-plain mt-8" @click="resetForm">Enviar otro mensaje</button>
            </div>

            <form v-else class="space-y-5" @submit.prevent="handleSubmit">
              <!-- Honeypot: oculto para personas; si un bot lo llena, el servidor lo rechaza -->
              <input
                v-model="form.website_url"
                type="text"
                name="website_url"
                tabindex="-1"
                autocomplete="off"
                style="position:absolute;left:-9999px;opacity:0;height:0;width:0;"
                aria-hidden="true"
              />

              <div>
                <h2 class="title-4 text-fg">Envíanos un mensaje</h2>
                <p class="mt-1 text-sm text-fg-3">Los campos marcados con * son obligatorios.</p>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="cf-name" class="field-label">Nombre *</label>
                  <input id="cf-name" v-model="form.name" type="text" required autocomplete="name" placeholder="Tu nombre" class="field" />
                </div>
                <div>
                  <label for="cf-company" class="field-label">Empresa</label>
                  <input id="cf-company" v-model="form.company" type="text" autocomplete="organization" placeholder="Nombre de tu empresa" class="field" />
                </div>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="cf-phone" class="field-label">Teléfono</label>
                  <input id="cf-phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="+52 (XXX) XXX XXXX" class="field" />
                </div>
                <div>
                  <label for="cf-email" class="field-label">Correo *</label>
                  <input id="cf-email" v-model="form.email" type="email" required autocomplete="email" placeholder="tu@empresa.com" class="field" />
                </div>
              </div>

              <div>
                <label for="cf-service" class="field-label">Servicio de interés</label>
                <select id="cf-service" v-model="form.service" class="field cursor-pointer">
                  <option value="" disabled>Selecciona un servicio</option>
                  <option v-for="svc in services" :key="svc" :value="svc">{{ svc }}</option>
                </select>
              </div>

              <div>
                <label for="cf-message" class="field-label">Mensaje *</label>
                <textarea
                  id="cf-message"
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Cuéntanos brevemente qué necesita tu empresa..."
                  class="field resize-none"
                />
              </div>

              <!-- Error -->
              <div
                v-if="sendError"
                class="flex items-start gap-2.5 rounded-2xl border border-red-500/25 bg-red-500/[0.07] p-3.5 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5zm0 7.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
                </svg>
                <span>{{ sendError }}</span>
              </div>

              <div class="flex flex-col gap-3 pt-2 sm:flex-row">
                <button type="submit" :disabled="sending" class="btn btn-accent btn-block sm:flex-1">
                  <span v-if="sending" class="flex items-center gap-2">
                    <svg class="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="32" stroke-dashoffset="12" />
                    </svg>
                    Enviando...
                  </span>
                  <span v-else>Enviar mensaje</span>
                  <span class="btn-orb"><Send :size="15" /></span>
                </button>
                <button type="button" class="btn btn-line btn-block sm:w-auto" @click="openWhatsApp">
                  WhatsApp
                  <span class="btn-orb text-[#128C4A]"><MessageCircle :size="15" /></span>
                </button>
              </div>

              <p class="text-center text-xs text-fg-3">
                También puedes contactarnos directamente por WhatsApp si prefieres atención inmediata.
              </p>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>
