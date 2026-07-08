# packages/brand/assets — Inventario

> Fuente original: `apps/isaak_retro_vibe/isaak-retro-home/assets` en el repo `kiabusiness2025/isaak`
> (equivalente a `D:\isaak-main\isaak-main\apps\isaak_retro_vibe\isaak-retro-home\assets`).
> Inventario completo y clasificación original en ese repo:
> `docs/brand/ISAAK_RETRO_ASSET_INVENTORY.md`.
>
> Este documento cubre solo lo que vive en **este** repo (`isaak_2026`), ya organizado por
> categoría según `docs/brand/ISAAK_RETRO_ASSET_PACK_PLAN_2026.md` (repo `isaak`).
>
> 31 de los 33 archivos fuente están migrados aquí. Los 2 restantes son duplicados/legacy
> y no se migran (ver sección "Excluidos").
>
> Última actualización: 2026-07-08.

---

## logos/ — wordmark

| Archivo                        | Estado       | Uso                                                                      |
| ------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `isaak-logo-dark.png`            | **approved** | Fuente del wordmark oscuro. Versión optimizada servida en `apps/web/public/brand/isaak-wordmark-dark.png` |
| `isaak-logo-light.png`           | **approved** | Fuente del wordmark claro (fondo oscuro). Versión optimizada en `apps/web/public/brand/isaak-wordmark-light.png` |
| `isaak-logo-dark-cream-bg.png`   | candidate    | Wordmark con fondo crema sólido — documentos/presentaciones, no web (usar la versión transparente) |

## icons/ — isotipo, favicon, app icon

| Archivo                       | Estado       | Uso                                                                 |
| ------------------------------ | ------------ | ---------------------------------------------------------------------- |
| `isaak-isotype.png`            | **approved** | Isotipo "i" transparente — candidato principal a favicon/avatar/sello  |
| `isaak-isotype-light.png`      | candidate    | Isotipo sobre fondo oscuro/chocolate                                   |
| `isaak-app-icon-navy-square.png` | candidate  | Fondo azul marino sólido — base para generar app icon 512/192/32       |
| `isaak-isotype-circle.png`     | candidate    | Isotipo en insignia circular con doble borde cobre — favicon circular  |

Nota: los PNG/ICO realmente servidos en `apps/web/app/icon.png`, `apple-icon.png` y
`apps/web/public/brand/{favicon-32,isaak-icon-192,isaak-icon-512}.png` son generados
programáticamente (Pillow) a partir del isotipo, no una copia 1:1 de estos archivos.

## robot/ — personaje Isaak

| Archivo                                     | Estado       | Uso                                                                                     |
| --------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `isaak-full-idle.png`                         | **approved** | Cuerpo entero, de pie con libro — hero, `state="idle"/"listening"`, `variant="full"`        |
| `isaak-full-thinking.png`                     | **approved** | Cuerpo entero, pensativo — hero, `state="preparing"/"connecting"`, `variant="full"`         |
| `isaak-full-confirmed.png`                    | **approved** | Cuerpo entero, saludando — hero, `state="confirmed"`, `variant="full"`                      |
| `isaak-bust-idle.png`                         | **approved** | Retrato ovalado — avatar circular por defecto (`variant="circle"`, estado idle/listening)   |
| `isaak-bust-thinking.png`                     | **approved** | Busto recortado del pensativo — avatar circular, estado preparing/connecting                |
| `isaak-bust-confirmed.png`                    | **approved** | Busto con libro — avatar circular, estado confirmed                                        |
| `isaak-character-pointing-candidate.png`      | candidate    | Cuerpo entero, señalando/apuntando — reservado para onboarding/tour guiado, sin componente aún |
| `isaak-character-daily-admin-candidate.png`   | candidate    | Cuerpo entero, con móvil y portapapeles — reservado para sección "gestión diaria"/demo      |
| `isaak-character-shrug-candidate.png`         | candidate    | Cuerpo entero, brazos abiertos/encogido de hombros — reservado para estado vacío "todo en orden" |

