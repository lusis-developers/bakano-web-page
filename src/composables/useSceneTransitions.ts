import { useScrollAnimations } from './useScrollAnimations'

/**
 * Transición cinematográfica entre las `.scene` hijas de `rootEl` (mobile y desktop):
 *
 * - La escena que termina se queda fija (pin sin espacio) y retrocede: se aleja,
 *   se inclina apenas, se oscurece y redondea sus bordes.
 * - La siguiente nace como una tarjeta pegada a una esquina inferior de la pantalla
 *   y crece hasta cubrirla, con un leve zoom de cámara que se asienta. La esquina
 *   alterna: derecha, izquierda, derecha…
 *
 * La cortina se calcula en píxeles de la pantalla visible, no en % de la escena:
 * en mobile las escenas miden varias pantallas y un % las dejaría fuera de cuadro.
 *
 * Una escena con un pin propio adentro (`.pin-spacer`, p. ej. el recorrido de
 * pasos en desktop) no se fija ni se transforma: un transform en un ancestro
 * rompería el `position: fixed` de su pin interno. Solo recibe la cortina.
 */
export function useSceneTransitions(rootEl: () => HTMLElement | null | undefined) {
  useScrollAnimations(rootEl, ({ gsap, ScrollTrigger, mm }) => {
    if (navigator.webdriver) return

    mm.add({ desktop: '(min-width: 961px)', mobile: '(max-width: 960px)' }, (ctx) => {
      const mobile = !!ctx.conditions?.mobile
      const scenes = gsap.utils.toArray<HTMLElement>('.scene')
      const ease = gsap.parseEase('power3.inOut')
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      const killers: Array<() => void> = []

      scenes.forEach((scene, i) => {
        gsap.set(scene, { zIndex: i + 1 })

        const next = scenes[i + 1]
        if (!next) return

        // +1: la siguiente nace en la esquina inferior derecha · -1: en la izquierda
        const dir = i % 2 === 0 ? 1 : -1

        // ── 1. La escena actual retrocede mientras la siguiente la cubre
        if (!scene.querySelector('.pin-spacer')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: scene,
                start: 'bottom bottom',
                end: () => `+=${window.innerHeight}`,
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              scene,
              {
                scale: 1,
                xPercent: 0,
                rotation: 0,
                borderRadius: 0,
                '--scene-shade': 0,
                // Escala desde el centro de lo que se ve, no del bloque entero
                transformOrigin: () =>
                  `50% ${100 - (window.innerHeight / 2 / scene.offsetHeight) * 100}%`,
              },
              {
                scale: mobile ? 0.84 : 0.86,
                xPercent: -dir * (mobile ? 8 : 5),
                rotation: -dir * (mobile ? 3 : 1.5),
                borderRadius: mobile ? 28 : 40,
                '--scene-shade': 0.75,
                ease: 'none',
              },
            )
        }

        // ── 2. La siguiente nace en la esquina inferior y crece hasta cubrir todo
        // Tarjeta inicial: ~45% del ancho y ~28% del alto visible, pegada al borde.
        const startW = mobile ? 0.5 : 0.42
        const startH = mobile ? 0.26 : 0.3
        const radius = mobile ? 32 : 48

        const paint = (progress: number) => {
          if (progress >= 1) {
            next.style.clipPath = ''
            return
          }
          const vh = window.innerHeight
          const w = next.offsetWidth
          const e = ease(progress)
          // Borde inferior de la pantalla, en coordenadas de la escena que entra
          const screenBottom = progress * vh
          const cardH = lerp(vh * startH, vh, e)
          const top = Math.max(0, screenBottom - cardH)
          const side = lerp(w * (1 - startW), 0, e)
          const left = dir > 0 ? side : 0
          const right = dir > 0 ? 0 : side
          const r = lerp(radius, 0, e)
          next.style.clipPath = `inset(${top}px ${right}px 0px ${left}px round ${r}px)`
        }

        const curtain = ScrollTrigger.create({
          trigger: next,
          start: 'top bottom',
          end: 'top top',
          onUpdate: (self) => paint(self.progress),
          onRefresh: (self) => paint(self.progress),
        })
        paint(curtain.progress)
        killers.push(() => {
          next.style.clipPath = ''
        })

        // ── 3. Zoom de cámara: el contenido entra un poco cerca y se asienta
        const content = next.firstElementChild as HTMLElement | null
        if (content && !content.querySelector('.pin-spacer')) {
          gsap.fromTo(
            content,
            { scale: mobile ? 1.18 : 1.12, transformOrigin: `${dir > 0 ? 100 : 0}% 0%` },
            {
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: next,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )
        }
      })

      return () => {
        killers.forEach((k) => k())
        gsap.set(scenes, { clearProps: 'zIndex,transform,borderRadius' })
      }
    })
  })
}
