<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
    tags: ['Consulta', 'Diagnóstico', 'Objetivos'],
    keyword: 'Escuchar primero',
  },
  {
    number: '02',
    icon: PenTool,
    color: '#34D399',
    title: 'Diseñamos la solución',
    desc: 'Con base en lo que encontramos, diseñamos una propuesta técnica adaptada a tu presupuesto y tamaño. Sin soluciones genéricas. Sin sobreventas.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&auto=format&fit=crop&q=80',
    tags: ['Propuesta', 'Presupuesto', 'Cronograma'],
    keyword: 'Soluciones a medida',
  },
  {
    number: '03',
    icon: Rocket,
    color: '#F472B6',
    title: 'Implementamos la tecnología',
    desc: 'Desarrollamos, configuramos e instalamos todo. Infraestructura, software, correos, redes — lo que sea necesario para que funcione como se propuso.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80',
    tags: ['Desarrollo', 'Instalación', 'Configuración'],
    keyword: 'Ejecución técnica',
  },
  {
    number: '04',
    icon: HeartHandshake,
    color: '#FBBF24',
    title: 'Te acompañamos después',
    desc: 'La entrega es el inicio, no el final. Ofrecemos capacitación, soporte técnico y seguimiento para que el proyecto siga funcionando y evolucionando.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&auto=format&fit=crop&q=80',
    tags: ['Soporte', 'Capacitación', 'Seguimiento'],
    keyword: 'Acompañamiento real',
  },
]

