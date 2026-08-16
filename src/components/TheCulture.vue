<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimations } from '@/composables/useScrollAnimations'
import { CULTURE_ROW_TOP, CULTURE_ROW_BOTTOM, toCultureCard } from '@/data/culture'

// Dos filas que se desplazan en sentidos opuestos: la superior hacia la
// izquierda, la inferior hacia la derecha.
const rowTop = CULTURE_ROW_TOP.map(toCultureCard)
const rowBottom = CULTURE_ROW_BOTTOM.map(toCultureCard)

// ── Marquee reactivo a la velocidad del scroll (solo desktop) ────────────────
// Reemplaza los keyframes CSS por un ticker GSAP: misma velocidad base, pero
// un flick de scroll acelera las filas y al soltar decaen a su ritmo normal.
const sectionRef = ref<HTMLElement | null>(null)
const rowLeftRef = ref<HTMLElement | null>(null)
const rowRightRef = ref<HTMLElement | null>(null)

useScrollAnimations(
  () => sectionRef.value,
  ({ gsap, ScrollTrigger, mm }) => {
    mm.add('(min-width: 769px)', () => {
      const left = rowLeftRef.value
      const right = rowRightRef.value
      if (!left || !right) return

      // Velocidad base en %/s — más lenta que los keyframes CSS (50% en ~110s / 130s):
      // las fotos deben poder mirarse; el scroll es lo que las acelera.
      const rows = [
        { el: left, dir: -1, base: 50 / 110 },
        { el: right, dir: 1, base: 50 / 130 },
      ]
      // Las tiras están duplicadas → el bucle envuelve entre -50% y 0%
      const wrap = gsap.utils.wrap(-50, 0)
      const pos = [0, -50]
      const hover = [1, 1]
      let boost = 0
      let active = false

      const st = ScrollTrigger.create({
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => { active = self.isActive },
        onUpdate: (self) => {
          boost = gsap.utils.clamp(-2.5, 2.5, self.getVelocity() / 400)
        },
      })
      active = st.isActive

      const enter = rows.map((_, i) => () => { hover[i] = 0 })
      const leave = rows.map((_, i) => () => { hover[i] = 1 })
      rows.forEach((row, i) => {
        row.el.classList.add('culture__row--js')
        row.el.addEventListener('pointerenter', enter[i])
        row.el.addEventListener('pointerleave', leave[i])
      })

      const tick = (_time: number, delta: number) => {
        if (!active) return
        boost = gsap.utils.interpolate(boost, 0, 0.08)
        rows.forEach((row, i) => {
          const speed =
            row.dir * row.base * (1 + Math.abs(boost) * 1.6) * hover[i]
          const kick = row.dir * boost * 0.06 * hover[i]
          pos[i] = wrap(pos[i] + speed * (delta / 1000) + kick)
          gsap.set(row.el, { xPercent: pos[i] })
        })
      }
      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
        st.kill()
        rows.forEach((row, i) => {
          row.el.removeEventListener('pointerenter', enter[i])
          row.el.removeEventListener('pointerleave', leave[i])
          row.el.classList.remove('culture__row--js')
          gsap.set(row.el, { clearProps: 'transform' })
        })
      }
    })
  }
)
</script>

<template>
  <section class="culture" aria-labelledby="culture-title" ref="sectionRef">
    <header class="culture__head">
      <p class="culture__eyebrow">El equipo completo</p>
      <h2 id="culture-title" class="culture__title">
        Estrategia, marketing<br />
        y tecnología<br />
        <span class="culture__title-mark">en la misma sala</span>
      </h2>
      <p class="culture__lede">
        Cada cuenta la trabaja un equipo, no un freelance rotando entre clientes.
        Estas son las personas que van a ejecutar tu plan.
      </p>
    </header>

    <div class="culture__marquee" role="list" aria-label="Retratos del equipo Bakano">
      <div class="culture__row culture__row--left" ref="rowLeftRef">
        <div class="culture__strip">
          <figure v-for="p in rowTop" :key="p.id" class="culture__card" role="listitem">
            <img
              class="culture__img"
              :src="p.src"
              :srcset="p.srcset"
              width="380"
              height="507"
              loading="lazy"
              decoding="async"
              alt="Integrante del equipo de Bakano en la sesión de estudio"
            />
          </figure>
        </div>
        <!-- Copia para el bucle continuo; oculta a lectores de pantalla -->
        <div class="culture__strip" aria-hidden="true">
          <figure v-for="p in rowTop" :key="`${p.id}-dup`" class="culture__card">
            <img class="culture__img" :src="p.src" :srcset="p.srcset" width="380" height="507"
              loading="lazy" decoding="async" alt="" />
          </figure>
        </div>
      </div>

      <div class="culture__row culture__row--right" ref="rowRightRef">
        <div class="culture__strip">
          <figure v-for="p in rowBottom" :key="p.id" class="culture__card" role="listitem">
            <img
              class="culture__img"
              :src="p.src"
              :srcset="p.srcset"
              width="380"
              height="507"
              loading="lazy"
              decoding="async"
              alt="Integrante del equipo de Bakano en la sesión de estudio"
            />
          </figure>
        </div>
        <div class="culture__strip" aria-hidden="true">
          <figure v-for="p in rowBottom" :key="`${p.id}-dup`" class="culture__card">
            <img class="culture__img" :src="p.src" :srcset="p.srcset" width="380" height="507"
              loading="lazy" decoding="async" alt="" />
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

