import type { Component } from 'vue'
import { Globe, Code2, Zap, Bot, Mail, Monitor, Wrench, Wifi, Printer } from '@lucide/vue'

/**
 * Catálogo y reglas del cotizador DASTI.
 * Valores trasladados sin cambios desde QuoterSection.vue (rediseño 2026).
 * NO modificar precios, notas ni descuentos sin autorización comercial.
 */

export interface Tier { name: string; price: number; custom?: boolean; note?: string }
export interface MonthlyOption { name: string; price: number }

export interface ServiceDef {
  id: string; icon: Component; name: string; color: string; category: string
  tiers: Tier[]; hasQuantity?: boolean; note?: string
  mandatoryMonthly?: MonthlyOption[]
}

export const servicesDef: ServiceDef[] = [
  {
    id: 'web', icon: Globe, name: 'Desarrollo web', color: '#818CF8', category: 'Software y desarrollo',
    tiers: [
      { name: 'Landing page profesional', price: 6000 },
      { name: 'Sitio corporativo', price: 12000 },
      { name: 'Sitio corporativo avanzado', price: 18000 },
      { name: 'Sitio con funciones personalizadas', price: 25000, note: 'Precio de referencia; puede variar según alcance y funcionalidades' },
    ],
  },
  {
    id: 'software', icon: Code2, name: 'Software a medida', color: '#3B82F6', category: 'Software y desarrollo',
    tiers: [
      { name: 'Sistema interno básico', price: 25000 },
      { name: 'Sistema administrativo con usuarios y reportes', price: 45000 },
      { name: 'Sistema por módulos', price: 80000, note: 'Precio de referencia; puede variar según módulos y alcance' },
      { name: 'Proyecto empresarial por alcance', price: 0, custom: true },
    ],
  },
  {
    id: 'email', icon: Mail, name: 'Correos corporativos', color: '#F472B6', category: 'Correos corporativos',
    mandatoryMonthly: [
      { name: 'Administración mensual estándar', price: 7500 },
      { name: 'Administración mensual prioritaria', price: 9000 },
    ],
    tiers: [
      { name: 'Implementación inicial (hasta 100 cuentas)', price: 20000, note: 'Incluye configuración técnica, cuentas por área, SPF/DKIM/DMARC y soporte de arranque' },
    ],
    note: 'La administración mensual es obligatoria e incluye soporte continuo, gestión de cuentas y renovaciones. Cuenta adicional: $70/mes. 10 GB adicionales: $150/mes.',
  },
  {
    id: 'network', icon: Wifi, name: 'Redes e infraestructura', color: '#60A5FA', category: 'Redes e infraestructura',
    tiers: [
      { name: 'Diagnóstico de red', price: 1500 },
      { name: 'Configuración básica de red', price: 3500 },
      { name: 'Sistema mesh básico (2 puntos de acceso)', price: 9500, note: 'Incluye instalación y configuración de roaming automático' },
      { name: 'Sistema mesh oficina (3 puntos de acceso)', price: 14500, note: 'Cobertura ampliada con roaming automático' },
      { name: 'Sistema mesh empresarial (4+ puntos)', price: 22000, note: 'Red unificada con cobertura total y roaming automático' },
      { name: 'Nodo adicional instalado y configurado', price: 4500 },
      { name: 'Proyecto de red por alcance', price: 0, custom: true },
    ],
    note: 'Los sistemas mesh permiten cubrir toda la empresa con una sola red WiFi inteligente y roaming automático.',
  },
  {
    id: 'equipment', icon: Monitor, name: 'Equipos de cómputo', color: '#FB923C', category: 'Equipos de cómputo',
    hasQuantity: true,
    tiers: [
      { name: 'Actualización básica', price: 5000, note: 'Mejora de velocidad con SSD o RAM' },
      { name: 'Actualización avanzada', price: 8000, note: 'Rendimiento, limpieza y configuración' },
      { name: 'Equipo administrativo nuevo', price: 12000, note: 'Oficina, correo, documentos, sistemas básicos' },
      { name: 'Equipo empresarial multitarea', price: 18000, note: 'Uso administrativo fuerte y multitarea' },
      { name: 'Equipo de alto rendimiento', price: 25000, note: 'Mayor carga de trabajo y exigencia' },
    ],
    note: 'Descuento por volumen aplicado sobre integración y configuración.',
  },
  {
    id: 'printers', icon: Printer, name: 'Impresoras y periféricos', color: '#2DD4BF', category: 'Equipos y periféricos',
    tiers: [
      { name: 'Suministro multimarca (cotización)', price: 0, custom: true, note: 'Disponibilidad varía según marca, modelo y proveedor.' },
      { name: 'Instalación y configuración básica', price: 350 },
      { name: 'Configuración en red', price: 500 },
      { name: 'Soporte o diagnóstico', price: 600 },
    ],
    note: 'Sujeto a existencia, marca, modelo y requerimientos del cliente.',
  },
  {
    id: 'support', icon: Wrench, name: 'Soporte técnico', color: '#A78BFA', category: 'Soporte técnico',
    tiers: [
      { name: 'Diagnóstico de equipo', price: 350 },
      { name: 'Mantenimiento preventivo', price: 600 },
      { name: 'Configuración de impresora o escáner', price: 350 },
      { name: 'Configuración de correo en equipo', price: 250 },
      { name: 'Optimización de sistema', price: 800 },
      { name: 'Soporte especializado', price: 1200 },
    ],
  },
  {
    id: 'automation', icon: Zap, name: 'Automatización e integración', color: '#34D399', category: 'Automatización e integración',
    tiers: [
      { name: 'Automatización básica', price: 7500 },
      { name: 'Reportes automáticos', price: 15000 },
      { name: 'Integración con APIs externas', price: 25000 },
      { name: 'Integración entre sistemas internos', price: 35000 },
      { name: 'Automatización avanzada por alcance', price: 0, custom: true },
    ],
  },
  {
    id: 'chatbot', icon: Bot, name: 'Chatbots y asistentes digitales', color: '#FBBF24', category: 'Automatización e integración',
    tiers: [
      { name: 'Bot básico de respuestas frecuentes', price: 8000 },
      { name: 'Bot con flujo comercial y captación de datos', price: 15000 },
      { name: 'Bot avanzado con integración a sistemas', price: 28000 },
      { name: 'Bot empresarial a medida', price: 0, custom: true },
    ],
  },
]

/** Descuento por volumen para equipos de cómputo. */
export const getEquipmentDiscount = (qty: number): number => {
  if (qty >= 21) return 0.15
  if (qty >= 11) return 0.10
  if (qty >= 6) return 0.08
  if (qty >= 3) return 0.05
  return 0
}

/** Escala visual de descuentos (debe coincidir con getEquipmentDiscount). */
export const VOLUME_DISCOUNT_SCALE = [
  { range: '1-2', disc: 0 },
  { range: '3-5', disc: 5 },
  { range: '6-10', disc: 8 },
  { range: '11-20', disc: 10 },
  { range: '21+', disc: 15 },
]
