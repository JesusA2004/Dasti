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
| Tarjeta individual | `nfcIndividual` (ver sección J) |
| Combos | `nfcCombos`, `NFC_COMBOS_FROM`, `NFC_COMBOS_NOTE` |
| ~~Extras y Smart~~ | Retirado en la sección L. |
| Envíos y cobertura | `nfcShipping` |
| Diseños genéricos (sustituye a la galería) | `nfcGenericDesigns` |
| Preguntas frecuentes | `nfcFaq` |
| Política de precios | `NFC_PRICING` |

> ℹ️ Los paquetes provisionales (`nfcPackages`) y la galería de placeholders (`nfcGallery`) se sustituyeron por el catálogo oficial con precios. Consulta la **sección J**.

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
- **Datos de contacto:** WhatsApp `+52 777 877 9239` (actualizado en la sección J), correo mostrado `direcciondasti@gmail.com`, horario, ubicación, redes (Facebook, Instagram, TikTok) y zonas de cobertura.
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

1. ~~Precios oficiales NFC~~ — cargados (sección J).
2. **Fotografías oficiales NFC**: frontal, posterior, escritorio, en mano, junto a smartphone y acabados; y fotos recortadas de los diseños genéricos (sección J).
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

## J. Actualización de información (número oficial, NFC, envíos)

Ajuste de contenido sobre el rediseño existente; no se modificó la línea visual, la navegación ni el backend.

### Archivos

| Archivo | Cambio |
|---|---|
| `src/config/contact.ts` | Nuevo número oficial de DASTI (`whatsappNumber`, `whatsappDisplay`, `phoneDisplay`) y comentario que lo separa del de Nexora. |
| `index.html` | `telephone` agregado al `contactPoint` del JSON-LD de la organización. |
| `src/data/nfc.ts` | Catálogo oficial: tarjeta individual, combos, extras, envíos, diseños genéricos, FAQ ampliada y helper `nfcMessageUrl()`. Se eliminaron `nfcPackages`/`NfcPackage` y `nfcGallery`. |
| `src/pages/NfcCardsPage.vue` | Sección **Precios** (individual + combos + nota general + extras), franja **Envíos y cobertura** y sección **Diseños genéricos listos para usar** (en lugar de la galería de placeholders). |
| `src/components/products/NfcDesignMock.vue` | **Nuevo.** Recreación CSS de los diseños genéricos impresos (frente y reverso). |
| `src/components/home/HomeNfc.vue`, `src/pages/ProductsPage.vue` | Línea "Desde $399 MXN · IVA incluido · envíos a toda la República". |

### Número oficial de DASTI

- **+52 777 877 9239** · `https://wa.me/527778779239`.
- Se define en un solo lugar: `CONTACT_CONFIG` (`src/config/contact.ts`). Desde ahí lo toman `buildWhatsAppUrl()` (botón flotante, contacto, hero, CTAs, NFC, cotizador), el footer (`tel:+527778779239` y texto visible) y la página de contacto.
- JSON-LD: `"telephone": "+52-777-877-9239"`.
- El número anterior (`+52 777 442 8209`) ya no aparece en el frontend.
- **Nexora** sigue usando solo su número `+52 777 417 8753` (`src/data/alliances.ts` → `allianceWhatsAppUrl()`); no se modificó.

### Precios NFC cargados (MXN, IVA incluido)

> **Histórico.** Estos precios y paquetes ya no están vigentes; fueron sustituidos por el catálogo de la **sección K**.

**Tarjeta individual** — desde $399 MXN. Incluye NFC + QR funcional, diseño genérico listo para usar y configuración inicial.
- Diseño genérico: $399 · Tu diseño: $429 · Personalizada por nosotros: $499.

**Combos más vendidos** — desde $699 MXN.
| Combo | Tarjetas | Precio | Incluye | Nota |
|---|---|---|---|---|
| Reputación | 2 | $699 | Google Maps, Facebook o Instagram | Ahorro de $99 |
| Conecta | 4 | $1,199 | Facebook, Instagram, TikTok, WhatsApp | $299.75 por tarjeta; ahorro de $397 |
| Restaurante Digital | 4 | $1,249 | Menú digital, sitio web, Google Maps, WhatsApp | Ahorro de $347 |
| Presencia Total | 6 | $1,699 | Facebook, Instagram, TikTok, WhatsApp, Google Maps, página web o menú | Ahorro de $695 (se muestra resaltado en oscuro) |

