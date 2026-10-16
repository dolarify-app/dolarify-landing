import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StoreBadgesComponent } from '../../../../shared/components/store-badges/store-badges.component';
import { MeshBackgroundComponent } from '../../../../shared/components/mesh-background/mesh-background.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

const CURRENCIES = ['VES', 'USD', 'EUR', 'USDT'] as const;

@Component({
  selector: 'app-hero',
  imports: [StoreBadgesComponent, MeshBackgroundComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-mesh-background>
      <section class="relative overflow-hidden pb-16 md:pb-24">
        <div class="mx-auto grid max-w-7xl gap-12 px-6 pt-8 md:grid-cols-2 md:items-center md:gap-12 md:pt-16 lg:gap-16">
          <div appRevealOnScroll>
            <span class="mb-4 inline-flex items-center gap-2 rounded-full border border-glass bg-glass px-3 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase backdrop-blur-md">
              <span aria-hidden="true">🇻🇪</span>
              Hecho para Venezuela
            </span>

            <h1 class="font-display text-4xl font-bold leading-[1.05] tracking-tight fg md:text-6xl lg:text-7xl">
              Tasas en tiempo real para Venezuela.
              <br />
              <span class="text-gold-light">
                Dólar BCV, Paralelo y Calculadora.
              </span>
            </h1>

            <p class="mt-6 max-w-xl text-lg fg-secondary md:text-xl">
              Convierte entre Bolívares, Dólar BCV, Euro y USDT. Crea presupuestos. Guarda cotizaciones. Todo en un solo lugar.
            </p>

            <div class="mt-8">
              <app-store-badges size="md" />
            </div>

            <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm fg-muted">
              <span class="flex items-center gap-2">
                <span class="bg-success h-1.5 w-1.5 rounded-full" aria-hidden="true"></span>
                Gratis, sin registro
              </span>
              <span class="flex items-center gap-2">
                <span class="bg-gold h-1.5 w-1.5 rounded-full" aria-hidden="true"></span>
                iOS y Android
              </span>
              <span class="flex items-center gap-2">
                <span class="bg-purple h-1.5 w-1.5 rounded-full" aria-hidden="true"></span>
                Datos BCV + Binance
              </span>
            </div>
          </div>

          <div appRevealOnScroll [delay]="150" class="relative flex justify-center md:justify-end">
            <div class="relative">
              <div
                class="absolute inset-0 -z-10 blur-3xl"
                style="background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.25), transparent 60%);"
                aria-hidden="true"
              ></div>

              <img
                src="screenshots/ios/calculadora.webp"
                width="600"
                height="1066"
                alt="Captura de pantalla de la calculadora multi-moneda de Dolarify"
                class="relative h-auto w-[240px] drop-shadow-2xl md:w-[300px] lg:w-[340px]"
                style="filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />

              <div
                class="glass absolute -top-4 -left-8 hidden rounded-2xl px-4 py-3 md:block"
                aria-hidden="true"
              >
                <div class="flex items-center gap-2">
                  <span class="text-lg">🇺🇸</span>
                  <div>
                    <p class="text-[10px] fg-muted uppercase tracking-wider">Dólar BCV</p>
                    <p class="text-gold-light glow-text-gold font-display text-lg font-bold">130.45</p>
                  </div>
                </div>
              </div>

              <div
                class="glass absolute -right-4 -bottom-6 hidden rounded-2xl px-4 py-3 md:block"
                aria-hidden="true"
              >
                <div class="flex items-center gap-2">
                  <span class="text-lg">💲</span>
                  <div>
                    <p class="text-[10px] fg-muted uppercase tracking-wider">USDT</p>
                    <p class="text-gold-light glow-text-gold font-display text-lg font-bold">138.92</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto mt-16 max-w-5xl px-6 md:mt-20">
          <div
            appRevealOnScroll
            class="glass rounded-3xl p-8 md:p-10"
            aria-label="Calculadora decorativa de muestra"
            role="img"
          >
            <p class="mb-6 text-center text-xs font-semibold fg-muted uppercase tracking-widest">
              Vista previa en vivo
            </p>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              @for (cur of currencies; track cur; let i = $index) {
                <div
                  class="rounded-2xl border p-4 transition-all md:p-5"
                  [class.border-glass-active]="i === currentIndex()"
                  [class.bg-glass-hover]="i === currentIndex()"
                  [class.border-glass]="i !== currentIndex()"
                >
                  <p
                    class="font-display text-sm font-semibold tracking-wide md:text-base"
                    [class.text-gold-light]="i === currentIndex()"
                    [class.fg-muted]="i !== currentIndex()"
                  >
                    {{ cur }}
                  </p>
                  <p
                    class="mt-2 font-display text-2xl font-bold tracking-tight md:mt-3 md:text-3xl"
                    [class.text-gold-light]="i === currentIndex()"
                    [class.glow-text-gold]="i === currentIndex()"
                    [class.fg]="i !== currentIndex()"
                  >
                    {{ formatValue(getValueFor(i)) }}
                  </p>
                </div>
              }
            </div>
            <p class="mt-6 text-center text-xs fg-muted">
              Vista previa en vivo. Valores de referencia actualizados automáticamente en la app.
            </p>
          </div>
        </div>
      </section>
    </app-mesh-background>
  `,
  styles: [],
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private intervalId?: ReturnType<typeof setInterval>;
  protected readonly currencies = CURRENCIES;
  protected readonly currentIndex = signal(1);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.intervalId = setInterval(() => {
      this.currentIndex.update((i) => (i + 1) % CURRENCIES.length);
    }, 2200);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  protected getValueFor(index: number): number {
    const rates = [13045, 100, 86, 71];
    return rates[index] ?? 0;
  }

  protected formatValue(value: number): string {
    return value.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
