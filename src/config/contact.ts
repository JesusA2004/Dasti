/**
 * Contacto oficial de DASTI: +52 777 877 9239 · https://wa.me/527778779239
 * No usar aquí números de aliados: Nexora tiene su propio WhatsApp en
 * src/data/alliances.ts (+52 777 417 8753).
 */
export const CONTACT_CONFIG = {
  whatsappNumber: '527778779239',
  whatsappDisplay: '+52 777 877 9239',
  email: 'contacto@dasti.cloud',
  website: 'https://dasti.cloud',
  // Datos mostrados públicamente en contacto y footer (valores existentes del sitio)
  displayEmail: 'direcciondasti@gmail.com',
  phoneDisplay: '+52 777 877 9239',
  businessHours: 'Lunes a Viernes, 9:00 – 18:00 hrs',
  location: 'Morelos · Cuernavaca, México',
}

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/people/DASTI/61590477301833/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/grupodasti/', icon: 'instagram' },
  { name: 'TikTok', href: 'https://tiktok.com/@dasticloud', icon: 'tiktok' },
] as const

/** Construye un enlace wa.me para cualquier número (DASTI o aliados). */
export function buildWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/** Enlace al WhatsApp oficial de DASTI. */
export function buildWhatsAppUrl(message: string): string {
  return buildWhatsAppLink(CONTACT_CONFIG.whatsappNumber, message)
}
