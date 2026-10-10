# Rediseño frontend DASTI — Documentación de cambios

> Rama: `main` · Todos los cambios son **modificaciones locales sin commit**.
> No se ejecutaron build, type-check, lint, pruebas ni despliegues.

---

## A. Resumen

Se rediseñó por completo la experiencia visual de dasti.cloud con una dirección **Premium Organic Tech / Editorial Digital Experience**, interpretando la referencia *Orizon — New Way of Living* para una empresa tecnológica:

- **Grandes contenedores redondeados ("stage")** que alternan superficies claras editoriales (`paper`), bloques azul marino profundo (`ink`) y un azul cielo (`sky`).
- **Navegación flotante en cápsulas** con dropdowns, barra de progreso de lectura y menú móvil a pantalla completa.
- **Tipografía editorial**: titulares grandes en Geist con acentos en *Instrument Serif* itálica.
- **Composiciones distintas por sección**: índice tipográfico, columnas fijas con progreso, mosaicos bento, rieles horizontales y bloques oscuros. Se abandonó la cuadrícula repetitiva de tarjetas con íconos.
- **Hero interactivo conservado y elevado**: misma red de partículas que reacciona al puntero, ahora en un stage con:
  - titular con entrada por líneas;
  - panel fotográfico que cambia según la solución activa;
  - rail vertical de botones circulares con rotación automática e indicador de progreso;
  - parallax con el puntero.
- **Nuevas áreas**: Productos (tarjetas NFC) y Alianzas estratégicas (Nexora, con identidad propia azul marino y dorado).
- Todo el contenido comercial (servicios, tarifas, cotizador, descuentos, contacto) se conservó **sin alterar valores**.

## B. Tecnologías

**Conservadas:** Vue 3 (Composition API + `<script setup>`), TypeScript, Vite, Vue Router, Tailwind CSS 4, VueUse (`@vueuse/core`), VueUse Motion (plugin registrado, ya no se usa en las vistas nuevas), Pinia, Lucide (`@lucide/vue`) y CSS personalizado.

**Dependencias añadidas:** ninguna.

Las animaciones se resolvieron sin librerías nuevas:

| Recurso | Uso |
|---|---|
| Directiva `v-reveal` (`src/directives/reveal.ts`) | Revelado progresivo con un único IntersectionObserver. Variantes: `up`, `fade`, `left`, `right`, `scale`, `clip` (títulos) e `image` (revelado de fotografías). |
| `useSectionProgress` | Progreso 0→1 de una sección durante el scroll, agrupado en `requestAnimationFrame`. Se usa en el texto de la propuesta de valor y en la línea de pasos NFC. |
| `usePointerVars` | Escribe `--px`/`--py` como variables CSS para parallax y tilt, sin renders de Vue. Solo se activa con mouse. |
| `AnimatedParticles` (mejorado) | Canvas con escalado DPR, densidad proporcional al área, pausa fuera de vista o con la pestaña oculta, y cuadro estático con movimiento reducido. |
| CSS | Transiciones de página, keyframes y `@media (prefers-reduced-motion)` global. |

**Tipografía:** Inter + Space Grotesk se reemplazaron por **Geist** (interfaz, cuerpo y titulares) e **Instrument Serif** (acentos editoriales e identidad de Nexora). Siguen siendo dos familias: Geist ofrece un tono técnico y preciso, y la serif aporta el carácter editorial que pedía la referencia.

**Temas:** el sistema pasó de 4 temas a **2 (claro/oscuro)**, con alternador en la navegación.
- Los valores guardados anteriormente (`dark`, `blue-premium`, `indigo`, `light`, etc.) se migran automáticamente.
- Si no hay preferencia guardada, se usa la del sistema operativo.
- Un script en `index.html` aplica el tema antes de pintar, para evitar el parpadeo.
- La variante `dark:` de Tailwind responde a `data-theme`.

## C. Archivos

### Creados

