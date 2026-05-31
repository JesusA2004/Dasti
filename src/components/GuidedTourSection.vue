<script setup lang="ts">
import { ref } from 'vue'
import { SearchCheck, PenTool, Rocket, HeartHandshake, ArrowRight } from '@lucide/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const steps = [
  {
    number: '01',
    icon: SearchCheck,
    color: '#3B82F6',
    title: 'Entendemos tu necesidad',
    desc: 'Empezamos con una consulta sin compromiso. Analizamos tu situación actual, identificamos los puntos de dolor y entendemos qué quieres lograr con tecnología.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=85',
    tags: ['Consulta', 'Diagnóstico', 'Objetivos'],
    keyword: 'Escuchar primero',
  },
  {
    number: '02',
    icon: PenTool,
    color: '#34D399',
    title: 'Diseñamos la solución',
    desc: 'Con base en lo que encontramos, diseñamos una propuesta técnica adaptada a tu presupuesto y tamaño. Sin soluciones genéricas. Sin sobreventas.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=85',
    tags: ['Propuesta', 'Presupuesto', 'Cronograma'],
    keyword: 'Soluciones a medida',
  },
  {
    number: '03',
    icon: Rocket,
    color: '#F472B6',
    title: 'Implementamos la tecnología',
    desc: 'Desarrollamos, configuramos e instalamos todo. Infraestructura, software, correos, redes — lo que sea necesario para que funcione como se propuso.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=85',
    tags: ['Desarrollo', 'Instalación', 'Configuración'],
    keyword: 'Ejecución técnica',
  },
  {
    number: '04',
    icon: HeartHandshake,
    color: '#FBBF24',
    title: 'Te acompañamos después',
    desc: 'La entrega es el inicio, no el final. Ofrecemos capacitación, soporte técnico y seguimiento para que el proyecto siga funcionando y evolucionando.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=85',
    tags: ['Soporte', 'Capacitación', 'Seguimiento'],
    keyword: 'Acompañamiento real',
  },
]

// Track which step is hovered for subtle interactive feedback on desktop
const hoveredStep = ref<number | null>(null)
</script>

