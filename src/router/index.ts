import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ServicesPage from '@/pages/ServicesPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import QuoterPage from '@/pages/QuoterPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ContactPage from '@/pages/ContactPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage, meta: { title: 'DASTI – Tecnología aplicada a soluciones reales' } },
    { path: '/servicios', component: ServicesPage, meta: { title: 'Servicios – DASTI' } },
    { path: '/proyectos', component: ProjectsPage, meta: { title: 'Proyectos – DASTI' } },
    { path: '/cotizador', component: QuoterPage, meta: { title: 'Cotizador – DASTI' } },
    { path: '/nosotros', component: AboutPage, meta: { title: 'Nosotros – DASTI' } },
    { path: '/contacto', component: ContactPage, meta: { title: 'Contacto – DASTI' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title as string | undefined
  if (title) document.title = title
})

export default router