Nota general visible bajo los combos: *"Todos los combos incluyen IVA, NFC, QR, configuración inicial y diseños genéricos. La creación de un menú digital o página web no está incluida."*

**Extras y Smart** — desde $49/mes: personalización de combo +$299, soporte acrílico +$79, protector acrílico +$149, Smart individual $49/mes.

**Envíos y cobertura:** Jiutepec y Cuernavaca · envíos a toda la República · costo de envío cotizado por separado según ciudad o destino · facturación disponible. También se agregaron tres preguntas a la FAQ NFC (envíos, factura, qué no incluyen los combos).

Los paquetes provisionales "Paquete para equipos" y "Paquete empresarial" (sin precio) se sustituyeron por los combos; se dejó una línea "¿Necesitas más tarjetas para tu equipo o empresa? Escríbenos y cotizamos según cantidad."

### WhatsApp de NFC

Cada opción tiene su mensaje en `src/data/nfc.ts` (`message`) y se abre con `nfcMessageUrl(message)` → `buildWhatsAppUrl()` → `https://wa.me/527778779239?text=…` con `encodeURIComponent`. Mensajes: tarjeta individual (genérica, con tu diseño, personalizada por DASTI), cada uno de los cuatro combos y extras, con los textos indicados en la solicitud. El hero, la pestaña de tipos y el CTA final siguen usando `nfcWhatsAppUrl()`.

### Imágenes reales de las tarjetas

Las fotografías no estaban en el repositorio, así que no se publicó ninguna foto. Se tomó la descripción de los diseños como referencia y se resolvió así:
- Sección **"Ejemplos reales · Diseños genéricos listos para usar"** con tres modelos (Google Maps / Reseñas, Instagram, Facebook), cada uno con **frente y reverso**, con los textos reales de las tarjetas (título, subtítulo, botón y los tres pasos "Desbloquea tu teléfono / Acércalo a la tarjeta / Se abre automáticamente").
- Mientras no haya foto, `NfcDesignMock.vue` dibuja una **recreación limpia** del diseño (tarjeta vertical, colores de cada red, íconos genéricos, no logotipos oficiales). Una nota indica que son vistas recreadas a partir de las tarjetas impresas.
- **Para usar las fotos:** recórtalas para quitar mano, escritorio y laptop, en formato vertical 54 × 85.6 (≈ 0.63:1). Colócalas en `public/img/products/nfc/` (nombres sugeridos: `google-maps-frente.jpg`, `google-maps-reverso.jpg`, `instagram-frente.jpg`, `instagram-reverso.jpg`, `facebook-frente.jpg`, `facebook-reverso.jpg`) y asigna `image.src` en `nfcGenericDesigns`. La foto reemplaza a la recreación y la etiqueta cambia a "Foto real".
- Siguen como placeholders/ilustraciones: hero NFC (`nfcImages.hero`), ilustraciones CSS de tarjeta horizontal y teléfono.

### Qué revisar manualmente

- Abrir cada botón de WhatsApp de `/productos/tarjetas-nfc` y confirmar el número `527778779239` y el mensaje.
- Footer, contacto y botón flotante con el nuevo número; páginas de Nexora con el `+52 777 417 8753`.
- Formato de precios (`$1,199 MXN`, `+$299 MXN`, `$49 MXN/mes`) en es-MX.
- Rejilla de combos en 2 columnas (tablet) y 4 (≥1280 px); tarjetas de diseños en 320–430 px (texto de la recreación es pequeño a propósito).
- Tema oscuro: las recreaciones de los diseños conservan sus colores de marca.
- El texto de la franja de envíos ("Atención local en Jiutepec y Cuernavaca", "Emitimos factura si la necesitas") por si prefieres otra redacción.
- `npm run type-check` (no ejecutado).

No se ejecutaron build, pruebas ni type-check. No se hizo commit, push ni se crearon ramas.

---

