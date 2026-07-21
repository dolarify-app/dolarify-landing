export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: 'gold' | 'purple';
  size: 'xl' | 'm' | 's' | 'wide';
  version?: string;
  screenshot?: string;
}

export const features: Feature[] = [
  {
    id: 'copia-bs',
    title: 'Copia en Bolívares (VES)',
    description: 'Convierte y copia ítems en USD, EUR o USDT a Bs automáticamente usando la tasa BCV oficial.',
    icon: 'copy',
    accent: 'gold',
    size: 'm',
    version: 'v1.6.2',
  },
  {
    id: 'compartir-rapido',
    title: 'Compartir presupuestos al instante',
    description: 'Envía el resumen de tu presupuesto recalculado en tiempo real sin montos desfasados.',
    icon: 'share-2',
    accent: 'purple',
    size: 'm',
    version: 'v1.6.2',
  },
  {
    id: 'calculadora',
    title: 'Calculadora multi-moneda',
    description: 'Convierte entre Bolívares, Dólar BCV, Euro y USDT en un solo toque.',
    icon: 'calculator',
    accent: 'gold',
    size: 'wide',
    version: 'v1.0.0',
    screenshot: 'screenshots/ios/calculadora.webp',
  },
  {
    id: 'tasas-vivo',
    title: 'Tasas en vivo',
    description: 'BCV y Binance P2P actualizadas al instante.',
    icon: 'trending-up',
    accent: 'gold',
    size: 'm',
    version: 'v1.0.0',
    screenshot: 'screenshots/ios/indicadores-lista.webp',
  },
  {
    id: 'multi-moneda',
    title: '4 monedas',
    description: 'VES, USD, EUR y USDT en un mismo lugar.',
    icon: 'coins',
    accent: 'purple',
    size: 'm',
    version: 'v1.0.0',
  },
  {
    id: 'presupuestos',
    title: 'Presupuestos multi-concepto',
    description: 'Crea presupuestos con varios items en distintas monedas.',
    icon: 'wallet',
    accent: 'gold',
    size: 'm',
    version: 'v1.6.2',
    screenshot: 'screenshots/ios/presupuesto.webp',
  },
  {
    id: 'copia-precision',
    title: 'Formato nativo en copiar',
    description: 'Copia cifras con formato es-VE (ej. 13.500,50 Bs) listas para enviar por WhatsApp.',
    icon: 'zap',
    accent: 'purple',
    size: 's',
    version: 'v1.6.1',
  },
  {
    id: 'historial',
    title: 'Historial y comparación',
    description: 'Ve cómo han cambiado las tasas desde que guardaste tu cotización.',
    icon: 'history',
    accent: 'purple',
    size: 'm',
    version: 'v1.2.0',
    screenshot: 'screenshots/ios/cotizacion-guardada.webp',
  },
  {
    id: 'busqueda',
    title: 'Búsqueda de presupuestos',
    description: 'Encuentra cualquier presupuesto guardado al instante.',
    icon: 'search',
    accent: 'purple',
    size: 's',
    version: 'v1.1.0',
  },
  {
    id: 'indicadores-vista',
    title: 'Vista lista o cuadros',
    description: 'Cambia el menú de indicadores según tu preferencia.',
    icon: 'layout-grid',
    accent: 'gold',
    size: 's',
    version: 'v1.2.0',
    screenshot: 'screenshots/ios/indicadores-cuadros.webp',
  },
  {
    id: 'presets',
    title: 'Presets de montos',
    description: 'Configura montos rápidos para la calculadora desde ajustes.',
    icon: 'sliders-horizontal',
    accent: 'gold',
    size: 's',
    version: 'v1.5.1',
  },
  {
    id: 'marcadores',
    title: 'Marcadores guardados',
    description: 'Lleva el control de tus cotizaciones favoritas.',
    icon: 'bookmark',
    accent: 'gold',
    size: 's',
    version: 'v1.2.0',
    screenshot: 'screenshots/ios/marcadores.webp',
  },
  {
    id: 'glass',
    title: 'Glassmorphism premium',
    description: 'Animaciones y micro-interacciones cuidadas al detalle.',
    icon: 'sparkles',
    accent: 'purple',
    size: 's',
    version: 'v1.1.0',
  },
];

