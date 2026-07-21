import { ChangeDetectionStrategy, Component } from '@angular/core';
import { androidShowcase } from '../../../../core/data/showcase.data';
import { AndroidMockupComponent } from '../../../../shared/components/android-mockup/android-mockup.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-showcase-android',
  imports: [AndroidMockupComponent, SectionHeadingComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="android" aria-labelledby="android-heading">
      <div class="mx-auto max-w-7xl px-6">
        <div appRevealOnScroll>
          <app-section-heading
            eyebrow="También en Android"
            title="Disponible en iOS y Android"
            subtitle="La misma experiencia premium en ambas plataformas."
          />
        </div>

        <div
          appRevealOnScroll
          [delay]="100"
          class="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 items-end justify-items-center"
        >
          @for (slide of slides; track slide.image) {
            <figure class="flex flex-col items-center w-full max-w-[260px] transition-transform hover:scale-[1.03]">
              <app-android-mockup [src]="slide.image" />
              <figcaption class="mt-3 text-center text-sm font-medium fg-secondary">
                {{ slide.title }}
              </figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ShowcaseAndroidComponent {
  protected readonly slides = androidShowcase;
}
