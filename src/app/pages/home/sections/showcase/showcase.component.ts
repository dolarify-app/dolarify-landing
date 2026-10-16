import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  viewChild,
  AfterViewInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { iosShowcase, androidShowcase } from '../../../../core/data/showcase.data';
import { AndroidMockupComponent } from '../../../../shared/components/android-mockup/android-mockup.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-showcase',
  imports: [AndroidMockupComponent, SectionHeadingComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section overflow-hidden" id="showcase" aria-labelledby="showcase-heading">
      <div class="mx-auto max-w-7xl px-6">
        <div appRevealOnScroll>
          <app-section-heading
            eyebrow="Recorrido visual"
            title="Así se ve Dolarify"
            subtitle="Una experiencia nativa, fluida y cuidada al detalle tanto en Android como en iOS."
          />
        </div>

        <!-- Selector de Plataforma: Android prioritario para Venezuela e iOS -->
        <div appRevealOnScroll [delay]="50" class="mt-8 flex justify-center">
          <div
            class="glass inline-flex rounded-full border border-glass p-1.5"
            role="tablist"
            aria-label="Seleccionar plataforma para previsualización"
          >
            <button
              type="button"
              role="tab"
              [attr.aria-selected]="selectedPlatform() === 'android'"
              (click)="setPlatform('android')"
              class="inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all sm:text-sm"
              [class.bg-gold]="selectedPlatform() === 'android'"
              [class.text-slate-950]="selectedPlatform() === 'android'"
              [class.glow-gold]="selectedPlatform() === 'android'"
              [class.fg-secondary]="selectedPlatform() !== 'android'"
              [class.hover:fg]="selectedPlatform() !== 'android'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect width="14" height="20" x="5" y="2" rx="2" />
                <path d="M12 18h.01" />
              </svg>
              Android
            </button>

            <button
              type="button"
              role="tab"
              [attr.aria-selected]="selectedPlatform() === 'ios'"
              (click)="setPlatform('ios')"
              class="inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all sm:text-sm"
              [class.bg-purple]="selectedPlatform() === 'ios'"
              [class.text-white]="selectedPlatform() === 'ios'"
              [class.glow-purple]="selectedPlatform() === 'ios'"
              [class.fg-secondary]="selectedPlatform() !== 'ios'"
              [class.hover:fg]="selectedPlatform() !== 'ios'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M10 2c1 .5 2 2 2 5" />
              </svg>
              iOS (iPhone)
            </button>
          </div>
        </div>
      </div>

      <!-- Vista Android: Mockups nativos en cuadrícula premium -->
      @if (selectedPlatform() === 'android') {
        <div class="mx-auto mt-12 max-w-7xl px-6">
          <div
            appRevealOnScroll
            [delay]="100"
            class="grid grid-cols-2 items-end justify-items-center gap-6 md:grid-cols-4 md:gap-8"
          >
            @for (slide of androidSlides; track slide.image) {
              <figure class="flex w-full max-w-[260px] flex-col items-center justify-center text-center transition-transform hover:scale-[1.03]">
                <app-android-mockup [src]="slide.image" class="flex w-full justify-center" />
                <figcaption class="mt-3 text-center text-sm font-medium fg-secondary">
                  {{ slide.title }}
                </figcaption>
              </figure>
            }
          </div>
        </div>
      }

      <!-- Vista iOS: Carrusel con marcos y flechas de navegación en escritorio -->
      @if (selectedPlatform() === 'ios') {
        <div appRevealOnScroll [delay]="100" class="relative mt-12">
          <!-- Flechas de navegación para desktop -->
          <div class="pointer-events-none absolute inset-y-0 right-0 left-0 hidden items-center justify-between px-4 md:flex">
            <button
              type="button"
              (click)="scrollOffset(-1)"
              class="pointer-events-auto z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-glass bg-surface/90 fg shadow-lg backdrop-blur-md transition-all hover:bg-surface-hover hover:scale-110 active:scale-95"
              aria-label="Anterior captura de iOS"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              (click)="scrollOffset(1)"
              class="pointer-events-auto z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-glass bg-surface/90 fg shadow-lg backdrop-blur-md transition-all hover:bg-surface-hover hover:scale-110 active:scale-95"
              aria-label="Siguiente captura de iOS"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div
            #carousel
            class="snap-x-scroll flex gap-6 overflow-x-auto px-6 pb-6"
            tabindex="0"
            aria-label="Carrusel de capturas de pantalla de iOS"
          >
            @for (slide of iosSlides; track slide.image; let i = $index) {
              <article
                class="w-[240px] shrink-0 md:w-[280px]"
                [attr.aria-roledescription]="'slide'"
                [attr.aria-label]="(i + 1) + ' de ' + iosSlides.length + ': ' + slide.title"
              >
                <div class="glass overflow-hidden rounded-2xl p-3">
                  <img
                    [src]="slide.image"
                    [alt]="slide.title + ' — captura de pantalla'"
                    width="600"
                    height="1066"
                    class="h-auto w-full rounded-xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="mt-3 px-1">
                  <h3 class="font-display text-base font-semibold fg">
                    {{ slide.title }}
                  </h3>
                  <p class="mt-1 text-xs fg-secondary">
                    {{ slide.caption }}
                  </p>
                </div>
              </article>
            }
          </div>

          <div class="mx-auto mt-6 flex max-w-7xl justify-center gap-2 px-6" role="tablist" aria-label="Indicadores del carrusel iOS">
            @for (slide of iosSlides; track slide.image; let i = $index) {
              <button
                type="button"
                role="tab"
                [attr.aria-selected]="activeIndex() === i"
                [attr.aria-label]="'Ir a la captura ' + (i + 1)"
                class="h-1.5 rounded-full transition-all"
                [class.w-8]="activeIndex() === i"
                [class.w-1.5]="activeIndex() !== i"
                [class.bg-purple]="activeIndex() === i"
                [class.bg-surface-hover]="activeIndex() !== i"
                (click)="scrollTo(i)"
              ></button>
            }
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class ShowcaseComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly selectedPlatform = signal<'android' | 'ios'>('android');
  protected readonly iosSlides = iosShowcase;
  protected readonly androidSlides = androidShowcase;

  protected readonly activeIndex = signal(0);
  private readonly carouselRef = viewChild<ElementRef<HTMLDivElement>>('carousel');
  private observer?: IntersectionObserver;

  setPlatform(platform: 'android' | 'ios'): void {
    this.selectedPlatform.set(platform);
    if (platform === 'ios') {
      setTimeout(() => this.setupObserver(), 100);
    }
  }

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const carousel = this.carouselRef()?.nativeElement;
    if (!carousel) return;

    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      () => {
        const scrollLeft = carousel.scrollLeft;
        const slideWidth = carousel.scrollWidth / this.iosSlides.length;
        const idx = Math.round(scrollLeft / slideWidth);
        this.activeIndex.set(Math.max(0, Math.min(idx, this.iosSlides.length - 1)));
      },
      { root: carousel, threshold: 0.5 },
    );

    Array.from(carousel.children).forEach((child) => {
      this.observer!.observe(child);
    });
  }

  protected scrollTo(index: number): void {
    const carousel = this.carouselRef()?.nativeElement;
    if (!carousel) return;
    const slideWidth = carousel.scrollWidth / this.iosSlides.length;
    carousel.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
  }

  protected scrollOffset(direction: -1 | 1): void {
    const carousel = this.carouselRef()?.nativeElement;
    if (!carousel) return;
    const nextIdx = Math.max(0, Math.min(this.activeIndex() + direction, this.iosSlides.length - 1));
    this.scrollTo(nextIdx);
  }
}
