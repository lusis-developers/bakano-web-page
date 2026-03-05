<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const isComplete = ref(false)
const progress = ref(0)
const textPhrases = ['Analizando...', 'Estrategizando...', 'Escalando...']
const currentText = ref(textPhrases[0])

const emit = defineEmits<{
  (e: 'complete'): void
}>()

onMounted(() => {
  // Simular carga de 0 a 100% (ajusta el timing real de assets aquí)
  const proxy = { percent: 0 }

  gsap.to(proxy, {
    percent: 100,
    duration: 2.5, // Total loader duration
    ease: 'power2.inOut',
    onUpdate: () => {
      progress.value = Math.round(proxy.percent)

      // Update words based on generic progress
      if (progress.value > 80) currentText.value = textPhrases[2]
      else if (progress.value > 40) currentText.value = textPhrases[1]
    },
    onComplete: () => {
      // Fadeout and emit
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
    <div class="global-loader__bg-text">{{ progress }}%</div>
    <div class="global-loader__fg-text">{{ currentText }}</div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: colors.$BAKANO-DARK;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__bg-text {
    position: absolute;
    @include fonts.heading-font(800);
    font-size: clamp(10rem, 30vw, 40rem);
    color: rgba(colors.$white, 0.03); // Muy sutil
    line-height: 1;
    letter-spacing: -0.05em;
    user-select: none;
    z-index: 1;
  }

  &__fg-text {
    position: relative;
    @include fonts.heading-font(700);
    font-size: clamp(3rem, 6vw, 6rem);
    color: colors.$white;
    z-index: 2;
    text-align: center;
  }
}
</style>
