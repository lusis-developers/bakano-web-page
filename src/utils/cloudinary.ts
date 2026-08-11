const CLOUD_NAME = 'mrp1wwq1'

/**
 * Construye una URL de Cloudinary con transformaciones.
 * Siempre antepone `f_auto,q_auto` para servir AVIF/WebP y calidad adaptativa.
 *
 * cld('bakano/sesion-karen/dsc06427', 'c_fill,g_auto,w_400,h_533')
 */
export function cld(publicId: string, transform = ''): string {
  const t = ['f_auto', 'q_auto', transform].filter(Boolean).join(',')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}/${publicId}.jpg`
}

/**
 * Genera un `srcset` de densidad (1x/2x) escalando los `w_`/`h_` de la transformación.
 * cldSrcset('…/dsc06427', 'c_fill,g_auto,w_400,h_533')
 */
export function cldSrcset(publicId: string, transform: string): string {
  const scaled = transform.replace(/([wh])_(\d+)/g, (_, k, v) => `${k}_${Number(v) * 2}`)
  return `${cld(publicId, transform)} 1x, ${cld(publicId, scaled)} 2x`
}
