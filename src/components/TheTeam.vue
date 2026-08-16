<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap, prefersReducedMotion } from '@/composables/useScrollAnimations'
import { teamMembers } from '@/data/team'
import TeamPanel from './team/TeamPanel.vue'
import TeamIntro from './team/TeamIntro.vue'

// ── Refs ─────────────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null)
const pinRef     = ref<HTMLElement | null>(null)
const trackRef   = ref<HTMLElement | null>(null)

// ── GSAP ──────────────────────────────────────────────────────────────────────
let ctx: gsap.Context | null = null

onMounted(() => {
  const section = sectionRef.value
  const pin     = pinRef.value
  const track   = trackRef.value
  if (!section || !pin || !track) return

  // Reduced motion: el pin horizontal se mantiene (da acceso al contenido,
  // lo controla el scroll del usuario) pero sin entradas ni zoom de fotos.
  const reduced = prefersReducedMotion()

  ctx = gsap.context(() => {

    // ── 1. Intro: fade in al entrar en viewport (mobile + desktop) ────────────
    if (!reduced) {
      gsap.from('.team__intro-content > *', {
        y: 48,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
        },
      })
    }

    // ── 2 + 3. Scroll horizontal con GSAP (mobile + desktop) ─────────────────
    // GSAP pega `pinRef` al viewport y desplaza `trackRef` horizontalmente.
    // En mobile: los paneles tienen layout apilado (foto arriba, info abajo)
    // y el track sigue siendo una fila horizontal de 100vw × 100svh.
    const hTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        pin: true,
        scrub: 1,
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        refreshPriority: 1,
      },
    })

    const panels = track.querySelectorAll<HTMLElement>('.team__panel')

    if (reduced) return

    // Efectos comunes (foto/glow/número) + info por breakpoint:
    // desktop = slide lateral (paneles anchos, el texto entra a su tiempo);
    // mobile = crossfade scrubbed (paneles 100vw: solo el panel dominante
    // muestra su texto — sin bloques cortados en plena transición).
    const buildPanelFX = (mobile: boolean) => {
      panels.forEach((panel) => {
        const frame   = panel.querySelector<HTMLElement>('.team__panel-photo-frame')
        const photo   = panel.querySelector<HTMLElement>('.team__panel-photo')
        const glow    = panel.querySelector<HTMLElement>('.team__panel-photo-glow')
        const bgNum   = panel.querySelector<HTMLElement>('.team__panel-bg-num')
        const divider = panel.querySelector<HTMLElement>('.team__panel-divider')
        const info    = panel.querySelector<HTMLElement>('.team__panel-info')
        const infoEls = panel.querySelectorAll<HTMLElement>(
          '.team__panel-eyebrow, .team__panel-name, .team__panel-role, .team__panel-bio, .team__panel-cta'
        )

        const inTrack = (start: string, end?: string) => ({
          trigger: panel,
          containerAnimation: hTween,
          start,
          end,
          scrub: true as const,
        })

        // Wipe de revelado + settle de cámara de la foto
        if (frame) {
          gsap.fromTo(frame,
            { clipPath: 'inset(0 72% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', ease: 'none', scrollTrigger: inTrack('left right', 'left 35%') }
          )
        }
        if (photo) {
          gsap.fromTo(photo,
            { scale: 1.18, xPercent: 6 },
            { scale: 1, xPercent: 0, ease: 'none', scrollTrigger: inTrack('left right', 'left left') }
          )
        }
        if (glow) {
          gsap.fromTo(glow, { opacity: 0 },
            { opacity: 1, ease: 'none', scrollTrigger: inTrack('left 70%', 'left 20%') }
          )
        }
        if (bgNum) {
          gsap.fromTo(bgNum,
            { xPercent: 24, opacity: 0.4 },
            { xPercent: -24, opacity: 1, ease: 'none', scrollTrigger: inTrack('left right', 'right left') }
          )
        }

        if (mobile && info) {
          // Crossfade del bloque de texto ligado al track
          gsap.set(divider, { scaleX: 1 })
          gsap.fromTo(info,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, ease: 'none', scrollTrigger: inTrack('left 60%', 'left 22%') }
          )
          gsap.to(info,
            { opacity: 0, y: -16, ease: 'none', scrollTrigger: inTrack('right 62%', 'right 28%') }
          )
        } else {
          if (divider) {
            gsap.fromTo(divider,
              { scaleX: 0, transformOrigin: 'left center' },
              {
                scaleX: 1, duration: 0.7, ease: 'power2.out',
                scrollTrigger: { trigger: panel, containerAnimation: hTween, start: 'left 60%', once: true },
              }
            )
          }
          if (infoEls.length) {
            gsap.from(infoEls, {
              x: 60, opacity: 0, stagger: 0.09, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: panel, containerAnimation: hTween, start: 'left 65%', once: true },
            })
          }
        }
      })
    }

    const mm = gsap.matchMedia()
    mm.add('(max-width: 768px)', () => buildPanelFX(true))
    mm.add('(min-width: 769px)', () => buildPanelFX(false))

  }, section)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section class="team" ref="sectionRef">

    <!-- ════════════════════════════════════════════════
         INTRO  — scroll vertical normal
         ════════════════════════════════════════════════ -->
    <TeamIntro />

    <!-- ════════════════════════════════════════════════
         PIN WRAPPER — este elemento queda fijo mientras
         se desplaza el track horizontalmente
         ════════════════════════════════════════════════ -->
    <div class="team__pin" ref="pinRef">
      <div class="team__track" ref="trackRef">

        <TeamPanel v-for="member in teamMembers" :key="member.id" :member="member" />

      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

// ─────────────────────────────────────────────────────────────────────────────
// Variables locales
// ─────────────────────────────────────────────────────────────────────────────
$panel-bg:     #0b0815;
$glass-border: rgba(255, 255, 255, 0.07);

// ─────────────────────────────────────────────────────────────────────────────
// Sección raíz
// ─────────────────────────────────────────────────────────────────────────────
.team {
  // Translúcido: deja pasar el video-hilo global del homepage
  background-color: rgba(11, 8, 21, 0.8);
  position: relative;
}

// Estilos de intro → team/TeamIntro.vue

// ─────────────────────────────────────────────────────────────────────────────
// PIN WRAPPER — GSAP lo fija al viewport durante el scroll horizontal
// ─────────────────────────────────────────────────────────────────────────────
.team__pin {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

// ─────────────────────────────────────────────────────────────────────────────
// TRACK — flex row; GSAP anima su `x` para el scroll horizontal
// ─────────────────────────────────────────────────────────────────────────────
.team__track {
  display: flex;
  height: 100%;
  width: max-content;
  will-change: transform;
}

// Estilos de panel → team/TeamPanel.vue


// ─────────────────────────────────────────────────────────────────────────────
// MOBILE — scroll horizontal CSS (sin GSAP pin)
// El .team__pin se convierte en un contenedor scrolleable horizontal con
// scroll-snap. Cada panel ocupa 100vw × 100svh y apila foto arriba / info abajo.
// svh (small viewport height) evita el salto de la barra URL en iOS/Android.
// ─────────────────────────────────────────────────────────────────────────────
@media (max-width: 768px) {
  // GSAP controla el movimiento: solo necesitamos overflow:hidden para clijar
  .team__pin {
    height: 100svh;
    overflow: hidden;
  }

  // El track sigue siendo una fila horizontal; GSAP lo translateX
  .team__track {
    flex-direction: row;
    width: max-content;
    height: 100%;
  }

  // Ajustes de panel en mobile → team/TeamPanel.vue
}
</style>
