// Fotos de perfil reales extraídas de los perfiles públicos de Instagram
import avScarlett from '@/assets/testimonios/avatars/scarlett.jpg'
import avAle from '@/assets/testimonios/avatars/ale.jpg'
import avTeque from '@/assets/testimonios/avatars/teque.jpg'
import avNato from '@/assets/testimonios/avatars/nato.jpg'
import avMega from '@/assets/testimonios/avatars/mega.jpg'
import avNicole from '@/assets/testimonios/avatars/nicole.jpg'

export interface Testimonial {
  id: number
  name: string
  business: string
  handle: string
  /** Cita textual tomada de la transcripción del video publicado en Instagram */
  quote: string
  /** Post de Instagram con el video del testimonio (null = sin video público) */
  postUrl: string | null
  /** Perfil de Instagram */
  profileUrl: string | null
  image: string | null
}

// Citas transcritas de los videos reales publicados en @bakano.ec
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Scarlett Córdova',
    business: 'Emprendedora',
    handle: '@scarlettcordova9',
    quote:
      'Me guiaron súper bien, sin palabras técnicas. El resultado son las ventas inmediatas desde el primer día… y vamos por más.',
    postUrl: 'https://www.instagram.com/p/Db6MuG4ipKz/',
    profileUrl: 'https://www.instagram.com/scarlettcordova9/',
    image: avScarlett,
  },
  {
    id: 2,
    name: 'Ale Barreto',
    business: 'Ale Barreto Studio',
    handle: '@malejabarretos',
    quote:
      'El segundo mes de pauta cerramos ventas por más de $4,500, con clientes nuevos que nunca habían escuchado de Ale Barreto Studio.',
    postUrl: 'https://www.instagram.com/p/DXfYBCekYQZ/',
    profileUrl: 'https://www.instagram.com/malejabarretos/',
    image: avAle,
  },
  {
    id: 3,
    name: 'Tequecruncheesse',
    business: 'Snacks & Food',
    handle: '@tequecruncheese_gye',
    quote:
      'Eran tres meses y ya llevamos seis: el acompañamiento ha sido igual. No nos abandonan. 100% recomendado.',
    postUrl: 'https://www.instagram.com/p/DVByycLETon/',
    profileUrl: 'https://www.instagram.com/tequecruncheese_gye/',
    image: avTeque,
  },
  {
    id: 4,
    name: 'La Parrilla del Ñato',
    business: 'Restaurante · 45 años de tradición',
    handle: '@laparrilladelnato',
    quote:
      'Desde la primera vez que se pautó vimos los resultados: comenzaron a incrementarse las ventas. Son súper profesionales.',
    postUrl: 'https://www.instagram.com/p/DZsWWZZGFrn/',
    profileUrl: 'https://www.instagram.com/laparrilladelnato/',
    image: avNato,
  },
  {
    id: 5,
    name: 'Megaprinter',
    business: 'Imprenta & Tecnología',
    handle: '@megaprinter.ec',
    quote:
      'Con la ayuda de Bakano pudimos obtener un aumento en nuestra facturación de un 40%.',
    postUrl: 'https://www.instagram.com/p/DYneDjbAZb3/',
    profileUrl: 'https://www.instagram.com/megaprinter.ec/',
    image: avMega,
  },
  {
    id: 6,
    name: 'Nicole Pastry Arts',
    business: 'Repostería artesanal',
    handle: '@nicole_pastry_arts',
    // Resultado real: la demanda superó su capacidad de producción
    quote:
      'Nos rompieron la producción: la demanda superó lo que la cocina podía hornear.',
    postUrl: null,
    profileUrl: 'https://www.instagram.com/nicole_pastry_arts/',
    image: avNicole,
  },
]

export const testimonialInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
