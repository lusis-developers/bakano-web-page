<script setup lang="ts">
import TheHero from '@/components/TheHero.vue'
import TheStrategies from '@/components/TheStrategies.vue'
import TheTestimonials from '@/components/TheTestimonials.vue'
import TheTeam from '@/components/TheTeam.vue'
import TheContact from '@/components/TheContact.vue'
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
    <TheContact />
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.home {
  margin-top: -56px;
  /* Para compensar el margin-top del header en App.vue */
  background-color: colors.$BAKANO-DARK;
  /* Continuar con el tema oscuro del final del Hero */
}
</style>
