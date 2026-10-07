<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { services } from '@/data/home'

const sectionRef = ref<HTMLElement | null>(null)

useReveal(() => sectionRef.value, { from: 'left' })
</script>

<template>
  <div class="services" ref="sectionRef">
    <div class="services__inner" data-drift>
      <!-- Qué hacemos -->
      <header class="services__head" data-reveal>
        <p class="eyebrow">Qué hacemos</p>
        <h2 class="services__title">
          Todo lo que tu negocio necesita para vender más, en un solo equipo
        </h2>
        <p class="services__lede">
          Estrategia, publicidad y tecnología trabajando juntas. Sin pasarte de agencia en agencia
          ni coordinar cinco freelancers.
        </p>
      </header>

      <ul class="services__grid">
        <li v-for="s in services" :key="s.title" class="services__card" data-reveal>
          <i :class="s.icon" aria-hidden="true"></i>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;

.services {
  overflow-x: clip; // el recorrido lateral no debe generar scroll horizontal
  background: $BAKANO-DARK;
  color: $white;
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
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    line-height: 1.06;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  &__lede {
    @include fonts.body-font(400);
    margin: 16px 0 0;
    max-width: 56ch;
    font-size: clamp(1rem, 1.3vw, 1.15rem);
    color: rgba($BAKANO-LIGHT, 0.7);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__card {
    padding: 28px 24px;
    border-radius: 20px;
    background: rgba($white, 0.04);
    border: 1px solid rgba($white, 0.08);
    transition:
      border-color 0.25s ease,
      background 0.25s ease;

    &:hover {
      border-color: rgba($BAKANO-PINK, 0.45);
      background: rgba($white, 0.06);
    }

    i {
      font-size: 1.4rem;
      color: $BAKANO-PINK;
    }

    h3 {
      @include fonts.heading-font(700);
      margin: 18px 0 8px;
      font-size: 1.15rem;
    }

    p {
      @include fonts.body-font(400);
      margin: 0;
      font-size: 0.95rem;
      color: rgba($BAKANO-LIGHT, 0.68);
    }
  }

  @media (max-width: 1024px) {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    padding-inline: 16px;

    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
