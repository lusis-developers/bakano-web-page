import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registro único de plugins para toda la app (idempotente).
gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

/** Llamar una sola vez cuando el loader global termina: recalcula pins con el layout final. */
export function refreshAfterLoad() {
  requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
}

interface ScrollAnimationCtx {
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTrigger
  mm: gsap.MatchMedia
}

/**
 * Ejecuta `setup` dentro de un gsap.context ligado a `scopeEl` y lo revierte al
 * desmontar. Bajo prefers-reduced-motion no crea animaciones y ejecuta
 * `reducedFallback` (si se pasa) para dejar estados finales visibles.
 */
export function useScrollAnimations(
  scopeEl: () => HTMLElement | null | undefined,
  setup: (ctx: ScrollAnimationCtx) => void,
  reducedFallback?: () => void,
) {
  let ctx: gsap.Context | undefined
  let mm: gsap.MatchMedia | undefined

  onMounted(() => {
    const el = scopeEl()
    if (!el) return
    if (prefersReducedMotion()) {
      reducedFallback?.()
      return
    }
    mm = gsap.matchMedia()
    ctx = gsap.context(() => setup({ gsap, ScrollTrigger, mm: mm! }), el)
  })

  onUnmounted(() => {
    ctx?.revert()
    mm?.revert()
  })
}

export { gsap, ScrollTrigger }
