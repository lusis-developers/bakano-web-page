<script setup lang="ts">
import { ref, nextTick } from 'vue'
import {
  useScrollAnimations,
  prefersReducedMotion,
  ScrollTrigger,
} from '@/composables/useScrollAnimations'
import { useContactModal } from '@/composables/useContactModal'
import { steps } from '@/data/home'

const sectionRef = ref<HTMLElement | null>(null)
const DESKTOP = '(min-width: 961px)'
// Se decide antes del primer render para que el pin mida el layout final
const pinned = ref(
  typeof window !== 'undefined' &&
    window.matchMedia(DESKTOP).matches &&
    !prefersReducedMotion() &&
    !navigator.webdriver,
)
const active = ref(0)
const { open: openContactModal } = useContactModal()

// Datos del panel: ilustrativos, para explicar el método (no son cifras de un cliente)
const leaks = [
  { label: 'Anuncios sin seguimiento', leak: true },
  { label: 'Mensajes de WhatsApp sin responder', leak: true },
  { label: 'Clientes que compran y no vuelven', leak: true },
  { label: 'Productos con buen margen', leak: false },
]
const variants = [
  { name: 'Anuncio A', copy: 'Oferta por tiempo limitado', value: 38 },
  { name: 'Anuncio B', copy: 'Testimonio de cliente', value: 92, winner: true },
  { name: 'Anuncio C', copy: 'Foto de producto', value: 24 },
]
const months = ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6']

// Recorrido fijo solo en desktop y con movimiento permitido. En mobile o con
// reduced-motion las tres escenas quedan apiladas y legibles, en su estado final.
useScrollAnimations(
  () => sectionRef.value,
  ({ gsap, mm }) => {
    if (navigator.webdriver) return

    mm.add(DESKTOP, () => {
      // Si se cruzó el breakpoint con la página abierta, re-medir tras el render
      if (!pinned.value) {
        pinned.value = true
        nextTick(() => ScrollTrigger.refresh())
      }
      const section = sectionRef.value!
      const scenes = gsap.utils.toArray<HTMLElement>('.journey__scene')
      const texts = gsap.utils.toArray<HTMLElement>('.journey__text')

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section.querySelector('.journey__stage'),
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const idx = Math.min(2, Math.floor(self.progress * 3))
            if (idx !== active.value) active.value = idx
          },
        },
      })

      gsap.set([...scenes.slice(1), ...texts.slice(1)], { autoAlpha: 0 })

      // ── Escena 1: diagnóstico — se detectan las fugas una a una
      tl.from('.journey__scene--1 .leak', { x: -24, autoAlpha: 0, stagger: 0.12, duration: 0.3 }, 0)
      tl.from(
        '.journey__scene--1 .leak__flag',
        { scale: 0, autoAlpha: 0, stagger: 0.12, duration: 0.2 },
        0.2,
      )
      tl.from('.journey__scene--1 .scan', { scaleX: 0, duration: 0.6, ease: 'none' }, 0)

      // Cambio 1 → 2
      tl.to(
        ['.journey__scene--1', '.journey__text--1'],
        { autoAlpha: 0, y: -30, duration: 0.25 },
        1,
      )
      tl.fromTo(
        ['.journey__scene--2', '.journey__text--2'],
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.25 },
        1.1,
      )

      // ── Escena 2: pruebas — crecen las barras, gana un anuncio y los otros se apagan
      tl.from(
        '.journey__scene--2 .variant__fill',
        { scaleX: 0, stagger: 0.08, duration: 0.45 },
        1.25,
      )
      tl.to(
        '.journey__scene--2 .variant:not(.variant--winner)',
        { opacity: 0.35, duration: 0.2 },
        1.7,
      )
      tl.from(
        '.journey__scene--2 .variant__badge',
        { scale: 0, autoAlpha: 0, duration: 0.2, ease: 'back.out(2)' },
        1.72,
      )

      // Cambio 2 → 3
      tl.to(
        ['.journey__scene--2', '.journey__text--2'],
        { autoAlpha: 0, y: -30, duration: 0.25 },
        2,
      )
      tl.fromTo(
        ['.journey__scene--3', '.journey__text--3'],
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.25 },
        2.1,
      )

      // ── Escena 3: escala — la curva se dibuja y suben las columnas
      tl.from('.journey__scene--3 .growth__bar', { scaleY: 0, stagger: 0.06, duration: 0.35 }, 2.25)
      tl.from(
        '.journey__scene--3 .growth__line',
        { strokeDashoffset: 1, duration: 0.6, ease: 'none' },
        2.25,
      )
      tl.from('.journey__scene--3 .growth__kpi', { y: 16, autoAlpha: 0, duration: 0.25 }, 2.6)
      tl.to({}, { duration: 0.3 }) // respiro antes de soltar el pin

      return () => {
        pinned.value = false
        active.value = 0
      }
    })
  },
)
</script>

