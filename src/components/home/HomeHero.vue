<script setup lang="ts">
import { useContactModal } from '@/composables/useContactModal'
import { whatsappUrl } from '@/constants/contact'
import { heroPhoto, heroStats, partners } from '@/data/home'
import avMega from '@/assets/testimonios/avatars/mega.webp'
import avAle from '@/assets/testimonios/avatars/ale.webp'
import avNato from '@/assets/testimonios/avatars/nato.webp'

const { open: openContactModal } = useContactModal()
</script>

<template>
  <div class="hero">
    <div class="hero__glow" aria-hidden="true"></div>

    <div class="hero__inner">
      <div class="hero__copy">
        <p class="hero__eyebrow">
          <span class="hero__dot" aria-hidden="true"></span>
          Agencia de marketing digital · Guayaquil, Ecuador
        </p>

        <h1 class="hero__title">
          Hacemos que tu negocio <span class="hero__mark">venda más.</span>
          Con datos, no con suerte.
        </h1>

        <p class="hero__lede">
          Ayudamos a dueños de negocios a aumentar hasta un
          <strong>20% su facturación mensual</strong> con publicidad en Meta, estrategia y
          tecnología. Medimos cada dólar que inviertes y te mostramos qué te trae clientes.
        </p>

        <div class="hero__actions">
          <button type="button" class="btn btn--primary" @click="openContactModal">
            Quiero mi diagnóstico gratis
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
          <a class="btn btn--ghost" :href="whatsappUrl()" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            Escríbenos por WhatsApp
          </a>
        </div>

        <p class="hero__reassure">
          <i class="fa-solid fa-check" aria-hidden="true"></i> Respuesta en menos de 24 h
          <span aria-hidden="true">·</span>
          <i class="fa-solid fa-check" aria-hidden="true"></i> Sin contratos forzados
        </p>
      </div>

      <figure class="hero__visual">
        <div class="hero__photo-frame">
          <img
            class="hero__photo"
            :src="heroPhoto.src"
            :srcset="heroPhoto.srcset"
            :alt="heroPhoto.alt"
            width="720"
            height="860"
            fetchpriority="high"
          />
        </div>

        <!-- Prueba real, encima de la foto -->
        <div class="hero__card hero__card--result">
          <img :src="avMega" alt="" class="hero__card-avatar" width="40" height="40" />
          <div>
            <p class="hero__card-value">+40% facturación</p>
            <p class="hero__card-label">Megaprinter, con Bakano</p>
          </div>
        </div>

        <div class="hero__card hero__card--clients">
          <div class="hero__avatars" aria-hidden="true">
            <img :src="avAle" alt="" width="32" height="32" />
            <img :src="avNato" alt="" width="32" height="32" />
            <img :src="avMega" alt="" width="32" height="32" />
          </div>
          <p><strong>+150 negocios</strong> en Ecuador confían en nosotros</p>
        </div>
      </figure>
    </div>

    <div class="hero__bottom">
      <dl class="hero__stats">
        <div v-for="s in heroStats" :key="s.label" class="hero__stat">
          <dt>{{ s.label }}</dt>
          <dd>{{ s.value }}</dd>
        </div>
      </dl>

      <div id="autoridad" class="hero__partners">
        <p class="hero__partners-label">Respaldados por</p>
        <ul>
          <li v-for="p in partners" :key="p.name">
            <a :href="p.url" target="_blank" rel="noopener noreferrer" :title="p.name">
              <img :src="p.logo" :alt="p.name" height="36" loading="lazy" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;

