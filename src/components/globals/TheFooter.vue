<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import bakanoLogo from '../../assets/logos/bakano-light.png'
import { PHONE_DISPLAY, whatsappUrl } from '@/constants/contact'

const currentYear = new Date().getFullYear()

const seriousRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        seriousRef.value?.classList.add('is-visible')
        observer?.disconnect()
      }
    },
    { threshold: 0.5 },
  )
  if (seriousRef.value) observer.observe(seriousRef.value)
})

onUnmounted(() => observer?.disconnect())

// Iconos por Font Awesome 6 (CDN cargado en index.html), no por SVG en línea
const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/bakanoec/posts/?feedView=all',
    icon: 'fa-brands fa-linkedin-in',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bakano.ec/',
    icon: 'fa-brands fa-instagram',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/bakano.ec',
    icon: 'fa-brands fa-facebook-f',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@bakano.ec?lang=en',
    icon: 'fa-brands fa-tiktok',
  },
  {
    name: 'WhatsApp',
    url: whatsappUrl(),
    icon: 'fa-brands fa-whatsapp',
  },
]

const services = [
  'Desarrollo Web',
  'Estrategia de Datos',
  'Estrategia de Growth',
  'Consultoría Tech',
  'UI/UX Design',
]

const openWhatsApp = () =>
  window.open(whatsappUrl(), '_blank', 'noopener,noreferrer')
</script>

