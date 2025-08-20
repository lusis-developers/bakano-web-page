<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Importar imágenes del equipo
import luisImage from '@/assets/team/luis.webp'
import denisseImage from '@/assets/team/denisse.webp'
import diegoImage from '@/assets/team/diego.webp'

// Datos del equipo
const teamMembers = ref([
  {
    id: 1,
    name: 'Luis Reyes',
    role: 'Founder & Estratega de Datos y Decisiones de Alto Impacto',
    image: luisImage,
    linkedin: 'https://www.linkedin.com/in/lualreye/',
    description: 'Desarrollador Frontend con 5+ años de experiencia en MEVN stack. Especialista en transformación digital y optimización de procesos.'
  },
  {
    id: 2,
    name: 'Denisse Quimi',
    role: 'CMO & Estratega de Marketing Digital',
    image: denisseImage,
    linkedin: 'https://www.linkedin.com/in/qneniis/',
    description: 'Experta en marketing digital y estrategias de crecimiento. Especializada en campañas de alto impacto y análisis de mercado.'
  },
  {
    id: 3,
    name: 'Diego Reyes',
    role: 'CTO & Director de Desarrollo Tecnológico',
    image: diegoImage,
    linkedin: 'https://www.linkedin.com/in/yeyodev1/',
    description: 'Arquitecto de software y líder técnico. Especialista en desarrollo de aplicaciones escalables y tecnologías emergentes.'
  }
])

// Animaciones de entrada
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// Función para abrir LinkedIn
const openLinkedIn = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section class="team" :class="{ 'team--visible': isVisible }">
    <div class="team__container">
      <!-- Header de la sección -->
      <div class="team__header">
        <span class="team__subtitle">NUESTRO TEAM</span>
        <h2 class="team__title">
          Conoce al Equipo que Impulsa
          <span class="team__title-highlight">tu Crecimiento</span>
        </h2>
        <p class="team__description">
          Un equipo multidisciplinario de expertos comprometidos con transformar 
          tu negocio a través de estrategias innovadoras y tecnología de vanguardia.
        </p>
      </div>

      <!-- Grid del equipo -->
      <div class="team__grid">
        <div 
          v-for="(member, index) in teamMembers" 
          :key="member.id"
          class="team__card"
          :style="{ '--delay': `${index * 0.2}s` }"
          @click="openLinkedIn(member.linkedin)"
        >
          <div class="team__card-image">
            <img 
              :src="member.image" 
              :alt="member.name"
              class="team__image"
            >
            <div class="team__card-overlay">
              <div class="team__linkedin-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                </svg>
              </div>
              <span class="team__view-profile">Ver Perfil</span>
            </div>
          </div>
          
          <div class="team__card-content">
            <h3 class="team__member-name">{{ member.name }}</h3>
            <p class="team__member-role">{{ member.role }}</p>
            <p class="team__member-description">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.team {
  padding: 120px 0;
  background: linear-gradient(
    135deg,
    colors.$BAKANO-DARK 0%,
    colors.$gray-900 50%,
    colors.$BAKANO-DARK 100%
  );
  position: relative;
  overflow: hidden;
  
  // Efectos de fondo
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: -10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(colors.$BAKANO-PINK, 0.15) 0%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(60px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(colors.$BAKANO-PURPLE, 0.12) 0%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(80px);
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 2;
  }

  &__header {
    text-align: center;
    margin-bottom: 80px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  &__subtitle {
    display: inline-block;
    font-family: fonts.$font-secondary;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: colors.$BAKANO-PINK;
    margin-bottom: 16px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background: linear-gradient(
        90deg,
        colors.$BAKANO-PINK,
        colors.$BAKANO-PURPLE
      );
      border-radius: 1px;
    }
  }

  &__title {
    font-family: fonts.$font-principal;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    line-height: 1.2;
    color: colors.$white;
    margin-bottom: 24px;
    
    &-highlight {
      background: linear-gradient(
        135deg,
        colors.$BAKANO-PINK,
        colors.$BAKANO-PURPLE
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__description {
    font-family: fonts.$font-secondary;
    font-size: 18px;
    line-height: 1.6;
    color: colors.$gray-300;
    max-width: 600px;
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  &__card {
    background: rgba(colors.$white, 0.05);
    border: 1px solid rgba(colors.$white, 0.1);
    border-radius: 24px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.4s ease;
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(40px);
    animation-delay: var(--delay);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(colors.$BAKANO-PINK, 0.1) 0%,
        rgba(colors.$BAKANO-PURPLE, 0.05) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 24px;
    }
    
    &:hover {
      transform: translateY(-8px);
      border-color: rgba(colors.$BAKANO-PINK, 0.3);
      box-shadow: 
        0 20px 40px rgba(colors.$BAKANO-DARK, 0.3),
        0 0 0 1px rgba(colors.$BAKANO-PINK, 0.2);
      
      &::before {
        opacity: 1;
      }
      
      .team__card-overlay {
        opacity: 1;
      }
      
      .team__image {
        transform: scale(1.05);
      }
    }
  }

  &__card-image {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 24px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(colors.$BAKANO-PINK, 0.3);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &__card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(colors.$BAKANO-DARK, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }

  &__linkedin-icon {
    color: colors.$white;
    margin-bottom: 8px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__view-profile {
    font-family: fonts.$font-secondary;
    font-size: 12px;
    font-weight: 600;
    color: colors.$white;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__card-content {
    position: relative;
    z-index: 2;
  }

  &__member-name {
    font-family: fonts.$font-principal;
    font-size: 24px;
    font-weight: 700;
    color: colors.$white;
    margin-bottom: 8px;
  }

  &__member-role {
    font-family: fonts.$font-secondary;
    font-size: 16px;
    font-weight: 600;
    color: colors.$BAKANO-PINK;
    margin-bottom: 16px;
    line-height: 1.4;
  }

  &__member-description {
    font-family: fonts.$font-secondary;
    font-size: 14px;
    line-height: 1.5;
    color: colors.$gray-300;
  }

  // Animaciones de entrada
  &--visible {
    .team__header {
      opacity: 1;
      transform: translateY(0);
    }
    
    .team__card {
      opacity: 1;
      transform: translateY(0);
      animation: slideInUp 0.8s ease forwards;
    }
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive
@media (max-width: 768px) {
  .team {
    padding: 80px 0;
    
    &__container {
      padding: 0 16px;
    }
    
    &__header {
      margin-bottom: 60px;
    }
    
    &__card {
      padding: 24px;
    }
    
    &__card-image {
      width: 100px;
      height: 100px;
    }
    
    &__member-name {
      font-size: 20px;
    }
    
    &__member-role {
      font-size: 14px;
    }
  }
}
</style>