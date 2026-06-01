<script setup lang="ts">
import { ref } from 'vue'
import { Send, MessageCircle, Mail, Phone, Clock, MapPin, Video, CalendarCheck, ChevronRight } from '@lucide/vue'
import AnimatedParticles from '@/components/AnimatedParticles.vue'
import { buildWhatsAppUrl } from '@/config/contact'

const CONTACT_EMAIL = 'direcciondasti@gmail.com'
const CONTACT_PHONE = '+52 777 442 8209'
const BUSINESS_HOURS = 'Lunes a Viernes, 9:00 – 18:00 hrs'

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
</script>

<template>
  <section id="contacto" class="relative overflow-hidden" style="background: var(--bg-base);">

    <!-- Hero image area -->
    <div class="relative h-72 sm:h-80 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1600&auto=format&fit=crop&q=75"
        alt="Contacta a DASTI para asesoría en soluciones de Tecnologías de la Información en Morelos"
        class="w-full h-full object-cover"
        loading="eager"
        decoding="async"
        width="1600"
        height="640"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(0,0,0,0.35), var(--bg-base) 88%);" />
      <div class="absolute inset-0" style="background: linear-gradient(to right, var(--bg-base) 0%, transparent 25%, transparent 75%, var(--bg-base) 100%);" />

      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span class="tag mb-4">Contacto</span>
        <h1 class="display-text text-3xl sm:text-4xl lg:text-5xl" style="color: var(--text-primary);">
          Hablemos de tu solución
          <span class="gradient-text"> en TI</span>
        </h1>
      </div>
    </div>

    <!-- Contact modes selection -->
    <div class="relative py-16" style="background: var(--bg-base);">
      <AnimatedParticles density="low" variant="dots" size="sm" :opacity="0.55" speed="slow" />
      <div class="orb w-[500px] h-[400px] top-0 right-0 opacity-12" style="background: var(--accent-glow);" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p class="text-center text-base mb-8" style="color: var(--text-secondary);">
          Selecciona cómo quieres contactarnos:
        </p>

        <!-- 4 large mode cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <button
            v-for="mode in contactModes"
            :key="mode.id"
            @click="selectMode(mode.id)"
            :aria-label="`Contactar por ${mode.title}`"
            :aria-pressed="selectedMode === mode.id"
            class="group relative flex flex-col items-center text-center p-5 sm:p-7 rounded-2xl transition-all duration-300"
            :style="`
              background: ${selectedMode === mode.id ? mode.color + '12' : 'var(--bg-card)'};
              border: 1.5px solid ${selectedMode === mode.id ? mode.color + '55' : 'var(--border-subtle)'};
              box-shadow: ${selectedMode === mode.id ? `0 0 32px ${mode.color}18, 0 4px 20px rgba(0,0,0,0.15)` : 'var(--shadow-sm)'};
              transform: ${selectedMode === mode.id ? 'translateY(-4px)' : 'translateY(0)'};
              backdrop-filter: blur(12px);
            `"
          >
            <!-- Icon -->
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
              :style="`
                background: ${mode.color}18;
                border: 1.5px solid ${mode.color}${selectedMode === mode.id ? '50' : '25'};
                box-shadow: ${selectedMode === mode.id ? `0 0 20px ${mode.color}30` : 'none'};
              `"
            >
              <component :is="mode.icon" :size="24" :style="`color: ${mode.color};`" />
            </div>

            <h3 class="font-display font-bold text-sm sm:text-base mb-1" style="color: var(--text-primary);">
              {{ mode.title }}
            </h3>
            <p class="text-xs" :style="`color: ${selectedMode === mode.id ? mode.color : 'var(--text-muted)'};`">
              {{ mode.sub }}
            </p>

            <!-- Selected indicator -->
            <div
              v-if="selectedMode === mode.id"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
              :style="`background: ${mode.color};`"
            />

            <!-- Hover line on cards that launch action -->
            <div
              v-if="mode.id !== 'form'"
              class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              style="color: var(--text-muted);"
            >
              <ChevronRight :size="14" />
            </div>
          </button>
        </div>

        <!-- Mode detail / form area -->
        <Transition
          enter-active-class="transition-all duration-450 ease-out"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-250 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <!-- Non-form modes: show info + quick action -->
          <div
            v-if="selectedMode && selectedMode !== 'form'"
            :key="selectedMode"
            class="max-w-2xl mx-auto"
          >
            <div
              class="rounded-2xl p-8 text-center relative overflow-hidden"
              :style="`background: var(--bg-card); border: 1px solid ${contactModes.find(m => m.id === selectedMode)?.color}30; backdrop-filter: blur(20px);`"
            >
              <div
                class="absolute inset-0 pointer-events-none"
                :style="`background: radial-gradient(ellipse at 50% 0%, ${contactModes.find(m => m.id === selectedMode)?.color}12 0%, transparent 65%);`"
              />
              <div class="relative">
                <div
                  class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  :style="`background: ${contactModes.find(m => m.id === selectedMode)?.color}18; border: 1.5px solid ${contactModes.find(m => m.id === selectedMode)?.color}35;`"
                >
                  <component
                    :is="contactModes.find(m => m.id === selectedMode)?.icon"
                    :size="28"
                    :style="`color: ${contactModes.find(m => m.id === selectedMode)?.color};`"
                  />
                </div>
                <h3 class="font-display font-bold text-xl mb-2" style="color: var(--text-primary);">
                  {{ contactModes.find(m => m.id === selectedMode)?.title }}
                </h3>
                <p class="text-base mb-6" style="color: var(--text-secondary);">
                  {{ contactModes.find(m => m.id === selectedMode)?.desc }}
                </p>
                <button
                  @click="contactModes.find(m => m.id === selectedMode)?.action()"
                  class="btn-primary"
                  :style="`background: linear-gradient(135deg, ${contactModes.find(m => m.id === selectedMode)?.color}DD, ${contactModes.find(m => m.id === selectedMode)?.color});`"
                >
                  <component :is="contactModes.find(m => m.id === selectedMode)?.icon" :size="16" />
                  Contactar por {{ contactModes.find(m => m.id === selectedMode)?.title }}
                </button>
              </div>
            </div>
          </div>

          <!-- Form mode -->
          <div v-else-if="selectedMode === 'form'" key="form">
            <div class="grid lg:grid-cols-5 gap-10">

              <!-- Left: info + quick links -->
              <div
                v-motion
                :initial="{ opacity: 0, x: -20 }"
                :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                class="lg:col-span-2 space-y-4"
              >
                <div class="rounded-2xl p-5" style="background: var(--bg-card); border: 1px solid var(--border-subtle);">
                  <h3 class="font-display font-bold text-lg mb-1" style="color: var(--text-primary);">DASTI</h3>
                  <p class="text-sm" style="color: var(--text-secondary);">Desarrollo y Aplicación de Soluciones en TI.</p>
                </div>

                <div class="space-y-2.5">
                  <a :href="`mailto:${CONTACT_EMAIL}`" class="flex items-center gap-3 p-3.5 rounded-xl group transition-all duration-200" style="background: var(--bg-card); border: 1px solid var(--border-subtle);">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25);">
                      <Mail :size="16" style="color: #3B82F6;" />
                    </div>
                    <div>
                      <div class="text-xs" style="color: var(--text-muted);">Correo</div>
                      <div class="text-sm transition-colors" style="color: var(--text-secondary);">{{ CONTACT_EMAIL }}</div>
                    </div>
                  </a>

                  <div class="flex items-center gap-3 p-3.5 rounded-xl" style="background: var(--bg-card); border: 1px solid var(--border-subtle);">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.25);">
                      <Phone :size="16" style="color: #34D399;" />
                    </div>
                    <div>
                      <div class="text-xs" style="color: var(--text-muted);">Teléfono</div>
                      <div class="text-sm" style="color: var(--text-secondary);">{{ CONTACT_PHONE }}</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 p-3.5 rounded-xl" style="background: var(--bg-card); border: 1px solid var(--border-subtle);">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.25);">
                      <Clock :size="16" style="color: #FBBF24;" />
                    </div>
                    <div>
                      <div class="text-xs" style="color: var(--text-muted);">Horario</div>
                      <div class="text-sm" style="color: var(--text-secondary);">{{ BUSINESS_HOURS }}</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 p-3.5 rounded-xl" style="background: var(--bg-card); border: 1px solid var(--border-subtle);">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(244,114,182,0.12); border: 1px solid rgba(244,114,182,0.25);">
                      <MapPin :size="16" style="color: #F472B6;" />
                    </div>
                    <div>
                      <div class="text-xs" style="color: var(--text-muted);">Ubicación</div>
                      <div class="text-sm" style="color: var(--text-secondary);">Morelos · Cuernavaca, México</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Form -->
              <div
                v-motion
                :initial="{ opacity: 0, x: 20 }"
                :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600, delay: 100 } }"
                class="lg:col-span-3"
              >
                <div class="rounded-2xl p-7 sm:p-8" style="background: var(--bg-card); border: 1px solid var(--border-medium); backdrop-filter: blur(20px);">

                  <!-- Success state -->
                  <div v-if="submitted" class="text-center py-8">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background: rgba(34,197,94,0.12); border: 2px solid rgba(34,197,94,0.3);">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M5 14L11 20L23 8" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h3 class="font-display font-bold text-xl mb-2" style="color: var(--text-primary);">Mensaje enviado</h3>
                    <p class="text-sm mb-6" style="color: var(--text-secondary);">Gracias por contactarnos. Te responderemos a la brevedad a <strong>{{ form.email || 'la brevedad' }}</strong>.</p>
                    <button @click="resetForm" class="btn-outline text-sm">Enviar otro mensaje</button>
                  </div>

                  <!-- Form -->
                  <form v-else @submit.prevent="handleSubmit" class="space-y-4">
                    <!-- Honeypot: hidden from users, bots fill it and get rejected -->
                    <input v-model="form.website_url" type="text" name="website_url" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;opacity:0;height:0;width:0;" aria-hidden="true" />

                    <div class="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Nombre *</label>
                        <input v-model="form.name" type="text" required placeholder="Tu nombre" class="input-theme" />
                      </div>
                      <div>
                        <label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Empresa</label>
                        <input v-model="form.company" type="text" placeholder="Nombre de tu empresa" class="input-theme" />
                      </div>
                    </div>

                    <div class="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Teléfono</label>
                        <input v-model="form.phone" type="tel" placeholder="+52 (XXX) XXX XXXX" class="input-theme" />
                      </div>
                      <div>
                        <label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Correo *</label>
                        <input v-model="form.email" type="email" required placeholder="tu@empresa.com" class="input-theme" />
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Servicio de interés</label>
                      <select v-model="form.service" class="input-theme cursor-pointer">
                        <option value="" disabled>Selecciona un servicio</option>
                        <option v-for="svc in services" :key="svc" :value="svc">{{ svc }}</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Mensaje *</label>
                      <textarea v-model="form.message" required rows="4" placeholder="Cuéntanos brevemente qué necesita tu empresa..." class="input-theme resize-none" />
                    </div>

                    <!-- Error message -->
                    <div v-if="sendError" class="flex items-start gap-2.5 p-3 rounded-xl text-sm" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); color: #f87171;">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="flex-shrink-0 mt-0.5"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5zm0 7.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z"/></svg>
                      <span>{{ sendError }}</span>
                    </div>

                    <div class="flex flex-wrap gap-3">
                      <button type="submit" :disabled="sending" class="btn-primary flex-1 justify-center">
                        <span v-if="sending" class="flex items-center gap-2">
                          <svg class="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="32" stroke-dashoffset="12"/></svg>
                          Enviando...
                        </span>
                        <span v-else class="flex items-center gap-2 justify-center w-full">
                          Enviar mensaje <Send :size="15" />
                        </span>
                      </button>
                      <button type="button" @click="openWhatsApp" class="btn-outline" style="border-color: rgba(37,211,102,0.3); color: #25D366;">
                        <MessageCircle :size="15" />
                        WhatsApp
                      </button>
                    </div>

                    <p class="text-xs text-center" style="color: var(--text-muted);">
                      También puedes contactarnos directamente por WhatsApp si prefieres atención inmediata.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
