import { buildWhatsAppUrl } from '@/config/contact'

/**
 * PRODUCTOS DASTI · TARJETAS INTELIGENTES NFC
 * ------------------------------------------------------------------
 * Configuración editable del catálogo. Todo el contenido de la página
 * /productos/tarjetas-nfc y de la sección de la home se lee de aquí.
 *
 * PRECIOS: aún no hay precios oficiales confirmados. Mientras `price`
 * sea `null`, la interfaz muestra "Solicitar cotización".
 * Cuando existan precios, captura el importe FINAL CON IVA INCLUIDO
 * (política de precios de productos DASTI) como número, p. ej. 450.
 *
 * IMÁGENES: coloca las fotografías oficiales en public/img/products/nfc/
 * y asigna la ruta en `src`, p. ej. `${NFC_IMAGE_BASE}/frontal.jpg`.
 * Con `src: null` se muestra un placeholder editorial.
 */

export const NFC_IMAGE_BASE = '/img/products/nfc'

export interface ProductImage {
  src: string | null
  alt: string
  caption: string
}

export const NFC_PRICING = {
  currency: 'MXN',
  pricesIncludeVat: true,
  vatLabel: 'IVA incluido',
  policyNote: 'Todos los precios publicados de productos DASTI incluyen IVA.',
  pendingLabel: 'Solicitar cotización',
}

export const nfcImages: Record<'hero' | 'front' | 'back' | 'desk' | 'hand' | 'phone', ProductImage> = {
  hero: { src: null, alt: 'Tarjeta inteligente NFC de DASTI', caption: 'Fotografía principal del producto' },
  front: { src: null, alt: 'Vista frontal de la tarjeta NFC', caption: 'Vista frontal' },
  back: { src: null, alt: 'Vista posterior de la tarjeta NFC con código QR', caption: 'Vista posterior' },
  desk: { src: null, alt: 'Tarjeta NFC sobre escritorio', caption: 'Presentación sobre escritorio' },
  hand: { src: null, alt: 'Tarjeta NFC en mano', caption: 'Tarjeta en mano' },
  phone: { src: null, alt: 'Tarjeta NFC junto a un smartphone', caption: 'Lectura con smartphone' },
}

export type NfcTypeId = 'presentacion' | 'redes' | 'resenas' | 'enlaces'

export interface NfcCardType {
  id: NfcTypeId
  name: string
  short: string
  description: string
  destination: string
  uses: string[]
  image: ProductImage
}

export const nfcCardTypes: NfcCardType[] = [
  {
    id: 'presentacion',
    name: 'Tarjeta de presentación digital',
    short: 'Presentación',
    description:
      'Comparte tus datos profesionales —nombre, cargo, empresa, teléfono, correo y enlaces principales— sin entregar papel que se pierde.',
    destination: 'Perfil o datos de contacto digitales',
    uses: ['Reuniones y eventos', 'Equipos comerciales', 'Profesionistas independientes'],
    image: { src: null, alt: 'Tarjeta NFC de presentación digital', caption: 'Diseño · presentación digital' },
  },
  {
    id: 'redes',
    name: 'Tarjeta de redes sociales',
    short: 'Redes sociales',
    description:
      'Lleva a las personas directamente a tus perfiles en redes sociales para que te sigan en el momento.',
    destination: 'Perfiles de redes sociales',
    uses: ['Creadores y marcas personales', 'Negocios con presencia en redes', 'Puntos de venta'],
    image: { src: null, alt: 'Tarjeta NFC para redes sociales', caption: 'Diseño · redes sociales' },
  },
  {
    id: 'resenas',
    name: 'Tarjeta para reseñas de Google',
    short: 'Reseñas de Google',
    description:
      'Facilita que tus clientes lleguen al enlace para dejar una reseña de tu negocio en Google, sin buscarlo manualmente.',
    destination: 'Enlace de reseñas de tu perfil de negocio en Google',
    uses: ['Restaurantes y cafeterías', 'Consultorios y servicios', 'Mostradores y recepción'],
    image: { src: null, alt: 'Tarjeta NFC para reseñas de Google', caption: 'Diseño · reseñas' },
  },
  {
    id: 'enlaces',
    name: 'Tarjeta de enlaces personalizados',
    short: 'Enlaces',
    description:
      'Dirige a cualquier destino digital que necesites: sitio web, catálogo, menú, formulario, ubicación u otro enlace.',
    destination: 'El enlace que tú definas',
    uses: ['Catálogos y menús', 'Formularios y registros', 'Promociones y campañas'],
    image: { src: null, alt: 'Tarjeta NFC de enlaces personalizados', caption: 'Diseño · enlaces' },
  },
]

export const nfcSteps = [
  { n: '01', title: 'Eliges el producto', desc: 'Seleccionas el tipo de tarjeta según lo que quieres compartir.' },
  { n: '02', title: 'Defines diseño y personalización', desc: 'Acordamos el diseño y los datos o enlaces que tendrá tu tarjeta.' },
  { n: '03', title: 'DASTI prepara la tarjeta', desc: 'Preparamos la tarjeta física con el diseño aprobado.' },
  { n: '04', title: 'Programamos el destino NFC', desc: 'Configuramos el destino digital y el código QR correspondiente.' },
  { n: '05', title: 'Acercas y compartes', desc: 'La tarjeta se acerca a un smartphone compatible o se escanea su QR.' },
]

