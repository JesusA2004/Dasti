import { buildWhatsAppUrl } from '@/config/contact'

/**
 * PRODUCTOS DASTI · TARJETAS INTELIGENTES NFC
 * ------------------------------------------------------------------
 * Configuración editable del catálogo. Todo el contenido de la página
 * /productos/tarjetas-nfc y de la sección de la home se lee de aquí.
 *
 * PRECIOS: importes oficiales FINALES CON IVA INCLUIDO, en MXN
 * (política de precios de productos DASTI). Se capturan como número,
 * p. ej. 399, y la interfaz les da formato.
 *
 * WHATSAPP: todos los botones usan el WhatsApp oficial de DASTI
 * (src/config/contact.ts) con un mensaje precargado por producto.
 *
 * IMÁGENES: coloca las fotografías oficiales en public/img/products/nfc/
 * y asigna la ruta en `src`, p. ej. `${NFC_IMAGE_BASE}/frontal.jpg`.
 * Con `src: null` se muestra un placeholder editorial (o, en los diseños
 * genéricos, una recreación limpia del diseño impreso).
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
  policyNote: 'Precios finales con IVA incluido.',
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

/* ── Catálogo comercial ─────────────────────────────────────────── */

export interface NfcPriceOption {
  id: string
  label: string
  /** Precio final con IVA incluido, MXN. */
  price: number
  /** Mensaje de WhatsApp precargado para esta opción. */
  message: string
}

/** Tarjeta individual: precio base + variantes de diseño. */
export const nfcIndividual = {
  name: 'Tarjeta individual',
  fromPrice: 399,
  subtitle: 'Precios finales con IVA incluido',
  includes: ['NFC + QR funcional', 'Diseño genérico listo para usar', 'Configuración inicial incluida'],
  options: [
    {
      id: 'generico',
      label: 'Diseño genérico listo para usar',
      price: 399,
      message: 'Hola, me interesa la tarjeta NFC individual de DASTI. Quiero recibir información y cotización.',
    },
    {
      id: 'tu-diseno',
      label: 'Tu diseño',
      price: 429,
      message: 'Hola, me interesa la tarjeta NFC individual con mi propio diseño. Quiero recibir información y cotización.',
    },
    {
      id: 'personalizada',
      label: 'Personalizada por nosotros',
      price: 499,
      message: 'Hola, me interesa la tarjeta NFC personalizada por DASTI. Quiero recibir información y cotización.',
    },
  ] as NfcPriceOption[],
}

export interface NfcCombo {
  id: string
  name: string
  cards: number
  /** Precio final con IVA incluido, MXN. */
  price: number
  includes: string[]
  notes: string[]
  message: string
  featured?: boolean
}

export const NFC_COMBOS_FROM = 699

export const nfcCombos: NfcCombo[] = [
  {
    id: 'reputacion',
    name: 'Combo Reputación',
    cards: 2,
    price: 699,
    includes: ['Google Maps', 'Facebook o Instagram'],
    notes: ['Ahorro de $99 MXN frente a dos tarjetas individuales.'],
    message: 'Hola, me interesa el Combo Reputación de tarjetas NFC de DASTI. Quiero recibir información y cotización.',
  },
  {
    id: 'conecta',
    name: 'Combo Conecta',
    cards: 4,
    price: 1199,
    includes: ['Facebook', 'Instagram', 'TikTok', 'WhatsApp'],
    notes: ['Equivale a $299.75 MXN por tarjeta.', 'Ahorro de $397 MXN frente a comprarlas individualmente.'],
    message: 'Hola, me interesa el Combo Conecta de tarjetas NFC de DASTI. Quiero recibir información y cotización.',
  },
  {
    id: 'restaurante-digital',
    name: 'Combo Restaurante Digital',
    cards: 4,
    price: 1249,
    includes: ['Menú digital', 'Sitio web', 'Google Maps', 'WhatsApp'],
    notes: ['Ahorro de $347 MXN frente a cuatro tarjetas individuales.'],
    message: 'Hola, me interesa el Combo Restaurante Digital de tarjetas NFC de DASTI. Quiero recibir información y cotización.',
  },
  {
    id: 'presencia-total',
    name: 'Combo Presencia Total',
    cards: 6,
    price: 1699,
    includes: ['Facebook', 'Instagram', 'TikTok', 'WhatsApp', 'Google Maps', 'Página web o menú'],
    notes: ['Ahorro de $695 MXN frente a seis tarjetas individuales.'],
    message: 'Hola, me interesa el Combo Presencia Total de tarjetas NFC de DASTI. Quiero recibir información y cotización.',
    featured: true,
  },
]

/** Condición general obligatoria de todos los combos. */
export const NFC_COMBOS_NOTE = {
  included: 'Todos los combos incluyen IVA, NFC, QR, configuración inicial y diseños genéricos.',
  excluded: 'La creación de un menú digital o página web no está incluida.',
}

export interface NfcExtra {
  id: string
  name: string
  /** Precio final con IVA incluido, MXN. */
  price: number
  /** `addon` se muestra como "+$X MXN"; `monthly` como "$X MXN/mes". */
  kind: 'addon' | 'monthly'
}

export const NFC_EXTRAS_FROM = 49

export const nfcExtras: NfcExtra[] = [
  { id: 'personalizacion-combo', name: 'Personalización de combo', price: 299, kind: 'addon' },
  { id: 'soporte-acrilico', name: 'Soporte acrílico', price: 79, kind: 'addon' },
  { id: 'protector-acrilico', name: 'Protector acrílico', price: 149, kind: 'addon' },
  { id: 'smart-individual', name: 'Smart individual', price: 49, kind: 'monthly' },
]

