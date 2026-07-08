# Isaak 2026 (Isaak Retro)

Monorepo limpio para la nueva identidad de Isaak: **el primer personaje inteligente de gestión fiscal, administrativa y empresarial que habla con tus programas y entiende las sedes electrónicas.**

Este repo nace deliberadamente vacío de deuda histórica. Es el destino de la migración progresiva descrita en `kiabusiness2025/isaak` → `docs/product/ISAAK_RETRO_ROADMAP_2026.md` y `docs/product/ISAAK_RETRO_CLEAN_COPY_MASTER_PROMPT_2026.md`.

## Dominios propuestos

- `isaak.es` — web pública (`apps/web`)
- `app.isaak.es` — producto autenticado (`apps/app`, futuro)
- `admin.isaak.es` — backoffice (`apps/admin`, futuro)

## Estructura

```text
apps/
  web/           Web pública Next.js App Router — V1 estática (única app real hoy)
  app/           Producto autenticado — esqueleto vacío, pendiente Fase 5+
  admin/         Backoffice — esqueleto vacío, pendiente Fase 5+
packages/
  brand/         Tokens visuales (colores, tipografía, motion) + assets del personaje Isaak
  content/       Copy versionado (home, pricing, FAQ, conectores, sedes, modelos AEAT)
  ui/            Componentes de UI compartidos — esqueleto vacío, pendiente Fase 5+
  config/        Config compartida (ESLint/TS) — esqueleto vacío, pendiente Fase 5+
  auth/          Autenticación — esqueleto vacío, pendiente Fase 5+
  db/            Cliente de datos (Prisma) — esqueleto vacío, pendiente Fase 5+
  integrations/  Clientes de conectores — esqueleto vacío, pendiente Fase 5+
  billing/       Planes, cuotas, Stripe — esqueleto vacío, pendiente Fase 5+
  analytics/     Telemetría de producto — esqueleto vacío, pendiente Fase 5+
  testing/       Utilidades de test compartidas — esqueleto vacío, pendiente Fase 5+
docs/
  product/       Roadmap, pricing, especificaciones — pendiente de portar desde isaak
  migration/     Plan de traspaso, inventario de módulos y fichas de verificación —
                 activo (TRANSFER_PLAN_2026.md, module-inventory.md, verified-files.md)
  architecture/  Decisiones de arquitectura propias de isaak_2026 — carpeta nueva
  marketing/     Guías operativas (ej. HeyGen) — pendiente de portar desde isaak
  engineering/   Bitácora de sesiones/auditorías de progreso — carpeta nueva
scripts/
  audit/         Auditorías del repo — por crear
  migrate/       Migración de datos/módulos desde isaak — por crear
  verify/        Verificación post-migración — por crear
```

Los paquetes/apps marcados "esqueleto vacío" solo tienen `package.json` + `README.md` —
sus scripts son no-ops para no romper `pnpm validate`, y no tienen código migrado todavía.
Antes de portar contenido real a cualquiera de ellos, revisar
`docs/migration/reusable-modules.md` y `docs/migration/deprecated-modules.md` en el repo
`isaak` (grado de acoplamiento por módulo, qué NO migrar).

Ver `CLAUDE.md` para el desglose completo de `apps/web/components/`, el sistema de
poses del personaje Isaak, y las convenciones del proyecto.

## Qué debe vivir en cada parte

| Carpeta | Función |
| --- | --- |
| `apps/web` | Web pública de Isaak en `isaak.es` |
| `apps/app` | Producto autenticado: chat, historial, onboarding, settings ligeros |
| `apps/admin` | Backoffice interno, soporte, auditoría |
| `packages/ui` | Componentes visuales compartidos |
| `packages/brand` | Colores, tipografías, assets, logos, fondos retro |
| `packages/content` | Copy, precios, FAQ, conectores |
| `packages/auth` | Sesión, usuarios, permisos |
| `packages/db` | Prisma/schema/modelos compartidos |
| `packages/integrations` | Holded, bancos, Google, Microsoft, AEAT, WhatsApp |
| `packages/billing` | Stripe, planes, entitlements |
| `packages/testing` | Helpers de test, fixtures, mocks |

`packages/config` (ESLint/TS compartido) y `packages/analytics` (telemetría de producto) no
tienen todavía una definición de función tan cerrada como las anteriores — ver sus propios
`README.md` para el estado y las preguntas abiertas.

## Reglas de migración

1. No se copian carpetas completas del repo `isaak` anterior.
2. Se migra por whitelist, módulo a módulo, con ficha de origen/destino/riesgo.
3. Ningún conector domina la narrativa — todos son "uno más".
4. Ninguna acción sensible se ejecuta sin confirmación humana explícita ("Isaak prepara. Tú confirmas.").
5. Cero secretos en este repo. `.env.example` no debe tener valores reales.

## Comandos

```bash
pnpm install
pnpm dev        # todas las apps en paralelo
pnpm build
pnpm lint
pnpm typecheck
pnpm validate   # lint + typecheck + build
```

## Estado

- [x] Fase 1 — Repo limpio + tooling
- [x] Fase 2 — Marca Retro (`packages/brand`)
- [x] Fase 3 — Web pública V1 (`apps/web`)
- [x] Fase 3.5 — Personaje real (6 poses) + iconos de conectores
- [x] Fase 4 — Esqueleto completo de traspaso (apps/packages/docs/scripts)
- [~] Fase 5+ — Traspaso de contenido real, en marcha por fases — ver
      `docs/migration/module-inventory.md` para el estado módulo a módulo y
      `docs/engineering/sessions/` para la bitácora de progreso día a día

(Nota: estas "Fases" numeran la construcción de `isaak_2026` desde cero, no las Fases 0-10
del plan de traspaso en `docs/migration/TRANSFER_PLAN_2026.md` — ver aviso de
nomenclatura en `CLAUDE.md`.)
