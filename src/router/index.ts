import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ServicesPage from '@/pages/ServicesPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import QuoterPage from '@/pages/QuoterPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import { alliances } from '@/data/alliances'

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
    {
      path: '/productos',
      component: () => import('@/pages/ProductsPage.vue'),
      meta: {
        title: 'Productos - DASTI',
        description:
          'Productos tecnológicos desarrollados por DASTI, comenzando con tarjetas inteligentes NFC para compartir información digital con un toque o mediante código QR.',
        canonical: 'https://dasti.cloud/productos',
        ogTitle: 'Productos DASTI | Tecnología para compartir y conectar',
        ogDesc: 'Productos tecnológicos DASTI: tarjetas inteligentes NFC con código QR.',
      },
    },
    {
      path: '/productos/tarjetas-nfc',
      component: () => import('@/pages/NfcCardsPage.vue'),
      meta: {
        title: 'Tarjetas inteligentes NFC - DASTI',
        description:
          'Tarjetas inteligentes NFC de DASTI: presentación digital, redes sociales, reseñas de Google y enlaces personalizados. Comparte información con un toque o con su código QR. Solicita tu cotización por WhatsApp.',
        canonical: 'https://dasti.cloud/productos/tarjetas-nfc',
        ogTitle: 'Tarjetas inteligentes NFC | DASTI',
        ogDesc: 'Tarjetas inteligentes. Conexiones inmediatas. Comparte información digital con un toque o un QR.',
      },
    },
    {
      path: '/alianzas',
      component: () => import('@/pages/AlliancesPage.vue'),
      meta: {
        title: 'Alianzas estratégicas - DASTI',
        description:
          'DASTI colabora con especialistas independientes que complementan las necesidades de las empresas. Conoce a nuestros aliados estratégicos.',
        canonical: 'https://dasti.cloud/alianzas',
        ogTitle: 'Alianzas estratégicas | DASTI',
        ogDesc: 'Especialistas independientes que complementan las necesidades de las empresas.',
      },
    },
    // Una ruta por aliado, generada desde src/data/alliances.ts
    ...alliances.map((alliance) => ({
      path: alliance.route,
      component: () => import('@/pages/AllianceDetailPage.vue'),
      props: { slug: alliance.slug },
      meta: {
        title: alliance.seo.title,
        description: alliance.seo.description,
        canonical: `https://dasti.cloud${alliance.route}`,
        ogTitle: alliance.seo.ogTitle,
        ogDesc: alliance.seo.ogDesc,
      },
    })),
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // Espera la transición de página antes de buscar el ancla
    if (to.hash) {
      return new Promise((resolve) => {
        window.setTimeout(() => resolve({ el: to.hash, top: 160, behavior: 'smooth' }), 420)
      })
    }
    return { top: 0 }
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
  if (meta.ogTitle) setMeta('meta[name="twitter:title"]', meta.ogTitle)
  if (meta.ogDesc) setMeta('meta[name="twitter:description"]', meta.ogDesc)
})

export default router
