<script setup lang="ts">
import { faqItems } from '@/data/faq'
</script>

<template>
  <section class="faq">
    <div class="faq__inner">
      <p class="faq__eyebrow">Preguntas frecuentes</p>
      <h2 class="faq__title">
        Todo lo que necesitas saber <strong>antes de escalar tu negocio</strong>
      </h2>

      <div class="faq__list">
        <details v-for="(item, i) in faqItems" :key="item.q" class="faq__item" :open="i === 0">
          <summary class="faq__question">
            <span>{{ item.q }}</span>
            <i class="fa-solid fa-chevron-down faq__chevron" aria-hidden="true"></i>
          </summary>
          <p class="faq__answer">{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.faq {
  background-color: colors.$BAKANO-DARK;
  padding: clamp(64px, 10vw, 120px) 24px;
}

.faq__inner {
  max-width: 860px;
  margin: 0 auto;
}

.faq__eyebrow {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: colors.$BAKANO-PINK;
  margin-bottom: 14px;
}

.faq__title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1.2;
  color: #fff;
  margin-bottom: clamp(32px, 5vw, 56px);

  strong {
    color: colors.$BAKANO-PINK;
  }
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq__item {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  transition: border-color 0.25s ease, background 0.25s ease;

  &[open] {
    border-color: rgba(colors.$BAKANO-PINK, 0.35);
    background: rgba(colors.$BAKANO-PINK, 0.05);

    .faq__chevron {
      transform: rotate(180deg);
    }
  }
}

.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;
  cursor: pointer;
  list-style: none;
  font-size: 1.02rem;
  font-weight: 600;
  color: #fff;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    color: colors.$BAKANO-PINK;
  }
}

.faq__chevron {
  flex-shrink: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  transition: transform 0.25s ease;
}

.faq__answer {
  padding: 0 22px 20px;
  font-size: 0.97rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.72);
}

@media (prefers-reduced-motion: reduce) {
  .faq__item,
  .faq__chevron {
    transition: none;
  }
}
</style>
