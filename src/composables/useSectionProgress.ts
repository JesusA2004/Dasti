import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * Progreso (0 → 1) de un elemento mientras atraviesa el viewport.
 * - start: posición del viewport (0–1) donde comienza (borde superior del elemento).
 * - end:   posición del viewport (0–1) donde termina (borde inferior del elemento).
 * Escucha el scroll sólo cuando el elemento está cerca de la vista y agrupa
 * las lecturas en requestAnimationFrame. Con movimiento reducido devuelve 1.
 */
export function useSectionProgress(target: Ref<HTMLElement | undefined>, start = 0.85, end = 0.35) {
  const progress = ref(0)
  let raf = 0
  let io: IntersectionObserver | null = null
  let listening = false

  const measure = () => {
    raf = 0
    const el = target.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 1
    const total = rect.height + vh * (start - end)
    const value = (vh * start - rect.top) / (total || 1)
    progress.value = Math.min(1, Math.max(0, value))
  }

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(measure)
  }

  const listen = (on: boolean) => {
    if (on === listening) return
    listening = on
    if (on) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
      onScroll()
    } else {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }

  onMounted(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      progress.value = 1
      return
    }
    const el = target.value
    if (!el) return
    io = new IntersectionObserver((entries) => listen(entries.some((e) => e.isIntersecting)), {
      rootMargin: '20% 0px 20% 0px',
    })
    io.observe(el)
    measure()
  })

  onUnmounted(() => {
    io?.disconnect()
    listen(false)
    if (raf) cancelAnimationFrame(raf)
  })

  return progress
}
