<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroContainer = ref<HTMLElement | null>(null)
const revealShape = ref<HTMLElement | null>(null)
const revealContent = ref<HTMLElement | null>(null)
const hugeTitle = ref<HTMLElement | null>(null)

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
    icon: '📈',
    title: 'Crecimiento Garantizado',
    description: 'Estrategias probadas que aumentan tu facturación hasta un 20%'
  },
  {
    icon: '🎯',
    title: 'Sin Dependencias',
    description: 'No necesitas agencias, campañas virales ni caos operativo'
  },
  {
    icon: '🚀',
    title: 'Resultados Rápidos',
    description: 'Ve el impacto en tu negocio desde el primer mes'
  },
  {
    icon: '💡',
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
  if (!heroContainer.value || !revealShape.value || !revealContent.value || !hugeTitle.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        end: '+=200%', // Scroll distance to complete animation
        scrub: 1, // Smooth scrubbing
        pin: true,
        anticipatePin: 1
      }
    })

    // Fase 1: Animar salida del título gigante
    tl.to(hugeTitle.value, {
      y: '-20vh',
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: 'power2.inOut'
    }, 0)

    // Fase 2: Escalar la forma magenta para revelar background oscuro
    tl.to(revealShape.value, {
      scale: 50, // Escalar masivamente para cubrir la pantalla
      rotation: 90,
      duration: 1.5,
      ease: 'power3.inOut'
    }, 0)

    // Fase 3: Aparición del contenido que estaba oculto en la forma escalada (ahora oscuro)
    tl.fromTo(revealContent.value, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, 1) // Inicia antes de que termine de escalar la forma

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
    <!-- Capa 1: Fondo claro y texto gigante (Estado Inicial) -->
    <div class="hero-huge__initial">
      <h1 class="hero-huge__title" ref="hugeTitle">
        <span class="block">TOMA EL</span>
        <span class="block highlight">CONTROL</span>
        <span class="block">CRECE</span>
        <span class="block">SMART.</span>
      </h1>
    </div>

    <!-- Capa 2: La forma geométrica animada (El 'Cubo' estilo Huge) -->
    <div class="hero-huge__shape-container">
      <div class="hero-huge__shape" ref="revealShape"></div>
    </div>

    <!-- Capa 3: El contenido revelado dentro/después de la forma -->
    <div class="hero-huge__revealed" ref="revealContent">
      <div class="hero-huge__revealed-inner">
        <div class="hero-huge__text">
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

        <div class="hero-huge__visuals">
          <div class="hero-huge__stat-card">
            <span class="stat-number">{{ stats[currentStat].number }}</span>
            <span class="stat-label">{{ stats[currentStat].label }}</span>
          </div>

          <div class="hero-huge__benefits-grid">
            <div 
              v-for="(benefit, index) in benefits" 
              :key="index"
              class="benefit-item"
            >
              <span class="benefit-icon">{{ benefit.icon }}</span>
              <h3 class="benefit-title">{{ benefit.title }}</h3>
              <p class="benefit-desc">{{ benefit.description }}</p>
            </div>
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
  background-color: colors.$BAKANO-LIGHT;
  color: colors.$BAKANO-DARK;
}

// ---------------------------------
// Capa 1: Intro Light
// ---------------------------------
.hero-huge__initial {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none; // Permite scroll sin interrupción
}

.hero-huge__title {
  @include fonts.heading-font(800);
  font-size: clamp(4rem, 12vw, 15rem); // Texto MASIVO estilo Huge Inc
  line-height: 0.85;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  text-align: center;
  margin: 0;

  .block {
    display: block;
  }

  .highlight {
    color: colors.$BAKANO-PRIMARY;
  }
}

// ---------------------------------
// Capa 2: Shape (El "Cubo" Magenta)
// ---------------------------------
.hero-huge__shape-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}

.hero-huge__shape {
  width: 10vw;
  height: 10vw;
  min-width: 100px;
  min-height: 100px;
  background-color: colors.$BAKANO-DARK; // Transiciona a Dark bg
  // Inicialmente forma un paralelogramo o polígono orgánico
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  transform-origin: center center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: colors.$BAKANO-PRIMARY;
    z-index: -1;
  }
}

// ---------------------------------
// Capa 3: Contenido Revelado
// ---------------------------------
.hero-huge__revealed {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: colors.$white;
  opacity: 0; // Oculto hasta que el scroll lo revela
}

.hero-huge__revealed-inner {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-huge__text {
  text-align: left;
}

.hero-huge__subtitle {
  @include fonts.heading-font(600);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.2;
  margin-bottom: 2rem;

  strong {
    color: colors.$BAKANO-PRIMARY;
  }
}

.hero-huge__desc {
  @include fonts.body-font(400);
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.btn--primary {
  @include fonts.body-font(700);
  background: colors.$BAKANO-PRIMARY;
  color: colors.$white;
  padding: 1.25rem 2.5rem;
  border: none;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: colors.$BAKANO-PURPLE;
  }
}

.hero-huge__note {
  @include fonts.body-font(400);
  font-size: 0.85rem;
  margin-top: 1rem;
  opacity: 0.7;
}

.hero-huge__visuals {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-huge__stat-card {
  background: rgba(colors.$white, 0.05);
  border-left: 4px solid colors.$BAKANO-PRIMARY;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.stat-number {
  @include fonts.heading-font(800);
  font-size: 4rem;
  display: block;
  color: colors.$BAKANO-PRIMARY;
  line-height: 1;
}

.stat-label {
  @include fonts.body-font(500);
  font-size: 1.1rem;
  opacity: 0.8;
  margin-top: 0.5rem;
  display: block;
}

.hero-huge__benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.benefit-item {
  background: rgba(colors.$white, 0.03);
  padding: 1.5rem;
  border-radius: 8px;

  .benefit-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: block;
  }

  .benefit-title {
    @include fonts.heading-font(700);
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .benefit-desc {
    @include fonts.body-font(400);
    font-size: 0.85rem;
    opacity: 0.7;
  }
}

// Responsive
@media (max-width: 900px) {
  .hero-huge__revealed-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-huge__text {
    text-align: center;
  }
}

@media (max-width: 600px) {
  .hero-huge__benefits-grid {
    grid-template-columns: 1fr;
  }

  .hero-huge__shape {
    clip-path: circle(50% at 50% 50%);
  }
}
</style>