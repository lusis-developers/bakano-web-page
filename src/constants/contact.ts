/**
 * Datos de contacto de Bakano. Único lugar donde vive el número:
 * si cambia, se cambia aquí y no hay que ir a buscarlo por los componentes.
 */

/** Formato para wa.me: código de país sin `+` ni separadores. */
export const WHATSAPP_NUMBER = '593978629445'

/** Formato E.164, para `tel:` y para los datos estructurados. */
export const PHONE_E164 = '+593978629445'

/** Formato para mostrar en pantalla. */
export const PHONE_DISPLAY = '+593 97 862 9445'

/** Mensaje que llega ya escrito en el chat, para saber que viene del sitio. */
export const WHATSAPP_MESSAGE =
  'Hola, vengo desde la web de Bakano y estoy buscando información sobre sus servicios.'

/** Enlace a WhatsApp con el mensaje precargado. */
export function whatsappUrl(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
