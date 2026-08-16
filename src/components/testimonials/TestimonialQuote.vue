<script setup lang="ts">
import { testimonialInitials, type Testimonial } from '@/data/testimonials'

defineProps<{
  testimonial: Testimonial
  active: boolean
}>()
</script>

<template>
  <figure class="tq" :class="{ 'is-active': active }">
    <span class="tq__mark" aria-hidden="true">“</span>
    <blockquote class="tq__quote">{{ testimonial.quote }}</blockquote>
    <figcaption class="tq__meta">
      <span class="tq__avatar">
        <img v-if="testimonial.image" :src="testimonial.image" :alt="testimonial.name" loading="lazy" />
        <span v-else class="tq__avatar-mono">{{ testimonialInitials(testimonial.name) }}</span>
      </span>
      <span class="tq__who">
        <span class="tq__name">{{ testimonial.name }}</span>
        <component
          :is="testimonial.profileUrl ? 'a' : 'span'"
          class="tq__business"
          :href="testimonial.profileUrl ?? undefined"
          :target="testimonial.profileUrl ? '_blank' : undefined"
          rel="noopener noreferrer"
        >
          {{ testimonial.business }} · {{ testimonial.handle }}
        </component>
      </span>
      <a
        v-if="testimonial.postUrl"
        class="tq__video-link"
        :href="testimonial.postUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Ver el video de ${testimonial.name} en Instagram`"
      >
        <i class="fa-brands fa-instagram" aria-hidden="true"></i>
        <span>Ver video</span>
      </a>
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.tq {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 24px;
  padding: 0 clamp(16px, 4vw, 64px);
  opacity: 0;
  pointer-events: none;
  margin: 0;

  &.is-active {
    pointer-events: auto;
  }

  &__mark {
    @include fonts.heading-font(800);
    font-size: clamp(4rem, 8vw, 7rem);
    line-height: 0.6;
    color: colors.$BAKANO-PINK;
    display: block;
    height: 0.32em;
  }

  &__quote {
    @include fonts.heading-font(700);
    font-size: clamp(1.5rem, 3vw, 2.7rem);
    line-height: 1.28;
    letter-spacing: -0.015em;
    color: colors.$white;
    max-width: 26ch;
    margin: 0;
    text-wrap: balance;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid rgba(colors.$BAKANO-PINK, 0.6);
    background: rgba(colors.$BAKANO-PINK, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__avatar-mono {
    @include fonts.accent-font(700);
    font-size: 0.9rem;
    color: colors.$BAKANO-PINK;
    letter-spacing: 1px;
  }

  &__who {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  &__name {
    @include fonts.heading-font(700);
    font-size: 1.05rem;
    color: colors.$white;
  }

  &__business {
    @include fonts.body-font(400);
    font-size: 0.82rem;
    color: rgba(colors.$BAKANO-LIGHT, 0.65);
    text-decoration: none;

    &:hover {
      color: colors.$BAKANO-PINK;
    }
  }

  &__video-link {
    @include fonts.accent-font(700);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid rgba(colors.$BAKANO-PINK, 0.5);
    color: colors.$white;
    background: rgba(colors.$BAKANO-PINK, 0.1);
    font-size: 0.72rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.3s ease, transform 0.3s ease;

    &:hover {
      background: rgba(colors.$BAKANO-PINK, 0.28);
      transform: translateY(-2px);
    }
  }
}
</style>
