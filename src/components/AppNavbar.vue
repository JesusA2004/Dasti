<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { ArrowUpRight, ChevronDown, Menu, X } from '@lucide/vue'
import ThemeSelector from '@/components/ThemeSelector.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { mainNav, quoterCta, type NavItem } from '@/data/navigation'
import { buildWhatsAppUrl } from '@/config/contact'

const route = useRoute()

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)
const mobileExpanded = ref<string | null>(null)

const navRef = ref<HTMLElement>()
const progressRef = ref<HTMLElement>()
const closeBtnRef = ref<HTMLButtonElement>()
const menuBtnRef = ref<HTMLButtonElement>()
const triggerRefs = new Map<string, HTMLButtonElement>()

const whatsappUrl = buildWhatsAppUrl('Hola, me interesa recibir asesoría de DASTI para una solución en TI.')

const isActive = (href: string) => (href === '/' ? route.path === '/' : route.path === href || route.path.startsWith(`${href}/`))
const isItemActive = (item: NavItem) =>
  isActive(item.href) || !!item.children?.some((c) => isActive(c.href))

/* ── Scroll: estado compacto + barra de progreso (sin renders por frame) ── */
let raf = 0
const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const y = window.scrollY
    isScrolled.value = y > 24
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (progressRef.value) progressRef.value.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
  })
}

/* ── Dropdowns: clic, teclado y hover (sólo con mouse) ── */
let hoverTimer = 0
const setTrigger = (name: string) => (el: unknown) => {
  if (el instanceof HTMLButtonElement) triggerRefs.set(name, el)
}
const toggleDropdown = (name: string) => {
  openDropdown.value = openDropdown.value === name ? null : name
}
const onItemPointerEnter = (e: PointerEvent, name: string) => {
  if (e.pointerType !== 'mouse') return
  window.clearTimeout(hoverTimer)
  openDropdown.value = name
}
const onItemPointerLeave = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  window.clearTimeout(hoverTimer)
  hoverTimer = window.setTimeout(() => (openDropdown.value = null), 160)
}
const onDropdownKeydown = (e: KeyboardEvent, name: string) => {
  if (e.key === 'Escape') {
    openDropdown.value = null
    triggerRefs.get(name)?.focus()
  }
}
onClickOutside(navRef, () => (openDropdown.value = null))

/* ── Menú móvil ── */
const openMenu = async () => {
  isMenuOpen.value = true
  await nextTick()
  closeBtnRef.value?.focus()
}
const closeMenu = (restoreFocus = false) => {
  isMenuOpen.value = false
  mobileExpanded.value = null
  if (restoreFocus) menuBtnRef.value?.focus()
}
watch(isMenuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  if (isMenuOpen.value) closeMenu(true)
  openDropdown.value = null
}

