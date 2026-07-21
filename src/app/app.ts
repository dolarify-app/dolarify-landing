import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SmoothScrollService } from './core/services/smooth-scroll.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#main"
      class="bg-purple sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      Saltar al contenido principal
    </a>
    <app-navbar />
    <main id="main" class="min-h-dvh pt-24">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [],
})
export class App {
  private readonly smoothScroll = inject(SmoothScrollService);

  constructor() {
    afterNextRender(() => {
      this.smoothScroll.init();
    });
  }
}

