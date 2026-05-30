<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, ChevronRight } from '@lucide/vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Cotizador', href: '#cotizador' },
  { name: 'Proceso', href: '#proceso' },
  { name: 'Preguntas frecuentes', href: '#faq' },
  { name: 'Contacto', href: '#contacto' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleNavClick = (href: string) => {
  closeMenu()
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-[#050D1A]/90 backdrop-blur-xl border-b border-[#1E3A5F]/50 shadow-lg shadow-black/20'
        : 'bg-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">

        <!-- Logo -->
        <a
          href="#inicio"
          @click.prevent="handleNavClick('#inicio')"
          class="flex items-center gap-2 group"
        >
          <div class="relative">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style="background: linear-gradient(135deg, #2563EB, #1D4ED8); box-shadow: 0 0 16px rgba(59,130,246,0.4);">
              D
            </div>
            <div class="absolute inset-0 rounded-lg animate-pulse-slow"
              style="background: rgba(59,130,246,0.2); filter: blur(4px);"></div>
          </div>
          <span class="font-display font-bold text-xl tracking-wide">
            <span class="gradient-text">DASTI</span>
          </span>
        </a>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click.prevent="handleNavClick(link.href)"
            class="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-md transition-colors duration-200 hover:bg-white/5"
          >
            {{ link.name }}
          </a>
        </div>

        <!-- CTA button (desktop) -->
        <div class="hidden lg:block">
          <button
            @click="handleNavClick('#cotizador')"
            class="btn-primary text-sm"
          >
            Cotizar proyecto
            <ChevronRight :size="16" />
          </button>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-label="Abrir menú"
        >
          <X v-if="isMenuOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden border-t border-[#1E3A5F]/50"
        style="background: rgba(5, 13, 26, 0.97); backdrop-filter: blur(20px);"
      >
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click.prevent="handleNavClick(link.href)"
            class="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            {{ link.name }}
          </a>
          <div class="mt-3 pt-3 border-t border-[#1E3A5F]/40">
            <button
              @click="handleNavClick('#cotizador')"
              class="btn-primary w-full justify-center text-sm"
            >
              Cotizar proyecto
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
