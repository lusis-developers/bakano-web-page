// Contenido del homepage. Todo el copy vive aquí para poder ajustarlo sin
// tocar los componentes. Las cifras salen de testimonios y datos ya publicados.
import { cld, cldSrcset } from '@/utils/cloudinary'

import logoI3lab from '@/assets/autoridad/Logo i3lab.webp'
import logoImpulso from '@/assets/autoridad/logo-impulso.webp'
import logoPrendo from '@/assets/autoridad/prendo-logo.webp'

// ── Hero ──────────────────────────────────────────────────────────────────────
const HERO_CROP = 'c_fill,g_faces,w_720,h_860'

export const heroPhoto = {
  src: cld('bakano/sesion-karen/dsc07238', HERO_CROP),
  srcset: cldSrcset('bakano/sesion-karen/dsc07238', HERO_CROP),
  alt: 'Dos estrategas de Bakano revisan los resultados de una campaña en una laptop',
}

export const heroStats = [
  { value: '+150', label: 'negocios atendidos en Ecuador' },
  { value: 'hasta 20%', label: 'más facturación mensual' },
  { value: '90%', label: 'de clientes satisfechos' },
]

export const partners = [
  { name: 'i3lab', logo: logoI3lab, url: 'https://www.i3lab.org/' },
  { name: 'Impulso ECOTEC', logo: logoImpulso, url: 'https://impulso.ecotec.edu.ec/' },
  { name: 'Prendo UTPL', logo: logoPrendo, url: 'https://www.utpl.edu.ec/' },
]

// ── Problema ──────────────────────────────────────────────────────────────────
export const pains = [
  {
    icon: 'fa-solid fa-money-bill-wave',
    title: 'Pagas publicidad y no sabes qué funciona',
    text: 'Se va dinero en Meta cada mes, pero nadie te dice cuántos clientes te trajo ni cuánto te costó cada uno.',
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Publicas, pero las ventas no se mueven',
    text: 'Likes y seguidores suben y bajan. La caja registradora sigue igual que el mes pasado.',
  },
  {
    icon: 'fa-solid fa-user-clock',
    title: 'Todo depende de ti',
    text: 'Contenido, anuncios, mensajes de clientes, reportes. Tu negocio no puede crecer más rápido que tu agenda.',
  },
]

// ── Servicios ─────────────────────────────────────────────────────────────────
export const services = [
  {
    icon: 'fa-brands fa-meta',
    title: 'Publicidad en Meta Ads',
    text: 'Campañas en Facebook e Instagram pensadas para vender, no para juntar likes. Medimos el costo de cada cliente.',
  },
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Estrategia y números',
    text: 'Revisamos tus ventas, márgenes y fugas de dinero para decidir dónde invertir y dónde dejar de hacerlo.',
  },
  {
    icon: 'fa-solid fa-laptop-code',
    title: 'Web y embudos de venta',
    text: 'Páginas rápidas y formularios que convierten la visita en conversación por WhatsApp o en venta.',
  },
  {
    icon: 'fa-solid fa-gears',
    title: 'Automatización y CRM',
    text: 'Seguimiento de clientes, respuestas y reportes que funcionan solos, para que tu equipo atienda y venda.',
  },
]

// ── Cómo trabajamos ───────────────────────────────────────────────────────────
export const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    text: 'Revisamos tus números reales: ventas, costo por cliente y dónde se está escapando el dinero. Sin suposiciones.',
    outcome: 'Sabes exactamente dónde estás.',
  },
  {
    number: '02',
    title: 'Pruebas',
    text: 'Lanzamos campañas pequeñas con distintas ofertas y mensajes. Cada semana vemos qué vende y apagamos lo que no.',
    outcome: 'Encontramos qué te trae clientes.',
  },
  {
    number: '03',
    title: 'Escala',
    text: 'Ponemos más inversión en lo que ya demostró que funciona y lo convertimos en un sistema que se repite.',
    outcome: 'Creces sin depender de la suerte.',
  },
]

// ── Resultados destacados (el número sale de la cita de cada testimonio) ──────
export const resultHighlights: Record<number, string> = {
  1: 'Ventas desde el primer día',
  2: '+$4,500 en el 2.º mes',
  3: '6 meses juntos (eran 3)',
  4: 'Ventas al alza desde la 1.ª pauta',
  5: '+40% de facturación',
  6: 'La demanda superó la producción',
}