<template>
  <div class="journey" :class="{ 'journey--pinned': pinned }" ref="sectionRef">
    <div class="journey__stage">
      <div class="journey__inner">
        <!-- Columna de texto -->
        <div class="journey__copy">
          <p class="eyebrow">Cómo trabajamos</p>
          <h2 class="journey__title">Tres pasos. Cero adivinanzas.</h2>

          <ol class="journey__progress" aria-hidden="true">
            <li
              v-for="(step, i) in steps"
              :key="step.number"
              :class="{ 'is-active': pinned && active === i, 'is-done': pinned && active > i }"
            >
              <span>{{ step.number }}</span> {{ step.title }}
            </li>
          </ol>

          <div class="journey__texts">
            <div
              v-for="(step, i) in steps"
              :key="step.number"
              class="journey__text"
              :class="`journey__text--${i + 1}`"
            >
              <h3>
                <span>{{ step.number }}</span> {{ step.title }}
              </h3>
              <p>{{ step.text }}</p>
              <p class="journey__outcome">
                <i class="fa-solid fa-check" aria-hidden="true"></i> {{ step.outcome }}
              </p>
            </div>
          </div>
        </div>

        <!-- Panel: las escenas -->
        <div class="journey__panel" aria-hidden="true">
          <div class="journey__panel-bar">
            <span></span><span></span><span></span>
            <p>Panel Bakano · ejemplo ilustrativo</p>
          </div>

          <div class="journey__scenes">
            <!-- 1. Diagnóstico -->
            <div class="journey__scene journey__scene--1">
              <p class="scene__title">Auditoría de tu negocio</p>
              <div class="scan"></div>
              <ul class="leaks">
                <li v-for="l in leaks" :key="l.label" class="leak">
                  <span>{{ l.label }}</span>
                  <span class="leak__flag" :class="{ 'leak__flag--ok': !l.leak }">
                    {{ l.leak ? 'Fuga de dinero' : 'Oportunidad' }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- 2. Pruebas -->
            <div class="journey__scene journey__scene--2">
              <p class="scene__title">Prueba de anuncios · esta semana</p>
              <ul class="variants">
                <li
                  v-for="v in variants"
                  :key="v.name"
                  class="variant"
                  :class="{ 'variant--winner': v.winner }"
                >
                  <div class="variant__head">
                    <strong>{{ v.name }}</strong>
                    <span>{{ v.copy }}</span>
                    <em v-if="v.winner" class="variant__badge">Ganador</em>
                  </div>
                  <div class="variant__track">
                    <div class="variant__fill" :style="{ width: v.value + '%' }"></div>
                  </div>
                </li>
              </ul>
              <p class="scene__note">Clientes conseguidos por cada anuncio</p>
            </div>

            <!-- 3. Escala -->
            <div class="journey__scene journey__scene--3">
              <p class="scene__title">Facturación mensual</p>
              <div class="growth">
                <div class="growth__bars">
                  <div v-for="(m, i) in months" :key="m" class="growth__col">
                    <div class="growth__bar" :style="{ height: 30 + i * 12 + '%' }"></div>
                    <span>{{ m }}</span>
                  </div>
                </div>
                <svg class="growth__svg" viewBox="0 0 600 200" preserveAspectRatio="none">
                  <path
                    class="growth__line"
                    pathLength="1"
                    d="M10 170 C 120 160, 180 140, 250 120 S 420 70, 590 20"
                  />
                </svg>
              </div>
              <div class="growth__kpi">
                <strong>hasta +20%</strong>
                <span>de facturación mensual con lo que ya demostró funcionar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="journey__cta">
        <p>El primer paso es gratis: revisamos tu caso y te decimos dónde está la oportunidad.</p>
        <button type="button" class="btn btn--primary" @click="openContactModal">
          Agendar mi diagnóstico
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;

.journey {
  background: $BAKANO-DARK;
  color: $white;
  border-top: 1px solid rgba($white, 0.06);

  &__stage {
    padding: clamp(72px, 9vw, 112px) 24px;
  }

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: clamp(32px, 6vw, 80px);
    align-items: center;
  }

  &__title {
    @include fonts.heading-font(800);
    margin: 0 0 28px;
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    line-height: 1.06;
    letter-spacing: -0.03em;
  }

  // Índice 01/02/03 (solo visible en modo recorrido)
  &__progress {
    display: none;
    gap: 8px;
    margin: 0 0 28px;
    padding: 0;
    list-style: none;

    li {
      @include fonts.interface-font(600);
      flex: 1;
      padding-top: 12px;
      border-top: 3px solid rgba($white, 0.12);
      font-size: 0.85rem;
      color: rgba($BAKANO-LIGHT, 0.45);
      transition:
        border-color 0.3s ease,
        color 0.3s ease;

      span {
        color: inherit;
        margin-right: 4px;
      }

      &.is-active {
        border-color: $BAKANO-PINK;
        color: $white;
      }

      &.is-done {
        border-color: rgba($BAKANO-PINK, 0.5);
        color: rgba($BAKANO-LIGHT, 0.7);
      }
    }
  }

  &__texts {
    display: grid;
    gap: 32px;
  }

  &__text {
    h3 {
      @include fonts.heading-font(800);
      margin: 0 0 10px;
      font-size: clamp(1.4rem, 2.2vw, 1.9rem);
      letter-spacing: -0.02em;

      span {
        color: $BAKANO-PINK;
        margin-right: 6px;
      }
    }

    p {
      @include fonts.body-font(400);
      margin: 0;
      max-width: 46ch;
      font-size: clamp(1rem, 1.3vw, 1.12rem);
      color: rgba($BAKANO-LIGHT, 0.72);
    }
  }

  p.journey__outcome {
    @include fonts.interface-font(700);
    margin-top: 16px;
    color: $white;

    i {
      color: $BAKANO-GREEN;
      margin-right: 4px;
    }
  }

  // ── Panel ───────────────────────────────────────────────────────────────────
  &__panel {
    border-radius: 24px;
    background: #221b2f;
    border: 1px solid rgba($white, 0.08);
    box-shadow: 0 40px 80px rgba(#000, 0.4);
    overflow: hidden;
  }

  &__panel-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 14px 18px;
    border-bottom: 1px solid rgba($white, 0.06);

    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba($white, 0.15);
    }

    p {
      @include fonts.interface-font(500);
      margin: 0 0 0 10px;
      font-size: 0.75rem;
      color: rgba($BAKANO-LIGHT, 0.45);
    }
  }

  &__scenes {
    display: grid;
  }

  &__scene {
    padding: 28px;
    border-bottom: 1px solid rgba($white, 0.06);

    &:last-child {
      border-bottom: 0;
    }
  }

  &__cta {
    box-sizing: border-box;
    max-width: 1200px;
    margin: clamp(40px, 6vw, 64px) auto 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: clamp(24px, 3vw, 32px);
    border-radius: 24px;
    background: linear-gradient(120deg, rgba($BAKANO-PINK, 0.18), rgba($BAKANO-PURPLE, 0.18));
    border: 1px solid rgba($BAKANO-PINK, 0.3);

    p {
      @include fonts.heading-font(600);
      margin: 0;
      max-width: 44ch;
      font-size: clamp(1.05rem, 1.5vw, 1.3rem);
      line-height: 1.35;
    }
  }

  // ── Modo recorrido (desktop): escena única, se cambian con el scroll ───────
  &--pinned {
    .journey__stage {
      min-height: 100vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-block: 88px 40px;
    }

    .journey__progress {
      display: flex;
    }

    .journey__texts,
    .journey__scenes {
      display: grid;

      > * {
        grid-area: 1 / 1;
      }
    }

    .journey__scene {
      border-bottom: 0;
      min-height: 340px;
    }

    .journey__cta {
      margin-top: 40px;
    }
  }

  @media (max-width: 960px) {
    &__inner {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    &__stage {
      padding-inline: 16px;
    }

    &__scene {
      padding: 20px;
    }

    &__cta .btn {
      width: 100%;
      justify-content: center;
    }
  }
}

