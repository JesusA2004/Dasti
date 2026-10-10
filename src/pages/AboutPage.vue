<script setup lang="ts">
import { ArrowUpRight, MapPin } from '@lucide/vue'
import FaqSection from '@/components/FaqSection.vue'
import { serviceCategories } from '@/data/services'

const acronym = [
  { letter: 'D', word: 'Desarrollo' },
  { letter: 'A', word: 'Aplicación' },
  { letter: 'S', word: 'Soluciones' },
  { letter: 'TI', word: 'Tecnologías de la Información' },
]

const values = [
  { title: 'Soluciones adaptadas', desc: 'No aplicamos plantillas genéricas. Analizamos la operación y proponemos lo que realmente se necesita.' },
  { title: 'Comunicación clara', desc: 'Explicamos cada etapa en lenguaje entendible, sin tecnicismos innecesarios y con total transparencia.' },
  { title: 'Experiencia integral', desc: 'Cubrimos software, infraestructura, redes, equipos, soporte técnico y automatización.' },
  { title: 'Tecnología funcional', desc: 'Cada solución parte de una necesidad concreta. La tecnología debe ser útil, no solo moderna.' },
]

const steps = [
  { n: '01', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=75', title: 'Consulta inicial', desc: 'Escuchamos lo que necesitas sin compromiso.' },
  { n: '02', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&auto=format&fit=crop&q=75', title: 'Propuesta y alcance', desc: 'Documentamos alcance, plazos y costo estimado.' },
  { n: '03', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=75', title: 'Implementación', desc: 'Desarrollamos e instalamos con estándares técnicos.' },
  { n: '04', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=75', title: 'Entrega y soporte', desc: 'Acompañamos durante la adopción y uso de la solución.' },
]

const zones = [
  {
    name: 'Morelos · Cuernavaca',
    label: 'Zona principal',
    desc: 'Sede principal. Proyectos presenciales y remotos en Cuernavaca y zona metropolitana.',
    presential: true,
  },
  {
    name: 'CDMX · Estado de México',
    label: 'Zona extendida',
    desc: 'Servicios de software, correo y automatización de forma remota. Presencial según alcance.',
    presential: false,
  },
  {
    name: 'Puebla y estados cercanos',
    label: 'Cobertura regional',
    desc: 'Servicios remotos sin restricción. Presencial para proyectos que justifican desplazamiento.',
    presential: false,
  },
]
</script>

<template>
  <div class="pt-[96px]">
    <!-- ─── Encabezado ─── -->
    <section class="shell pb-14 pt-10 sm:pt-16" aria-labelledby="about-title">
      <p class="eyebrow animate-fade" style="--d: 80ms">Quiénes somos</p>
      <h1 id="about-title" class="display-1 mt-6 max-w-5xl text-fg">
        <span class="line-mask"><span style="--d: 120ms">Desarrollo y Aplicación de</span></span>
        <span class="line-mask"><span style="--d: 220ms" class="serif text-accent">Soluciones en TI.</span></span>
      </h1>
      <div class="mt-10 grid gap-8 lg:grid-cols-12">
        <p class="lead animate-rise lg:col-span-7" style="--d: 360ms">
          DASTI es una empresa ubicada en Morelos, con atención principal en Cuernavaca y zona metropolitana. Desarrollamos,
          implementamos y administramos soluciones en Tecnologías de la Información para empresas que buscan mejorar su
          operación, infraestructura, comunicación y procesos internos.
        </p>
        <div class="animate-rise flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end" style="--d: 440ms">
          <RouterLink to="/servicios" class="btn btn-ink">
            Ver servicios
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
          <RouterLink to="/contacto" class="btn btn-line">
            Contactar
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ─── Imagen principal ─── -->
    <div v-reveal="'image'" class="stage h-[46vh] min-h-[300px] sm:h-[60vh]">
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&auto=format&fit=crop&q=75"
        alt="Equipo de trabajo DASTI revisando soluciones en Tecnologías de la Información en Morelos"
        class="h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
      <div class="glass-light absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full px-4 py-2.5 sm:bottom-6 sm:left-6">
        <span class="dot-live" />
        <span class="text-xs font-semibold">DASTI · Morelos, México</span>
      </div>
    </div>

    <!-- ─── ¿Qué significa DASTI? ─── -->
    <section class="section" aria-labelledby="meaning-title">
      <div class="shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p v-reveal="'fade'" class="eyebrow">¿Qué significa DASTI?</p>
          <h2 id="meaning-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">
            Un nombre que describe <span class="serif">lo que hacemos.</span>
          </h2>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-6">
            DASTI desarrolla e implementa soluciones tecnológicas reales para empresas que necesitan tecnología funcional,
            no genérica.
          </p>
          <p v-reveal="{ variant: 'up', delay: 140 }" class="mt-4 text-fg-2">
            Software, redes, correos corporativos, equipos, automatización, integración de sistemas y asesoramiento — todo
            en una sola empresa.
          </p>
        </div>
        <ol class="lg:col-span-7">
          <li
            v-for="(a, i) in acronym"
            :key="a.letter"
            v-reveal="{ variant: 'left', delay: i * 90 }"
            class="group flex items-baseline gap-6 border-b border-line py-5 first:border-t sm:gap-10"
          >
            <span class="w-24 shrink-0 font-display text-6xl font-semibold leading-none tracking-tighter text-accent transition-transform duration-500 group-hover:-translate-y-1 sm:w-36 sm:text-8xl">
              {{ a.letter }}
            </span>
            <span class="font-display text-xl font-medium tracking-tight text-fg sm:text-3xl">{{ a.word }}</span>
          </li>
        </ol>
      </div>
    </section>

    <!-- ─── Valores ─── -->
    <section class="stage on-ink grain" aria-labelledby="values-title">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_100%_0%,rgba(37,99,235,0.3),transparent_70%)]" aria-hidden="true" />
      <div class="shell section relative">
        <p v-reveal="'fade'" class="eyebrow !text-on-ink-3">Enfoque</p>
        <h2 id="values-title" v-reveal="'clip'" class="display-2 mt-5 max-w-3xl text-on-ink">
          Cómo entendemos la <span class="serif text-signal">tecnología.</span>
        </h2>
        <div class="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-ink-line sm:grid-cols-2">
          <article v-for="(v, i) in values" :key="v.title" v-reveal="{ variant: 'up', delay: i * 80 }" class="bg-[#071426] p-8 sm:p-10">
            <span class="tabular text-sm text-signal">0{{ i + 1 }}</span>
            <h3 class="title-4 mt-8 text-on-ink">{{ v.title }}</h3>
            <p class="mt-3 max-w-md leading-relaxed text-on-ink-2">{{ v.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ─── Capacidades ─── -->
    <section class="section" aria-labelledby="capabilities-title">
      <div class="shell">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p v-reveal="'fade'" class="eyebrow">Capacidades</p>
            <h2 id="capabilities-title" v-reveal="'clip'" class="display-2 mt-5 max-w-2xl text-fg">
              Una empresa de TI <span class="serif">completa.</span>
            </h2>
          </div>
          <RouterLink v-reveal="'fade'" to="/servicios" class="btn btn-line self-start md:self-end">
            Ver todos los servicios
            <span class="btn-orb"><ArrowUpRight :size="16" /></span>
          </RouterLink>
        </div>
        <div class="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(cat, i) in serviceCategories" :key="cat.number" v-reveal="{ variant: 'up', delay: (i % 3) * 80 }" class="border-t border-line-2 pt-6">
            <div class="flex items-center justify-between">
              <span class="tabular text-sm text-fg-3">{{ cat.number }}</span>
              <component :is="cat.icon" :size="18" class="text-accent" />
            </div>
            <h3 class="title-4 mt-6 text-fg">{{ cat.title }}</h3>
            <ul class="mt-4 space-y-2">
              <li v-for="s in cat.services" :key="s.title" class="text-[0.92rem] text-fg-2">{{ s.title }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Metodología ─── -->
    <section class="stage bg-sky" aria-labelledby="method-title">
      <div class="shell section">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p v-reveal="'fade'" class="eyebrow">Forma de trabajo</p>
            <h2 id="method-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">Cómo trabajamos</h2>
          </div>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead max-w-md">Proceso claro desde la primer consulta hasta la entrega.</p>
        </div>
        <ol class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="(step, i) in steps"
            :key="step.n"
            v-reveal="{ variant: 'up', delay: i * 100 }"
            class="group overflow-hidden rounded-[26px] bg-surface"
            :class="i % 2 === 1 ? 'lg:mt-14' : ''"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="step.img"
                :alt="`Paso ${step.n}: ${step.title} - proceso de trabajo DASTI`"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <span class="glass-light absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold">{{ step.n }}</span>
            </div>
            <div class="p-6">
              <h3 class="font-semibold text-fg">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-fg-2">{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ─── Cobertura ─── -->
    <section class="section" aria-labelledby="coverage-title">
      <div class="shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div v-reveal="'image'" class="relative aspect-[4/5] overflow-hidden rounded-[32px]">
            <img
              src="https://images.unsplash.com/photo-1602940659805-770d1b3b9911?w=1000&auto=format&fit=crop&q=75"
              alt="Cobertura geográfica de DASTI en Morelos, Cuernavaca y zonas cercanas"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div class="glass-light absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2">
              <span class="dot-live" />
              <span class="text-xs font-semibold">Morelos · México</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:col-span-7">
          <p v-reveal="'fade'" class="eyebrow">Cobertura geográfica</p>
          <h2 id="coverage-title" v-reveal="'clip'" class="display-2 mt-5 text-fg">¿Dónde atendemos?</h2>
          <p v-reveal="{ variant: 'up', delay: 100 }" class="lead mt-6">
            La mayoría de servicios pueden realizarse de forma remota o por videollamada. Para servicios que requieren
            presencia física, atendemos Morelos y zonas cercanas.
          </p>
          <ul class="mt-10 border-t border-line">
            <li v-for="(z, i) in zones" :key="z.name" v-reveal="{ variant: 'up', delay: i * 80 }" class="grid gap-3 border-b border-line py-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6">
              <span class="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent"><MapPin :size="17" /></span>
              <span>
                <span class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">{{ z.label }}</span>
                <span class="mt-1 block font-semibold text-fg">{{ z.name }}</span>
                <span class="mt-1 block text-sm leading-relaxed text-fg-2">{{ z.desc }}</span>
              </span>
              <span class="chip self-start">
                <span class="h-1.5 w-1.5 rounded-full" :class="z.presential ? 'bg-emerald-500' : 'bg-accent'" />
                {{ z.presential ? 'Presencial y remoto' : 'Principalmente remoto' }}
              </span>
            </li>
          </ul>
          <div v-reveal="'up'" class="mt-10 flex flex-wrap gap-3">
            <RouterLink to="/contacto" class="btn btn-ink">
              Consultar disponibilidad
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
            <RouterLink to="/contacto" class="btn btn-line">
              Agendar videollamada
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FAQ ─── -->
    <div class="border-t border-line">
      <FaqSection />
    </div>
  </div>
</template>
