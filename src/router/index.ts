import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import LegalNoticeView from '../views/LegalNoticeView.vue'
import ToolsView from '../views/ToolsView.vue'

// ── Tipos ──────────────────────────────────────────────────────────────────────
interface RouteMeta {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogUrl: string
  jsonLd?: object[]
}

// ── JSON-LD por página ─────────────────────────────────────────────────────────
const toolsJsonLd: object[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://bakano.ec/herramientas',
    url: 'https://bakano.ec/herramientas',
    name: 'Herramientas de Marketing Digital | Bakano Ecuador',
    description:
      'Plataformas tecnológicas desarrolladas por Bakano para potenciar el crecimiento de negocios en Ecuador. Bakano Metrics: analytics en tiempo real para tomar decisiones basadas en datos.',
    isPartOf: { '@id': 'https://bakano.ec/#website' },
    publisher: { '@id': 'https://bakano.ec/#organization' },
    inLanguage: 'es-EC',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://bakano.ec/' },
        { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://bakano.ec/herramientas' },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Bakano Metrics',
    alternateName: 'Metrics by Bakano',
    url: 'https://metrics.bakano.ec',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Plataforma de analytics y business intelligence en tiempo real desarrollada por Bakano. Visualiza ventas, campañas y audiencias desde un solo dashboard interactivo, basado en tus datos reales.',
    featureList: [
      'Dashboards interactivos en tiempo real',
      'Análisis de rendimiento de campañas',
      'Métricas de ventas y audiencias',
      'Reportes automatizados',
    ],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@id': 'https://bakano.ec/#organization' },
    },
    author: { '@id': 'https://bakano.ec/#organization' },
    publisher: { '@id': 'https://bakano.ec/#organization' },
    inLanguage: 'es-EC',
    keywords:
      'analytics Ecuador, dashboard marketing digital, métricas negocio Ecuador, business intelligence Ecuador, Bakano Metrics',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Herramientas Bakano',
    description: 'Plataformas tecnológicas de Bakano para negocios en Ecuador',
    url: 'https://bakano.ec/herramientas',
    numberOfItems: 1,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Bakano Metrics',
        url: 'https://metrics.bakano.ec',
        description:
          'Plataforma de analytics en tiempo real. Dashboards interactivos para visualizar ventas, campañas y audiencias basados en tus datos reales.',
      },
    ],
  },
]

// ── Router ─────────────────────────────────────────────────────────────────────
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Bakano | Agencia de Marketing Digital #1 en Ecuador',
        description:
          'Bakano es la agencia de marketing digital líder en Ecuador. Ayudamos a negocios en Guayaquil y todo Ecuador a aumentar hasta un 20% su facturación con estrategias data-driven, growth marketing y tecnología avanzada.',
        canonical: 'https://bakano.ec/',
        ogTitle: 'Bakano | Agencia de Marketing Digital #1 en Ecuador',
        ogDescription:
          'Aumenta hasta un 20% tu facturación mensual. Más de 150 negocios transformados en Ecuador con estrategias data-driven y growth marketing.',
        ogUrl: 'https://bakano.ec/',
      } satisfies RouteMeta,
    },
    {
      path: '/herramientas',
      name: 'tools',
      component: ToolsView,
      meta: {
        title: 'Herramientas de Marketing Digital | Bakano Ecuador',
        description:
          'Descubre las plataformas tecnológicas de Bakano para potenciar tu negocio en Ecuador. Bakano Metrics: analytics en tiempo real, dashboards interactivos y métricas de ventas para tomar decisiones basadas en datos.',
        canonical: 'https://bakano.ec/herramientas',
        ogTitle: 'Herramientas Bakano | Analytics y Tecnología para Negocios en Ecuador',
        ogDescription:
          'Bakano Metrics: visualiza ventas, campañas y audiencias en tiempo real. La plataforma de analytics que usan los negocios que crecen en Ecuador.',
        ogUrl: 'https://bakano.ec/herramientas',
        jsonLd: toolsJsonLd,
      } satisfies RouteMeta,
    },
    {
      path: '/politicas-privacidad',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Política de Privacidad | Bakano Ecuador',
        description: 'Política de privacidad de Bakano. Información sobre el tratamiento de datos personales conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.',
        canonical: 'https://bakano.ec/politicas-privacidad',
        ogTitle: 'Política de Privacidad | Bakano Ecuador',
        ogDescription: 'Política de privacidad de Bakano Ecuador.',
        ogUrl: 'https://bakano.ec/politicas-privacidad',
      } satisfies RouteMeta,
    },
    {
      path: '/aviso-legal',
      name: 'legal-notice',
      component: LegalNoticeView,
      meta: {
        title: 'Aviso Legal | Bakano Ecuador',
        description: 'Aviso legal de Bakano Ecuador. Términos y condiciones de uso del sitio web bakano.ec.',
        canonical: 'https://bakano.ec/aviso-legal',
        ogTitle: 'Aviso Legal | Bakano Ecuador',
        ogDescription: 'Aviso legal de Bakano Ecuador.',
        ogUrl: 'https://bakano.ec/aviso-legal',
      } satisfies RouteMeta,
    },
  ],
})

// ── SEO dinámico por ruta ──────────────────────────────────────────────────────
const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el) }
  el.href = href
}

const syncJsonLd = (schemas: object[] | undefined) => {
  // Elimina los JSON-LD de página anteriores (mantiene el global del index.html)
  document.querySelectorAll('script[data-page-jsonld]').forEach(s => s.remove())
  if (!schemas?.length) return
  schemas.forEach(schema => {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-page-jsonld', 'true')
    s.textContent = JSON.stringify(schema)
    document.head.appendChild(s)
  })
}

router.afterEach((to) => {
  const meta = to.meta as RouteMeta

  document.title = meta.title ?? 'Bakano'
  setMeta('description', meta.description ?? '')
  setOgMeta('og:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('og:description', meta.ogDescription ?? meta.description ?? '')
  setOgMeta('og:url', meta.ogUrl ?? '')
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? '')
  setCanonical(meta.canonical ?? '')
  syncJsonLd(meta.jsonLd as object[] | undefined)
})

export default router
