<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Importar imágenes directamente
import imgMauro from '../assets/testimonios/mauro.webp'
import imgNicole from '../assets/testimonios/nicole.webp'
import imgMariaIsabel from '../assets/testimonios/mariaisabel.webp'

// Animation state
const isVisible = ref(false)

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Mauro Salgán',
    quote: 'Su estrategia rompió nuestro umbral de producción',
    image: imgMauro,
    videoUrl: 'https://www.instagram.com/p/DExquGpxwP_/',
    delay: '0.2s'
  },
  {
    id: 2,
    name: 'Nicole Robalino',
    quote: 'La cantidad de clientes hizo que se cayeran nuestros dispositivos de venta',
    image: imgNicole,
    videoUrl: 'https://www.instagram.com/p/DExquGpxwP_/',
    delay: '0.4s'
  },
  {
    id: 3,
    name: 'María Isabel Soriano',
    quote: 'Me hicieron dar cuenta de esquemas de mi negocio que nunca había considerado',
    image: imgMariaIsabel,
    videoUrl: 'https://drive.google.com/file/d/19QGvEoV9IbVBzMhprv61ER20XfjQMExk/view?usp=sharing',
    delay: '0.6s'
  }
]

onMounted(() => {
  // Trigger animations after component mount
  setTimeout(() => {
    isVisible.value = true
  }, 200)
})

const openVideo = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <section class="testimonials" :class="{ 'testimonials--visible': isVisible }">
    <div class="testimonials__container">
      <!-- Header Section -->
      <div class="testimonials__header">
        <p class="testimonials__label">TESTIMONIOS</p>
        <h2 class="testimonials__title">
          Algunos Testimonios de Nuestros
          <br>
          Clientes
        </h2>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials__grid">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.id"
          class="testimonials__card"
          :style="{ 'animation-delay': testimonial.delay }"
          @click="openVideo(testimonial.videoUrl)"
        >
          <!-- Quote -->
          <div class="testimonials__quote">
            <p class="testimonials__quote-text">
              "{{ testimonial.quote }}"
            </p>
          </div>

          <!-- Client Info -->
          <div class="testimonials__client">
            <div class="testimonials__client-image">
              <img 
                :src="testimonial.image" 
                :alt="testimonial.name"
                class="testimonials__client-photo"
              >
            </div>
            <h3 class="testimonials__client-name">
              {{ testimonial.name }}
            </h3>
          </div>

          <!-- Video Indicator -->
          <div class="testimonials__video-indicator">
            <div class="testimonials__play-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span class="testimonials__video-text">Video Testimonio</span>
          </div>

          <!-- Hover Overlay -->
          <div class="testimonials__overlay">
            <div class="testimonials__play-button">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../styles/fonts.modules.scss' as fonts;
@use '../styles/colorVariables.module.scss' as colors;

.testimonials {
  min-height: 100vh;
  background: linear-gradient(135deg, colors.$BAKANO-DARK 0%, colors.$gray-800 100%);
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
    background: radial-gradient(circle at 30% 70%, rgba(colors.$BAKANO-PURPLE, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(colors.$BAKANO-PINK, 0.08) 0%, transparent 50%);
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

  &__label {
    @include fonts.accent-font(600);
    font-size: 0.9rem;
    color: colors.$BAKANO-PINK;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 16px;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
      letter-spacing: 2px;
    }
  }

  &__title {
    @include fonts.heading-font(700);
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: colors.$text-light;
    margin-bottom: 0;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: clamp(1.8rem, 6vw, 2.5rem);
      br {
        display: none;
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    
    @media (max-width: 400px) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    background: rgba(colors.$white, 0.05);
    border: 1px solid rgba(colors.$BAKANO-PINK, 0.15);
    border-radius: 24px;
    padding: 40px 32px;
    backdrop-filter: blur(20px);
    position: relative;
    overflow: hidden;
    cursor: pointer;
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
      height: 3px;
      background: linear-gradient(90deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-12px);
      border-color: rgba(colors.$BAKANO-PINK, 0.3);
      box-shadow: 0 25px 50px rgba(colors.$BAKANO-PINK, 0.15);
      
      &::before {
        opacity: 1;
      }
      
      .testimonials__overlay {
        opacity: 1;
      }
      
      .testimonials__client-photo {
        transform: scale(1.05);
      }
    }
  }

  &__quote {
    margin-bottom: 32px;
    
    @media (max-width: 768px) {
      margin-bottom: 24px;
    }
  }

  &__quote-text {
    @include fonts.body-font(400);
    font-size: 1.1rem;
    color: colors.$gray-200;
    line-height: 1.6;
    margin: 0;
    font-style: italic;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  &__client {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    
    @media (max-width: 768px) {
      gap: 12px;
      margin-bottom: 20px;
    }
  }

  &__client-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(colors.$BAKANO-PINK, 0.3);
    position: relative;
    
    @media (max-width: 768px) {
      width: 70px;
      height: 70px;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
      border-radius: 50%;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }

  &__client-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &__client-name {
    @include fonts.heading-font(600);
    font-size: 1.2rem;
    color: colors.$text-light;
    margin: 0;
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  &__video-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    background: rgba(colors.$BAKANO-PINK, 0.1);
    border: 1px solid rgba(colors.$BAKANO-PINK, 0.3);
    border-radius: 25px;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
      padding: 10px 16px;
    }
  }

  &__play-icon {
    color: colors.$BAKANO-PINK;
    display: flex;
    align-items: center;
  }

  &__video-text {
    @include fonts.interface-font(500);
    font-size: 0.85rem;
    color: colors.$BAKANO-PINK;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(colors.$BAKANO-DARK, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 24px;
    
    @media (max-width: 768px) {
      border-radius: 20px;
    }
  }

  &__play-button {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: colors.$white;
    transform: scale(0.8);
    transition: transform 0.3s ease;
    
    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
    
    svg {
      margin-left: 4px;
    }
  }

  // Visibility animations
  &--visible {
    .testimonials__header {
      opacity: 1;
      transform: translateY(0);
    }

    .testimonials__card {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>