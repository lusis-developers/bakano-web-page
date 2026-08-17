<script setup lang="ts">
import TheStory from '@/components/TheStory.vue'
import TheVideoBackdrop from '@/components/globals/TheVideoBackdrop.vue'
import TheStrategies from '@/components/TheStrategies.vue'
import TheTestimonials from '@/components/TheTestimonials.vue'
import TheAuthority from '@/components/TheAuthority.vue'
import TheTeam from '@/components/TheTeam.vue'
import TheCulture from '@/components/TheCulture.vue'
import TheFaq from '@/components/TheFaq.vue'
import TheContact from '@/components/TheContact.vue'
</script>

<template>
  <main class="home" itemscope itemtype="https://schema.org/WebPage">
    <!-- Hilo cinemático: video fijo scrubbed por el scroll de TODA la página -->
    <TheVideoBackdrop />

    <section id="inicio" aria-label="Bakano - Agencia de Marketing Digital en Ecuador">
      <TheStory />
    </section>
    <section id="servicios" aria-label="Servicios de marketing digital y metodología de crecimiento">
      <TheStrategies />
    </section>
    <section id="testimonios" aria-label="Testimonios de clientes de Bakano Ecuador">
      <TheTestimonials />
    </section>
    <section id="autoridad" aria-label="Instituciones con las que ha trabajado Bakano">
      <TheAuthority />
    </section>
    <section id="nosotros" aria-label="Equipo fundador de Bakano">
      <TheTeam />
    </section>
    <section id="equipo" aria-label="El equipo completo de Bakano">
      <TheCulture />
    </section>
    <section id="faq" aria-label="Preguntas frecuentes sobre Bakano y marketing digital en Ecuador">
      <TheFaq />
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
