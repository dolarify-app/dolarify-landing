import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxThemeToggleComponent, OmDarkIcon, OmLightIcon } from '@omnedia/ngx-theme-toggle';

@Component({
  selector: 'app-theme-toggle',
  imports: [NgxThemeToggleComponent, OmDarkIcon, OmLightIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <om-theme-toggle
      [animationStyle]="'circle'"
      [duration]="400"
      themeTarget="html"
      lightThemeClass="light"
      darkThemeClass="dark"
      class="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105"
    >
      <span darkIcon class="inline-flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-gold-light"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>
      <span lightIcon class="inline-flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-purple-light"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </om-theme-toggle>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    ::ng-deep .om-theme-toggle {
      width: 100% !important;
      height: 100% !important;
      border-radius: 9999px !important;
      color: inherit;
    }
  `],
})
export class ThemeToggleComponent {}
