import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: {
      seo: {
        title: 'Dolarify — Tasas en tiempo real, Dólar BCV y Calculadora Venezuela',
        description:
          'Consulta las tasas en tiempo real de Venezuela: Dólar BCV, Euro y USDT. Usa nuestra calculadora de divisas para Bolívares y presupuestos al instante.',
        path: '/',
      },
    },
  },
  {
    path: 'download',
    loadComponent: () =>
      import('./pages/download/download.component').then((m) => m.DownloadComponent),
    data: {
      seo: {
        title: 'Descargar Dolarify — iOS y Android',
        description: 'Descarga Dolarify en App Store o Google Play.',
        path: '/download',
      },
    },
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
    data: {
      seo: {
        title: 'Política de Privacidad — Dolarify',
        description: 'Cómo Dolarify maneja tus datos.',
        path: '/privacy',
      },
    },
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms.component').then((m) => m.TermsComponent),
    data: {
      seo: {
        title: 'Términos de Servicio — Dolarify',
        description: 'Términos de uso de Dolarify.',
        path: '/terms',
      },
    },
  },
  { path: '**', redirectTo: '' },
];
