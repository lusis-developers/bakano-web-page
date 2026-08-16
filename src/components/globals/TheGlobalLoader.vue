<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

// Pulso de energía generado con Higgsfield: partículas magenta cargando un núcleo
const LOADER_VIDEO = '/videos/loader-pulse.mp4'

const isComplete = ref(false)
const videoReady = ref(false)
const progress = ref(0)
const textPhrases = ['Analizando…', 'Estrategizando…', 'Escalando…']
const currentText = ref(textPhrases[0])
const phraseKey = ref(0) // fuerza la re-animación CSS al cambiar de palabra

const progressBar = ref<HTMLElement | null>(null)

const emit = defineEmits<{ (e: 'complete'): void }>()

const setPhrase = (i: number) => {
  if (textPhrases[i] !== currentText.value) {
    currentText.value = textPhrases[i]
    phraseKey.value = i
  }
}

onMounted(() => {
  const proxy = { percent: 0 }

  gsap.to(proxy, {
    percent: 100,
    duration: 2.5,
    ease: 'power2.inOut',
    onUpdate: () => {
      progress.value = Math.round(proxy.percent)
      if (progressBar.value) {
        progressBar.value.style.transform = `scaleX(${proxy.percent / 100})`
      }
      if (progress.value > 80) setPhrase(2)
      else if (progress.value > 40) setPhrase(1)
    },
    onComplete: () => {
      gsap.to('.global-loader', {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          isComplete.value = true
          emit('complete')
        }
      })
    }
  })
})
</script>

<template>
  <div v-if="!isComplete" class="global-loader">
    <!-- Pulso Higgsfield de fondo; entra suave cuando el video está listo -->
    <video
      class="global-loader__video"
      :class="{ 'is-ready': videoReady }"
      :src="LOADER_VIDEO"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      @canplay="videoReady = true"
      @error="videoReady = false"
    ></video>
    <div class="global-loader__veil" aria-hidden="true"></div>

    <div class="global-loader__bg-text">{{ progress }}%</div>
    <div class="global-loader__fg-text" :key="phraseKey">{{ currentText }}</div>

    <div class="global-loader__bar" aria-hidden="true">
      <span ref="progressBar" class="global-loader__bar-fill"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.global-loader {
  position: fixed;
  inset: 0;
  background-color: colors.$BAKANO-DARK;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.8s ease;

    &.is-ready {
      opacity: 0.55;
    }

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
  }

  &__veil {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, transparent 30%, rgba(colors.$BAKANO-DARK, 0.7) 100%);
    pointer-events: none;
  }

  &__bg-text {
    position: absolute;
    @include fonts.heading-font(800);
    font-size: clamp(10rem, 30vw, 40rem);
    color: rgba(colors.$white, 0.04);
    line-height: 1;
    letter-spacing: -0.05em;
    user-select: none;
    z-index: 1;
  }

  &__fg-text {
    position: relative;
    @include fonts.heading-font(700);
    font-size: clamp(2.4rem, 6vw, 6rem);
    color: colors.$white;
    z-index: 2;
    text-align: center;
    text-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
    animation: loader-word-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &__bar {
    position: absolute;
    left: 50%;
    bottom: clamp(48px, 9vh, 96px);
    transform: translateX(-50%);
    width: min(320px, 60vw);
    height: 3px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.12);
    overflow: hidden;
    z-index: 2;
  }

  &__bar-fill {
    display: block;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
    transform: scaleX(0);
    transform-origin: left;
  }
}

@keyframes loader-word-in {
  from {
    opacity: 0;
    transform: translateY(18px);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .global-loader__fg-text {
    animation: none;
  }
}
</style>
