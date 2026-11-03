import type { Component } from 'vue'
import { Camera, Clapperboard, Globe, MapPinned, MessageCircle, Users, UtensilsCrossed, Wifi } from '@lucide/vue'
import { NFC_IMAGE_BASE, type NfcProduct } from '@/data/nfc'

/**
 * CATÁLOGO DE DISEÑOS NFC (modalidad «Lista para usar»)
 * ------------------------------------------------------------------
 * Cada categoría tiene DOS DISEÑOS FRONTALES (Modelo 01 y Modelo 02).
 * Se muestran SIEMPRE a partir de sus imágenes originales; no se recrean
 * con CSS ni se dibuja texto encima.
 *
 * Imágenes: public/img/products/nfc/catalogo/<categoria>/modelo-01-frente.png
 *                                                 modelo-02-frente.png
 * Si un archivo aún no existe, la interfaz muestra «Imagen pendiente».
 *
 * El reverso NO forma parte del catálogo: se personaliza con el QR de cada
 * negocio. Un reverso de ejemplo (`modelo-XX-reverso.png`) es opcional y
 * solo se usa si el modelo se declara con `withBack: true`.
 *
 * Agregar un diseño: añade un objeto a `nfcCatalogModels` con `catalogModel()`.
 * Agregar una categoría: añade el id a `NfcCatalogCategoryId`, un objeto en
 * `nfcCatalogCategories` y crea su carpeta de imágenes.
 *
 * Los `id` son estables: se usarán como referencia de artículo en la futura
 * tienda en línea. No los cambies una vez publicados.
 */

export const NFC_CATALOG_BASE = `${NFC_IMAGE_BASE}/catalogo`

export type NfcCatalogCategoryId =
  | 'facebook'
  | 'instagram'
  | 'google-maps'
  | 'whatsapp'
  | 'tiktok'
  | 'wifi'
  | 'sitio-web'
  | 'menu-digital'

export interface NfcCatalogCategory {
  id: NfcCatalogCategoryId
  /** Nombre visible en filtros y fichas. */
  name: string
  /** Función de la tarjeta, en una frase. */
  purpose: string
  /** Ícono genérico (no logotipo oficial de la plataforma). */
  icon: Component
  order: number
}

export const nfcCatalogCategories: NfcCatalogCategory[] = [
  { id: 'facebook', name: 'Facebook', purpose: 'Lleva a tus clientes a tu página de Facebook.', icon: Users, order: 1 },
  { id: 'instagram', name: 'Instagram', purpose: 'Suma seguidores a tu perfil de Instagram.', icon: Camera, order: 2 },
  { id: 'google-maps', name: 'Google Maps', purpose: 'Facilita que te dejen una reseña en Google Maps.', icon: MapPinned, order: 3 },
  { id: 'whatsapp', name: 'WhatsApp', purpose: 'Abre una conversación directa con tu negocio.', icon: MessageCircle, order: 4 },
  { id: 'tiktok', name: 'TikTok', purpose: 'Muestra tus videos y novedades en TikTok.', icon: Clapperboard, order: 5 },
  { id: 'wifi', name: 'Wi-Fi', purpose: 'Comparte el acceso a tu red Wi-Fi.', icon: Wifi, order: 6 },
  { id: 'sitio-web', name: 'Sitio web', purpose: 'Dirige a tu sitio web o página principal.', icon: Globe, order: 7 },
  { id: 'menu-digital', name: 'Menú digital', purpose: 'Abre tu menú digital desde la mesa.', icon: UtensilsCrossed, order: 8 },
]

export interface NfcCatalogImage {
  /** Ruta pública de la imagen original. */
  src: string
  alt: string
}

