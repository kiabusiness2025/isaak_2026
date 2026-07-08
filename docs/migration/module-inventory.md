# Inventario maestro de módulos — `isaak` (legacy) → `isaak_2026`

> Consolida `current-state.md` + `reusable-modules.md` + `deprecated-modules.md` en una
> única checklist ordenada por fase, para preparar copias **mejoradas y actualizadas**
> (no copia literal — ver regla de oro en `verified-files.md`). Cada fila entra a
> `verified-files.md` con ficha propia antes de mergear su PR.
>
> Orden de ejecución: el de `TRANSFER_PLAN_2026.md` §4. No saltar fases salvo decisión
> explícita del usuario.
>
> Estado por módulo: `pendiente` (nada hecho) · `auditado` (revisado, no migrado) ·
> `migrado` (copia ya en `isaak_2026`, con ficha cerrada) · `descartado` (no se migra).
>
> Última actualización: 2026-07-08.

---

## Fase 2 — Billing y pricing

| # | Módulo | Origen (`isaak`) | Destino (`isaak_2026`) | Acoplamiento | Estado |
| - | --- | --- | --- | :---: | :---: |
| 2.1 | Tipos de tiers/features/quota | `apps/isaak/app/lib/isaak-entitlements.ts` | `packages/billing/src/entitlements.ts` | medio | **auditado** — ver hallazgo crítico abajo |
| 2.2 | Copy de precios derivado | `apps/isaak/app/lib/isaak-pricing-content.ts` | — (superseded) | bajo | descartado (ficha #2, `packages/content/src/pricing.ts` ya lo sustituye) |
| 2.3 | Puente Stripe↔entitlements | `apps/isaak/app/lib/isaak-stripe-plans.ts` | `packages/billing/src/stripe-plans.ts` | medio (`resolvePlanIdForTier` toca Prisma) | pendiente |
| 2.4 | UI de pricing sin fetch | `apps/isaak/app/components/PricingSectionV1.tsx`, `PlanDecisionTree.tsx` | ya reconstruido en `apps/web/components/pricing/*` | bajo | descartado (superseded — no portar, ya hay componentes nuevos) |
| 2.5 | Motor de cuota/gating | `apps/isaak/app/lib/isaak-quota.ts`, `isaak-turn-tier.ts`, `isaak-credits.ts`, `isaak-billing-helpers.ts`, `isaak-feature-gate.ts` | `packages/billing/src/*` (rediseño) | alto | pendiente — **rediseñar, no extraer** (ver hallazgo crítico) |

### ⚠️ Hallazgo crítico de la auditoría 2.1 (bloquea 2.1/2.3/2.5 hasta decisión)

Comparé línea a línea `isaak-entitlements.ts` (legacy) contra `packages/content/src/pricing.ts`
(ya escrito en `isaak_2026`). No son reconciliables por simple renombrado — hay dos
conflictos de producto reales, no solo de forma:

1. **Unidad de cuota distinta.** Legacy cuenta **mensajes/mes** (`monthlyMessages`: 300
   Chat / 400 Personal / 600 Profesional / 1000 Profesional Total, cada uno 1:1). El
   pricing ya escrito en `isaak_2026` cuenta **créditos IA/mes** (100 Chat / 500 Personal
   / 1.000 Profesional / 2.500 Profesional Avanzado), con consumo variable por acción (1
   crédito por mensaje simple, 5-30 por documento/informe — ver `creditsSection` en
   `pricing.ts`). Son modelos de negocio distintos, no la misma cifra con otro nombre.
2. **La etiqueta "Profesional Total" cambió de posición en la jerarquía.** En legacy,
   `profesional_total` (49€/490€) es el tier con sedes electrónicas/DEHú/certificado. En
   el pricing nuevo, ese precio y esas features de "empresa" (Impuesto de Sociedades,
   soporte prioritario) los tiene **"Profesional Avanzado"** (49€/490€ ya activo), y
   **"Profesional Total"** pasó a ser un tier nuevo, superior, con precio **sin definir**,
   que añade sedes/DEHú/certificado. Además existe ahora un **"Personal Total"** que no
   tiene ningún equivalente en legacy.

**Dato adicional para esta decisión**: `docs/product/VIABILITY_STUDY_COSTES_2026.md` §8
cuantifica con precios reales de Anthropic por qué el modelo de créditos ponderados se
alinea mejor con el coste real de IA que el de mensajes 1:1 — no decide la pregunta de
negocio por sí solo, pero es un argumento de sostenibilidad de costes a favor de mantener
el modelo de créditos ya publicado.

**Consecuencia:** no se puede portar el catálogo de valores de `isaak-entitlements.ts` —
ni siquiera adaptado — sin antes decidir explícitamente: (a) si el nuevo modelo de
negocio es "créditos ponderados" en vez de "mensajes 1:1" (impacta backend de cuota, no
solo copy), y (b) confirmar que "Profesional Total"/"Personal Total" quedan con precio
"Por definir" hasta que se fije el catálogo de Stripe. Portar solo la **forma** (tipos
`PlanTier`/`Feature`/`QuotaPolicy`, funciones `tierHasFeature`/`resolveQuotaPolicy`) es
seguro ahora; portar los **valores** no lo es hasta resolver (a) y (b). Ficha ampliada en
`verified-files.md` #1.

---

## Fase 3 — Componentes demo (bajo acoplamiento, reutilizables casi tal cual)

| # | Módulo | Origen | Destino | Estado |
| - | --- | --- | --- | :---: |
| 3.1 | `IsaakHeroMock.tsx` | `apps/isaak/app/components/` | `apps/web/components/demo/` | auditado — autocontenido salvo la ruta del avatar (`/brand/isaak-avatar-2.png`); portar apuntando a `robot/isaak-bust-idle.png` (ya existe en `apps/web/public`) |
| 3.2 | `IsaakHeroTour.tsx` | ídem | `apps/web/components/demo/IsaakHeroTour.tsx` | **migrado** — 100% autocontenido (datos hardcodeados, sin `fetch`), repaletizado a tokens de marca (`isaak-blue`/`chocolate` en vez de `#2361d8`/`#011c67`), `typecheck`+`lint`+`build` en verde. Ficha #3 en `verified-files.md`. Sin wiring a una página todavía — es una decisión de diseño aparte (dónde y con qué copy alrededor), no forma parte de "migrar el componente" |
| 3.3 | `IsaakOmniChatWidget.tsx` | ídem | `apps/web/components/demo/` | auditado — **bloqueado**: su CTA principal apunta a `/signup`, que no existe todavía en `isaak_2026` (auth es Fase 5). `WORKSPACE_PREFIXES` también asume rutas de `apps/app` que hoy es solo esqueleto. Portar cuando exista un destino real de alta |
| 3.4 | `WhatsAppButton.tsx` | ídem | — | **descartado** — el propio legacy ya lo marca superseded por `IsaakOmniChatWidget` (ver comentario de cabecera de ese archivo); no migrar por separado |
| 3.4b | `TalkChannels.tsx` | ídem | `apps/web/components/demo/` | auditado — autocontenido salvo `signupHref` (prop, no import) y depende de `isaak-contact-links` (ya migrado, ver 3.9). Mismo bloqueo que 3.3: sin ruta de alta real todavía, el `signupHref` no tiene destino válido |
| 3.5 | `FaqAccordion.tsx` | ídem | — | **descartado, confirmado** — `apps/web` ya tiene `components/sections/FaqSection.tsx` y `components/pricing/PricingFaq.tsx` con contenido propio de `isaak_2026`; portar esto lo duplicaría |
| 3.6 | `ComparisonTable.tsx` | ídem | — | **descartado, confirmado** — `apps/web` ya tiene `components/pricing/PricingComparisonTable.tsx` sobre el modelo de datos de `pricing.ts` (`comparisonTables`), con una forma de datos distinta (por plan, no por categoría booleana); no aporta nada nuevo |
| 3.7 | `IsaakMarkdown.tsx` | `apps/isaak/app/(workspace)/components/` | `apps/web/components/chat/` (futuro, cuando exista chat real) | pendiente, no urgente |
| 3.9 | `isaak-contact-links.ts` | `apps/isaak/app/lib/isaak-contact-links.ts` | `packages/content/src/contact-links.ts` | **migrado** — constantes puras (WhatsApp/Telegram con override por env var), sin cambios de lógica. Ficha #4 en `verified-files.md` |

No migrar aún de esta fase: `IsaakDemoChat.tsx`, `ActionPreparedPanel.tsx`,
`ConfirmationMoment.tsx` ya existen en `isaak_2026` como construcciones nuevas — esta
fase es sobre *añadir* piezas que faltan, no reemplazar lo que ya funciona.

---

## Fase 4 — Integraciones

| # | Módulo | Origen | Destino | Acoplamiento | Estado |
| - | --- | --- | --- | :---: | :---: |
| 4.1 | Clientes ligeros genéricos | `packages/integrations/{stripe,resend,vercel,github}.ts` | `packages/integrations/src/*` | bajo | pendiente |
| 4.2 | Open Banking | `packages/integrations/{saltedge,enable-banking}.ts` | `packages/integrations/src/banking/*` | bajo | pendiente — **no** portar `gocardless-bank-data.ts` (sunset, ver `deprecated-modules.md` §5) |
| 4.3 | Company data / KYC | `packages/integrations/{company-prefill*,registradores-client,fuzzy-search}.ts` | `packages/integrations/src/company-data/*` | bajo-medio | pendiente |
| 4.4 | Holded (API probadas) | `packages/integrations/holded/*` (8 archivos) | `packages/integrations/src/connectors/holded/*` | alto (por diseño) | pendiente — **renombrar tipos a `Connector*` desde el primer commit**, nunca `Holded*` (ver Fase 4 del plan) |
| 4.5 | Telemetría de uso | `packages/integrations/usage-events.ts` | `packages/analytics/src/*` | medio | pendiente |

No migrar: código de Holded como app/dashboard propio (`apps/holded`, `apps/holded-mcp`)
— Holded es conector, no producto final, en `isaak_2026`.

---

## Fase 5 — Auth

| # | Módulo | Origen | Destino | Estado |
| - | --- | --- | --- | :---: |
| 5.1 | `packages/auth` completo (10 archivos, referencia de diseño) | `isaak` | `packages/auth/src/*` (reescritura, no copia) | pendiente — leer entero primero, portar solo fragmentos con ficha |

---

## Fase 6 — DB / schema

| # | Módulo | Origen | Destino | Estado |
| - | --- | --- | --- | :---: |
| 6.1 | `apps/app/prisma/schema.prisma` (424 líneas) | `isaak` | `packages/db/src/schema.prisma` | pendiente — auditar modelo a modelo antes de mover una línea; excluir el discriminador `gcbd` desde el nacimiento del nuevo schema |

---

## Fuera de alcance (confirmado, no re-litigar)

`apps/client` (congelado), dashboards duplicados (`apps/admin/app/dashboard/admin/*`,
`apps/app/app/(dashboard)/*`), pipeline de vídeo Sora/Metricool
(`apps/isaak-video-generator`), `packages/{ai,events,audit}` (pendiente decisión
explícita del usuario, no añadir esqueleto) — ver `deprecated-modules.md` y
`TRANSFER_PLAN_2026.md` §2/§6 para el detalle ya cerrado.
