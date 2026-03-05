<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroContainer = ref<HTMLElement | null>(null)
const revealShape = ref<HTMLElement | null>(null)
const revealContent = ref<HTMLElement | null>(null)
const horizontalTrack = ref<HTMLElement | null>(null)

// Animaciones y estado reactivo
const currentStat = ref(0)

// Estadísticas que rotan
const stats = [
  { number: '20%', label: 'Aumento en Facturación' },
  { number: '150+', label: 'Negocios Transformados' },
  { number: '90%', label: 'Clientes Satisfechos' },
  { number: '24/7', label: 'Soporte Especializado' }
]

// Beneficios clave
const benefits = [
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Crecimiento Garantizado',
    description: 'Estrategias probadas que aumentan tu facturación hasta un 20%'
  },
  {
    icon: 'fa-solid fa-bullseye', // Sin Dependencias
    title: 'Sin Dependencias',
    description: 'No necesitas agencias, campañas virales ni caos operativo'
  },
  {
    icon: 'fa-solid fa-rocket',
    title: 'Resultados Rápidos',
    description: 'Ve el impacto en tu negocio desde el primer mes'
  },
  {
    icon: 'fa-solid fa-lightbulb',
    title: 'Soluciones Inteligentes',
    description: 'Tecnología avanzada adaptada a tu industria'
  }
]

let ctx: gsap.Context

onMounted(() => {
  // Rotación de estadísticas
  setInterval(() => {
    currentStat.value = (currentStat.value + 1) % stats.length
  }, 3000)

  // GSAP Scroll Animations
  if (!heroContainer.value || !revealShape.value || !revealContent.value || !horizontalTrack.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        end: '+=400%', // Scroll extendido
        scrub: 1.5, // Suavidad del scroll
        pin: true,
        anticipatePin: 1
      }
    })

    // Fase 1: Rotar y Escalar Masivamente el Cubo (Efecto Portal)
    tl.to(revealShape.value, {
      scale: 30, // Escalar masivamente para que cubra la pantalla y la sobrepase
      rotationY: 180, // Rotación 3D en el recorrido
      rotationZ: 90,
      duration: 2,
      ease: 'power2.inOut'
    }, 0)

    // Fase 2: El fondo del héroe debe volverse oscuro gradualmente (o ya lo era)

    // Fase 3: Aparición del contenido desde dentro del portal
    tl.fromTo(revealContent.value, {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, 1) // Inicia justo cuando el cubo es lo suficientemente grande

    // Fase 4: Scroll horizontal del track de beneficios
    // Mover horizontalmente según el ancho total de sus elementos hijos
    const getTrackWidth = () => horizontalTrack.value!.scrollWidth - window.innerWidth + (window.innerWidth * 0.2); // Padding extra compesation

    tl.to(horizontalTrack.value, {
      x: () => -getTrackWidth(),
      ease: 'none',
      duration: 2.5
    }, 2)

  }, heroContainer.value)
})

onUnmounted(() => {
  ctx?.revert()
})

const openWhatsApp = () => {
  window.open('https://wa.me/593984934039', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section class="hero-huge" ref="heroContainer">
    <!-- Capa 1: Contenedor 3D del Portal -->
    <div class="hero-huge__cube-container">
      <div class="hero-huge__cube" ref="revealShape">
        <!-- Contenido pseudo-video animado -->
        <h1 class="hero-huge__cube-title">BAKANO</h1>
      </div>
    </div>

    <!-- Capa 3: El contenido revelado (Horizontal Track) -->
    <div class="hero-huge__revealed" ref="revealContent">
      <div class="hero-huge__track" ref="horizontalTrack">
        
        <!-- Panel 1: Texto Masivo -->
        <div class="track-panel panel-intro">
          <p class="hero-huge__subtitle">
            Ayudamos a Dueños de Negocios a Aumentar hasta un<br/>
            <strong>20% su Facturación Mensual o Rentabilidad</strong>
          </p>
          <p class="hero-huge__desc">
            Sin depender de agencias, campañas virales, ni caos operativo.<br/>
            <strong>Resultados medibles, crecimiento sostenible.</strong>
          </p>

          <div class="hero-huge__cta">
            <button class="btn btn--primary" @click="openWhatsApp">
              <span>ESCALA MI NEGOCIO AHORA</span>
            </button>
            <p class="hero-huge__note">✅ Consulta gratuita • ✅ Sin compromisos</p>
          </div>
        </div>

        <!-- Panel 2: Estadísticas -->
        <div class="track-panel panel-stats">
          <div class="huge-stat-card">
            <span class="stat-number">{{ stats[currentStat].number }}</span>
            <span class="stat-label">{{ stats[currentStat].label }}</span>
          </div>
        </div>

        <!-- Panels 3+: Beneficios (Scroll Horizontal) -->
        <div class="track-panel panel-benefit" v-for="(benefit, index) in benefits" :key="index">
          <div class="huge-benefit-card">
            <span class="benefit-icon"><i :class="benefit.icon"></i></span>
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-desc">{{ benefit.description }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.hero-huge {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000; // Fondo absoluto estilo Huge Inc
  color: colors.$white;
}

// ---------------------------------
// Capa 1: Cubo 3D (Portal)
// ---------------------------------
.hero-huge__cube-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  perspective: 1000px;
  pointer-events: none; // Evitar bloquear clicks de otras capas
}