## K. Actualización de catálogo NFC y métodos de pago (2026-11-02)

Actualización puntual de información comercial. **No es un rediseño:** se conservaron identidad visual, distribución, hero, navegación y animaciones. Solo se ajustó la presentación interna de los precios NFC para mostrar tres modalidades por producto.

### Archivo donde se administran los precios

Todo el catálogo NFC vive en **`src/data/nfc.ts`** (precios finales en MXN, **IVA incluido**; no sumar IVA):

| Export | Contenido |
|---|---|
| `nfcDesignModes` / `NfcDesignMode` | Modalidades: `lista` (Lista para usar), `imprimimos` (Imprimimos tu diseño), `disenamos` (Diseñamos para ti). |
| `NFC_DESIGN_CONDITIONS` | Condiciones de diseño para la tarjeta individual y para los combos. |
| `nfcIndividual` | Tarjeta individual: `fromPrice`, `prices` por modalidad, `includes`. `fromPrice` también lo leen `HomeNfc.vue` y `ProductsPage.vue`. |
| `nfcCombos`, `NFC_COMBOS_FROM`, `NFC_COMBOS_INTRO` | Combos vigentes y su encabezado. |
| `nfcEnterprise` | Plan Empresarial (sin precio numérico). |
| `NFC_COMBOS_NOTE` | Condición general de los combos. |
| `nfcOrderMessage(product, mode)` | Mensaje de WhatsApp con producto, cantidad y modalidad. |

Los precios del cotizador de servicios (`src/data/quoter.ts`) **no se modificaron**. Los extras NFC (`nfcExtras`) se conservaron sin cambios en esa ronda (retirados después; ver sección L).

### Nuevos precios NFC (MXN, IVA incluido)

**Tarjeta individual** — 1 tarjeta — desde $449.

| Modalidad | Precio |
|---|---:|
| Lista para usar | $449 |
| Imprimimos tu diseño | $479 |
| Diseñamos para ti | $499 |

Incluye: NFC + QR funcional · Diseño listo para usar · Configuración inicial incluida · Entrega lista para usar.

**Combos más vendidos** — "Pensados para negocios que quieren conectar mejor con sus clientes." — desde $799.

| Combo | Tarjetas | Lista para usar | Imprimimos tu diseño | Diseñamos para ti | Incluye |
|---|---|---:|---:|---:|---|
| Impulso | 2 | $799 | $849 | $899 | 2 tarjetas NFC + QR · el cliente elige para qué usar cada tarjeta |
| Conecta | 4 | $1,499 | $1,599 | $1,699 | 4 tarjetas NFC + QR · ideal para redes sociales, WhatsApp, Google Maps o página web (ejemplos, no destinos obligatorios) |
| Presencia Total | 6 | $2,099 | $2,249 | $2,399 | 6 tarjetas NFC + QR · mayor presencia · funciones diferentes por tarjeta |

**Plan Empresarial** — 7 o más tarjetas — **Cotización especial** · "Precio preferencial por volumen." Incluye: ideal para equipos o sucursales · el cliente elige la función de cada tarjeta · atención personalizada. Sin precio fijo, porcentaje ni rango de ahorro. Conserva el tratamiento visual destacado (bloque oscuro) que antes tenía Presencia Total.

### Condiciones comerciales visibles

- Bajo los combos: *"Todos los combos incluyen IVA, NFC, QR y configuración inicial."* + *"La creación de una página web o catálogo digital no está incluida en el precio."*
- **Imprimimos tu diseño:** el cliente comparte/proporciona su diseño final listo para impresión.
- **Diseñamos para ti:** línea gráfica similar entre las tarjetas, adaptada a cada función. **Incluye una ronda de cambios** (no se prometen revisiones ilimitadas).
- En la tarjeta individual las condiciones aparecen dentro de cada opción; en los combos, en el bloque de condiciones bajo la rejilla.

### Representación de las tres modalidades

Nuevo componente `src/components/products/NfcModeOptions.vue`: grupo de radios accesible (`fieldset` + `legend` oculto, `input type="radio"` nativo, foco visible). Cada fila muestra modalidad y precio; la elegida se resalta con el acento. Por defecto está seleccionada "Lista para usar".

