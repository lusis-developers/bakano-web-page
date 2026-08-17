<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useContactModal } from '@/composables/useContactModal'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/composables/useScrollAnimations'
import { storyChapters } from '@/data/story'
import StoryChapter from './story/StoryChapter.vue'
import StoryScrollHint from './story/StoryScrollHint.vue'

import ch1 from '@/assets/story/ch1.webp'
import ch2 from '@/assets/story/ch2.webp'
import ch3 from '@/assets/story/ch3.webp'
import ch4 from '@/assets/story/ch4.webp'
import ch5 from '@/assets/story/ch5.webp'
import ch6 from '@/assets/story/ch6.webp'

const JOURNEY_VIDEO = '/videos/story-journey.mp4'
const STORY_VIDEO = '/videos/story-final.mp4'
const STORY_VIDEO_FALLBACK = '/videos/hero-remix.mp4'

const chImgs = [ch1, ch2, ch3, ch4, ch5, ch6]

const sectionRef = ref<HTMLElement | null>(null)
const journeyVideo = ref<HTMLVideoElement | null>(null)
const finaleVideo = ref<HTMLVideoElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)

const reduced = ref(false)
const activeCh = ref(0)
const videoSrc = ref<string | null>(null)
const showHint = ref(true)

const { open: openContactModal } = useContactModal()

const onVideoError = () => {
  if (videoSrc.value !== STORY_VIDEO_FALLBACK) videoSrc.value = STORY_VIDEO_FALLBACK
}

watch(activeCh, (ch) => {
  if (ch >= 4 && !videoSrc.value) videoSrc.value = STORY_VIDEO
  if (ch === 5) finaleVideo.value?.play().catch(() => {})
})

let ctx: gsap.Context | null = null

