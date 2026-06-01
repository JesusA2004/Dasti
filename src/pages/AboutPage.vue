<script setup lang="ts">
import { useRouter } from 'vue-router'
import { MapPin, Wifi, Monitor, Layers, MessageSquare, ArrowRight } from '@lucide/vue'
import FaqSection from '@/components/FaqSection.vue'
import AnimatedParticles from '@/components/AnimatedParticles.vue'

const router = useRouter()

const zones = [
  {
    name: 'Morelos · Cuernavaca',
    label: 'Zona principal',
    desc: 'Sede principal. Proyectos presenciales y remotos en Cuernavaca y zona metropolitana.',
    color: '#3B82F6',
    presential: true,
  },
  {
    name: 'CDMX · Estado de México',
    label: 'Zona extendida',
    desc: 'Servicios de software, correo y automatización de forma remota. Presencial según alcance.',
    color: '#818CF8',
    presential: false,
  },
  {
    name: 'Puebla y estados cercanos',
    label: 'Cobertura regional',
    desc: 'Servicios remotos sin restricción. Presencial para proyectos que justifican desplazamiento.',
    color: '#34D399',
    presential: false,
  },
]

const values = [
  { icon: Layers, title: 'Soluciones adaptadas', desc: 'No aplicamos plantillas genéricas. Analizamos la operación y proponemos lo que realmente se necesita.', color: '#3B82F6' },
  { icon: MessageSquare, title: 'Comunicación clara', desc: 'Explicamos cada etapa en lenguaje entendible, sin tecnicismos innecesarios y con total transparencia.', color: '#818CF8' },
  { icon: Wifi, title: 'Experiencia integral', desc: 'Cubrimos software, infraestructura, redes, equipos, soporte técnico y automatización.', color: '#34D399' },
  { icon: Monitor, title: 'Tecnología funcional', desc: 'Cada solución parte de una necesidad concreta. La tecnología debe ser útil, no solo moderna.', color: '#FBBF24' },
]
</script>

