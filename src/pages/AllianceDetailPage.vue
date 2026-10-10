<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, ArrowUpRight, FileCheck2, Landmark, Calculator, Phone } from '@lucide/vue'
import IndependenceNotice from '@/components/alliances/IndependenceNotice.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { formatMXN } from '@/utils/format'
import { allianceWhatsAppUrl, getAlliance, type AllianceService } from '@/data/alliances'

/**
 * Página de un aliado estratégico (p. ej. /alianzas/nexora).
 * Usa la identidad visual del aliado (src/data/alliances.ts → theme) y
 * dirige TODOS los contactos al WhatsApp del aliado, nunca al de DASTI.
 */
const props = defineProps<{ slug: string }>()

const ally = computed(() => getAlliance(props.slug))

const themeVars = computed(() => {
  const t = ally.value?.theme
  if (!t) return {}
  return {
    '--nx-bg': t.bg,
    '--nx-bg2': t.bg2,
    '--nx-accent': t.accent,
    '--nx-accent-light': t.accentLight,
    '--nx-accent-deep': t.accentDeep,
    '--nx-text': t.text,
    '--nx-muted': t.textMuted,
    '--nx-line': t.line,
  }
})

const generalUrl = computed(() => (ally.value ? allianceWhatsAppUrl(ally.value) : '#'))
const serviceUrl = (s: AllianceService) => (ally.value ? allianceWhatsAppUrl(ally.value, s.name) : '#')

const groupIcons: Record<string, typeof Landmark> = { repse: FileCheck2, contabilidad: Calculator, fiscal: Landmark }

const servicesBy = (group: string) => ally.value?.services.filter((s) => s.group === group) ?? []
</script>

