import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Escribe la posición del puntero relativa al elemento como variables CSS
 * (--px y --py, de -0.5 a 0.5) sin provocar renders de Vue.
 * Sólo se activa con punteros finos (mouse/trackpad) y sin movimiento reducido.
 */
export function usePointerVars(target: Ref<HTMLElement | undefined>) {
  let raf = 0
  let nx = 0
  let ny = 0
  let enabled = false

  const apply = () => {
    raf = 0
    const el = target.value
    if (!el) return
    el.style.setProperty('--px', nx.toFixed(4))
    el.style.setProperty('--py', ny.toFixed(4))
  }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const el = target.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    nx = (e.clientX - rect.left) / rect.width - 0.5
    ny = (e.clientY - rect.top) / rect.height - 0.5
    if (!raf) raf = requestAnimationFrame(apply)
  }

  const onLeave = () => {
    nx = 0
    ny = 0
    if (!raf) raf = requestAnimationFrame(apply)
  }

  onMounted(() => {
    const fine = window.matchMedia?.('(pointer: fine)').matches
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const el = target.value
    if (!el || !fine || reduced) return
    enabled = true
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave, { passive: true })
  })

  onUnmounted(() => {
    const el = target.value
    if (raf) cancelAnimationFrame(raf)
    if (!el || !enabled) return
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
  })
}
