import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private lenis: Lenis | null = null;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.lenis) return;

    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        autoRaf: true,
        anchors: true,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
    });
  }

  scrollTo(target: number | string | HTMLElement, options?: Parameters<Lenis['scrollTo']>[1]): void {
    this.lenis?.scrollTo(target, options);
  }

  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  destroy(): void {
    this.lenis?.destroy();
    this.lenis = null;
  }
}