<template>
  <div class="pt-18">

    <!-- Hero -->
    <section class="relative py-20 overflow-hidden" style="background: var(--bg-base);">
      <div class="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <AnimatedParticles density="low" variant="minimal" :opacity="0.5" speed="slow" />
      <div class="orb w-[600px] h-[400px] top-0 left-1/2 -translate-x-1/2 opacity-15"
        style="background: var(--accent-glow);" />
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          <span class="tag mb-4 inline-block">Quiénes somos</span>
          <h1 class="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span style="color: var(--text-primary);">Desarrollo y Aplicación de</span>
            <span class="gradient-text block">Soluciones en TI</span>
          </h1>
          <p class="text-lg leading-relaxed max-w-2xl mx-auto mb-8" style="color: var(--text-secondary);">
            DASTI es una empresa ubicada en Morelos, con atención principal en Cuernavaca y zona metropolitana.
            Desarrollamos, implementamos y administramos soluciones en Tecnologías de la Información para empresas
            que buscan mejorar su operación, infraestructura, comunicación y procesos internos.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button @click="router.push('/servicios')" class="btn-primary">
              Ver servicios
              <ArrowRight :size="16" />
            </button>
            <button @click="router.push('/contacto')" class="btn-outline">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- What is DASTI — editorial with large image -->
    <section class="relative overflow-hidden" style="background: var(--bg-base);">
      <!-- Large image -->
      <div class="relative h-64 sm:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=75"
          alt="Equipo de trabajo DASTI revisando soluciones en Tecnologías de la Información en Morelos"
          class="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          width="1400"
          height="560"
        />
        <div class="absolute inset-0" style="background: linear-gradient(to bottom, transparent 30%, var(--bg-base) 100%);" />
        <div class="absolute bottom-6 left-6">
          <div class="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2.5">
            <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-xs font-semibold" style="color: var(--text-primary);">DASTI · Morelos, México</span>
          </div>
        </div>
      </div>

      <div class="py-16" style="background: var(--bg-base);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-14 items-center">
            <div
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
            >
              <span class="tag mb-4 inline-block">¿Qué significa DASTI?</span>
              <h2 class="display-text text-3xl sm:text-4xl mb-5" style="color: var(--text-primary);">
                Desarrollo y Aplicación de
                <span class="gradient-text block"> Soluciones en TI</span>
              </h2>
              <p class="text-base leading-relaxed mb-4" style="color: var(--text-secondary);">
                DASTI desarrolla e implementa soluciones tecnológicas reales para empresas que necesitan tecnología funcional, no genérica.
              </p>
              <p class="text-base leading-relaxed mb-6" style="color: var(--text-secondary);">
                Software, redes, correos corporativos, equipos, automatización, integración de sistemas y asesoramiento — todo en una sola empresa.
              </p>
              <div class="flex flex-wrap gap-3">
                <button @click="router.push('/servicios')" class="btn-primary">
                  Ver todos los servicios <ArrowRight :size="15" />
                </button>
                <button @click="router.push('/contacto')" class="btn-outline">
                  Consulta sin compromiso
                </button>
              </div>
            </div>

            <div
              v-motion
              :initial="{ opacity: 0, x: 30 }"
              :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
              class="grid grid-cols-2 gap-4"
            >
              <div
                v-for="v in values"
                :key="v.title"
                class="glass-card rounded-xl p-5 group tilt-card"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                  :style="`background: ${v.color}15; border: 1px solid ${v.color}35;`">
                  <component :is="v.icon" :size="20" :style="`color: ${v.color}`" />
                </div>
                <h4 class="font-semibold text-sm mb-2" style="color: var(--text-primary);">{{ v.title }}</h4>
                <p class="text-xs leading-relaxed" style="color: var(--text-secondary);">{{ v.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-line max-w-7xl mx-auto" />
    </section>

    <!-- How we work — visual grid with images -->
    <section class="relative py-20 overflow-hidden" style="background: var(--bg-surface);">
      <div class="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <AnimatedParticles density="low" variant="minimal" size="sm" :opacity="0.4" speed="slow" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-14"
        >
          <span class="tag mb-4 inline-block">Forma de trabajo</span>
          <h2 class="display-text text-3xl sm:text-4xl mb-4" style="color: var(--text-primary);">Cómo trabajamos</h2>
          <p class="text-base max-w-lg mx-auto" style="color: var(--text-secondary);">Proceso claro desde la primer consulta hasta la entrega.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(step, i) in [
              { n: '01', color: '#3B82F6', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=75', title: 'Consulta inicial', desc: 'Escuchamos lo que necesitas sin compromiso.' },
              { n: '02', color: '#34D399', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=75', title: 'Propuesta y alcance', desc: 'Documentamos alcance, plazos y costo estimado.' },
              { n: '03', color: '#F472B6', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=75', title: 'Implementación', desc: 'Desarrollamos e instalamos con estándares técnicos.' },
              { n: '04', color: '#FBBF24', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&auto=format&fit=crop&q=75', title: 'Entrega y soporte', desc: 'Acompañamos durante la adopción y uso de la solución.' },
            ]"
            :key="i"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 550 } }"
            class="glass-card rounded-2xl overflow-hidden group tilt-card"
          >
            <div class="relative overflow-hidden" style="aspect-ratio: 16/10;">
              <img :src="step.img" :alt="`Paso ${step.n}: ${step.title} - proceso de trabajo DASTI`" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
              <div class="absolute inset-0" :style="`background: linear-gradient(to bottom, ${step.color}22 0%, transparent 50%, rgba(0,0,0,0.3) 100%);`" />
              <div class="absolute top-3 left-3 font-display font-black text-4xl leading-none" :style="`color: ${step.color}; text-shadow: 0 2px 8px rgba(0,0,0,0.3); opacity: 0.9;`">{{ step.n }}</div>
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-sm mb-1.5" style="color: var(--text-primary);">{{ step.title }}</h4>
              <p class="text-xs leading-relaxed" style="color: var(--text-secondary);">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section-line max-w-7xl mx-auto mt-20" />
    </section>

    <!-- Coverage -->
    <section class="py-20 relative overflow-hidden" style="background: var(--bg-base);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-14 items-center mb-14">
          <!-- Left: image of Cuernavaca / Mexico -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
          >
            <div class="relative rounded-2xl overflow-hidden img-zoom" style="aspect-ratio: 4/3; box-shadow: var(--shadow-lg);">
              <img
                src="https://images.unsplash.com/photo-1602940659805-770d1b3b9911?w=900&auto=format&fit=crop&q=75"
                alt="Cobertura geográfica de DASTI en Morelos, Cuernavaca y zonas cercanas"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(135deg, var(--accent-glow-sm) 0%, transparent 60%);" />
              <div class="absolute bottom-4 left-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span class="text-xs font-semibold" style="color: var(--text-primary);">Morelos · México</span>
              </div>
            </div>
          </div>

          <!-- Right: coverage text -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700, delay: 100 } }"
          >
            <span class="tag mb-4 inline-block">Cobertura geográfica</span>
            <h2 class="display-text text-3xl sm:text-4xl mb-5" style="color: var(--text-primary);">¿Dónde atendemos?</h2>
            <p class="text-base leading-relaxed mb-6" style="color: var(--text-secondary);">
              La mayoría de servicios pueden realizarse de forma remota o por videollamada. Para servicios que requieren presencia física, atendemos Morelos y zonas cercanas.
            </p>
            <div class="flex flex-wrap gap-3">
              <button @click="router.push('/contacto')" class="btn-primary">
                Consultar disponibilidad
              </button>
              <button @click="router.push('/contacto')" class="btn-outline">
                Agendar videollamada
              </button>
            </div>
          </div>
        </div>

        <!-- Zone cards -->
        <div class="grid sm:grid-cols-3 gap-5 mb-12">
          <div
            v-for="(zone, i) in zones"
            :key="zone.name"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 600 } }"
            class="glass-card rounded-2xl p-6 relative overflow-hidden"
          >
            <div class="flex items-start gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                :style="`background: ${zone.color}15; border: 1px solid ${zone.color}35;`">
                <MapPin :size="18" :style="`color: ${zone.color}`" />
              </div>
              <div>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium mb-1 inline-block"
                  :style="`background: ${zone.color}12; color: ${zone.color}; border: 1px solid ${zone.color}25;`">
                  {{ zone.label }}
                </span>
                <h3 class="font-semibold text-base" style="color: var(--text-primary);">{{ zone.name }}</h3>
              </div>
            </div>
            <p class="text-sm leading-relaxed" style="color: var(--text-secondary);">{{ zone.desc }}</p>
            <div class="mt-4 flex items-center gap-2">
              <div class="w-2 h-2 rounded-full" :style="`background: ${zone.presential ? '#4ade80' : zone.color};`" />
              <span class="text-xs" style="color: var(--text-muted);">{{ zone.presential ? 'Presencial y remoto' : 'Principalmente remoto' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="section-line max-w-7xl mx-auto mt-16" />
    </section>

    <!-- FAQ -->
    <FaqSection />

  </div>
</template>
