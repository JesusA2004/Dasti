import { buildWhatsAppLink } from '@/config/contact'

/**
 * ALIANZAS ESTRATÉGICAS
 * ------------------------------------------------------------------
 * Empresas INDEPENDIENTES con las que DASTI colabora comercialmente.
 * Sus servicios NO forman parte del catálogo de DASTI y se contratan
 * directamente con cada aliado, bajo sus propias condiciones.
 *
 * Para agregar un aliado: añade un objeto a `alliances`. La ruta
 * `/alianzas/<slug>`, su tarjeta en la home y en /alianzas, y su página
 * de detalle se generan automáticamente a partir de estos datos.
 */

export interface AllianceService {
  id: string
  name: string
  /** Importe de referencia en MXN. `null` = cotización personalizada. */
  price: number | null
  /** Texto previo al importe, p. ej. "Desde". */
  prefix?: string
  /** Periodicidad, p. ej. "al mes", "por cuatrimestre". */
  unit?: string
  note?: string
  group: string
  featured?: boolean
}

export interface AllianceTheme {
  /** Fondo principal (azul marino profundo / casi negro). */
  bg: string
  bg2: string
  /** Color de acento principal (dorado). */
  accent: string
  accentLight: string
  accentDeep: string
  text: string
  textMuted: string
  line: string
}

export interface Alliance {
  slug: string
  route: string
  /** Nombre comercial tal como se escribe en la marca (p. ej. NEXORA). */
  name: string
  /** Nombre para usar dentro de frases (p. ej. "Conocer a Nexora"). */
  displayName: string
  specialty: string
  badge: string
  headline: string
  motto: string
  description: string
  summary: string
  /** Ruta del logotipo oficial en /public. `null` = espacio reservado. */
  logo: string | null
  heroImage: string
  supportImages: string[]
  whatsapp: { number: string; display: string }
  messages: { general: string; service: (serviceName: string) => string }
  serviceGroups: { id: string; title: string; desc: string }[]
  services: AllianceService[]
  conditions: string[]
  disclaimer: string
  theme: AllianceTheme
  seo: { title: string; description: string; ogTitle: string; ogDesc: string }
}

export const alliances: Alliance[] = [
  {
    slug: 'nexora',
    route: '/alianzas/nexora',
    name: 'NEXORA',
    displayName: 'Nexora',
    specialty: 'Consultoría Contable & Fiscal',
    badge: 'Aliado estratégico independiente',
    headline: 'Haz crecer tu empresa con respaldo contable y fiscal.',
    motto: 'Tu tranquilidad financiera, nuestro compromiso.',
    description:
      'Soluciones para cumplimiento, contabilidad e impuestos con atención profesional y personalizada.',
    summary:
      'Despacho independiente especializado en contabilidad, cumplimiento REPSE, nóminas y asesoría fiscal para empresas.',
    // Coloca el archivo oficial en public/img/alliances/nexora/ y asigna p. ej. '/img/alliances/nexora/logo.svg'
    logo: null,
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&auto=format&fit=crop&q=80',
    supportImages: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    ],
    whatsapp: { number: '527774178753', display: '+52 777 417 8753' },
    messages: {
      general:
        'Hola, conocí Nexora a través del sitio web de DASTI y me gustaría recibir información sobre sus servicios contables y fiscales.',
      service: (serviceName: string) =>
        `Hola, conocí Nexora a través del sitio web de DASTI y me interesa recibir una cotización del servicio de ${serviceName}.`,
    },
    serviceGroups: [
      { id: 'repse', title: 'Cumplimiento REPSE', desc: 'Registro, renovación y obligaciones informativas.' },
      { id: 'contabilidad', title: 'Contabilidad', desc: 'Planes mensuales según el tamaño y la complejidad de tu operación.' },
      { id: 'fiscal', title: 'Fiscal y nóminas', desc: 'Declaraciones, asesoría especializada y seguridad social.' },
    ],
    services: [
      {
        id: 'repse-icsoe-sisub',
        name: 'REPSE · ICSOE + SISUB',
        price: 15000,
        prefix: 'Desde',
        unit: 'por cuatrimestre',
        note: 'Incluye la referencia a hasta 1,000 trabajadores, sujeto a evaluación previa.',
        group: 'repse',
        featured: true,
      },
      { id: 'repse-registro', name: 'Registro o renovación REPSE', price: 6500, prefix: 'Desde', group: 'repse' },
      { id: 'contabilidad-basica', name: 'Contabilidad básica', price: 2500, prefix: 'Desde', unit: 'al mes', group: 'contabilidad' },
      { id: 'contabilidad-empresarial', name: 'Contabilidad empresarial', price: 5500, prefix: 'Desde', unit: 'al mes', group: 'contabilidad' },
      { id: 'contabilidad-fiscal-integral', name: 'Contabilidad fiscal integral', price: 9500, prefix: 'Desde', unit: 'al mes', group: 'contabilidad' },
      {
        id: 'declaracion-anual',
        name: 'Declaración anual empresarial',
        price: null,
        note: 'Cotización personalizada según cantidad de declaraciones, movimientos y complejidad del servicio.',
        group: 'fiscal',
      },
      { id: 'asesoria-fiscal', name: 'Asesoría fiscal especializada', price: 1500, prefix: 'Desde', unit: 'por consulta', group: 'fiscal' },
      { id: 'nominas', name: 'Nóminas y seguridad social', price: null, note: 'Cotización personalizada.', group: 'fiscal' },
    ],
    conditions: [
      'Los importes son precios de referencia en MXN más IVA cuando corresponda.',
      'Las tarifas están sujetas a revisión según información, número de registros, movimientos y complejidad del servicio.',
    ],
    disclaimer:
      'Nexora es un despacho independiente y aliado estratégico de DASTI. Los servicios contables y fiscales son prestados directamente por Nexora, bajo sus propias condiciones y responsabilidad.',
    theme: {
      bg: '#070B14',
      bg2: '#0C1322',
      accent: '#C8A45D',
      accentLight: '#E7CD92',
      accentDeep: '#9A7738',
      text: '#F5F1E8',
      textMuted: 'rgba(245, 241, 232, 0.66)',
      line: 'rgba(200, 164, 93, 0.24)',
    },
    seo: {
      title: 'Nexora · Consultoría Contable & Fiscal | Aliado estratégico de DASTI',
      description:
        'Nexora es un despacho independiente de consultoría contable y fiscal, aliado estratégico de DASTI: REPSE, contabilidad, declaraciones, asesoría fiscal y nóminas. Servicios prestados directamente por Nexora.',
      ogTitle: 'Nexora · Consultoría Contable & Fiscal',
      ogDesc:
        'Despacho contable y fiscal independiente, aliado estratégico de DASTI. Contacto directo con Nexora por WhatsApp.',
    },
  },
]

export function getAlliance(slug: string): Alliance | undefined {
  return alliances.find((a) => a.slug === slug)
}

/** WhatsApp del aliado (nunca el de DASTI). */
export function allianceWhatsAppUrl(alliance: Alliance, serviceName?: string): string {
  const message = serviceName ? alliance.messages.service(serviceName) : alliance.messages.general
  return buildWhatsAppLink(alliance.whatsapp.number, message)
}
