<script setup lang="ts">
import { ref } from 'vue'
import { Send, MessageCircle, Mail, Phone, Clock, MapPin } from '@lucide/vue'

const WHATSAPP_NUMBER = '521XXXXXXXXXX'
const CONTACT_EMAIL = 'contacto@dasti.cloud'
const CONTACT_PHONE = '+52 1 XXX XXX XXXX'
const BUSINESS_HOURS = 'Lunes a Viernes, 9:00 – 18:00 hrs'

const services = [
  'Desarrollo web',
  'Software a la medida',
  'Automatización de procesos',
  'Chatbots y asistentes digitales',
  'Correo empresarial',
  'Redes e infraestructura',
  'Soporte técnico y mantenimiento',
  'Equipos de cómputo',
  'Marketing digital',
  'Otro / No estoy seguro',
]

const form = ref({
  name: '',
  company: '',
  phone: '',
  email: '',
  service: '',
  message: '',
})

const submitted = ref(false)
const sending = ref(false)

const handleSubmit = async () => {
  sending.value = true
  await new Promise(r => setTimeout(r, 1000))
  sending.value = false
  submitted.value = true
}

const resetForm = () => {
  form.value = { name: '', company: '', phone: '', email: '', service: '', message: '' }
  submitted.value = false
}

const openWhatsApp = () => {
  const lines = [
    'Hola, me interesa conocer más sobre los servicios de DASTI.',
  ]
  if (form.value.name) lines.push(`Nombre: ${form.value.name}`)
  if (form.value.company) lines.push(`Empresa: ${form.value.company}`)
  if (form.value.service) lines.push(`Servicio de interés: ${form.value.service}`)
  if (form.value.message) lines.push(`Mensaje: ${form.value.message}`)
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
}
</script>

