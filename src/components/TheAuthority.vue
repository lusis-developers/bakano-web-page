<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import logoI3lab    from '@/assets/autoridad/Logo i3lab.webp'
import logoImpulso  from '@/assets/autoridad/logo-impulso.png'
import logoPrendo   from '@/assets/autoridad/prendo-logo.png'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

const partners = [
  { id: 1, name: 'i3lab',   logo: logoI3lab,   url: 'https://www.i3lab.org/' },
  { id: 2, name: 'Impulso', logo: logoImpulso,  url: 'https://impulso.ecotec.edu.ec/' },
  { id: 3, name: 'UTPL',    logo: logoPrendo,   url: 'https://www.utpl.edu.ec/' },
]

let ctx: gsap.Context | null = null

onMounted(() => {
  const section = sectionRef.value
  if (!section) return

  ctx = gsap.context(() => {
    gsap.from('.authority__label, .authority__title, .authority__desc, .authority__divider', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
      },
    })

    gsap.from('.authority__logo-item', {
      y: 32,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.authority__logos',
        start: 'top 80%',
      },
    })
  }, section)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section class="authority" ref="sectionRef" aria-label="Instituciones que respaldan a Bakano">

    <div class="authority__inner">

      <!-- Eyebrow -->
      <p class="authority__label">Respaldo</p>

      <!-- Título -->
      <h2 class="authority__title">
        Instituciones que<br>
        <span class="authority__title-gradient">nos respaldan</span>
      </h2>

      <div class="authority__divider" aria-hidden="true" />

      <p class="authority__desc">
        Organizaciones e instituciones líderes que confían en nuestro trabajo
        y avalan nuestra metodología de crecimiento.
      </p>

      <!-- Logos -->
      <div class="authority__logos">
        <a
          v-for="partner in partners"
          :key="partner.id"
          :href="partner.url"
          :aria-label="`Visitar sitio de ${partner.name}`"
          target="_blank"
          rel="noopener noreferrer"
          class="authority__logo-item"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="authority__logo-img"
            loading="lazy"
          />
        </a>
      </div>

    </div>

    <!-- Glow de fondo decorativo -->
    <div class="authority__glow" aria-hidden="true" />

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.authority {
  background-color: #0b0815;
  position: relative;
  overflow: hidden;
  padding: 120px 24px;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
}

// Glow decorativo de fondo
.authority__glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 50%,
      rgba(colors.$BAKANO-PURPLE, 0.08) 0%,
      transparent 70%);
  pointer-events: none;
}

// Contenedor centrado
.authority__inner {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

// Eyebrow label
.authority__label {
  @include fonts.accent-font(700);
  font-size: 0.75rem;
  color: colors.$BAKANO-PINK;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-bottom: 20px;
}

// Título principal
.authority__title {
  @include fonts.heading-font(800);
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  color: colors.$white;
  text-transform: uppercase;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 32px;

  @media (max-width: 600px) {
    font-size: clamp(1.8rem, 7vw, 2.6rem);
  }

  &-gradient {
    background: linear-gradient(110deg, colors.$BAKANO-PINK 0%, colors.$BAKANO-PURPLE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

// Línea divisora
.authority__divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(90deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
  border-radius: 1px;
  margin-bottom: 24px;
}

// Descripción
.authority__desc {
  @include fonts.body-font(400);
  font-size: 1.05rem;
  color: rgba(colors.$white, 0.5);
  line-height: 1.7;
  max-width: 520px;
  margin: 0 0 72px;

  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin-bottom: 52px;
  }
}

// Grid de logos
.authority__logos {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 600px) {
    gap: 16px;
  }
}

// Cada ítem de logo
.authority__logo-item {
  text-decoration: none;
  cursor: pointer;
  flex: 1;
  min-width: 200px;
  max-width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 44px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.35s ease,
    background 0.35s ease,
    transform 0.3s ease,
    box-shadow 0.35s ease;

  // Shimmer line top
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(colors.$BAKANO-PINK, 0.4),
      transparent
    );
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  &:hover {
    border-color: rgba(colors.$BAKANO-PINK, 0.25);
    background: rgba(colors.$BAKANO-PINK, 0.04);
    transform: translateY(-6px);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(colors.$BAKANO-PINK, 0.08);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 32px 36px;
    min-width: 160px;
  }

  @media (max-width: 600px) {
    padding: 28px 28px;
    min-width: 140px;
  }
}

// Imagen del logo
.authority__logo-img {
  height: 72px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.65;
  transition:
    opacity 0.35s ease,
    filter 0.35s ease,
    transform 0.3s ease;

  .authority__logo-item:hover & {
    opacity: 1;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 56px;
    max-width: 160px;
  }

  @media (max-width: 600px) {
    height: 48px;
    max-width: 130px;
  }
}
</style>
