---
target: src/app/pages/home
total_score: 27.5
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 2
target_identity: "file:/Users/leonardohernandez/Desktop/Trabajo/Lyon incode/dolarify/dolarify-landing/src/app/pages/home"
timestamp: 2026-10-16T16-39-59Z
slug: src-app-pages-home
---
Method: dual-agent (A: b430bc6e-5e31-4fb8-9bd0-8e3b61ee9161 · B: 420f222a-54a0-4865-a37a-a1480cc6c533)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 3.0 | Buen feedback en botones copiados y simulador; el ticker de tasas en el hero cicla automáticamente sin controles de pausa. |
| 2 | Match Between System & Real World | 4.0 | Vocabulario y convenciones financieras venezolanas impecables (Pago Móvil, Cédula/RIF, Cashea, BCV, Binance P2P, códigos bancarios). |
| 3 | User Control and Freedom | 2.0 | El carrusel carece de controles prev/next en escritorio; no hay pausa en el ticker del hero; FAQ colapsa/expande bien. |
| 4 | Consistency and Standards | 2.5 | Bento cards muestran `cursor-pointer` sin acción interactiva (falsa asequibilidad); disparidad entre showcase iOS y Android. |
| 5 | Error Prevention | 3.5 | El simulador de Pago Móvil previene inputs inválidos, sanitiza caracteres no numéricos y limpia formato. |
| 6 | Recognition Rather Than Recall | 3.5 | Tabla de conversión de $1 a $100 USD y contactos de muestra eliminan la carga mental de memorizar tasas. |
| 7 | Flexibility and Efficiency of Use | n/a | Superficie de modo Persuade (landing page informativa y de conversión rápida). |
| 8 | Aesthetic and Minimalist Design | 2.5 | Estética dark-glass lograda, pero sobrecargada con 14 animaciones shine simultáneas en Bento y gradientes AI en texto. |
| 9 | Error Recovery | 3.0 | Página de descarga ofrece fallback explícito si la tienda no abre automáticamente. |
| 10 | Help and Documentation | 3.5 | FAQ responde objeciones críticas (seguridad, cero acceso bancario, por qué es gratis) y provee soporte directo. |
| **Total** | | **27.5 / 36.0** | **Good (76.4%)** |

---

## Design Specificity Verdict

**Evaluación Directiva (LLM)**: La landing page tiene una especificidad cultural y funcional sobresaliente: no es un clon genérico de fintech ni una plantilla de cripto abstracta. Resuelve con precisión el ecosistema tri-monetario venezolano (VES, BCV, USDT) y la fricción cotidiana de copiar datos desordenados de WhatsApp para el Pago Móvil. Sin embargo, sufre de filtraciones de "developer flex" (tarjetas Bento presumiendo "Glassmorphism premium", badges de versión de software `v3.0.0` y `v1.6.2` como si fuera un changelog de GitHub, y dos secciones separadas de screenshots para iOS y Android).

**Escaneo Determinista (Detector CLI)**:
- `2 advertencias de slop en src/app`: `gradient-text` detectado en el H1 de Hero (`hero.component.ts:26`) y en el CTA final (`cta-final.component.ts:17`). El texto con gradiente multicolor perjudica la legibilidad, reduce el contraste en modo claro por debajo de 3:1 y le da aspecto de plantilla generada por IA.
- `1 advertencia en src/`: `overused-font` (Space Grotesk en `styles.css:1`), fuente ampliamente saturada en landings Web3.
- `Hallazgo crítico descubierto`: `MeshBackgroundComponent` envuelve `<ng-content>` dentro de un contenedor con `aria-hidden="true"`, ocultando el H1, propuesta de valor y botones de descarga de los lectores de pantalla y bots de accesibilidad.

---

## Overall Impression

Dolarify cuenta con una propuesta de valor brutalmente clara para Venezuela y un sistema visual dark-mode muy bien resuelto. Sin embargo, la experiencia está lastrada por un bug crítico de accesibilidad en el background, una navegación móvil huérfana de llamada a la acción y un exceso de ruido cosmético (14 bordes animados girando a la vez en el Bento y gradientes en texto).

---

## What's Working

1. **El preparador de Pago Móvil**: La interacción del simulador en vivo, el botón "Pegar datos", la conversión automática y el bloque de 4 líneas estilo Cashea demuestran valor inmediato en segundos.
2. **Arquitectura de confianza local**: La aclaración explícita de "100% local, sin registro, sin claves" y el enlace al BCV desmantelan el escepticismo natural del usuario.
3. **Consistencia de tokens visuales**: Paleta equilibrada en modo oscuro con fondos de baja fatiga (`#080b16`), superficies elevadas con glassmorphism y tipografía DM Sans legible para cifras numéricas.

---

## Priority Issues

