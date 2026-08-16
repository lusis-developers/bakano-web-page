<template>
  <div class="th">
    <p class="th__label">Testimonios</p>
    <h2 class="th__title">
      Lo que dicen <br>nuestros clientes
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.th {
  width: 100%;
  text-align: center;

  &__label {
    @include fonts.accent-font(700);
    font-size: 0.78rem;
    color: colors.$BAKANO-PINK;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin-bottom: 14px;
  }

  &__title {
    @include fonts.heading-font(800);
    font-size: clamp(2.6rem, 5.5vw, 5rem);
    color: colors.$white;
    text-transform: uppercase;
    line-height: 1.06;
    letter-spacing: -0.025em;
    margin: 0;
  }
}
</style>
