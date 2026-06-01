export const CONTACT_CONFIG = {
  whatsappNumber: '527774428209',
  whatsappDisplay: '+52 777 442 8209',
  email: 'contacto@dasti.cloud',
  website: 'https://dasti.cloud',
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}
