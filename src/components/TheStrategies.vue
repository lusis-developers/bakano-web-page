<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Animation state
const isVisible = ref(false)

// Función para abrir WhatsApp
const openWhatsApp = () => {
  window.open('https://wa.me/593984934039', '_blank', 'noopener,noreferrer')
}

onMounted(() => {
  // Trigger animations after component mount
  setTimeout(() => {
    isVisible.value = true
  }, 200)
})
</script>

<template>
  <section class="strategies" :class="{ 'strategies--visible': isVisible }">
    <div class="strategies__container">
      <!-- Header Section -->
      <div class="strategies__header">
        <h2 class="strategies__title">
          Estrategias basadas tu negocio sin
          <br>
          gastos recurrentes innecesarios
        </h2>
        <p class="strategies__subtitle">
          Atraemos datos
        </p>
      </div>

      <!-- Cards Section -->
      <div class="strategies__cards">
        <!-- Data Usage Card -->
        <div class="strategies__card strategies__card--data">
          <div class="strategies__card-header">
            <h3 class="strategies__card-title">
              USAMOS DATOS!
              <br>
              NO SUPOSICIONES
            </h3>
          </div>
          
          <div class="strategies__card-content">
            <p class="strategies__card-description">
              Diseñamos anuncios simples y efectivos en Meta Ads que comunican lo que tu cliente ya está buscando, sin necesidad de inventar combos al azar ni depender del contenido viral.
            </p>
            
            <ul class="strategies__card-features">
              <li class="strategies__card-feature">
                <span class="strategies__card-feature-icon">●</span>
                Campañas con Mensajes Validados por Datos
              </li>
              <li class="strategies__card-feature">
                <span class="strategies__card-feature-icon">●</span>
                Visibilidad Total de lo que Funciona
              </li>
              <li class="strategies__card-feature">
                <span class="strategies__card-feature-icon">●</span>
                Control en tus ventas mensuales
              </li>
            </ul>
            
            <button class="strategies__card-btn" @click="openWhatsApp">
              PREGUNTA CÓMO LO HACEMOS AQUÍ
            </button>
          </div>
        </div>

        <!-- Growth Card -->
        <div class="strategies__card strategies__card--growth">
          <div class="strategies__card-header">
            <h3 class="strategies__card-title">
              ATRAEMOS CRECIMIENTO
            </h3>
          </div>
          
          <div class="strategies__card-content">
            <p class="strategies__card-description">
              Analizamos tu facturación y comportamiento de consumo para identificar las oportunidades más rentables y las áreas donde estás perdiendo dinero sin darte cuenta.
            </p>
            
            <ul class="strategies__card-features">
              <li class="strategies__card-feature">
                <span class="strategies__card-feature-icon">●</span>
                Activación de estrategias digitales con Meta Ads
              </li>
              <li class="strategies__card-feature">
                <span class="strategies__card-feature-icon">●</span>
                Diagnóstico estratégico con tu historial de ventas
              </li>
              <li class="strategies__card-feature">
                <span class="strategies__card-feature-icon">●</span>
                Enfoque en resultados reales que impactan tu caja
              </li>
            </ul>
            
            <button class="strategies__card-btn" @click="openWhatsApp">
              PREGUNTA CÓMO LO HACEMOS AQUÍ
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../styles/fonts.modules.scss' as fonts;
@use '../styles/colorVariables.module.scss' as colors;

.strategies {
  min-height: 100vh;
  background: linear-gradient(135deg, colors.$BAKANO-DARK 0%, colors.$gray-900 100%);
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  
  // Mobile first approach
  @media (max-width: 768px) {
    padding: 80px 0;
    min-height: auto;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(colors.$BAKANO-PINK, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(colors.$BAKANO-PURPLE, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 2;
    
    @media (max-width: 768px) {
      padding: 0 16px;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 80px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
    
    @media (max-width: 768px) {
      margin-bottom: 60px;
    }
  }

  &__title {
    @include fonts.heading-font(700);
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: colors.$text-light;
    margin-bottom: 24px;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: clamp(1.8rem, 6vw, 2.5rem);
      margin-bottom: 16px;
      br {
        display: none;
      }
    }
  }

  &__subtitle {
    @include fonts.accent-font(600);
    font-size: 1.5rem;
    color: colors.$BAKANO-PINK;
    text-transform: uppercase;
    letter-spacing: 2px;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
      letter-spacing: 1px;
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    
    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    
    @media (max-width: 768px) {
      gap: 24px;
    }
  }

  &__card {
    background: rgba(colors.$white, 0.05);
    border: 1px solid rgba(colors.$BAKANO-PINK, 0.2);
    border-radius: 24px;
    padding: 48px;
    backdrop-filter: blur(20px);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out;
    
    @media (max-width: 768px) {
      padding: 32px 24px;
      border-radius: 20px;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-8px);
      border-color: rgba(colors.$BAKANO-PINK, 0.4);
      box-shadow: 0 20px 40px rgba(colors.$BAKANO-PINK, 0.1);
      
      &::before {
        opacity: 1;
      }
    }

    &--data {
      transition-delay: 0.2s;
    }

    &--growth {
      transition-delay: 0.4s;
    }
  }

  &__card-header {
    margin-bottom: 32px;
    
    @media (max-width: 768px) {
      margin-bottom: 24px;
    }
  }

  &__card-title {
    @include fonts.heading-font(700);
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: colors.$text-light;
    line-height: 1.3;
    margin-bottom: 0;
    
    @media (max-width: 768px) {
      font-size: clamp(1.3rem, 4vw, 1.6rem);
      br {
        display: none;
      }
    }
  }

  &__card-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    
    @media (max-width: 768px) {
      gap: 24px;
    }
  }

  &__card-description {
    @include fonts.body-font(400);
    font-size: 1.1rem;
    color: colors.$gray-300;
    line-height: 1.6;
    margin: 0;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  &__card-features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    @media (max-width: 768px) {
      gap: 12px;
    }
  }

  &__card-feature {
    @include fonts.body-font(500);
    font-size: 1rem;
    color: colors.$text-light;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    line-height: 1.5;
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
      gap: 10px;
    }
  }

  &__card-feature-icon {
    color: colors.$BAKANO-PINK;
    font-size: 0.8rem;
    margin-top: 4px;
    flex-shrink: 0;
  }

  &__card-btn {
    @include fonts.interface-font(600);
    background: linear-gradient(135deg, colors.$BAKANO-PINK 0%, colors.$BAKANO-PURPLE 100%);
    color: colors.$white;
    border: none;
    border-radius: 12px;
    padding: 18px 32px;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
      padding: 16px 24px;
      font-size: 0.9rem;
      border-radius: 10px;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(colors.$BAKANO-PINK, 0.3);
      
      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0);
    }
  }

  // Visibility animations
  &--visible {
    .strategies__header {
      opacity: 1;
      transform: translateY(0);
    }

    .strategies__card {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>