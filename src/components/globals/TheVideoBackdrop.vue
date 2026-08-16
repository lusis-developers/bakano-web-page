<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap, ScrollTrigger, prefersReducedMotion, isMobile } from '@/composables/useScrollAnimations'

// El hilo cinemático del homepage: el mismo video-viaje del inicio corre FIJO
// detrás de todas las secciones y su línea de tiempo es el scroll TOTAL de la
// página. Las secciones translúcidas dejan que respire entre bloque y bloque.
const JOURNEY_VIDEO = '/videos/story-journey.mp4'

const videoRef = ref<HTMLVideoElement | null>(null)
const enabled = ref(false)

let trigger: ScrollTrigger | null = null

onMounted(() => {
  // Solo desktop y sin reduced-motion: en mobile el doble scrub de video
  // (backdrop + secciones) castiga demasiado la batería/CPU.
  if (prefersReducedMotion() || isMobile()) return

  const video = videoRef.value
  if (!video) return
  enabled.value = true

  const setup = () => {
    video.pause()
    const proxy = { t: 0 }
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
      animation: gsap.fromTo(proxy,
        { t: 0 },
        {
          t: () => video.duration || 0,
          ease: 'none',
          onUpdate() { video.currentTime = proxy.t },
        }
      ),
    })
    trigger = st
  }

  if (video.readyState >= 1) setup()
  else video.addEventListener('loadedmetadata', setup, { once: true })
})

onUnmounted(() => {
  trigger?.kill()
})
</script>

<template>
  <div v-show="enabled" class="video-backdrop" aria-hidden="true">
    <video
      ref="videoRef"
      class="video-backdrop__video"
      :src="JOURNEY_VIDEO"
      muted
      playsinline
      preload="auto"
    ></video>
    <div class="video-backdrop__veil"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.video-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
  }

  &__veil {
    position: absolute;
    inset: 0;
    background: rgba(colors.$BAKANO-DARK, 0.45);
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
}
</style>