@keyframes fluidGradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.hero-huge__cube {
  position: relative;
  width: 30vw;
  height: 30vw;
  min-width: 250px;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  will-change: transform;

  // Fondo simulando video abstracto con degradado potente
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    // Efecto "video" dinámico
    background: linear-gradient(-45deg, colors.$BAKANO-PINK, #ff00cc, #3300ff, colors.$BAKANO-PURPLE);
    background-size: 400% 400%;
    animation: fluidGradient 6s ease infinite;
    z-index: 0;
  }
}

.hero-huge__cube-title {
  position: relative;
  z-index: 1;
  @include fonts.heading-font(800);
  font-size: clamp(3rem, 6vw, 8rem);
  color: colors.$white;
  letter-spacing: -0.05em;
  margin: 0;
}

// ---------------------------------
// Capa 3: Contenido Revelado (Horizontal Scroll)
// ---------------------------------
.hero-huge__revealed {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  color: colors.$white;
  opacity: 0; // Oculto hasta que el scroll lo revela
  overflow: hidden; // Prevenir barras de scroll reales
  display: flex;
  align-items: center;
}

.hero-huge__track {
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  height: 100vh;
  align-items: center;
  padding: 0 10vw; // padding inicial y final para centrado
  gap: 8vw;
}

.track-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

// Panel 1: Texto Masivo
.panel-intro {
  width: 800px;

  .hero-huge__subtitle {
    @include fonts.heading-font(800);
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.1;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;

    strong {
      color: colors.$BAKANO-PRIMARY;
    }
  }

  .hero-huge__desc {
    @include fonts.body-font(400);
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    line-height: 1.5;
    opacity: 0.9;
    margin-bottom: 3rem;

    strong {
      color: colors.$white;
      font-weight: 700;
      background: rgba(colors.$BAKANO-PRIMARY, 0.2);
    }
  }

  .hero-huge__cta {
    margin-top: 2rem;
  }
}

.btn--primary {
  @include fonts.body-font(700);
  background: colors.$BAKANO-PRIMARY;
  color: colors.$white;
  padding: 1.5rem 3rem;
  border: none;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: colors.$BAKANO-PURPLE;
    box-shadow: 0 20px 40px rgba(colors.$BAKANO-PRIMARY, 0.4);
  }
}

.hero-huge__note {
  @include fonts.body-font(500);
  font-size: 0.95rem;
  margin-top: 1.5rem;
  opacity: 0.7;
}

// Panel 2: Estadísticas enormes
.panel-stats {
  width: 500px;
  display: flex;
  justify-content: center;
}

.huge-stat-card {
  background: colors.$BAKANO-PRIMARY;
  border-radius: 30px;
  padding: 5rem 3rem;
  text-align: center;
  box-shadow: 0 30px 60px rgba(colors.$BAKANO-PRIMARY, 0.3);
  width: 100%;

  .stat-number {
    @include fonts.heading-font(800);
    font-size: clamp(4rem, 8vw, 7rem);
    color: colors.$white;
    line-height: 1;
    display: block;
    margin-bottom: 1rem;
    text-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .stat-label {
    @include fonts.body-font(600);
    font-size: 1.5rem;
    color: rgba(colors.$white, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

// Panel 3+: Beneficios masivos
.panel-benefit {
  width: 450px;

  .huge-benefit-card {
    background: rgba(colors.$white, 0.03);
    border: 1px solid rgba(colors.$white, 0.1);
    border-radius: 30px;
    padding: 4rem 3rem;
    height: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 0.4s ease, background 0.4s ease, border-color 0.4s ease;

    &:hover {
      background: rgba(colors.$white, 0.08);
      transform: translateY(-15px);
      border-color: colors.$BAKANO-PURPLE;
      box-shadow: 0 30px 60px rgba(colors.$BAKANO-PURPLE, 0.2);
    }

    .benefit-icon {
      font-size: 5rem;
      color: colors.$BAKANO-PINK; // Usar rosa llamativo
      margin-bottom: 2.5rem;
      transition: transform 0.3s ease;
    }

    &:hover .benefit-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .benefit-title {
      @include fonts.heading-font(800);
      font-size: 2.5rem;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: colors.$text-light;
    }

    .benefit-desc {
      @include fonts.body-font(400);
      font-size: 1.25rem;
      opacity: 0.8;
      line-height: 1.6;
      color: colors.$gray-200;
    }
  }
}

// Responsive
@media (max-width: 1024px) {
  .hero-huge__track {
    gap: 6vw;
  }

  .panel-intro {
    width: 600px;
  }

  .panel-stats {
    width: 400px;
  }

  .panel-benefit {
    width: 400px;
  }
}

@media (max-width: 768px) {
  .hero-huge__track {
    gap: 15vw;
    padding: 0 5vw;
  }

  .panel-intro {
    width: 85vw;
  }

  .panel-stats {
    width: 85vw;
  }

  .panel-benefit {
    width: 85vw;
  }

  .btn--primary {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .hero-huge__cube {
    width: 60vw;
    height: 60vw;
  }
}
</style>