.hero {
  position: relative;
  overflow: hidden;
  background: $BAKANO-DARK;
  color: $white;
  padding: calc(56px + clamp(32px, 5vw, 64px)) 24px 32px;

  &__glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(60% 50% at 78% 30%, rgba($BAKANO-PINK, 0.22), transparent 70%),
      radial-gradient(50% 50% at 10% 90%, rgba($BAKANO-PURPLE, 0.25), transparent 70%);
  }

  &__inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: clamp(32px, 6vw, 80px);
    align-items: center;
  }

  // ── Copy ────────────────────────────────────────────────────────────────────
  &__copy {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__eyebrow {
    @include fonts.interface-font(600);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    align-self: flex-start;
    margin: 0;
    padding: 6px 14px;
    border: 1px solid rgba($white, 0.14);
    border-radius: 999px;
    background: rgba($white, 0.04);
    font-size: 0.8rem;
    color: rgba($BAKANO-LIGHT, 0.85);
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $BAKANO-GREEN;
    box-shadow: 0 0 0 4px rgba($BAKANO-GREEN, 0.2);
  }

  &__title {
    @include fonts.heading-font(800);
    margin: 0;
    font-size: clamp(2.4rem, 5vw, 4.2rem);
    line-height: 1.02;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  &__mark {
    color: $BAKANO-PINK;
  }

  &__lede {
    @include fonts.body-font(400);
    margin: 0;
    max-width: 52ch;
    font-size: clamp(1.02rem, 1.35vw, 1.2rem);
    line-height: 1.65;
    color: rgba($BAKANO-LIGHT, 0.78);

    strong {
      color: $white;
      font-weight: 700;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  &__reassure {
    @include fonts.interface-font(500);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 0.85rem;
    color: rgba($BAKANO-LIGHT, 0.6);

    i {
      color: $BAKANO-GREEN;
    }
  }

  // ── Visual ──────────────────────────────────────────────────────────────────
  &__visual {
    position: relative;
    margin: 0;
  }

  &__photo-frame {
    aspect-ratio: 720 / 860;
    max-height: min(560px, 62vh);
    margin-left: auto;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(#000, 0.45);
    background: #2a2236;
  }

  &__photo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__card {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 16px;
    background: rgba($white, 0.96);
    color: $BAKANO-DARK;
    box-shadow: 0 18px 40px rgba(#000, 0.28);

    p {
      margin: 0;
    }

    &--result {
      left: -32px;
      bottom: 64px;
    }

    &--clients {
      right: -20px;
      top: 32px;
      max-width: 230px;

      p {
        @include fonts.interface-font(500);
        font-size: 0.8rem;
        line-height: 1.35;
      }
    }
  }

  &__card-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__card-value {
    @include fonts.heading-font(800);
    font-size: 1.15rem;
    line-height: 1.1;
    color: $BAKANO-PINK;
  }

  &__card-label {
    @include fonts.interface-font(500);
    font-size: 0.78rem;
    color: $gray-600;
  }

  &__avatars {
    display: flex;
    flex-shrink: 0;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid $white;
      object-fit: cover;

      & + img {
        margin-left: -10px;
      }
    }
  }

  // ── Franja inferior ─────────────────────────────────────────────────────────
  &__bottom {
    position: relative;
    max-width: 1200px;
    margin: clamp(40px, 5vw, 64px) auto 0;
    padding-top: 28px;
    border-top: 1px solid rgba($white, 0.1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
  }

  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(24px, 4vw, 56px);
    margin: 0;
  }

  &__stat {
    display: flex;
    flex-direction: column-reverse;
    gap: 4px;

    dd {
      @include fonts.heading-font(800);
      margin: 0;
      font-size: clamp(1.6rem, 2.6vw, 2.2rem);
      line-height: 1;
    }

    dt {
      @include fonts.interface-font(500);
      font-size: 0.82rem;
      color: rgba($BAKANO-LIGHT, 0.6);
    }
  }

  &__partners {
    display: flex;
    align-items: center;
    gap: 20px;
    scroll-margin-top: 80px;

    ul {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    a {
      display: block;
      padding: 8px 14px;
      border-radius: 12px;
      background: $white;
      opacity: 0.85;
      transition: opacity 0.2s ease;

      &:hover,
      &:focus-visible {
        opacity: 1;
      }
    }

    img {
      display: block;
      height: 32px;
      width: auto;
    }
  }

  &__partners-label {
    @include fonts.interface-font(600);
    margin: 0;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba($BAKANO-LIGHT, 0.45);
  }

  // ── Responsive ──────────────────────────────────────────────────────────────
  // Sin margen lateral sobrante, la tarjeta flotante no puede salirse del borde
  @media (max-width: 1260px) {
    &__card--clients {
      right: 12px;
    }
  }

  @media (max-width: 960px) {
    &__inner {
      grid-template-columns: 1fr;
    }

    &__visual {
      max-width: 460px;
      width: 100%;
      margin: 8px auto 0;
    }

    &__card--result {
      left: -8px;
    }

    &__card--clients {
      right: -8px;
    }
  }

  @media (max-width: 600px) {
    padding-inline: 16px;

    &__actions .btn {
      width: 100%;
      justify-content: center;
    }

    &__card--clients {
      display: none;
    }

    &__card--result {
      left: 12px;
      bottom: 16px;
    }

    &__partners {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      ul {
        flex-wrap: wrap;
        gap: 10px;
      }

      img {
        height: 26px;
      }
    }
  }
}
</style>

<style lang="scss">
// Sin scope: depende de la clase que App.vue pone al terminar el loader global
@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}

.app-wrapper--loaded .hero__copy > *,
.app-wrapper--loaded .hero__visual {
  animation: hero-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@for $i from 1 through 6 {
  .app-wrapper--loaded .hero__copy > :nth-child(#{$i}) {
    animation-delay: #{0.08 * $i}s;
  }
}

.app-wrapper--loaded .hero__visual {
  animation-delay: 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  .app-wrapper--loaded .hero__copy > *,
  .app-wrapper--loaded .hero__visual {
    animation: none;
  }
}
</style>
