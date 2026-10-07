<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useContactModal } from '@/composables/useContactModal'

const scrollY = ref(0)
const docHeight = ref(1)
const activeSection = ref(0)

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'testimonios', label: 'Resultados' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
]

// Aviso "sigue bajando": aparece cuando la persona se queda quieta un momento
// (incluido el inicio) y se esconde apenas vuelve a hacer scroll o al llegar al final.
const IDLE_MS = 1400
const idle = ref(false)
const isTouch = ref(false)
const { isOpen: contactOpen } = useContactModal()
let idleTimer: ReturnType<typeof setTimeout> | undefined

const armIdle = () => {
  idle.value = false
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => (idle.value = true), IDLE_MS)
}

const showHint = computed(() => {
  const progress = scrollY.value / docHeight.value
  return idle.value && progress < 0.95 && !contactOpen.value
})

let ticking = false

const update = () => {
  scrollY.value = window.scrollY
  docHeight.value = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)

  // Sección activa: la última cuyo top ya pasó el centro de la pantalla
  const mid = window.innerHeight * 0.5
  let active = 0
  sections.forEach((s, i) => {
    const el = document.getElementById(s.id)
    if (el && el.getBoundingClientRect().top <= mid) active = i
  })
  activeSection.value = active

  ticking = false
}

const onScroll = () => {
  armIdle()
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const scrollDown = () => {
  window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
}

onMounted(() => {
  isTouch.value = window.matchMedia('(pointer: coarse)').matches
  window.addEventListener('scroll', onScroll, { passive: true })
  update()
  armIdle()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  clearTimeout(idleTimer)
})
</script>

<template>
  <!-- ── Dots de navegación lateral (desktop) ──────────────────────── -->
  <nav class="scroll-guide" aria-label="Navegación de secciones">
    <ul class="scroll-guide__list">
      <li v-for="(section, i) in sections" :key="section.id" class="scroll-guide__item">
        <button
          class="scroll-guide__dot"
          :class="{ 'is-active': activeSection === i }"
          @click="scrollTo(section.id)"
          :aria-label="section.label"
        />
        <span class="scroll-guide__label" aria-hidden="true">{{ section.label }}</span>
      </li>
    </ul>
  </nav>

  <!-- ── Aviso "sigue bajando" (aparece al quedarse quieto) ───────── -->
  <!-- type="transition": la animación infinita del aviso no debe retrasar su salida -->
  <Transition name="hint-pop" type="transition">
    <button
      v-if="showHint"
      type="button"
      class="keep-scrolling"
      @click="scrollDown"
      aria-label="Seguir bajando para ver más"
    >
      <!-- Desktop: mouse con rueda animada · Touch: dedo deslizando -->
      <span v-if="!isTouch" class="keep-scrolling__mouse" aria-hidden="true">
        <span class="keep-scrolling__wheel"></span>
      </span>
      <span v-else class="keep-scrolling__swipe" aria-hidden="true">
        <i class="fa-solid fa-hand-pointer"></i>
      </span>

      <span class="keep-scrolling__text">
        {{ isTouch ? 'Desliza para ver más' : 'Sigue bajando' }}
      </span>

      <span class="keep-scrolling__chevrons" aria-hidden="true">
        <svg
          v-for="n in 3"
          :key="n"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

// ── Contenedor lateral ────────────────────────────────────────────────────
.scroll-guide {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  pointer-events: auto;

  // Ocultar en pantallas pequeñas (no hay espacio)
  @media (max-width: 768px) {
    display: none;
  }
}

.scroll-guide__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  // Línea vertical entre dots
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
}

.scroll-guide__item {
  position: relative;
  display: flex;
  align-items: center;
  // Dot queda sobre la línea
  z-index: 1;
}

// ── Dot ──────────────────────────────────────────────────────────────────
.scroll-guide__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &.is-active {
    background: colors.$BAKANO-PINK;
    border-color: colors.$BAKANO-PINK;
    box-shadow:
      0 0 8px rgba(colors.$BAKANO-PINK, 0.55),
      0 0 22px rgba(colors.$BAKANO-PINK, 0.22);
    transform: scale(1.4);
  }

  &:hover:not(.is-active) {
    background: rgba(255, 255, 255, 0.28);
    border-color: rgba(255, 255, 255, 0.55);
    transform: scale(1.15);
  }
}

