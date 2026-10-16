import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreBadgesComponent } from '../../../../shared/components/store-badges/store-badges.component';
import { MeshBackgroundComponent } from '../../../../shared/components/mesh-background/mesh-background.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-cta-final',
  imports: [StoreBadgesComponent, MeshBackgroundComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-mesh-background>
      <section class="section" aria-labelledby="cta-heading">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <div appRevealOnScroll>
            <h2 id="cta-heading" class="font-display text-4xl font-bold tracking-tight fg md:text-6xl">
              Empieza a convertir
              <span class="text-gold-light">
                hoy.
              </span>
            </h2>
            <p class="mt-4 text-lg fg-secondary md:text-xl">
              Descárgala gratis. Sin registros raros. Sin trampas.
            </p>
          </div>

          <div appRevealOnScroll [delay]="100" class="mt-10 flex justify-center">
            <app-store-badges size="lg" align="center" />
          </div>
        </div>
      </section>
    </app-mesh-background>
  `,
  styles: [],
})
export class CtaFinalComponent {}