export const NFC_EXTRAS_MESSAGE = 'Hola, me interesa agregar extras a mis tarjetas NFC de DASTI. Quiero recibir información.'

/** Envíos y cobertura (información oficial; no agregar políticas no confirmadas). */
export const nfcShipping = [
  { id: 'local', title: 'Jiutepec y Cuernavaca', desc: 'Atención local en Jiutepec y Cuernavaca.' },
  { id: 'nacional', title: 'Envíos a toda la República', desc: 'Enviamos tus tarjetas a cualquier destino de México.' },
  { id: 'costo', title: 'Costo de envío por separado', desc: 'Se cotiza según la ciudad o destino.' },
  { id: 'factura', title: 'Facturación disponible', desc: 'Emitimos factura si la necesitas.' },
] as const

/* ── Diseños genéricos (ejemplos reales impresos) ───────────────── */

export type NfcDesignTheme = 'maps' | 'instagram' | 'facebook'

export interface NfcDesignFront {
  title: string
  text: string
  button: string
  image: ProductImage
}

export interface NfcDesignBack {
  title: string
  text: string
  steps: string[]
  image: ProductImage
}

export interface NfcGenericDesign {
  id: NfcDesignTheme
  name: string
  category: string
  front: NfcDesignFront
  back: NfcDesignBack
}

const TAP_STEPS = ['Desbloquea tu teléfono', 'Acércalo a la tarjeta', 'Se abre automáticamente']

/**
 * Diseños genéricos que DASTI ya produce. Los textos replican los de las
 * tarjetas impresas. Cuando haya fotografías recortadas y limpias, asigna
 * `image.src` (sugerencia de nombres en el comentario de cada una); mientras
 * tanto la interfaz muestra una recreación del diseño.
 */
export const nfcGenericDesigns: NfcGenericDesign[] = [
  {
    id: 'maps',
    name: 'Google Maps · Reseñas',
    category: 'Reputación',
    front: {
      title: '¡Tu opinión es muy importante!',
      text: 'Acerca tu teléfono y comparte tu experiencia en Google Maps.',
      button: 'Dejar reseña',
      // `${NFC_IMAGE_BASE}/google-maps-frente.jpg`
      image: { src: null, alt: 'Tarjeta NFC de reseñas en Google Maps, frente', caption: 'Frente' },
    },
    back: {
      title: 'Tu opinión hace la diferencia',
      text: 'Acerca tu teléfono y comparte tu experiencia en segundos.',
      steps: TAP_STEPS,
      // `${NFC_IMAGE_BASE}/google-maps-reverso.jpg`
      image: { src: null, alt: 'Tarjeta NFC de reseñas en Google Maps, reverso con instrucciones', caption: 'Reverso' },
    },
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Redes sociales',
    front: {
      title: '¡Inspírate con nuestro contenido!',
      text: 'Acerca tu teléfono y descubre fotos, ideas y novedades pensadas para ti.',
      button: 'Ver Instagram',
      // `${NFC_IMAGE_BASE}/instagram-frente.jpg`
      image: { src: null, alt: 'Tarjeta NFC para Instagram, frente', caption: 'Frente' },
    },
    back: {
      title: 'Encuentra inspiración cada día',
      text: 'Acerca tu teléfono y descubre ideas, fotos, novedades y promociones al instante.',
      steps: TAP_STEPS,
      // `${NFC_IMAGE_BASE}/instagram-reverso.jpg`
      image: { src: null, alt: 'Tarjeta NFC para Instagram, reverso con instrucciones', caption: 'Reverso' },
    },
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Comunidad',
    front: {
      title: '¡Únete a nuestra comunidad!',
      text: 'Acerca tu teléfono y descubre novedades, promociones y contenido pensado para ti.',
      button: 'Ir a Facebook',
      // `${NFC_IMAGE_BASE}/facebook-frente.jpg`
      image: { src: null, alt: 'Tarjeta NFC para Facebook, frente', caption: 'Frente' },
    },
    back: {
      title: 'Descubre más en un solo toque',
      text: 'Acerca tu teléfono y conoce novedades, promociones y contenido pensado para ti.',
      steps: TAP_STEPS,
      // `${NFC_IMAGE_BASE}/facebook-reverso.jpg`
      image: { src: null, alt: 'Tarjeta NFC para Facebook, reverso con instrucciones', caption: 'Reverso' },
    },
  },
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
    a: 'Sí. Puedes elegir un diseño genérico listo para usar (desde $399 MXN), enviarnos tu propio diseño ($429 MXN) o pedir que lo personalicemos por ti ($499 MXN). Precios finales con IVA incluido. La información o enlaces de la tarjeta se definen contigo antes de prepararla.',
  },
  {
    q: '¿Cómo solicito mis tarjetas?',
    a: 'Escríbenos por WhatsApp indicando la tarjeta o el combo que te interesa. Revisamos contigo cantidad, diseño y destino digital, y te compartimos la cotización.',
  },
  {
    q: '¿Hacen envíos?',
    a: 'Sí. Atendemos en Jiutepec y Cuernavaca y hacemos envíos a toda la República. El costo de envío se cotiza por separado según la ciudad o destino.',
  },
  {
    q: '¿Puedo solicitar factura?',
    a: 'Sí, la facturación está disponible.',
  },
  {
    q: '¿Los combos incluyen menú digital o página web?',
    a: 'No. Todos los combos incluyen IVA, NFC, QR, configuración inicial y diseños genéricos, pero la creación de un menú digital o página web no está incluida.',
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

/** Enlace al WhatsApp oficial de DASTI con un mensaje precargado del catálogo. */
export function nfcMessageUrl(message: string): string {
  return buildWhatsAppUrl(message)
}
