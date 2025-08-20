<script setup lang="ts">
import Header from './components/globals/TheHeader.vue'
import Footer from './components/globals/TheFooter.vue'
</script>

<template>
  <Header />
  <main class="main-content">
    <RouterView />
  </main>
  <Footer />
</template>

<style lang="scss">
.main-content {
  margin-top: 56px;
  min-height: 100vh;
  background: $BAKANO-LIGHT;
}
</style>