Las 6 poses `approved` están servidas en `apps/web/public/robot/` y mapeadas en
`packages/brand/src/assets.ts` (`brandAssets.robot.{full,bust}.{idle,thinking,confirmed}`).
Las 3 `candidate` son fuente sin procesar (sin recorte/optimización web) — no tienen
todavía una pose ni componente asignado.

## backgrounds/ — mockups de hero/dashboard

Ninguno de estos backgrounds está wireado en ningún componente todavía — el hero actual
(`RetroHeroScene`, `FloatingCards`, `OrbitalLines`) es 100% CSS/Framer Motion, sin
imágenes de fondo. Se guardan como referencia visual para iterar el diseño del hero.

| Archivo                                          | Estado    | Notas                                                                 |
| --------------------------------------------------- | --------- | -------------------------------------------------------------------------- |
| `isaak-bg-fondo-5-tagline-cta.png`                   | candidate | **Mejor candidato de la serie** — único con tagline "Menos caos. Más claridad." y CTA "isaak.app" ya integrados |
| `isaak-bg-fondo-1.png`                               | candidate | Factura, recordatorio, propuesta                                           |
| `isaak-bg-fondo-2.png`                               | candidate | Factura, recordatorio, impuestos, insights                                 |
| `isaak-bg-fondo-3.png`                               | candidate | Notas, calendario, archivo, panel, resumen, tareas, próximo paso           |
| `isaak-bg-fondo-4.png`                               | candidate | Columnas Personal / Profesional                                            |
| `isaak-bg-hero-mockup-en-cards-1.png`                | candidate | En inglés — adaptar copy a ES antes de usar                                |
| `isaak-bg-hero-mockup-en-cards-2.png`                | candidate | En inglés, variante más densa                                              |
| `isaak-bg-hero-mockup-en-cards-3.png`                | candidate | En inglés                                                                  |
| `isaak-bg-hero-mockup-en-personal-professional.png`  | candidate | En inglés, columnas Personal/Professional                                  |

## reference/ — hojas de marca y mockup de página (no recortables)

No son assets finales — mezclan demasiados elementos en un único PNG. Sirven de spec
visual para vectorizar/normalizar el logo real y de referencia de layout.

| Archivo                                          | Estado    | Contenido                                                                  |
| --------------------------------------------------- | --------- | --------------------------------------------------------------------------- |
| `isaak-brand-mini-manual-reference.png`              | candidate | Mini manual de marca completo — logo, paleta, tipografía, espaciado, usos correctos/incorrectos, iconografía. El más completo, útil como spec |
| `isaak-brand-assets-pack-reference.png`              | candidate | Pack de activos: logo claro/oscuro, isotipo, app icon, favicon, avatar (cara/medio cuerpo/cuerpo entero) |
| `isaak-brand-avatar-board-reference.png`             | candidate | Board "Avatar — Isaak": wordmark + avatar (portrait/half body/full body) + app icon + isotipo + paleta + tipografía |
| `isaak-brand-compact-board-reference.png`            | candidate | Board compacto: wordmark + avatar circular + variantes reducidas           |
| `isaak-brand-executive-presentation-reference.png`   | candidate | "Nueva identidad visual": wordmark, paleta, tagline, robot en escritorio, aplicaciones |
| `isaak-page-mockup-full-landing-reference.png`       | candidate | Mockup de landing completa (nav, hero, problema/solución, pricing, footer) — referencia de layout, no un asset recortable |

## Excluidos (legacy/duplicados, no migrados)

- Wordmark oscuro duplicado (`17_33_12 (1)` en la carpeta origen) — mismo wordmark que
  `isaak-logo-dark.png` con distinto recorte/hash; se descarta para evitar dos "logo dark"
  divergentes.
- Fondo con colores lavados (`20_47_43 (1)` en la carpeta origen) — calidad visual inferior
  al resto de la serie "Fondo".
- Pose de personaje "cuerpo entero con libro" duplicada (`19_58_25 (1)` en la carpeta
  origen) — mismo concepto que `isaak-full-idle.png`, ya cubierto.