| Archivo | Propósito |
|---|---|
| `src/data/quoter.ts` | Catálogo, precios y descuentos del cotizador (copiados textualmente). |
| `src/data/services.ts` | Catálogo de servicios + `layout`, `label` e `image` por categoría. |
| `src/data/faq.ts` | Preguntas frecuentes generales (texto existente). |
| `src/data/projects.ts` | Proyectos en preparación + categorías del filtro. |
| `src/data/navigation.ts` | Estructura del menú principal y dropdowns. |
| `src/data/nfc.ts` | Configuración completa del producto NFC. |
| `src/data/alliances.ts` | Aliados estratégicos (Nexora). |
| `src/directives/reveal.ts` | Directiva global `v-reveal`. |
| `src/composables/useSectionProgress.ts` | Progreso de scroll por sección. |
| `src/composables/usePointerVars.ts` | Variables CSS del puntero (parallax/tilt). |
| `src/utils/format.ts` | `formatMXN`. |
| `src/components/ui/SectionIntro.vue` | Encabezado de sección (eyebrow + título + entrada). |
| `src/components/ui/MediaFrame.vue` | Imagen con placeholder editorial. Si `src` es `null` o falla la carga, muestra el placeholder. |
| `src/components/ui/FaqList.vue` | Acordeón accesible reutilizable. |
| `src/components/ui/WhatsAppIcon.vue` | Ícono de WhatsApp. |
| `src/components/home/HomeManifesto.vue` | Propuesta de valor; el texto se enciende con el scroll. |
| `src/components/home/HomeSolutions.vue` | Índice de soluciones + imagen activa + cinta del catálogo. |
| `src/components/home/HomeProcess.vue` | Forma de trabajo con columna fija y progreso. |
| `src/components/home/HomeNfc.vue` | Presentación de tarjetas NFC. |
| `src/components/home/HomeProjects.vue` | Riel horizontal de casos en preparación. |
| `src/components/home/HomeAbout.vue` | Acerca de DASTI + modalidades de atención. |
| `src/components/home/HomeAlliances.vue` | Alianzas estratégicas. |
| `src/components/home/HomeCta.vue` | CTA final. |
| `src/components/services/ServiceBlock.vue` | Detalle de un servicio (incluye / ideal para / CTAs). |
| `src/components/products/NfcCardVisual.vue` | Tarjeta NFC ilustrativa en CSS con tilt. |
| `src/components/products/NfcPhoneMock.vue` | Smartphone esquemático por tipo de tarjeta. |
| `src/components/alliances/AllianceCard.vue` | Tarjeta de aliado con su propia identidad visual. |
| `src/components/alliances/IndependenceNotice.vue` | Leyenda de independencia. |
| `src/pages/ProductsPage.vue` | `/productos` |
| `src/pages/NfcCardsPage.vue` | `/productos/tarjetas-nfc` |
| `src/pages/AlliancesPage.vue` | `/alianzas` |
| `src/pages/AllianceDetailPage.vue` | `/alianzas/:aliado` (generada por datos) |
| `public/img/products/nfc/.gitkeep` | Carpeta para fotografías NFC. |
| `public/img/alliances/nexora/.gitkeep` | Carpeta para el logotipo y las imágenes de Nexora. |
| `docs/REDISENO-FRONTEND-DASTI.md` | Este documento. |

### Modificados

| Archivo | Cambio |
|---|---|
| `index.html` | Fuentes (Geist + Instrument Serif), script de tema inicial, `theme-color`, "Tarjetas inteligentes NFC" en `knowsAbout`. Resto del SEO y JSON-LD intacto. |
| `public/sitemap.xml` | +4 URLs nuevas. |
| `src/style.css` | Nuevo sistema visual: tokens, capas `base`/`components`, botones, superficies, placeholders, reveal y movimiento reducido. Conserva alias de variables antiguas para compatibilidad. |
| `src/main.ts` | Registro de la directiva `v-reveal`. |
| `src/router/index.ts` | 4 rutas nuevas (carga diferida), rutas de aliados generadas desde datos, scroll a anclas (`#cat-0X`), actualización de `twitter:title` y `twitter:description`. |
| `src/App.vue` | Enlace "Saltar al contenido", nueva transición de página. `ThemeSelector` se movió a la navegación. |
| `src/config/contact.ts` | Datos de contacto mostrados, redes sociales y `buildWhatsAppLink(numero, mensaje)`. `buildWhatsAppUrl` se conserva. |
| `src/composables/useTheme.ts` | Claro/oscuro, migración de temas, `toggleTheme`. |
| `src/components/AppNavbar.vue` | Navegación nueva completa. |
| `src/components/FooterSection.vue` | Footer nuevo. |
| `src/components/FloatingCTA.vue` | Accesos flotantes contextuales. |
| `src/components/ThemeSelector.vue` | Ahora es un alternador claro/oscuro. |
| `src/components/InteractiveHero.vue` | Hero nuevo (concepto interactivo conservado). |
| `src/components/AnimatedParticles.vue` | Rendimiento, movimiento reducido, prop `color`. API compatible. |
| `src/components/QuoterSection.vue` | Interfaz nueva; lógica idéntica. |
| `src/components/ContactSection.vue` | Interfaz nueva; lógica idéntica. |
| `src/components/FaqSection.vue` | Interfaz nueva; datos en `src/data/faq.ts`. |
| `src/components/LargeProjectsCTA.vue` | Interfaz nueva; mismo contenido y mensajes. |
| `src/pages/*` existentes | Rediseño de Inicio, Servicios, Proyectos, Nosotros, Cotizador y Contacto. |

