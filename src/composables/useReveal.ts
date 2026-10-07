import { useScrollAnimations } from './useScrollAnimations'

interface RevealOptions {
  /** Lado desde el que llega la sección. Las secciones alternan para dar sensación de recorrido. */
  from?: 'left' | 'right'
}

/**
 * Entrada de sección en dos capas:
 * 1. `[data-drift]`: el contenedor se desliza en horizontal atado al scroll (efecto cámara).
 * 2. `[data-reveal]`: cada elemento llega desde el mismo lado, uno tras otro, y se asienta.
 *
 * Usa `from`, así el estado por defecto (CSS) siempre es visible: con reduced-motion,
 * o en el snapshot del prerender (navigator.webdriver), el contenido queda tal cual.
 */
export function useReveal(
  scopeEl: () => HTMLElement | null | undefined,
  { from = 'right' }: RevealOptions = {},
) {
  const dir = from === 'right' ? 1 : -1

  useScrollAnimations(scopeEl, ({ gsap, ScrollTrigger, mm }) => {
    if (navigator.webdriver) return

    mm.add({ desktop: '(min-width: 769px)', mobile: '(max-width: 768px)' }, (ctx) => {
      const desktop = !!ctx.conditions?.desktop
      const scope = scopeEl()!

      // 1. Cámara: el bloque entra corrido hacia su lado y se centra al llegar
      const drift = scope.querySelector<HTMLElement>('[data-drift]')
      if (drift) {
        gsap.fromTo(
          drift,
          { xPercent: dir * (desktop ? 8 : 4) },
          {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: scope,
              start: 'top bottom',
              end: 'top 25%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        )
      }

      // 2. Elementos: llegan desde el mismo lado, escalonados
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      gsap.set(items, { x: dir * (desktop ? 90 : 40), opacity: 0 })

      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: true,
          }),
      })
    })
  })
}
