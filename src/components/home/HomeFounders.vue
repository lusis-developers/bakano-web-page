<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { teamMembers } from '@/data/team'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(() => sectionRef.value, { from: 'left' })
</script>

<template>
  <div class="founders" ref="sectionRef">
    <div class="founders__inner" data-drift>
      <header class="founders__head" data-reveal>
        <p class="eyebrow">Quiénes somos</p>
        <h2 class="founders__title">Datos, marketing y tecnología, liderados por sus fundadores</h2>
        <p class="founders__lede">
          Somos una agencia de Guayaquil. Los fundadores están en cada estrategia, no solo en la
          reunión de venta.
        </p>
      </header>

      <ul class="founders__grid">
        <li v-for="m in teamMembers" :key="m.id" class="founder" data-reveal>
          <div class="founder__photo">
            <img
              :src="m.image"
              :alt="`${m.name}, ${m.role}`"
              loading="lazy"
              width="760"
              height="1013"
            />
          </div>
          <div class="founder__body">
            <h3>{{ m.name }}</h3>
            <p class="founder__role">{{ m.role }}</p>
            <p class="founder__bio">{{ m.bio }}</p>
            <a
              :href="m.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="founder__link"
              :aria-label="`LinkedIn de ${m.name}`"
            >
              <i class="fa-brands fa-linkedin" aria-hidden="true"></i> LinkedIn
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;

.founders {
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
    color: rgba($BAKANO-LIGHT, 0.7);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (max-width: 900px) {
    &__grid {
      grid-template-columns: 1fr;
      max-width: 460px;
    }
  }

  @media (max-width: 600px) {
    padding-inline: 16px;
  }
}

.founder {
  border-radius: 20px;
  overflow: hidden;
  background: rgba($white, 0.04);
  border: 1px solid rgba($white, 0.08);

  &__photo {
    aspect-ratio: 4 / 5;
    background: #2a2236;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  &:hover &__photo img {
    transform: scale(1.04);
  }

  &__body {
    padding: 24px;

    h3 {
      @include fonts.heading-font(800);
      margin: 0;
      font-size: 1.4rem;
    }
  }

  &__role {
    @include fonts.interface-font(600);
    margin: 6px 0 12px;
    font-size: 0.85rem;
    color: $BAKANO-PINK;
  }

  &__bio {
    @include fonts.body-font(400);
    margin: 0 0 16px;
    font-size: 0.95rem;
    color: rgba($BAKANO-LIGHT, 0.7);
  }

  &__link {
    @include fonts.interface-font(700);
    font-size: 0.85rem;
    color: $white;
    text-decoration: none;

    &:hover {
      color: $BAKANO-PINK;
    }
  }
}
</style>