### Eliminados

Ninguno de los archivos originales.

### Componentes que quedaron sin uso

Estos archivos **no se modificaron ni se eliminaron**, pero ya no se importan en ninguna vista. Se dejan para tu revisión; pueden eliminarse si no se van a reutilizar:

- Nunca se importaban (ya estaban sin uso antes del rediseño): `HeroSection`, `ServicesSection`, `ProjectsSection`, `AboutSection`, `UseCases`, `WhyDasti`, `SolutionsByNeed`, `CoverageSection`, `ProcessSection`.
- Quedaron sin uso con el rediseño: `SolutionConfigurator`, `DastiAboutBlock`, `GuidedTourSection`, `VisualServicesExplorer`, `MeetingModesSection`, `ProjectShowcasePreview`, `MiniQuoteCTA`.
- Store de ejemplo de Pinia: `src/stores/counter.ts`.

## D. Rutas y navegación

| Ruta | Estado |
|---|---|
| `/` | Rediseñada |
| `/servicios` | Rediseñada (anclas `#cat-01` … `#cat-06` conservadas) |
| `/proyectos` | Rediseñada |
| `/cotizador` | Rediseñada |
| `/nosotros` | Rediseñada |
| `/contacto` | Rediseñada |
| `/productos` | **Nueva** — catálogo de productos |
| `/productos/tarjetas-nfc` | **Nueva** — página de producto NFC |
| `/alianzas` | **Nueva** — listado de aliados |
| `/alianzas/nexora` | **Nueva** — página de Nexora (generada desde `src/data/alliances.ts`) |

**Menú principal:** Inicio · Servicios · Productos ▾ (Tarjetas NFC, Catálogo) · Proyectos · Nosotros · Alianzas ▾ (Nexora, Todas las alianzas) · Contacto. Se suman el CTA destacado **Cotizar** y el alternador de tema.

- **Escritorio:** los dropdowns abren con clic, teclado (Enter/Espacio, Escape para cerrar) o hover solo con mouse, y se cierran al hacer clic fuera.
- **Móvil:** menú a pantalla completa con acordeones, CTA al cotizador, WhatsApp y alternador de tema. Bloquea el scroll mientras está abierto y se cierra con Escape o al navegar.

**SEO:** cada ruta nueva tiene `title`, `description`, `canonical`, `og:title`, `og:description` y `twitter:*` (desde `meta` del router). Los datos estructurados no atribuyen servicios contables o fiscales a DASTI ni mencionan a Nexora como parte de DASTI.

## E. Productos NFC

Todo vive en **`src/data/nfc.ts`**. Las vistas (`NfcCardsPage.vue`, `HomeNfc.vue`, `ProductsPage.vue`) solo leen esa configuración.

| Elemento | Dónde se edita |
|---|---|
| Tipos de tarjeta | `nfcCardTypes` (presentación digital, redes sociales, reseñas de Google, enlaces personalizados) |
| Pasos del proceso | `nfcSteps` (5 pasos) |
| Paquetes | `nfcPackages` |
| Galería | `nfcGallery` |
| Preguntas frecuentes | `nfcFaq` |
| Política de precios | `NFC_PRICING` |

**Modificar paquetes:** edita, agrega o quita objetos en `nfcPackages`. Campos disponibles: `name`, `summary`, `quantity`, `customization`, `features`, `conditions`, `price`, `featured` (resalta el paquete en oscuro) e `image`.

> ⚠️ Los tres paquetes incluidos ("Tarjeta individual", "Paquete para equipos", "Paquete empresarial") son una **estructura provisional**. Confirma o sustituye nombres, cantidades y características antes de publicar.

**Actualizar precios:** en el proyecto **no existían precios NFC**, por lo que `price: null` en todos los paquetes y la interfaz muestra **"Solicitar cotización"**. Para publicar un precio, escribe el importe **final con IVA incluido** como número, por ejemplo `price: 450`. Se mostrará como "$450 · MXN · IVA incluido".

