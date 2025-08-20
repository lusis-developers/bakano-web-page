<script setup lang="ts">
type SocialIconType = 'linkedin' | 'instagram' | 'twitter' | 'github'

const currentYear = new Date().getFullYear()

const socialLinks: Array<{
  name: string
  url: string
  icon: SocialIconType
}> = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/bakano',
      icon: 'linkedin'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/bakano',
      icon: 'instagram'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/bakano',
      icon: 'twitter'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/bakano',
      icon: 'github'
    }
  ]

const services = [
  { name: 'Desarrollo Web', path: '/servicios/desarrollo-web' },
  { name: 'Aplicaciones Móviles', path: '/servicios/apps-moviles' },
  { name: 'Consultoría Tech', path: '/servicios/consultoria' },
  { name: 'UI/UX Design', path: '/servicios/diseno' }
]
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Main Footer Content -->
      <div class="footer__content">
        <!-- Company Info -->
        <div class="footer__section footer__section--main">
          <div class="footer__logo">
            <h3 class="footer__logo-text">Bakano</h3>
          </div>
          <p class="footer__description">
            Transformamos ideas en soluciones digitales innovadoras. 
            Especialistas en desarrollo web, aplicaciones móviles y consultoría tecnológica.
          </p>
          <div class="footer__contact">
            <div class="footer__contact-item">
              <i class="fas fa-envelope footer__contact-icon"></i>
              <a href="mailto:dquimi@bakano.ec" class="footer__contact-link">
                dquimi@bakano.ec
              </a>
            </div>
            <div class="footer__contact-item">
              <i class="fas fa-phone footer__contact-icon"></i>
              <a href="tel:+593984934039" class="footer__contact-link">
                +593 98 493 4039
              </a>
            </div>
            <div class="footer__contact-item">
              <i class="fas fa-map-marker-alt footer__contact-icon"></i>
              <span class="footer__contact-text">
                Guayaquil, Ecuador
              </span>
            </div>
          </div>
        </div>

        <!-- Services -->
        <div class="footer__section">
          <h4 class="footer__title">Servicios</h4>
          <ul class="footer__links">
            <li v-for="service in services" :key="service.path" class="footer__link-item">
              <RouterLink :to="service.path" class="footer__link">
                {{ service.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter & Social -->
        <div class="footer__section">
          <h4 class="footer__title">Mantente Conectado</h4>
          <p class="footer__newsletter-text">
            Suscríbete para recibir las últimas noticias y actualizaciones.
          </p>
          <form class="footer__newsletter" @submit.prevent>
            <input 
              type="email" 
              placeholder="Tu email" 
              class="footer__newsletter-input"
              required
            >
            <button type="submit" class="footer__newsletter-btn">
              Suscribirse
            </button>
          </form>
          
          <!-- Social Links -->
          <div class="footer__social">
            <h5 class="footer__social-title">Síguenos</h5>
            <div class="footer__social-links">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.url" 
                :aria-label="social.name"
                class="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="footer__social-icon" :class="`footer__social-icon--${social.icon}`">
                  {{ getSocialIcon(social.icon) }}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer__bottom">
        <div class="footer__bottom-content">
          <p class="footer__copyright">
            © {{ currentYear }} Bakano. Todos los derechos reservados.
          </p>
          <div class="footer__legal">
            <RouterLink to="/privacidad" class="footer__legal-link">
              Política de Privacidad
            </RouterLink>
            <RouterLink to="/terminos" class="footer__legal-link">
              Términos de Servicio
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  methods: {
    getSocialIcon(iconName: SocialIconType): string {
      const icons: Record<SocialIconType, string> = {
        linkedin: '💼',
        instagram: '📷',
        twitter: '🐦',
        github: '💻'
      }
      return icons[iconName] || '🔗'
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/fonts.modules.scss';
@import '@/styles/colorVariables.module.scss';

.footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  margin-top: auto;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 3rem 0 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }

    @media (min-width: 1024px) {
      grid-template-columns: 2fr 1fr 1.5fr;
      gap: 2rem;
    }
  }

  &__section {
    &--main {
      @media (min-width: 768px) {
        grid-column: 1 / -1;
      }

      @media (min-width: 1024px) {
        grid-column: 1;
      }
    }
  }

  &__logo {
    margin-bottom: 1rem;

    &-text {
      @include heading-font(700);
      font-size: 2rem;
      color: white;
      margin: 0;
      letter-spacing: -0.02em;
    }
  }

  &__description {
    @include body-font(400);
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    max-width: 400px;
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    &-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    &-icon {
      font-size: 1.1rem;
      width: 24px;
      text-align: center;
      color: $BAKANO-PRIMARY;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-link {
      @include interface-font(400);
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: $BAKANO-PRIMARY;
      }
    }

    &-text {
      @include interface-font(400);
      color: rgba(255, 255, 255, 0.8);
    }
  }

  &__title {
    @include heading-font(600);
    font-size: 1.1rem;
    color: white;
    margin: 0 0 1rem 0;
    letter-spacing: -0.01em;
  }

  &__links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__link-item {
    margin: 0;
  }

  &__link {
    @include interface-font(400);
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    display: inline-block;

    &:hover {
      color: $BAKANO-PRIMARY;
      transform: translateX(4px);
    }

    &.router-link-active {
      color: $BAKANO-PRIMARY;
    }
  }

  &__newsletter {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-direction: column;

    @media (min-width: 480px) {
      flex-direction: row;
    }

    &-text {
      @include body-font(400);
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    &-input {
      @include interface-font(400);
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 0.9rem;
      transition: all 0.3s ease;

      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }

      &:focus {
        outline: none;
        border-color: $BAKANO-PRIMARY;
        background: rgba(255, 255, 255, 0.15);
      }
    }

    &-btn {
      @include interface-font(600);
      padding: 0.75rem 1.5rem;
      background: $BAKANO-PRIMARY;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover {
        background: color.adjust($BAKANO-PRIMARY, $lightness: -10%);
        transform: translateY(-1px);
      }
    }
  }

  &__social {
    &-title {
      @include interface-font(600);
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0 0 0.75rem 0;
    }

    &-links {
      display: flex;
      gap: 0.75rem;
    }

    &-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      text-decoration: none;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &:hover {
        background: $BAKANO-PRIMARY;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba($BAKANO-PRIMARY, 0.3);
      }
    }

    &-icon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;

      .footer__social-link:hover & {
        transform: scale(1.1);
      }
    }
  }

  &__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 0;

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }
  }

  &__copyright {
    @include interface-font(400);
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin: 0;
  }

  &__legal {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-end;
    }

    &-link {
      @include interface-font(400);
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;

      &:hover {
        color: $BAKANO-PRIMARY;
      }
    }
  }
}
</style>