- Tarjeta individual: filas amplias en la columna derecha (como antes), con su condición; un botón **Hacer mi pedido**.
- Combos: filas compactas dentro de la tarjeta (en el bloque donde antes estaba el precio único); un botón **Pedir combo**.
- El botón de WhatsApp usa la modalidad seleccionada: `nfcOrderMessage()` → `nfcMessageUrl()` → `buildWhatsAppUrl()` (`https://wa.me/527778779239?text=…` con `encodeURIComponent`). Ejemplo: *"Hola, me interesa el Combo Conecta de 4 tarjetas NFC + QR, en la modalidad Imprimimos tu diseño. Me gustaría solicitar información para realizar mi pedido."*
- Plan Empresarial: *"Hola, me interesa el Plan Empresarial de DASTI para 7 o más tarjetas NFC + QR. Me gustaría solicitar una cotización especial."*

### Paquetes sustituidos / eliminados

- Eliminados: **Combo Reputación** ($699) y **Combo Restaurante Digital** ($1,249).
- Sustituidos: tarjeta individual desde $399 (opciones $399/$429/$499), Combo Conecta $1,199, Combo Presencia Total $1,699.
- Se retiraron todas las notas de ahorro ("ahorro de $397", "$299.75 por tarjeta", etc.); el nuevo catálogo no muestra descuentos.
- Se retiró la línea "¿Necesitas más tarjetas…? cotizamos según cantidad" (la cubre el Plan Empresarial).
- Se retiraron `NfcPriceOption`, `NfcCombo` y los campos `notes`, `message` y `featured` de los combos.
- FAQ NFC: se actualizaron "¿Puedo personalizar el diseño?" (precios leídos desde `nfcIndividual.prices`) y "¿Los combos incluyen página web o catálogo digital?"; se agregó "¿Qué métodos de pago aceptan?". El resto de preguntas se conservó.
- Textos de la sección de diseños genéricos ajustados a las modalidades ("Lista para usar", "Imprimimos tu diseño", "Diseñamos para ti").

### Métodos de pago

Datos en **`src/data/payments.ts`** (métodos, nota de condiciones, alcance y enlace de WhatsApp). Aplican a productos y servicios **propios de DASTI**; no a Nexora ni a otros aliados (no se agregó nada en sus páginas).

Nueva ruta **`/metodos-de-pago`** → `src/pages/PaymentMethodsPage.vue` (carga diferida, SEO en `src/router/index.ts`, añadida a `public/sitemap.xml`):

- Encabezado "Métodos de pago" con el subtítulo solicitado.
- Tres tarjetas: Efectivo · Transferencia bancaria · Tarjetas de crédito y débito, con los textos solicitados.
- Bloque informativo: *"Los métodos y condiciones de pago se confirman directamente con DASTI al realizar la contratación o pedido."* + aclaración de que aplican a productos y servicios propios de DASTI.
- CTA **Consultar opciones de pago** → WhatsApp DASTI con *"Hola, me gustaría conocer las opciones de pago disponibles en DASTI."*
- Página solo informativa: sin pasarela, checkout, formularios de tarjeta, enlaces de cobro, backend ni base de datos. No se publicaron bancos, cuentas, CLABE, terminales, procesadores, MSI, comisiones ni descuentos.

### Ubicación de los enlaces a `/metodos-de-pago`

| Lugar | Archivo | Forma |
|---|---|---|
| Footer | `src/components/FooterSection.vue` | Enlace "Métodos de pago" en la columna Navegación. |
| Página NFC | `src/pages/NfcCardsPage.vue` | Bloque "Paga como prefieras" (Efectivo · Transferencia · Crédito · Débito) + "Ver métodos de pago", al final de la sección de precios. |
| Cotizador | `src/components/QuoterSection.vue` | Línea discreta bajo los botones del resumen. Sin cambios en precios, cálculos ni reglas. |
| Contacto | `src/components/ContactSection.vue` | Nuevo elemento "Métodos de pago" en el panel de información (vista Formulario). |

No se agregó al navbar principal.

### Archivos modificados en esta actualización

