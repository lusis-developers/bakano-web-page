<script setup lang="ts">
import type { TeamMember } from '@/data/team'

defineProps<{ member: TeamMember }>()

const openLinkedIn = (url: string) =>
  window.open(url, '_blank', 'noopener,noreferrer')
</script>

<template>
  <article class="team__panel">
    <!-- ── Lado foto ─────────────────────────── -->
    <div class="team__panel-photo-side">
      <div class="team__panel-photo-frame">
        <img class="team__panel-photo" :src="member.image" :alt="member.name" loading="lazy" />
        <div class="team__panel-photo-glow" aria-hidden="true" />
      </div>
    </div>

    <!-- ── Lado info ─────────────────────────── -->
    <div class="team__panel-info">
      <span class="team__panel-bg-num" aria-hidden="true">{{ member.num }}</span>
      <p class="team__panel-eyebrow">{{ member.num }} — Fundador</p>
      <h3 class="team__panel-name">{{ member.name }}</h3>
      <p class="team__panel-role">{{ member.role }}</p>
      <div class="team__panel-divider" aria-hidden="true" />
      <p class="team__panel-bio">{{ member.bio }}</p>

      <button
        class="team__panel-cta"
        @click="openLinkedIn(member.linkedin)"
        :aria-label="`Ver perfil de LinkedIn de ${member.name}`"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span>Ver en LinkedIn</span>
        <svg class="team__panel-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

$panel-bg: #0b0815;
$glass-border: rgba(255, 255, 255, 0.07);

.team__panel {
  width: 100vw;
  height: 100%;
  display: grid;
  grid-template-columns: 44% 56%;
  // Translúcido: deja pasar el video-hilo global del homepage
  background-color: rgba(11, 8, 21, 0.85);
  overflow: hidden;
  position: relative;

  // Separador derecho entre paneles
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 10%;
    bottom: 10%;
    width: 1px;
    background: linear-gradient(180deg, transparent 0%, $glass-border 30%, $glass-border 70%, transparent 100%);
  }
}

.team__panel-photo-side {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  // 72px arriba: el header fijo (57px) nunca se come el marco de la foto
  padding: 72px 24px 48px 64px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, transparent,
      rgba(colors.$BAKANO-PINK, 0.25) 40%, rgba(colors.$BAKANO-PURPLE, 0.2) 60%, transparent);
  }
}

.team__panel-photo-frame {
  position: relative;
  height: 78vh;
  max-height: 680px;
  overflow: hidden;
  border-radius: 18px;
  box-shadow:
    0 0 80px rgba(colors.$BAKANO-PINK, 0.12),
    0 40px 80px rgba(0, 0, 0, 0.6);
}

.team__panel-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  // GSAP anima scale + xPercent (parallax de cámara)
  transform-origin: center center;
  display: block;
  filter: saturate(0.88) contrast(1.08);
  will-change: transform;
}

.team__panel-photo-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba($panel-bg, 0.65) 100%);
  pointer-events: none;
  border-radius: inherit;
}

.team__panel-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 80px 80px 56px;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 60px 48px 60px 40px;
  }
}

.team__panel-bg-num {
  position: absolute;
  right: -24px;
  bottom: -40px;
  font-size: clamp(10rem, 18vw, 16rem);
  font-weight: 900;
  line-height: 1;
  color: rgba(255, 255, 255, 0.045);
  will-change: transform, opacity;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.05em;
  @include fonts.heading-font(900);
}

.team__panel-eyebrow {
  @include fonts.accent-font(600);
  font-size: 0.72rem;
  color: colors.$BAKANO-PINK;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 20px;
}

.team__panel-name {
  @include fonts.heading-font(800);
  font-size: clamp(2.6rem, 4.5vw, 4.8rem);
  color: colors.$white;
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin: 0 0 20px;
}

.team__panel-role {
  @include fonts.body-font(400);
  font-size: 0.9rem;
  color: rgba(colors.$white, 0.5);
  line-height: 1.5;
  margin: 0 0 28px;
  max-width: 340px;
}

.team__panel-divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(90deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
  border-radius: 1px;
  margin-bottom: 24px;
}

.team__panel-bio {
  @include fonts.body-font(400);
  font-size: 1rem;
  color: rgba(colors.$white, 0.72);
  line-height: 1.75;
  margin: 0 0 40px;
  max-width: 380px;
}

.team__panel-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 1px solid rgba(colors.$BAKANO-PINK, 0.35);
  border-radius: 50px;
  padding: 12px 24px;
  color: colors.$white;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  align-self: flex-start;

  @include fonts.interface-font(500);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  &:hover {
    background: rgba(colors.$BAKANO-PINK, 0.12);
    border-color: rgba(colors.$BAKANO-PINK, 0.6);
    box-shadow: 0 0 24px rgba(colors.$BAKANO-PINK, 0.15);
    transform: translateY(-2px);

    .team__panel-arrow {
      transform: translateX(4px);
    }
  }
}

.team__panel-arrow {
  transition: transform 0.25s ease;
}

// ── MOBILE: foto arriba (42%), info abajo (58%) ──────────────────────────────
// Sin scroll interno: dentro de una sección pineada un scroll anidado se siente
// roto. El contenido se compacta para caber SIEMPRE en su celda.
@media (max-width: 768px) {
  .team__panel {
    grid-template-columns: 1fr;
    grid-template-rows: 42% 58%;

    &::after { display: none; }
  }

  .team__panel-photo-side {
    // Despeja el header fijo (57px) + un respiro
    padding: 68px 20px 8px;
    align-items: flex-end;
  }

  .team__panel-photo-frame {
    width: 100%;
    height: 100%;
    max-height: none;
    border-radius: 12px;
  }

  .team__panel-info {
    padding: 12px 20px 18px;
    justify-content: center;
    overflow: hidden;
    min-height: 0;
  }

  .team__panel-bg-num {
    right: -12px;
    bottom: -18px;
    font-size: clamp(7rem, 30vw, 10rem);
  }

  .team__panel-eyebrow  { font-size: 0.66rem; letter-spacing: 3px; margin-bottom: 8px; }
  .team__panel-name     { font-size: clamp(1.5rem, 6.5vw, 2.3rem); margin-bottom: 6px; }
  .team__panel-role     { font-size: 0.8rem; line-height: 1.4; margin-bottom: 10px; }
  .team__panel-divider  { margin-bottom: 10px; }

  .team__panel-bio {
    font-size: 0.85rem;
    line-height: 1.55;
    margin-bottom: 14px;
  }

  .team__panel-cta {
    padding: 10px 18px;
    font-size: 0.74rem;
  }
}
</style>
