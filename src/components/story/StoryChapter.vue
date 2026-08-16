<script setup lang="ts">
import { storyStats, type StoryChapter } from '@/data/story'

defineProps<{
  chapter: StoryChapter
  isFinal: boolean
  active: boolean
}>()

const emit = defineEmits<{ (e: 'cta'): void }>()
</script>

<template>
  <article class="story__chapter" :class="{ 'is-active': active }">
    <p class="story__eyebrow">{{ chapter.eyebrow }}</p>

    <h1 v-if="isFinal" class="story__title story__title--final">
      Ayudamos a Dueños de Negocios a Aumentar hasta un
      <strong>20% su Facturación Mensual o Rentabilidad</strong>
    </h1>
    <h2 v-else class="story__title">{{ chapter.title }}</h2>

    <p class="story__para">{{ chapter.para }}</p>

    <ul class="story__chips">
      <li v-for="chip in chapter.chips" :key="chip">{{ chip }}</li>
    </ul>

    <template v-if="isFinal">
      <div class="story__stats">
        <div v-for="s in storyStats" :key="s.label" class="story__stat">
          <span class="story__stat-num">{{ s.number }}</span>
          <span class="story__stat-label">{{ s.label }}</span>
        </div>
      </div>
      <button class="story__cta" @click="emit('cta')">
        <span>ESCALA MI NEGOCIO AHORA</span>
      </button>
    </template>
  </article>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.story__chapter {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 96px clamp(24px, 8vw, 120px) 64px;
  opacity: 0;
  pointer-events: none;

  &.is-active {
    pointer-events: auto;
  }
}

.story__eyebrow {
  @include fonts.accent-font(700);
  font-size: 0.78rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: colors.$BAKANO-PINK;
  margin: 0;
}

.story__title {
  @include fonts.heading-font(800);
  color: colors.$white;
  font-size: clamp(2.4rem, 6.5vw, 6.5rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  max-width: 14ch;
  margin: 0;

  &--final {
    // El h1 SEO es más largo: baja un punto la escala para que respire
    font-size: clamp(1.9rem, 4.6vw, 4.4rem);
    max-width: 22ch;
    text-transform: none;

    strong {
      color: colors.$BAKANO-PINK;
    }
  }
}

.story__para {
  @include fonts.body-font(400);
  color: rgba(colors.$BAKANO-LIGHT, 0.82);
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.7;
  max-width: 46ch;
  margin: 0;
}

.story__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 4px 0 0;

  li {
    @include fonts.interface-font(600);
    border: 1px solid rgba(colors.$BAKANO-PINK, 0.45);
    border-radius: 999px;
    padding: 6px 14px;
    font-size: 0.75rem;
    color: colors.$BAKANO-LIGHT;
    background: rgba(colors.$BAKANO-DARK, 0.4);
  }
}

.story__stats {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: clamp(20px, 4vw, 56px);
  margin-top: 12px;
}

.story__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.story__stat-num {
  @include fonts.heading-font(800);
  font-size: clamp(1.6rem, 3vw, 2.6rem);
  color: colors.$BAKANO-PINK;
  line-height: 1;
}

.story__stat-label {
  @include fonts.interface-font(500);
  font-size: 0.72rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(colors.$BAKANO-LIGHT, 0.6);
}

.story__cta {
  @include fonts.accent-font(700);
  margin-top: 20px;
  padding: 18px 40px;
  border: none;
  border-radius: 999px;
  background: colors.$BAKANO-PINK;
  color: colors.$white;
  font-size: 0.95rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 40px rgba(colors.$BAKANO-PINK, 0.35);
  }
}

@media (max-width: 768px) {
  .story__chapter {
    justify-content: flex-end;
    padding: 88px 20px 56px;
    gap: 14px;
  }

  .story__title {
    font-size: clamp(2rem, 10vw, 3rem);

    &--final {
      font-size: clamp(1.5rem, 7.2vw, 2.2rem);
    }
  }

  .story__stats {
    grid-template-columns: repeat(2, auto);
    gap: 16px 28px;
  }

  .story__cta {
    width: 100%;
    padding: 16px 24px;
  }
}
</style>