- `src/data/nfc.ts` — nuevo catálogo, modalidades, condiciones, Plan Empresarial, mensajes y FAQ.
- `src/data/payments.ts` — **nuevo**.
- `src/components/products/NfcModeOptions.vue` — **nuevo**.
- `src/pages/NfcCardsPage.vue` — precios por modalidad, Plan Empresarial, condiciones, bloque de pagos.
- `src/pages/PaymentMethodsPage.vue` — **nuevo**.
- `src/router/index.ts` — ruta `/metodos-de-pago`.
- `src/components/FooterSection.vue`, `src/components/QuoterSection.vue`, `src/components/ContactSection.vue` — enlaces.
- `public/sitemap.xml` — nueva URL y `lastmod` de tarjetas NFC.
- `docs/REDISENO-FRONTEND-DASTI.md` — esta sección.

`HomeNfc.vue` y `ProductsPage.vue` no se editaron: muestran automáticamente "Desde $449 MXN" porque leen `nfcIndividual.fromPrice`.

### Pendientes de revisión manual

- Probar la selección de modalidad en cada producto y verificar el mensaje de WhatsApp resultante.
- Rejilla de combos con filas de modalidad a 320–430 px, tablet (2 columnas) y ≥1280 px (4 columnas): confirmar que "Imprimimos tu diseño" y el precio no se vean apretados.
- Tema oscuro del selector de modalidad (`bg-accent-soft`, `border-accent`).
- El extra **"Personalización de combo" (+$299)** se conservó tal cual por instrucción; confirmar si sigue vigente ahora que existe la modalidad "Diseñamos para ti".
- Redacción de la aclaración de alcance en `/metodos-de-pago` ("Los aliados independientes manejan sus propias condiciones").
- `npm run type-check` y build (no ejecutados).

No se ejecutaron build, pruebas ni type-check. No se hizo commit, push ni se crearon ramas. No se modificó el backend.

---

## L. Sección NFC: catálogo dinámico, soporte de madera, combinaciones y administración de enlaces (2026-11-02)

Evolución de la página `/productos/tarjetas-nfc` sin cambiar el diseño general del sitio. **Precios, modalidades, Plan Empresarial y métodos de pago de la sección K no se modificaron.** No se tocó backend, cotizador de servicios, rutas ni navegación.

### Nuevo recorrido de la página

1. **Hero** — tarjeta vertical (frente) + reverso con QR + teléfono como contexto; chips «Frente · tu diseño + NFC», «Reverso · QR personalizado», «Mismo destino».
2. **Cómo funciona** — cinco pasos + bloque nuevo «dos caras, un mismo destino» con tarjeta que se gira (botón «Ver reverso con QR»).
3. **Tipos de tarjetas** (usos) — ilustración corregida a vertical.
4. **Cambia tu enlace, no tu tarjeta** — nueva sección oscura (`NfcLinkManager.vue`).
5. **Catálogo de diseños** — nuevo catálogo filtrable (`NfcDesignCatalog.vue`), sustituye a «Diseños genéricos listos para usar».
6. **Precios** — tarjeta individual, combos y Plan Empresarial, ahora con distintivo de soporte de madera y «N funciones, iguales o diferentes».
7. **Combina tus tarjetas como quieras** — demostración interactiva (`NfcComboMixer.vue`) + bloque **Soporte de madera incluido** (`NfcStandVisual.vue`).
8. **Envíos, facturación y pagos** — envíos + bloque «Paga como prefieras» (movido aquí desde Precios).
9. **Preguntas frecuentes** y **CTA final** (tarjeta vertical que se gira).

### Secciones eliminadas

- **Extras y Smart** (personalización de combo +$299, soporte acrílico +$79, protector acrílico +$149, Smart individual $49/mes) y su botón «Agregar extras». Se eliminaron `NfcExtra`, `nfcExtras`, `NFC_EXTRAS_FROM` y `NFC_EXTRAS_MESSAGE` de `src/data/nfc.ts`. El cotizador no tenía referencias.
- **Diseños genéricos listos para usar** (recreaciones CSS). Se eliminaron `nfcGenericDesigns` y sus tipos, y el componente `src/components/products/NfcDesignMock.vue`. Los diseños ahora solo se muestran con imágenes originales.

