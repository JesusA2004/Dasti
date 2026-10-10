/** Estructura de navegación principal (navbar, menú móvil y footer). */
export interface NavChild {
  name: string
  href: string
  description: string
  badge?: string
}

export interface NavItem {
  name: string
  href: string
  children?: NavChild[]
}

export const mainNav: NavItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  {
    name: 'Productos',
    href: '/productos',
    children: [
      {
        name: 'Tarjetas NFC',
        href: '/productos/tarjetas-nfc',
        description: 'Tarjetas inteligentes para compartir información con un toque o un QR.',
        badge: 'Nuevo',
      },
      {
        name: 'Catálogo de productos',
        href: '/productos',
        description: 'Líneas de producto desarrolladas por DASTI.',
      },
    ],
  },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Nosotros', href: '/nosotros' },
  {
    name: 'Alianzas',
    href: '/alianzas',
    children: [
      {
        name: 'Nexora',
        href: '/alianzas/nexora',
        description: 'Consultoría Contable & Fiscal · Aliado estratégico independiente.',
        badge: 'Aliado',
      },
      {
        name: 'Todas las alianzas',
        href: '/alianzas',
        description: 'Especialistas independientes que complementan a tu empresa.',
      },
    ],
  },
  { name: 'Contacto', href: '/contacto' },
]

export const quoterCta = { name: 'Cotizar solución', href: '/cotizador' }
