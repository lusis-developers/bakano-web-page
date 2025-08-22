<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import bakanoLogo from '../../assets/logos/bakano-dark.png'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const router = useRouter()
const route = useRoute()

// refs para manejo de foco/click-outside
const toggleBtnRef = ref<HTMLButtonElement | null>(null)
const mobileMenuRef = ref<HTMLDivElement | null>(null)

const toggleMenu = async () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    await nextTick()
    const firstLink = mobileMenuRef.value?.querySelector<HTMLAnchorElement>('a')
    firstLink?.focus()
  } else {
    toggleBtnRef.value?.focus()
  }
}

const closeMenu = () => {
  if (!isMenuOpen.value) return
  isMenuOpen.value = false
  toggleBtnRef.value?.focus()
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Scroll suave a secciones con offset del header
const scrollToSection = async (sectionId: string) => {
  // Si no estamos en la página home, navegar primero
  if (route.name !== 'home') {
    await router.push('/')
    // Esperar a que la página se cargue completamente
    await nextTick()
    // Pequeña pausa adicional para asegurar que el DOM esté listo
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 56
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight
        window.scrollTo({ top: elementPosition, behavior: 'smooth' })
      }
    }, 100)
  } else {
    // Si ya estamos en home, hacer scroll directamente
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 56
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    }
  }
  closeMenu()
}

// Abrir WhatsApp
const openWhatsApp = () => {
  window.open('https://wa.me/593984934039', '_blank', 'noopener,noreferrer')
  closeMenu()
}

// Cerrar con click fuera
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node
  if (!isMenuOpen.value) return
  const clickedInsideMenu = mobileMenuRef.value?.contains(target)
  const clickedToggle = toggleBtnRef.value?.contains(target)
  if (!clickedInsideMenu && !clickedToggle) closeMenu()
}

// Cerrar con Esc
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})

// Bloqueo de scroll cuando el menú está abierto
watch(isMenuOpen, (open) => {
  const el = document.documentElement
  el.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <nav class="nav" aria-label="Primary">
      <div class="nav__container">
        <!-- Logo -->
        <RouterLink to="/" class="nav__logo" aria-label="Inicio">
          <img :src="bakanoLogo" alt="Bakano" class="nav__logo-img" />
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
          ref="toggleBtnRef"
          class="nav__toggle"
          @click="toggleMenu"
          :class="{ 'nav__toggle--active': isMenuOpen }"
          :aria-expanded="isMenuOpen ? 'true' : 'false'"
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
        >
          <span class="nav__toggle-line"></span>
          <span class="nav__toggle-line"></span>
          <span class="nav__toggle-line"></span>
        </button>
      </div>

      <!-- Backdrop -->
      <Transition name="fade">
        <div
          v-show="isMenuOpen"
          class="nav__backdrop"
          aria-hidden="true"
          @click="closeMenu"
        />
      </Transition>

      <!-- Mobile Navigation (con transición) -->
      <Transition name="slide-down">
        <div
          v-show="isMenuOpen"
          id="mobile-menu"
          ref="mobileMenuRef"
          class="nav__menu nav__menu--mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil"
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
      </Transition>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/styles/fonts.modules.scss' as fonts;

$header-height: 56px;
$bp-md: 768px;

.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  height: $header-height;

  &--scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
}

.nav {
  &__container {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $header-height;
  }

  &__logo {
    text-decoration: none;
    display: flex;
    align-items: center;

    &-img {
      height: 32px;
      width: auto;
      transition: transform 0.3s ease;

      @media (max-width: $bp-md) {
        height: 28px;
      }
    }
  }

  &__menu {
    &--desktop {
      display: none;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;

      @media (min-width: $bp-md) {
        display: flex;
        align-items: center;
      }
    }

    &--mobile {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      z-index: 1001; // sobre el backdrop
      border-radius: 8px;

      @media (min-width: $bp-md) {
        display: none !important;
      }
    }
  }

  &__item {
    margin: 0;
  }

  &__link {
    @include fonts.interface-font(500);
    text-decoration: none;
    color: $BAKANO-DARK;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: color 0.3s ease, background 0.3s ease, transform 0.2s ease;
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
    padding: 0.5rem 0;
  }

  &__mobile-item {
    margin: 0;
  }

  &__mobile-link {
    @include fonts.interface-font(500);
    display: block;
    text-decoration: none;
    color: $BAKANO-DARK;
    font-size: 1rem;
    padding: 0.9rem 1.5rem;
    transition: background 0.2s ease, color 0.2s ease;
    cursor: pointer;

    &:hover {
      background: rgba($BAKANO-PRIMARY, 0.08);
      color: $BAKANO-PRIMARY;
    }

    &.router-link-active,
    &.active {
      background: rgba($BAKANO-PRIMARY, 0.1);
      color: $BAKANO-PRIMARY;
      font-weight: 600;
    }

    &--cta {
      background: $BAKANO-PRIMARY;
      color: white;
      font-weight: 600;
      margin: 0.5rem 1rem 0.75rem;
      border-radius: 8px;
      text-align: center;

      &:hover {
        background: color.adjust($BAKANO-PRIMARY, $lightness: -8%);
        color: white;
      }
    }
  }

  &__toggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    gap: 5px;

    @media (min-width: $bp-md) {
      display: none;
    }

    &-line {
      width: 22px;
      height: 2px;
      background: $BAKANO-DARK;
      transition: transform 0.3s ease, opacity 0.3s ease;
      border-radius: 1px;
    }

    &--active {
      .nav__toggle-line {
        &:nth-child(1) {
          transform: rotate(45deg) translate(5px, 6px);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      }
    }
  }

  /* Backdrop para el menú móvil */
  &__backdrop {
    position: fixed;
    inset: $header-height 0 0 0;
    /* debajo del header */
    background: rgba(0, 0, 0, 0.35);
    z-index: 1000;

    @media (min-width: $bp-md) {
      display: none;
    }
  }
}

/* ===== Transitions ===== */
/* Slide down para el contenedor del menú */
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

/* Fade para el backdrop */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

/* Respeto a reduce motion */
@media (prefers-reduced-motion: reduce) {

  .slide-down-enter-active,
  .slide-down-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
