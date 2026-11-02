import { buildWhatsAppUrl } from '@/config/contact'
import { formatMXN } from '@/utils/format'

/**
 * PRODUCTOS DASTI · TARJETAS INTELIGENTES NFC
 * ------------------------------------------------------------------
 * Configuración editable del catálogo. Todo el contenido de la página
 * /productos/tarjetas-nfc y de la sección de la home se lee de aquí.
 *
 * PRECIOS: importes oficiales FINALES CON IVA INCLUIDO, en MXN
 * (política de precios de productos DASTI). Se capturan como número,
 * p. ej. 449, y la interfaz les da formato.
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

export const nfcImages: Record<'hero' | 'front' | 'back' | 'desk' | 'hand' | 'phone' | 'stand', ProductImage> = {
  hero: { src: null, alt: 'Tarjeta inteligente NFC de DASTI', caption: 'Fotografía principal del producto' },
  front: { src: null, alt: 'Vista frontal de la tarjeta NFC', caption: 'Vista frontal' },
  back: { src: null, alt: 'Vista posterior de la tarjeta NFC con código QR', caption: 'Vista posterior' },
  desk: { src: null, alt: 'Tarjeta NFC sobre escritorio', caption: 'Presentación sobre escritorio' },
  hand: { src: null, alt: 'Tarjeta NFC en mano', caption: 'Tarjeta en mano' },
  phone: { src: null, alt: 'Tarjeta NFC junto a un smartphone', caption: 'Lectura con smartphone' },
  // Fotografía real del soporte de madera, p. ej. `${NFC_IMAGE_BASE}/soporte-madera.jpg`
  stand: { src: null, alt: 'Tarjeta NFC vertical en su soporte de madera', caption: 'Tarjeta con soporte de madera' },
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
  { n: '04', title: 'Programamos NFC y QR', desc: 'Configuramos el destino digital y personalizamos el código QR del reverso.' },
  { n: '05', title: 'Acercas y compartes', desc: 'La tarjeta se acerca a un smartphone compatible o se escanea su QR.' },
]

/* ── Catálogo comercial ─────────────────────────────────────────── */

/**
 * Modalidades de diseño. Cada producto (tarjeta individual y combos) tiene
 * un precio final por modalidad. Las condiciones se muestran en la página.
 */
export type NfcDesignMode = 'lista' | 'imprimimos' | 'disenamos'

export interface NfcDesignModeDef {
  id: NfcDesignMode
  label: string
}

export const nfcDesignModes: NfcDesignModeDef[] = [
  { id: 'lista', label: 'Lista para usar' },
  { id: 'imprimimos', label: 'Imprimimos tu diseño' },
  { id: 'disenamos', label: 'Diseñamos para ti' },
]

/** Condiciones de diseño (tarjeta individual y combos). No prometer revisiones ilimitadas. */
export const NFC_DESIGN_CONDITIONS = {
  individual: {
    imprimimos: 'El cliente proporciona su diseño final, listo para impresión.',
    disenamos:
      'DASTI crea una línea gráfica similar entre las tarjetas del pedido y la adapta a cada función. Incluye una ronda de cambios.',
  },
  combos: {
    imprimimos: 'El cliente comparte su diseño final listo para impresión.',
    disenamos:
      'Creamos una línea gráfica similar entre todas las tarjetas y la adaptamos a cada función. Incluye una ronda de cambios.',
  },
} satisfies Record<'individual' | 'combos', Partial<Record<NfcDesignMode, string>>>

/** Precio final con IVA incluido (MXN) por modalidad de diseño. */
export type NfcModePrices = Record<NfcDesignMode, number>

export interface NfcProduct {
  id: string
  name: string
  cards: number
  /** Texto de cantidad, p. ej. "4 tarjetas NFC + QR". */
  quantityLabel: string
  /** Cómo se nombra el producto en el mensaje de WhatsApp. */
  messageSubject: string
  prices: NfcModePrices
  includes: string[]
}

/** Tarjeta individual. */
export const nfcIndividual = {
  id: 'individual',
  name: 'Tarjeta individual',
  cards: 1,
  quantityLabel: '1 tarjeta',
  messageSubject: 'la Tarjeta individual de 1 tarjeta NFC + QR',
  fromPrice: 449,
  subtitle: 'Precios finales con IVA incluido',
  prices: { lista: 449, imprimimos: 479, disenamos: 499 },
  includes: ['NFC + QR funcional', 'Diseño listo para usar', 'Configuración inicial incluida', 'Entrega lista para usar'],
} satisfies NfcProduct & { fromPrice: number; subtitle: string }

export const NFC_COMBOS_FROM = 799

export const NFC_COMBOS_INTRO = {
  title: 'Combos más vendidos',
  subtitle: 'Pensados para negocios que quieren conectar mejor con sus clientes.',
}

