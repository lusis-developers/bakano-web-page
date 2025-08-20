<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Animaciones y estado reactivo
const isVisible = ref(false)
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

onMounted(() => {
  isVisible.value = true
  
  // Rotación de estadísticas
  setInterval(() => {
    currentStat.value = (currentStat.value + 1) % stats.length
  }, 3000)
})

const scrollToContact = () => {
  // Scroll suave hacia la sección de contacto
  const footer = document.querySelector('footer')
  footer?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <!-- Fondo con gradiente y elementos decorativos -->
    <div class="hero__background">
      <div class="hero__gradient"></div>
      <div class="hero__shapes">
        <div class="shape shape--1"></div>
        <div class="shape shape--2"></div>
        <div class="shape shape--3"></div>
      </div>
    </div>

    <div class="hero__container">
      <!-- Contenido principal -->
      <div class="hero__content" :class="{ 'hero__content--visible': isVisible }">
        <div class="hero__text">
          <h1 class="hero__title">
            Toma el control y
            <span class="hero__title--highlight">CRECE SMART</span>
          </h1>
          
          <p class="hero__subtitle">
            Ayudamos a Dueños de Negocios a Aumentar hasta un 
            <strong>20% su Facturación Mensual/Rentabilidad</strong>
          </p>
          
          <p class="hero__description">
            Sin depender de agencias, campañas virales, ni caos operativo.
            <br>
            <strong>Resultados medibles, crecimiento sostenible.</strong>
          </p>

          <!-- Estadística rotativa -->
          <div class="hero__stat">
            <div class="hero__stat-number">{{ stats[currentStat].number }}</div>
            <div class="hero__stat-label">{{ stats[currentStat].label }}</div>
          </div>

          <!-- CTA Principal -->
          <div class="hero__cta">
            <button class="btn btn--primary" @click="scrollToContact">
              <span>ESCALA MI NEGOCIO AHORA</span>
              <svg class="btn__icon" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <p class="hero__cta-note">
              ✅ Consulta gratuita • ✅ Sin compromisos • ✅ Resultados garantizados
            </p>
          </div>
        </div>

        <!-- Sección visual con beneficios -->
        <div class="hero__visual">
          <div class="hero__image-container">
            <!-- Imagen principal con overlay -->
            <div class="hero__main-image">
              <div class="hero__image-overlay">
                <div class="hero__success-badge">
                  <span class="hero__success-icon">🏆</span>
                  <div>
                    <div class="hero__success-title">Éxito Comprobado</div>
                    <div class="hero__success-subtitle">+150 negocios transformados</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cards de beneficios flotantes -->
            <div class="hero__floating-cards">
              <div 
                v-for="(benefit, index) in benefits" 
                :key="index"
                class="hero__benefit-card"
                :style="{ animationDelay: `${index * 0.2}s` }"
              >
                <div class="hero__benefit-icon">{{ benefit.icon }}</div>
                <div class="hero__benefit-content">
                  <h3 class="hero__benefit-title">{{ benefit.title }}</h3>
                  <p class="hero__benefit-description">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indicadores de confianza -->
      <div class="hero__trust" :class="{ 'hero__trust--visible': isVisible }">
        <div class="hero__trust-item">
          <span class="hero__trust-number">5.0</span>
          <div class="hero__trust-stars">⭐⭐⭐⭐⭐</div>
          <span class="hero__trust-label">Calificación promedio</span>
        </div>
        
        <div class="hero__trust-item">
          <span class="hero__trust-number">24h</span>
          <span class="hero__trust-label">Tiempo de respuesta</span>
        </div>
        
        <div class="hero__trust-item">
          <span class="hero__trust-number">100%</span>
          <span class="hero__trust-label">Satisfacción garantizada</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(colors.$BAKANO-PRIMARY, 0.1) 0%,
      rgba(colors.$BAKANO-PURPLE, 0.05) 50%,
      rgba(colors.$BAKANO-DARK, 0.8) 100%
    );
  }

  &__shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .shape {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(45deg, rgba(colors.$BAKANO-PRIMARY, 0.1), rgba(colors.$BAKANO-PURPLE, 0.1));
      animation: float 6s ease-in-out infinite;

      &--1 {
        width: 300px;
        height: 300px;
        top: 10%;
        right: 10%;
        animation-delay: 0s;
      }

      &--2 {
        width: 200px;
        height: 200px;
        bottom: 20%;
        left: 5%;
        animation-delay: 2s;
      }

      &--3 {
        width: 150px;
        height: 150px;
        top: 50%;
        left: 50%;
        animation-delay: 4s;
      }
    }
  }

  &__container {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;

    &--visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__text {
    color: white;
  }

  &__title {
    @include fonts.heading-font(800);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    
    &--highlight {
      background: linear-gradient(135deg, colors.$BAKANO-PRIMARY, colors.$BAKANO-PURPLE);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: block;
      animation: glow 2s ease-in-out infinite alternate;
    }
  }

  &__subtitle {
    @include fonts.body-font(600);
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    font-weight: 600;
    margin-bottom: 1rem;
    color: rgba(white, 0.95);
    
    strong {
      color: colors.$BAKANO-PRIMARY;
      font-weight: 700;
    }
  }

  &__description {
    @include fonts.body-font(400);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: rgba(white, 0.8);
    
    strong {
      color: white;
      font-weight: 600;
    }
  }

  &__stat {
    background: rgba(white, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(white, 0.2);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(colors.$BAKANO-PRIMARY, 0.3);
    }
  }

  &__stat-number {
    @include fonts.heading-font(800);
    font-size: 2.5rem;
    font-weight: 800;
    color: colors.$BAKANO-PRIMARY;
    display: block;
    animation: pulse 2s ease-in-out infinite;
  }

  &__stat-label {
    @include fonts.body-font(400);
    font-size: 0.9rem;
    color: rgba(white, 0.7);
    margin-top: 0.5rem;
  }

  &__cta {
    text-align: center;
  }

  &__cta-note {
    @include fonts.body-font(400);
    font-size: 0.9rem;
    color: rgba(white, 0.7);
    margin-top: 1rem;
  }

  &__visual {
    position: relative;
  }

  &__image-container {
    position: relative;
    height: 500px;
  }

  &__main-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(colors.$BAKANO-PRIMARY, 0.2), rgba(colors.$BAKANO-PURPLE, 0.2));
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    border: 2px solid rgba(white, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    }
  }

  &__image-overlay {
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 2;
  }

  &__success-badge {
    background: rgba(white, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: slideInRight 0.8s ease-out 0.5s both;
  }

  &__success-icon {
    font-size: 1.5rem;
  }

  &__success-title {
    @include fonts.heading-font(700);
    font-size: 0.9rem;
    font-weight: 700;
    color: colors.$BAKANO-DARK;
  }

  &__success-subtitle {
    @include fonts.body-font(400);
    font-size: 0.8rem;
    color: rgba(colors.$BAKANO-DARK, 0.7);
  }

  &__floating-cards {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  &__benefit-card {
    position: absolute;
    background: rgba(white, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1rem;
    max-width: 200px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: floatIn 0.8s ease-out both;

    &:nth-child(1) {
      top: 10%;
      left: -10%;
    }

    &:nth-child(2) {
      top: 30%;
      right: -15%;
    }

    &:nth-child(3) {
      bottom: 30%;
      left: -5%;
    }

    &:nth-child(4) {
      bottom: 10%;
      right: -10%;
    }
  }

  &__benefit-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  &__benefit-title {
    @include fonts.heading-font(700);
    font-size: 0.8rem;
    font-weight: 700;
    color: colors.$BAKANO-DARK;
    margin-bottom: 0.25rem;
  }

  &__benefit-description {
    @include fonts.body-font(400);
    font-size: 0.7rem;
    color: rgba(colors.$BAKANO-DARK, 0.7);
    line-height: 1.4;
  }

  &__trust {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 4rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out 0.3s;

    &--visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__trust-item {
    text-align: center;
    color: white;
  }

  &__trust-number {
    @include fonts.heading-font(700);
    font-size: 1.5rem;
    font-weight: 700;
    color: colors.$BAKANO-PRIMARY;
    display: block;
  }

  &__trust-stars {
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }

  &__trust-label {
    @include fonts.body-font(400);
    font-size: 0.8rem;
    color: rgba(white, 0.7);
  }
}

// Botón principal
.btn {
  @include fonts.body-font(700);
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &--primary {
    background: linear-gradient(135deg, colors.$BAKANO-PRIMARY, color.adjust(colors.$BAKANO-PRIMARY, $lightness: 10%));
    color: white;
    box-shadow: 0 8px 32px rgba(colors.$BAKANO-PRIMARY, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(colors.$BAKANO-PRIMARY, 0.4);
      background: linear-gradient(135deg, color.adjust(colors.$BAKANO-PRIMARY, $lightness: 5%), color.adjust(colors.$BAKANO-PRIMARY, $lightness: 15%));
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover &__icon {
    transform: translateX(4px);
  }
}

// Animaciones
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes glow {
  0% {
    text-shadow: 0 0 20px rgba(colors.$BAKANO-PRIMARY, 0.5);
  }
  100% {
    text-shadow: 0 0 30px rgba(colors.$BAKANO-PRIMARY, 0.8), 0 0 40px rgba(colors.$BAKANO-PURPLE, 0.3);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Responsive
@media (max-width: 1024px) {
  .hero {
    &__content {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }

    &__trust {
      gap: 2rem;
    }
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 90vh;
    
    &__container {
      padding: 1rem;
    }

    &__content {
      gap: 2rem;
    }

    &__image-container {
      height: 300px;
    }

    &__benefit-card {
      display: none; // Ocultar en móvil para mejor rendimiento
    }

    &__trust {
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }

    &__trust-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    &__trust-number {
      font-size: 1.2rem;
    }

    &__trust-label {
      font-size: 0.9rem;
    }
  }

  .btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero {
    &__stat {
      padding: 1rem;
    }

    &__stat-number {
      font-size: 2rem;
    }

    &__image-container {
      height: 250px;
    }
  }
}
</style>