export interface NfcCatalogModel {
  /** Identificador estable, p. ej. `facebook-02`. Referencia de artículo para la futura tienda. */
  id: string
  categoryId: NfcCatalogCategoryId
  /** Número de modelo dentro de su categoría (1 = izquierda, 2 = derecha en la referencia original). */
  model: number
  /** Nombre visible: «Modelo 01», «Modelo 02». */
  name: string
  /** Frase principal impresa en el diseño, si se conoce. Se muestra como texto, nunca encima de la imagen. */
  headline?: string
  description: string
  /** Diseño FRONTAL original (genérico, listo para usar). Es la única imagen obligatoria. */
  front: NfcCatalogImage
  /**
   * Reverso de ejemplo (OPCIONAL, uso futuro). El reverso real se personaliza
   * con el QR de cada negocio; mientras no exista una imagen aprobada, se deja
   * sin definir y la interfaz muestra la explicación del reverso personalizado.
   */
  back?: NfcCatalogImage
  /** Orden dentro de su categoría. */
  order: number
  /** `false` oculta el modelo del catálogo sin borrarlo. */
  available: boolean
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Ruta convencional del diseño frontal de un modelo. */
export function catalogImagePath(categoryId: NfcCatalogCategoryId, model: number): string {
  return `${NFC_CATALOG_BASE}/${categoryId}/modelo-${pad(model)}-frente.png`
}

/** Ruta convencional de un reverso de ejemplo (opcional, para uso futuro). */
export function catalogBackImagePath(categoryId: NfcCatalogCategoryId, model: number): string {
  return `${NFC_CATALOG_BASE}/${categoryId}/modelo-${pad(model)}-reverso.png`
}

interface CatalogModelOptions {
  headline?: string
  /** Si se omite, se usa la función de la categoría. */
  description?: string
  /** `true` cuando exista un reverso de ejemplo aprobado en la carpeta. */
  withBack?: boolean
  available?: boolean
}

function catalogModel(categoryId: NfcCatalogCategoryId, model: number, options: CatalogModelOptions = {}): NfcCatalogModel {
  const category = nfcCatalogCategories.find((c) => c.id === categoryId)
  const categoryName = category?.name ?? categoryId
  const name = `Modelo ${pad(model)}`
  const label = `Diseño frontal de tarjeta NFC para ${categoryName}, ${name}`
  return {
    id: `${categoryId}-${pad(model)}`,
    categoryId,
    model,
    name,
    headline: options.headline,
    description: options.description ?? category?.purpose ?? '',
    front: {
      src: catalogImagePath(categoryId, model),
      alt: options.headline ? `${label}: «${options.headline}»` : label,
    },
    back: options.withBack
      ? { src: catalogBackImagePath(categoryId, model), alt: `Reverso de ejemplo de la tarjeta NFC para ${categoryName}, ${name}` }
      : undefined,
    order: model,
    available: options.available ?? true,
  }
}

/** 8 categorías × 2 diseños frontales = 16 modelos. */
export const nfcCatalogModels: NfcCatalogModel[] = [
  catalogModel('facebook', 1, {
    headline: '¡Únete a nuestra comunidad!',
    description: 'Fondo azul intenso con el ícono de Facebook y elementos gráficos tecnológicos.',
  }),
  catalogModel('facebook', 2, {
    headline: 'Descubre más en un solo toque',
    description: 'Fondo blanco y azul con la ilustración de un teléfono con Facebook e instrucciones NFC.',
  }),
  catalogModel('instagram', 1, { headline: '¡Inspírate con nuestro contenido!' }),
  catalogModel('instagram', 2, { headline: 'Encuentra inspiración cada día' }),
  catalogModel('google-maps', 1, { headline: '¡Tu opinión es muy importante!' }),
  catalogModel('google-maps', 2, { headline: 'Tu opinión hace la diferencia' }),
  catalogModel('whatsapp', 1, { headline: '¡Hablemos al instante!' }),
  catalogModel('whatsapp', 2, { headline: 'Tu mensaje, en un toque' }),
  catalogModel('tiktok', 1, { headline: '¡Disfruta tips y novedades!' }),
  catalogModel('tiktok', 2, { headline: 'Mira tips al instante' }),
  catalogModel('wifi', 1, { headline: '¡Mantente conectado!' }),
  catalogModel('wifi', 2, { headline: 'Conexión en 3 pasos' }),
  catalogModel('sitio-web', 1, { headline: '¡Descúbrelo todo en un solo lugar!' }),
  catalogModel('sitio-web', 2, {
    description: 'Otra composición del mismo concepto, con indicaciones para abrir el sitio web mediante NFC.',
  }),
  catalogModel('menu-digital', 1, { headline: '¡Conoce nuestro menú!' }),
  catalogModel('menu-digital', 2, { headline: 'Descubre nuestro menú digital' }),
]

export const NFC_CATALOG_COPY = {
  qrNote: 'Cada función tiene dos diseños frontales para elegir. Nosotros configuramos el NFC y personalizamos el QR del reverso para tu negocio.',
  backTitle: 'El frente lo eliges tú.',
  backTitleAccent: 'El reverso lo personalizamos para tu negocio.',
  backText:
    'Cada tarjeta lleva en la parte posterior un código QR personalizado, configurado para llevar a tus clientes al enlace que elijas. Al acercar el teléfono, el NFC abre ese mismo destino.',
  backPoints: [
    'Eliges uno de los dos diseños frontales de tu categoría.',
    'El frente es un diseño genérico, listo para usar.',
    'El reverso se prepara con el QR de tu negocio.',
    'NFC y QR llevan al mismo destino digital que configuramos.',
  ],
  backWhyNoImage: 'Por eso no mostramos un reverso fijo: depende de cada cliente.',
  backIllustrationLabel: 'Ilustración conceptual del reverso, no es un diseño final',
}

export const categoryById = (id: NfcCatalogCategoryId) => nfcCatalogCategories.find((c) => c.id === id)

/** Modelos disponibles, ordenados por categoría y modelo. */
export function catalogModelsFor(categoryId: NfcCatalogCategoryId | 'all'): NfcCatalogModel[] {
  const rank = (m: NfcCatalogModel) => (categoryById(m.categoryId)?.order ?? 99) * 1000 + m.order
  return nfcCatalogModels
    .filter((m) => m.available && (categoryId === 'all' || m.categoryId === categoryId))
    .sort((a, b) => rank(a) - rank(b))
}

export function catalogModelMessage(model: NfcCatalogModel): string {
  const category = categoryById(model.categoryId)?.name ?? model.categoryId
  const headline = model.headline ? ` («${model.headline}»)` : ''
  return `Hola, me interesa la tarjeta NFC para ${category}, ${model.name}${headline}. Me gustaría solicitar información.`
}

/* ── Combinaciones de funciones (datos estructurados) ────────────── */

/** Una línea de combinación: cuántas tarjetas van a una función. */
export interface NfcCardSelection {
  categoryId: NfcCatalogCategoryId
  quantity: number
}

/** Agrupa una lista de tarjetas (una función por tarjeta) en líneas. */
export function summarizeSelection(slots: (NfcCatalogCategoryId | null)[]): NfcCardSelection[] {
  const lines: NfcCardSelection[] = []
  for (const id of slots) {
    if (!id) continue
    const line = lines.find((l) => l.categoryId === id)
    if (line) line.quantity++
    else lines.push({ categoryId: id, quantity: 1 })
  }
  return lines
}

export function selectionText(lines: NfcCardSelection[]): string {
  const parts = lines.map((l) => `${l.quantity} ${categoryById(l.categoryId)?.name ?? l.categoryId}`)
  if (parts.length <= 1) return parts.join('')
  return `${parts.slice(0, -1).join(', ')} y ${parts[parts.length - 1]}`
}

/** Mensaje de WhatsApp para consultar un combo con una combinación concreta. */
export function comboSelectionMessage(combo: Pick<NfcProduct, 'messageSubject' | 'cards'>, lines: NfcCardSelection[]): string {
  const chosen = lines.reduce((n, l) => n + l.quantity, 0)
  const pending = combo.cards - chosen
  const mix = selectionText(lines)
  const rest = pending > 0 ? ` (${pending} por definir)` : ''
  return `Hola, me interesa ${combo.messageSubject} con esta combinación: ${mix}${rest}. Me gustaría solicitar información para realizar mi pedido.`
}