// ── Label tooltip (aparece al hover del item) ─────────────────────────────
.scroll-guide__label {
  @include fonts.interface-font(500);
  position: absolute;
  right: calc(100% + 14px);
  white-space: nowrap;
  font-size: 0.66rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transform: translateX(8px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
  pointer-events: none;
}

.scroll-guide__item:hover .scroll-guide__label {
  opacity: 1;
  transform: translateX(0);
}

// ── Aviso "sigue bajando" ─────────────────────────────────────────────────
.keep-scrolling {
  @include fonts.interface-font(700);
  position: fixed;
  left: 50%;
  bottom: max(28px, env(safe-area-inset-bottom));
  z-index: 95;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px 10px 12px;
  border: 1px solid rgba(colors.$BAKANO-PINK, 0.55);
  border-radius: 999px;
  background: rgba(colors.$BAKANO-DARK, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  font-size: 0.9rem;
  white-space: nowrap;
  cursor: pointer;
  transform: translateX(-50%);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.35),
    0 0 0 0 rgba(colors.$BAKANO-PINK, 0.5);
  animation:
    hint-float 2.4s ease-in-out infinite,
    hint-pulse 2.4s ease-out infinite;

  &:hover {
    border-color: colors.$BAKANO-PINK;
  }

  &:focus-visible {
    outline: 2px solid colors.$BAKANO-PINK;
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    bottom: max(20px, env(safe-area-inset-bottom));
    font-size: 0.85rem;
  }
}

// Mouse con rueda que baja
.keep-scrolling__mouse {
  position: relative;
  width: 20px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  flex-shrink: 0;
}

.keep-scrolling__wheel {
  position: absolute;
  left: 50%;
  top: 6px;
  width: 4px;
  height: 7px;
  margin-left: -2px;
  border-radius: 2px;
  background: colors.$BAKANO-PINK;
  animation: wheel-roll 1.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

// Dedo que desliza hacia arriba (gesto de scroll en touch)
.keep-scrolling__swipe {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  color: colors.$BAKANO-PINK;
  font-size: 1.1rem;
  animation: finger-swipe 1.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

// Chevrons en cascada
.keep-scrolling__chevrons {
  display: flex;
  flex-direction: column;
  margin-left: 2px;

  svg {
    width: 14px;
    height: 14px;
    margin-top: -7px;
    color: colors.$BAKANO-PINK;
    opacity: 0.2;
    animation: chevron-cascade 1.4s ease-in-out infinite;

    &:first-child {
      margin-top: 0;
    }

    &:nth-child(2) {
      animation-delay: 0.15s;
    }

    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
}

@keyframes hint-float {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-6px);
  }
}

@keyframes hint-pulse {
  0% {
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.35),
      0 0 0 0 rgba(colors.$BAKANO-PINK, 0.45);
  }
  70% {
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.35),
      0 0 0 14px rgba(colors.$BAKANO-PINK, 0);
  }
  100% {
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.35),
      0 0 0 0 rgba(colors.$BAKANO-PINK, 0);
  }
}

@keyframes wheel-roll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

@keyframes finger-swipe {
  0% {
    transform: translateY(6px);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    transform: translateY(-8px);
    opacity: 1;
  }
  100% {
    transform: translateY(-8px);
    opacity: 0;
  }
}

@keyframes chevron-cascade {
  0%,
  100% {
    opacity: 0.2;
  }
  40% {
    opacity: 1;
  }
}

// Entrada / salida
.hint-pop-enter-active {
  transition:
    opacity 0.45s ease,
    translate 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.hint-pop-leave-active {
  transition:
    opacity 0.2s ease,
    translate 0.2s ease;
}

.hint-pop-enter-from,
.hint-pop-leave-to {
  opacity: 0;
  translate: 0 16px;
}

@media (prefers-reduced-motion: reduce) {
  .keep-scrolling,
  .keep-scrolling__wheel,
  .keep-scrolling__swipe,
  .keep-scrolling__chevrons svg {
    animation: none;
  }

  .keep-scrolling__chevrons svg {
    opacity: 1;
  }
}
</style>
