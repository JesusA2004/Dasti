import type { Component } from 'vue'
import { Camera, Clapperboard, Globe, MapPinned, MessageCircle, Users, UtensilsCrossed, Wifi } from '@lucide/vue'
import { NFC_IMAGE_BASE, type NfcProduct } from '@/data/nfc'

/**
 * CATÁLOGO DE DISEÑOS NFC (modalidad «Lista para usar»)
 * ------------------------------------------------------------------
 * Los diseños se muestran SIEMPRE a partir de sus imágenes originales
 * (frente y reverso). No se recrean con CSS ni se dibuja texto encima.
 *
 * Imágenes: public/img/products/nfc/catalogo/<categoria>/modelo-XX-frente.png
 *                                                 modelo-XX-reverso.png
 * Si un archivo aún no existe, la interfaz muestra «Imagen pendiente».
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

export type NfcCardSide = 'front' | 'back'

export interface NfcCatalogImage {
  /** Ruta pública de la imagen original. */
  src: string
  alt: string
}

export interface NfcCatalogModel {
  /** Identificador estable, p. ej. `facebook-01`. */
  id: string
  categoryId: NfcCatalogCategoryId
  name: string
  description: string
  front: NfcCatalogImage
  back: NfcCatalogImage
  /** Orden dentro de su categoría. */
  order: number
  /** `false` oculta el modelo del catálogo sin borrarlo. */
  available: boolean
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Rutas convencionales de frente y reverso de un modelo. */
export function catalogImagePath(categoryId: NfcCatalogCategoryId, model: number, side: NfcCardSide): string {
  return `${NFC_CATALOG_BASE}/${categoryId}/modelo-${pad(model)}-${side === 'front' ? 'frente' : 'reverso'}.png`
}

function catalogModel(categoryId: NfcCatalogCategoryId, model: number, description: string, available = true): NfcCatalogModel {
  const category = nfcCatalogCategories.find((c) => c.id === categoryId)
  const name = `Modelo ${pad(model)}`
  const label = `Tarjeta NFC de ${category?.name ?? categoryId}, ${name.toLowerCase()}`
  return {
    id: `${categoryId}-${pad(model)}`,
    categoryId,
    name,
    description,
    front: { src: catalogImagePath(categoryId, model, 'front'), alt: `${label}: frente con el diseño` },
    back: { src: catalogImagePath(categoryId, model, 'back'), alt: `${label}: reverso con instrucciones y código QR` },
    order: model,
    available,
  }
}

export const nfcCatalogModels: NfcCatalogModel[] = [
  catalogModel('facebook', 1, 'Invita a tus clientes a unirse a tu comunidad y descubrir tus novedades en Facebook.'),
  catalogModel('instagram', 1, 'Comparte tus fotos, ideas y novedades para que te sigan en Instagram.'),
  catalogModel('google-maps', 1, 'Pide a tus clientes que compartan su experiencia con una reseña en Google Maps.'),
  catalogModel('whatsapp', 1, 'Permite que te escriban al instante por WhatsApp, sin guardar tu número.'),
  catalogModel('tiktok', 1, 'Lleva a las personas a tus videos, tips y novedades en TikTok.'),
  catalogModel('wifi', 1, 'Ayuda a tus visitantes a conectarse a tu red Wi-Fi en pocos pasos.'),
  catalogModel('sitio-web', 1, 'Reúne todo en un solo lugar dirigiendo a tu sitio web.'),
  catalogModel('menu-digital', 1, 'Muestra tu menú digital al acercar el teléfono o escanear el QR.'),
]

export const NFC_CATALOG_COPY = {
  qrNote: 'Elige tu diseño. Nosotros configuramos el NFC y personalizamos el QR para tu negocio.',
  qrDetail: 'El reverso incorpora un QR personalizado: el diseño base puede ser el mismo, pero el destino es el de tu negocio.',
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
  return `Hola, me interesa una tarjeta NFC con el diseño de ${category} (${model.name.toLowerCase()}). Me gustaría solicitar información.`
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
