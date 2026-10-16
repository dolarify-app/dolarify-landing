export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: '¿De dónde vienen las tasas?',
    answer:
      'Las tasas se extraen en tiempo real del Banco Central de Venezuela (BCV) y Binance P2P. No somos responsables por errores en la publicación de las tasas. Recomendamos verificar en las fuentes oficiales.',
  },
  {
    question: '¿Es gratis?',
    answer:
      'Sí, Dolarify es totalmente gratis. La app se mantiene con anuncios banner no intrusivos, sin suscripción ni compras dentro de la app.',
  },
  {
    question: '¿Necesito crear una cuenta?',
    answer:
      'No. Dolarify funciona sin registro. Todo se guarda localmente en tu dispositivo.',
  },
  {
    question: '¿Funciona sin internet?',
    answer:
      'Puedes consultar tasas guardadas y presupuestos sin conexión, pero para actualizar las tasas en tiempo real necesitas internet.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer:
      'Sí. Dolarify no recolecta datos personales. Tus presupuestos, cotizaciones y configuraciones se almacenan únicamente en tu dispositivo.',
  },
  {
    question: '¿Dolarify realiza transferencias bancarias o pagos directos?',
    answer:
      'No. Dolarify funciona como un preparador local inteligente: procesa los datos desordenados del portapapeles, calcula el monto en Bolívares y genera el bloque listo para que lo pegues en la app de tu banco. No solicita claves ni tiene acceso a tus fondos.',
  },
  {
    question: '¿Planean agregar más monedas?',
    answer:
      'Sí. Estamos trabajando para incluir nuevas monedas y tasas personalizables. Puedes sugerir monedas desde la sección de Ajustes dentro de la app.',
  },
  {
    question: '¿Hay versión web?',
    answer:
      'Por ahora Dolarify es solo móvil (iOS y Android). Esta web es la página oficial para conocer la app y descargarla.',
  },
  {
    question: '¿Cómo contacto soporte?',
    answer:
      'Escríbenos a soporte@dolarify.app y te responderemos lo antes posible.',
  },
];
