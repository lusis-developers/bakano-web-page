<script setup lang="ts">
const emit = defineEmits<{ (e: 'contact'): void }>()
</script>

<template>
  <div class="strategies__header">
    <p class="strategies__subtitle">METODOLOGÍA 1M</p>
    <h2 class="strategies__title">
      Ingeniería de Crecimiento al<br>
      Estilo <span>Silicon Valley</span>
    </h2>
    <p class="strategies__header-desc">
      No operamos con fe ni esperanza. Aplicamos el marco de trabajo <strong>Lean Startup</strong> para encontrar
      tu oferta ganadora rápida y económicamente, y luego escalar con precisión matemática hacia las 7 cifras anuales.
    </p>

    <div class="strategies__header-cta">
      <button class="btn-header-contact" @click="emit('contact')">
        <span>HABLAR CON UN ESTRATEGA</span>
        <i class="fa-solid fa-rocket"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.strategies__header {
  max-width: 900px;
  margin-bottom: 8vw;
}

.strategies__subtitle {
  @include fonts.body-font(600);
  color: colors.$BAKANO-PINK;
  font-size: 1rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.strategies__title {
  @include fonts.heading-font(800);
  font-size: clamp(3rem, 6vw, 6.5rem);
  color: colors.$white;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 2rem;

  span {
    color: transparent;
    -webkit-text-stroke: 2px rgba(colors.$white, 0.9);
  }
}

.strategies__header-desc {
  @include fonts.body-font(400);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: rgba(colors.$white, 0.7);
  line-height: 1.6;
  max-width: 700px;
  margin-bottom: 3vw;

  strong {
    color: colors.$white;
  }
}

.strategies__header-cta {
  display: flex;
  justify-content: flex-start;
}

.btn-header-contact {
  @include fonts.body-font(700);
  background: transparent;
  border: 2px solid colors.$BAKANO-PINK;
  color: colors.$white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(colors.$BAKANO-PINK, 0.2);

  i {
    font-size: 1.2rem;
    color: colors.$BAKANO-PINK;
    transition: all 0.4s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: colors.$BAKANO-PINK;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s ease;
    z-index: 0;
  }

  span,
  i {
    position: relative;
    z-index: 1;
  }

  &:hover {
    box-shadow: 0 15px 40px rgba(colors.$BAKANO-PINK, 0.4);
    transform: translateY(-5px);

    &::before {
      transform: scaleX(1);
      transform-origin: left;
    }

    i {
      color: colors.$white;
      transform: translateX(5px) rotate(45deg);
    }
  }
}
</style>
