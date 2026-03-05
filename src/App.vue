<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/globals/TheHeader.vue'
import Footer from './components/globals/TheFooter.vue'
import TheGlobalLoader from './components/globals/TheGlobalLoader.vue'

const isLoaded = ref(false)

const handleLoaderComplete = () => {
  isLoaded.value = true
  document.body.style.overflow = '' // Restaurar scroll general
}

onMounted(() => {
  document.body.style.overflow = 'hidden' // Bloquear scroll inicial
})
</script>

<template>
  <TheGlobalLoader @complete="handleLoaderComplete" />

  <div class="app-wrapper" :class="{ 'app-wrapper--loaded': isLoaded }">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
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
</style>