onMounted(() => {
  const section = sectionRef.value
  if (!section) return

  if (prefersReducedMotion()) {
    reduced.value = true
    return
  }

  const journey = journeyVideo.value
  const wantsJourney = !!journey

  const build = (withJourney: boolean) => {
    ctx = gsap.context(() => {
      const imgs = Array.from(section.querySelectorAll<HTMLElement>('.story__img'))
      const chapterEls = Array.from(section.querySelectorAll<HTMLElement>('.story__chapter'))
      const N = chapterEls.length

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const idx = Math.min(N - 1, Math.floor(self.progress * N))
            if (idx !== activeCh.value) activeCh.value = idx
            showHint.value = self.progress < 0.02
          },
        },
      })

      if (withJourney && journey) {
        // ── El camino: un solo video continuo cuya línea de tiempo ES el scroll
        journey.pause()
        journey.currentTime = 0
        gsap.set(journey, { opacity: 1 })
        gsap.set(imgs, { opacity: 0 })

        const proxy = { t: 0 }
        tl.fromTo(proxy,
          { t: 0 },
          {
            t: () => journey.duration || 0,
            duration: N,
            ease: 'none',
            onUpdate() { journey.currentTime = proxy.t },
          },
          0
        )
      }

      chapterEls.forEach((chapterEl, n) => {
        const t = n // el capítulo n es dueño del rango [n, n+1] del timeline

        if (!withJourney) {
          if (n > 0) {
            tl.to(imgs[n], { opacity: 1, duration: 0.35 }, t - 0.15)
            tl.to(imgs[n - 1], { opacity: 0, duration: 0.35 }, t - 0.15)
          }
          tl.fromTo(imgs[n], { scale: 1.08 }, { scale: 1, duration: 1.15 }, Math.max(0, t - 0.15))
        }

        const parts = [
          chapterEl.querySelector('.story__eyebrow'),
          chapterEl.querySelector('.story__title'),
          chapterEl.querySelector('.story__para'),
          ...chapterEl.querySelectorAll('.story__chips li'),
          ...chapterEl.querySelectorAll('.story__stat'),
          chapterEl.querySelector('.story__cta'),
        ].filter(Boolean)

        tl.to(chapterEl, { opacity: 1, duration: 0.15 }, t + 0.05)
        tl.fromTo(parts,
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.045, duration: 0.22, ease: 'power2.out' },
          t + 0.05
        )

        // Salida (el capítulo final se queda en pantalla)
        if (n < N - 1) {
          tl.to(chapterEl, { y: -36, opacity: 0, duration: 0.18, ease: 'power2.in' }, t + 0.8)
        }
      })

      if (!withJourney && finaleVideo.value) {
        tl.to(finaleVideo.value, { opacity: 1, duration: 0.3 }, N - 0.75)
      }

      if (progressBar.value) {
        gsap.to(progressBar.value, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
      }
    }, section)
  }

  if (wantsJourney && journey) {
    // Montaje inmediato; refresh acopla la duración al llegar metadatos.
    build(true)
    if (journey.readyState < 1) {
      journey.load()
      journey.addEventListener('loadedmetadata', () => ScrollTrigger.refresh(), { once: true })
    }
    // Si el video falla, al menos la imagen del capítulo activo queda visible
    journey.addEventListener('error', () => {
      gsap.set(journey, { opacity: 0 })
      const imgs = section.querySelectorAll<HTMLElement>('.story__img')
      const show = () => gsap.set(imgs[Math.min(activeCh.value, imgs.length - 1)], { opacity: 1 })
      show()
      watch(activeCh, () => { gsap.set(imgs, { opacity: 0 }); show() })
    }, { once: true })
  } else {
    build(false)
  }
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section class="story" ref="sectionRef" :class="{ 'story--static': reduced }">
    <div class="story__sticky">

      <!-- Escenario visual (secuencia Higgsfield) -->
      <div class="story__stage" aria-hidden="true">
        <img
          v-for="(img, i) in chImgs"
          :key="i"
          :src="img"
          alt=""
          class="story__img"
          :fetchpriority="i === 0 ? 'high' : undefined"
          :decoding="i === 0 ? undefined : 'async'"
        />

        <!-- El camino: video continuo scrubbed por el scroll -->
        <video
          ref="journeyVideo"
          class="story__video story__video--journey"
          :src="JOURNEY_VIDEO"
          muted
          playsinline
          preload="auto"
        ></video>

        <!-- Finale del modo imágenes; siempre en DOM (el timeline lo referencia) -->
        <video
          ref="finaleVideo"
          class="story__video"
          :src="videoSrc || undefined"
          muted
          loop
          playsinline
          preload="auto"
          @error="onVideoError"
        ></video>
        <div class="story__vignette"></div>
      </div>

      <!-- Capítulos -->
      <StoryChapter
        v-for="(ch, i) in storyChapters"
        :key="i"
        :chapter="ch"
        :is-final="i === storyChapters.length - 1"
        :active="activeCh === i"
        @cta="openContactModal"
      />

      <!-- Invitación clara a iniciar la experiencia -->
      <Transition name="hint-fade">
        <StoryScrollHint v-if="showHint && !reduced" />
      </Transition>

      <!-- Progreso de la historia -->
      <div class="story__progress" aria-hidden="true">
        <span class="story__progress-bar" ref="progressBar"></span>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.story {
  position: relative;
  height: 600vh;
  background: colors.$BAKANO-DARK;

  &__sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh; // iOS: ignora la barra de URL
    overflow: clip;
  }

  &__stage {
    position: absolute;
    inset: 0;
  }

  &__img,
  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    will-change: transform, opacity;
  }

  // Antes de que GSAP tome el control, la primera imagen ya está pintada
  &__img:first-child {
    opacity: 1;
  }

  &__vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse at center, transparent 40%, rgba(colors.$BAKANO-DARK, 0.75) 100%),
      linear-gradient(to bottom, rgba(#000, 0.35), transparent 20%, transparent 78%, #000 100%);
    // El fade inferior a #000 empalma con el fondo negro de TheStrategies
  }

  // Fade del hint de scroll
  :deep(.hint-fade-enter-active),
  :deep(.hint-fade-leave-active) { transition: opacity 0.4s ease; }
  :deep(.hint-fade-enter-from),
  :deep(.hint-fade-leave-to) { opacity: 0; }

  &__progress {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    z-index: 3;
    background: rgba(255, 255, 255, 0.08);
  }

  &__progress-bar {
    display: block;
    height: 100%;
    width: 100%;
    background: colors.$BAKANO-PINK;
    transform: scaleX(0);
    transform-origin: left;
  }

  // ── Reduced motion: historia apilada y legible ─────────────────────────────
  &--static {
    height: auto;

    .story__sticky {
      position: static;
      height: auto;
      overflow: visible;
    }

    .story__stage {
      position: relative;
      height: 56vh;
    }

    .story__img {
      opacity: 0;
      position: absolute;

      &:first-child {
        opacity: 1;
      }
    }

    :deep(.story__chapter) {
      position: static;
      opacity: 1;
      pointer-events: auto;
      padding: 64px 24px;
    }

    .story__progress,
    .story__video {
      display: none;
    }
  }
}
</style>
