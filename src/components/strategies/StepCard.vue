<script setup lang="ts">
import type { StrategyStep } from '@/data/strategies'

defineProps<{ step: StrategyStep }>()
</script>

<template>
  <div class="step-card">
    <div class="step-card__number">{{ step.number }}</div>
    <h3 class="step-card__title">{{ step.titleLines[0] }}<br>{{ step.titleLines[1] }}</h3>
    <p class="step-card__desc">{{ step.desc }}</p>
    <ul class="step-card__features">
      <li v-for="f in step.features" :key="f">
        <i class="fa-solid fa-check"></i> {{ f }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.step-card {
  background: rgba(colors.$white, 0.02);
  border-top: 2px solid rgba(colors.$white, 0.1);
  padding: 4vw 3vw;
  position: relative;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(colors.$white, 0.05);
    border-color: colors.$BAKANO-PRIMARY;
    transform: translateY(-10px);

    .step-card__number {
      color: colors.$BAKANO-PRIMARY;
    }
  }

  &__number {
    @include fonts.heading-font(800);
    font-size: clamp(4rem, 6vw, 6rem);
    line-height: 1;
    color: rgba(colors.$white, 0.1);
    margin-bottom: 2rem;
    transition: color 0.4s ease;
  }

  &__title {
    @include fonts.heading-font(700);
    font-size: clamp(1.8rem, 2.5vw, 2.5rem);
    color: colors.$white;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  &__desc {
    @include fonts.body-font(400);
    font-size: 1.1rem;
    color: rgba(colors.$white, 0.7);
    line-height: 1.6;
    margin-bottom: 2.5rem;
    min-height: 120px; // Alinear las descripciones más o menos
  }

  &__features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      @include fonts.body-font(500);
      font-size: 1rem;
      color: rgba(colors.$white, 0.9);
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      i {
        color: colors.$BAKANO-PINK;
        margin-top: 4px;
        font-size: 0.9rem;
      }
    }
  }
}
</style>
