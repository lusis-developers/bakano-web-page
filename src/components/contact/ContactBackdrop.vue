<script setup lang="ts">
// Nebulosa generada con Higgsfield (grade de marca) — capa parallax de fondo.
// Las animaciones viven en TheContact (gsap.context del padre encuentra
// estas clases en el DOM); este componente solo aporta markup + estilos.
import bgNebula from '@/assets/backgrounds/contact-nebula.webp'
</script>

<template>
  <div class="contact__bg" aria-hidden="true">
    <img :src="bgNebula" alt="" class="contact__bg-img" loading="lazy" decoding="async" />
  </div>
  <div class="contact__glow" aria-hidden="true" />
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.contact__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;

  &::after {
    // Vela oscura: el contenido y el form siguen mandando
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(11, 8, 21, 0.6);
  }
}

.contact__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.55;
  will-change: transform;
}

.contact__glow {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 70vw;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(colors.$BAKANO-PINK, 0.06) 0%,
    rgba(colors.$BAKANO-PURPLE, 0.04) 40%,
    transparent 70%
  );
  pointer-events: none;
}
</style>