// El amarillo de las vigas del estudio, muestreado de las fotos.
// Solo vive en esta sección: es el color que traen las imágenes.
$beam: #f0b90b;
$ink: #141019;

// ─────────────────────────────────────────────────────────────────────────────
// Sección: banda clara. Corta con el resto del sitio (oscuro) a propósito —
// es el mismo blanco del estudio donde se tomaron las fotos.
// ─────────────────────────────────────────────────────────────────────────────
.culture {
  position: relative;
  background: colors.$BAKANO-LIGHT;
  color: $ink;
  padding: clamp(80px, 11vw, 150px) 0 clamp(80px, 11vw, 140px);
  overflow: hidden;
}

// ── Encabezado ───────────────────────────────────────────────────────────────
.culture__head {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto clamp(48px, 6vw, 80px);
  padding-inline: clamp(24px, 6vw, 80px);
}

.culture__eyebrow {
  @include fonts.accent-font(700);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: rgba($ink, 0.58);
  margin: 0 0 18px;
}

.culture__title {
  @include fonts.heading-font(800);
  // El suelo baja a 1.75rem para que "ESTRATEGIA, MARKETING" quepa en 390 px
  font-size: clamp(1.75rem, 7vw, 4.6rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin: 0 0 24px;
  color: $ink;
}

// Barra amarilla bajo la última línea: el único sitio del sitio donde aparece
// el amarillo de las vigas del estudio.
.culture__title-mark {
  display: inline;
  padding-inline: 0.06em;
  background-image: linear-gradient($beam, $beam);
  background-repeat: no-repeat;
  background-size: 100% 0.26em;
  background-position: 0 88%;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.culture__lede {
  @include fonts.body-font(400);
  font-size: clamp(1rem, 1.5vw, 1.18rem);
  line-height: 1.7;
  color: rgba($ink, 0.68);
  max-width: 46ch;
  margin: 0;
}

// ── Marquesina ───────────────────────────────────────────────────────────────
.culture__marquee {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 1.6vw, 22px);

  // Desvanecido en los bordes para que las tiras no se corten en seco
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}

.culture__row {
  display: flex;
  width: max-content;
  gap: clamp(10px, 1.1vw, 16px);

  // La de arriba corre hacia la izquierda, la de abajo hacia la derecha
  &--left  { animation: culture-slide-left  110s linear infinite; }
  &--right { animation: culture-slide-right 130s linear infinite; }

  // Cuando el ticker GSAP toma el control (desktop), los keyframes CSS se apagan
  &--js {
    animation: none;
    will-change: transform;
  }

  // Pausa solo la fila señalada; la otra sigue corriendo
  &:hover {
    animation-play-state: paused;
  }

  // Foco: la foto señalada queda a plena luz y el resto de su fila cede
  &:hover .culture__card:not(:hover) {
    opacity: 0.45;
  }
}

.culture__strip {
  display: flex;
  gap: clamp(10px, 1.1vw, 16px);
  flex-shrink: 0;
}

.culture__card {
  margin: 0;
  flex-shrink: 0;
  width: clamp(190px, 21vw, 320px);
  aspect-ratio: 3 / 4;
  overflow: hidden;
  // Canto casi recto: lee como copia fotográfica, no como tarjeta de interfaz
  border-radius: 4px;
  background: #e4e1db;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.45s ease,
              opacity 0.4s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 24px 48px rgba($ink, 0.22);

    .culture__img {
      filter: none;
      transform: scale(1.04);
    }
  }
}

.culture__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  // Mismo tratamiento que los retratos de la sección de fundadores
  filter: saturate(0.9) contrast(1.04);
  transition: filter 0.45s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

// Las tiras se duplican, así que -50% deja el bucle sin costura
@keyframes culture-slide-left {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

@keyframes culture-slide-right {
  from { transform: translate3d(-50%, 0, 0); }
  to   { transform: translate3d(0, 0, 0); }
}

// ── Accesibilidad ────────────────────────────────────────────────────────────
@media (prefers-reduced-motion: reduce) {
  .culture__row {
    animation: none;
    transform: none;
  }

  // Sin animación, las filas se recorren a mano
  .culture__marquee {
    overflow-x: auto;
    mask-image: none;
    -webkit-mask-image: none;
  }

  .culture__card:hover {
    transform: none;
  }

  .culture__card:hover .culture__img {
    transform: none;
  }
}
</style>
