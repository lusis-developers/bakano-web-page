<script setup lang="ts">
const emit = defineEmits<{ (e: 'contact'): void }>()
</script>

<template>
  <div class="cta-banner">
    <div class="cta-banner__content">
      <h3 class="cta-banner__title">¿Listo para escalar al siguiente nivel?</h3>
      <p class="cta-banner__desc">Implementa el marco de trabajo Lean Startup en tu empresa hoy mismo.</p>
    </div>
    <button class="btn-primary-massive" @click="emit('contact')">
      <span>IMPLEMENTAR SISTEMA</span>
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(colors.$BAKANO-DARK, 0.9) 0%, rgba(#111, 0.9) 100%);
  border: 1px solid rgba(colors.$BAKANO-PINK, 0.3);
  border-radius: 20px;
  padding: 3rem 4rem;
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(colors.$BAKANO-PINK, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 50% 10%, rgba(colors.$BAKANO-PINK, 0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 1;
    max-width: 500px;
  }

  &__title {
    @include fonts.heading-font(700);
    font-size: clamp(1.8rem, 2.5vw, 2.5rem);
    color: colors.$white;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  &__desc {
    @include fonts.body-font(400);
    font-size: 1.1rem;
    color: rgba(colors.$white, 0.7);
    margin: 0;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 3rem 2rem;

    &__content {
      max-width: 100%;
    }
  }
}

.btn-primary-massive {
  @include fonts.body-font(700);
  background: colors.$BAKANO-PRIMARY;
  color: colors.$white;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  transition: all 0.3s ease;
  border-radius: 50px;
  position: relative;
  z-index: 1;

  i {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: colors.$BAKANO-PINK;
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(colors.$BAKANO-PRIMARY, 0.4);

    i {
      transform: translateX(8px);
    }
  }

  @media (max-width: 768px) {
    padding: 1.2rem 2rem;
    width: 100%;
    justify-content: center;
  }
}
</style>