### Soporte de madera

- `NFC_STAND` y `nfcStandLabel(cards)` en `src/data/nfc.ts`. Siempre **un soporte por tarjeta**, sin costo adicional (individual 1, Impulso 2, Conecta 4, Presencia Total 6, Plan Empresarial 1 por tarjeta). Las cantidades se calculan desde `cards` de cada producto.
- Se muestra en: puntos clave del hero, cada tarjeta de precio (distintivo color madera `.stand-pill`), demostración de combinaciones, bloque «Lista para exhibir», FAQ («¿Qué incluye cada tarjeta?»), CTA final, y en las líneas «Desde $449…» de `HomeNfc.vue` y `ProductsPage.vue`.
- No hay foto real del soporte: `NfcStandVisual.vue` muestra una representación sobria marcada como «Representación ilustrativa». Para usar la foto, colócala p. ej. en `public/img/products/nfc/soporte-madera.jpg` y asigna `nfcImages.stand.src`.
- No es el antiguo soporte acrílico (retirado).

### Combinaciones de funciones

- Cada combo indica «N funciones, iguales o diferentes»; el Plan Empresarial, «la combinación de funciones que necesite tu empresa».
- `NfcComboMixer.vue`: eliges combo (Impulso / Conecta / Presencia Total), asignas funciones del catálogo a cada tarjeta (clic para agregar, clic en la tarjeta para quitar), ejemplos rápidos y «Vaciar». Muestra el resumen y los soportes incluidos. Se identifica como **«Demostración ilustrativa: no genera un pedido ni un cobro.»** El botón «Consultar esta combinación» abre WhatsApp con, p. ej.: *«Hola, me interesa el Combo Conecta de 4 tarjetas NFC + QR con esta combinación: 1 Facebook, 1 Menú digital, 1 WhatsApp y 1 Google Maps. Me gustaría solicitar información para realizar mi pedido.»*
- Datos estructurados para la futura tienda (`src/data/nfcCatalog.ts`): `NfcCardSelection { categoryId, quantity }`, `summarizeSelection()`, `selectionText()`, `comboSelectionMessage()`.

### Corrección de ilustraciones NFC

`src/components/products/NfcCardVisual.vue` se reescribió:

- Formato **vertical CR80** (`aspect-ratio: 54 / 85.6`), tipografía escalada con unidades de contenedor (`cqw`) para que no se deforme a ningún tamaño.
- **Frente**: logotipo, símbolo NFC y etiqueta. **Sin QR.**
- **Reverso**: QR personalizado (patrón decorativo no funcional, con marcas de posición) y «Escanea el código o acerca tu teléfono».
- Props nuevas: `side` (`front` | `back`) y `flippable` (botón accesible con `aria-pressed` que gira la tarjeta en 3D). Respeta `prefers-reduced-motion`.
- Aplicado en: hero NFC, «Cómo funciona», «Tipos de tarjetas», demostración de enlaces, soporte de madera, CTA final, `HomeNfc.vue` (home) y `ProductsPage.vue` (frente + reverso).
- Ya no existe ninguna tarjeta horizontal ni QR en el frente.

### Catálogo de diseños

> Corregido en la sección M: cada categoría tiene **dos diseños frontales** (Modelo 01 y Modelo 02), no frente y reverso. La descripción vigente del catálogo y la estructura de imágenes están en **M**.

### Administración de enlaces (en desarrollo)

- Sección `NfcLinkManager.vue`, datos en `NFC_LINK_MANAGER` (`src/data/nfc.ts`).
- Mensaje principal: «Cambia tu enlace, no tu tarjeta» · «Tu tarjeta evoluciona con tu negocio». Explica el acceso individual con usuario y contraseña y que el cambio aplica al destino administrado por NFC y por QR, sin comprar otra tarjeta.
- Estado visible: **«Panel de administración de enlaces: próximamente»** + nota de que está en desarrollo.
- Demostración **ilustrativa** antes/después (Instagram → sitio web; menú anterior → menú actualizado) con dominios genéricos `tu-negocio`. Se reproduce sola solo cuando es visible y sin movimiento reducido; se detiene si el usuario interactúa.
- No se publicó URL de acceso, inicio de sesión, planes, mensualidades, límites ni analítica.
- **Cuando el sistema esté operativo:** cambia `NFC_LINK_MANAGER.status` a `'disponible'` y revisa `statusCopy.disponible` y la FAQ «¿Puedo cambiar el destino después?». No hace falta rediseñar.