watch(
  () => route.fullPath,
  () => {
    openDropdown.value = null
    if (isMenuOpen.value) closeMenu()
  },
)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  window.clearTimeout(hoverTimer)
  if (raf) cancelAnimationFrame(raf)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-50">
    <!-- Progreso de lectura -->
    <div
      ref="progressRef"
      class="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
      style="transform: scaleX(0);"
      aria-hidden="true"
    />

    <div
      ref="navRef"
      class="shell flex items-center justify-between gap-3 transition-[padding] duration-500"
      :class="isScrolled ? 'pt-2.5' : 'pt-3 sm:pt-4'"
    >
      <!-- Marca -->
      <RouterLink
        to="/"
        class="glass-light pointer-events-auto flex h-14 shrink-0 items-center gap-2 rounded-full pl-2.5 pr-4 transition-shadow duration-500"
        :class="isScrolled ? 'shadow-[var(--shadow-float)]' : 'shadow-[var(--shadow-soft)]'"
        aria-label="DASTI — Ir al inicio"
      >
        <img src="/img/favicon.png" alt="" class="h-9 w-9 object-contain" width="36" height="36" />
        <img
          src="/img/logo.png"
          alt="DASTI - Soluciones en Tecnologías de la Información"
          class="h-[22px] w-auto object-contain max-[359px]:hidden"
          height="22"
        />
      </RouterLink>

      <!-- Navegación de escritorio -->
      <nav
        class="glass pointer-events-auto hidden items-center gap-0.5 rounded-full p-1.5 transition-shadow duration-500 lg:flex"
        :class="isScrolled ? 'shadow-[var(--shadow-float)]' : 'shadow-[var(--shadow-soft)]'"
        aria-label="Navegación principal"
      >
        <template v-for="item in mainNav" :key="item.name">
          <!-- Enlace simple -->
          <RouterLink
            v-if="!item.children"
            :to="item.href"
            class="relative rounded-full px-3.5 py-2.5 text-[0.86rem] font-medium transition-colors duration-300 xl:px-4"
            :class="[
              isItemActive(item) ? 'bg-ink text-on-ink' : 'text-fg-2 hover:bg-paper-2 hover:text-fg',
              item.href === '/' ? 'hidden xl:block' : '',
            ]"
            :aria-current="isItemActive(item) ? 'page' : undefined"
          >
            {{ item.name }}
          </RouterLink>

          <!-- Con desplegable -->
          <div
            v-else
            class="relative"
            @pointerenter="onItemPointerEnter($event, item.name)"
            @pointerleave="onItemPointerLeave"
            @keydown="onDropdownKeydown($event, item.name)"
          >
            <button
              :ref="setTrigger(item.name)"
              type="button"
              class="flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[0.86rem] font-medium transition-colors duration-300 xl:px-4"
              :class="
                isItemActive(item) || openDropdown === item.name
                  ? isItemActive(item)
                    ? 'bg-ink text-on-ink'
                    : 'bg-paper-2 text-fg'
                  : 'text-fg-2 hover:bg-paper-2 hover:text-fg'
              "
              :aria-expanded="openDropdown === item.name"
              :aria-controls="`nav-panel-${item.name}`"
              @click="toggleDropdown(item.name)"
            >
              {{ item.name }}
              <ChevronDown
                :size="14"
                class="transition-transform duration-300"
                :class="openDropdown === item.name ? 'rotate-180' : ''"
              />
            </button>

            <Transition
              enter-active-class="transition duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
              enter-from-class="opacity-0 -translate-y-2 scale-[0.98]"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-show="openDropdown === item.name"
                :id="`nav-panel-${item.name}`"
                class="absolute left-1/2 top-full w-[360px] -translate-x-1/2 pt-3"
              >
                <div class="overflow-hidden rounded-[26px] border border-line bg-surface p-2 shadow-[var(--shadow-deep)]">
                  <RouterLink
                    v-for="child in item.children"
                    :key="child.href + child.name"
                    :to="child.href"
                    class="group flex items-start justify-between gap-4 rounded-[20px] p-4 transition-colors duration-300 hover:bg-paper"
                  >
                    <span>
                      <span class="flex items-center gap-2 text-[0.95rem] font-semibold text-fg">
                        {{ child.name }}
                        <span
                          v-if="child.badge"
                          class="rounded-full bg-accent-soft px-2 py-0.5 text-[0.66rem] font-semibold uppercase tracking-wider text-accent"
                        >
                          {{ child.badge }}
                        </span>
                      </span>
                      <span class="mt-1 block text-[0.82rem] leading-snug text-fg-3">{{ child.description }}</span>
                    </span>
                    <ArrowUpRight
                      :size="16"
                      class="mt-1 shrink-0 text-fg-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>
        </template>
      </nav>

      <!-- Acciones -->
      <div class="pointer-events-auto flex items-center gap-2">
        <ThemeSelector class="hidden sm:inline-grid" />
        <RouterLink :to="quoterCta.href" class="btn btn-accent btn-sm hidden lg:inline-flex">
          Cotizar
          <span class="btn-orb"><ArrowUpRight :size="15" /></span>
        </RouterLink>
        <button
          ref="menuBtnRef"
          type="button"
          class="icon-btn glass h-14 w-14 !border-line shadow-[var(--shadow-soft)] lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
          @click="openMenu"
        >
          <Menu :size="20" />
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <Transition
      enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="opacity-0 [clip-path:inset(0_0_100%_0_round_0_0_40px_40px)]"
      enter-to-class="opacity-100 [clip-path:inset(0_0_0_0_round_0)]"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="pointer-events-auto fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div class="shell flex items-center justify-between pt-3 sm:pt-4">
          <RouterLink to="/" class="glass-light flex h-14 items-center gap-2 rounded-full pl-2.5 pr-4" aria-label="DASTI — Ir al inicio">
            <img src="/img/favicon.png" alt="" class="h-9 w-9 object-contain" width="36" height="36" />
            <img src="/img/logo.png" alt="DASTI" class="h-[22px] w-auto object-contain max-[359px]:hidden" height="22" />
          </RouterLink>
          <button
            ref="closeBtnRef"
            type="button"
            class="icon-btn h-14 w-14"
            aria-label="Cerrar menú"
            @click="closeMenu(true)"
          >
            <X :size="20" />
          </button>
        </div>

        <nav class="shell mt-8 flex-1" aria-label="Navegación móvil">
          <ul class="border-t border-line">
            <li
              v-for="(item, i) in mainNav"
              :key="item.name"
              class="animate-rise border-b border-line"
              :style="{ '--d': `${80 + i * 45}ms` }"
            >
              <RouterLink
                v-if="!item.children"
                :to="item.href"
                class="flex items-center justify-between py-4 text-[1.65rem] font-semibold tracking-tight"
                :class="isItemActive(item) ? 'text-accent' : 'text-fg'"
                :aria-current="isItemActive(item) ? 'page' : undefined"
              >
                {{ item.name }}
                <ArrowUpRight :size="20" class="text-fg-3" />
              </RouterLink>
              <template v-else>
                <button
                  type="button"
                  class="flex w-full items-center justify-between py-4 text-left text-[1.65rem] font-semibold tracking-tight"
                  :class="isItemActive(item) ? 'text-accent' : 'text-fg'"
                  :aria-expanded="mobileExpanded === item.name"
                  :aria-controls="`m-sub-${item.name}`"
                  @click="mobileExpanded = mobileExpanded === item.name ? null : item.name"
                >
                  {{ item.name }}
                  <ChevronDown
                    :size="22"
                    class="text-fg-3 transition-transform duration-300"
                    :class="mobileExpanded === item.name ? 'rotate-180' : ''"
                  />
                </button>
                <div
                  :id="`m-sub-${item.name}`"
                  class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  :style="{ gridTemplateRows: mobileExpanded === item.name ? '1fr' : '0fr' }"
                >
                  <div class="overflow-hidden">
                    <div class="flex flex-col gap-2 pb-5">
                      <RouterLink
                        v-for="child in item.children"
                        :key="child.href + child.name"
                        :to="child.href"
                        :tabindex="mobileExpanded === item.name ? 0 : -1"
                        class="rounded-2xl border border-line bg-surface p-4"
                      >
                        <span class="flex items-center gap-2 font-semibold text-fg">
                          {{ child.name }}
                          <span
                            v-if="child.badge"
                            class="rounded-full bg-accent-soft px-2 py-0.5 text-[0.66rem] font-semibold uppercase tracking-wider text-accent"
                          >
                            {{ child.badge }}
                          </span>
                        </span>
                        <span class="mt-1 block text-sm text-fg-3">{{ child.description }}</span>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </template>
            </li>
          </ul>
        </nav>

        <div class="shell animate-rise pb-8 pt-8" style="--d: 420ms">
          <div class="flex flex-col gap-3 sm:flex-row">
            <RouterLink :to="quoterCta.href" class="btn btn-accent btn-block sm:flex-1">
              {{ quoterCta.name }}
              <span class="btn-orb"><ArrowUpRight :size="16" /></span>
            </RouterLink>
            <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-line btn-block sm:flex-1">
              WhatsApp DASTI
              <span class="btn-orb text-[#128C4A]"><WhatsAppIcon :size="16" /></span>
            </a>
          </div>
          <div class="mt-6 flex items-center justify-between text-sm text-fg-3">
            <span>Tema de color</span>
            <ThemeSelector variant="plain" />
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
