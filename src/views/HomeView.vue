<script setup lang="ts">
import TheHero from '@/components/TheHero.vue'
import TheStrategies from '@/components/TheStrategies.vue'
import TheTestimonials from '@/components/TheTestimonials.vue'
import TheTeam from '@/components/TheTeam.vue'
</script>

<template>
  <main class="home">
    <section id="inicio">
      <TheHero />
    </section>
    <section id="servicios">
      <TheStrategies />
    </section>
    <section id="testimonios">
      <TheTestimonials />
    </section>
    <section id="nosotros">
      <TheTeam />
    </section>
    
    <!-- Aquí se pueden agregar más secciones de la página principal -->
    <!-- <AboutSection /> -->
    <!-- <ServicesSection /> -->
    <!-- <ContactSection /> -->
  </main>
</template>
