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
| 3.1 | `IsaakHeroMock.tsx` | `apps/isaak/app/components/` | `apps/web/components/demo/` | pendiente |
| 3.2 | `IsaakHeroTour.tsx` | ídem | ídem | pendiente |
| 3.3 | `IsaakOmniChatWidget.tsx` | ídem | ídem | pendiente |
| 3.4 | `WhatsAppButton.tsx`, `TalkChannels.tsx` | ídem | ídem | pendiente |
| 3.5 | `FaqAccordion.tsx` | ídem | ya existe equivalente propio en `apps/web` — comparar antes de portar | pendiente |
| 3.6 | `ComparisonTable.tsx` | ídem | ya existe equivalente propio (`comparisonTables` en `pricing.ts`) | descartado probable — verificar solapamiento antes de portar |
| 3.7 | `IsaakMarkdown.tsx` | `apps/isaak/app/(workspace)/components/` | `apps/web/components/chat/` (futuro, cuando exista chat real) | pendiente, no urgente |

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
