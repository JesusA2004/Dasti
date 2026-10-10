/**
 * Proyectos DASTI. Mientras `status` sea 'pending' se muestran como espacios
 * reservados para futuros casos de estudio (no se presentan como terminados).
 * Para publicar un caso: cambia `status` a 'published', completa `name`,
 * `description`, `image` (ruta en /public/img/projects/...) y `link` si aplica.
 */
export type ProjectStatus = 'pending' | 'published'

export interface Project {
  id: number
  slug: string
  name: string
  description: string
  category: string
  tags: string[]
  image: string | null
  link: string | null
  status: ProjectStatus
}

export const projectCategories = ['Todos', 'Desarrollo', 'Infraestructura', 'Correos', 'Equipos', 'Automatización', 'Web']

export const projects: Project[] = [
  {
    id: 1,
    slug: 'proyecto-software-interno',
    name: 'Proyecto en preparación',
    description: 'Sistema interno personalizado. Detalles próximamente.',
    category: 'Desarrollo',
    tags: ['Software', 'Panel', 'Automatización'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 2,
    slug: 'proyecto-red-empresarial',
    name: 'Proyecto en preparación',
    description: 'Infraestructura de red empresarial. Detalles próximamente.',
    category: 'Infraestructura',
    tags: ['Redes', 'Mesh', 'WiFi'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 3,
    slug: 'proyecto-correo-corporativo',
    name: 'Proyecto en preparación',
    description: 'Implementación de correos corporativos. Detalles próximamente.',
    category: 'Correos',
    tags: ['Correos', 'Dominio', 'Seguridad'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 4,
    slug: 'proyecto-web-corporativo',
    name: 'Proyecto en preparación',
    description: 'Sitio web corporativo moderno. Detalles próximamente.',
    category: 'Web',
    tags: ['Web', 'Diseño', 'Responsivo'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 5,
    slug: 'proyecto-equipos',
    name: 'Proyecto en preparación',
    description: 'Suministro y configuración de equipos. Detalles próximamente.',
    category: 'Equipos',
    tags: ['Equipos', 'Configuración', 'Soporte'],
    image: null,
    link: null,
    status: 'pending',
  },
  {
    id: 6,
    slug: 'proyecto-automatizacion',
    name: 'Proyecto en preparación',
    description: 'Automatización de procesos empresariales. Detalles próximamente.',
    category: 'Automatización',
    tags: ['Automatización', 'Integración', 'APIs'],
    image: null,
    link: null,
    status: 'pending',
  },
]
