import type { Directive } from 'vue'

/**
 * v-reveal — revelado progresivo al entrar en el viewport.
 *
 *   v-reveal                      → desplazamiento vertical suave
 *   v-reveal="'clip'"             → variante por nombre
 *   v-reveal="{ variant: 'image', delay: 120 }"
 *
 * Usa un único IntersectionObserver compartido, se desconecta tras revelar
 * y respeta prefers-reduced-motion (los estilos viven en style.css).
 */
export type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'clip' | 'image'
export interface RevealOptions {
  variant?: RevealVariant
  delay?: number
}
type RevealValue = RevealVariant | RevealOptions | undefined

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer?.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  )
  return observer
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el, binding) {
    const opts: RevealOptions = typeof binding.value === 'string' ? { variant: binding.value } : binding.value ?? {}
    el.dataset.reveal = opts.variant ?? 'up'
    if (opts.delay) el.style.setProperty('--reveal-delay', `${opts.delay}ms`)

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-revealed')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}
