# Isaak Retro — Auditoría Fase 0: módulos deprecados / a no migrar (`deprecated-modules.md`)

> Parte de la Fase 0 (Auditoría) del roadmap de `isaak_retro`. Ver `docs/migration/current-state.md` para contexto general.
>
> Fecha: 2026-07-07.

---

## 1. `apps/client` (legacy congelado)

- `apps/client/README.md` declara explícitamente **Estado: LEGACY / CONGELADO** — "no abrir nuevas features aquí", solo fixes puntuales, migraciones o retirada controlada. Ownership ya movido a `apps/isaak`/`apps/app`/`apps/admin`.
- 98 archivos versionados — es una app Next.js completa (App Router, Prisma, `@verifactu/ui`), no un stub vacío.
- Su único cambio reciente (2026-06-30) fue el rollout de Sentry a nivel de repo, no trabajo de producto — consistente con el estado congelado.
- El README marca explícitamente el fallback de persistencia de personalidad en `apps/client/app/api/preferences/route.ts` como "transitorio" — **no portar ese patrón**.
- **Recomendación:** excluir `apps/client` por completo de `isaak_retro`. Si se necesita algo, re-derivarlo de `apps/app`/`apps/isaak` (los sucesores canónicos), no de este árbol.

## 2. Acoplamiento Holded-first detectado

- `apps/app/app/dashboard/integrations/` solo contiene `holded/` e `isaak-for-holded/` — no existe una ruta genérica `/integrations/[connector]`; Holded es el único conector contable montado en el dashboard.
- `apps/app/app/dashboard/integrations/page.tsx` hardcodea lenguaje de Holded en lo que aparenta ser un panel genérico ("Conecta Holded para revisar tu perfil fiscal", header `x-holded-entry-channel`, enlaces directos a `/dashboard/integrations/holded/*`) — añadir un segundo conector requeriría reescribir esta página.
- `packages/integrations/index.ts` re-exporta tipos con nombre "genérico" (`ConnectionStatusDTO`, `ClaimCaseDTO`, `AccessRequestDTO`, `GovernanceFlagsDTO`) desde un subpath literalmente llamado `./holded/*`, con varios tipos prefijados `Holded*` — la abstracción de "gobernanza de conector genérico" se construyó y nombró como módulo Holded-específico.
- `apps/app/lib/integrations/` está dominado por módulos con nombre Holded (`holdedGovernanceService.ts`, `holdedPatStore.ts`, `holdedConnectorRequest.ts`, `holdedConnectionResolver.ts`, `holdedConnectionUpsert.ts`); `accounting.ts`/`accountingStore.ts` son los únicos con nombre genérico pero envuelven directamente a Holded, no una interfaz multi-ERP real.
- `apps/holded` y `apps/holded-mcp` son apps completas dedicadas a un solo conector; el onboarding en `apps/isaak/app/onboarding/holded/` y `apps/app/app/onboarding/holded/` asume Holded como único camino de onboarding contable (no existe árbol de onboarding ERP genérico equivalente).
- **Relevancia para `isaak_retro`:** confirma la regla ya fijada en el roadmap — "connector-neutral" debe aplicarse desde el diseño de tipos/nombres en `packages/integrations`, no solo en el copy público. Nombrar tipos como `Connector*` genéricos desde el inicio, con Holded como una implementación entre varias.

## 3. Scripts/código obsoleto dentro del producto

