<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/globals/TheHeader.vue'
import Footer from './components/globals/TheFooter.vue'
import TheGlobalLoader from './components/globals/TheGlobalLoader.vue'
import TheScrollGuide from './components/globals/TheScrollGuide.vue'
import ContactWizard from './components/ContactWizard.vue'
import { useContactModal } from './composables/useContactModal'

const isLoaded = ref(false)
const { isOpen, close } = useContactModal()

const handleLoaderComplete = () => {
  isLoaded.value = true
  document.body.style.overflow = ''
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
</script>

<template>
  <TheGlobalLoader @complete="handleLoaderComplete" />

  <div class="app-wrapper" :class="{ 'app-wrapper--loaded': isLoaded }">
    <Header />
    <main class="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta.transition as string || 'page'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>

  <!-- Indicadores globales de scroll (dots + flecha) -->
  <TheScrollGuide />

  <!-- ── Modal de contacto (Teleport → fuera del flujo) ───────────────────── -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="contact-overlay"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        aria-label="Formulario de contacto"
      >
        <div class="contact-modal">
          <button class="contact-modal__close" @click="close" aria-label="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <!-- v-if recrea el wizard en cada apertura (reset automático) -->
          <ContactWizard v-if="isOpen" @close="close" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@use '@/styles/colorVariables.module.scss' as colors;

body {
  margin: 0;
  padding: 0;
  background-color: $BAKANO-DARK;
}

.app-wrapper {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;

  &--loaded {
    opacity: 1;
    pointer-events: auto;
  }
}

.main-content {
  margin-top: 56px;
  min-height: 100vh;
  background: $BAKANO-LIGHT;
}

// ── Modal de contacto ─────────────────────────────────────────────────────────
.contact-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.contact-modal {
  position: relative;
  width: 100%;
  max-width: 560px;
  background: rgba(11, 8, 21, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 44px 40px 40px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03) inset,
    0 40px 80px rgba(0, 0, 0, 0.6);
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;

  @media (max-width: 600px) {
    padding: 40px 20px 28px;
    border-radius: 16px;
  }
}

.contact-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(colors.$BAKANO-PINK, 0.4);
    color: colors.$BAKANO-PINK;
    background: rgba(colors.$BAKANO-PINK, 0.06);
  }
}

// ── Transición de página ──────────────────────────────────────────────────────
.page-enter-active {
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.55, 0, 1, 0.45);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.99);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(1.01);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.2s ease;
  }
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}

// ── Transición del modal ──────────────────────────────────────────────────────
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .contact-modal {
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .contact-modal {
    opacity: 0;
    transform: scale(0.94) translateY(12px);
  }
}
</style>