- **[P0] Invisibilidad en árbol de accesibilidad (Screen Readers)**
  - **Qué**: `MeshBackgroundComponent` aplica `aria-hidden="true"` al contenedor padre de `<ng-content>`.
  - **Por qué importa**: Oculta completamente el Hero (H1 principal, propuesta de valor y botones de descarga) y el CTA final para lectores de pantalla y motores que auditan el DOM de accesibilidad.
  - **Fix**: Remover `aria-hidden="true"` del contenedor de proyección y aislarlo únicamente en los efectos decorativos de fondo.
  - **Comando sugerido**: `/impeccable audit`

- **[P1] Vacío de conversión y navegación en móviles (< 768px)**
  - **Qué**: `NavbarComponent` oculta todos los enlaces y el botón "Descargar" en pantallas pequeñas sin ofrecer un menú hamburguesa o botón alternativo.
  - **Por qué importa**: Más del 85% del tráfico en Venezuela entra desde teléfonos inteligentes; los usuarios móviles pierden el CTA pegajoso de descarga.
  - **Fix**: Mantener visible un botón compacto "Descargar" en el navbar móvil junto al toggle de tema.
  - **Comando sugerido**: `/impeccable adapt`

- **[P1] Gradientes decorativos en texto (Slop AI tell)**
  - **Qué**: Clases `bg-gradient-to-r ... bg-clip-text text-transparent` en el H1 de Hero y en el heading de CtaFinal.
  - **Por qué importa**: Degrada el contraste en modo claro (cae a ~2.5:1), rompe el ritmo de lectura y activa alertas de diseño genérico.
  - **Fix**: Usar color sólido `--color-fg` con énfasis de color sólido de acento (`text-gold-light`).
  - **Comando sugerido**: `/impeccable polish`

- **[P2] Sobrecarga sensorial y falsas asequibilidades en Bento Grid**
  - **Qué**: 14 tarjetas con bordes de gradiente girando continuamente (`om-shine-border`), con `cursor-pointer` pero sin acción al hacer clic, y textos de "Glassmorphism premium" o versiones `v1.6.2`.
  - **Por qué importa**: Fatiga visual, distracción cognitiva y frustración cuando el usuario hace clic y nada responde.
  - **Fix**: Reducir a 6–8 tarjetas esenciales de valor de usuario, limitar los shine borders a las 2 principales, remover `cursor-pointer` y eliminar la jerga técnica.
  - **Comando sugerido**: `/impeccable distill`

- **[P2] Previsualización del Hero con datos estáticos y disclaimer confuso**
  - **Qué**: La "Vista previa en vivo" del hero parece una calculadora pero no permite interacción, y el aviso "Tasas de muestra" siembra dudas sobre si la app funciona.
  - **Por qué importa**: Los usuarios intentan escribir en ella y creen que el sitio no responde o que las tasas mostradas son ficticias.
  - **Fix**: Conectar la tarjeta a un conversor interactivo ligero o rediseñarla puramente como ticker de mercado en vivo.
  - **Comando sugerido**: `/impeccable clarify`

- **[P3] Fragmentación en el Showcase de dispositivos**
  - **Qué**: Dos secciones consecutivas: carrusel para iOS y cuadrícula estática para Android.
  - **Por qué importa**: Alarga la página innecesariamente y segrega a los usuarios de Android (mayoría en el mercado venezolano).
  - **Fix**: Unificar en una sola sección con selector de plataforma iOS / Android.
  - **Comando sugerido**: `/impeccable layout`

---

## Persona Red Flags

- **Jordan (Primerizo/Desconfiado)**: Intenta tocar los números de la tarjeta del Hero pensando que es una calculadora; al no reaccionar y leer "Tasas de muestra", duda si la app está desactualizada.
- **Riley (Tester Técnico y A11y)**: Abre VoiceOver y descubre que el Hero principal y el título de la página no existen en el árbol de accesibilidad debido al `aria-hidden` del background.
- **Casey (Usuario Móvil en la Calle)**: Abre la página en su teléfono con una mano y ve que en el encabezado no hay botón de descarga; tiene que hacer scroll para encontrar el primer link de la tienda.

---

## Minor Observations

- La señal `scrolled` en `NavbarComponent` se calcula en cada evento de scroll pero nunca se utiliza en la plantilla.
- El carrusel de iOS depende exclusivamente de gestos táctiles o botones de punto pequeños; carece de flechas prev/next para usuarios de mouse.
- El token `--color-fg-muted: #4a4e69` en fondos oscuros tiene un contraste de 2.85:1, por debajo del estándar 4.5:1.

---

## Questions to Consider

1. ¿Por qué no convertir el preview del Hero en una calculadora funcional en tiempo real para que la landing actúe como herramienta diaria y embudo natural hacia la app?
2. ¿Por qué relegar Android a un anexo secundario cuando representa más del 80% del mercado objetivo en Venezuela?
3. ¿Debería el preparador de Pago Móvil subir más cerca del Hero al ser el diferenciador más potente frente a cualquier otra app de tasas?
