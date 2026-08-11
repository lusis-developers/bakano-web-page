<script setup lang="ts">
import { cld, cldSrcset } from '@/utils/cloudinary'

// Sesión de estudio Karen Muñoz — retratos del equipo completo.
// Dos filas que se desplazan en sentidos opuestos: la fila superior avanza
// hacia la izquierda, la inferior hacia la derecha.
// dsc06453 / dsc06580 / dsc07071 quedan fuera: los usa TheTeam para los fundadores.
const ROW_TOP = [
  'dsc06427', 'dsc06501', 'dsc06577', 'dsc06674',
  'dsc06802', 'dsc06892', 'dsc06933', 'dsc06966',
  'dsc07037', 'dsc07089', 'dsc07120', 'dsc07213',
]

const ROW_BOTTOM = [
  'dsc06460', 'dsc06509', 'dsc06628', 'dsc06687',
  'dsc06821', 'dsc06918', 'dsc06939', 'dsc07005',
  'dsc07044', 'dsc07091', 'dsc07155', 'dsc07214',
]

// Las tarjetas miden 250 px como máximo; 300 px cubre 1x y el 2x del srcset, 600.
const CARD = 'c_fill,g_auto,w_300,h_400'

const toCard = (id: string) => {
  const publicId = `bakano/sesion-karen/${id}`
  return { id, src: cld(publicId, CARD), srcset: cldSrcset(publicId, CARD) }
}

const rowTop = ROW_TOP.map(toCard)
const rowBottom = ROW_BOTTOM.map(toCard)
</script>

<template>
  <section class="culture" aria-labelledby="culture-title">
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
      <div class="culture__row culture__row--left">
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

      <div class="culture__row culture__row--right">
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
  gap: clamp(14px, 1.6vw, 22px);

  &--left  { animation: culture-slide-left  72s linear infinite; }
  &--right { animation: culture-slide-right 88s linear infinite; }

  // Pausa al pasar el cursor: deja mirar una foto concreta
  .culture__marquee:hover & {
    animation-play-state: paused;
  }
}

.culture__strip {
  display: flex;
  gap: clamp(14px, 1.6vw, 22px);
  flex-shrink: 0;
}

.culture__card {
  margin: 0;
  flex-shrink: 0;
  width: clamp(150px, 17vw, 250px);
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 14px;
  background: #e4e1db;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.45s ease;

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