### Archivos de esta ronda

- Modificados: `src/data/nfc.ts`, `src/pages/NfcCardsPage.vue`, `src/components/products/NfcCardVisual.vue`, `src/components/home/HomeNfc.vue`, `src/pages/ProductsPage.vue`, `docs/REDISENO-FRONTEND-DASTI.md`.
- Nuevos: `src/data/nfcCatalog.ts`, `src/components/products/NfcDesignCatalog.vue`, `NfcDesignImage.vue`, `NfcComboMixer.vue`, `NfcLinkManager.vue`, `NfcStandVisual.vue`, carpetas `public/img/products/nfc/catalogo/*/.gitkeep`.
- Eliminado: `src/components/products/NfcDesignMock.vue`.

### Pendientes y limitaciones

- Agregar las 16 imágenes frontales del catálogo (ver sección M) y, opcionalmente, la foto del soporte de madera.
- Revisar en móvil (320–430 px): filtros desplazables, diálogo ampliado, mezclador (2 filas de 3 en Presencia Total) y composición del hero.
- Las ilustraciones usan unidades `cqw` (navegadores actuales); en navegadores muy antiguos el texto de la ilustración puede verse con tamaño por defecto.
- Los íconos de categoría son genéricos de Lucide (no logotipos oficiales de Facebook, Instagram, etc.).
- Revisar la redacción de la sección de enlaces y de la nota «se habilitará para los clientes de DASTI».
- `npm run type-check` y build no ejecutados.

No se ejecutaron build, pruebas ni type-check. No se hizo commit, push, pull ni se crearon ramas. No se modificó el backend.

## M. Corrección del catálogo: dos diseños frontales por categoría (2026-11-02)

La indicación anterior («frente y reverso por categoría») era incorrecta. **Cada categoría tiene dos diseños frontales diferentes**; en la referencia original, el de la izquierda es el Modelo 01 y el de la derecha el Modelo 02. Total: **16 diseños frontales**.

### Modelos cargados (`src/data/nfcCatalog.ts` → `nfcCatalogModels`)

| Categoría | Modelo 01 | Modelo 02 |
| --- | --- | --- |
| Facebook | «¡Únete a nuestra comunidad!» (fondo azul intenso, ícono de Facebook, elementos tecnológicos) | «Descubre más en un solo toque» (fondo blanco y azul, teléfono con Facebook e instrucciones NFC) |
| Instagram | «¡Inspírate con nuestro contenido!» | «Encuentra inspiración cada día» |
| Google Maps | «¡Tu opinión es muy importante!» | «Tu opinión hace la diferencia» |
| WhatsApp | «¡Hablemos al instante!» | «Tu mensaje, en un toque» |
| TikTok | «¡Disfruta tips y novedades!» | «Mira tips al instante» |
| Wi-Fi | «¡Mantente conectado!» | «Conexión en 3 pasos» |
| Sitio web | «¡Descúbrelo todo en un solo lugar!» | Otra composición del mismo concepto, con indicaciones para abrir el sitio web mediante NFC (sin frase registrada) |
| Menú digital | «¡Conoce nuestro menú!» | «Descubre nuestro menú digital» |

Cada modelo es una opción independiente con id estable: `facebook-01`, `facebook-02`, …, `menu-digital-02`.

### Modelo de datos

- `NfcCatalogModel`: `id`, `categoryId`, `model` (1 o 2), `name` («Modelo 01»), `headline` (frase del diseño, opcional), `description`, `front` (**única imagen obligatoria**), `back` (**opcional, uso futuro**), `order`, `available`.
- `catalogModel(categoria, n, { headline, description, withBack, available })`. Si no se da `description`, se usa la función de la categoría.
- La frase (`headline`) se muestra como texto junto a la imagen, nunca encima de ella.

