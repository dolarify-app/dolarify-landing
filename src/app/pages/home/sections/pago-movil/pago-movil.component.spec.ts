import '@angular/compiler';
import { describe, it, expect } from 'vitest';
import { createEnvironmentInjector, PLATFORM_ID, runInInjectionContext } from '@angular/core';
import { PagoMovilComponent } from './pago-movil.component';

describe('PagoMovilComponent', () => {
  it('should instantiate and compute correct amounts for USD', () => {
    const injector = createEnvironmentInjector([
      { provide: PLATFORM_ID, useValue: 'browser' },
    ]);

    runInInjectionContext(injector, () => {
      const component = new PagoMovilComponent();
      expect(component).toBeTruthy();
      expect(component['amount']()).toBe(25);
      expect(component['currency']()).toBe('USD');
      expect(component['calculatedBs']()).toBeCloseTo(25 * component['usdRate'], 2);

      const block = component['casheaBlock']();
      const lines = block.split('\n');
      expect(lines.length).toBe(4);
      expect(lines[0]).toContain('0102');
      expect(lines[1]).toBe('04141234567');
      expect(lines[2]).toBe('V28123456');
    });
  });

  it('should calculate EUR, USDT and Bs correctly', () => {
    const injector = createEnvironmentInjector([
      { provide: PLATFORM_ID, useValue: 'browser' },
    ]);

    runInInjectionContext(injector, () => {
      const component = new PagoMovilComponent();

      component['setCurrency']('EUR');
      expect(component['currency']()).toBe('EUR');
      expect(component['calculatedBs']()).toBeCloseTo(25 * component['eurRate'], 2);

      component['setCurrency']('USDT');
      expect(component['currency']()).toBe('USDT');
      expect(component['calculatedBs']()).toBeCloseTo(25 * component['usdtRate'], 2);

      component['setCurrency']('Bs');
      expect(component['currency']()).toBe('Bs');
      expect(component['calculatedBs']()).toBe(25);
    });
  });

  it('should simulate paste and cycle directory contacts', () => {
    const injector = createEnvironmentInjector([
      { provide: PLATFORM_ID, useValue: 'browser' },
    ]);

    runInInjectionContext(injector, () => {
      const component = new PagoMovilComponent();

      component['simulatePaste']();
      expect(component['bank']()).toBe('Banesco');
      expect(component['bankCode']()).toBe('0134');
      expect(component['phone']()).toBe('04129876543');
      expect(component['identity']()).toBe('V-24555666');
      expect(component['amount']()).toBe(35);
      expect(component['currency']()).toBe('USD');

      component['cycleContact']();
      expect(component['currentContactName']()).toBe('María Pérez (Hermana)');
      expect(component['bankCode']()).toBe('0134');
    });
  });
});
