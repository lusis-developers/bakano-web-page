<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import luisImage    from '@/assets/team/luis.webp'
import denisseImage from '@/assets/team/denisse.webp'
import diegoImage   from '@/assets/team/diego.webp'

gsap.registerPlugin(ScrollTrigger)

// ── Refs ─────────────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null)
const pinRef     = ref<HTMLElement | null>(null)
const trackRef   = ref<HTMLElement | null>(null)

// ── Datos ─────────────────────────────────────────────────────────────────────
const members = [
  {
    id: 1,
    num: '01',
    name: 'Luis Reyes',
    role: 'Founder & Estratega de Datos y Decisiones de Alto Impacto',
    bio: 'Más de 5 años transformando negocios con datos. Convierte números en decisiones que mueven la aguja.',
    image: luisImage,
    linkedin: 'https://www.linkedin.com/in/lualreye/',
  },
  {
    id: 2,
    num: '02',
    name: 'Denisse Quimi',
    role: 'CMO & Estratega de Marketing Digital',
    bio: 'Arquitecta de marcas que conectan. Campañas de alto impacto que convierten audiencias en comunidades.',
    image: denisseImage,
    linkedin: 'https://www.linkedin.com/in/qneniis/',
  },
  {
    id: 3,
    num: '03',
    name: 'Diego Reyes',
    role: 'CTO & Director de Desarrollo Tecnológico',
    bio: 'Construye los sistemas que hacen posible lo imposible. Del código a la estrategia, siempre un paso adelante.',
    image: diegoImage,
    linkedin: 'https://www.linkedin.com/in/yeyodev1/',
  },
]

// ── GSAP ──────────────────────────────────────────────────────────────────────
let ctx: gsap.Context | null = null

onMounted(() => {
  const section = sectionRef.value
  const pin     = pinRef.value
  const track   = trackRef.value
  if (!section || !pin || !track) return

  ctx = gsap.context(() => {

    // ── 1. Intro: fade in al entrar en viewport ───────────────────────────────
    gsap.from('.team__intro-content > *', {
      y: 48,
      opacity: 0,
      stagger: 0.12,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
      },
    })

    // ── 2. Horizontal scroll pinning ─────────────────────────────────────────
    // GSAP pega `pinRef` al viewport y desplaza `trackRef` hacia la izquierda
    const hTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        pin: true,
        scrub: 1,
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    })

    // ── 3. Animaciones por panel (containerAnimation) ─────────────────────────
    // containerAnimation le dice a GSAP que el scroll que "dispara" el trigger
    // es el tween horizontal, no el scroll de página.
    const panels = track.querySelectorAll<HTMLElement>('.team__panel')

    panels.forEach((panel) => {
      const photo    = panel.querySelector<HTMLElement>('.team__panel-photo')
      const infoEls  = panel.querySelectorAll<HTMLElement>(
        '.team__panel-eyebrow, .team__panel-name, .team__panel-role, .team__panel-divider, .team__panel-bio, .team__panel-cta'
      )

      // Foto: ligero zoom out mientras el panel entra (parallax suave)
      if (photo) {
        gsap.fromTo(photo,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: hTween,
              start: 'left right',
              end: 'left left',
              scrub: true,
            },
          }
        )
      }

      // Info: stagger de entrada cuando el panel entra al 70 % del viewport
      if (infoEls.length) {
        gsap.from(infoEls, {
          x: 60,
          opacity: 0,
          stagger: 0.09,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: hTween,
            start: 'left 65%',
            once: true,
          },
        })
      }
    })

  }, section)
})

onUnmounted(() => {
  ctx?.revert()
})

const openLinkedIn = (url: string) =>
  window.open(url, '_blank', 'noopener,noreferrer')
</script>

<template>
  <section class="team" ref="sectionRef">

    <!-- ════════════════════════════════════════════════
         INTRO  — scroll vertical normal
         ════════════════════════════════════════════════ -->
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

    <!-- ════════════════════════════════════════════════
         PIN WRAPPER — este elemento queda fijo mientras
         se desplaza el track horizontalmente
         ════════════════════════════════════════════════ -->
    <div class="team__pin" ref="pinRef">
      <div class="team__track" ref="trackRef">

        <article
          v-for="member in members"
          :key="member.id"
          class="team__panel"
        >
          <!-- ── Lado foto ─────────────────────────── -->
          <div class="team__panel-photo-side">
            <div class="team__panel-photo-frame">
              <img
                class="team__panel-photo"
                :src="member.image"
                :alt="member.name"
                loading="lazy"
              />
              <div class="team__panel-photo-glow" aria-hidden="true" />
            </div>
          </div>

          <!-- ── Lado info ─────────────────────────── -->
          <div class="team__panel-info">
            <!-- Número de fondo (decorativo) -->
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

      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

// ─────────────────────────────────────────────────────────────────────────────
// Variables locales
// ─────────────────────────────────────────────────────────────────────────────
$panel-bg:     #0b0815;
$glass-border: rgba(255, 255, 255, 0.07);

