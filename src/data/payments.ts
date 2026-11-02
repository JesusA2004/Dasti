import { buildWhatsAppUrl } from '@/config/contact'

/**
 * MÉTODOS DE PAGO · DASTI
 * ------------------------------------------------------------------
 * Información exclusivamente informativa: no hay pasarela ni cobro en línea.
 * Aplica a productos y servicios propios de DASTI; no a Nexora ni a otros
 * aliados independientes (no mostrar esta información en sus páginas).
 *
 * No agregar bancos, cuentas, CLABE, enlaces de cobro, terminales,
 * procesadores, MSI, comisiones ni descuentos sin confirmación oficial.
 */

export type PaymentMethodId = 'efectivo' | 'transferencia' | 'tarjetas'

export interface PaymentMethod {
  id: PaymentMethodId
  title: string
  description: string
}

export const PAYMENT_PAGE_ROUTE = '/metodos-de-pago'

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'efectivo',
    title: 'Efectivo',
    description: 'Aceptamos pagos en efectivo, previa coordinación con nuestro equipo.',
  },
  {
    id: 'transferencia',
    title: 'Transferencia bancaria',
    description:
      'Puedes realizar tu pago mediante transferencia bancaria. Los datos necesarios se proporcionarán directamente al confirmar tu contratación o pedido.',
  },
  {
    id: 'tarjetas',
    title: 'Tarjetas de crédito y débito',
    description:
      'Aceptamos pagos con tarjetas de crédito y débito. Nuestro equipo te indicará el procedimiento disponible para completar tu pago.',
  },
]

/** Etiquetas cortas para menciones discretas (NFC, cotizador, contacto). */
export const paymentShortLabels = ['Efectivo', 'Transferencia', 'Crédito', 'Débito'] as const

export const PAYMENT_SUMMARY = 'Efectivo, transferencia, tarjeta de crédito y débito.'

export const PAYMENT_NOTE =
  'Los métodos y condiciones de pago se confirman directamente con DASTI al realizar la contratación o pedido.'

export const PAYMENT_SCOPE_NOTE =
  'Estos métodos aplican a los productos y servicios propios de DASTI. Los aliados independientes manejan sus propias condiciones.'

export const paymentWhatsAppUrl = buildWhatsAppUrl('Hola, me gustaría conocer las opciones de pago disponibles en DASTI.')