<template>
  <div v-if="ally" class="pt-[96px]" :style="themeVars">
    <!-- ─── Contexto ─── -->
    <div class="shell flex flex-wrap items-center justify-between gap-3 pb-5 pt-4">
      <nav class="flex items-center gap-2 text-sm text-fg-3" aria-label="Ruta de navegación">
        <RouterLink to="/alianzas" class="link-u hover:text-fg">Alianzas</RouterLink>
        <span>/</span>
        <span class="text-fg">{{ ally.displayName }}</span>
      </nav>
      <span class="chip">{{ ally.badge }} de DASTI</span>
    </div>

    <!-- ─── Micrositio del aliado ─── -->
    <div class="nx stage">
      <!-- Hero -->
      <section class="relative isolate overflow-hidden" aria-labelledby="ally-title">
        <img
          :src="ally.heroImage"
          :alt="`${ally.specialty} — imagen ilustrativa`"
          class="absolute inset-0 -z-20 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div class="nx-hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

        <div class="shell grid gap-12 pb-14 pt-12 sm:pt-16 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-24">
          <div class="lg:col-span-7">
            <!-- Espacio para el logotipo oficial -->
            <div class="animate-fade flex items-center gap-4" style="--d: 80ms">
              <div
                class="grid h-16 min-w-16 place-items-center rounded-2xl border px-3"
                :class="ally.logo ? 'border-transparent bg-white' : 'border-dashed border-[var(--nx-line)]'"
              >
                <img v-if="ally.logo" :src="ally.logo" :alt="`Logotipo de ${ally.name}`" class="h-10 w-auto object-contain" />
                <span v-else class="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-[var(--nx-muted)]">Logo</span>
              </div>
              <div>
                <p class="nx-wordmark font-serif text-3xl leading-none tracking-[0.12em]">{{ ally.name }}</p>
                <p class="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--nx-accent)]">{{ ally.specialty }}</p>
              </div>
            </div>

            <h1 id="ally-title" class="nx-title mt-10 font-serif text-[clamp(2.5rem,6.2vw,5.4rem)] leading-[0.98] tracking-[-0.01em]">
              <span class="line-mask"><span style="--d: 160ms">{{ ally.headline }}</span></span>
            </h1>
            <p class="animate-rise mt-6 font-serif text-xl italic text-[var(--nx-accent-light)] sm:text-2xl" style="--d: 320ms">
              {{ ally.motto }}
            </p>
            <p class="animate-rise mt-5 max-w-xl leading-relaxed text-[var(--nx-muted)] sm:text-lg" style="--d: 400ms">
              {{ ally.description }}
            </p>
            <div class="animate-rise mt-10 flex flex-wrap gap-3" style="--d: 480ms">
              <a :href="generalUrl" target="_blank" rel="noopener noreferrer" class="nx-btn">
                Contactar a {{ ally.displayName }}
                <span class="nx-btn-orb"><WhatsAppIcon :size="15" /></span>
              </a>
              <a :href="generalUrl" target="_blank" rel="noopener noreferrer" class="nx-btn nx-btn-outline">
                Solicitar cotización
                <span class="nx-btn-orb"><ArrowUpRight :size="15" /></span>
              </a>
            </div>
          </div>

          <!-- Tarjeta informativa -->
          <aside class="animate-rise rounded-[26px] bg-white p-6 text-[#0B1220] shadow-2xl sm:p-7 lg:col-span-5" style="--d: 420ms" aria-label="Áreas de servicio">
            <p class="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--nx-accent-deep)]">Áreas de servicio</p>
            <ul class="mt-4 divide-y divide-[#0B1220]/10">
              <li v-for="g in ally.serviceGroups" :key="g.id" class="flex items-start gap-4 py-4">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--nx-bg)] text-[var(--nx-accent-light)]">
                  <component :is="groupIcons[g.id] ?? Landmark" :size="17" />
                </span>
                <span>
                  <span class="block font-serif text-xl leading-tight">{{ g.title }}</span>
                  <span class="mt-0.5 block text-sm text-[#0B1220]/60">{{ g.desc }}</span>
                </span>
              </li>
            </ul>
            <a :href="generalUrl" target="_blank" rel="noopener noreferrer" class="mt-3 flex items-center gap-2 text-sm font-semibold text-[var(--nx-accent-deep)]">
              <Phone :size="15" /> {{ ally.whatsapp.display }}
            </a>
          </aside>
        </div>
      </section>

      <!-- Aviso de independencia -->
      <div class="shell py-8">
        <IndependenceNotice :text="ally.disclaimer" :accent="ally.theme.accent" />
      </div>

      <!-- Servicios -->
      <section class="shell pb-16 pt-8 lg:pb-24" aria-labelledby="ally-services-title">
        <div class="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p class="nx-eyebrow">Servicios de {{ ally.displayName }}</p>
            <h2 id="ally-services-title" v-reveal="'clip'" class="nx-title mt-4 font-serif text-[clamp(2.1rem,4.6vw,3.8rem)] leading-none">
              Servicios y tarifas de referencia
            </h2>
          </div>
          <p class="text-[var(--nx-muted)] lg:col-span-5">
            Importes de referencia en MXN. Cada servicio se cotiza directamente con {{ ally.displayName }} según la
            información y complejidad de tu empresa.
          </p>
        </div>

        <div v-for="group in ally.serviceGroups" :key="group.id" class="mt-16">
          <div class="flex items-center gap-4 border-b border-[var(--nx-line)] pb-4">
            <component :is="groupIcons[group.id] ?? Landmark" :size="18" class="text-[var(--nx-accent)]" />
            <h3 class="font-serif text-2xl text-[var(--nx-text)]">{{ group.title }}</h3>
          </div>

          <div
            class="mt-6 grid gap-4"
            :class="servicesBy(group.id).length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
          >
            <article
              v-for="(svc, i) in servicesBy(group.id)"
              :key="svc.id"
              v-reveal="{ variant: 'up', delay: i * 80 }"
              class="flex flex-col rounded-[24px] p-6 sm:p-7"
              :class="svc.featured ? 'nx-card-featured md:col-span-1' : 'nx-card'"
            >
              <h4 class="font-serif text-[1.6rem] leading-tight" :class="svc.featured ? 'text-[var(--nx-bg)]' : 'text-[var(--nx-text)]'">
                {{ svc.name }}
              </h4>

              <div class="mt-6">
                <template v-if="svc.price !== null">
                  <p class="text-xs font-medium uppercase tracking-[0.14em]" :class="svc.featured ? 'text-[var(--nx-accent-deep)]' : 'text-[var(--nx-accent)]'">
                    {{ svc.prefix }}
                  </p>
                  <p class="tabular mt-1 font-display text-[2.1rem] font-semibold tracking-tight" :class="svc.featured ? 'text-[var(--nx-bg)]' : 'text-[var(--nx-text)]'">
                    {{ formatMXN(svc.price) }} <span class="text-base font-medium">MXN</span>
                  </p>
                  <p v-if="svc.unit" class="text-sm" :class="svc.featured ? 'text-[var(--nx-bg)]/65' : 'text-[var(--nx-muted)]'">{{ svc.unit }}</p>
                </template>
                <p v-else class="font-serif text-2xl italic" :class="svc.featured ? 'text-[var(--nx-accent-deep)]' : 'text-[var(--nx-accent-light)]'">
                  Cotización personalizada
                </p>
              </div>

              <p v-if="svc.note" class="mt-4 text-sm leading-relaxed" :class="svc.featured ? 'text-[var(--nx-bg)]/70' : 'text-[var(--nx-muted)]'">
                {{ svc.note }}
              </p>

              <div class="mt-auto pt-7">
                <a
                  :href="serviceUrl(svc)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="nx-link inline-flex items-center gap-2 text-sm font-semibold"
                  :class="svc.featured ? 'text-[var(--nx-bg)]' : 'text-[var(--nx-accent-light)]'"
                  :aria-label="`Consultar el servicio ${svc.name} con ${ally.displayName} por WhatsApp`"
                >
                  <WhatsAppIcon :size="15" />
                  Consultar este servicio
                  <ArrowUpRight :size="15" />
                </a>
              </div>
            </article>
          </div>
        </div>

        <!-- Condiciones -->
        <div class="mt-16 grid gap-6 rounded-[24px] border border-[var(--nx-line)] p-6 sm:p-8 lg:grid-cols-12">
          <p class="nx-eyebrow lg:col-span-3">Condiciones generales</p>
          <ul class="space-y-3 lg:col-span-9">
            <li v-for="c in ally.conditions" :key="c" class="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--nx-muted)]">
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--nx-accent)]" />
              {{ c }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Banda editorial -->
      <section class="grid gap-3 px-3 pb-3 sm:grid-cols-2" aria-hidden="true">
        <div
          v-for="(img, i) in ally.supportImages"
          :key="img"
          v-reveal="{ variant: 'image', delay: i * 100 }"
          class="relative aspect-[16/10] overflow-hidden rounded-[22px]"
        >
          <img :src="img" alt="" loading="lazy" decoding="async" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[var(--nx-bg)]/70 to-transparent" />
        </div>
      </section>

      <!-- CTA final -->
      <section class="shell py-16 text-center lg:py-24" aria-labelledby="ally-cta-title">
        <p class="nx-eyebrow justify-center">{{ ally.name }} · {{ ally.specialty }}</p>
        <h2 id="ally-cta-title" v-reveal="'clip'" class="nx-title mx-auto mt-5 max-w-3xl font-serif text-[clamp(2.1rem,5vw,4.2rem)] leading-none">
          {{ ally.motto }}
        </h2>
        <div class="mt-10 flex flex-wrap justify-center gap-3">
          <a :href="generalUrl" target="_blank" rel="noopener noreferrer" class="nx-btn">
            Contactar a {{ ally.displayName }}
            <span class="nx-btn-orb"><WhatsAppIcon :size="15" /></span>
          </a>
        </div>
        <p class="mt-5 text-sm text-[var(--nx-muted)]">WhatsApp directo de {{ ally.displayName }}: {{ ally.whatsapp.display }}</p>
        <div class="mx-auto mt-12 max-w-3xl text-left">
          <IndependenceNotice :text="ally.disclaimer" :accent="ally.theme.accent" compact />
        </div>
      </section>
    </div>

    <div class="shell py-10">
      <RouterLink to="/alianzas" class="inline-flex items-center gap-2 text-sm font-medium text-fg-2 hover:text-fg">
        <ArrowLeft :size="16" /> Volver a alianzas
      </RouterLink>
    </div>
  </div>

  <div v-else class="shell pb-24 pt-40 text-center">
    <h1 class="display-3 text-fg">Aliado no encontrado</h1>
    <RouterLink to="/alianzas" class="btn btn-ink mt-8">
      Ver alianzas
      <span class="btn-orb"><ArrowUpRight :size="16" /></span>
    </RouterLink>
  </div>
</template>

<style scoped>
.nx {
  background:
    radial-gradient(60% 40% at 100% 0%, color-mix(in srgb, var(--nx-accent) 12%, transparent), transparent 70%),
    linear-gradient(180deg, var(--nx-bg) 0%, var(--nx-bg2) 100%);
  color: var(--nx-text);
}

.nx-hero-overlay {
  background:
    linear-gradient(90deg, var(--nx-bg) 0%, color-mix(in srgb, var(--nx-bg) 88%, transparent) 45%, color-mix(in srgb, var(--nx-bg) 55%, transparent) 100%),
    linear-gradient(0deg, var(--nx-bg) 0%, transparent 40%);
}

.nx-title { color: var(--nx-text); }

.nx-wordmark {
  background: linear-gradient(180deg, var(--nx-accent-light) 0%, var(--nx-accent) 55%, var(--nx-accent-deep) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nx-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--nx-accent);
}
.nx-eyebrow::before {
  content: '';
  width: 22px;
  height: 1px;
  background: currentColor;
}

.nx-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 50px;
  padding: 0.4rem 0.45rem 0.4rem 1.4rem;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--nx-bg);
  background: linear-gradient(135deg, var(--nx-accent-light) 0%, var(--nx-accent) 60%, var(--nx-accent-deep) 100%);
  transition: box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.nx-btn:hover { box-shadow: 0 18px 44px -18px var(--nx-accent); }
.nx-btn:active { transform: scale(0.98); }
.nx-btn-outline {
  background: transparent;
  color: var(--nx-text);
  border: 1px solid var(--nx-line);
}
.nx-btn-outline:hover { border-color: var(--nx-accent); box-shadow: none; }
.nx-btn-orb {
  display: inline-grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: rgba(7, 11, 20, 0.12);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.nx-btn-outline .nx-btn-orb { background: color-mix(in srgb, var(--nx-accent) 18%, transparent); color: var(--nx-accent-light); }
.nx-btn:hover .nx-btn-orb { transform: rotate(-45deg); }

.nx-card {
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid var(--nx-line);
  transition: border-color 0.35s ease, background-color 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.nx-card:hover {
  border-color: color-mix(in srgb, var(--nx-accent) 55%, transparent);
  background: rgba(255, 255, 255, 0.055);
  transform: translateY(-3px);
}
.nx-card-featured {
  background: linear-gradient(160deg, #FFFFFF 0%, #F6F0E2 100%);
  box-shadow: 0 30px 70px -30px color-mix(in srgb, var(--nx-accent) 60%, transparent);
}

.nx-link { transition: gap 0.3s ease; }
.nx-link:hover { gap: 0.75rem; }
</style>
