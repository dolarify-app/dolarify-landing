import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { faqItems } from '../data/faq.data';

export interface SeoMeta {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly doc = inject(DOCUMENT);
  private readonly siteUrl = 'https://dolarify.app';
  private readonly siteName = 'Dolarify';

  apply(seo: SeoMeta): void {
    const url = `${this.siteUrl}${seo.path ?? '/'}`;
    const image = `${this.siteUrl}${seo.imagePath ?? '/og-image.png'}`;

    this.title.setTitle(seo.title);
    this.updateName('description', seo.description);
    this.updateProperty('og:title', seo.title);
    this.updateProperty('og:description', seo.description);
    this.updateProperty('og:url', url);
    this.updateProperty('og:image', image);
    this.updateProperty('og:site_name', this.siteName);
    this.updateProperty('og:locale', 'es_VE');
    this.updateName('twitter:card', 'summary_large_image');
    this.updateName('twitter:title', seo.title);
    this.updateName('twitter:description', seo.description);
    this.updateName('twitter:image', image);
    this.updateProperty('og:image:width', '1200');
    this.updateProperty('og:image:height', '630');

    if (!seo.path || seo.path === '/') {
      this.injectHomeSchemas();
    }
  }

  setJsonLd(id: string, schema: Record<string, unknown>): void {
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      const head = this.doc.head || this.doc.getElementsByTagName('head')[0];
      head?.appendChild(script);
    }
    script.textContent = JSON.stringify(schema, null, 2);
  }

  private injectHomeSchemas(): void {
    this.setJsonLd('software-application-schema', {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Dolarify',
      category: 'FinanceApplication',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      price: '0',
      currency: 'USD',
      url: 'https://dolarify.app',
      downloadUrl: 'https://dolarify.app/download',
      author: {
        '@type': 'Organization',
        name: 'Lyon Incode',
        url: 'https://dolarify.app',
      },
    });

    this.setJsonLd('website-schema', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://dolarify.app/#website',
          name: 'Dolarify',
          url: 'https://dolarify.app',
          inLanguage: 'es-VE',
          description:
            'Consulta las tasas en tiempo real de Venezuela: Dólar BCV, Euro y USDT. Usa nuestra calculadora de divisas para Bolívares y presupuestos al instante.',
          publisher: {
            '@id': 'https://dolarify.app/#organization',
          },
        },
        {
          '@type': 'Organization',
          '@id': 'https://dolarify.app/#organization',
          name: 'Lyon Incode',
          url: 'https://dolarify.app',
          logo: 'https://dolarify.app/brand/logo-sin-fondo.png',
          sameAs: ['https://www.bcv.org.ve'],
        },
      ],
    });

    this.setJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  private updateName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private updateProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }
}