<template>
  <section class="relative" style="background: var(--bg-base);">

    <!-- ── Section header ── -->
    <div class="relative py-20 text-center z-10" style="background: var(--bg-base);">
      <div class="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div class="relative max-w-3xl mx-auto px-4">
        <span class="tag mb-4 inline-block">Cómo trabajamos</span>
        <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl mb-4" style="color: var(--text-primary);">
          De la idea a la <span class="gradient-text">realidad</span>
        </h2>
        <p class="text-base sm:text-lg" style="color: var(--text-secondary);">
          Un proceso claro, sin tecnicismos, orientado a resultados reales.
        </p>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════
         DESKTOP — 4 alternating editorial rows.
         Pure normal-flow scroll. No sticky, no lock, no events.
         Each step is a full-width row: image 55% + content 45%.
         Even-indexed steps reverse the order (image right).
    ════════════════════════════════════════════════════════ -->
    <div class="hidden lg:block">
      <div
        v-for="(step, i) in steps"
        :key="step.number"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 0, duration: 700, ease: 'easeOut' } }"
        class="relative"
        @mouseenter="hoveredStep = i"
        @mouseleave="hoveredStep = null"
      >
        <!-- Step row — flex, reversed on even rows for alternating effect -->
        <div
          class="flex"
          :class="{ 'flex-row-reverse': i % 2 === 1 }"
          style="min-height: 540px;"
        >

          <!-- ── Image side (55%) ── -->
          <div class="relative overflow-hidden flex-shrink-0" style="width: 55%;">
            <div class="absolute inset-0 overflow-hidden">
              <img
                :src="step.image"
                :alt="step.title"
                class="w-full h-full object-cover transition-transform duration-700 ease-out"
                :style="`transform: scale(${hoveredStep === i ? 1.04 : 1})`"
                loading="lazy"
              />
              <!-- Color tint overlay -->
              <div
                class="absolute inset-0 transition-opacity duration-500"
                :style="`
                  background: linear-gradient(135deg, ${step.color}30 0%, transparent 55%, rgba(0,0,0,0.22) 100%);
                  opacity: ${hoveredStep === i ? 1 : 0.7};
                `"
              />
              <!-- Edge fade toward content panel -->
              <div
                class="absolute inset-y-0 pointer-events-none"
                :class="i % 2 === 0 ? 'right-0' : 'left-0'"
                style="width: 160px;"
                :style="`background: linear-gradient(${i % 2 === 0 ? 'to right' : 'to left'}, transparent, var(--bg-base));`"
              />
              <!-- Bottom vignette -->
              <div
                class="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style="background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.18));"
              />
            </div>

            <!-- Step watermark number -->
            <div
              class="absolute font-display font-black leading-none select-none pointer-events-none transition-all duration-500"
              :class="i % 2 === 0 ? 'top-8 left-8' : 'top-8 right-8'"
              :style="`
                font-size: 8rem;
                color: ${step.color};
                opacity: ${hoveredStep === i ? 0.18 : 0.12};
                line-height: 1;
              `"
            >{{ step.number }}</div>

            <!-- Floating keyword badge -->
            <div
              class="absolute glass-card rounded-2xl px-4 py-3 flex items-center gap-3 transition-all duration-400"
              :class="i % 2 === 0 ? 'bottom-8 left-8' : 'bottom-8 right-8'"
              style="backdrop-filter: blur(14px); max-width: 240px; box-shadow: var(--shadow-md);"
              :style="`transform: translateY(${hoveredStep === i ? '-4px' : '0'}); box-shadow: ${hoveredStep === i ? 'var(--shadow-lg)' : 'var(--shadow-md)'};`"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                :style="`background: ${step.color}20; border: 1.5px solid ${step.color}40;`"
              >
                <component :is="step.icon" :size="18" :style="`color: ${step.color};`" />
              </div>
              <div>
                <p class="text-xs font-bold" style="color: var(--text-primary);">Paso {{ step.number }}</p>
                <p class="text-xs font-medium" :style="`color: ${step.color};`">{{ step.keyword }}</p>
              </div>
            </div>

            <!-- Color accent line -->
            <div
              class="absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-700"
              :style="`background: linear-gradient(${i % 2 === 0 ? '90deg' : '270deg'}, ${step.color}, ${step.color}40, transparent);`"
            />
          </div>

          <!-- ── Content side (45%) ── -->
          <div
            class="flex flex-col justify-center flex-shrink-0 px-14 py-16 relative"
            style="width: 45%;"
          >
            <!-- Step number + label -->
            <div class="flex items-center gap-3 mb-5">
              <span
                class="font-display font-black text-7xl leading-none transition-all duration-400"
                :style="`color: ${step.color}; opacity: ${hoveredStep === i ? 0.18 : 0.10};`"
              >{{ step.number }}</span>
              <div>
                <div
                  class="h-[2px] rounded-full mb-1.5 transition-all duration-400"
                  :style="`background: ${step.color}; width: ${hoveredStep === i ? '44px' : '30px'};`"
                />
                <span
                  class="text-xs font-bold tracking-widest uppercase"
                  :style="`color: ${step.color};`"
                >Paso {{ step.number }}</span>
              </div>
            </div>

            <!-- Title -->
            <h3
              class="display-text text-2xl xl:text-3xl leading-tight mb-4"
              style="color: var(--text-primary);"
            >{{ step.title }}</h3>

            <!-- Description -->
            <p class="text-base leading-relaxed mb-7" style="color: var(--text-secondary);">
              {{ step.desc }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="tag in step.tags"
                :key="tag"
                class="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300"
                :style="`
                  background: ${hoveredStep === i ? step.color + '18' : step.color + '10'};
                  color: ${step.color};
                  border: 1px solid ${step.color}28;
                `"
              >{{ tag }}</span>
            </div>

            <!-- CTA on last step -->
            <div v-if="i === steps.length - 1">
              <button @click="router.push('/contacto')" class="btn-primary">
                Iniciar el proceso
                <ArrowRight :size="15" />
              </button>
            </div>
          </div>
        </div>

        <!-- Step connector (between steps, not after last) -->
        <div v-if="i < steps.length - 1" class="flex items-center justify-center py-3">
          <div class="flex items-center gap-2">
            <div class="h-[1px] w-20" style="background: var(--border-subtle);" />
            <div
              class="w-1.5 h-1.5 rounded-full transition-all duration-400"
              :style="`background: ${steps[i + 1].color}; opacity: 0.5;`"
            />
            <div class="h-[1px] w-20" style="background: var(--border-subtle);" />
          </div>
        </div>
      </div>
    </div>
    <!-- END DESKTOP -->

    <!-- ══════════════════════════════════════════════
         MOBILE — Vertical timeline (no changes)
    ═══════════════════════════════════════════════ -->
    <div class="lg:hidden" style="background: var(--bg-base);">
      <div
        v-for="(step, i) in steps"
        :key="step.number"
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 80, duration: 500 } }"
        class="relative"
      >
        <div class="relative overflow-hidden" style="aspect-ratio: 16/9; max-height: 240px;">
          <img :src="step.image" :alt="step.title" class="w-full h-full object-cover" loading="lazy" />
          <div
            class="absolute inset-0"
            :style="`background: linear-gradient(to bottom, ${step.color}22 0%, transparent 50%, rgba(0,0,0,0.35) 100%);`"
          />
          <div
            class="absolute top-4 left-4 font-display font-black leading-none select-none"
            :style="`font-size: 5rem; color: ${step.color}; opacity: 0.18;`"
          >{{ step.number }}</div>
        </div>
        <div class="px-5 py-6" style="border-bottom: 1px solid var(--border-subtle);">
          <div class="flex items-center gap-2 mb-3">
            <div
              class="w-8 h-8 rounded-xl flex items-center justify-center"
              :style="`background: ${step.color}18; border: 1px solid ${step.color}30;`"
            >
              <component :is="step.icon" :size="15" :style="`color: ${step.color};`" />
            </div>
            <span class="text-xs font-bold tracking-widest uppercase" :style="`color: ${step.color};`">
              {{ step.number }} · {{ step.keyword }}
            </span>
          </div>
          <h3 class="font-display font-bold text-xl mb-2" style="color: var(--text-primary);">{{ step.title }}</h3>
          <p class="text-sm leading-relaxed mb-4" style="color: var(--text-secondary);">{{ step.desc }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in step.tags"
              :key="tag"
              class="text-xs px-2.5 py-1 rounded-full"
              :style="`background: ${step.color}10; color: ${step.color}; border: 1px solid ${step.color}25;`"
            >{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="px-5 py-10 text-center">
        <button @click="router.push('/contacto')" class="btn-primary">
          Iniciar el proceso <ArrowRight :size="15" />
        </button>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto" />
  </section>
</template>
