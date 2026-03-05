<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import TestimonialCard from './TestimonialCard.vue'

import imgMauro from '../assets/testimonios/mauro.webp'
import imgJohanna from '../assets/testimonios/johanna.png'
import imgMariaIsabel from '../assets/testimonios/mariaisabel.webp'
import bgVideo from '../assets/hero/IMG_9668.mp4'

gsap.registerPlugin(ScrollTrigger)

// ── Refs del DOM ────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null)
const videoRef  = ref<HTMLVideoElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

// Refs individuales de cada wrapper de tarjeta (para stagger de GSAP)
const cardEls = ref<HTMLElement[]>([])
const setCardRef = (el: unknown, i: number) => {
  if (el instanceof HTMLElement) cardEls.value[i] = el
}

// ── Datos ───────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    name: 'Mauro Salgán',
    quote: 'Su estrategia rompió nuestro umbral de producción',
    image: imgMauro,
    videoUrl: 'https://www.instagram.com/p/DExquGpxwP_/',
  },
  {
    id: 2,
    name: 'Johanna Quezada',
    quote: 'Teníamos una desorganización total en nuestros cuatros restaurantes, al momento que llegó Bakano, todo cambió',
    image: imgJohanna,
    videoUrl: 'https://www.instagram.com/p/DMtdBuMup4k',
  },
  {
    id: 3,
    name: 'María Isabel Soriano',
    quote: 'Me hicieron dar cuenta de esquemas de mi negocio que nunca había considerado',
    image: imgMariaIsabel,
    videoUrl: 'https://drive.google.com/file/d/19QGvEoV9IbVBzMhprv61ER20XfjQMExk/view?usp=sharing',
  },
]

// ── GSAP context (limpia todo en onUnmounted) ───────────────────────────────
let ctx: gsap.Context | null = null

