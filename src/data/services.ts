import type { Component } from 'vue'
import { BarChart2, Bot, Code2, GitMerge, Globe, Lightbulb, Mail, Monitor, Network, Printer, ShoppingBag, Wifi, Wrench, Zap } from '@lucide/vue'

/**
 * Catálogo de servicios DASTI (contenido comercial existente, sin cambios).
 * `layout` define la composición visual de cada categoría en /servicios.
 * `label` e `image` provienen del selector de categorías anterior.
 */

export type ServiceLayout = 'feature' | 'statement' | 'split' | 'grid' | 'ink'

export interface ServiceItem {
  icon: Component
  color: string
  image: string
  title: string
  desc: string
  included: string[]
  idealFor: string[]
}

export interface ServiceCategory {
  number: string
  label: string
  image: string
  layout: ServiceLayout
  title: string
  desc: string
  color: string
  icon: Component
  services: ServiceItem[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    number: '01',
    label: 'Software',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&auto=format&fit=crop&q=80',
    layout: 'feature',
    title: 'Desarrollo digital',
    desc: 'Software personalizado y presencia web para empresas que necesitan soluciones propias.',
    color: '#3B82F6',
    icon: Code2,
    services: [
      {
        icon: Code2, color: '#3B82F6',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80',
        title: 'Desarrollo de software a medida',
        desc: 'Sistemas propios: control de información, gestión de usuarios, reportes automáticos y paneles administrativos adaptados a tu operación.',
        included: ['Panel administrativo con roles y permisos', 'Módulos de carga y procesamiento de datos', 'Reportes automáticos y exportación', 'Integración con otras herramientas', 'Documentación técnica entregada'],
        idealFor: ['Empresas con procesos operativos propios', 'Equipos que quieren dejar de usar Excel para todo', 'Negocios que manejan información compleja'],
      },
      {
        icon: Globe, color: '#818CF8',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&auto=format&fit=crop&q=80',
        title: 'Desarrollo web',
        desc: 'Sitios web modernos, responsivos y profesionales que transmiten confianza y facilitan el contacto con clientes.',
        included: ['Diseño responsivo para móvil y escritorio', 'Secciones de servicios, contacto y presentación', 'Formulario de contacto funcional', 'Panel de administración básico', 'Entrega optimizada para velocidad'],
        idealFor: ['Empresas sin presencia web', 'Negocios con sitio desactualizado', 'Profesionales que buscan imagen digital'],
      },
    ],
  },
  {
    number: '02',
    label: 'Correos',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1400&auto=format&fit=crop&q=80',
    layout: 'statement',
    title: 'Comunicación empresarial',
    desc: 'Correo corporativo con dominio propio, seguridad avanzada y gestión continua.',
    color: '#F472B6',
    icon: Mail,
    services: [
      {
        icon: Mail, color: '#F472B6',
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=700&auto=format&fit=crop&q=80',
        title: 'Correos corporativos administrados',
        desc: 'Correos con tu propio dominio, organizados por área, con seguridad técnica avanzada y administración continua.',
        included: ['Correos con dominio propio (@tuempresa.com)', 'Cuentas organizadas por área o puesto', 'Configuración SPF, DKIM y DMARC', 'Acceso desde cualquier dispositivo', 'Administración y soporte continuo'],
        idealFor: ['Empresas que usan correos gratuitos', 'Negocios que quieren imagen profesional', 'Equipos que necesitan control de cuentas por área'],
      },
    ],
  },
  {
    number: '03',
    label: 'Redes',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&auto=format&fit=crop&q=80',
    layout: 'split',
    title: 'Infraestructura y conectividad',
    desc: 'Redes estables, seguras y con cobertura total para tu espacio de trabajo.',
    color: '#60A5FA',
    icon: Wifi,
    services: [
      {
        icon: Wifi, color: '#60A5FA',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80',
        title: 'Redes e infraestructura',
        desc: 'Redes empresariales con switches, routers y puntos de acceso para cobertura estable y segura en todo tu espacio.',
        included: ['Diagnóstico de red actual', 'Configuración de equipos de red', 'Segmentación por área o tipo de usuario', 'Documentación de red', 'Soporte posterior'],
        idealFor: ['Oficinas con conectividad inestable', 'Empresas que instalan nuevos espacios', 'Negocios que cambian de sede o amplían'],
      },
      {
        icon: Network, color: '#38BDF8',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&auto=format&fit=crop&q=80',
        title: 'Sistemas mesh con roaming',
        desc: 'WiFi de cobertura total con roaming automático. Sin puntos muertos, sin desconexiones al moverse dentro del espacio.',
        included: ['Instalación de puntos de acceso mesh', 'Configuración de roaming automático', 'Red unificada bajo un solo nombre', 'Cobertura en áreas difíciles', 'Puesta en marcha y pruebas'],
        idealFor: ['Empresas con múltiples espacios o plantas', 'Oficinas con zonas sin señal', 'Personal que se mueve frecuentemente'],
      },
    ],
  },
  {
    number: '04',
    label: 'Equipos',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1400&auto=format&fit=crop&q=80',
    layout: 'grid',
    title: 'Equipos y soporte técnico',
    desc: 'Equipos listos para operar, mantenimiento y soporte cuando lo necesitas.',
    color: '#FB923C',
    icon: Monitor,
    services: [
      {
        icon: Wrench, color: '#A78BFA',
        image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=700&auto=format&fit=crop&q=80',
        title: 'Soporte técnico',
        desc: 'Diagnóstico, mantenimiento preventivo, optimización y resolución de fallas en equipos, impresoras y sistemas.',
        included: ['Diagnóstico de hardware y software', 'Mantenimiento preventivo', 'Configuración de equipos y periféricos', 'Optimización de sistema operativo', 'Resolución de fallas'],
        idealFor: ['Equipos con rendimiento bajo', 'Mantenimiento preventivo periódico', 'Configuración de nuevos equipos'],
      },
      {
        icon: Monitor, color: '#FB923C',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&auto=format&fit=crop&q=80',
        title: 'Actualización y mejora de equipos',
        desc: 'Mejoramos equipos con SSD, RAM y optimización del sistema para extender su vida útil a una fracción del costo de uno nuevo.',
        included: ['Diagnóstico de estado del equipo', 'Cambio de SSD o ampliación de RAM', 'Limpieza interna y mantenimiento', 'Optimización del sistema operativo', 'Entrega lista para operar'],
        idealFor: ['Equipos de 3 a 6 años con rendimiento bajo', 'Presupuesto limitado', 'Equipos que aún pueden aprovecharse'],
      },
      {
        icon: ShoppingBag, color: '#FBBF24',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&auto=format&fit=crop&q=80',
        title: 'Venta y suministro de equipos',
        desc: 'Selección, suministro y configuración completa de equipos nuevos según el perfil de uso de cada área.',
        included: ['Selección por perfil de uso', 'Configuración completa desde cero', 'Instalación de software necesario', 'Entrega lista para operar', 'Descuentos por volumen'],
        idealFor: ['Empresas que abren nuevas posiciones', 'Renovación de equipos por área', 'Compras de 2 o más equipos'],
      },
      {
        icon: Printer, color: '#2DD4BF',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=700&auto=format&fit=crop&q=80',
        title: 'Impresoras y periféricos',
        desc: 'Suministro, instalación y configuración de impresoras y periféricos multimarca en red para toda la empresa.',
        included: ['Cotización multimarca', 'Instalación y configuración básica', 'Configuración en red', 'Soporte y diagnóstico', 'Orientación técnica'],
        idealFor: ['Empresas que necesitan impresoras en red', 'Cambio de equipos de impresión', 'Configuración de periféricos por área'],
      },
    ],
  },
  {
    number: '05',
    label: 'Automatización',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80',
    layout: 'ink',
    title: 'Automatización e integración',
    desc: 'Flujos automáticos, conexión de plataformas y asistentes digitales.',
    color: '#34D399',
    icon: Zap,
    services: [
      {
        icon: Zap, color: '#34D399',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80',
        title: 'Automatización de procesos',
        desc: 'Reducimos tareas repetitivas, generamos reportes automáticos y optimizamos flujos de trabajo internos.',
        included: ['Análisis de proceso actual', 'Diseño e implementación de automatización', 'Reportes y notificaciones automáticas', 'Pruebas y ajustes', 'Documentación entregada'],
        idealFor: ['Procesos manuales que consumen tiempo', 'Equipos con tareas repetitivas', 'Reportes periódicos automáticos'],
      },
      {
        icon: GitMerge, color: '#4ADE80',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&auto=format&fit=crop&q=80',
        title: 'Integración de sistemas',
        desc: 'Conectamos plataformas y bases de datos para que la información fluya entre áreas sin trabajo manual.',
        included: ['Análisis de sistemas actuales', 'Conexión vía APIs o bases de datos', 'Automatización de flujos de datos', 'Validación y pruebas', 'Documentación técnica'],
        idealFor: ['Múltiples plataformas desconectadas', 'Información duplicada entre sistemas', 'Consolidación de datos'],
      },
      {
        icon: Bot, color: '#FBBF24',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=700&auto=format&fit=crop&q=80',
        title: 'Chatbots y asistentes digitales',
        desc: 'Chatbots para atención inicial, respuestas frecuentes, captación de prospectos y seguimiento automatizado.',
        included: ['Flujos de conversación personalizados', 'Integración con WhatsApp, web u otros canales', 'Captación y registro de datos', 'Integración con sistemas internos', 'Pruebas y ajustes'],
        idealFor: ['Alta demanda de atención inicial', 'Captación automática de leads', 'Canales digitales con tráfico frecuente'],
      },
    ],
  },
  {
    number: '06',
    label: 'Asesoría',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&auto=format&fit=crop&q=80',
    layout: 'split',
    title: 'Asesoramiento y estrategia',
    desc: 'Orientación tecnológica clara para tomar mejores decisiones en TI.',
    color: '#E879F9',
    icon: Lightbulb,
    services: [
      {
        icon: Lightbulb, color: '#E879F9',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80',
        title: 'Asesoramiento en TI',
        desc: 'Orientación para tomar mejores decisiones tecnológicas: qué implementar, cómo estructurar la infraestructura y cómo planificar la inversión.',
        included: ['Diagnóstico de situación tecnológica actual', 'Identificación de necesidades y brechas', 'Propuesta de priorización', 'Orientación sobre proveedores y herramientas', 'Sin compromiso de contratación'],
        idealFor: ['Empresas que no saben por dónde empezar', 'Tecnología desorganizada', 'Directivos que toman decisiones en TI'],
      },
      {
        icon: BarChart2, color: '#2DD4BF',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&auto=format&fit=crop&q=80',
        title: 'Presencia digital y redes sociales',
        desc: 'Estructura de comunicación digital, recursos para redes sociales y herramientas para mejorar la imagen en línea.',
        included: ['Revisión de presencia digital actual', 'Estructura básica de comunicación', 'Recursos y plantillas digitales', 'Orientación sobre plataformas', 'Herramientas de apoyo'],
        idealFor: ['Empresas sin estrategia digital', 'Negocios que quieren mejorar imagen online', 'Equipos que necesitan estructura de comunicación'],
      },
    ],
  },
]
