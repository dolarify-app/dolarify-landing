import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
  },
  template: `
    <header class="fixed top-0 right-0 left-0 z-50 px-4 pt-4 md:px-6">
      <nav
        class="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-3.5 py-2 transition-all md:px-6 md:py-3"
        [class.shadow-xl]="scrolled()"
        [class.border-glass-active]="scrolled()"
        aria-label="Navegación principal"
      >
        <a
          routerLink="/"
          class="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="Dolarify — Inicio"
        >
          <img
            src="brand/logo-sin-fondo.png"
            width="32"
            height="32"
            alt=""
            class="h-7 w-auto sm:h-8"
            loading="eager"
            decoding="async"
          />
        </a>

        <div class="hidden items-center gap-6 md:flex">
          <a href="#rates" class="text-sm fg-secondary transition-colors hover:fg">Tasas</a>
          <a href="#pago-movil" class="text-sm fg-secondary transition-colors hover:fg font-medium text-gold-light">Pago Móvil</a>
          <a href="#features" class="text-sm fg-secondary transition-colors hover:fg">Funciones</a>
          <a href="#how" class="text-sm fg-secondary transition-colors hover:fg">Cómo funciona</a>
          <a href="#showcase" class="text-sm fg-secondary transition-colors hover:fg">Capturas</a>
          <a href="#faq" class="text-sm fg-secondary transition-colors hover:fg">FAQ</a>
        </div>

        <div class="flex items-center gap-2">
          <app-theme-toggle />
          <a
            routerLink="/download"
            class="bg-purple glow-purple inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white! transition-all hover:scale-105 sm:px-4 sm:py-2 sm:text-sm"
          >
            Descargar
          </a>
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="flex h-8 w-8 items-center justify-center rounded-full border border-glass fg-secondary hover:fg hover:bg-glass transition-colors md:hidden"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-controls="mobile-nav-menu"
            [attr.aria-label]="mobileMenuOpen() ? 'Cerrar menú' : 'Abrir menú'"
          >
            @if (mobileMenuOpen()) {
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            }
          </button>
        </div>
      </nav>

      @if (mobileMenuOpen()) {
        <div
          id="mobile-nav-menu"
          class="glass mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-2xl p-3 shadow-2xl md:hidden border border-glass backdrop-blur-xl animate-in fade-in duration-200"
          role="region"
          aria-label="Menú móvil"
        >
          <a
            href="#rates"
            (click)="closeMobileMenu()"
            class="rounded-xl px-3.5 py-2.5 text-sm font-medium fg-secondary hover:fg hover:bg-glass transition-colors"
          >
            Tasas en vivo
          </a>
          <a
            href="#pago-movil"
            (click)="closeMobileMenu()"
            class="rounded-xl px-3.5 py-2.5 text-sm font-medium text-gold-light hover:bg-glass transition-colors flex items-center justify-between"
          >
            <span>Pago Móvil</span>
            <span class="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold-light tracking-wide">NUEVO</span>
          </a>
          <a
            href="#features"
            (click)="closeMobileMenu()"
            class="rounded-xl px-3.5 py-2.5 text-sm font-medium fg-secondary hover:fg hover:bg-glass transition-colors"
          >
            Funciones
          </a>
          <a
            href="#how"
            (click)="closeMobileMenu()"
            class="rounded-xl px-3.5 py-2.5 text-sm font-medium fg-secondary hover:fg hover:bg-glass transition-colors"
          >
            Cómo funciona
          </a>
          <a
            href="#showcase"
            (click)="closeMobileMenu()"
            class="rounded-xl px-3.5 py-2.5 text-sm font-medium fg-secondary hover:fg hover:bg-glass transition-colors"
          >
            Capturas
          </a>
          <a
            href="#faq"
            (click)="closeMobileMenu()"
            class="rounded-xl px-3.5 py-2.5 text-sm font-medium fg-secondary hover:fg hover:bg-glass transition-colors"
          >
            Preguntas frecuentes
          </a>
        </div>
      }
    </header>
  `,
  styles: [],
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly scrolled = signal(false);
  protected readonly mobileMenuOpen = signal(false);

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrolled.set(window.scrollY > 24);
  }
}