- `apps/isaak/app/lib/social/scheduling.ts` y `plan.ts` — cliente de Metricool (scheduling social) embebido dentro del `app/lib` del producto principal, no en `scripts/`.
- `apps/isaak-video-generator/social/publish-metricool.ts`, `build-manifest.ts`, `assemble-intro.ts`, `intro-script.ts`, `import-guiones-julio.ts` — pipeline de generación de vídeo Sora + Metricool viviendo como una app completa bajo `apps/`, junto a superficies de producto real.
- Los `scripts/generate-*-sora.mjs` de la raíz están correctamente ubicados bajo `scripts/`, pero confirman que "generación de vídeo Sora" es tooling de marketing legacy, no infraestructura de producto — no portar nada de esto.
- `apps/holded-mcp/scripts/social/metricool-publish.mjs` está en ubicación correcta (`scripts/`) pero es más evidencia de que el pipeline de Metricool/vídeo está disperso en tres apps distintas en vez de un solo sitio.
- `docs/engineering/sessions/2026-06-09_metricool_publishing.md` y `2026-06-10_video_engine_monitoring.md` confirman que fue un esfuerzo puntual, no infraestructura continua.
- **Recomendación:** no migrar `apps/isaak-video-generator` a `isaak_retro`. Si el pipeline de vídeo se necesita más adelante, diseñarlo como `apps/workers` o herramienta externa al monorepo, no como app de producto.

## 4. Dashboards duplicados

- `apps/admin` tiene **dos UIs de admin en paralelo**: la activa en `apps/admin/app/(admin)/*` (rutas `/panel`, `/metrics`, `/inbox`, `/users`, `/tenants`, `/connectors`, `/isaak`, `/subscriptions`, `/marketing`, `/health`, `/audit`, enlazada desde `navAdmin.tsx`) y un segundo árbol huérfano en `apps/admin/app/dashboard/admin/*` (nav propio de 3 items, rutas duplicadas: `companies`/`empresas`, `users`/`usuarios`, `accounting`/`contabilidad`). Nada en `navAdmin.tsx` enlaza al segundo árbol — parece un dashboard obsoleto tras un rename/rebuild.
- `apps/app` tiene tres árboles "dashboard" distintos: `app/(dashboard)/dashboard/isaak/*`, el `app/dashboard/*` principal (impuestos/facturas/pedidos/clientes — el real), y `app/dashboard/admin-dashboard/page.tsx` anidado dentro del dashboard de tenant.
- **Recomendación:** al reconstruir los shells de admin/app en `isaak_retro`, usar `apps/admin/app/(admin)/*` y `apps/app/app/dashboard/*` (sin `admin-dashboard`) como fuente de verdad; no portar `apps/admin/app/dashboard/admin/*` ni `apps/app/app/(dashboard)/*`.

## 5. Referencias a servicios sunset (GoCardless BD)

- `CLAUDE.md` marca **GoCardless BD** como "⚠️ Sunset — cerró nuevos registros → migrado a Enable Banking" (producción desde 2026-05-23).
- `packages/integrations/gocardless-bank-data.ts` sigue siendo un módulo completo y exportado (`listInstitutions`, `createAgreement`, `createRequisition`, verificación de webhooks, normalización de balances/transacciones) — código vivo para un proveedor en sunset, exportado junto a `enable-banking.ts`.
- `apps/isaak/app/api/isaak/banking/gcbd/{connect,sync,webhook}/route.ts` siguen activas; `SeConnection.provider` sigue aceptando `'gcbd'` como uno de los 3 valores del discriminador (`'saltedge' | 'gcbd' | 'enablebanking'`); el cron `connector-health` de `apps/isaak` tiene lógica dedicada de staleness para conexiones GCBD.
- `apps/admin/app/(admin)/tenants/[id]/integrations/page.tsx` también referencia `gcbd` en su manejo de proveedores.
- Los `.env.example` actuales (`apps/isaak`, `apps/app`, root) **ya están limpios** de variables GoCardless BD — solo documentan Salt Edge y Enable Banking, así que instalaciones nuevas no reintroducen esas claves.
- **Recomendación:** `isaak_retro` no debe incluir el discriminador `gcbd` en absoluto — el banking discriminator nuevo nace con `'saltedge' | 'enablebanking'` únicamente (o el proveedor que se decida como único en Fase 8), sin arrastrar el valor legacy ni su código de sync/webhook.