<template>
  <footer class="footer">

    <!-- ════════════════════════════════════════════════════
         CTA SECTION — invitación de conversión antes del footer
         ════════════════════════════════════════════════════ -->
    <section class="footer__cta" aria-label="Llamada a la acción">
      <div class="footer__cta-glow" aria-hidden="true" />
      <div class="footer__inner">
        <p class="footer__cta-label">¿Hablamos?</p>
        <h2 class="footer__cta-title">
          ¿Listo para llevar tu<br>
          <span class="footer__cta-gradient">negocio al siguiente nivel?</span>
        </h2>
        <p class="footer__cta-sub">
          Cuéntanos tu reto. Nuestro equipo está listo para convertirlo en resultados.
        </p>

        <!-- Énfasis "Lo decimos en serio" -->
        <div class="footer__cta-serious" ref="seriousRef">
          <span class="footer__cta-serious-icon" aria-hidden="true">
            <i class="fa-solid fa-check"></i>
          </span>
          <span class="footer__cta-serious-text">Lo decimos en serio</span>
          <span class="footer__cta-serious-divider" aria-hidden="true" />
          <span class="footer__cta-serious-sub">Sin compromisos. Solo resultados.</span>
        </div>

        <div class="footer__cta-actions">
          <button class="footer__cta-btn footer__cta-btn--primary" @click="openWhatsApp">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            Escríbenos por WhatsApp
          </button>
          <a class="footer__cta-btn footer__cta-btn--ghost" href="mailto:dquimi@bakano.ec">
            dquimi@bakano.ec
          </a>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════
         GRID — Logo, contacto, servicios, redes
         ════════════════════════════════════════════════════ -->
    <div class="footer__grid-wrap">
      <div class="footer__inner footer__grid">

        <!-- Columna 1: Logo + tagline -->
        <div class="footer__col footer__col--brand">
          <RouterLink to="/" class="footer__logo-link" aria-label="Ir al inicio">
            <img :src="bakanoLogo" alt="Bakano" class="footer__logo" />
          </RouterLink>
          <p class="footer__tagline">
            Transformamos datos, marketing y tecnología en resultados reales para tu negocio.
          </p>
          <!-- Social icons -->
          <div class="footer__social" role="list" aria-label="Redes sociales">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.url"
              :aria-label="s.name"
              class="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
            >
              <i :class="s.icon" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <!-- Columna 2: Contacto -->
        <div class="footer__col">
          <h3 class="footer__col-title">Contacto</h3>
          <ul class="footer__list" role="list">
            <li>
              <a href="mailto:dquimi@bakano.ec" class="footer__list-link">
                <i class="fa-solid fa-envelope" aria-hidden="true"></i>
                dquimi@bakano.ec
              </a>
            </li>
            <li>
              <a
                :href="whatsappUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__list-link"
                aria-label="Escribir a Bakano por WhatsApp"
              >
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
                <span class="footer__list-stack">
                  <span>{{ PHONE_DISPLAY }}</span>
                  <span class="footer__list-note">Escríbenos por WhatsApp</span>
                </span>
              </a>
            </li>
            <li>
              <span class="footer__list-text">
                <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                Guayaquil, Ecuador
              </span>
            </li>
          </ul>
        </div>

        <!-- Columna 3: Servicios -->
        <div class="footer__col">
          <h3 class="footer__col-title">Servicios</h3>
          <ul class="footer__list" role="list">
            <li v-for="service in services" :key="service">
              <span class="footer__list-text footer__list-text--service">
                <span class="footer__list-dot" aria-hidden="true" />
                {{ service }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Columna 4: Legal -->
        <div class="footer__col">
          <h3 class="footer__col-title">Legal</h3>
          <ul class="footer__list" role="list">
            <li>
              <RouterLink to="/politicas-privacidad" class="footer__list-link">
                Política de Privacidad
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/aviso-legal" class="footer__list-link">
                Aviso Legal
              </RouterLink>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- ════════════════════════════════════════════════════
         BOTTOM BAR
         ════════════════════════════════════════════════════ -->
    <div class="footer__bottom">
      <div class="footer__inner footer__bottom-inner">
        <p class="footer__copyright">
          © {{ currentYear }} Bakano — Todos los derechos reservados.
        </p>
        <p class="footer__made">
          Hecho con
          <i class="fa-solid fa-heart footer__heart" aria-label="amor" role="img"></i>
          en Ecuador · por
          <a
            href="https://yeyo.dev/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__yeyo"
            aria-label="Sitio de yeyo.dev, CTO de Bakano"
          >yeyo.dev</a>
        </p>
      </div>
    </div>

  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

// ── Variables locales ─────────────────────────────────────────────────────────
$footer-bg: #09060f;
$border: rgba(255, 255, 255, 0.06);
$text-muted: rgba(255, 255, 255, 0.42);
$text-body: rgba(255, 255, 255, 0.65);

// ── Contenedor centrado reutilizable ─────────────────────────────────────────
.footer__inner {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 24px;

  @media (max-width: 600px) {
    padding-inline: 16px;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER RAÍZ
// ─────────────────────────────────────────────────────────────────────────────
.footer {
  background-color: $footer-bg;
  color: colors.$white;
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────────────
.footer__cta {
  position: relative;
  padding: 100px 0 88px;
  border-bottom: 1px solid $border;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 72px 0 64px;
  }

  // Glow decorativo
  &-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse 60% 50% at 50% 50%,
        rgba(colors.$BAKANO-PINK, 0.08) 0%,
        rgba(colors.$BAKANO-PURPLE, 0.05) 40%,
        transparent 70%);
    pointer-events: none;
  }

  .footer__inner {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  &-label {
    @include fonts.accent-font(700);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: colors.$BAKANO-PINK;
    margin-bottom: 20px;
  }

  &-title {
    @include fonts.heading-font(800);
    font-size: clamp(2.4rem, 5vw, 4.4rem);
    text-transform: uppercase;
    letter-spacing: -0.025em;
    line-height: 1.06;
    color: colors.$white;
    margin: 0 0 20px;

    @media (max-width: 600px) {
      font-size: clamp(2rem, 8vw, 3rem);

      br {
        display: none;
      }
    }
  }

  &-gradient {
    background: linear-gradient(110deg, colors.$BAKANO-PINK 0%, colors.$BAKANO-PURPLE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &-sub {
    @include fonts.body-font(400);
    font-size: 1rem;
    color: $text-body;
    line-height: 1.7;
    margin: 0 0 44px;
    max-width: 480px;
    margin-inline: auto;
    margin-bottom: 44px;

    @media (max-width: 600px) {
      font-size: 0.92rem;
    }
  }

  // ── Énfasis "Lo decimos en serio" ─────────────────────────────────────────
  &-serious {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 0 auto 40px;
    padding: 10px 20px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    opacity: 0;
    transform: translateY(-20px) scale(0.92);
    transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

    &.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: linear-gradient(135deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
      color: colors.$white;
      flex-shrink: 0;
    }

    &-text {
      @include fonts.interface-font(600);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: colors.$white;
      white-space: nowrap;
    }

    &-divider {
      width: 1px;
      height: 14px;
      background: rgba(255, 255, 255, 0.15);
      flex-shrink: 0;
    }

    &-sub {
      @include fonts.interface-font(400);
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.4);
      white-space: nowrap;

      @media (max-width: 480px) {
        display: none;
      }
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  &-btn {
    @include fonts.interface-font(600);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-radius: 50px;
    padding: 14px 28px;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.25s ease, opacity 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    // Botón principal: gradiente
    &--primary {
      background: linear-gradient(135deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
      border: none;
      color: colors.$white;
      box-shadow: 0 8px 32px rgba(colors.$BAKANO-PINK, 0.25);

      &:hover {
        box-shadow: 0 16px 48px rgba(colors.$BAKANO-PINK, 0.4);
      }
    }

    // Botón fantasma: borde
    &--ghost {
      background: transparent;
      border: 1px solid $border;
      color: $text-body;

      &:hover {
        border-color: rgba(255, 255, 255, 0.2);
        color: colors.$white;
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID DE COLUMNAS
// ─────────────────────────────────────────────────────────────────────────────
.footer__grid-wrap {
  padding: 64px 0 56px;
  border-bottom: 1px solid $border;
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

// ── Columna ───────────────────────────────────────────────────────────────────
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 0;

  &--brand {
    @media (max-width: 1024px) {
      grid-column: 1 / -1;
    }

    @media (max-width: 600px) {
      grid-column: 1;
    }
  }
}

.footer__col-title {
  @include fonts.interface-font(600);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 20px;
}

// ── Logo + tagline ────────────────────────────────────────────────────────────
.footer__logo-link {
  display: inline-flex;
  margin-bottom: 16px;

  &:hover .footer__logo {
    opacity: 0.8;
  }
}

.footer__logo {
  height: 26px;
  width: auto;
  transition: opacity 0.2s ease;
}

.footer__tagline {
  @include fonts.body-font(400);
  font-size: 0.88rem;
  color: $text-body;
  line-height: 1.72;
  margin: 0 0 24px;
  max-width: 340px;
}

// ── Social icons ──────────────────────────────────────────────────────────────
.footer__social {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid $border;
  color: $text-muted;
  text-decoration: none;
  transition: color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

  i {
    font-size: 16px;
    line-height: 1;
  }

  &:hover {
    color: colors.$white;
    border-color: rgba(colors.$BAKANO-PINK, 0.4);
    background: rgba(colors.$BAKANO-PINK, 0.1);
    box-shadow: 0 0 16px rgba(colors.$BAKANO-PINK, 0.2);
  }
}

// ── Listas de items ───────────────────────────────────────────────────────────
.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__list-link {
  @include fonts.interface-font(400);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: $text-body;
  text-decoration: none;
  transition: color 0.2s ease;

  i {
    flex-shrink: 0;
    opacity: 0.5;
    width: 14px;
    font-size: 14px;
    text-align: center;
  }

  &:hover {
    color: colors.$white;

    i {
      opacity: 1;
    }
  }
}

// Número arriba, aclaración debajo: evita que la línea parta a media frase
.footer__list-stack {
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}

.footer__list-note {
  font-size: 0.74rem;
  opacity: 0.6;
}

.footer__list-text {
  @include fonts.interface-font(400);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: $text-body;

  i {
    flex-shrink: 0;
    opacity: 0.5;
    width: 14px;
    font-size: 14px;
    text-align: center;
  }

  &--service {
    gap: 10px;
    color: $text-body;
    cursor: default;
  }
}

.footer__list-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
  flex-shrink: 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM BAR
// ─────────────────────────────────────────────────────────────────────────────
.footer__bottom {
  padding: 20px 0;
}

.footer__bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}

.footer__copyright,
.footer__made {
  @include fonts.interface-font(400);
  font-size: 0.75rem;
  color: $text-muted;
  margin: 0;
}

.footer__made {
  display: flex;
  align-items: center;
  gap: 5px;
}

.footer__heart {
  color: colors.$BAKANO-PINK;
  flex-shrink: 0;
}

.footer__yeyo {
  @include fonts.interface-font(600);
  color: $text-muted;
  text-decoration: none;
  background: linear-gradient(90deg, colors.$BAKANO-PINK, colors.$BAKANO-PURPLE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

@keyframes cta-drop {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.92);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
