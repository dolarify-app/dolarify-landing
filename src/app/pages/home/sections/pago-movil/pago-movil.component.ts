import { ChangeDetectionStrategy, Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxShineBorderComponent } from '@omnedia/ngx-shine-border';
import { liveRates } from '../../../../core/data/rates.data';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

interface ContactPreset {
  name: string;
  bank: string;
  bankCode: string;
  phone: string;
  identity: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'USDT' | 'Bs';
}

const PRESET_CONTACTS: ContactPreset[] = [
  {
    name: 'Abasto La Esquina',
    bank: 'Banco de Venezuela',
    bankCode: '0102',
    phone: '04141234567',
    identity: 'J-314567890',
    amount: 15.5,
    currency: 'USD',
  },
  {
    name: 'María Pérez (Hermana)',
    bank: 'Banesco',
    bankCode: '0134',
    phone: '04129876543',
    identity: 'V-24555666',
    amount: 25,
    currency: 'USD',
  },
  {
    name: 'Carlos Ruiz (Servicio)',
    bank: 'Mercantil',
    bankCode: '0105',
    phone: '04245551234',
    identity: 'V-19888777',
    amount: 40,
    currency: 'USD',
  },
];

@Component({
  selector: 'app-pago-movil',
  imports: [NgxShineBorderComponent, SectionHeadingComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section relative overflow-hidden" id="pago-movil" aria-labelledby="pago-movil-heading">
      <!-- Glow decoration -->
      <div
        class="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-[140px]"
        aria-hidden="true"
      ></div>

      <div class="mx-auto max-w-7xl px-6">
        <div appRevealOnScroll>
          <app-section-heading
            eyebrow="Nuevo en Dolarify"
            title="Prepara tus Pagos Móviles en segundos"
            subtitle="Pega datos informales de WhatsApp, convierte montos en divisas a Bolívares con tasa en vivo y genera el bloque listo para pagar en tu banco."
          />
        </div>

        <div class="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <!-- Columna Izquierda: Simulador Interactivo de la Interfaz -->
          <div appRevealOnScroll [delay]="100" class="lg:col-span-6">
            <om-shine-border
              [gradientColorStart]="'#8b5cf6'"
              [gradientColorMiddle]="'#f59e0b'"
              [gradientColorEnd]="'#34d399'"
              [borderRadius]="'1.25rem'"
              [animationDuration]="'14s'"
              class="block"
            >
              <div class="glass relative rounded-[1.25rem] p-5 sm:p-6 md:p-8">
                <!-- Header del Simulador -->
                <div class="flex items-center justify-between border-b border-glass pb-4">
                  <div class="flex items-center gap-2.5">
                    <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple/20 text-purple-light">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </span>
                    <div>
                      <span class="font-display text-sm font-bold fg">Dolarify · Pago Móvil</span>
                      <p class="text-[11px] fg-muted">Simulador interactivo</p>
                    </div>
                  </div>

                  <span class="inline-flex items-center gap-1.5 rounded-full border border-glass bg-glass px-2.5 py-1 text-[11px] font-medium text-gold-light">
                    <span class="h-1.5 w-1.5 rounded-full bg-success animate-pulse" aria-hidden="true"></span>
                    1 USD = {{ usdRate.toFixed(2) }} Bs (BCV)
                  </span>
                </div>

                <!-- Barra de Acciones Rápidas -->
                <div class="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    (click)="simulatePaste()"
                    class="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-glass bg-surface px-3 py-1.5 text-xs font-semibold text-purple-light transition-all hover:bg-surface-hover hover:scale-[1.02] active:scale-[0.98]"
                    aria-label="Simular pegar datos de WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                    </svg>
                    Pegar datos
                  </button>

                  <button
                    type="button"
                    (click)="cycleContact()"
                    class="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-glass bg-surface px-3 py-1.5 text-xs font-semibold fg-secondary transition-all hover:bg-surface-hover hover:fg hover:scale-[1.02] active:scale-[0.98]"
                    aria-label="Cargar contacto del directorio"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Directorio ({{ currentContactName() }})
                  </button>

                  @if (toastMessage()) {
                    <span class="inline-flex items-center text-xs font-medium text-success animate-fade-in" role="status">
                      ✓ {{ toastMessage() }}
                    </span>
                  }
                </div>

                <!-- Formulario Simulador -->
                <div class="mt-5 space-y-3">
                  <!-- Banco -->
                  <div>
                    <label for="bank-input" class="block text-xs font-medium fg-muted">Banco</label>
                    <input
                      id="bank-input"
                      type="text"
                      [value]="bankDisplay()"
                      readonly
                      class="mt-1 w-full rounded-xl border border-glass bg-surface/70 px-3.5 py-2.5 text-sm font-medium fg focus:outline-none"
                    />
                  </div>

                  <!-- Teléfono y Cédula en 2 columnas -->
                  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label for="phone-input" class="block text-xs font-medium fg-muted">Teléfono</label>
                      <input
                        id="phone-input"
                        type="text"
                        [value]="phone()"
                        readonly
                        class="mt-1 w-full rounded-xl border border-glass bg-surface/70 px-3.5 py-2.5 text-sm font-medium fg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label for="id-input" class="block text-xs font-medium fg-muted">Cédula o RIF</label>
                      <input
                        id="id-input"
                        type="text"
                        [value]="identity()"
                        readonly
                        class="mt-1 w-full rounded-xl border border-glass bg-surface/70 px-3.5 py-2.5 text-sm font-medium fg focus:outline-none"
                      />
                    </div>
                  </div>

                  <!-- Monto con Selector de Moneda -->
                  <div>
                    <!-- Selector de Moneda -->
                    <div class="flex items-center justify-between">
                      <label for="amount-input" class="text-xs font-medium fg-muted">Monto</label>
                      <!-- Segmentos de Moneda -->
                      <div class="flex rounded-lg border border-glass bg-surface p-0.5" role="tablist" aria-label="Seleccionar moneda de origen">
                        @for (cur of currencies; track cur) {
                          <button
                            type="button"
                            role="tab"
                            [attr.aria-selected]="currency() === cur"
                            (click)="setCurrency(cur)"
                            class="cursor-pointer rounded-md px-2 py-0.5 text-xs font-semibold transition-all"
                            [class.bg-gold]="currency() === cur && (cur === 'USD' || cur === 'Bs')"
                            [class.text-slate-950]="currency() === cur && (cur === 'USD' || cur === 'Bs')"
                            [class.bg-purple]="currency() === cur && (cur === 'EUR' || cur === 'USDT')"
                            [class.text-white]="currency() === cur && (cur === 'EUR' || cur === 'USDT')"
                            [class.fg-secondary]="currency() !== cur"
                          >
                            {{ cur }}
                          </button>
                        }
                      </div>
                    </div>

                    <div class="relative mt-1">
                      <input
                        id="amount-input"
                        type="number"
                        min="1"
                        step="0.5"
                        [value]="amount()"
                        (input)="onAmountInput($event)"
                        class="w-full rounded-xl border border-glass bg-surface/70 px-3.5 py-2.5 pr-14 font-display text-base font-bold fg focus:border-glass-active focus:outline-none"
                        aria-label="Monto a convertir"
                      />
                      <span class="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-bold fg-muted">
                        {{ currency() }}
                      </span>
                    </div>
                  </div>

                  <!-- Cálculo del Total a Pagar en Bolívares -->
                  <div class="rounded-xl border border-glass-active bg-surface/90 p-3.5">
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="text-xs font-medium fg-secondary">Total exacto a pagar:</span>
                        <p class="font-display text-2xl font-bold tracking-tight text-gold-light glow-text-gold sm:text-3xl">
                          {{ formattedBs() }} <span class="text-sm font-normal fg-secondary">Bs</span>
                        </p>
                      </div>
                      <span class="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold-light">
                        100% Automático
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Bloque Cashea / Formato 4 Líneas Listo para Copiar -->
                <div class="mt-5 rounded-xl border border-glass bg-canvas/70 p-4">
                  <div class="flex items-center justify-between pb-2">
                    <span class="text-xs font-semibold uppercase tracking-wider fg-muted">
                      Bloque para Banca Móvil (4 líneas)
                    </span>
                    <button
                      type="button"
                      (click)="copyBlock()"
                      class="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all"
                      [class.bg-success]="copied()"
                      [class.text-slate-950]="copied()"
                      [class.bg-glass]="!copied()"
                      [class.fg]="!copied()"
                      [class.hover:bg-glass-hover]="!copied()"
                      aria-label="Copiar bloque de texto de pago móvil"
                    >
                      @if (copied()) {
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        ¡Copiado!
                      } @else {
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                        </svg>
                        Copiar bloque
                      }
                    </button>
                  </div>
                  <pre class="font-mono text-xs leading-relaxed fg-secondary select-all whitespace-pre-wrap">{{ casheaBlock() }}</pre>
                </div>
              </div>
            </om-shine-border>
          </div>

          <!-- Columna Derecha: Beneficios y Pilares de la Función -->
          <div appRevealOnScroll [delay]="200" class="flex flex-col justify-center space-y-4 lg:col-span-6">
            <!-- Pilar 1: Pegado Inteligente -->
            <article class="glass rounded-2xl p-5 sm:p-6 transition-transform hover:scale-[1.01]">
              <div class="flex items-start gap-4">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-light text-slate-950 glow-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                    <path d="m9 14 2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-display text-lg font-bold fg">Pegado inteligente de portapapeles</h3>
                  <p class="mt-1 text-sm leading-relaxed fg-secondary">
                    Copia cualquier mensaje desordenado de WhatsApp o Telegram. Al tocar <strong>Pegar datos</strong>, Dolarify detecta y separa automáticamente el banco, teléfono, cédula y monto sin que tengas que tipear nada.
                  </p>
                </div>
              </div>
            </article>

            <!-- Pilar 2: Conversión Multimoneda -->
            <article class="glass rounded-2xl p-5 sm:p-6 transition-transform hover:scale-[1.01]">
              <div class="flex items-start gap-4">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-light text-slate-950 glow-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                    <path d="M7 6h1v4" />
                    <path d="m16.71 13.88.7.71-2.82 2.82" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-display text-lg font-bold fg">Cotiza en divisas, paga en Bolívares</h3>
                  <p class="mt-1 text-sm leading-relaxed fg-secondary">
                    ¿Te cobran en dólares o USDT? Escribe el valor en la moneda que quieras y la app calcula de inmediato el monto exacto en Bolívares a la tasa oficial del BCV o Binance P2P.
                  </p>
                </div>
              </div>
            </article>

            <!-- Pilar 3: Directorio Offline -->
            <article class="glass rounded-2xl p-5 sm:p-6 transition-transform hover:scale-[1.01]">
              <div class="flex items-start gap-4">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-light text-slate-950 glow-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-display text-lg font-bold fg">Directorio de contactos sin conexión</h3>
                  <p class="mt-1 text-sm leading-relaxed fg-secondary">
                    Guarda los datos de tus comercios, amigos y familiares frecuentes. Selecciónalos en un toque y úsalo incluso cuando no tengas cobertura de internet.
                  </p>
                </div>
              </div>
            </article>

            <!-- Pilar 4: Seguridad y Privacidad 100% Local -->
            <article class="glass rounded-2xl p-5 sm:p-6 transition-transform hover:scale-[1.01]">
              <div class="flex items-start gap-4">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-light text-slate-950 glow-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-display text-lg font-bold fg">100% Seguro y Privado</h3>
                  <p class="mt-1 text-sm leading-relaxed fg-secondary">
                    Dolarify no es un banco ni toca tus credenciales. Funciona como un asistente local que organiza los datos en formato estándar para que los pegues seguro en tu banco.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class PagoMovilComponent {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly usdRate = liveRates.find((r) => r.code === 'USD')?.value ?? 130.45;
  protected readonly eurRate = liveRates.find((r) => r.code === 'EUR')?.value ?? 142.18;
  protected readonly usdtRate = liveRates.find((r) => r.code === 'USDT')?.value ?? 138.92;

  protected readonly currencies: Array<'USD' | 'EUR' | 'USDT' | 'Bs'> = ['USD', 'EUR', 'USDT', 'Bs'];
  protected readonly currency = signal<'USD' | 'EUR' | 'USDT' | 'Bs'>('USD');
  protected readonly amount = signal<number>(25);

  protected readonly bank = signal<string>('Banco de Venezuela');
  protected readonly bankCode = signal<string>('0102');
  protected readonly phone = signal<string>('04141234567');
  protected readonly identity = signal<string>('V-28123456');

  protected readonly currentContactIndex = signal<number>(0);
  protected readonly currentContactName = signal<string>('María Pérez');
  protected readonly toastMessage = signal<string | null>(null);
  protected readonly copied = signal<boolean>(false);

  protected readonly bankDisplay = computed(() => `${this.bankCode()} - ${this.bank()}`);

  protected readonly calculatedBs = computed(() => {
    const cur = this.currency();
    const amt = this.amount();
    if (cur === 'USD') return amt * this.usdRate;
    if (cur === 'EUR') return amt * this.eurRate;
    if (cur === 'USDT') return amt * this.usdtRate;
    return amt;
  });

  protected readonly formattedBs = computed(() => {
    return this.calculatedBs().toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  });

  protected readonly casheaBlock = computed(() => {
    const cleanPhone = this.phone().replace(/\D/g, '');
    const cleanId = this.identity().replace(/[^a-zA-Z0-9]/g, '');
    const roundedBs = this.calculatedBs().toFixed(2);
    return `${this.bank()} (${this.bankCode()})\n${cleanPhone}\n${cleanId}\n${roundedBs}`;
  });

  protected setCurrency(c: 'USD' | 'EUR' | 'USDT' | 'Bs'): void {
    this.currency.set(c);
  }

  protected onAmountInput(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    this.amount.set(isNaN(val) || val <= 0 ? 0 : val);
  }

  protected simulatePaste(): void {
    this.bank.set('Banesco');
    this.bankCode.set('0134');
    this.phone.set('04129876543');
    this.identity.set('V-24555666');
    this.amount.set(35);
    this.currency.set('USD');
    this.showToast('¡Datos detectados y organizados!');
  }

  protected cycleContact(): void {
    const nextIdx = (this.currentContactIndex() + 1) % PRESET_CONTACTS.length;
    this.currentContactIndex.set(nextIdx);
    const contact = PRESET_CONTACTS[nextIdx];
    this.currentContactName.set(contact.name);
    this.bank.set(contact.bank);
    this.bankCode.set(contact.bankCode);
    this.phone.set(contact.phone);
    this.identity.set(contact.identity);
    this.amount.set(contact.amount);
    this.currency.set(contact.currency);
    this.showToast(`Contacto cargado: ${contact.name}`);
  }

  protected async copyBlock(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      await navigator.clipboard.writeText(this.casheaBlock());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Fallback
    }
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 2500);
  }
}
