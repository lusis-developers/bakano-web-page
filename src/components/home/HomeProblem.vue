<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { pains } from '@/data/home'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(() => sectionRef.value, { from: 'right' })
</script>

<template>
  <div class="problem" ref="sectionRef">
    <div class="problem__inner" data-drift>
      <header class="problem__head" data-reveal>
        <p class="eyebrow">¿Te suena?</p>
        <h2 class="problem__title">No te falta esfuerzo. <span>Te falta un sistema.</span></h2>
      </header>

      <ul class="problem__list">
        <li v-for="p in pains" :key="p.title" class="problem__item" data-reveal>
          <span class="problem__icon" aria-hidden="true"><i :class="p.icon"></i></span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </li>
      </ul>

      <p class="problem__bridge" data-reveal>
        En Bakano convertimos ese caos en un proceso medible:
        <strong>sabes cuánto inviertes, cuántos clientes llegan y cuánto ganas.</strong>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;

.problem {
  overflow-x: clip; // el recorrido lateral no debe generar scroll horizontal
  background: $BAKANO-LIGHT;
  color: $BAKANO-DARK;
  padding: clamp(72px, 10vw, 128px) 24px;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__head {
    max-width: 760px;
    margin-bottom: clamp(36px, 5vw, 56px);
  }

  &__title {
    @include fonts.heading-font(800);
    margin: 0;
    font-size: clamp(2rem, 4.4vw, 3.4rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    text-wrap: balance;

    span {
      color: $BAKANO-PINK;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    padding: 28px;
    border-radius: 20px;
    background: $white;
    border: 1px solid rgba($BAKANO-DARK, 0.08);

    h3 {
      @include fonts.heading-font(700);
      margin: 18px 0 8px;
      font-size: 1.2rem;
      line-height: 1.25;
    }

    p {
      @include fonts.body-font(400);
      margin: 0;
      font-size: 0.98rem;
      color: rgba($BAKANO-DARK, 0.7);
    }
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba($BAKANO-PINK, 0.1);
    color: $BAKANO-PINK;
    font-size: 1.05rem;
  }

  &__bridge {
    @include fonts.body-font(400);
    max-width: 720px;
    margin: clamp(36px, 5vw, 56px) 0 0;
    font-size: clamp(1.05rem, 1.5vw, 1.25rem);
    line-height: 1.6;
    color: rgba($BAKANO-DARK, 0.75);

    strong {
      color: $BAKANO-DARK;
    }
  }

  @media (max-width: 900px) {
    &__list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    padding-inline: 16px;
  }
}
</style>
