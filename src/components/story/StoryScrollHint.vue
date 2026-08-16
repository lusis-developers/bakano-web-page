<template>
  <div class="scroll-hint" aria-hidden="true">
    <span class="scroll-hint__text">Haz scroll para iniciar la experiencia</span>
    <span class="scroll-hint__mouse">
      <span class="scroll-hint__wheel"></span>
    </span>
    <svg class="scroll-hint__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: clamp(28px, 5vh, 56px);
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  pointer-events: none;

  &__text {
    @include fonts.accent-font(700);
    font-size: 0.72rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(colors.$BAKANO-LIGHT, 0.85);
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
    text-align: center;
    padding: 0 16px;
  }

  &__mouse {
    width: 24px;
    height: 38px;
    border: 2px solid rgba(colors.$BAKANO-LIGHT, 0.7);
    border-radius: 14px;
    display: flex;
    justify-content: center;
    padding-top: 6px;
  }

  &__wheel {
    width: 3px;
    height: 8px;
    border-radius: 2px;
    background: colors.$BAKANO-PINK;
    animation: hint-wheel 1.6s ease-in-out infinite;
  }

  &__chevron {
    color: colors.$BAKANO-PINK;
    animation: hint-bounce 1.6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    // En touch no hay rueda: solo texto + chevron
    &__mouse {
      display: none;
    }
  }
}

@keyframes hint-wheel {
  0%   { transform: translateY(0); opacity: 1; }
  60%  { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; }
}

@keyframes hint-bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(6px); }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-hint__wheel,
  .scroll-hint__chevron {
    animation: none;
  }
}
</style>
