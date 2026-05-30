<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, X, ChevronRight } from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Cotizador', href: '/cotizador' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
]

const isActive = (href: string) =>
  href === '/' ? route.path === '/' : route.path.startsWith(href)

const handleScroll = () => { isScrolled.value = window.scrollY > 20 }
const closeMenu = () => { isMenuOpen.value = false }
const navigate = (href: string) => { closeMenu(); router.push(href) }

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :style="isScrolled
      ? 'background: rgba(var(--bg-base, 5 13 26) / 0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);'
      : 'background: transparent;'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2.5 group">
          <div class="relative">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold font-display text-base"
              style="background: linear-gradient(135deg, var(--accent-light), var(--accent)); box-shadow: 0 0 16px var(--accent-glow);"
            >
              D
            </div>
            <div class="absolute inset-0 rounded-xl animate-pulse-slow"
              style="background: var(--accent-glow-sm); filter: blur(4px);"></div>
          </div>
          <span class="font-display font-bold text-xl tracking-wide gradient-text">DASTI</span>
        </RouterLink>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-0.5">
          <button
            v-for="link in navLinks"
            :key="link.href"
            @click="navigate(link.href)"
            class="px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative"
            :style="isActive(link.href)
              ? 'color: var(--text-primary); background: var(--accent-glow-sm); border: 1px solid var(--border-subtle);'
              : 'color: var(--text-secondary); border: 1px solid transparent;'"
          >
            {{ link.name }}
            <!-- Active underline -->
            <div
              v-if="isActive(link.href)"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
              style="background: var(--accent-light);"
            />
          </button>
        </div>

        <!-- CTA (desktop) -->
        <div class="hidden lg:block">
          <button @click="navigate('/cotizador')" class="btn-primary text-sm">
            Cotizar solución
            <ChevronRight :size="15" />
          </button>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="lg:hidden p-2 rounded-xl transition-colors"
          style="color: var(--text-secondary); border: 1px solid var(--border-subtle);"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-label="Abrir menú"
        >
          <X v-if="isMenuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-280 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden"
        style="background: var(--bg-elevated); backdrop-filter: blur(20px); border-top: 1px solid var(--border-subtle);"
      >
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          <button
            v-for="link in navLinks"
            :key="link.href"
            @click="navigate(link.href)"
            class="px-4 py-3 text-sm font-medium rounded-xl transition-all text-left"
            :style="isActive(link.href)
              ? 'color: var(--text-primary); background: var(--accent-glow-sm); border: 1px solid var(--border-subtle);'
              : 'color: var(--text-secondary); border: 1px solid transparent;'"
          >
            {{ link.name }}
          </button>
          <div class="mt-3 pt-3" style="border-top: 1px solid var(--border-subtle);">
            <button @click="navigate('/cotizador')" class="btn-primary w-full justify-center text-sm">
              Cotizar solución
              <ChevronRight :size="15" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