### Interfaz (`NfcDesignCatalog.vue`)

- Mismos filtros y transiciones. «Todos» muestra 16 diseños; cada categoría muestra sus 2 modelos lado a lado (columna única en móvil).
- Cada ficha: diseño frontal vertical (`object-contain`, 54 × 85.6, sin recortar ni deformar), distintivo «Modelo 01/02», categoría, frase, descripción, botón **Elegir este diseño** (WhatsApp) y **Ver en grande**. La imagen también abre la vista ampliada.
- Vista ampliada: diseño frontal grande, frase y descripción, nota del reverso personalizado, **Elegir este diseño**, navegación ←/→ con contador (p. ej. «1 / 2»), cierre con Esc, botón o clic fuera.
- WhatsApp: *«Hola, me interesa la tarjeta NFC para Facebook, Modelo 02 («Descubre más en un solo toque»). Me gustaría solicitar información.»* (número oficial +52 777 877 9239).
- Bloque **«El frente lo eliges tú. El reverso lo personalizamos para tu negocio.»** debajo de la rejilla: explica que el reverso lleva un QR personalizado, que NFC y QR llevan al mismo destino y que no se muestra un reverso fijo porque depende de cada cliente. Usa una ilustración conceptual (`NfcCardVisual`, cara posterior) rotulada «Ilustración conceptual del reverso, no es un diseño final».

### Estructura de imágenes (16 archivos)

```
public/img/products/nfc/catalogo/facebook/modelo-01-frente.png
public/img/products/nfc/catalogo/facebook/modelo-02-frente.png
public/img/products/nfc/catalogo/instagram/modelo-01-frente.png
public/img/products/nfc/catalogo/instagram/modelo-02-frente.png
public/img/products/nfc/catalogo/google-maps/modelo-01-frente.png
public/img/products/nfc/catalogo/google-maps/modelo-02-frente.png
public/img/products/nfc/catalogo/whatsapp/modelo-01-frente.png
public/img/products/nfc/catalogo/whatsapp/modelo-02-frente.png
public/img/products/nfc/catalogo/tiktok/modelo-01-frente.png
public/img/products/nfc/catalogo/tiktok/modelo-02-frente.png
public/img/products/nfc/catalogo/wifi/modelo-01-frente.png
public/img/products/nfc/catalogo/wifi/modelo-02-frente.png
public/img/products/nfc/catalogo/sitio-web/modelo-01-frente.png
public/img/products/nfc/catalogo/sitio-web/modelo-02-frente.png
public/img/products/nfc/catalogo/menu-digital/modelo-01-frente.png
public/img/products/nfc/catalogo/menu-digital/modelo-02-frente.png
```

- Modelo 01 = diseño izquierdo de la pareja en la referencia original; Modelo 02 = diseño derecho.
- PNG vertical, recortado al borde de la tarjeta (≈ 54 × 85.6, p. ej. 1080 × 1712 px). Si falta un archivo, se ve «Imagen pendiente».
- **No se requieren** archivos `modelo-XX-reverso.png`.

### Reversos de ejemplo (opcional, futuro)

Si más adelante hay un reverso aprobado para un modelo, colócalo como `modelo-XX-reverso.png` en la misma carpeta y declara el modelo con `withBack: true`. La vista ampliada mostrará un selector «Frente / Reverso de ejemplo». Sin `withBack`, no se busca ningún reverso.

### Archivos de esta corrección

- `src/data/nfcCatalog.ts`: 16 modelos, `back` opcional, `catalogBackImagePath()`, textos del reverso personalizado, nuevo mensaje de WhatsApp. Se eliminó el tipo `NfcCardSide`.
- `src/components/products/NfcDesignCatalog.vue`: fichas de un solo diseño frontal, bloque del reverso personalizado y vista ampliada.
- `src/components/products/NfcDesignImage.vue`: solo comentarios.
- `docs/REDISENO-FRONTEND-DASTI.md`: esta sección y la nota en L.

Sin cambios en precios, combos, soportes de madera, métodos de pago, administración de enlaces ni diseño global. No se ejecutaron build, pruebas ni type-check; no hubo commit, push, pull ni ramas; no se tocó el backend.