**Cambiar imágenes:**
1. Coloca las fotografías en **`public/img/products/nfc/`**. Nombres sugeridos: `frontal.jpg`, `posterior.jpg`, `escritorio.jpg`, `en-mano.jpg`, `smartphone.jpg`, `acabados.jpg` y `paquete-*.jpg`.
2. En `nfcImages` (y en `image` de cada tipo o paquete), cambia `src: null` por la ruta, por ejemplo `` src: `${NFC_IMAGE_BASE}/frontal.jpg` ``.
3. Mientras `src` sea `null`, se muestra un placeholder editorial con la leyenda "Fotografía oficial próximamente". Si `nfcImages.hero.src` tiene ruta, la foto sustituye a la composición ilustrativa del hero.

La tarjeta y el teléfono dibujados en CSS son **ilustraciones**, no fotografías del producto. El patrón tipo QR de la tarjeta es decorativo y no es un código funcional.

**WhatsApp:** todos los botones NFC usan el **WhatsApp oficial de DASTI** mediante `nfcWhatsAppUrl(opción)`, con `encodeURIComponent`:
- **General:** "Hola, me interesa recibir información sobre las tarjetas inteligentes NFC de DASTI."
- **Por opción:** "Hola, me interesa cotizar tarjetas inteligentes NFC de DASTI. Opción seleccionada: [nombre del tipo o paquete]."

## F. Nexora

Todo vive en **`src/data/alliances.ts`** (objeto con `slug: 'nexora'`).

**Modificar servicios:** usa el arreglo `services`. Cada servicio tiene:
- `name`
- `price` (número, o `null` para "Cotización personalizada")
- `prefix` ("Desde")
- `unit` ("al mes", "por cuatrimestre", "por consulta")
- `note`
- `group` (`repse`, `contabilidad`, `fiscal`)
- `featured` (tarjeta blanca destacada)

Los grupos y sus descripciones están en `serviceGroups`. Las tarifas y condiciones cargadas corresponden exactamente a las proporcionadas:

| Servicio | Tarifa |
|---|---|
| REPSE · ICSOE + SISUB | Desde $15,000 MXN por cuatrimestre. Incluye la referencia a hasta 1,000 trabajadores, sujeto a evaluación previa. |
| Registro o renovación REPSE | Desde $6,500 MXN |
| Contabilidad básica | Desde $2,500 MXN al mes |
| Contabilidad empresarial | Desde $5,500 MXN al mes |
| Contabilidad fiscal integral | Desde $9,500 MXN al mes |
| Declaración anual empresarial | Cotización personalizada (según declaraciones, movimientos y complejidad) |
| Asesoría fiscal especializada | Desde $1,500 MXN por consulta |
| Nóminas y seguridad social | Cotización personalizada |

- **Condiciones** (en `conditions`): precios de referencia en MXN **más IVA cuando corresponda**, sujetos a revisión. La política de IVA incluido de DASTI **no** se aplica a Nexora.
- **Cambiar tarifas:** edita `price`, `prefix` o `unit` del servicio.
- **Logotipo:** coloca el archivo oficial en **`public/img/alliances/nexora/`** (por ejemplo `logo.svg` o `logo.png`) y asigna `logo: '/img/alliances/nexora/logo.svg'`. Mientras sea `null`, se muestra un espacio reservado discreto. No se recreó el monograma.
- **Identidad visual:** se define en `theme` (`bg`, `bg2`, `accent` dorado, `accentLight`, `accentDeep`, `text`, `textMuted`, `line`). La página, la tarjeta de la home y el CTA flotante usan estos valores. Las fotografías están en `heroImage` y `supportImages`; hoy son imágenes ilustrativas de Unsplash (escritorio, documentos, gráficas) y se recomienda reemplazarlas por las de Nexora.
- **WhatsApp:** `whatsapp.number` (`527774178753`) y `whatsapp.display`. Todos los botones de la página de Nexora y el botón flotante en esa página usan `allianceWhatsAppUrl()`, que **solo** usa el número del aliado. Mensajes exactos en `messages.general` y `messages.service(nombre)`. El formulario general de DASTI no se usa para Nexora.
- **Aviso de independencia:** el texto exacto está en `disclaimer`. Se muestra bajo el hero y al cierre de la página; además, la tarjeta del aliado y la sección de la home indican que es un aliado independiente.

**Agregar un nuevo aliado:**
1. Duplica el objeto de Nexora en `alliances` y ajusta `slug`, `route` (`/alianzas/<slug>`), textos, `services`, `theme`, `whatsapp`, `messages`, `disclaimer` y `seo`.
2. La ruta, la tarjeta en la home, la tarjeta en `/alianzas`, el enlace en el footer y el CTA flotante contextual se generan automáticamente.
3. Para incluirlo en el dropdown del menú, agrégalo en `src/data/navigation.ts`, y para el sitemap, en `public/sitemap.xml`.

