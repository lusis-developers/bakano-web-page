<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/composables/useScrollAnimations'
import { testimonials } from '@/data/testimonials'
import TestimonialQuote from './testimonials/TestimonialQuote.vue'
import TestimonialsHeading from './testimonials/TestimonialsHeading.vue'

const bgVideo = 'https://res.cloudinary.com/dpimsaaa4/video/upload/v1772741965/IMG_9668_tmxlid.mp4'

const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const activeQuote = ref(-1)

let ctx: gsap.Context | null = null

onMounted(() => {
  const video = videoRef.value
  const section = sectionRef.value
  if (!video || !section) return

  if (prefersReducedMotion()) {
    activeQuote.value = 0
    return
  }

  video.pause()
  video.currentTime = 0

  const header = headerRef.value
  if (!header) return

  const videoProxy = { currentTime: 0 }
  const scrubVideo = {
    currentTime: () => video.duration || 0,
    ease: 'none' as const,
    onUpdate() { video.currentTime = videoProxy.currentTime },
  }

  // Un solo enfoque para TODOS los viewports: cine de citas secuenciales
  // sobre el video scrubbed (el rail horizontal en mobile se retiró).
  ctx = gsap.context(() => {
    const quotes = Array.from(section.querySelectorAll<HTMLElement>('.tq'))
    const N = quotes.length

    const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            refreshPriority: 2,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const p = (self.progress - 0.14) / 0.84
              const idx = p < 0 ? -1 : Math.min(N - 1, Math.floor(p * N))
              if (idx !== activeQuote.value) activeQuote.value = idx
            },
          },
        })

        tl.fromTo(videoProxy, { currentTime: 0 }, { ...scrubVideo, duration: 1 }, 0)
        tl.fromTo(video, { scale: 1.08 }, { scale: 1, ease: 'none', duration: 1 }, 0)

        tl.fromTo(header,
          { y: '26vh', scale: 1.0 },
          { y: 0, scale: 0.62, ease: 'power2.out', duration: 0.13 },
          0,
        )

        // Crossfade exacto: la salida de n y la entrada de n+1 comparten el
        // mismo tramo del scrub — nunca hay pantalla vacía ni doble texto raro.
        const SLOT = 0.84 / N
        quotes.forEach((q, n) => {
          const t0 = 0.14 + n * SLOT
          const tIn = n === 0 ? t0 : t0 - SLOT * 0.15
          const parts = [
            q.querySelector('.tq__mark'),
            q.querySelector('.tq__quote'),
            q.querySelector('.tq__meta'),
          ].filter(Boolean)

          tl.fromTo(q,
            { opacity: 0, y: 34 },
            { opacity: 1, y: 0, duration: SLOT * 0.3, ease: 'power2.out' },
            tIn,
          )
          tl.fromTo(parts,
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, stagger: SLOT * 0.02, duration: SLOT * 0.26, ease: 'power2.out' },
            tIn + SLOT * 0.03,
          )

          if (n < N - 1) {
            tl.to(q, { opacity: 0, y: -34, duration: SLOT * 0.3, ease: 'power2.in' }, t0 + SLOT * 0.85)
          }
        })
  }, section)

  // MOBILE-FIRST: en móvil `loadedmetadata` puede no disparar sin interacción.
  // El scrub usa `() => video.duration`; al llegar metadatos, refresh lo acopla.
  if (video.readyState < 1) {
    video.load()
    video.addEventListener('loadedmetadata', () => ScrollTrigger.refresh(), { once: true })
  }
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <!-- 550vh: sticky + video scrubbed; las citas reales desfilan una a una -->
  <section class="testimonials" ref="sectionRef">
    <div class="testimonials__sticky">

      <video ref="videoRef" class="testimonials__video" muted playsinline preload="auto">
        <source :src="bgVideo" type="video/mp4" />
      </video>

      <div class="testimonials__gradient" aria-hidden="true" />

      <div class="testimonials__ui">

        <header class="testimonials__header" ref="headerRef">
          <TestimonialsHeading />
        </header>

        <!-- Citas secuenciales (todos los viewports) -->
        <div class="testimonials__stage" aria-live="polite">
          <TestimonialQuote
            v-for="(t, i) in testimonials"
            :key="t.id"
            :testimonial="t"
            :active="activeQuote === i"
          />
        </div>

        <!-- Rail de progreso -->
        <div class="testimonials__dots" aria-hidden="true">
          <span
            v-for="(t, i) in testimonials"
            :key="t.id"
            class="testimonials__dot"
            :class="{ 'is-on': activeQuote >= i }"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../styles/colorVariables.module.scss' as colors;

.testimonials {
  position: relative;
  height: 550vh;

  &__sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: clip;
    background-color: #000;
  }

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.55;
    will-change: transform;
  }

  &__gradient {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(175deg,
        rgba(colors.$BAKANO-DARK, 0.2) 0%,
        rgba(#000, 0.82) 100%);
  }

  &__ui {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 64px 24px 24px;
  }

  &__header {
    width: 100%;
    max-width: 900px;
    flex-shrink: 0;
    transform-origin: center top;
  }

  &__stage {
    position: relative;
    flex: 1;
    width: 100%;
    max-width: 1000px;
    perspective: 900px;
  }

  &__dots {
    position: absolute;
    right: clamp(20px, 4vw, 56px);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 3;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.18);
    transition: background 0.35s ease, transform 0.35s ease;

    &.is-on {
      background: colors.$BAKANO-PINK;
      transform: scale(1.25);
    }
  }

}

@media (max-width: 768px) {
  .testimonials__ui {
    padding: 72px 16px 20px;
  }

  // Dots al borde, más discretos, para no pisar el texto de la cita
  .testimonials__dots {
    right: 10px;
    gap: 9px;
  }

  .testimonials__dot {
    width: 6px;
    height: 6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonials {
    height: auto;
  }

  .testimonials__sticky {
    position: static;
    height: auto;
    overflow: visible;
  }

  .testimonials__ui {
    position: relative;
    padding: 80px 24px;
    gap: 32px;
  }

  .testimonials__stage {
    display: flex;
    flex-direction: column;
    gap: 48px;
    perspective: none;

    :deep(.tq) {
      position: static;
      opacity: 1;
      pointer-events: auto;
    }
  }

  .testimonials__dots {
    display: none;
  }
}
</style>
