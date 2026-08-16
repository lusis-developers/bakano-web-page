<template>
  <div class="team__intro">
    <div class="team__intro-content">
      <p class="team__label">Nuestro Equipo</p>
      <h2 class="team__title">
        Los fundadores<br>
        <span class="team__title-gradient">detrás del resultado</span>
      </h2>
      <p class="team__desc">
        Tres mentes que combinan datos, marketing y tecnología
        para llevar tu negocio al siguiente nivel.
      </p>
      <!-- Indicador de scroll horizontal -->
      <div class="team__scroll-hint" aria-hidden="true">
        <span class="team__scroll-hint-line" />
        <span class="team__scroll-hint-text">desliza para conocernos</span>
        <span class="team__scroll-hint-line" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.team__intro {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px;
  text-align: center;
  position: relative;

  // Radial glow de fondo
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 50% 60%,
        rgba(colors.$BAKANO-PINK, 0.07) 0%,
        transparent 70%);
    pointer-events: none;
  }
}

.team__intro-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
  width: 100%;
}

.team__label {
  @include fonts.accent-font(700);
  font-size: 0.75rem;
  color: colors.$BAKANO-PINK;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-bottom: 20px;
}

.team__title {
  @include fonts.heading-font(800);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  color: colors.$white;
  text-transform: uppercase;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 24px;

  @media (max-width: 600px) {
    // Tamaño más pequeño para que cada línea quepa en pantalla
    font-size: clamp(1.5rem, 5vw, 2.4rem);
  }

  &-gradient {
    background: linear-gradient(110deg, colors.$BAKANO-PINK 0%, colors.$BAKANO-PURPLE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.team__desc {
  @include fonts.body-font(400);
  font-size: 1.05rem;
  color: rgba(colors.$white, 0.55);
  line-height: 1.7;
  margin: 0 0 52px;
  max-width: 540px;
  margin-inline: auto;

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
}

.team__scroll-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  &-line {
    display: block;
    width: 40px;
    height: 1px;
    background: rgba(colors.$white, 0.2);
  }

  &-text {
    @include fonts.interface-font(500);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: rgba(colors.$white, 0.35);
  }
}
</style>
