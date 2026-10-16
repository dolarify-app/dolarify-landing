import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxShineBorderComponent } from '@omnedia/ngx-shine-border';
import { liveRates } from '../../../../core/data/rates.data';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-live-rates',
  imports: [NgxShineBorderComponent, SectionHeadingComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="rates" aria-labelledby="rates-heading">
      <div class="mx-auto max-w-7xl px-6">
        <div appRevealOnScroll>
          <app-section-heading
            eyebrow="Tasas en vivo"
            title="Datos en tiempo real"
            subtitle="Información extraída del Banco Central de Venezuela y Binance P2P. Refrescadas al instante en la app."
          />
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-3" appRevealOnScroll [delay]="100">
          @for (rate of rates; track rate.code) {
            <om-shine-border
              [gradientColorStart]="rate.source === 'BCV' ? '#f59e0b' : '#34d399'"
              [gradientColorMiddle]="'#8b5cf6'"
              [gradientColorEnd]="'#fbbf24'"
              [borderRadius]="'1rem'"
              [animationDuration]="'10s'"
              class="block"
            >
              <div class="glass relative h-full overflow-hidden rounded-2xl p-6">

                <div class="flex items-center gap-3">
                  <span class="text-2xl" aria-hidden="true">{{ rate.flag }}</span>
                  <div>
                    <p class="font-display text-lg font-semibold fg">
                      {{ rate.name }}
                    </p>
                    <p class="text-xs fg-muted">
                      {{ rate.code }} · {{ rate.source }}
                    </p>
                  </div>
                </div>

                <p class="mt-6 font-display text-4xl font-bold tracking-tight text-gold-light glow-text-gold">
                  {{ rate.value.toFixed(2) }}
                  <span class="text-base font-medium fg-secondary">Bs</span>
                </p>

                @if (rate.change !== undefined) {
                  <p class="mt-2 flex items-center gap-1 text-xs text-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                    +{{ rate.change.toFixed(2) }}% (24h)
                  </p>
                }
              </div>
            </om-shine-border>
          }
        </div>

        <p class="mt-8 text-center text-xs fg-muted">
          Tasas de referencia. Los valores en tiempo real se consultan automáticamente en la app.
        </p>
      </div>
    </section>
  `,
  styles: [],
})
export class LiveRatesComponent {
  protected readonly rates = liveRates;
  protected readonly usdRate = this.rates.find((r) => r.code === 'USD')?.value ?? 130.45;
}
