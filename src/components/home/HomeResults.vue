<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { testimonials, testimonialInitials } from '@/data/testimonials'
import { resultHighlights } from '@/data/home'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(() => sectionRef.value, { from: 'right' })
</script>

<template>
  <div class="results" ref="sectionRef">
    <div class="results__inner" data-drift>
      <header class="results__head" data-reveal>
        <p class="eyebrow">Resultados reales</p>
        <h2 class="results__title">No lo decimos nosotros. Lo dicen nuestros clientes.</h2>
        <p class="results__lede">
          Citas tomadas de los videos que cada cliente grabó y publicamos en
          <a href="https://www.instagram.com/bakano.ec/" target="_blank" rel="noopener noreferrer"
            >@bakano.ec</a
          >.
        </p>
      </header>

      <ul class="results__grid">
        <li v-for="t in testimonials" :key="t.id" class="result" data-reveal>
          <p class="result__highlight">{{ resultHighlights[t.id] }}</p>
          <blockquote class="result__quote">“{{ t.quote }}”</blockquote>

          <footer class="result__meta">
            <img
              v-if="t.image"
              :src="t.image"
              alt=""
              class="result__avatar"
              width="44"
              height="44"
              loading="lazy"
            />
            <span v-else class="result__avatar result__avatar--initials" aria-hidden="true">
              {{ testimonialInitials(t.name) }}
            </span>
            <div>
              <cite>{{ t.name }}</cite>
              <span>{{ t.business }}</span>
            </div>
            <a
              v-if="t.postUrl"
              :href="t.postUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="result__video"
              :aria-label="`Ver el video de ${t.name} en Instagram`"
            >
              <i class="fa-solid fa-play" aria-hidden="true"></i> Ver video
            </a>
          </footer>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;

.results {
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
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    line-height: 1.06;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  &__lede {
    @include fonts.body-font(400);
    margin: 16px 0 0;
    color: rgba($BAKANO-DARK, 0.65);

    a {
      color: $BAKANO-PINK;
      font-weight: 700;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (max-width: 1024px) {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 680px) {
    padding-inline: 16px;

    &__grid {
      grid-template-columns: 1fr;
    }
  }
}

.result {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  border-radius: 20px;
  background: $white;
  border: 1px solid rgba($BAKANO-DARK, 0.08);

  &__highlight {
    @include fonts.heading-font(800);
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.15;
    color: $BAKANO-PINK;
  }

  &__quote {
    @include fonts.body-font(400);
    flex: 1;
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
    color: rgba($BAKANO-DARK, 0.8);
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid rgba($BAKANO-DARK, 0.08);

    cite {
      @include fonts.interface-font(700);
      display: block;
      font-style: normal;
      font-size: 0.92rem;
    }

    span {
      @include fonts.interface-font(500);
      font-size: 0.8rem;
      color: $gray-600;
    }
  }

  &__avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;

    &--initials {
      @include fonts.interface-font(700);
      display: grid;
      place-items: center;
      background: $BAKANO-DARK;
      color: $white;
    }
  }

  &__video {
    @include fonts.interface-font(700);
    margin-left: auto;
    flex-shrink: 0;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba($BAKANO-PINK, 0.1);
    color: $BAKANO-PINK;
    font-size: 0.78rem;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
      background: rgba($BAKANO-PINK, 0.18);
    }
  }
}
</style>