<template>
  <section id="contacto" class="relative py-24 overflow-hidden" style="background: #050D1A;">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div class="orb w-[600px] h-[500px] top-0 right-0"
      style="background: rgba(37,99,235,0.05);" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <span class="tag mb-4 inline-block">Contacto</span>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          <span class="text-white">Cuéntanos qué</span>
          <span class="gradient-text block">necesita tu empresa</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Te ayudamos a encontrar la mejor solución tecnológica. Escríbenos y con gusto agendamos una llamada.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12">

        <!-- Left: Info -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
          class="lg:col-span-2 flex flex-col gap-6"
        >
          <div>
            <h3 class="font-display font-bold text-xl text-white mb-2">DASTI</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              Desarrollo y Aplicación de Soluciones en TI.<br>
              Tecnología aplicada a soluciones reales.
            </p>
          </div>

          <!-- Contact details -->
          <div class="space-y-4">
            <a :href="`mailto:${CONTACT_EMAIL}`"
              class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style="background: rgba(37,99,235,0.15); border: 1px solid rgba(59,130,246,0.25);">
                <Mail :size="18" class="text-blue-400" />
              </div>
              <div>
                <div class="text-xs text-slate-500 mb-0.5">Correo</div>
                <div class="text-sm text-slate-300 group-hover:text-blue-300 transition-colors">{{ CONTACT_EMAIL }}</div>
              </div>
            </a>

            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style="background: rgba(37,99,235,0.15); border: 1px solid rgba(59,130,246,0.25);">
                <Phone :size="18" class="text-blue-400" />
              </div>
              <div>
                <div class="text-xs text-slate-500 mb-0.5">Teléfono</div>
                <div class="text-sm text-slate-300">{{ CONTACT_PHONE }}</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style="background: rgba(37,99,235,0.15); border: 1px solid rgba(59,130,246,0.25);">
                <Clock :size="18" class="text-blue-400" />
              </div>
              <div>
                <div class="text-xs text-slate-500 mb-0.5">Horario de atención</div>
                <div class="text-sm text-slate-300">{{ BUSINESS_HOURS }}</div>
              </div>
            </div>

            <a href="https://dasti.cloud" target="_blank" rel="noopener"
              class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style="background: rgba(37,99,235,0.15); border: 1px solid rgba(59,130,246,0.25);">
                <MapPin :size="18" class="text-blue-400" />
              </div>
              <div>
                <div class="text-xs text-slate-500 mb-0.5">Sitio web</div>
                <div class="text-sm text-blue-400 group-hover:text-blue-300 transition-colors">dasti.cloud</div>
              </div>
            </a>
          </div>

          <!-- WhatsApp CTA -->
          <button
            @click="openWhatsApp"
            class="flex items-center gap-3 p-4 rounded-xl transition-all duration-250 group"
            style="background: rgba(37, 211, 102, 0.08); border: 1px solid rgba(37,211,102,0.25);"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style="background: rgba(37,211,102,0.15);">
              <MessageCircle :size="20" style="color: #25D366;" />
            </div>
            <div class="text-left">
              <div class="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">Escribir por WhatsApp</div>
              <div class="text-xs text-slate-500">Respuesta rápida y directa</div>
            </div>
          </button>
        </div>

        <!-- Right: Form -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
          class="lg:col-span-3"
        >
          <div class="glass-card rounded-2xl p-7 sm:p-8">

            <!-- Success state -->
            <div v-if="submitted" class="text-center py-8">
              <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style="background: rgba(34,197,94,0.12); border: 2px solid rgba(34,197,94,0.3);">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14L11 20L23 8" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="font-display font-bold text-xl text-white mb-2">Mensaje enviado</h3>
              <p class="text-slate-400 text-sm mb-6">Gracias por contactarnos. Te responderemos a la brevedad.</p>
              <button @click="resetForm" class="btn-outline text-sm">Enviar otro mensaje</button>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1.5">Nombre *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    class="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:ring-1"
                    style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);"
                    onfocus="this.style.borderColor='rgba(59,130,246,0.5)'; this.style.background='rgba(37,99,235,0.06)'"
                    onblur="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.04)'"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1.5">Empresa</label>
                  <input
                    v-model="form.company"
                    type="text"
                    placeholder="Nombre de tu empresa"
                    class="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                    style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);"
                    onfocus="this.style.borderColor='rgba(59,130,246,0.5)'; this.style.background='rgba(37,99,235,0.06)'"
                    onblur="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.04)'"
                  />
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1.5">Teléfono</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="+52 (XXX) XXX XXXX"
                    class="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                    style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);"
                    onfocus="this.style.borderColor='rgba(59,130,246,0.5)'; this.style.background='rgba(37,99,235,0.06)'"
                    onblur="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.04)'"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1.5">Correo *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="tu@empresa.com"
                    class="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                    style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);"
                    onfocus="this.style.borderColor='rgba(59,130,246,0.5)'; this.style.background='rgba(37,99,235,0.06)'"
                    onblur="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.04)'"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1.5">Servicio de interés</label>
                <select
                  v-model="form.service"
                  class="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 cursor-pointer"
                  style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #F1F5F9; -webkit-appearance: none;"
                  onfocus="this.style.borderColor='rgba(59,130,246,0.5)'"
                  onblur="this.style.borderColor='rgba(255,255,255,0.1)'"
                >
                  <option value="" disabled style="background: #0A1628;">Selecciona un servicio</option>
                  <option v-for="svc in services" :key="svc" :value="svc" style="background: #0A1628; color: #F1F5F9;">
                    {{ svc }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1.5">Mensaje *</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  placeholder="Cuéntanos brevemente qué necesita tu empresa..."
                  class="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 resize-none"
                  style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);"
                  onfocus="this.style.borderColor='rgba(59,130,246,0.5)'; this.style.background='rgba(37,99,235,0.06)'"
                  onblur="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.04)'"
                />
              </div>

              <button
                type="submit"
                :disabled="sending"
                class="btn-primary w-full justify-center"
              >
                <span v-if="sending">Enviando...</span>
                <span v-else class="flex items-center gap-2 justify-center w-full">
                  Enviar mensaje
                  <Send :size="16" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