export const nfcCombos: NfcProduct[] = [
  {
    id: 'impulso',
    name: 'Combo Impulso',
    cards: 2,
    quantityLabel: '2 tarjetas NFC + QR',
    messageSubject: 'el Combo Impulso de 2 tarjetas NFC + QR',
    prices: { lista: 799, imprimimos: 849, disenamos: 899 },
    includes: ['2 tarjetas NFC + QR', 'Tú eliges para qué utilizar cada tarjeta'],
  },
  {
    id: 'conecta',
    name: 'Combo Conecta',
    cards: 4,
    quantityLabel: '4 tarjetas NFC + QR',
    messageSubject: 'el Combo Conecta de 4 tarjetas NFC + QR',
    prices: { lista: 1499, imprimimos: 1599, disenamos: 1699 },
    includes: ['4 tarjetas NFC + QR', 'Ideal para redes sociales, WhatsApp, Google Maps o página web'],
  },
  {
    id: 'presencia-total',
    name: 'Combo Presencia Total',
    cards: 6,
    quantityLabel: '6 tarjetas NFC + QR',
    messageSubject: 'el Combo Presencia Total de 6 tarjetas NFC + QR',
    prices: { lista: 2099, imprimimos: 2249, disenamos: 2399 },
    includes: [
      '6 tarjetas NFC + QR',
      'Mayor presencia para tu negocio',
      'Posibilidad de asignar diferentes funciones a las tarjetas',
    ],
  },
]

/** Plan Empresarial: sin precio fijo (cotización especial por volumen). */
export const nfcEnterprise = {
  id: 'empresarial',
  name: 'Plan Empresarial',
  quantityLabel: '7 o más tarjetas',
  priceLabel: 'Cotización especial',
  tagline: 'Precio preferencial por volumen.',
  includes: ['Ideal para equipos o sucursales', 'Tú eliges la función de cada tarjeta', 'Atención personalizada'],
  message:
    'Hola, me interesa el Plan Empresarial de DASTI para 7 o más tarjetas NFC + QR. Me gustaría solicitar una cotización especial.',
}

/** Condición general obligatoria de todos los combos. */
export const NFC_COMBOS_NOTE = {
  included: 'Todos los combos incluyen IVA, NFC, QR y configuración inicial.',
  excluded: 'La creación de una página web o catálogo digital no está incluida en el precio.',
}

/** Mensaje de WhatsApp que identifica producto, cantidad y modalidad. */
export function nfcOrderMessage(product: Pick<NfcProduct, 'messageSubject'>, mode: NfcDesignMode): string {
  const label = nfcDesignModes.find((m) => m.id === mode)?.label ?? ''
  return `Hola, me interesa ${product.messageSubject}, en la modalidad ${label}. Me gustaría solicitar información para realizar mi pedido.`
}

/* ── Soporte de madera (incluido en cada tarjeta) ──────────────────── */

/**
 * Cada tarjeta NFC vendida por DASTI incluye su propio soporte de madera,
 * sin costo adicional: 1 tarjeta = 1 soporte; un combo de 4 = 4 soportes.
 * No confundir con el antiguo "soporte acrílico" (+$79), ya retirado.
 */
export const NFC_STAND = {
  title: 'Soporte de madera incluido',
  headline: 'Cada tarjeta incluye su propio soporte de madera.',
  description:
    'Tu tarjeta NFC llega lista para exhibirse en mostrador, recepción o mesa: cada una viene acompañada de su soporte de madera, sin costo adicional.',
  costLabel: 'Sin costo adicional',
  enterpriseLabel: '1 soporte de madera por cada tarjeta',
}

/** Texto de soportes según el número de tarjetas (siempre uno por tarjeta). */
export function nfcStandLabel(cards: number): string {
  return cards === 1 ? '1 soporte de madera incluido' : `${cards} soportes de madera incluidos, uno por tarjeta`
}

/* ── Administración de enlaces (en desarrollo) ──────────────────────── */

/**
 * Panel para que cada cliente cambie el destino de sus tarjetas (NFC y QR)
 * con su propio usuario y contraseña. ESTÁ EN DESARROLLO: no publicar URL
 * de acceso, inicio de sesión, planes, límites ni analítica.
 *
 * Cuando el sistema esté operativo, cambia `status` a 'disponible' y revisa
 * los textos de `statusCopy.disponible`. La sección no requiere rediseño.
 */
export type NfcLinkManagerStatus = 'en-desarrollo' | 'disponible'