onMounted(() => {
  const video   = videoRef.value
  const section = sectionRef.value
  if (!video || !section) return

  video.pause()
  video.currentTime = 0

  const setup = () => {
    video.pause()
    const header = headerRef.value
    if (!header) return

    ctx = gsap.context(() => {
      /**
       * Proxy para scrubbing del video.
       * GSAP tween su propiedad currentTime y nosotros la transferimos al
       * elemento <video>.  Esto es el patrón oficial de GSAP para video scrub.
       */
      const videoProxy = { currentTime: 0 }

      /**
       * Timeline principal sincronizada con el scroll.
       * scrub: 1 → 1 s de lag para suavizar cambios bruscos de scroll.
       *
       * El "tiempo" del timeline está normalizado [0 → 1]:
       *   0.00 → 0.40  Header sube desde el centro al top
       *   0.38 → 0.79  Cards aparecen con stagger
       *   0.00 → 1.00  Video avanza / retrocede con el scroll
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end:   'bottom bottom',
          scrub: 1,
        },
      })

      // 1 ─ Video scrub (rango completo 0 → 100 % del scroll)
      tl.fromTo(
        videoProxy,
        { currentTime: 0 },
        {
          currentTime: video.duration,
          ease: 'none',
          duration: 1,
          onUpdate() { video.currentTime = videoProxy.currentTime },
        },
        0,
      )

      // 2 ─ Título: parte centrado (y ≈ 40 vh) y sube al top (y = 0)
      //    Ocupa los primeros 40 % del recorrido de scroll
      tl.fromTo(
        header,
        { y: '40vh' },
        { y: 0, ease: 'power2.out', duration: 0.4 },
        0,
      )

      // 3 ─ Tarjetas: aparecen con stagger desde el 38 % al ~80 %
      //    (card 1: 38-63 %, card 2: 46-71 %, card 3: 54-79 %)
      tl.fromTo(
        cardEls.value,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.25 },
        0.38,
      )
    }, section)
  }

  // readyState >= 1 → HAVE_METADATA, video.duration ya disponible
  if (video.readyState >= 1) {
    setup()
  } else {
    video.addEventListener('loadedmetadata', setup, { once: true })
  }
})

onUnmounted(() => {
  // gsap.context.revert() limpia tweens + ScrollTriggers del contexto
  ctx?.revert()
})

const openVideo = (url: string) => window.open(url, '_blank')
</script>

<template>
  <!--
    La sección ocupa 500 vh para dar recorrido al scroll.
    El contenedor .testimonials__sticky queda "pegado" arriba durante
    todo ese scroll, creando el efecto de cámara/video controlada por scroll.
  -->
  <section class="testimonials" ref="sectionRef">
    <div class="testimonials__sticky">

      <!-- Video de fondo — currentTime controlado por GSAP + scroll -->
      <video ref="videoRef" class="testimonials__video" muted playsinline preload="auto">
        <source :src="bgVideo" type="video/mp4" />
      </video>

      <!-- Gradiente de legibilidad -->
      <div class="testimonials__gradient" aria-hidden="true" />

      <!-- Capa de contenido -->
      <div class="testimonials__ui">

        <!-- ── Título ──────────────────────────────────────────
             Empieza centrado en pantalla (y: 40vh vía GSAP)
             y sube al top durante el primer 40 % del scroll.    -->
        <header class="testimonials__header" ref="headerRef">
          <p class="testimonials__label">Testimonios</p>
          <h2 class="testimonials__title">
            Lo que dicen<br>nuestros clientes
          </h2>
        </header>

        <!-- ── Grid de tarjetas ───────────────────────────────
             Cada wrapper es animado individualmente por GSAP
             con stagger, separando la lógica visual del componente. -->
        <div class="testimonials__grid">
          <div
            v-for="(testimonial, i) in testimonials"
            :key="testimonial.id"
            :ref="(el) => setCardRef(el, i)"
            class="testimonials__card-wrapper"
          >
            <TestimonialCard :testimonial="testimonial" @open-video="openVideo" />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../styles/fonts.modules.scss' as fonts;
@use '../styles/colorVariables.module.scss' as colors;

// ─────────────────────────────────────────────────────────────────
// Sección principal — 500 vh de recorrido total de scroll
// ─────────────────────────────────────────────────────────────────
.testimonials {
  position: relative;
  height: 500vh;

  // ── Contenedor sticky ──────────────────────────────────────────
  // "overflow: clip" recorta el video sin crear un nuevo contexto
  // de scroll, lo que permite que el scroll de la página siga
  // funcionando normalmente para el ScrollTrigger.
  &__sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: clip;
    background-color: #000;
  }

  // ── Video ──────────────────────────────────────────────────────
  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.55;
  }

  // ── Gradiente oscuro para legibilidad ──────────────────────────
  &__gradient {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      175deg,
      rgba(colors.$BAKANO-DARK, 0.15) 0%,
      rgba(#000, 0.78) 100%
    );
  }

  // ── Capa de UI (título + cards) ────────────────────────────────
  &__ui {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    // El padding-top da el "tope" donde el título se detiene al subir
    padding: 56px 24px 32px;
    gap: 44px;

    @media (max-width: 768px) {
      padding: 48px 16px 24px;
      gap: 32px;
    }
  }

  // ── Header / título ────────────────────────────────────────────
  // GSAP anima la propiedad `y` (inicia en 40vh, termina en 0)
  &__header {
    width: 100%;
    max-width: 820px;
    text-align: center;
    flex-shrink: 0;
  }

  &__label {
    @include fonts.accent-font(700);
    font-size: 0.78rem;
    color: colors.$BAKANO-PINK;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin-bottom: 14px;

    @media (max-width: 768px) {
      font-size: 0.72rem;
      letter-spacing: 4px;
    }
  }

  &__title {
    @include fonts.heading-font(800);
    font-size: clamp(2.6rem, 5.5vw, 5rem);
    color: colors.$white;
    text-transform: uppercase;
    line-height: 1.06;
    letter-spacing: -0.025em;
    margin: 0;

    @media (max-width: 768px) {
      font-size: clamp(2rem, 8vw, 3rem);

      br { display: none; }
    }
  }

  // ── Grid de tarjetas ──────────────────────────────────────────
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1160px;

    // Tablet: 2 columnas
    @media (max-width: 1024px) and (min-width: 601px) {
      grid-template-columns: repeat(2, 1fr);
    }

    // Mobile: carrusel horizontal
    @media (max-width: 600px) {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: visible;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      gap: 16px;
      padding-bottom: 4px;

      &::-webkit-scrollbar { display: none; }
    }
  }

  &__card-wrapper {
    // GSAP anima opacity y y de este wrapper
    will-change: transform, opacity;

    @media (max-width: 600px) {
      flex: 0 0 82vw;
      scroll-snap-align: center;
    }
  }
}
</style>