## G. Funcionalidad existente

**Conservado sin cambios funcionales:**

- **Cotizador:**
  - El catálogo, los precios, las notas, las mensualidades obligatorias de correo, los descuentos por volumen (5/8/10/15 %) y los servicios "A cotizar" se movieron **textualmente** a `src/data/quoter.ts` (verificado con `diff`).
  - Selección, cálculo, totales y el **mensaje de WhatsApp** son idénticos a la versión anterior.
- **Formulario de contacto:** campos, `required`, honeypot `website_url`, `POST /api/contact`, estados de envío, éxito y error, y los modos WhatsApp, Videollamada y Presencial (abren WhatsApp con el mismo mensaje).
- **Backend:** `server/` no se tocó.
- **Datos de contacto:** WhatsApp `+52 777 442 8209`, correo mostrado `direcciondasti@gmail.com`, horario, ubicación, redes (Facebook, Instagram, TikTok) y zonas de cobertura.
- **Contenido:** servicios (14), "qué incluye", "ideal para", preguntas frecuentes, proyectos en preparación (no se presentan como terminados) y textos de Nosotros. No se añadieron cifras, años, clientes ni certificaciones.

**Reorganizado:**
- Los datos se separaron de la presentación (`src/data/*`).
- El selector de 4 temas pasó a alternador claro/oscuro.
- El CTA flotante ahora es contextual: se oculta en `/cotizador` (que tiene su propia barra de resumen en móvil) y en páginas de aliados muestra el WhatsApp del aliado.
- Las modalidades de atención (Remoto, Videollamada, Presencial) se integraron en la sección "Acerca de DASTI" de la home.
- En el footer, el teléfono ahora usa `tel:` y se agregaron columnas de Servicios, Productos y Alianzas.
- La sección "Configurador de soluciones" de la home se sustituyó por el índice de soluciones.
- Del CTA anterior del cotizador se retiró el texto "Respuesta en 24h", por ser un compromiso de servicio no documentado.

## H. Pendientes (recursos o datos por proporcionar)

1. **Precios oficiales NFC** con IVA incluido, y confirmación de nombres, cantidades y características de los paquetes.
2. **Fotografías oficiales NFC**: frontal, posterior, escritorio, en mano, junto a smartphone, acabados e imágenes de paquetes.
3. **Logotipo oficial de Nexora** (SVG o PNG con transparencia) y, de preferencia, fotografías propias de Nexora.
4. **Imagen Open Graph**: `index.html` referencia `https://dasti.cloud/img/og-dasti.jpg`, pero el archivo no existe en `public/img/`. Es un pendiente anterior al rediseño.
5. **Correo de contacto**: el sitio muestra `direcciondasti@gmail.com`, mientras que el JSON-LD y `CONTACT_CONFIG.email` usan `contacto@dasti.cloud`. Ambos se conservaron; conviene unificarlos.
6. **Casos de estudio reales**: cambiar `status` a `'published'` y completar `name`, `description`, `image` y `link` en `src/data/projects.ts`.
7. Las fotografías generales del sitio siguen siendo de Unsplash, como antes. Se recomienda sustituirlas gradualmente por material propio.
8. Decidir si se eliminan los componentes sin uso listados en la sección C.

## I. Estado de validación

**"Implementación realizada. Pruebas automatizadas, compilación y validación funcional pendientes de ejecución manual por el propietario del proyecto."**

Solo se revisó la coherencia estática:

- Existencia de imports y rutas de archivos.
- Exportaciones de íconos de Lucide.
- Componentes usados en las plantillas y su importación.
- Copia textual de los datos del cotizador y de la lógica del formulario.

No se ejecutaron `npm run build`, `npm run dev`, `type-check`, `lint`, pruebas, Lighthouse ni navegadores automatizados. No se hizo commit, push, pull, merge ni despliegue.

**Puntos sugeridos para la revisión manual:**

- Ejecutar `npm run type-check`: hay plantillas nuevas extensas; vigilar sobre todo el tipado de `:style` con variables CSS y de la directiva global `v-reveal`.
- Navegación con teclado en dropdowns, menú móvil y pestañas NFC (flechas, Inicio y Fin).
- Anchos de 320, 375, 430, 768, 1024, 1440 y 1920 px. Revisar especialmente el hero, el índice fijo de Servicios y la barra de resumen móvil del cotizador.
- Tema claro y oscuro, y modo de movimiento reducido del sistema.
- Envío real del formulario contra `/api/contact` (con el backend en `localhost:3001`).
- Los mensajes y números de WhatsApp de DASTI, de NFC y de Nexora.
