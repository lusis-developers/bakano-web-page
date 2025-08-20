<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Función para scroll suave a secciones
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 56 // Altura del header fijo
    const elementPosition = element.offsetTop - headerHeight
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
  // Cerrar menú móvil si está abierto
  isMenuOpen.value = false
}

// Función para abrir WhatsApp
const openWhatsApp = () => {
  window.open('https://wa.me/593984934039', '_blank', 'noopener,noreferrer')
  isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    class="header" 
    :class="{ 'header--scrolled': isScrolled }"
  >
    <nav class="nav">
      <div class="nav__container">
        <!-- Logo -->
        <RouterLink to="/" class="nav__logo">
          <span class="nav__logo-text">Bakano</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <ul class="nav__menu nav__menu--desktop">
          <li class="nav__item">
            <a href="#inicio" @click.prevent="scrollToSection('inicio')" class="nav__link">Inicio</a>
          </li>
          <li class="nav__item">
            <a href="#servicios" @click.prevent="scrollToSection('servicios')" class="nav__link">Servicios</a>
          </li>
          <li class="nav__item">
            <a href="#nosotros" @click.prevent="scrollToSection('nosotros')" class="nav__link">Nosotros</a>
          </li>
          <li class="nav__item">
            <a href="#testimonios" @click.prevent="scrollToSection('testimonios')" class="nav__link">Testimonios</a>
          </li>
          <li class="nav__item">
            <a href="#contacto" @click.prevent="openWhatsApp" class="nav__link nav__link--cta">Contacto</a>
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button 
          class="nav__toggle"
          @click="toggleMenu"
          :class="{ 'nav__toggle--active': isMenuOpen }"
          aria-label="Toggle menu"
        >
          <span class="nav__toggle-line"></span>
          <span class="nav__toggle-line"></span>
          <span class="nav__toggle-line"></span>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div 
        class="nav__menu nav__menu--mobile"
        :class="{ 'nav__menu--open': isMenuOpen }"
      >
        <ul class="nav__mobile-list">
          <li class="nav__mobile-item">
            <a href="#inicio" @click.prevent="scrollToSection('inicio')" class="nav__mobile-link">Inicio</a>
          </li>
          <li class="nav__mobile-item">
            <a href="#servicios" @click.prevent="scrollToSection('servicios')" class="nav__mobile-link">Servicios</a>
          </li>
          <li class="nav__mobile-item">
            <a href="#nosotros" @click.prevent="scrollToSection('nosotros')" class="nav__mobile-link">Nosotros</a>
          </li>
          <li class="nav__mobile-item">
            <a href="#testimonios" @click.prevent="scrollToSection('testimonios')" class="nav__mobile-link">Testimonios</a>
          </li>
          <li class="nav__mobile-item">
            <a href="#contacto" @click.prevent="openWhatsApp" class="nav__mobile-link nav__mobile-link--cta">Contacto</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/fonts.modules.scss';
@import '@/styles/colorVariables.module.scss';

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 56px;

  &--scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
}

.nav {
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
  }

  &__logo {
    text-decoration: none;
    
    &-text {
      @include heading-font(700);
      font-size: 1.5rem;
      color: $BAKANO-PRIMARY;
      letter-spacing: -0.02em;
    }
  }

  &__menu {
    &--desktop {
      display: none;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;

      @media (min-width: 768px) {
        display: flex;
        align-items: center;
      }
    }

    &--mobile {
      position: fixed;
      top: 56px;
      left: 0;
      right: 0;
      background: white;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-height: calc(100vh - 56px);
      overflow-y: auto;

      &--open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      @media (min-width: 768px) {
        display: none;
      }
    }
  }

  &__item {
    margin: 0;
  }

  &__link {
    @include interface-font(500);
    text-decoration: none;
    color: $BAKANO-DARK;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;

    &:hover {
      color: $BAKANO-PRIMARY;
      background: rgba($BAKANO-PRIMARY, 0.1);
    }

    &.router-link-active,
    &.active {
      color: $BAKANO-PRIMARY;
      font-weight: 600;
    }

    &--cta {
      background: $BAKANO-PRIMARY;
      color: white;
      font-weight: 600;
      margin-left: 1rem;

      &:hover {
        background: color.adjust($BAKANO-PRIMARY, $lightness: -10%);
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba($BAKANO-PRIMARY, 0.3);
      }
    }
  }

  &__mobile-list {
    list-style: none;
    margin: 0;
    padding: 1rem 0;
  }

  &__mobile-item {
    margin: 0;
  }

  &__mobile-link {
    @include interface-font(500);
    display: block;
    text-decoration: none;
    color: $BAKANO-DARK;
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    cursor: pointer;

    &:hover {
      background: rgba($BAKANO-PRIMARY, 0.1);
      border-left-color: $BAKANO-PRIMARY;
      color: $BAKANO-PRIMARY;
    }

    &.router-link-active,
    &.active {
      background: rgba($BAKANO-PRIMARY, 0.1);
      border-left-color: $BAKANO-PRIMARY;
      color: $BAKANO-PRIMARY;
      font-weight: 600;
    }

    &--cta {
      background: $BAKANO-PRIMARY;
      color: white;
      font-weight: 600;
      margin: 1rem 1.5rem;
      border-radius: 8px;
      border-left: none;
      text-align: center;

      &:hover {
        background: color.adjust($BAKANO-PRIMARY, $lightness: -10%);
        color: white;
        border-left: none;
      }
    }
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    gap: 4px;

    @media (min-width: 768px) {
      display: none;
    }

    &-line {
      width: 20px;
      height: 2px;
      background: $BAKANO-DARK;
      transition: all 0.3s ease;
      border-radius: 1px;
    }

    &--active {
      .nav__toggle-line {
        &:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      }
    }
  }
}

// Prevent body scroll when mobile menu is open
body:has(.nav__menu--open) {
  overflow: hidden;
}
</style>