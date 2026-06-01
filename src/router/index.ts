import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ServicesPage from '@/pages/ServicesPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import QuoterPage from '@/pages/QuoterPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ContactPage from '@/pages/ContactPage.vue'

interface RouteSEO {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDesc: string
  [key: string]: unknown
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: {
        title: 'DASTI | Soluciones en TI',
        description:
          'DASTI desarrolla e implementa soluciones en Tecnologías de la Información para empresas: software, desarrollo web, correos corporativos, redes, equipos de cómputo, automatización, integración de sistemas y soporte técnico en Morelos y Cuernavaca.',
        canonical: 'https://dasti.cloud/',
        ogTitle: 'DASTI | Soluciones en TI para Empresas en Morelos',
        ogDesc:
          'DASTI desarrolla e implementa soluciones en Tecnologías de la Información para empresas: software, desarrollo web, correos corporativos, redes, equipos de cómputo, automatización, integración de sistemas y soporte técnico en Morelos y Cuernavaca.',
      },
    },
    {
      path: '/servicios',
      component: ServicesPage,
      meta: {
        title: 'Servicios TI - DASTI',
        description:
          'Conoce los servicios de DASTI: desarrollo web, software a medida, correos corporativos, redes, sistemas mesh, soporte técnico, equipos de cómputo, automatización, integración de sistemas, chatbots y asesoramiento en TI.',
        canonical: 'https://dasti.cloud/servicios',
        ogTitle: 'Servicios TI en Morelos | DASTI',
        ogDesc:
          'Desarrollo web, software a medida, correos corporativos, redes, sistemas mesh, soporte técnico, equipos de cómputo, automatización e integración de sistemas.',
      },
    },
    {
      path: '/proyectos',
      component: ProjectsPage,
      meta: {
        title: 'Proyectos TI - DASTI',
        description:
          'Explora la sección de proyectos de DASTI, preparada para mostrar desarrollos web, sistemas a medida, integraciones, redes, correos corporativos, soporte técnico y soluciones empresariales en TI.',
        canonical: 'https://dasti.cloud/proyectos',
        ogTitle: 'Proyectos de Tecnología y Soluciones TI | DASTI',
        ogDesc:
          'Proyectos en desarrollo web, sistemas a medida, integraciones, redes, correos corporativos y soporte técnico.',
      },
    },
    {
      path: '/cotizador',
      component: QuoterPage,
      meta: {
        title: 'Cotizador de Servicios - DASTI',
        description:
          'Estima una referencia aproximada para servicios de tecnología: desarrollo web, software a medida, correos corporativos, redes, equipos de cómputo, automatización, integración de sistemas, chatbots y soporte técnico.',
        canonical: 'https://dasti.cloud/cotizador',
        ogTitle: 'Cotizador de Servicios TI | DASTI',
        ogDesc:
          'Estima el costo de servicios de TI: desarrollo web, software a medida, correos corporativos, redes, equipos de cómputo, automatización y soporte técnico.',
      },
    },
    {
      path: '/nosotros',
      component: AboutPage,
      meta: {
        title: 'Nosotros - DASTI',
        description:
          'DASTI es una empresa ubicada en Morelos enfocada en desarrollar, implementar y administrar soluciones en Tecnologías de la Información para empresas en Cuernavaca, Morelos y zonas cercanas.',
        canonical: 'https://dasti.cloud/nosotros',
        ogTitle: 'Nosotros | DASTI - Desarrollo y Aplicación de Soluciones en TI',
        ogDesc:
          'Empresa de soluciones TI en Morelos: software a medida, redes, correos corporativos, equipos de cómputo, soporte técnico y automatización.',
      },
    },
    {
      path: '/contacto',
      component: ContactPage,
      meta: {
        title: 'Contacto - DASTI',
        description:
          'Contacta a DASTI para recibir asesoría en desarrollo web, software a medida, correos corporativos, redes, soporte técnico, equipos de cómputo, automatización, integración de sistemas y soluciones TI.',
        canonical: 'https://dasti.cloud/contacto',
        ogTitle: 'Contacto DASTI | Soluciones en TI en Morelos',
        ogDesc:
          'Contacta a DASTI para asesoría en TI: desarrollo web, software a medida, correos corporativos, redes, soporte técnico y automatización.',
      },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

function setMeta(selector: string, content: string) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

function setCanonical(url: string) {
  const el = document.querySelector('link[rel="canonical"]')
  if (el) el.setAttribute('href', url)
}

router.afterEach((to) => {
  const meta = to.meta as unknown as RouteSEO
  if (meta.title) document.title = meta.title
  if (meta.description) setMeta('meta[name="description"]', meta.description)
  if (meta.canonical) {
    setCanonical(meta.canonical)
    setMeta('meta[property="og:url"]', meta.canonical)
  }
  if (meta.ogTitle) setMeta('meta[property="og:title"]', meta.ogTitle)
  if (meta.ogDesc) setMeta('meta[property="og:description"]', meta.ogDesc)
})

export default router