// ── Piezas de las escenas ─────────────────────────────────────────────────────
.scene__title {
  @include fonts.interface-font(700);
  margin: 0 0 18px;
  font-size: 0.95rem;
  color: $white;
}

.scene__note {
  @include fonts.interface-font(500);
  margin: 16px 0 0;
  font-size: 0.78rem;
  color: rgba($BAKANO-LIGHT, 0.45);
}

.scan {
  height: 2px;
  margin-bottom: 16px;
  background: linear-gradient(90deg, $BAKANO-PINK, transparent);
  transform-origin: left;
}

.leaks {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.leak {
  @include fonts.interface-font(500);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba($white, 0.04);
  font-size: 0.92rem;
  color: rgba($BAKANO-LIGHT, 0.85);

  &__flag {
    @include fonts.interface-font(700);
    flex-shrink: 0;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba($BAKANO-PINK, 0.15);
    color: #ff6b8f;
    font-size: 0.72rem;

    &--ok {
      background: rgba($BAKANO-GREEN, 0.15);
      color: $BAKANO-GREEN;
    }
  }
}

.variants {
  display: grid;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.variant {
  &__head {
    @include fonts.interface-font(500);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    font-size: 0.88rem;

    strong {
      color: $white;
    }

    span {
      color: rgba($BAKANO-LIGHT, 0.55);
    }
  }

  &__badge {
    @include fonts.interface-font(700);
    margin-left: auto;
    padding: 3px 10px;
    border-radius: 999px;
    background: $BAKANO-GREEN;
    color: $BAKANO-DARK;
    font-size: 0.72rem;
    font-style: normal;
  }

  &__track {
    height: 12px;
    border-radius: 999px;
    background: rgba($white, 0.06);
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    border-radius: inherit;
    background: rgba($BAKANO-LIGHT, 0.35);
    transform-origin: left;
  }

  &--winner .variant__fill {
    background: linear-gradient(90deg, $BAKANO-PINK, #ff7a9c);
  }
}

.growth {
  position: relative;
  height: 200px;

  &__bars {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }

  &__col {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 6px;

    span {
      @include fonts.interface-font(500);
      font-size: 0.68rem;
      color: rgba($BAKANO-LIGHT, 0.45);
    }
  }

  &__bar {
    width: 100%;
    border-radius: 8px 8px 4px 4px;
    background: linear-gradient(180deg, rgba($BAKANO-PINK, 0.55), rgba($BAKANO-PURPLE, 0.35));
    transform-origin: bottom;
  }

  &__svg {
    position: absolute;
    inset: 0 0 22px;
    width: 100%;
    height: calc(100% - 22px);
    overflow: visible;
  }

  &__line {
    fill: none;
    stroke: $white;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
    vector-effect: non-scaling-stroke;
  }

  &__kpi {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;

    strong {
      @include fonts.heading-font(800);
      font-size: 1.8rem;
      color: $BAKANO-GREEN;
    }

    span {
      @include fonts.interface-font(500);
      font-size: 0.85rem;
      color: rgba($BAKANO-LIGHT, 0.6);
    }
  }
}
</style>
