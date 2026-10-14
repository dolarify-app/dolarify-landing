import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { supportEmail } from '../../../core/data/legal.data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-glass bg-canvas py-12" role="contentinfo">
      <div class="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
        <div>
          <a routerLink="/" class="inline-flex items-center gap-2" aria-label="Dolarify">
            <img
              src="brand/logo-sin-fondo.png"
              width="32"
              height="32"
              alt=""
              class="h-8 w-auto"
              loading="lazy"
            />
          </a>
          <p class="mt-3 max-w-xs text-sm fg-secondary">
            Tasas en tiempo real para Venezuela. Convierte entre Bolívares, Dólar, Euro y USDT.
          </p>
        </div>

        <div>
          <h3 class="mb-3 text-xs font-semibold fg uppercase tracking-widest">Producto</h3>
          <ul class="space-y-2 text-sm fg-secondary">
            <li>
              <a routerLink="/download" class="transition-colors hover:fg">Descargar</a>
            </li>
            <li>
              <a href="#features" class="transition-colors hover:fg">Funciones</a>
            </li>
            <li>
              <a href="#faq" class="transition-colors hover:fg">Preguntas frecuentes</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-3 text-xs font-semibold fg uppercase tracking-widest">Legal y soporte</h3>
          <ul class="space-y-2 text-sm fg-secondary">
            <li>
              <a routerLink="/privacy" class="transition-colors hover:fg">Política de privacidad</a>
            </li>
            <li>
              <a routerLink="/terms" class="transition-colors hover:fg">Términos de servicio</a>
            </li>
            <li>
              <a
                href="https://www.bcv.org.ve"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors hover:fg"
              >
                Banco Central de Venezuela (BCV)
              </a>
            </li>
            <li>
              <a [href]="'mailto:' + email" class="transition-colors hover:fg">Soporte</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mx-auto mt-8 max-w-7xl border-t border-glass px-6 pt-6">
        <p class="text-xs leading-relaxed fg-muted">
          <span class="font-semibold fg-secondary">Aviso legal y financiero:</span>
          Dolarify es una plataforma de consulta referencial e informativa. Las cotizaciones mostradas del Dólar BCV, Euro y USDT provienen de fuentes públicas del
          <a
            href="https://www.bcv.org.ve"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gold-light underline-offset-4 hover:underline"
          >Banco Central de Venezuela (BCV)</a>
          y plataformas de intercambio de criptoactivos. Dolarify no es una entidad financiera ni bancaria, no realiza intermediación cambiaria ni comercialización de divisas, y sus estimaciones no constituyen asesoramiento financiero ni sugerencias de inversión. Verifique siempre los valores oficiales antes de realizar cualquier transacción.
        </p>
      </div>

      <div class="mx-auto mt-6 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-glass px-6 pt-6 text-xs fg-muted md:flex-row">
        <p>
          © {{ year }} Dolarify. Creado por
          <a
            href="https://dolarify.app"
            target="_blank"
            rel="noopener"
            class="font-medium text-gold-light transition-colors hover:underline"
          >
            Lyon Incode
          </a>
          . Hecho con cariño para Venezuela.
        </p>
        <p>
          Fuentes oficiales:
          <a
            href="https://www.bcv.org.ve"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gold-light transition-colors hover:underline"
          >
            BCV Oficial
          </a>
          ·
          <span class="text-purple-light">Binance P2P</span>
        </p>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  protected readonly email = supportEmail;
  protected readonly year = new Date().getFullYear();
}
