<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimations } from '@/composables/useScrollAnimations'
import { strategySteps } from '@/data/strategies'
import StepCard from './strategies/StepCard.vue'
import StrategiesHeader from './strategies/StrategiesHeader.vue'
import StrategiesCta from './strategies/StrategiesCta.vue'
// Aurora abstracta generada con Higgsfield (grade de marca) — capa parallax
import bgAurora from '@/assets/backgrounds/strategies-aurora.webp'

const sectionRef = ref<HTMLElement | null>(null)

const scrollToContact = () => {
  const el = document.getElementById('contacto')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

useScrollAnimations(
  () => sectionRef.value,
  ({ gsap, mm }) => {
    gsap.fromTo('.strategies__header',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    )

    // Animación del botón volando y dando vueltas
    gsap.fromTo('.btn-header-contact',
      { x: window.innerWidth, rotation: 720, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        x: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'back.out(1.2)'
      }
    )

    gsap.fromTo('.step-card',
      { y: 64, opacity: 0, rotateX: 6, transformPerspective: 800 },
      {
        scrollTrigger: {
          trigger: '.strategies__grid',
          start: 'top 85%', // Iniciar cuando el grid aparece en pantalla
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out'
      }
    )

    // Wipe de revelado en los números 01/02/03
    gsap.fromTo('.step-card__number',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.strategies__grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out'
      }
    )

    // Aurora de fondo: deriva vertical + zoom sutil scrubbed (mobile y desktop,
    // amplitud menor en mobile — solo transform, barato en GPU)
    mm.add(
      { isDesktop: '(min-width: 769px)', isMobile: '(max-width: 768px)' },
      (mmCtx) => {
        const amp = mmCtx.conditions?.isMobile ? 6 : 12
        gsap.fromTo('.strategies__bg-img',
          { yPercent: -amp, scale: 1.15 },
          {
            yPercent: amp,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.value,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          }
        )
      }
    )

    // Parallax alternado por card mientras la sección cruza el viewport (solo desktop)
    mm.add('(min-width: 769px)', () => {
      gsap.utils.toArray<HTMLElement>('.step-card').forEach((card, i) => {
        gsap.to(card, {
          yPercent: i % 2 ? -4 : 4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
      })
    })

    gsap.fromTo('.cta-banner',
      { y: 50, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: '.strategies__footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      }
    )
  }
)
</script>

<template>
  <section class="strategies" ref="sectionRef">
    <!-- Aurora generada (Higgsfield) — capa decorativa con parallax de scroll -->
    <div class="strategies__bg" aria-hidden="true">
      <img :src="bgAurora" alt="" class="strategies__bg-img" loading="lazy" decoding="async" />
    </div>

    <div class="strategies__container">
      
      <!-- Header Section -->
      <StrategiesHeader @contact="scrollToContact" />

      <!-- Grid de Metodología (3 Pasos) -->
      <div class="strategies__grid">
        <StepCard v-for="step in strategySteps" :key="step.number" :step="step" />
      </div>

      <!-- CTA Section -->
      <div class="strategies__footer">
        <StrategiesCta @contact="scrollToContact" />
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../styles/fonts.modules.scss' as fonts;
@use '../styles/colorVariables.module.scss' as colors;

.strategies {
  // Translúcido: deja pasar el video-hilo global del homepage
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15vw 0;
  position: relative;
  overflow: hidden;

  // Aurora Higgsfield detrás de todo el contenido
  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;

    &::after {
      // Oscurece la aurora para que el contenido siga mandando
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
    }
  }

  &__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
    will-change: transform;
  }

  // Decoración abstracta de fondo para sofisticación "Tech/Silicon Valley"
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 30%, rgba(colors.$BAKANO-PINK, 0.05) 0%, transparent 30%),
      radial-gradient(circle at 70% 70%, rgba(colors.$BAKANO-PURPLE, 0.05) 0%, transparent 30%);
    pointer-events: none;
    z-index: 0;
  }

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 4vw;
    position: relative;
    z-index: 2;
  }

  // Header + botón → strategies/StrategiesHeader.vue

  // -------------------------
  // Grid de Cartas (Metodología)
  // -------------------------
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3vw;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 6vw;
    }
  }

  // Cartas → strategies/StepCard.vue

  // -------------------------
  // Footer CTA Banner (contenido → strategies/StrategiesCta.vue)
  // -------------------------
  &__footer {
    margin-top: 6vw;
    display: flex;
    justify-content: center;
    padding-bottom: 4vw; // Espacio extra al final de la sección
  }
}
</style>