export const NFC_LINK_MANAGER = {
  status: 'en-desarrollo' as NfcLinkManagerStatus,
  eyebrow: 'Tu tarjeta evoluciona con tu negocio',
  description:
    'Estamos desarrollando un panel de administración para que cada cliente controle a dónde dirigen sus tarjetas. Con tu propio usuario y contraseña podrás cambiar el destino digital sin comprar otra tarjeta física.',
  benefits: [
    { id: 'misma-tarjeta', title: 'La misma tarjeta, otro destino', desc: 'Actualiza el enlace sin reimprimir ni reemplazar la tarjeta.' },
    { id: 'nfc-qr', title: 'NFC y QR a la vez', desc: 'El cambio aplica al destino administrado, tanto al acercar la tarjeta como al escanear su QR.' },
    { id: 'acceso', title: 'Acceso individual', desc: 'Cada cliente entra con su propio usuario y contraseña a las tarjetas que adquirió.' },
  ],
  statusCopy: {
    'en-desarrollo': {
      badge: 'Panel de administración de enlaces: próximamente',
      note: 'El panel está en desarrollo y se habilitará para los clientes de DASTI. Mientras tanto, DASTI realiza la configuración inicial de cada tarjeta.',
    },
    disponible: {
      badge: 'Panel de administración de enlaces disponible',
      note: 'Al adquirir tus tarjetas recibes tu acceso individual al panel.',
    },
  } satisfies Record<NfcLinkManagerStatus, { badge: string; note: string }>,
  /** Ejemplos ilustrativos antes/después (no son datos de clientes reales). */
  examples: [
    {
      id: 'perfil-a-web',
      label: 'De Instagram a tu sitio web',
      before: { title: 'Perfil de Instagram', url: 'instagram.com/tu-negocio' },
      after: { title: 'Sitio web', url: 'tu-negocio.com' },
    },
    {
      id: 'menu',
      label: 'Del menú anterior al actualizado',
      before: { title: 'Menú de temporada anterior', url: 'tu-negocio.com/menu-anterior' },
      after: { title: 'Menú actualizado', url: 'tu-negocio.com/menu' },
    },
  ],
  message: 'Hola, me interesan las tarjetas NFC de DASTI y quiero saber más sobre la administración de enlaces.',
}

/** Envíos y cobertura (información oficial; no agregar políticas no confirmadas). */
export const nfcShipping = [
  { id: 'local', title: 'Jiutepec y Cuernavaca', desc: 'Atención local en Jiutepec y Cuernavaca.' },
  { id: 'nacional', title: 'Envíos a toda la República', desc: 'Enviamos tus tarjetas a cualquier destino de México.' },
  { id: 'costo', title: 'Costo de envío por separado', desc: 'Se cotiza según la ciudad o destino.' },
  { id: 'factura', title: 'Facturación disponible', desc: 'Emitimos factura si la necesitas.' },
] as const

export const nfcFaq = [
  {
    q: '¿Cómo funciona una tarjeta NFC?',
    a: 'La tarjeta contiene un chip NFC que se programa con un destino digital, por ejemplo un enlace. Al acercarla a un smartphone compatible con NFC activado, el teléfono detecta la tarjeta y ofrece abrir ese destino.',
  },
  {
    q: '¿Para qué sirve el código QR?',
    a: 'El código QR va en el reverso de la tarjeta y se personaliza para tu negocio. Es una alternativa para teléfonos sin NFC o con NFC desactivado: basta con escanearlo con la cámara para abrir el mismo destino.',
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
    a: `Sí. Cada tarjeta y combo se ofrece en tres modalidades: Lista para usar, Imprimimos tu diseño (nos compartes tu diseño final listo para impresión) o Diseñamos para ti (creamos una línea gráfica similar entre las tarjetas y la adaptamos a cada función; incluye una ronda de cambios). La tarjeta individual cuesta ${formatMXN(nfcIndividual.prices.lista)}, ${formatMXN(nfcIndividual.prices.imprimimos)} o ${formatMXN(nfcIndividual.prices.disenamos)} MXN, respectivamente. Precios finales con IVA incluido.`,
  },
  {
    q: '¿Puedo combinar diferentes funciones en un combo?',
    a: 'Sí. Cada tarjeta del combo puede dirigir a un destino distinto o repetir el mismo, como prefieras: por ejemplo, una para Facebook, otra para tu menú digital, otra para WhatsApp y otra para reseñas en Google Maps.',
  },
  {
    q: '¿Qué incluye cada tarjeta?',
    a: `NFC + QR personalizado, configuración inicial y su propio soporte de madera, sin costo adicional. En los combos recibes un soporte por cada tarjeta.`,
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
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos efectivo, transferencia bancaria y tarjetas de crédito y débito. Los métodos y condiciones de pago se confirman directamente con DASTI al realizar tu pedido.',
  },
  {
    q: '¿Los combos incluyen página web o catálogo digital?',
    a: `No. ${NFC_COMBOS_NOTE.included} ${NFC_COMBOS_NOTE.excluded}`,
  },
  {
    q: '¿Cómo se usa en el día a día?',
    a: 'Acerca la tarjeta a la parte del teléfono donde se ubica el lector NFC (suele estar en la parte posterior) o muestra el código QR para que lo escaneen. La persona recibe tu información o enlace en su propio dispositivo.',
  },
  {
    q: '¿Puedo cambiar el destino después?',
    a: 'Estamos desarrollando un panel de administración de enlaces para que puedas cambiar el destino de tus tarjetas con tu propio usuario y contraseña, sin cambiar la tarjeta física. Mientras se habilita, las opciones para actualizar el destino se confirman al momento de solicitar tus tarjetas.',
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
