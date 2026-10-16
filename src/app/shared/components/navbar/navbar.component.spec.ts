import '@angular/compiler';
import { describe, it, expect } from 'vitest';
import { createEnvironmentInjector, PLATFORM_ID, runInInjectionContext } from '@angular/core';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  it('should instantiate and initialize with menu closed and not scrolled', () => {
    const injector = createEnvironmentInjector([
      { provide: PLATFORM_ID, useValue: 'browser' },
    ]);

    runInInjectionContext(injector, () => {
      const component = new NavbarComponent();
      expect(component).toBeTruthy();
      expect(component['scrolled']()).toBe(false);
      expect(component['mobileMenuOpen']()).toBe(false);
    });
  });

  it('should toggle and close mobile menu', () => {
    const injector = createEnvironmentInjector([
      { provide: PLATFORM_ID, useValue: 'browser' },
    ]);

    runInInjectionContext(injector, () => {
      const component = new NavbarComponent();
      expect(component['mobileMenuOpen']()).toBe(false);

      component['toggleMobileMenu']();
      expect(component['mobileMenuOpen']()).toBe(true);

      component['toggleMobileMenu']();
      expect(component['mobileMenuOpen']()).toBe(false);

      component['toggleMobileMenu']();
      expect(component['mobileMenuOpen']()).toBe(true);

      component['closeMobileMenu']();
      expect(component['mobileMenuOpen']()).toBe(false);
    });
  });
});
