import { cld } from '@/utils/cloudinary'

// Retratos de la sesión de estudio (Karen Muñoz). Recorte 3:4 vertical:
// el marco mide 78vh de alto, así que la foto llega a ~1013 px en pantallas grandes.
const PORTRAIT = 'c_fill,g_auto,w_760,h_1013'

export interface TeamMember {
  id: number
  num: string
  name: string
  role: string
  bio: string
  image: string
  linkedin: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    num: '01',
    name: 'Luis Reyes',
    role: 'CEO & Founder — Estratega de Datos y Decisiones de Alto Impacto',
    bio: 'Más de 5 años transformando negocios con datos. Convierte números en decisiones que mueven la aguja.',
    image: cld('bakano/sesion-karen/dsc06994', PORTRAIT),
    linkedin: 'https://www.linkedin.com/in/lualreye/',
  },
  {
    id: 2,
    num: '02',
    name: 'Denisse Quimi',
    role: 'COO & Estratega de Marketing Digital',
    bio: 'Arquitecta de marcas que conectan. Campañas de alto impacto que convierten audiencias en comunidades.',
    image: cld('bakano/sesion-karen/dsc06942', PORTRAIT),
    linkedin: 'https://www.linkedin.com/in/qneniis/',
  },
  {
    id: 3,
    num: '03',
    name: 'Diego Reyes',
    role: 'CTO & Director de Desarrollo Tecnológico',
    bio: 'Construye los sistemas que hacen posible lo imposible. Del código a la estrategia, siempre un paso adelante.',
    image: cld('bakano/sesion-karen/dsc06685', PORTRAIT),
    linkedin: 'https://www.linkedin.com/in/yeyodev1/',
  },
]
