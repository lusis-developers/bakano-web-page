import { cld, cldSrcset } from '@/utils/cloudinary'

// Sesión de estudio Karen Muñoz — retratos del equipo completo.
// dsc06994 / dsc06942 / dsc06685 quedan fuera: los usa TheTeam para los fundadores.
export const CULTURE_ROW_TOP = [
  'dsc06427', 'dsc06501', 'dsc06577', 'dsc06674',
  'dsc06802', 'dsc06892', 'dsc06933', 'dsc06966',
  'dsc07037', 'dsc07071', 'dsc07120', 'dsc07213',
]

export const CULTURE_ROW_BOTTOM = [
  'dsc06460', 'dsc06509', 'dsc06628', 'dsc06687',
  'dsc06821', 'dsc06918', 'dsc06939', 'dsc07005',
  'dsc07044', 'dsc07091', 'dsc07155', 'dsc07214',
]

// Las tarjetas miden 320 px como máximo; 360 px cubre 1x y el 2x del srcset.
const CARD = 'c_fill,g_auto,w_360,h_480'

export const toCultureCard = (id: string) => {
  const publicId = `bakano/sesion-karen/${id}`
  return { id, src: cld(publicId, CARD), srcset: cldSrcset(publicId, CARD) }
}