export interface NfcPackage {
  id: string
  name: string
  summary: string
  quantity: string
  customization: string
  features: string[]
  conditions: string[]
  /** Precio final con IVA incluido. `null` = mostrar "Solicitar cotización". */
  price: number | null
  featured?: boolean
  image: ProductImage
}

/**
 * Estructura de paquetes lista para recibir la información comercial oficial.
 * Nombres, cantidades y precios deben confirmarse antes de publicar importes.
 */
export const nfcPackages: NfcPackage[] = [
  {
    id: 'individual',
    name: 'Tarjeta individual',
    summary: 'Para profesionistas y personas que quieren su propia tarjeta inteligente.',
    quantity: '1 tarjeta',
    customization: 'Diseño personalizado',
    features: ['Tecnología NFC y código QR', 'Programación del destino digital', 'Elección del tipo de tarjeta'],
    conditions: ['Precio, diseño y tiempos se confirman al cotizar'],
    price: null,
    image: { src: null, alt: 'Paquete de tarjeta individual NFC', caption: 'Paquete individual' },
  },
  {
    id: 'equipos',
    name: 'Paquete para equipos',
    summary: 'Para equipos comerciales o áreas que comparten una misma identidad visual.',
    quantity: 'Varias tarjetas · cantidad a definir',
    customization: 'Diseño de marca con datos por integrante',
    features: ['Tecnología NFC y código QR', 'Programación individual de cada tarjeta', 'Diseño homologado para el equipo'],
    conditions: ['Precio según cantidad y personalización', 'Precio, diseño y tiempos se confirman al cotizar'],
    price: null,
    featured: true,
    image: { src: null, alt: 'Paquete de tarjetas NFC para equipos', caption: 'Paquete para equipos' },
  },
  {
    id: 'empresarial',
    name: 'Paquete empresarial',
    summary: 'Para empresas y negocios que requieren volumen o varios tipos de tarjeta.',
    quantity: 'Volumen · cantidad a definir',
    customization: 'Diseño corporativo y combinación de tipos de tarjeta',
    features: ['Tecnología NFC y código QR', 'Combinación de tipos de tarjeta', 'Atención directa con DASTI'],
    conditions: ['Precio según volumen y requerimientos', 'Precio, diseño y tiempos se confirman al cotizar'],
    price: null,
    image: { src: null, alt: 'Paquete empresarial de tarjetas NFC', caption: 'Paquete empresarial' },
  },
]

export const nfcGallery: ProductImage[] = [
  nfcImages.front,
  nfcImages.back,
  nfcImages.desk,
  nfcImages.hand,
  nfcImages.phone,
  { src: null, alt: 'Acabados y diseños de tarjetas NFC', caption: 'Acabados y diseños' },
]

export const nfcFaq = [
  {
    q: '¿Cómo funciona una tarjeta NFC?',
    a: 'La tarjeta contiene un chip NFC que se programa con un destino digital, por ejemplo un enlace. Al acercarla a un smartphone compatible con NFC activado, el teléfono detecta la tarjeta y ofrece abrir ese destino.',
  },
  {
    q: '¿Para qué sirve el código QR?',
    a: 'El código QR es una alternativa para teléfonos sin NFC o con NFC desactivado: basta con escanearlo con la cámara para abrir el mismo destino.',
  },
  {
    q: '¿Es compatible con cualquier smartphone?',
    a: 'Muchos smartphones actuales incluyen NFC, pero la compatibilidad y la forma de lectura dependen del modelo, del sistema operativo y de su configuración. En algunos equipos es necesario activar NFC en los ajustes. Cuando no es posible usar NFC, el código QR permite acceder al mismo destino.',
  },
  {
    q: '¿Necesito instalar una aplicación?',
    a: 'En muchos smartphones compatibles no es necesario instalar una aplicación para leer la tarjeta. Si tienes dudas sobre un modelo específico, te orientamos al solicitar tu tarjeta.',
  },
  {
    q: '¿Puedo personalizar el diseño?',
    a: 'Sí. El diseño y la información o enlaces de la tarjeta se definen contigo antes de prepararla. Las opciones de acabado y personalización disponibles se confirman al cotizar.',
  },
  {
    q: '¿Cómo solicito mis tarjetas?',
    a: 'Escríbenos por WhatsApp indicando el tipo de tarjeta o paquete que te interesa. Revisamos contigo cantidad, diseño y destino digital, y te compartimos la cotización.',
  },
  {
    q: '¿Cómo se usa en el día a día?',
    a: 'Acerca la tarjeta a la parte del teléfono donde se ubica el lector NFC (suele estar en la parte posterior) o muestra el código QR para que lo escaneen. La persona recibe tu información o enlace en su propio dispositivo.',
  },
  {
    q: '¿Puedo cambiar el destino después?',
    a: 'Depende de cómo se configure la tarjeta. Las opciones para actualizar el destino digital se confirman al momento de solicitarla.',
  },
]

/** Mensaje de WhatsApp (DASTI) que identifica la opción seleccionada. */
export function nfcWhatsAppUrl(option?: string): string {
  const message = option
    ? `Hola, me interesa cotizar tarjetas inteligentes NFC de DASTI. Opción seleccionada: ${option}.`
    : 'Hola, me interesa recibir información sobre las tarjetas inteligentes NFC de DASTI.'
  return buildWhatsAppUrl(message)
}
