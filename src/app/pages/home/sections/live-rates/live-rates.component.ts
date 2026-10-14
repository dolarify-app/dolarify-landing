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

                <p class="mt-6 font-display text-4xl font-bold tracking-tight glow-gold">
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

        <div class="mt-12" appRevealOnScroll [delay]="150">
          <div class="glass overflow-hidden rounded-2xl p-6 md:p-8">
            <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 class="font-display text-xl font-bold fg">
                  Tabla de conversión rápida USD a Bolívares
                </h3>
                <p class="mt-1 text-xs fg-secondary">
                  Calculada según la tasa del Dólar BCV (1 USD = {{ usdRate.toFixed(2) }} Bs)
                </p>
              </div>
              <span class="inline-flex items-center gap-1.5 self-start rounded-full border border-glass bg-glass px-3 py-1 text-xs font-medium text-gold-light">
                <span class="bg-success h-1.5 w-1.5 rounded-full" aria-hidden="true"></span>
                Tasa de referencia oficial
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm" aria-label="Tabla de conversión de USD a Bolívares según tasa BCV">
                <caption class="sr-only">
                  Conversión de denominaciones típicas de Dólares estadounidenses a Bolívares según tasa oficial del BCV
                </caption>
                <thead>
                  <tr class="border-b border-glass text-xs uppercase tracking-wider fg-muted">
                    <th scope="col" class="pb-3 font-semibold">Dólares (USD)</th>
                    <th scope="col" class="pb-3 text-right font-semibold">Bolívares (VES)</th>
                    <th scope="col" class="hidden pb-3 text-right font-semibold sm:table-cell">Tasa aplicada</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-glass/40">
                  @for (amount of denominations; track amount) {
                    <tr class="transition-colors hover:bg-glass/30">
                      <td class="py-3.5 font-medium fg">
                        <span class="inline-flex items-center gap-2">
                          <span class="text-gold-light font-display font-semibold">&#36;{{ amount }}</span>
                          <span class="text-xs fg-muted">USD</span>
                        </span>
                      </td>
                      <td class="py-3.5 text-right font-display font-bold fg glow-gold">
                        {{ formatBs(amount) }} <span class="text-xs font-normal fg-secondary">Bs</span>
                      </td>
                      <td class="hidden py-3.5 text-right text-xs fg-muted sm:table-cell">
                        1 USD = {{ usdRate.toFixed(2) }} Bs
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p class="mt-8 text-center text-xs fg-muted">
          Tasas de muestra. Los valores reales se muestran en la app.
        </p>
      </div>
    </section>
  `,
  styles: [],
})
export class LiveRatesComponent {
  protected readonly rates = liveRates;
  protected readonly usdRate = this.rates.find((r) => r.code === 'USD')?.value ?? 130.45;
  protected readonly denominations = [1, 5, 10, 20, 50, 100];

  protected formatBs(amount: number): string {
    return (amount * this.usdRate).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
