<script setup lang="ts">
import { ref } from 'vue'
import { useSceneTransitions } from '@/composables/useSceneTransitions'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeProblem from '@/components/home/HomeProblem.vue'
import HomeServices from '@/components/home/HomeServices.vue'
import HomeJourney from '@/components/home/HomeJourney.vue'
import HomeResults from '@/components/home/HomeResults.vue'
import HomeFounders from '@/components/home/HomeFounders.vue'
import TheCulture from '@/components/TheCulture.vue'
import TheFaq from '@/components/TheFaq.vue'
import TheContact from '@/components/TheContact.vue'

const homeRef = ref<HTMLElement | null>(null)
useSceneTransitions(() => homeRef.value)
</script>

<template>
  <main class="home" ref="homeRef" itemscope itemtype="https://schema.org/WebPage">
    <section
      class="scene"
      id="inicio"
      aria-label="Bakano - Agencia de Marketing Digital en Ecuador"
    >
      <HomeHero />
    </section>
    <section class="scene" aria-label="Problemas comunes al hacer marketing sin datos">
      <HomeProblem />
    </section>
    <section
      class="scene"
      id="servicios"
      aria-label="Servicios de marketing digital y metodología de crecimiento"
    >
      <HomeServices />
      <HomeJourney />
    </section>
    <section class="scene" id="testimonios" aria-label="Testimonios de clientes de Bakano Ecuador">
      <HomeResults />
    </section>
    <section class="scene" id="nosotros" aria-label="Equipo fundador de Bakano">
      <HomeFounders />
    </section>
    <section class="scene" id="equipo" aria-label="El equipo completo de Bakano">
      <TheCulture />
    </section>
    <section
      class="scene"
      id="faq"
      aria-label="Preguntas frecuentes sobre Bakano y marketing digital en Ecuador"
    >
      <TheFaq />
    </section>
    <TheContact class="scene" />
  </main>
</template>

<style lang="scss" scoped>
.home {
  margin-top: -56px; // el hero queda bajo el header transparente
  // Las escenas que retroceden quedan corridas e inclinadas: sin scroll horizontal.
  // `clip` (no `hidden`) para no crear un contenedor de scroll que rompa los pins.
  overflow-x: clip;
  background-color: $BAKANO-DARK;

  section[id] {
    scroll-margin-top: 56px;
  }

  // Escenas del recorrido (ver useSceneTransitions): cada una tapa a la anterior
  :deep(.scene) {
    position: relative;
    overflow: hidden;
    --scene-shade: 0;
    // Cada escena ocupa al menos una pantalla: si fuera más corta, la siguiente
    // asomaría al cargar y su transición arrancaría antes de tiempo (monitores altos).
    min-height: 100vh;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    // El bloque de la escena se estira y centra su contenido en el alto sobrante
    > :only-child {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    // Velo que oscurece la escena que se va
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 50;
      pointer-events: none;
      background: #07050c;
      opacity: var(--scene-shade);
    }
  }
}
</style>