const activeStep = ref(0)
const stepTriggers = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = stepTriggers.value.indexOf(entry.target as HTMLElement)
          if (idx !== -1) activeStep.value = idx
        }
      })
    },
    {
      threshold: 0.5,
      rootMargin: '0px 0px -5% 0px',
    }
  )
  stepTriggers.value.forEach(el => { if (el) observer!.observe(el) })
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="relative overflow-hidden" style="background: var(--bg-base);">
    <!-- Section header (normal flow, above the sticky area) -->
    <div class="relative py-20 text-center z-10" style="background: var(--bg-base);">
      <div class="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div class="relative max-w-3xl mx-auto px-4">
        <span class="tag mb-4 inline-block">Cómo trabajamos</span>
        <h2 class="display-text text-3xl sm:text-4xl lg:text-5xl mb-4" style="color: var(--text-primary);">
          De la idea a la
          <span class="gradient-text"> realidad</span>
        </h2>
        <p class="text-base sm:text-lg" style="color: var(--text-secondary);">
          Un proceso claro, sin tecnicismos, orientado a resultados reales.
        </p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════
         DESKTOP: PINNED SCROLL — sticky 100vh panel
         The outer div creates 4×90vh of scroll height.
         The inner sticky div stays at top:0 for the whole duration.
         Invisible triggers change the active step.
    ══════════════════════════════════════════════════════ -->
    <div
      class="hidden lg:block relative"
      style="height: 360vh;"
    >
      <!-- Sticky full-screen panel -->
      <div
        class="sticky top-0 overflow-hidden"
        style="height: 100vh;"
      >
        <div class="h-full flex">

          <!-- ── LEFT: Image panel (55%) ── -->
          <div class="relative overflow-hidden flex-shrink-0" style="width: 55%;">
            <!-- Image transitions between steps -->
            <Transition
              enter-active-class="transition-all duration-600 ease-out"
              enter-from-class="opacity-0 scale-[1.04]"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-350 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-[0.97]"
              mode="out-in"
            >
              <div :key="activeStep" class="absolute inset-0">
                <img
                  :src="steps[activeStep].image"
                  :alt="steps[activeStep].title"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                <!-- Color overlay per step -->
                <div
                  class="absolute inset-0"
                  :style="`background: linear-gradient(135deg, ${steps[activeStep].color}30 0%, transparent 55%, rgba(0,0,0,0.25) 100%);`"
                />

                <!-- Right-side fade into content -->
                <div
                  class="absolute inset-y-0 right-0 w-32 pointer-events-none"
                  style="background: linear-gradient(to right, transparent, var(--bg-base));"
                />

                <!-- Step number watermark -->
                <div
                  class="absolute top-8 left-8 font-display font-black leading-none select-none pointer-events-none"
                  :style="`font-size: 9rem; color: ${steps[activeStep].color}; opacity: 0.12; line-height: 1;`"
                >
                  {{ steps[activeStep].number }}
                </div>

                <!-- Progress dots -->
                <div class="absolute top-6 right-8 flex flex-col gap-2">
                  <div
                    v-for="(s, i) in steps"
                    :key="i"
                    class="rounded-full transition-all duration-500 ml-auto"
                    :style="`
                      width: 6px;
                      height: ${activeStep === i ? '22px' : '6px'};
                      background: ${activeStep === i ? s.color : 'rgba(255,255,255,0.25)'};
                      box-shadow: ${activeStep === i ? `0 0 10px ${s.color}80` : 'none'};
                    `"
                  />
                </div>
              </div>
            </Transition>

            <!-- Floating badge (bottom-left, transitions with step) -->
            <Transition
              enter-active-class="transition-all duration-450 ease-out"
              enter-from-class="opacity-0 translate-y-3"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200"
              leave-to-class="opacity-0"
              mode="out-in"
            >
              <div
                :key="activeStep"
                class="absolute bottom-8 left-8 glass-card rounded-2xl p-4 flex items-center gap-3"
                style="box-shadow: var(--shadow-md); max-width: 260px;"
              >
                <div
                  class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  :style="`background: ${steps[activeStep].color}22; border: 1.5px solid ${steps[activeStep].color}45; box-shadow: 0 0 16px ${steps[activeStep].color}20;`"
                >
                  <component :is="steps[activeStep].icon" :size="20" :style="`color: ${steps[activeStep].color};`" />
                </div>
                <div>
                  <p class="text-xs font-bold" style="color: var(--text-primary);">
                    Paso {{ steps[activeStep].number }}
                  </p>
                  <p class="text-xs font-medium" :style="`color: ${steps[activeStep].color};`">
                    {{ steps[activeStep].keyword }}
                  </p>
                </div>
              </div>
            </Transition>

            <!-- Color accent line at bottom -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1 transition-all duration-700"
              :style="`background: linear-gradient(90deg, ${steps[activeStep].color}, transparent);`"
            />
          </div>

          <!-- ── RIGHT: Content panel (45%) ── -->
          <div
            class="flex items-center flex-shrink-0 px-12 py-8"
            style="width: 45%;"
          >
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 translate-x-6"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition-all duration-280 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0 -translate-x-3"
              mode="out-in"
            >
              <div :key="activeStep" class="max-w-md">

                <!-- Step number accent -->
                <div class="flex items-center gap-3 mb-5">
                  <span
                    class="font-display font-black text-6xl leading-none"
                    :style="`color: ${steps[activeStep].color}; opacity: 0.15;`"
                  >
                    {{ steps[activeStep].number }}
                  </span>
                  <div class="flex-1">
                    <div
                      class="h-0.5 rounded-full mb-1"
                      :style="`background: ${steps[activeStep].color}; width: 40px;`"
                    />
                    <span
                      class="text-xs font-bold tracking-widest uppercase"
                      :style="`color: ${steps[activeStep].color};`"
                    >
                      Paso {{ steps[activeStep].number }}
                    </span>
                  </div>
                </div>

                <!-- Title -->
                <h3
                  class="display-text text-2xl sm:text-3xl mb-4"
                  style="color: var(--text-primary);"
                >
                  {{ steps[activeStep].title }}
                </h3>

                <!-- Description -->
                <p class="text-base leading-relaxed mb-6" style="color: var(--text-secondary);">
                  {{ steps[activeStep].desc }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-8">
                  <span
                    v-for="tag in steps[activeStep].tags"
                    :key="tag"
                    class="text-xs px-3 py-1.5 rounded-full font-medium"
                    :style="`background: ${steps[activeStep].color}12; color: ${steps[activeStep].color}; border: 1px solid ${steps[activeStep].color}25;`"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Step counter -->
                <div class="flex items-center gap-3">
                  <div class="flex gap-1.5">
                    <div
                      v-for="(s, i) in steps"
                      :key="i"
                      class="rounded-full transition-all duration-400"
                      :style="`
                        width: ${activeStep === i ? '20px' : '6px'};
                        height: 6px;
                        background: ${activeStep === i ? s.color : 'var(--border-medium)'};
                        box-shadow: ${activeStep === i ? `0 0 8px ${s.color}60` : 'none'};
                      `"
                    />
                  </div>
                  <span class="text-xs" style="color: var(--text-muted);">
                    {{ activeStep + 1 }} de {{ steps.length }}
                  </span>
                </div>
              </div>
            </Transition>
          </div>

        </div>
      </div>

      <!-- ══════════════════════════════════════════════
           Invisible scroll triggers — one per step.
           These are absolutely positioned inside the
           360vh container. Each trigger = 90vh.
           IntersectionObserver fires when 50% is visible.
      ══════════════════════════════════════════════════ -->
      <div class="absolute inset-0 pointer-events-none">
        <div
          v-for="(step, i) in steps"
          :key="`trigger-${i}`"
          :ref="(el) => { if (el) stepTriggers[i] = el as HTMLElement }"
          class="absolute w-full"
          :style="`top: ${i * 90}vh; height: 90vh;`"
        />
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         MOBILE: Vertical timeline with images
    ══════════════════════════════════════════════════ -->
    <div class="lg:hidden space-y-0" style="background: var(--bg-base);">
      <div
        v-for="(step, i) in steps"
        :key="step.number"
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 80, duration: 500 } }"
        class="relative"
      >
        <!-- Full-width image -->
        <div class="relative overflow-hidden" style="aspect-ratio: 16/9; max-height: 240px;">
          <img :src="step.image" :alt="step.title" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute inset-0" :style="`background: linear-gradient(to bottom, ${step.color}22 0%, transparent 50%, rgba(0,0,0,0.35) 100%);`" />
          <div
            class="absolute top-4 left-4 font-display font-black leading-none select-none"
            :style="`font-size: 5rem; color: ${step.color}; opacity: 0.18;`"
          >{{ step.number }}</div>
        </div>

        <!-- Content -->
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

      <!-- Mobile CTA -->
      <div class="px-5 py-10 text-center">
        <button @click="router.push('/contacto')" class="btn-primary">
          Iniciar el proceso
          <ArrowRight :size="15" />
        </button>
      </div>
    </div>

    <div class="section-line max-w-7xl mx-auto" />
  </section>
</template>