// ─────────────────────────────────────────────────────────────────────────────
// Sección raíz
// ─────────────────────────────────────────────────────────────────────────────
.team {
  background-color: $panel-bg;
  position: relative;
}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO — sección vertical antes del scroll horizontal
// ─────────────────────────────────────────────────────────────────────────────
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

// ── Label ────────────────────────────────────────────────────────────────────
.team__label {
  @include fonts.accent-font(700);
  font-size: 0.75rem;
  color: colors.$BAKANO-PINK;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-bottom: 20px;
}

// ── Título ───────────────────────────────────────────────────────────────────
.team__title {
  @include fonts.heading-font(800);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  color: colors.$white;
  text-transform: uppercase;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 24px;

  @media (max-width: 600px) {
    font-size: clamp(2.2rem, 9vw, 3.2rem);
    br { display: none; }
  }

  &-gradient {
    background: linear-gradient(110deg, colors.$BAKANO-PINK 0%, colors.$BAKANO-PURPLE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

// ── Descripción ──────────────────────────────────────────────────────────────
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

// ── Hint de scroll horizontal ─────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// PIN WRAPPER — GSAP lo fija al viewport durante el scroll horizontal
// ─────────────────────────────────────────────────────────────────────────────
.team__pin {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

// ─────────────────────────────────────────────────────────────────────────────
// TRACK — flex row; GSAP anima su `x` para el scroll horizontal
// ─────────────────────────────────────────────────────────────────────────────
.team__track {
  display: flex;
  height: 100%;
  width: max-content;
  will-change: transform;
}

// ─────────────────────────────────────────────────────────────────────────────
// PANEL — cada tarjeta de fundador (100 vw × 100 vh)
// ─────────────────────────────────────────────────────────────────────────────
.team__panel {
  width: 100vw;
  height: 100%;
  display: grid;
  grid-template-columns: 44% 56%;
  background-color: $panel-bg;
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
    background: linear-gradient(
      180deg,
      transparent 0%,
      $glass-border 30%,
      $glass-border 70%,
      transparent 100%
    );
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 55% 45%;
    &::after { display: none; }
  }
}

// ── Lado foto ─────────────────────────────────────────────────────────────────
.team__panel-photo-side {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 48px 24px 48px 64px;
  position: relative;

  // Ambient glow lateral (decorativo)
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(colors.$BAKANO-PINK, 0.25) 40%,
      rgba(colors.$BAKANO-PURPLE, 0.2) 60%,
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 32px 24px 16px;
    align-items: center;
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

  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
    max-height: none;
    border-radius: 14px;
  }
}

.team__panel-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  // GSAP anima scale (parallax zoom)
  transform-origin: center center;
  display: block;
  filter: saturate(0.88) contrast(1.08);
}

// Gradient overlay inferior de la foto
.team__panel-photo-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba($panel-bg, 0.65) 100%
  );
  pointer-events: none;
  border-radius: inherit;
}

// ── Lado info ─────────────────────────────────────────────────────────────────
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

  @media (max-width: 768px) {
    padding: 24px;
    justify-content: flex-start;
  }
}

// Número decorativo de fondo
.team__panel-bg-num {
  position: absolute;
  right: -24px;
  bottom: -40px;
  font-size: clamp(10rem, 18vw, 16rem);
  font-weight: 900;
  line-height: 1;
  color: rgba(255, 255, 255, 0.025);
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.05em;
  @include fonts.heading-font(900);
}

// Eyebrow: "01 — Fundador"
.team__panel-eyebrow {
  @include fonts.accent-font(600);
  font-size: 0.72rem;
  color: colors.$BAKANO-PINK;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 20px;
}

// Nombre del fundador
.team__panel-name {
  @include fonts.heading-font(800);
  font-size: clamp(2.6rem, 4.5vw, 4.8rem);
  color: colors.$white;
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin: 0 0 20px;

  @media (max-width: 768px) {
    font-size: clamp(2.2rem, 8vw, 3.2rem);
  }
}

// Rol / cargo
.team__panel-role {
  @include fonts.body-font(400);
  font-size: 0.9rem;
  color: rgba(colors.$white, 0.5);
  line-height: 1.5;
  margin: 0 0 28px;
  max-width: 340px;
}

// Divisor
.team__panel-divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(90deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
  border-radius: 1px;
  margin-bottom: 24px;
}

// Bio
.team__panel-bio {
  @include fonts.body-font(400);
  font-size: 1rem;
  color: rgba(colors.$white, 0.72);
  line-height: 1.75;
  margin: 0 0 40px;
  max-width: 380px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 28px;
  }
}

// CTA LinkedIn
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
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;
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

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE — layout vertical, sin pin horizontal
// ─────────────────────────────────────────────────────────────────────────────
@media (max-width: 768px) {
  .team__pin {
    height: auto;
    overflow: visible;
  }

  .team__track {
    flex-direction: column;
    width: 100%;
    height: auto;
  }

  .team__panel {
    width: 100%;
    height: auto;
    min-height: 100vh;

    &::after { display: none; }
  }
}
</style>
